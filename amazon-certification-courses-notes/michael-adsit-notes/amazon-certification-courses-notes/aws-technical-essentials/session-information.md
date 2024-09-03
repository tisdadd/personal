> [Back To readme](./readme.md)

# Session Information

Here information is kept on what is learned in the various sessions, not including the linked resources.

Throughout the sessions, an employeee application is used to demonstrate what is happening.

## Global Infrastructure

Uses photos, so want to upload to AWS, ensuring use from anywhere and avoiding single points of failure.

### Learning how that works

- Cluster of Data Centers is an Availability Zone (AZ)
- Cluster of AZ is a Region
- You pick the Region based upon
  - Compliance 
    -  First to look at, as may have a legal requirement to keep data there, giving no choice but for there.
  - Latency
    - How close something is to user makes it less speedy
  - Pricing
    - Some regions are more expensive (potentially due to tax structures, or other things)
  - Service availability
    - Not all services are always available right away on every region.
- Regions have a geographical name (US West (Oregon)), and code (us-west-2)
- __DATA IN EACH REGION IS NOT REPLICATED TO OTHERS WITHOUT EXPLICIT CUSTOMER CONSENT AND AUTHORIZATION__
- Availibility zones also have code names (us-east-1a)
- AWS services have scope of AZ, Region, or Global 
  - if asked for a specific AZ, you are responsible for the data durability and high availability 
    - There could be a single point of failure potentially, so make sure to use at least two AZ's in case one fails.
    - Use region scoped when possible.

## Using API Calls

No physical access, so need to use the APIs

### AWS Management Console

Web based GUI for interacting with the services

- Point and click, easy to start with some services without knowing anything.
- Can see everything that you can work with at one time, choosing region from upper right hand corner.
- Everything must be done manually, leading to easier human error

### AWS CLI (Command Line Interface)

Use the terminal to interact. Must learn the syntax, but can script things.

- `aws` - The command line entry point

### AWS SDKs (Software Development Kits)

Made and maintened for many popular languages. Can be run inside of projects.

## Security and the AWS Shared Responsibilty Model

Both AWS and You are responsible for securing the Envirnoment.

### Customer Responsibility

Responsible for Security _in_ the Cloud.

- Customer Data
- Platform, Applications, Identity and Access Management
- Operating System, Network and Firewall Configuration
- Client Side Data Encryption and Data Integrity Authentication
- Server Side Encryption (File System and/or Data)
- Networking Traffic Protection (Encryption, Integrity, Identity)

CUSTOMER OWNS THE DATA - some AWS solutions may exist to help keep secure.

### AWS Responsibility

Responsible for Security _of_ the Cloud. Responsible up to the Virtualization Layer.

- Software
  - Compute
  - Storage
  - Database
  - Networking
- Hardware/AWS Global Infrastructure
  - Regions
  - Availability Zones
  - Edge Location

### Build securely and keep things up to date (inferred)

This means that you should continue security best practices, and make sure things are kept up to date. Pretend you are working with a legacy infrastrucure if that helps. Don't leave ports open that you would not normally, ect. Always assume you are responsible for choosing right physical location for legal purposes, and ensure the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) for access is used as well as encrypting data at rest as required as well as on the move. Also, do not forget to check your backup policies.

### Multiple Categories of Shared Responsibility

Below Table is a Brief Overview of the Responsibilities

| Category                                                              | AWS Responsibility                                               | Customer Responsibility                                                             |
| --------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Infrastructure services                                               | Underlying infrastructure and foundation services                | OS, Application Platform, Data - Protection (access, encryption, backups), firewall |
| Container services (NOT DOCKER or K8s, but the application container) | Infrastructure services + OS and Application Platform            | Data - Server side and Client Side                                                  |
| Abstracted Services                                                   | Container  Services + Server Side Encryption and Data Protection | Managing Customer Data and Protecting Client Side                                   |

## AWS Root User

The user you sign up with becomes the root user of the AWS Account. They have unrestricted access to everything in the account. Do not let anyone get this user - they could start mining bitcoins off of your money. Use Multi Factor Authentication (MFA)! Use another user with permissions where possible.

- When signing up with a root user, it will require a credit card
- Authentication - Get the identity of the user
- Authorization - Check actions allowed to that user - ROOT USER CAN DO EVERYTHING

## AWS Identity and Access Management (IAM)

- Access Levels
  - App level access controls - IAM would not be responsible for this part
- AWS API calls Must be Authenticated and Signed
- Amazon S3 needs API

To build this, need access to an AWS account that can create the infrastructure, the root user could do this, but you do not want to use it if possible. Quite probably, you will need different groups of people doing different things.

### Account Level

Users for the account, takes care of authentication. Users must then be authorized for each part.

#### Attach IAM Policies

- Allows specific AWS Actions (API Calls) on a allow, deny
- Structure
```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow", // Allow or Deny
        "Action": "ec2:RunInstances", // * for all actions
        "Resource": <Amazon Resource Name Here>, // * for all resources
        "Condition": {
            <Conditions Here>
        }
    }]
}
```

Can be attached to group or user. A group is a set of users.

### Best Practices

use Root User to [create IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html), then log out and back in as the IAM user. Then groups for policies, then users to those groups.

### IAM Users

- Global (not tied to region)
- Integrated with much of AWS by default
- Allowing of password minimum complexities and rotations
- Allowing of MFA
- Supporting of Identity Federations (using username/password from other places for access)
- Free (no additional charge) for AWS customers

## Role Based Access in AWS

Roles get a temporary access in AWS with a set of permissions.

Code needs an AWS access key ID and secret access key to sign AWS API Calls to call to Amazon S3.

We can do this with a Role rather than a user.

- Roles have no static login credentials
- Programatically Required
- Expire and rotated

EC2 instance gets a role on launch.

### Note on Lesson

For this part of the lesson, you need to create an AWS account. It will require a credit card to do so. Additionally, you should immediately do the best practice of MFA for your root user and create a user with permissions of IAM:Full Access to use instead, as you can then use that user to manage other users, groups, and roles with their permissions. You may do so in a simular method to what you see in the video, but for a different user. It is still wise to keep this user (and all others) highly secure.

### Assigning Amazon S3 Full Access Role

In the console, we can go to IAM > Roles > Create Role. Then follow the steps.
- Choose s3 as trusted entity
- Chose managed permission of AmazonS3FullAccess, which has the below code generated
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*", // super broad, want more granular in real world
                "s3-object-lambda:*"
            ],
            "Resource": "*"
        }
    ]
}
```
Lesson will also have you choose another role - when creating roles and groups, make sure that you have the number selected that was intended, then you can double check on the next page (step 3) that it has what you meant to.

### Other Notes

- IAM is meant for AWS resource access.
- Consider an Identity Provider for the user application, or if you span multiple AWS accounts, assigning roles if needed.
  - AWS Single Sign On mentioned in lesson, or check our security documentation.

## AWS IAM Demonstration - Setting Up Three Users

- user-1 Read Only Access S3
- user-2 Read Only Access EC2
- user-3 Limited Abilities for actions with EC2

During this lesson, it has some stuff to check that has not yet been filled in as we didn't create the resources to test against.

TODO: Come back and test users after having an S3 bucket and EC2 Instances?

## Employee Directory Application Hosting with Amazon EC2

Every EC2 instance must be in a network. EC2 should be micro to [keep free (750 hours of t2 micro instances)](https://aws.amazon.com/ec2/pricing/). You will see "Free tier eligible" when it is something you can use with the free tier. You may do this with user-3 from the last lesson, except for you will need to add in the action `"iam:ListInstanceProfiles"`, but will run into issues later.
- TODO: Learn if future lessons finish configuring user, fix this area.

## Compute as a Service

Compute as a Service is setting up servers as a servicee.
Most of the time will be spent learning about EC2 - but do not assume VMs are always the correct or right answer, you may want container services or serverless.

## Amazon Elastic Compute Cloud

Pay per second or hour with EC2 instances - turn them off to no longer receive charges. EC2 instances may be created using several OS's, starting with an Amazon Machine Image (AMI).
One or many instances may be launched from the AMI, creating identical instances. Different instance types gives different hardware to meet your goals. Can quickly experiment to optimize for your solution. Do not need to over-provision.

AMI Contains
- Root Volume Template
  - Typically OS
  - Pre-installed Applications at Boot
- Launch Permissions

EC2 Instances must have the following defined
- Hardware Specs (CPU, Network, Memory, Storage)
- Logical Configuration (Networking Location, Firewall Rules, Authentication, OS, ect)

"EC2 instances are live instantiations of what is defined in an AMI, much like a cake is a live instantiation of a cake recipe."
Basically, AMI is like a standard (Docker) Container Image, but for the EC2 VM instead of something else. The AMI Defines the machine. Or, you could just think of it as the install disk for your computer setup.

Once you create an EC2 instance, you may configure it farther and then make an AMI to set up identically configured instances.

There are many ways to get an AMI
- Quick start - created by AWS
- AWS Marketplace - Like Docker Hub
- My AMIs - Created from your EC2 Instances
- Community AMIs - Provided by AWS User Community
- EC2 Image Builder - Use to Create Your Own from scratch

## Amazon EC2 Instance Lifecycle

EBS-backed lifecycle

1. Launched from AMI
2. Enters a 'pending state' while booting
3. Enters a 'running state' - ready to use, you are now being charged
   - reboot command
   - stop command
      1. stopping
      2. stopped
        - start command (goes to pending)
        - terminate command
            1. terminated
    - Stop-Hibernate command
      1. stopping
      2. stopped
      3. running
    - Terminate command
      1. shutting-down
      2. terminated

Once terminated, everything from the instance is gone forever. Later lessons will cover keeping the data. Launching a new instance with updates then terminating outdated can keep things running and not having to spend more.

Only charged in running state (minimum of one minute), or stopping state getting ready to hibernate. Additionally, rebooting is considered not leaving the running state.

### More on EC2 Instance Types

When selecting your instnace type, you can see what the machine has. The letter determines what the machine is optimized for (c for generic computation), number the generation of hat machine, and size descriptor how much memory.

Instance Families include
- General Purpose - A balanced machine, not specializing in anything
- Compute Optimized - High-Performance Processors
- Memory Optimized - Fast Performance for Memory Intense Workloads, such as in-memory caching
- Accelerated Computing - Uses hardware accelerators, good for GPU intensive things
- Storage Optimized - For fast read/write from storage, such as in a database or Elasticsearch

### EC2 instance locations

By default, the instance will launch in your default Amazon Virtual Private Cloud (Amazon VPC) network. This network is public and accessible by the internet, so avoid sensitive data in it. Consider changing the default once you are more familiar with AWS networking.

Remember, for higher availability, you want to scale horizontally with more tiny instances rather than few larger instances. It is recommended to have instances running in at least two AZs.

## Demonstration: Launch the Employee Directory Application on Amazon EC2

The standard workflow for launching a web application on Amazon EC2.

- Launch Instance
- Add instructions to user data
- Test Web Application
- Connect to EC2 instance console

Starting with IAM account to log into console... not authorized...
Looks like we are going to learn more later. Starts with same steps as 'Employee Directory Application Hosting with Amazon EC2'.

Key pairs are required if you are wanting to not use EC2 connect. 

Want to make sure that status checks pass. To check web, you can use the public DNS name. EC2 Connect will give the connection shell in server. Instance is terminated at end of demonstration. 

## Container Services

Containers (like Docker) provide you with flexibility and portability. Contaners have shorter boot up time.

### Container Orchestration Services
- Amazon Elastic Container Service (ECS)
  - Run at scale without managing the orchestration software
- Amazon Elastic Kubernetes Services (EKS) 
  - Similar to ECS, but different tooling (standard k8s)

Interact with API Calls
- Automate scaling of cluster and containers

You could do it on EC2 instance cluster or AWS Fargate, a serverless platform for ECS or EKS

### More from lesson
"A container is a standardized unit that packages your code and its dependencies. This package is designed to run reliably on any platform, because the container creates its own independent environment. With containers, workloads can be carried from one place to another, such as from development to production or from on premises to the cloud."

Containers share the same OS and kernal they exist on, while VMs contain their own OS. Containers are more lightweight, spinning up almost instantly (great for fast scaling with IO bursts).

In AWS, containers run on EC2 instances. Important to know
- How to place containers on instances
- What happens if your container fails
- What happens ifyour instance fails
- How to monitor deployments of your containers

#### ECS

Install Amazon ECS container agent on your EC2 instances in a cluster. Often, such instances refered to as a "container instance". Once these are running, you can start scaling at a container level as well as management operations. To run the container, you need a task (container) definition, such as the below simple example

```json
{
"family": "webserver",
"containerDefinitions": [ {
"name": "web",
"image": "nginx",
"memory": "100",
"cpu": "99"
} ],
"requiresCompatibilities": [ "FARGATE" ],
"networkMode": "awsvpc",
"memory": "512",
"cpu": "256"
}
```

#### EKS

Kubernetes service by Amazon, you can use it if you are familiar with Kubernetes(k8). For playing with k8s locally, you may want to use [microk8s](https://microk8s.io/) or [minikube](https://kubernetes.io/docs/tutorials/hello-minikube/). [Docker](https://www.docker.com/) images work on k8s as well.

In EKS, the EC2 instance is called a worker node, the container is called a pod, and EKS does not run on AWS native technology, but instead Kubernetes.

## Serverless

You may not need as much control over the architecture, but still want the benefits of such an architecture. Serverless takes care of that for you, as it is abstracted away from you. Here, you do not worry about underlying OS and won't have to patch. One example of serveless compute is AWS Fargate, it can have ECS and EKS run on top of it. In Fargate, scaling and fault tolerence is built in, just worry about the container itself and how you want it to run. Serverless gives up control in exchange for convience. 

## AWS Lambda

Lambda allows you to package and upload your code to an AWS service. Lambda functions run in response to triggers. Some common triggers are http request, upload of file, events originating from other services. Code is run in an isolated environment maintened by AWS. You choose similar settings to containers. Designed for code that runs in under 15 minutes.

Resize photo example, ran only on upload. Pick a runtime, give a IAM Role. Add a trigger. Be careful not to use same output as input to avoid infinate recursion. Do the function code.

A Lambda function has three primary components, trigger, code, and configuration.

Lambda function handler name is derived from name of file, then function. By default it is `lambda_function.lambda_handler` (file name is `lambda_handler`.extension, function name is `lambda_function`)

## Choose the Right Compute Service

Use case choosing to review reasons on why different compute services.

## Networking

Covers basic networking principles. IPv4 from 32 bits, CIDR Notation (/# at end of IPv4, where # is how many bits are fixed)

## Amazon Virtual Private Cloud

VPC acts as the boundry to isolate from the world without your explicit permission. Give an IP range - first make sure that you are in the right region. Then create a subnet for more granular controls to access. To create a subnet, you need VPC, AZ, IP range. By default, new VPCs are not public, you must add an Internet Gateway (IGW) and attach it to your VPC. If we want to lock down to specific IPs, we can make a Virtual Private Gateway (VGW) to create an encrypted VPN connection. Don't forget to add a second AZ.

Each subnet has five IPs reserved for routing, DNS, and network management. They are the first four addresses, and the last, of the subnet from the diagram.

## Amazon VPC Routing

Just because traffic made it to the IGW, doesn't mean it went to the right subnet. This is done through route tables (rules). These can be done at VPC or subnet table. It is assumed if a VPC has multiple subnets, then all subnets are able to reach each other. This can be verified in the route table. If you want more specific routes, you need to do so with a custom route. Create the table, then edit it. Finally associate it with the subnets that you want.

## Amazon VPC Security

Any new VPC is isolated from internet traffic. You have two options to keep it secured once you start opening it to the internet - Network Access Control Lists (ACL) and Security Groups.

### Network ACL 

Firewall at Subnet Level

- Default Network ACL allows all traffic in and out of the subnet
- Change configuration to lock it down
- Make the Rule that allows just what you want, and deny everything else
  - Do the inbound and outbound rules, not just one or the other.
- Stateless

### Security Groups

Security Groups are around the EC2 instances.

- Default blocks all incoming, allows all outgoing. 
- Statefull - allows traffic back if initiated by the EC2 instance.

## Demonstration: Create a VPC and Relaunch the Corporate Directory Application in EC2

Demonstrating making a VPC with public and private subnet, NAT gateway, Internet Gateway, and elastic IP address.  NAT gateway is used to let the private subnet through to the internet, uses the Elastic IP.

### Pricing notes
Elastic IP Address is free when the right conditions are met. NAT Gateways are charged per hour and per gb that goes through. See [thread](https://forums.aws.amazon.com/thread.jspa?threadID=234959&start=0&tstart=0) about surprise bills, and [a potential easy solotuion](https://hackernoon.com/dealing-with-an-aws-billing-surprise-beware-the-defaults-d8a95f6635a2). These were in relation to lambdas, but for the NAT Gateway. 

## Storage Types

Several types of storage needed for the app, OS and App, Structured Data, and Images. We can use block storage and object storage.

Block storage is split into small pieces (think database columns at a row), and object storage is one chunk (think full picture). Depending upon how much updated, want to evaluate. File storage is tree based, and is the model you may be used to with your computer.

## Amazon EC2 Instance Storage and Amazon Elastic Block Store

When you launch an EC2 instance, you will need to have a type of block storage. EC2 instance store is close to the actual server (and therefore fast) and directly attached to the EC2 instance. Its life cycle is also attached directly to the EC2 instance, and goes away when you shut down the instance. EBS is a network attached storage solution (EBS Volumes) but, like a USB connection it is only attached to one at a time. They are usually one to one, but there are multi-instance ones available (EBS multi-attach). If the instance goes down, the EBS Volume is still there. Two main types of volumes - SSD and HDD. EBS Volumes should be backed up with snapshots. EBS Volumes may be scaled horizontally or vertically.

## Object Storage with Amazon Simple Storage Service (S3)

EBS is not as scalable as S3. Standalone solution, not attached to compute. Nicknamed storage for the internet. Individual object size limit is 5tb. This uses object storage. It is also distrubted across multiple AZs with 11 9s of durability.

You store your objects in buckets. You may have folders inside of the buckets. Buckets are region specific, but name must be unique across all AWS accounts, and much follow url convetions. Console allows standard upload/browsing. Access is denied by default, it is all private to the user unless you work through making it public.

You may use IAM policies, or S3 bucket policies. S3 bucket policies specify what actions are allowed or denied on the bucket, are only placed on full buckets, not individual objects in the buckets.

Format of an object url is `http://{bucketName}.s3.amazonaws.com/{Object/Key}`

You may want to use S3 versioning, to keep history of the file.

Six Storage Classes in S3 (All prefixed with Amazon S3)
- Standard
- Intelligent-Tiering
- Standard Infrequent Access (S3 Standard-IA)
- One Zone-Infrequent Access (S3 One Zone-IA)
- Glacier
- Glacier Deep Archive

You may automate tier (class) transitions with object lifecycle management.

## Choose the Right Storage Service

Another question section to watch and answer with. Brought up Amazon Elastic File System (EFS). EFS is offered in three flavors, the normal ESF, for Windows File Server, and Lustre.

## Demonstration: Create an Amazon S3 Bucket

Creates a bucket name, in the demo to keep low latency putting bucket in same region as EC2 instance. Configures permissions with a bucket policy.

## Databases on AWS

App allows CRUD, and needs the data stored in the database. The architecture diagram shows Amazon RDS. You can run databases on an EC2 instance, but still are responsible for a large chunk of the load. Instead, you may use a managed database offering, being left with the Application Data itself. Some reading about enterprises and relational databases.


## Amazon Relational Database Service

Amazon RDS makes it easier to set up a relational database. There is an easy create button for best-practices automatically selected. Several engines available. You may set up an RDS MultiAZ Deployments for best practices still. It is built on compute and storage, so you can pick options from that. You may secure with IAM. You will still want to do backups (automatatic and manual)

## Purpose-Built Databases

Choosing the right database requirements, rather than forcing your data to fit the database choice. Different Amazon offerings are made for specific data types. 
Amazon DynamoDB (key-value) is great for non-relationl data, charges based on usage and storage, not by the hour. For employee application, this is a better choice. DocumentDB is documents... Neptune is for graphs. For immutable data, QLDB (Quantum Ledger Database) - No record can ever be removed.

## Amazon DynamoDB

DynamoDB Tables are stand alone, with items and attributes. Underlying storage is taken care of for you, it is stored redundently under the hood. Milisecond response time. Flexible schema, as a no-sql type. Queries are ran on one table, not multiple. Walk through of making a table, do need keys on DynomoDB.

DynamoDB takes away the need to worry about operating and scaling a distributed database. It organizes data in tables with items. An item is a group of attributes uniquely identifiable among all the other items. Encryption at rest is available.

## Choose the Right Database Service

A table to help pick the right database type for the use cases.

| Database Type | Use Cases                                                                                      | AWS Service                                    |
| ------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Relational    | Traditional appllications, ERP, CRM, e-commerce                                                | Amazon RDS, Amazon Aurora, Amazon Redshift     |
| Key-value     | High-traffic web apps, e-commerce systems, gaming applications                                 | Amazon DynamoDB                                |
| In-memory     | Caching, session management, gaming leaderboards, geospatial applications                      | Amazon ElastiCache for Memcached or Redis      |
| Document      | Content management, catalogs, user profiles                                                    | Amazon DocumentDB (with MongoDB compatibility) |
| Wide column   | High-scale industrial apps for equipment maintenance, fleet management, and route optimization | Amazon Keyspaces (for Apache Cassandra)        |
| Graph         | Fraud detection, social networking, recommendation engines                                     | Amazon Neptune                                 |
| Time series   | IoT applications, DevOps, Industrial telemetry                                                 | Amazon Timestream                              |
| Ledger        | Systems of record, supply chain, registrations, banking transactions                           | Amazon QLDB                                    |

Applications are now built on smaller services, you can use multiple databases based upon what the purpose is.

## Monitoring

Example - Users see application is running slowly. Want to get metrics over time for staticics.  You can create a baseline, then set alerts if it goes too far away from that. Amazon CloudWatch lets you see everything in one place. 

Some purposes of monitoring include: visitor analitics, heath checks, capacity checks, alerting. Different services will have different metrics to report. It is important to be able to respond, when possible, before an issue occurs, or when someone is attempting to attack (example: suddeny one IP address is sending 1000 requests a minute, when normally you get 5 a minute). Metrics can also be used to determine where you can have savings, as well as making data-driven decisions.

You may use Amazon CloudWatch to do much of this. As the next lesson is Amazon CloudWatch, won't go into details here.

## Amazon CloudWatch

Walk through making a dashboard for the CPU usage of the EC2 instance, with an alarm if the CPU goes above 60% for a period of time. Many services automatically send metrics to CloudWatch. Cloudwatch acts as a centralized place for metrics, like an ELK stack can but by default and ability to send custom metrics still.

A dashboard in CloudWatch lets you see metrics from many things in one place. Create the widget from Metrics or Logs. Fairly normal setup. You may, programmatically, send custom metrics. CloudWatch alarms let you define thresholds for what you are monitoring, and you may pick actions that occur in response. Alarms are always in In Alarm, OK, or Insufficient Data. You may have an SNS (Simple Notification Service) topic, and give email addresses. Give alarm a name too, and you can see visually on the metric preview. It remains in the Insufficient Data state for a while in the example.

Metrics have a timestamp, and are organized into namespaces. Namespaces are like categories. Dimensions (name/value pairs) are sent for each metric. It is possible to look at this data in another tool by using the GetMetricDataAPI, and of course control access with IAM.

You may send logs to CloudWatch as well as metrics. Some services don't take much configuration to do so (Lambdas for instance just need the permissions), others take more (EC2 needs an agent installed and configured). 

Log events have a timestamp and event message, and are grouped into Log streams. Log streams are sequences of log events belonging to the same resource, and are grouped into log groups. Log groups are log streams that share the same retention and permissions settings. 

## Solution Optimization

We want to prevent and respond automatically to issues. You may automate the horizontal scaling based on pre-defined conditions using EC2 autoscaling. However, you then need a load balancer (Elastic Load Balancer). Then you don't need to use the public IPs. There is info about Active-Active vs Active-Passive Load Balancing, but from other resources know you generally want Active-Active with a stateless application - hence the growing popularity of tokens instead of sessions in the last ten years.

## Traffic Routing with Amazon Elastic Load Balancing (ELB)

Browser->ELB->EC2 instance->ELB->Browser. ELB is a highly avaiable and automatically scalable (redundency taken care of). You do still need to make sure that the application is scaling as well. For the application you can use the Application Load Balancer (ALB). Need a listener set up with port. Then, need a target group (backen to direct traffic to). Each target group needs a health check available. You also define rules, each listener has a default rule.

We go over making an ELB through the EC2 page in the console. Must chooose availability zones as part of this, along with the subnets. Also, want a security group. Next, register targets in the group.

ELB can work in hybrid mode, as it can load balance to IP addresses, including on-prem instead of cloud servers. ELB just needs to be deployed across multiple AZs to be highly available, and automatically scales. Health checks may mean making a custom page that checks that all resources an instance needs are available (say you have run out of connections to the DB for some reason, and try to launch a new instance, the health of that instance would be bad since it cannot connect). The Autoscaling should remove and create a new EC2 instance if something that had good health no longer does. If EC2 Auto Scaling is scaling down, it lets ELB know, and ELB can have it do "connection draining" for shutdown.

### Application Load Balancer (ALB)
- routes traffic based on request data
- sends responses directly too the client
- uses TLS offloading
- authenticates users
- secures traffic
- uses the round-robin routing algorithm or least outstanding request routing algorithm
- uses sticky sessions with cookies (use if stateful application)
- is specifically for HTTP and HTTPS traffic

### Network Load Balancer (NLB)
- supports TCP, UDP, and TLS Protocols
- uses a flow hash routing algorithm
- has sticky sessions (based on source-ip)
- supports TLS offloading
- handles millions of requests per second
- static and elastic IP addresses
- preserves source IP adresses

## Amazon EC2 Auto Scaling

Auto Scaling is what allows us to provision more capacity on demand, can be provisioned through cloud watch. We create a launch template, you can use the check box for EC2 autoscaling helper. Configure as before when making an EC2 instance to launch. Now we need to create an auto-scaling group, using that template. Attach to a load balancer, and choose target group. Then, you can have in the health checks. Now, pick the min/max and desired capacity. Pick a warm-up time and how to decide to scale. 

We walk through the trigger happening, and then see how it happened in cloud watch to scale up. Don't forget if you want to get rid of servers, when cleaning up either set the min to zero or else get rid of the auto-scaling group first.

You may use autoscaling to simply keep everything same size, and get rid of unhealthy instances.

Three scaling policies are available, simple, step, and target-tracking. Simple can use number to scale by, or percentage, and waits a time before doing anything new. Step scaling can be set to respond to additional alarms, even if stuff is currently scaling up already. Target tracking will create CloudWatch alarms for you based upon the metrics you give.

## Demonstration: Configure High Availability for Your Application

Goes over adding scaling and reliablity. Exercise in removing single points of failure. DynamoDB, S3 already handle this. Need to add an Application Load Builder (ALB). Configuring advanced health checks for 40 second checks, and if it fails 4 times in a row. Wait until load balancer is active, then test it. Now setting up the EC2 Auto Scaling Group. Create a launch template, and using Auto Scaling Guidance. Making the same selections made when initial server was created. Now make an Auto Scaling Group using that launch template. Assign to VPC and Subnets, select attach to an existing load balancer and targe group. Can then use the health checks added to the ELB earlier in addition to the EC2 ones. Configure values for capacity. Set up a scaling policy, with the desired state so that it will scale out and in, give some warm up time so it doesn't do too many. You may add a notification (SNS) for when the scaling takes place. A confirmation email for the SNS is sent to opt into. Remember, your existing web server is not part of the existing group, but there is a way to do so.

## Employee Directory Application Redesign

Going over a serverless redesign of the application, taking full advantage of cloud native services. We have a 3 tier application (Presentation, Application, and Data layers). Right now, the EC2 instance is serving the Presentation and Application Layer. 

We start by moving the presentation layer to S3 (static resources). JavaScript is explained super breifly. S3 bucket has static website hosting enabled. Now, we move the Application (business logic) layer to Lambdas. The lambdas are reached through Amzon API Gateway. We make one function per request. Keeping the DynamoDB and S3 photo bucket. We can still use role-based access to get from lambdas to photos.

Using Amazon Route 53 (DNS) and Amazon CloudFront (the edge). Much less infrastructure management needed to get up and running here.