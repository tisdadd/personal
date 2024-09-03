import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const sns = new SNSClient({});

function getCurrentLambdaLogsLink() {
  const { AWS_REGION, AWS_LAMBDA_LOG_GROUP_NAME, AWS_LAMBDA_LOG_STREAM_NAME } = process.env;
  const encode = (input: string) => encodeURIComponent(encodeURIComponent(input)).replace(/%/g, '$');
  return `https://${AWS_REGION}.console.aws.amazon.com/cloudwatch/home?region=${AWS_REGION}#logsV2:log-groups/log-group/${encode(
    AWS_LAMBDA_LOG_GROUP_NAME || '',
  )}/log-events/${encode(AWS_LAMBDA_LOG_STREAM_NAME || '')}`;
}

// keeping similar folder structure in case more needed from source project ever
// eslint-disable-next-line import/prefer-default-export
export async function publishNotification(message: string, title: string, invocationId: string) {
  await sns.send(new PublishCommand({
    Message: `${message}\n\ninvocationId=${invocationId}\n\n${getCurrentLambdaLogsLink()}`,
    TopicArn: process.env.ALERTS_TOPIC,
    Subject: title,
  }));
  // disabling for part of original functionality and tracking logs
  // eslint-disable-next-line no-console
  console.log('published sns alert');
}
