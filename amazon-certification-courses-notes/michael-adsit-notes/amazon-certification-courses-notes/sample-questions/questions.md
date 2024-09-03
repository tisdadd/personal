> [Back To readme](./readme.md)

# Questions

## Copyright/Disclaimer

All questions below are from the [AWS Certified Solutions Architect – Associate (SAA-C02)
Sample Exam Questions](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Sample-Questions.pdf), © 2020, Amazon Web Services, Inc. or its affiliates. All rights reserved | aws.amazon.com

These are provided here as an easy checkbox list to fill out.

## Actual Questions

Question: A customer relationship management (CRM) application runs on Amazon EC2 instances in multiple
Availability Zones behind an Application Load Balancer.
If one of these instances fails, what occurs?
- [ ] The load balancer will stop sending requests to the failed instance.
- [ ] The load balancer will terminate the failed instance.
- [ ] The load balancer will automatically replace the failed instance.
- [ ] The load balancer will return 504 Gateway Timeout errors until the instance is replaced.

Question: A company needs to perform asynchronous processing, and has Amazon SQS as part of a decoupled
architecture. The company wants to ensure that the number of empty responses from polling requests
are kept to a minimum.
What should a solutions architect do to ensure that empty responses are reduced?
- [ ] Increase the maximum message retention period for the queue.
- [ ] Increase the maximum receives for the redrive policy for the queue.
- [ ] Increase the default visibility timeout for the queue.
- [ ] Increase the receive message wait time for the queue.
  
Question: A company currently stores data for on-premises applications on local drives. The chief technology
officer wants to reduce hardware costs by storing the data in Amazon S3 but does not want to make
modifications to the applications. To minimize latency, frequently accessed data should be available
locally.
What is a reliable and durable solution for a solutions architect to implement that will reduce the cost of
local storage?
- [ ] Deploy an SFTP client on a local server and transfer data to Amazon S3 using AWS Transfer for SFTP.
- [ ] Deploy an AWS Storage Gateway volume gateway configured in cached volume mode.
- [ ] Deploy an AWS DataSync agent on a local server and configure an S3 bucket as the destination.
- [ ] Deploy an AWS Storage Gateway volume gateway configured in stored volume mode.

Question: A company runs a public-facing three-tier web application in a VPC across multiple Availability Zones.
Amazon EC2 instances for the application tier running in private subnets need to download software
patches from the internet. However, the instances cannot be directly accessible from the internet.
Which actions should be taken to allow the instances to download the needed patches? (Select TWO.)
- [ ] Configure a NAT gateway in a public subnet.
- [ ] Define a custom route table with a route to the NAT gateway for internet traffic and associate it with the private subnets for the application tier.
- [ ] Assign Elastic IP addresses to the application instances.
- [ ] Define a custom route table with a route to the internet gateway for internet traffic and associate it with the private subnets for the application tier.
- [ ] Configure a NAT instance in a private subnet.

Question: A solutions architect wants to design a solution to save costs for Amazon EC2 instances that do not
need to run during a 2-week company shutdown. The applications running on the instances store data in
instance memory (RA- [ ] that must be present when the instances resume operation.
Which approach should the solutions architect recommend to shut down and resume the instances?
- [ ] Modify the application to store the data on instance store volumes. Reattach the volumes while restarting
them.
- [ ] Snapshot the instances before stopping them. Restore the snapshot after restarting the instances.
- [ ] Run the applications on instances enabled for hibernation. Hibernate the instances before the shutdown.
- [ ] Note the Availability Zone for each instance before stopping it. Restart the instances in the same
Availability Zones after the shutdown.

Question: A company plans to run a monitoring application on an Amazon EC2 instance in a VPC. Connections
are made to the instance using its private IPv4 address. A solutions architect needs to design a solution
that will allow traffic to be quickly directed to a standby instance if the application fails and becomes
unreachable.
Which approach will meet these requirements?
- [ ] Deploy an Application Load Balancer configured with a listener for the private IP address and register the primary instance with the load balancer. Upon failure, de-register the instance and register the secondary instance.
- [ ] Configure a custom DHCP option set. Configure DHCP to assign the same private IP address to the secondary instance when the primary instance fails.
- [ ] Attach a secondary elastic network interface (EN- [ ] to the instance configured with the private IP address. Move the ENI to the standby instance if the primary instance becomes unreachable.
- [ ] Associate an Elastic IP address with the network interface of the primary instance. Disassociate the
Elastic IP from the primary instance upon failure and associate it with a secondary instance.

Question: An analytics company is planning to offer a site analytics service to its users. The service will require
that the users’ webpages include a JavaScript script that makes authenticated GET requests to the
company’s Amazon S3 bucket.
What must a solutions architect do to ensure that the script will successfully execute?
- [ ] Enable cross-origin resource sharing (COR- [ ] on the S3 bucket.
- [ ] Enable S3 versioning on the S3 bucket.
- [ ] Provide the users with a signed URL for the script.
- [ ] Configure a bucket policy to allow public execute privileges.

Question: A company’s security team requires that all data stored in the cloud be encrypted at rest at all times
using encryption keys stored on-premises.
Which encryption options meet these requirements? (Select TWO.)
- [ ] Use Server-Side Encryption with Amazon S3 Managed Keys (SSE-S3).
- [ ] Use Server-Side Encryption with AWS KMS Managed Keys (SSE-KMS).
- [ ] Use Server-Side Encryption with Customer Provided Keys (SSE-C).
- [ ] Use client-side encryption to provide at-rest encryption.
- [ ] Use an AWS Lambda function triggered by Amazon S3 events to encrypt the data using the customer’s
keys.

Question: A company needs to maintain access logs for a minimum of 5 years due to regulatory requirements.
The data is rarely accessed once stored, but must be accessible with one day’s notice if it is needed.
What is the MOST cost-effective data storage solution that meets these requirements?
- [ ] Store the data in Amazon S3 Glacier Deep Archive storage and delete the objects after 5 years using a lifecycle rule.
- [ ] Store the data in Amazon S3 Standard storage and transition to Amazon S3 Glacier after 30 days using a lifecycle rule.
- [ ] Store the data in logs using Amazon CloudWatch Logs and set the retention period to 5 years.
- [ ] Store the data in Amazon S3 Standard-Infrequent Access (S3 Standard-I- [ ] storage and delete the objects after 5 years using a lifecycle rule.

Question: A company uses Reserved Instances to run its data-processing workload. The nightly job typically
takes 7 hours to run and must finish within a 10-hour time window. The company anticipates temporary
increases in demand at the end of each month that will cause the job to run over the time limit with the
capacity of the current resources. Once started, the processing job cannot be interrupted before
completion. The company wants to implement a solution that would allow it to provide increased capacity
as cost-effectively as possible.
What should a solutions architect do to accomplish this?
- [ ] Deploy On-Demand Instances during periods of high demand.
- [ ] Create a second Amazon EC2 reservation for additional instances.
- [ ] Deploy Spot Instances during periods of high demand.
- [ ] Increase the instance size of the instances in the Amazon EC2 reservation to support the increased workload.