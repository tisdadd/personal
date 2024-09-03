> [Back To readme](./readme.md)

# Techonologies Used

Technologies used in the course for the application building, as well as some extra details. Note that more technologies are covered in the course, but are not what the employee ampplication was created with. There was also a module on serverless, though not exentsively utilized in this class app creation, nor listed origianlly in things covered.

- Amazon VPC (Virtual Private Cloud) - A virtually segregated section of the cloud for your usage
- Amazon EC2 (Elastic Compute Cloud) - VMs on AWS
  - Offered in multiple ways (cost changes based on model)
    - On Demand
      - Payed for by hour or second
      - For short-term, spiky, or unpredictable workloads that should not be interupted
    - Spot Instances
      - Up to 90% off
      - Requires user has flexible start/end times - they take advantage of unused capacity in the cloud
      - Application should be fault-tolerent (two minute warning when it will be turned off)
      - You choose a behavior for when interrupted
    - Reserved Instances
      - Discounted compared to on-demand
      - Use with predictable workloads
      - Purchased in one year or three year
    - Dedicated Host
      - A physical EC2 Server dedicated to you
      - Can use your existing server-bound software licenses
      - Compliance if you must be on a dedicated server
      - Can use the AWS License Manager
- Amazon RDS(Relational Database Service)/Dynamo DB - Started achitecture with RDS (traditional relational database model), and changed to DynamoDB (Key Value Database)
- Amzone S3 (Simple Storage Service)
- Amazon CloudWatch
- ELB (Elastic Load Balancer)
- Amazon EC2 Autoscaling - Used to add or remove EC2 instances based upon defined rules
- Amazon IAM (Identity and Access Management) - User, Group, and Role Management to the Amazon Web Services
- Lambdas - Used as an example of how something could be done using a Lambda.
  - Serverless functions - just create the code, and upload, it will run.
  - Many readings on this, as well as other serverless, available in [links](./links.md)