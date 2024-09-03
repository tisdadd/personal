> [Back To readme](./readme.md)

# Questions With Answers

These are the questions throughout with answers filled in, as well as the explanations provided in the document.

## Module 1: Design Resiliant Architectures

Question: A database is running on an EC2 instance. The database software has a backup feature that requires block storage. What storage option would be the lowest cost option for the backup data?
- [ ] Amazon Glacier
- [x] EBS Cold HDD Volume
- [ ] Amazon S3
- [ ] EBS Throughput Optimized HDD Volume
Explanation: Must be attached, using block storage (the B in EBS). Should also be persistent. Cold is the cheapest available in the the EBS.

Question: Which of the following AWS Services facilitate the implementation of loosely coupled architectures? (Select TWO)
- [ ] AWS CloudFormation
- [x] Amazon Simple Queue Service
- [ ] AWS CloudTrail
- [x] Elastic Load Balancing
- [ ] Amazon Elastic MapReduce
Explanation: SQS is a distributed queuing system that can be used in between services to store messages to process later. Elastic Load Balancing allows scaling parts of architecture as needed.

Question: Your web service has a performance SLA to respond to 99% of requests <1 second. Under normal and heavy operations, distributing requests over four instances meets performance requirements. What architecture ensures cost efficient high availability of your service if an Availability Zone becomes unreachable?
- [ ] Deploy the service on four servers in a single Availability Zone
- [ ] Deploy the service on six servers in a single Availability Zone
- [x] Deploy the service on four servers across two Availability Zones
- [ ] Deploy the service on eight servers across two Availality Zones
Explanation: This question should include an auto-scaling group if we are to stay with the SLA, but this is what they had so guessing it was assumed. There was a similar twitch question, but its answers included the auto-scaling group. Since this is about high-availability not fault tolerence, we are ok with degraded performance we learn in the next question.

Question: Your web service has a performance SLA to respond to 99% of requests <1 second. Under normal and heavy operations, distributing requests over four instances meets performance requirements. What architecture ensures cost efficient fault-tolerant operation of your service if an Availability Zone becomes unreachable?
- [ ] Deploy the service on four servers in a single Availability Zone
- [ ] Deploy the service on six servers in a single Availability Zone
- [ ] Deploy the service on four servers across two Availability Zones
- [x] Deploy the service on eight servers across two Availality Zones
Explanation: Fault-Tolerant is a higher bar, and so we must keep it going within the SLA.

Question: You are planning to use CloudFormation to deploy a Linux EC2 instance in two different regions using the same base Amazon Machine Image (AMI). How can you do this using CloudFormation?
- [ ] Use two different CloudFormation templates since CloudFormation templates are region specific
- [x] Use mappings to specify the base AMI since AMI IDs are different in each region
- [ ] Use parameters to specify the base AMI since AMI IDs are different in each region
- [ ] AMI IDs are identical across regions
Explanation: AMI IDs are different across regions, and parameters are entered by users.

Question: How can I access the output of print statements from Lambda?
- [ ] SSH into Lambda and look at system logs
- [ ] Lambda writes all output to Amazon S3
- [x] CloudWatch Logs
- [ ] Print statements are ignored in Lambda
Explanation: Print statements (and other logs) are written to CloudWatch Logs.

Question: You are running an EC2 instance which uses EBS for storing its state. You take an EBS snapshot every day. When the system crashes it takes you 10 minutes to bring it up again from the snapshot. What is your RTO and RPO going to be?
- [ ] RTO will be 1 day, RPO will be 10 minutes
- [x] RTO will be 10 minutes, RPO will be 1 day
- [ ] RTO and RPO will be 10 minutes
- [ ] RTO and RPO will be 1 day
Explanation: RTO is Recovery Time Objective, and is the time between the time of failure and point where operations resume. RPO is Recovery Point Objective, and is the max for long/far back data can be recovered from.

## Module 2: Design Performant Architectures

Question: In what ways does Amazon S3 object storage differ from block and file storage? (SELECT THREE)
- [x] Amazon S3 allows storing an unlimited number of objects
- [x] Objects are immutable - the only way to change a single byte is to replace the object
- [x] Objects are replicated across Availability Zones
- [ ] Objects are replicated across all regions
Explanation: S3 is flat storage, and allows unlimited number of object as part of this. To keep high durability, they are replicated across AZ's. Additionally, object stores are always at the full object level, block stores are at partial level.

Question: Which of the following are features of Amazon EBS? (Select TWO)
- [x] Data stored on Amazon EBS is automatically replicated within an Availability Zone
- [ ] Amazon EBS data is automatically backed up to tape
- [x] Amazon EBS volumes can be encrypted
- [ ] Data on Amazon EBS volumes is lost when the attached instance is stopped
Explanation: These volumes are designed to persist, and they have the option to encrypt when creating (otherwise make an encrypted snapshot, than a new volume from that snapshot)

Question: Which Amazon Relational Database Services (Amazon RDS) database engines support read replica?
- [ ] Microsoft SQL Server and Oracle
- [x] MySQL, MariaDB, PostgreSQL, and Aurora
- [ ] Aurora, Microsoft SQL Server, and Oracle
- [ ] MySQL and PostgreSQL
Explanation: These were designed to allow read replicas, only Microsoft and Oracle engines do not support this.

Question: Which AWS database service is best suited for non-relational databases?
- [ ] Amazon Redshift
- [ ] Amazon Relational Database Service (Amazon RDS)
- [ ] Amazon Glacier
- [x] Amazon DynamoDB
Explanation: It needed to be a database service, and also non-relational. DynamoDB is the only NoSQL Database.

Question: Which of the following objects are good candidates to store in a cache? (Select THREE.)
- [x] Session state
- [x] Shopping Cart
- [x] Product catalog
- [ ] Bank account balance
Explanation: Bank account you always want in real time (technically, this could be done with a write-through cache strategy)

Question: Which of the following cache engines are supported by Amazon ElastiCache (Select TWO)
- [ ] MySQL
- [x] Memcached
- [x] Redis
- [ ] Couchbase
Explanation: Memcached and Redis are for caching, the others are not

Question: Which services work together to enable auto scaling of EC2 instances?
- [ ] Auto Scaling and Elastic Load Balancer
- [ ] Auto Scaling and CloudWatch
- [x] Auto Scaling, Elastic Load Balancer, and CloudWatch
- [ ] Elastic Load Blancer and CloudWatch
- [ ] Auto Scaling
Explanation: Auto Scaling is used to set up an Auto Scale Group, which ELB will be able to point to by registering against it, and CloudWatch will start the process through alarms.

Question: What is the template that Auto Scaling uses to launch a fully configured instance automatically?
- [ ] AMI ID
- [ ] Instance type
- [ ] Key pair
- [x] Launch configuration
- [ ] User data
Explanation: The launch configuration describes the instance, and what to do at boot.


Question: A radio station runs a contest where every day at noon they make an announcment that generates an immediate spike in traffic that requires 8 EC2 instances to process. All other times the web site requires 2 EC2 instances.
Which is the most cost effective way to meet these requirements?
- [ ] Create an Auto Scaling group with a minimum capacity of 2 and scale out based upon CPU utilization
- [ ] Create an Auto Scaling group with a minimum capacity of 8 at all times
- [x] Create an Auto Scaling group with a minimum capacity of 2 and set a schedule to scale out at 11:40 am
- [ ] Create an Auto Scaling group with a minimum capacity of 2 and scale out based upon memory utilization
Explanation: Auto Scaling Group gets everything warmed up in time for the known spike in traffic. 

Question: An application runs on EC2 instances in an Auto Scaling group. The application runs optimially on 9 EC2 instances and must have at least 6 running instances to maintain minimally acceptable performance for a short period of time. Which is the most cost-effective Auto Scaling group configuration that meets the requirements?
- [ ] A dedired capacity of 9 instances across 2 Availability Zones
- [x] A desired capacity of 9 instances across 3 Availability Zones
- [ ] A desired capacity of 12 instances across 2 Availability Zones
- [ ] A desired capacity of 9 instances across 1 Availability Zone
Explanation: We want nine instances as much as possible, but can drop to six. By having nine instancess across three availability zone, if one zone goes down we can have six running still, and start scaling out to more.

Question: Which of the following are characteristics of the Auto Scaling service on AWS? (Select THREE)
- [ ] Sends traffic to healthy instances
- [x] Responds to changing conditions by adding or terminating Amazon EC2 instances
- [ ] Collects and tracks metrics and sets alarms
- [ ] Delivers push notifications
- [x] Launches an instance from a specified Amazon Maching Image (AMI)
- [x] Enforces a minimum number of running Amazon EC2 instances
Explanation: The purpose of the auto scaling group is to keep instances in a set range, and it must have the AMI to launch.

Question: The web tier for an application is running on 6 EC2 instances spread across 2 availability zones behind an ELB Classic Load Balancer. The data tier is a MySQL database running on an EC2 instance. What changes will increase the availability of the application? (Select TWO)
- [x] Launch the web tier EC2 instances in an Auto Scaling group
- [x] Migrate the MySQL database to a Multi-AZ RDS MySQL database instance
- [ ] Turn on CloudTrail in the AWS account of the application
- [ ] Turn on cross-zone load balancing on the Classic Load Balancer
- [ ] Increase the instance size of the web tier EC2 instance
Explanation: If instances are dying, the EC2 Auto Scaling group will kill off old instances and start new ones. The multi-zone (for anything) will increase availability vs a single zone.

## Module 3: Secure Architectures

Question: Your AWS account administrator left your company today. The administrator had access to the root user and a personal IAM administrator account. With these accounts, he generated IAM users and keys. Which of the following should you do today to protect your AWS infrastructure? (Select THREE)
- [x] Change the password and add MFA to the root user
- [ ] Put an IP restriction on root user logins
- [x] Rotate keys and passwords for IAM users
- [ ] Delete all IAM users
- [x] Delete the administrator's IAM user
- [ ] Relaunch all EC2 instances with new roles
Explanation: Changing the root user credentials keeps him from logging in as root user, multi-factor authentication helps keep others from stealing this account. Rotating the keys/passwords means that any user created by him cannot be accessed by him. Finally, deleting the IAM user means he can not use this account anymore.

Question: You have deployed an instance running a web server in a subnet in your VPC. When you try to connect to it through a browser using HTTP over the Internet the connection times out. Which of these steps could fix the problem? (Select THREE)
- [x] Check that the VPC contains an Internet Gateway and the subnet's route table is routing 0.0.0.0/0 to the Internet Gateway
- [ ] Check that the VPC contains a Virtual Private Gateway and that the subnets route table is routing 0.0.0.0/0 to the Virtual Private Gateway
- [x] Check that the security group allows inbound access on port 80
- [ ] Check that the security group allows outbound access on port 80
- [x] Check that the network ACL allows inbound access on port 80
Explanation: We need to be able to access the internet, and that it can hit our server through both the ACL and Security Group

Which of the following actions can be controlled with IAM policies? (Select THREE)
- [ ] Creating tables in a MySQL RDS database
- [x] Configuring a VPC security group
- [ ] Logging into a .NET application
- [x] Creating an Oracle RDS database
- [x] Creating an Amazon S3 Bucket
Explanation: The other two are application level control, not the service level control.

You want to create a group of Amazon EC2 instances in an application tier subnet that accepts HTTP traffic only from instances in the web tier (a group of instances in a different subnet sharing a web-tier security group). Which of the following will achieve this?
- [ ] Adding a load balancer in front of the web tier instances
- [x] Associating each instance in the application tier with a security group that allows inbound HTTP traffic from the web-tier security group
- [ ] Adding an ACL to the application tier subnet that allows inbound HTTP traffic from the IP range of the web tier subnet
- [ ] Changing the routing table for the web tier subnet to direct traffic to the application tier instances based on IP address
Explanation: Security groups can be used to allow only access from other security groups.

## Module 4: Design Cost-Optimized Architectures

You are asked to make a PDF file publicily available on the web. This file will be downloaded by customers using their browsers millions of times. Which option will be the most cost effective?
- [x] Store the file in S3 Standard
- [ ] Store the File in S3 Standard - IA
- [ ] Store the file in Glacier
- [ ] Store the file on EFS
Explanation: It is accessed frequently and must be publically available, so cheaper cost per access is important (could also cache for more savings in a CDN)

## Module 5: Define Operationally-Excellent Architectures

Question: To monitor CPU utilization on your RDS instance you set up a CloudWatch alarm with a threshold of 70% over 3 periods of 5 minutes. If CPU utilization goes up to 80% for 10 minutes, how many alarms will you receive?
- [x] Zero
- [ ] One
- [ ] Two
- [ ] Three
Explanation: Had to reach fifteen minutes to trigger alarm (over 70% 3 times in a row with intervals of 5 minutes between)

Question: You are responsible for a web application running on amazon EC2 instances. You want to track the number of 404 errors that users see in the application. Which of the following options can you use?
- [ ] Use VPC Flow Logs
- [ ] Use CloudWatch metrics
- [x] Use CloudWatch Logs to get the web server logs from EC2 instances
- [ ] Web application on AWS never have 404 errors
Explanation: We can get the logs from the EC2 instances into CloudWatch Logs, others don't provide it or are false.

Question: You have written an application that needs access to a particular bucket in S3. The application will run on an EC2 instance. What should you do to give the application access to the bucket securely?
- [ ] Store your access key and secret access key on the EC2 instance in a file called 'secrets'
- [x] Attach an IAM role to the EC2 instance with a policy that grants it access to the bucket in S3
- [ ] Store your access key in a secret key on the EC2 instances in '$HOME/.aws/credentials'
- [ ] Use S3 bucket policies to make the bucket public
Explanation: Roles are used for temporary access, easy to attach to EC2 instances, and access to S3 bucket access can be given through them.
