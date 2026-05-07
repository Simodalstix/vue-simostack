export const iacCards = [
  {
    title: 'CDK Overview',
    body: `Define infrastructure in Python (or TypeScript, Java, Go).
Synthesises to CloudFormation. Deployed via CloudFormation changesets.
A real programming language: loops, conditionals, functions, reusable constructs.
Build a pattern once, compose it — not copy it.

**Why CDK over Terraform in AWS-only environments:**
  Same language as app code — devs can read and contribute to infra.
  L2/L3 constructs encode best practices — less boilerplate.
  Native CloudFormation integration — no state file management.
  Complex logic (dynamic constructs, loops) is cleaner than HCL.`,
  },
  {
    title: 'CDK Constructs',
    body: `**L1** — CloudFormation resource (CfnBucket, CfnFunction)
     Direct mapping to CloudFormation. Full control, maximum verbosity.
     Use when L2 doesn't expose the property you need.

**L2** — Opinionated abstraction (Bucket, Function, Vpc)
     Sane defaults. Most common usage. Hides CloudFormation complexity.
     bucket.grantRead(role) — IAM wired automatically.

**L3** — Pattern / solution construct (ApplicationLoadBalancedFargateService)
     Entire architecture in one construct.
     Less flexible, fastest to scaffold, opinionated on design.`,
    code: `from aws_cdk import aws_s3 as s3, RemovalPolicy

bucket = s3.Bucket(self, "MyBucket",
    encryption=s3.BucketEncryption.S3_MANAGED,
    versioned=True,
    removal_policy=RemovalPolicy.RETAIN)

bucket.grant_read(my_role)`,
    wide: true,
  },
  {
    title: 'CDK Workflow & Structure',
    body: `App structure:
  app.py             entry point — CDK reads this to find stacks
  stacks/            one file per logical stack
  cdk.json           toolkit config, context, feature flags
  requirements.txt   pin versions — CDK breaks on minor bumps`,
    code: `cdk synth      # render CloudFormation — catch errors before touching infra
cdk diff       # show what will change vs deployed stack
cdk deploy     # deploy via CloudFormation changeset
cdk destroy    # tear down the stack
cdk bootstrap  # provision CDK toolkit stack in account/region (once)`,
  },
  {
    title: 'Terraform Core Concepts',
    body: `HCL — HashiCorp Configuration Language. Declarative.
Describe end state — Terraform calculates what to create/change/destroy.

**Provider**   declares which cloud/service to target (aws, azurerm, kubernetes)
**Resource**   the thing you are creating (aws_instance, aws_s3_bucket)
**Data**       read existing infrastructure without creating it
**Variable**   input — parameterise configs for reuse
**Output**     expose values from a module or stack
**Module**     reusable collection of resources with inputs and outputs
**State**      terraform.tfstate — source of truth for what Terraform manages
           Never edit manually. Treat as infrastructure.`,
  },
  {
    title: 'Terraform Workflow',
    body: `Target a specific resource:
  terraform plan -target=aws_instance.web
  terraform apply -target=aws_instance.web

Import existing resource into state:
  terraform import aws_s3_bucket.my_bucket my-bucket-name`,
    code: `terraform init      # download providers, initialise backend
terraform validate  # check syntax without hitting the API
terraform plan      # show what will change — read before every apply
terraform apply     # execute the plan
terraform destroy   # tear down all resources in state
terraform output    # print output values from current state`,
  },
  {
    title: 'Terraform State Management',
    body: `Local state: default. Fine for learning. Never use in production.
Remote state: shared, locked, versioned. Required for team use.

DynamoDB table prevents concurrent applies corrupting state.
One state file per environment (dev/staging/prod) — separate keys or buckets.
State contains sensitive values — encrypt bucket, restrict IAM access.`,
    code: `# S3 backend with DynamoDB locking
terraform {
  backend "s3" {
    bucket         = "my-tf-state"
    key            = "prod/terraform.tfstate"
    region         = "ap-southeast-2"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}

terraform state list              # list all resources in state
terraform state show <resource>   # inspect one resource
terraform state rm <resource>     # remove from state without destroying`,
    wide: true,
  },
  {
    title: 'CDK vs Terraform',
    body: `**Choose CDK when:**
  AWS-only environment — no multi-cloud requirement
  App team is Python/TypeScript — single language across infra and code
  Complex logic — loops, conditionals, shared abstractions
  Want CloudFormation drift detection and rollback built in

**Choose Terraform when:**
  Multi-cloud or non-AWS resources (Cloudflare, Datadog, Kubernetes)
  Team unfamiliar with Python/TypeScript — HCL is readable by most
  Existing Terraform estate — don't mix IaC tools in one environment
  Need provider ecosystem breadth (1,000+ providers on registry)

Do not mix CDK and Terraform in the same environment for the same resources.
Pick one and be consistent — drift between tools creates incidents.`,
  },
]
