> [Back to readme](./readme.md)

# Session Information

The session information from this class. Exame is based off of the [well-architected framework](https://aws.amazon.com/architecture/well-architected/).

## Module 1: Design Resiliant Architectures

- Choose Reliable/Resiliant Storage
- Determine how to design decoupling mechanisms using AWS services
- Determine how to design a multi-tier architecture solution
- Determine how to design high-availability and/or fault tolerant solutions

### Storage Options

#### Instance Stores
Temporary Data attached to an instance, but fast
- Ephemeral Volumes
- Only certain EC2 instances
- Fixed capacity
- Disk type and capacity depend on EC2 instance Type
- Application-level durability

#### Elastic Block Store (EBS)

Persistent Data through virtual drive

- Different Types
  - SSD - IOPS, good for random access
    - General Purpose
    - IOPS
  - HDD - Throughput, cost effective, good for large sequential data
    - Thoughput Optimized
    - Cold Storage
- Encryption
- Snapshops
- Provisioned Capacity
- Independent lifecyle
- Multiple volumes striped to create large volumes

#### EFS

[See the entry page](https://aws.amazon.com/efs/) for current capabilities.

- File storage in the AWS Cloud
- Shared Storage
- Paetabytee-scale file system
- Elastic capacity

#### S3

- Consistency Model - Eventually consistent for updates, immedietly for new
- Storage Classes and Durability 
  - Standard
    - Cheaper Access Cost
    - Higher Storage Costs
  - Standard Infrequently Accessed
    - Cheaper Storage Cost
    - Higher Access Cost
- Encryption (Data At Rest)
  - SSE-S3
    - SS3 Managed Master Key is used to Encrypt Server Side
  - SSE-KMS
    - KMS Managed Master Key is used to Encrypt Server Side
  - SSE-C
    - Customer Managed Master Key is used to Encrypt Server Side
- Encryption (data in transit) - HTTPS
- Versioning - With this on, will not accidently delete, and keep a history of each file version
- Access Control
- Multi-part upload (upload parts in paralle l)
- Internet-API accessible
- Virtually Unlimted Capacity (5tb per object uploaded max)
- Regionally Available
- High Durability of 11 9s (99.999999999%)

##### Glacier

- Data Backup and archival storage
- Archives
  - Collection of files
- Vaults
  - Collection of archives
- Retrievals 
  - expediated
    - Expensive, but can be done in five minutes
  - standard
  - bulk
    - Cheapest, up to 12 hours retreival
- Encryption by default
- Amazon S3 object lifecyle policy
  - Move automatically
- Regional avilablility
- High Durability of 11 9s

#### Question

Question: A database is running on an EC2 instance. The database software has a backup feature that requires block storage. What storage option would be the lowest cost option for the backup data?
- [ ] Amazon Glacier
- [ ] EBS Cold HDD Volume
- [ ] Amazon S3
- [ ] EBS Throughput Optimized HDD Volume

### Decoupling Our Service

In first example, we have a Web Server Hooked into an Email Service hooked into an Email Server. Should the Email Service go down, the web server won't work right. By introducing a queue (AWS Simple Queue Service), the Web Server can keep going even if the Email Service Goes Down for some reason. They are no longer tied together.

Similar example, but this time with logging service. Also, scaling it as needed... making things decoupled allows each part to scale as needed, not the whole system.

#### Question

Question: Which of the following AWS Services facilitate the implementation of loosely coupled architectures? (Select TWO)
- [ ] AWS CloudFormation
- [ ] Amazon Simple Queue Service
- [ ] AWS CloudTrail
- [ ] Elastic Load Balancing
- [ ] Amazon Elastic MapReduce

## High Availability

"Everything Fails, All the time" - Design your service not to be interupted when failure occurs. Tiers should scale independently, load balancers help.

### Questions: 

Question: Your web service has a performance SLA to respond to 99% of requests <1 second. Under normal and heavy operations, distributing requests over four instances meets performance requirements. What architecture ensures cost efficient high availability of your service if an Availability Zone becomes unreachable?
- [ ] Deploy the service on four servers in a single Availability Zone
- [ ] Deploy the service on six servers in a single Availability Zone
- [ ] Deploy the service on four servers across two Availability Zones
- [ ] Deploy the service on eight servers across two Availality Zones

Question: Your web service has a performance SLA to respond to 99% of requests <1 second. Under normal and heavy operations, distributing requests over four instances meets performance requirements. What architecture ensures cost efficient fault-tolerant operation of your service if an Availability Zone becomes unreachable?
- [ ] Deploy the service on four servers in a single Availability Zone
- [ ] Deploy the service on six servers in a single Availability Zone
- [ ] Deploy the service on four servers across two Availability Zones
- [ ] Deploy the service on eight servers across two Availality Zones

#### CloudFormation

A service to design infrastructure as code.

##### Question

Question: You are planning to use CloudFormation to deploy a Linux EC2 instance in two different regions using the same base Amazon Machine Image (AMI). How can you do this using CloudFormation?
- [ ] Use two different CloudFormation templates since CloudFormation templates are region specific
- [ ] Use mappings to specify the base AMI since AMI IDs are different in each region
- [ ] Use parameters to specify the base AMI since AMI IDs are different in each region
- [ ] AMI IDs are identical across regions

#### AWS Lambda

Lambda is stateless code, paid per invocation and compute time. Must run in under 15 minutes.

##### Questions

Question: How can I access the output of print statements from Lambda?
- [ ] SSH into Lambda and look at system logs
- [ ] Lambda writes all output to Amazon S3
- [ ] CloudWatch Logs
- [ ] Print statements are ignored in Lambda

Question: You are running an EC2 instance which uses EBS for storing its state. You take an EBS snapshot every day. When the system crashes it takes you 10 minutes to bring it up again from the snapshot. What is your RTO and RPO going to be?
- [ ] RTO will be 1 day, RPO will be 10 minutes
- [ ] RTO will be 10 minutes, RPO will be 1 day
- [ ] RTO and RPO will be 10 minutes
- [ ] RTO and RPO will be 1 day

## Test Axioms

- Expect "Single AZ" will never be a right answer
- Using AWS managed services should always be preferred
- Fault tolerant and high availability are not the same thing
  - Fault tolerant means the system hides its failure from the users, they are unaware
  - High availability means that the system is still available, even when not running as well as expected
- Expect that everything will fail at some point and design accordingly

## Module 2: Design Performant Architectures

### Best Practices
- Choose Performant Storage and Database
- Apply Caching
- Design solutions for elasticity and scalability

### S3
Move static things to S3, so that web server is processing just dynamic content. Bucket names are globally unique.

Pricing is based upon
- GBs per month
- Transfer out of region
- PUT, COPY, POST, LIST, and GET requests

Free 
- Transfer in to S3
- Transfer from S3 to Amazon CloudFront in same region.

#### Questions

Question: In what ways does Amazon S3 object storage differ from block and file storage? (SELECT THREE)
- [ ] Amazon S3 allows storing an unlimited number of objects
- [ ] Objects are immutable - the only way to change a single byte is to replace the object
- [ ] Objects are replicated across Availability Zones
- [ ] Objects are replicated across all regions

Question: Which of the following are features of Amazon EBS? (Select TWO)
- [ ] Data stored on Amazon EBS is automatically replicated within an Availability Zone
- [ ] Amazon EBS data is automatically backed up to tape
- [ ] Amazon EBS volumes can be encrypted
- [ ] Data on Amazon EBS volumes is lost when the attached instance is stopped

### Performant Storage on Databases

Redshift gives a SQL Database, and is designed for aggregate numbers across a table (it is for data warehousing).
RDS is going to give a managed Relational Database. When using joings, you want to use this. DynamoDB is made for scaling/auto-sharding - good for simple GET/PUT.

DynamoDB is the managed NoSQL Key/Value database offering from AWS. It gets paid using Read Capacity Units and Write Capacity Units measuring the throughput.

#### Questions

Question: Which Amazon Relational Database Services (Amazon RDS) database engines support read replica?
- [ ] Microsoft SQL Server and Oracle
- [ ] MySQL, MariaDB, PostgreSQL, and Aurora
- [ ] Aurora, Microsoft SQL Server, and Oracle
- [ ] MySQL and PostgreSQL

Question: Which AWS database service is best suited for non-relational databases?
- [ ] Amazon Redshift
- [ ] Amazon Relational Database Service (Amazon RDS)
- [ ] Amazon Glacier
- [ ] Amazon DynamoDB

### Caching

Applying Caching to improve performance. You can cache at the web level with a CDN such as CloudFront. This keeps your servers from being hit as much. You may use ElastiCache to cache data from the database so that you are not hitting the database as much.

#### Questions

Question: Which of the following objects are good candidates to store in a cache? (Select THREE.)
- [ ] Session state
- [ ] Shopping Cart
- [ ] Product catalog
- [ ] Bank account balance

Question: Which of the following cache engines are supported by Amazon ElastiCache (Select TWO)
- [ ] MySQL
- [ ] Memcached
- [ ] Redis
- [ ] Couchbase

### Amazon CloudFront

Can be used for static and dynamic content (use ttl of 0). Dynamic content is then served through the AWS backbone. 

#### Questions

Question: Which services work together to enable auto scaling of EC2 instances?
- [ ] Auto Scaling and Elastic Load Balancer
- [ ] Auto Scaling and CloudWatch
- [ ] Auto Scaling, Elastic Load Balancer, and CloudWatch
- [ ] Elastic Load Blancer and CloudWatch
- [ ] Auto Scaling

Question: What is the template that Auto Scaling uses to launch a fully configured instance automatically?
- [ ] AMI ID
- [ ] Instance type
- [ ] Key pair
- [ ] Launch configuration
- [ ] User data

### Auto Scaling

Auto scaling is performed with the following.
- Auto Scaling launch configuration
  - EC2 instance size and AMI name
- Auto Scaling Group
  - Referes to the launch configuration
  - Specifies min, max, and desired size of the Auto Scaling group
  - May reference an ELB
  - Health Check Type
- Auto Scaling Policy
  - Specifies how much to scale in or scale out
  - One or more may be attached to Auto Scaling group

Uses CloudWatch to decide when to scale in and out, looking at the metrics, or using metrics created from patterns in CloudWatch logs. Registers with the Elastic Load Balancer to allow the new instances to be used.

#### Questions

Question: A radio station runs a contest where every day at noon they make an announcment that generates an immediate spike in traffic that requires 8 EC2 instances to process. All other times the web site requires 2 EC2 instances.
Which is the most cost effective way to meet these requirements?
- [ ] Create an Auto Scaling group with a minimum capacity of 2 and scale out based upon CPU utilization
- [ ] Create an Auto Scaling group with a minimum capacity of 8 at all times
- [ ] Create an Auto Scaling group with a minimum capacity of 2 and set a schedule to scale out at 11:40 am
- [ ] Create an Auto Scaling group with a minimum capacity of 2 and scale out based upon memory utilization

Question: An application runs on EC2 instances in an Auto Scaling group. The application runs optimially on 9 EC2 instances and must have at least 6 running instances to maintain minimally acceptable performance for a short period of time. Which is the most cost-effective Auto Scaling group configuration that meets the requirements?
- [ ] A dedired capacity of 9 instances across 2 Availability Zones
- [ ] A desired capacity of 9 instances across 3 Availability Zones
- [ ] A desired capacity of 12 instances across 2 Availability Zones
- [ ] A desired capacity of 9 instances across 1 Availability Zone

Question: Which of the following are characteristics of the Auto Scaling service on AWS? (Select THREE)
- [ ] Sends traffic to healthy instances
- [ ] Responds to changing conditions by adding or terminating Amazon EC2 instances
- [ ] Collects and tracks metrics and sets alarms
- [ ] Delivers push notifications
- [ ] Launches an instance from a specified Amazon Maching Image (AMI)
- [ ] Enforces a minimum number of running Amazon EC2 instances

Question: The web tier for an application is running on 6 EC2 instances spread across 2 availability zones behind an ELB Classic Load Balancer. The data tier is a MySQL database running on an EC2 instance. What changes will increase the availability of the application? (Select TWO)
- [ ] Launch the web tier EC2 instances in an Auto Scaling group
- [ ] Migrate the MySQL database to a Multi-AZ RDS MySQL database instance
- [ ] Turn on CloudTrail in the AWS account of the application
- [ ] Turn on cross-zone load balancing on the Classic Load Balancer
- [ ] Increase the instance size of the web tier EC2 instance

### Test Axioms

- If data is unstructured, Amazon S3 is generally the storage solution.
- Use caching strategically to improve performance.
- Know when and why to use Auto Scaling (you can even have it set to a same min/max so that it only kills off unhealthy instances)
- Choose the instance and database type that makes the most sense for your workload and performance need.

## Module 3: Secure Architectures

### Best Practices
- Determine how to secure application tiers
- Determine how to secure data
- Define the networking infrasturcture for a single VPC network, and understand how to secure it

- Infrastructure
  - Shared Responsibility Model - what parts AWS is responsible for, vs customer.
- Protecting your AWS resources
  - Principle of least privilege - no access that is not absolutely needed per user/role
  - Identities - Use IAM to create users, groups, and roles

#### Question

Question: Your AWS account administrator left your company today. The administrator had access to the root user and a personal IAM administrator account. With these accounts, he generated IAM users and keys. Which of the following should you do today to protect your AWS infrastructure? (Select THREE)
- [ ] Change the password and add MFA to the root user
- [ ] Put an IP restriction on root user logins
- [ ] Rotate keys and passwords for IAM users
- [ ] Delete all IAM users
- [ ] Delete the administrator's IAM user
- [ ] Relaunch all EC2 instances with new roles

### Amazon VPC

A Virtual Private Cloud, organized in subnets of private IP addresses. You use routing tables, Access Control Lists (at the VPC level), and Security Groups (network interface or EC2 instance) to keep security. Keep seperate tiers, with security groups having access to security groups, so that each can only access the next level, not all levels. Recommend reading through or watching more on Networking if not familiar with it.

#### Question

Question: You have deployed an instance running a web server in a subnet in your VPC. When you try to connect to it through a browser using HTTP over the Internet the connection times out. Which of these steps could fix the problem? (Select THREE)
- [ ] Check that the VPC contains an Internet Gateway and the subnet's route table is routing 0.0.0.0/0 to the Internet Gateway
- [ ] Check that the VPC contains a Virtual Private Gateway and that the subnets route table is routing 0.0.0.0/0 to the Virtual Private Gateway
- [ ] Check that the security group allows inbound access on port 80
- [ ] Check that the security group allows outbound access on port 80
- [ ] Check that the network ACL allows inbound access on port 80

### Securing the Data Tier

Normal web tech for securing while in transit.
S3 Data is private by default. Can use server side encryption, or client side encrption for data at rest. There are serves available (SSE or CSE products). Can stores in KMS or CloudHMS.

#### Questions

Which of the following actions can be controlled with IAM policies? (Select THREE)
- [ ] Creating tables in a MySQL RDS database
- [ ] Configuring a VPC security group
- [ ] Logging into a .NET application
- [ ] Creating an Oracle RDS database
- [ ] Creating an Amazon S3 Bucket

You want to create a group of Amazon EC2 instances in an application tier subnet that accepts HTTP traffic only from instances in the web tier (a group of instances in a different subnet sharing a web-tier security group). Which of the following will achieve this?
- [ ] Adding a load balancer in front of the web tier instances
- [ ] Associating each instance in the application tier with a security group that allows inbound HTTP traffic from the web-tier security group
- [ ] Adding an ACL to the application tier subnet that allows inbound HTTP traffic from the IP range of the web tier subnet
- [ ] Changing the routing table for the web tier subnet to direct traffic to the application tier instances based on IP address

### Test Axioms

- Lock down the root user
- Security groups only allow. Network ACLs allow explicit deny
- Prefer IAM roles to access keys.

## Module 4: Design Cost-Optimized Architectures

### Best Practices
- Determine how to design cost-optimized
  - storage
  - compute

You pay as you go, less when reserved, often tiered so cheaper.

Main things paid for - compute, storage, and data transfer.

Check pricing pages for current rates.

#### Question

You are asked to make a PDF file publicily available on the web. This file will be downloaded by customers using their browsers millions of times. Which option will be the most cost effective?
- [ ] Store the file in S3 Standard
- [ ] Store the File in S3 Standard - IA
- [ ] Store the file in Glacier
- [ ] Store the file on EFS

### Serverless Architectures

Use serverless to save by paying for just what you use. You may use Lambda, S3, DynamoDB, and Amazon Gateway to create things. You can cache data on CloudFront (CDN) so that it is also cheaper. It can help with performance as well.

### Test Axioms

- If you know it is going to be on, reserve it.
- Any unused CPU time is a waste of money.
- Use the most cost-effective data storage service and class.
- Determine the most cost-effective EC2 pricing model and instance type for each workload.

## Module 5: Define Operationally-Excellent Architectures

System that is automated and adapts to changing processes.

Prepare, operate, evolve.

### Best Practices
- Perform operations with code
- Annotate docs
- Make frequent, small, reversible changes
- Refine operations procedures frequently
- Anticipate failure
- Learn from all operational failures - keep same failure from happening again

Use the following tools to help with this
- AWS Config: Track changes to resources, verifies that they comply with your rules
- AWS CloudFormation: Deploy infrastructure as code
- AWS Trusted Advisor: Automatically check for improvements
- AWS Inspector: Checks EC2 instances for security vulnerabilities
- VPC Flow Logs: Track what is happening in your VPC
- AWS Cloud Trail: Logs API Calls.
- CloudWatch: Stores log files from EC2 instances, Cloud Trail, and Lambda.

#### Questions

Question: To monitor CPU utilization on your RDS instance you set up a CloudWatch alarm with a threshold of 70% over 3 periods of 5 minutes. If CPU utilization goes up to 80% for 10 minutes, how many alarms will you receive?
- [ ] Zero
- [ ] One
- [ ] Two
- [ ] Three

Question: You are responsible for a web application running on amazon EC2 instances. You want to track the number of 404 errors that users see in the application. Which of the following options can you use?
- [ ] Use VPC Flow Logs
- [ ] Use CloudWatch metrics
- [ ] Use CloudWatch Logs to get the web server logs from EC2 instances
- [ ] Web application on AWS never have 404 errors

Question: You have written an application that needs access to a particular bucket in S3. The application will run on an EC2 instance. What should you do to give the application access to the bucket securely?
- [ ] Store your access key and secret access key on the EC2 instance in a file called 'secrets'
- [ ] Attach an IAM role to the EC2 instance with a policy that grants it access to the bucket in S3
- [ ] Store your access key in a secret key on the EC2 instances in '$HOME/.aws/credentials'
- [ ] Use S3 bucket policies to make the bucket public

### Test Axioms
- IAM roles are easier and safer than keys and passwords
- Monitor metrics across the system
- Automate responses to metrics where appropriate
- Provide alerts for anomalous conditions