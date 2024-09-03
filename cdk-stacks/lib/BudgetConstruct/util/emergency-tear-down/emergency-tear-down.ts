// disabling for part of original functionality and tracking logs
/* eslint-disable no-console */
import { backOff } from 'exponential-backoff';

import {
  CloudFormationClient, DescribeStacksCommand, DeleteStackCommand, Stack,
} from '@aws-sdk/client-cloudformation';
import { publishNotification } from './utils';

const cloudformation = new CloudFormationClient({});

async function sendResults(
  invocationId: any,
  tpEnabled: any,
  successes: any,
  failures: any,
  lastStack?: Stack,
) {
  console.log('publishing sns alert for error');
  const message = `Attempted to destroy some stacks:
Skipped because they had termination protection enabled (${tpEnabled.length}): ${tpEnabled.join(', ')}
Successfully destroyed (${successes.length}): ${successes.join(', ')}
Failed to  destroy (${Object.entries(failures).length}): ${JSON.stringify(failures)}
${lastStack ? `Starting to destroy originating stack - ${lastStack.StackId} - logs and notifications may cut off as it is destroyed` : ''}`;
  console.log(message);
  await publishNotification(message, 'AWS Emergency Tear Down', invocationId);
}

async function destroyOneStack(stack: Stack) {
  console.log('Attempting to destroy stack', stack.StackId);
  console.log('Describing stack for initial status');
  const initialResult = await cloudformation.send(
    new DescribeStacksCommand({
      StackName: stack.StackId,
    }),
  );
  const [initialStack] = initialResult?.Stacks || [];

  await cloudformation.send(new DeleteStackCommand({
    StackName: stack.StackId,
  }));

  if (initialStack.StackStatus === 'rejected') {
    return 'request rejected';
  }
  // keep checking the status of the stack until the status
  // is something other than the initial status or DELETE_IN_PROGRESS
  const backoffParams = {
    maxDelay: 60 * 1000, // 1 minute
    startingDelay: 10 * 1000, // 10 seconds
  };
  const checkForCompletion = async () => {
    const describeResult = await cloudformation.send(
      new DescribeStacksCommand({
        StackName: stack.StackId,
      }),
    );
    const [checkStack] = describeResult?.Stacks || [];

    console.log(`${stack.StackName}/${stack.StackId}: ${checkStack.StackStatus}`);
    if (checkStack.StackStatus === initialStack.StackStatus || checkStack.StackStatus === 'DELETE_IN_PROGRESS') {
      throw new Error(`Detection status: ${checkStack.StackStatus}`); // throw error to keep the backoff retrying
    } else {
      return checkStack.StackStatus; // status has changed from initial state,
      // and it isn't delete_in_progress, so assume we've reached and end state.
    }
  };
  const eventualStatus = await backOff(checkForCompletion, backoffParams);
  return eventualStatus;
}

async function destroyStacks(invocationId: string, {
  destroyItAll = false,
  tags = {},
  runningInStackId = '',
}) {
  console.log('Getting stacks using cloudformation');
  // get list of stacks
  let listResult = await cloudformation.send(new DescribeStacksCommand({}));
  console.log('got initial describe result');

  let stacks = listResult.Stacks || [];

  while (listResult.NextToken) {
    console.log('in while loop');
    // need to wait to check if more
    // eslint-disable-next-line no-await-in-loop
    listResult = await cloudformation.send(new DescribeStacksCommand(
      { NextToken: listResult.NextToken },
    ));
    stacks = [...stacks, ...listResult.Stacks || []];
  }

  // console.log(stacks);

  const notValidTags: string[] = [];

  if (!destroyItAll && Object.keys(tags).length === 0) {
    throw new Error('destroyItAll or tags is required');
  }

  if (destroyItAll && Object.keys(tags).length > 0) {
    throw new Error('destroyItAll only works with no tags');
  }

  if (!destroyItAll && Object.keys(tags).length === 0) {
    throw new Error('tags are required if destroyItAll is not enabled');
  }
  stacks = stacks.filter((stack) => {
    let isStillValid = true;
    Object.entries(tags).forEach(([expectedKey, expectedValue]) => {
      isStillValid = isStillValid
           && (stack?.Tags || [])
             .some(({ Key, Value }) => expectedKey === Key && expectedValue === Value);
    });
    if (!isStillValid && stack.StackName) {
      notValidTags.push(stack.StackName);
    }
    return isStillValid;
  });

  console.log('filtered stacks');
  // console.log(stacks);

  let lastStack: Stack | undefined;
  const tpEnabled: string[] = [];
  const tpDisabled: Stack[] = [];
  stacks.forEach((stack) => {
    if (stack.EnableTerminationProtection === true || stack.StackName === 'CDKToolkit') {
      if (stack.StackName) {
        tpEnabled.push(stack.StackName);
      }
    } else if (stack.StackId !== runningInStackId) {
      tpDisabled.push(stack);
    } else {
      lastStack = stack;
    }
  });

  console.log(
    `Not attempting to destroy the following due to missing tag(s): ${notValidTags.join(',')}`,
  );
  console.log(
    `Not attempting to destroy the following due to termination protection being enabled: ${tpEnabled.join(',')}`,
  );
  // attempt to destroy any stacks that don't have termination protection enabled
  const stackDestroyRequests = tpDisabled.map((stack) => destroyOneStack(stack));
  const results = await Promise.allSettled(stackDestroyRequests);
  // report on what happened
  const failures: { [key: string]: string } = {};
  const successes: string[] = [];
  results.forEach((result, i) => {
    // using an index (numeric)
    // eslint-disable-next-line security/detect-object-injection
    const { StackName = '' } = tpDisabled[i];
    if (result.status === 'rejected') {
      // part of original functionality, also unless people are naming their stacks to attack them
      // then it should be fine
      // eslint-disable-next-line security/detect-object-injection
      failures[StackName] = `promise rejected -> ${result.reason}`;
    } else if (result.value !== 'DELETE_COMPLETE') {
      // part of original functionality, also unless people are naming their stacks to attack them
      // then it should be fine
      // eslint-disable-next-line security/detect-object-injection
      failures[StackName] = result.value;
    } else {
      successes.push(StackName);
    }
  });
  await sendResults(invocationId, tpEnabled, successes, failures, lastStack);
  if (lastStack) {
    console.log('Attempting to delete final stack');
    const result = await destroyOneStack(lastStack);
    console.log(result);
    console.log('Successfully destroyed containing stack');
  }
}

// for proper lambda handling, need to have this existing as an export
// eslint-disable-next-line import/prefer-default-export
export const handler = async function handler(event: any, context: { awsRequestId: string }) {
  try {
    const invocationId = context.awsRequestId;
    console.log(`invocationId=${invocationId}`); // just to make it easy to match up an email and a log entry

    const { TAGS, DESTROY_IT_ALL, RUNNING_IN_STACK_ID } = process.env;
    console.log({ TAGS, DESTROY_IT_ALL, RUNNING_IN_STACK_ID });
    let tags;
    if (TAGS) {
      tags = JSON.parse(TAGS);
    }
    const destroyItAll = DESTROY_IT_ALL === 'true';

    await destroyStacks(invocationId, {
      tags,
      destroyItAll,
      runningInStackId: RUNNING_IN_STACK_ID,
    });
  } catch (e) {
    console.error(e);
    throw (e);
  }
};
