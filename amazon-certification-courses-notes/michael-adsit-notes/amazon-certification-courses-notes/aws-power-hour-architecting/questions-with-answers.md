> [Back To readme](./readme.md)

# Questions with answers

Since format is questions and answers, doing the questions with their answers selected here, as well as the reasoning.

## Episode 1

Question: A database is running on an Amazon EC2 Instance. The database software has a backup feature that requires block storage. What storage option would be the lowest cost option for the backup data?
- [ ] Amazon Glacier
- [x] Amazon EBS Cold HDD Volume (sc1)
- [ ] Amazon S3
- [ ] Amazon EBS Throughput Optimized HDD Volume (st1)
Explanation: EBS stands for Elastic Block Storage - the requirement had block storage as part of it. Cold HDD Volume is cheaper as it is designed around low frequency accessed.
Extra: Three types of storage exist in AWS - Block, Object, and File system. 

Question: Which set of database engines does Amazon Relational Database Service (Amazon RDS) currently support?
- [x] Oracle, Microsoft SQL Server, MySQL, PostgreSQL
- [ ] MariaDB, Microsoft SQL Server, MySQL, Cassandra
- [ ] Amazon Aurora, MySQL, Microsoft SQL Server, Cassandra
- [ ] PostgreSQL, MariaDB, MongoDB, Amazon Aurora
Explanation: See [Amazon RDS](https://aws.amazon.com/rds/) for list of currently supported. Eliminate those that have non-relational databases. There are a few more available than the four listed, but this was about elminating the wrong answers.

Question: Your web service has a performance SLA to respond to 90% of requests in <5 seconds. Under normal and heavy operations, distributing requests over four instances meets performance requirements. What architecture ensure cost efficient high availability of your service if an Availability Zone becomes unreachable?
- [ ] Deploy the service on four servers in a single Availability Zone
- [ ] Deploy the service on six servers in a single Availability Zone
- [x] Deploy the service on four servers with auto scaling across two Availability Zones
- [ ] Deploy the service on eight servers with auto scaling across two Availability Zones
Explanation: Need to be on at least two AZ's in case one goes down. The auto scaling is for four instances, which meets requirements, and the auto-scaling will start servers in the available zone to scale out. Since our SLA is 90%, even if it takes some time for scale up, this will go fine. We also needed cost effiency. 

Question: You wish to deploy a microservices-based application without the operational overhead of managing infrastructure. This solution needs to accommodate rapid changes in the volume of requests. What do you do?
- [ ] Run the microservices in containers using AWS Elastic Beanstalk
- [x] Run the microservices in AWS Lambda behind an API Gateway
- [ ] Run the microservices on Amazon EC2 instances in an Auto Scaling group
- [ ] Run the microservices in containers using Amazon Elastic Container Service (Amazon ECS)
Explanation: Small services with rapidly changing volume of request, and avoid infrastructure overhead. Only Lambda gets rid of operational overhead of managing infrastructure, and it automatically scales. API Gateway can take care of routing and security.

Question: Using Amazon Elastic Container Service (ECS) to run a containerized web application, you wish to minimize costs by running multiple copies of a task on each container instance. What do you do?
- [ ] Configure an Application Load Balancer to distribute the requests using path-based routing.
- [x] Configure an Application Load balancer to distribute the requests using dynamic host port mapping.
- [ ] Configure an Amazon Route 53 alias record set to distribute the requests with a failover routing policy
- [ ] Configure an Amazon Route 53 alias record set to distribute the requests with a weighted routing policy.
Explanation: The Application Load Balancer is able to distribute the requests, and by doing dynamic port mapping it is allowing multiple containers per EC2 instance to receive the traffic. [This article](https://faun.pub/understanding-dynamic-port-mapping-in-amazon-ecs-with-application-load-balancer-bf705ee0ca8e) does a good walkthrough. (Answer clarified slightly in Q&A at end)

Question: An application consists of Amazon Elastic Compute Cloud (Amazon EC2) instances placed in different Availability Zones. The Amazon EC2 instances sit behind an Application Load Balancer. The Amazon EC2 instances are managed via an Auto Scaling group. A network address translation (NAT) instance is used for the Amazon EC2 instances to download updates from the internet. Which option is a bottlenet in the architecture.
- [ ] Amazon EC2 instances
- [ ] Elastic Load Balancing
- [X] NAT instance
- [ ] Auto Scaling Group
Explanation: Only a single NAT instance, everything else scales and so no bottle necks.

Question: A company must store around 500 GB of files, and expects the data size to increase to 80 TB over the next couple of months. The company needs access to this data at all times. Which of the following would be an ideal storage option for these requirements?
- [ ] Amazon DynamoDB
- [x] Amazon Simple Storage Service (Amazon S3)
- [ ] Amazon S3 Glacier
- [ ] Amazon Redshift
Explanation: S3 gives fast access, and scales indefinately (max Object size of 5tb). Glacier has some wait time.

Question: You are designing a leaderboard that expects to have millions of users. You want to ensure the lowest latency for this leaderboard. What datastore would be best suited?
- [x] Amazon DynamoDB
- [ ] Amazon RDS
- [ ] AWS Glue
- [ ] Amazon Redshift
Explanation: DynamoDB is a key/value nosql setup, with millisecond response times. No relationships needed.

## Episode 2

Question: A Media company is hosting a web application on EC2 instances. They are currently using multiple m4.2xlarge instances to encode the videos. However, the application is facing performance issues. As a solutions architect for the company, which of the instance types will you recommend for this architectual requirement? (Select TWO)
- [x] Compute Optimized
- [x] Accelerated Compute
- [ ] Memory Optimized
- [ ] General Purpose
- [ ] High-memory Instances
Explanation: High compute and graphics card instances. Accelerated Compute means it goes with a hardware accellerator (GPU)

Question: Your company is planning to develop a new application. You must install and configure proxies for NGINX as the web server environment for the development team. Which services can be used to quickly provision such an environment?
- [ ] Amazon Elastic Compute Cloud (EC2)
- [x] AWS Elastic Beanstalk
- [ ] Amazon Simple Queue Services (EQS)
- [ ] Elastic Load Balancing
Explanation: Just provision and upload a zip file, and can use many servers including NGINX.

Question: Your company data center is completely full, but the sales group has determined a need to store 200TB of product video. The videos were created over the last several years, with the most recent being accessed by sales more often. The data must be accessed locally, but there is no space in the data center to install local storage devices to store this data. What AWS cloud service will meet sales' requirements?
- [x] AWS Storage Gateway Gateway-Cached volumes
- [ ] AWS Storage Gateway Gateway-Stored volumes
- [ ] AWC Import/Export Disk
- [ ] Amazon EC2 instances with attached Amazon EBS volumes
Explanation: [Storage Volume Gateway](https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html#volume-gateway) comes as an appliance (hardware or VM), then hooks up as a file gateway/shared storage to S3. 

Question: 100 sensors are sending data to a queue before being processed to produce trend analysis and reports. You notice some records are being received and processed more than once. How can you fix this?
- [ ] Use Amazon Kinesis Data Streams
- [ ] Use Amazon Kinesis Data Firehose
- [ ] Use Amazone Simple Notification Service (SNS)
- [x] Use Amazon Simple Queue Service (SQS) FIFO Queue
Explanation: The queue it was in apparently was not a traditional data structure styled queue... and needs to be moved to a First In First Out traditional queue

Question: What determines the amount of resources available to an EC2 instance?
- [x] Instance Type
- [ ] AMI Image
- [ ] Capacity reservation
- [ ] Tenacy
Explanation: Instance type (example t2.small) - this gives the processor and memory.

Question: A company has decided to host a MongoDB database on an Amazon Elastic Compute Cloud (Amazon EC2) instance. A large number of reads and writes are expected on the database. Which of the followin Elastic Block Store (Amazon EBS) storage types would be ideal to implement for the database?
- [x] Amazon EBS Provisioned IOPS SSD
- [ ] Amazon EBS Throughput Optimized HDD
- [ ] Amazon EBS General Purpose SSD
- [ ] Amazon EBS Cold HDD
Explanation: IOPS - I/O per second is highest. Generally, even without that mentioned SSD is faster than HDD for IO.

Question: What are the basic building blocks of Amazon Relational Database Service (Amazon RDS)?
- [x] DB Instances
- [ ] EC2 Instances
- [ ] Containers
- [ ] EBS Volumes
Explanation: They call it a DB instance, even though it is technically built on EC2. So, they have different classes as well.

Question: An application requires a relational database with an initial storage capacity of 4 TB. The database will grow by 10 GB every day. To support traffic, at least four read replicas are required to handle reads. Which option will meett these requirements.
- [ ] DynamoDB
- [ ] Amazon S3
- [x] Amazon Aurora
- [ ] Amazon Redshift
Explanation: Needs to be relational, and Redshift is a data warehouse service. 

Question: Which of the following are examples of making an infrastructure elastic? (Select THREE)
- [x] Creating an Auto Scaling group for your production instances that responds to capacity needs by scaling in or out
- [x] Designing your dev environment so it can be turned off over the weekend
- [x] Launching Read Replicas for your Amazon RDS database that has read-heavy workloads
- [ ] Determining your maximum capacity needs and provisioning production instances to constantly meet those needs
- [ ] Paying an annual fixed price for your IT resources
Explanation: Scaling in and out is what the elastic definition comes from, as does anything that conforms to your needs. Scaling in and out meets the requirements by definition. Development environment able to turn off over the weekend is elasticicity, as it changes. Launching Read replicas is not a constant, also able to change.

Question: Which of the following are characteristics of Amazon EC2 Auto Scaling on AWS? (Select TWO)
- [ ] Sends traffic to healthy instances
- [x] Responds to changing conditions by adding or terminating Amazon EC2 instances
- [ ] Collects and tracks metrics and sets alarms
- [ ] Delivers push notifications
- [x] Enforces a minimum number of running Amazon EC2 instances
Explanation: You set these rules on setup. 

Question: Which services work together to enable auto scaling of Amazon EC2 instances (Select THREE)
- [x] Amazon EC2 Auto Scaling
- [x] CloudWatch Alarms
- [ ] CloudWatch Logs
- [x] Amazon EC2 Elastic Load Balancer
- [ ] Amazon CloudTrail
Explanation: The auto scaling is needed to make use of it, alarms can change it, and load balancer directs the traffic appropriatly to launched (healthy) instances.

Question: Which of the following services can be used to decouple an architecture? (Select THREE)
- [x] Elastic Load Balancing
- [ ] Auto Scaling
- [x] SQS
- [x] SNS
Explanation: All are seperate components in the architecture, except scaling which makes more of the same components

Question: You are asked to improve the performance of an image processing application that uses Amazon SQS and EC2 instances as consumers. High volumes of traffic causes message backlogs in SQS. What do you do?
- [ ] Purchase Dedicated Instances
- [ ] Convert to SQS FIFO queues
- [ ] Create an AWS Lambda function to scale out # of consumer instances when backlog grows
- [X] Configure an Auto-scaling group based on the ApproximateNumberOfMessages Amazon CloudWatch metric
Explanation: Auto scaling takes place using the current architecture, but then can give more if too much of a backlog builds out.

## Episode 3

Question: You are developing a highly available personal cloud solution running on EC2 instances behind an Application Load Balancer. The application will use S3 as the primary storage to store the files uploaded by the application users. Which of the following is the best way to grant the application access to S3?
- [ ] Store the access keys in a seperate encrypted S3 bucket
- [ ] Embed API credentials in the application code
- [x] Assign IAM roles to the EC2 instance
- [ ] Create a file and save it in the application folder on the EC2 instance
Explanation: IAM roles give temporary permissions (keys), without giving credentials that do not need to be given to more people - also helps with keeping production secure.

Question: You are required to design an online application running in a VPC on EC2 instances behind an ELB. The application tier must read and write data to customer-managed database cluster. There should be no access to the database from the Internet, but the cluster must be able to obtain software patches from the internet. Which solution meets these requirements?
- [ ] Public subnets for both the application tier and the database cluster
- [ ] Public subnets for the application tier, and private subnets for the database cluster
- [x] Public subnets for the application tier and NAT Gateway, and private subnets for the database cluster
- [ ] Public subnets for the application tier, and private subnets for the database cluster and NAT Gateway
Explanation: Application must be publicly available as it is an online application, database should be kept in a private subnet. The NAT gateway is there to allow outgoing from the database to the web.

Question: You have deployed an instance running a web server. When you try to connect to it using HTTP over the internet, the connection times out. Which of these steps could fix the problem? (Select THREE)
- [x] Check if the subnet's route table is routing 0.0.0.0/0 to the Internet Gateway
- [ ] Check if the subnet's route table is routing 0.0.0.0/0 to the Virtual Private Gateway
- [x] Check that the security group allows inbound access on Port 80
- [ ] Check that the security group allows outbound access on port 80
- [x] Check that the custom network ACL allows inbound access on port 80
Explanation: Route table needs to allow access to the internet gateway. Security group (on instance) denies all inbound by default. Custom ACL also denies incoming by default, though the default ACL allows by default.

Question: Your company is developing a new application designed to run on EC2 instances. To meet the security compliance requirements, you need to have the data encrypted in-transit and at-rest. Which of the following services will enable you to encrypt the data at rest?
- [ ] AWS Certificate Manager
- [ ] IAM Access Keys
- [x] AWS Key Management Service (KMS)
- [ ] EC2 with the EncryptInstance IAM Role attached
Explanation: You may use the key when needed with [KMS](https://aws.amazon.com/kms/), through its ability to integrate in with other services. In a bucket you have the option to encrypt it with KMS. Same with the EC2 volume.

Question: A company has a set of resources hosted in a virtual private cloud (VPC) on the AWS Cloud. The IT security department has now mandated that all IP traffic from all network interfaces in the VPC be monitored. Which option would help fulfill this requirement?
- [ ] AWS Trusted Advisor
- [x] VPC flow logs
- [ ] Amazon CloudWatch metrics
- [ ] AWS CloudTrail
Explanation: VPC flow logs is [meant for this](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html).

Question: Which Amazon Simple Storage Service (Amazon S3) encryption option does not require AWS to persistently store the encryption keys it uses to decrypt data?
- [ ] Client-side encyrption
- [ ] SSE-KMS
- [ ] SSE-S3
- [x] SSE-C
Explanation: Keys for server side encryption must be used back end (or services). [Here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingClientSideEncryption.html) is an an explanation on how Client side encryption works. Technically SSE-C stands for Server Side Encryption - Customer-Provided Encryption Keys. The hosts recommended [SSE-C](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html) - which, since part of the question was stating that AWS will decrypt the data, would be the fully right one.

Question: Which of the following are features of Amazon Elastic Block Store (Amazon EBS)? (Select TWO)
- [x] Amazon EBS volumes can be encrypted transparently to workloads on the attached instance
- [ ] Amazon EBS data is automatically backed up to tape
- [ ] Data on an Amazon EBS volume is lost when the attached instance is stopped
- [x] Data stored on Amazon EBS is automatically replicated within an Availability Zone
Explanation: [See the docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes.html)

Question: Which of the following should you consider implementing when you need to allow a user access to an S3 bucket? (Choose TWO)
- [x] Policies attached to the user
- [ ] Security Group settings
- [x] Resource Policy
- [ ] Network ACL
Explanation: Security group settings are for EC2 instances, and Network ACL for VPCs, both of which are not in this usage. Only the User and the S3 Resource. 

Question: You are creating an application running on EC2 that needs access to DynamoDB. Which of the following is the most secure method to provide access for the application?
- [x] IAM Role
- [ ] Keys for a IAM user
- [ ] Keys for the AWS Account
- [ ] The username and password for an IAM user
Explanation: Roles are temporary access granted.

Question: What must you create first before you can establish subnets?
- [ ] Security Group
- [ ] Network ACL
- [ ] Route table
- [x] VPC
Explanation: Subnets are part of the Virtual Private Cloud (VPC).

Question: You need an application (web accessible) and database tier (Amazon RDS). What meets these requirements while maximizing security?
- [ ] Public subnets for both the application tier and the database
- [x] Public subnets for the application tier, and private subnets for the database
- [ ] Public subnets for the application tier with NAT Gateway, and private subnets for the database
- [ ] Public subnets for the application tier, plus private subnets for the database and NAT Gateway
- [ ] Private subnets for both the application tier and the database
Explanation: Unless you need to apply patches (give the database access to the web), keeping the database intranet only is most secure. We must be able to access the application from the web though.

Question: Which additional layer of security can you deploy at subnet level?
- [ ] Security Group
- [ ] AWS Identity and Access Management (IAM)
- [ ] AWS Organization
- [x] Network access control list (ACL)
Explanation: ACL is attached/deployed at a subnet level.

## Episode 4

Question: A company is planning to migrate their existing data store which consists of 90TB of data. The current data center has an internet connection of 1Gbps. Which is the most cost efficient and secure option to transfer the data store?
- [ ] Use AWS Managed Site-to-site VPN over the internet
- [x] Use Snowball
- [ ] Zip and upload files to S3 in chunks of 5TB each
- [ ] Use an FTP server on EC2 to upload files then copy to S3
Explanation: Check the pricing pages. Basically - the snow family is meant to quickly and cheaply get data into AWS from your storage center.

Question: Your company has migrated the workload to AWS. The management has asked you to optimise the workload to make it cost-effective in the long run. The company uses more than 100 on-demand EC2 instances which run 24x7 to support the business operation. How can you lower the cost?
- [ ] Convert all instances to Spot instances
- [ ] Do not modify the EC2 instances as they are already cost-optimized
- [x] Purchase Reserved Instances
- [ ] Provision Saver Instances
Explanation: Reserved Instances are cheapist if paid ahead of time, and allow you to reserve amount of time. Spot instances are cheap, but not reliable.

Question: A solutions architect is asked to create a report generation job once every week on Friday. The report generation job should be able to connect to the RDS instances and generate three reports securely. The time taken to generate each report is 10 minutes. Which compute option will be the most cost efficient to run?
- [ ] Run a Scheduled Reserved Instance
- [ ] Run the app on Containers with Fargate
- [x] Run a Lambda Function triggered by EventBridge
- [ ] Use an EKS Cluster
Explanation: Lambda can run within that time window (up to fifteen minutes), used only a few times, and are super cheap (even if outside of free tier (free 1 million calls), this would have been 2 cents on the pricing calculator)

Question: A company is planning to use Amazon Simple Storage Service (Amazon S3) to host project documents. At the end of the project, the documents must be moved to archival storage. Which implementation step would ensure that documents are managed accordingly.
- [ ] Add a bucket policy on the Amazon S3 bucket
- [x] Configure lifecycle configuration rules on the Amazon S3 bucket
- [ ] Create an AWS Identity and Access Management policy for the Amazon S3 bucket
- [ ] Enable cross-origin resource sharing (CORS) on the Amazon S3 bucket
Explanation: Can set lifecycle to move it after some time of lack of access.

Question: An application you want to run on Amazon Elastic Compute Cloud (Amazon EC2) requires you to license it based on the number of physical CPU sockets and cores on the hardware on which you plan to run the application. Which tenecy model should you specify?
- [x] Dedicated Host
- [ ] Dedicated Instance
- [ ] Shared tenency
- [ ] Bring Your Own License (BYOL)
Explanation: Dedicated Host is the only one that you get actual physical machine with cores. 

Question: A sales reporting application running on EC2 is setup to run once at the end of every month. The report takes several hours to compile, but can be paused and resumed. To achieve the best possible price for this workload, which Amazon EC2 payment model should be used?
- [ ] On Demand
- [ ] Reserved Instances or Savings Plans
- [ ] Scheduled Reserved Instance
- [x] Spot Instances
Explanation: Spot instances run as needed but can be interrupted with a two minute warning. This allows them to be much cheaper.

Question: Your business wants to migrage an existing application to its AWS account along with its relational database. This app needs to be available at all times, but will also experience unpredictable periods of inactivity. What is the best solution to build this application that minimizes costs?
- [x] Run the app in containers with Fargate and use Amazon Aurora Serverless for the database
- [ ] Run the app on EC2 instances using a T-class instance type. Use Amazon Redshift for the database
- [ ] Use AWS CloudFormation to deploy the infrastructure when it is needed. Delete the stack at beginning of the idle periods
- [ ] Deploy the application on EC2 instances in an Auto Scaling group behind an Application Load Balancer. Use Amazon RDS MySQL for the database
Explanation: Elasticity is needed to shrink down as needed. Aurora Serverless allows suspending the database after some time... but it is more per hour/gig if you were not scaling down and off, but had a consistent workload.

Question: You need to replicate proprietary, on-premesis, reporting system data into AWS for long term analytics and archival. It is estimated that you require a high performance connection that is dedicated to your use. What option is best for your scenario?
- [ ] VPC Peering Connection
- [ ] AWS Database Migration Service (DMS)
- [ ] Virtual Private Network
- [x] AWS Direct Connect
Explanation: Requirement is a high performance dedicated connection. Can get up to 100Gbps speed if you want. Direct Connect to AWS is also cheaper, VPN charges both directions.

Question: You have a series of large EC2 instances behind an Elastic Load Balancer (ELB). When you review the environment's CloudWatch Metrics, you notice that the application has consistent shifts in traffic throughout the day as users log on and off, but the workload remains the same despite being underutilized after hours. What optimizations could be made?
- [ ] Move the application into Lambda functions, so it's only called when needed.
- [ ] Adopt an EC2 Instance Savings Plan for the the EC2 instances for the next 3 years
- [ ] Modify the EC2 instances to use a smaller instance type. Create a Spot Request to replace all existing server instances.
- [x] Create an Amazon Machine Image (AMI), Launch Template, and Auto Scaling Group tied to the ELB's Target Group. Use an appropriately sized instance type.
Explanation: Any of these could be utilized, not quite as many details as expected. This answer does not require changing the application itself.

## Episode 5

Question: A company requires a solution where the users will be directed to a static error page in case the primary application webpage is unavailable. The application is hosted in the us-east-1 region. What configuration should the solutions architect use to meet the requirement with the least amount of changes to the infrastructure?
- [ ] Create a Network Load Balancer to balance the load
- [x] Use S3 to host the static error page. Set-up Route53 to use failover routing with health-checks and point to S3 for failover.
- [ ] Set up Route53 to use the latency-based routing policy
- [ ] Use S3 to host the static error page. Set-up Route53 active-active routing policy to send traffic to the S3-hosted page.
Explanation: Static Error Page is required, and must happen when there is a failver (active-passive).

Question: A digital magazine company runs a global application that hosts the magazine content. The application is hosted on a multi-tiered architecture behind an Application Load Balancer. The instances are in an Auto Scaling Group across 3 AZs and use Amazon RDS with MySQL for the database. Due to a large number of customers reading articles, the CloudWatch metrics show a high CPU Utilization for RDS. A solution architect needs to reduce the load on the Amazon RDS DB instance. What architectural change should be implemented?
- [ ] Enable DynamoDB Accelerator
- [x] Add Read-Replicas
- [ ] Use the Multi-AZ option for RDS
- [ ] Use AWS Compute Optimizer
Explanation: Read replicas allow users to read without adding more processing to the main.

Question: A company has updated its security policy to enforce encryption on all EBS Volumes. There are multiple existing volumes that need to be encrypted under this policy. What combination of steps should the solutions architecture take in order to fulfill this requirement? (Select TWO)
- [ ] Convert the existing volume to EBS Encrypted type
- [x] Create a snapshot and select the encrypted option while creating a copy of the snapshot
- [ ] Create a new encrypted volume and copy the data to the new volume
- [x] Create a new volume from the encrypted snapshot
- [ ] Create an encrypted snapshot from the existing volume
Explanation: Two step procedure, as it says combination of steps.

Question: A mobile company has migrated their Over-the-air (OTA) software update application to AWS. They have currently deployed a fleet of EC2 instances to allow the delivery of the software updates. The average size of the software update is around 2GB. The current architecture has a very high bandwidth cost due to a large number of downloads. As a solutions architect, what architectural change can you implement to save the bandwidth cost?
- [ ] Create a DynamoDB index for the download file with DynamoDB Accelerator and store the download files in S3.
- [x] Place the files in a S3 bucket and create a CloudFront Distribution to deliver the file.
- [ ] Place the files in a public S3 bucket and use the S3 link to deliver the file.
- [ ] Replace the current instances with storage-optimized instances to reduce cost.
Explanation: CloudFront at larger amounts of data costs less than S3 for bandwidth.

Question: What is the most cost-effective way to save easily reproducible and highly accessed objects?
- [ ] S3-IA
- [ ] Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA)
- [x] Amazon S3 Standard (S3 Standard)
- [ ] Amazon Simple Storage Glacier
Explanation: Frequently accessed, so shouldn't be in cold storage, and replicates automatically.

Question: Which services use edge locations by default?
- [ ] Amazon CloudFront
- [ ] AWS WAF
- [ ] Amazon Route 53
- [x] All of the Above
Explanation: Goes through Route 53, WAF (Web Application Firewall) and then CloudFront.

Question: Which actions would crate the most secure network for a three-tiered application, while allowing the web tier to be accessed from the internet securely? (Select TWO)
- [ ] Attach API Gateway. Create private web, app, and DB subnets
- [x] Attach an IGW. Create a public web subnet plus private app and DB subnets.
- [ ] Create a web security group (allow internet traffic), an app SG (allow API Gateway requests), and a database SG (allow app SG traffic on DB port).
- [x] Create a web security group (allow HTTPS from internet), app SG (allow HTTP from the webSG), and database SG (allows DB port traffic from the app SG).
Explanation: Internet Gateway lets the traffic to the public web subnet. Security groups chain to allow principle of least priveledge - each only has access to the next part allowed.

# Episode 6

Question: A company has acquired a new company and needs to migrate all the applications to AWS. Each application has approx. 50 TB of data to be transferred. Both the companies will require a consistent high speed connectivity between their data centers and AWS after the migration. A solutions architct must ensure one-time data migration and ongoing network connectivity. Which solution will meet these requirements?
- [x] AWS Snowball for the initial transfer and AWS Direct Connect for ongoing connectivity
- [ ] AWS Site-to-Site VPN for both the initial transfer and ongoing connectivity.
- [ ] AWS Snowball for the initial transfer and AWS Site-to-Site VPN for ongoing connectivity
- [ ] AWS Direct Connect for both the initial transfer and ongoing connectivity
Explanation: Each application has a lot of initial data, Snowball moves quickly and cheaper than network, and Direct Connect gives fast data

Question: A media company has migrated its media application that serves content to its subscribers globally to AWS. The application serves the content through multiple Amazon EC2 instances in a private subnet behind an Application Load Balancer(ALB). Due to copyright restrictions, content team wants to block access for certain countries. Which action will meet these requirements?
- [ ] Modify the ALB security group to deny incoming traffic from blocked countries.
- [ ] Modify the security group for EC2 instances to deny incoming traffic from blocked countries.
- [ ] Use ALB listener rules to return access denied responses to incoming traffic from blocked countries.
- [x] Use Amazon CloudFront to serve the application and deny access to blocked countries.
Explanation: CloudFront has a geographic region blocking available available.

Question: A product company is creating a new application running on Windows for storing large amounts of data. The application will analyze the data every hour using multiple EC2 instances. The amount of space needed is expected to grow for the new few months. Which set of actions should a solutions architect take to support these needs?
- [ ] Store the data in an EBS General Purpose volume and mount it on the instances
- [x] Store the data in an Amazon FSx file system and mount it on the application instances.
- [ ] Store the data in Amazon EFS and mount it on the application instances
- [ ] Store the data in Amazon S3 Standard-Infrequent Access (S3 Standard-IA). Update the bucket policy to allow access to the application instances.
Explanation: Amazon FSx file system is an elastic shared file system that uses Windows (or Lustre) file system, and will grow as needed.


Question: A finance company is facing poor write performance on its newly migrated RDS MySQL Database. On investigation, it was found that these performance issues were caused by users generating different real-time reports from the application during working hours. Which solution will you implement to improve the performance of the application when it is moved to AWS?
- [ ] Create an Amazon Aurora MySQL Multi-AZ DB cluster. Configure the application to use the backup instance of the cluster as an endpoint for the reports.
- [ ] Import the data into an Amazon DynamoDB table with provisioned capacity. Refactor the application to user DynamoDB for reports.
- [x] Create an Amazon Aurora MySQL Multi-AZ DB cluster with multiple read replicas. Configure the application to use the reader endpoint for reports.
- [ ] Create the database on a compute optimized Amazon EC2 instance. Ensure compute resources exceed the on-premises database.
Explanation: Reports are reading of data, read replicas exist for this. No need to refactor then, and even if refactoring was done, you don't have access to the backup.

Question: A company has accumulated analytics data for the past few years in an Amazon RDS instance. You have been asked to find a solution that allows users to access this data using an API. The expectation is that the application will experience periods of inactivity but could receive bursts of traffic within seconds. Which solution should you suggest as a solutions architect?
- [ ] Set up an Amazon API Gateway and use Amazon ECS
- [ ] Set up an Amazon API Gateway and use AWS Elastic Beanstalk
- [x] Set up an Amazon API Gateway and use AWS Lambda functions.
- [ ] Set up an Amazon API Gateway and use Amazon EC2 with Auto Scaling.
Explanation: Lambdas are designed for this sort of thing - automatically scales.

Question: A gaming company is using multiple Amazon EC2 instances in a single Availability Zone for its multiplayer game. This game communicates with users on Layer 4. The management of this company wants to make this application highly available and decrease the running costs. What should a solutions architect do to meet these requirements? (Select TWO)
- [ ] Increase the number of EC2 instances
- [ ] Decrease the number of EC2 instances
- [x] Configure a Network Load Balancer in front of the EC2 instances
- [ ] Configure an Application Load Balancer in front of the EC2 instances
- [x] Configure an Auto Scaling group to add or remove instances in multiple Availablilty Zones automatically
Explanation: Network load balancer is Layer 4 (non-web) and autoscaling does best cost and multiple AZ's makes highly-available

Question: You are running a database on an Amazon EC2 instance, and need to run backups locally. What would be the most cost effective location for these backups?
- [ ] Amazon Glacier
- [x] Amazon EBS Cold HDD Volume (sc1)
- [ ] Amazon S3
- [ ] Amazon EBS Throughput Optimized HDD Volume (st1)
Explanation: Cold storage for backups is cheaper, and we are still local (to the virtual machine).