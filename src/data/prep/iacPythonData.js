export const tfS3Example = `provider "aws" {
  region = var.region
}

variable "region" { default = "ap-southeast-2" }
variable "env" {}   # required — no default, must be supplied

resource "aws_s3_bucket" "logs" {
  bucket = "my-app-logs-\${var.env}"
}

resource "aws_s3_bucket_versioning" "logs" {
  bucket = aws_s3_bucket.logs.id
  versioning_configuration { status = "Enabled" }
}

output "bucket_name" {
  value = aws_s3_bucket.logs.bucket
}`

export const tfWorkflowExample = `terraform init      # download providers, initialise backend
terraform validate  # syntax check — no API calls
terraform plan      # show diff vs state — read before every apply
terraform apply     # execute the plan
terraform destroy   # tear down all resources in state

terraform state list              # list managed resources
terraform state show <resource>   # inspect one resource
terraform output                  # print output values`

export const tfRemoteStateExample = `terraform {
  backend "s3" {
    bucket         = "my-tf-state"
    key            = "prod/terraform.tfstate"
    region         = "ap-southeast-2"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
# DynamoDB table prevents concurrent applies corrupting state
# One state file per environment — separate keys or buckets`

export const pythonScripts = [
  {
    id: 'log-parser',
    heading: 'LOG PARSER',
    tags: ['file I/O', 'Counter'],
    stdlib: true,
    demonstrates: 'Line-by-line file reading and Counter for frequency analysis — the core pattern for any log task.',
    whenToUse: 'Parse access logs to find 5xx sources. Pure stdlib, no dependencies.',
    interview: 'Mention Counter.most_common(n) — cleaner than sorting a dict. parts[8] is the status field in CLF format.',
    code: `#!/usr/bin/env python3
from collections import Counter

ips = []

with open("access.log") as f:
    for line in f:
        parts = line.split()  # split(",") for CSV
        if len(parts) > 8 and parts[8].startswith("5"):
            ips.append(parts[0])

counts = Counter(ips)

for ip, count in counts.most_common(5):
    print(ip, count)`,
    extras: [
      {
        label: 'dict alternative (no Counter)',
        code: `counts = {}

for ip in ips:
    counts[ip] = counts.get(ip, 0) + 1

# sorting:
sorted_counts = sorted(
    counts.items(),
    key=lambda x: x[1],
    reverse=True
)`,
      },
    ],
  },
  {
    id: 'health-checker',
    heading: 'HEALTH CHECKER',
    tags: ['HTTP check', 'exit codes'],
    stdlib: true,
    demonstrates: 'Checking service availability with urllib and using exit codes so the script is safe in cron or a pipeline.',
    whenToUse: 'Pre-deployment readiness checks, cron monitoring, pipeline gates. No external deps.',
    interview: 'Key design point: exit 0 = all clear, exit 1 = action needed. Pipelines and cron depend on this contract.',
    code: `#!/usr/bin/env python3
import urllib.request
import sys

urls = [
    ("app",     "http://localhost:8080/health"),
    ("metrics", "http://localhost:9090/metrics"),
]

failed = 0

for name, url in urls:
    try:
        r = urllib.request.urlopen(url, timeout=3)
        print("OK  ", name, r.status)
    except Exception as e:
        print("FAIL", name, e)
        failed += 1

sys.exit(1 if failed else 0)`,
  },
  {
    id: 'boto3-target-health',
    heading: 'BOTO3 — ALB TARGET HEALTH',
    tags: ['AWS SDK', 'ALB', 'IAM role'],
    stdlib: false,
    demonstrates: 'Calling the AWS API via boto3, pulling nested data from the response, exiting with a meaningful status code.',
    whenToUse: 'Operational scripts on EC2 or Lambda. boto3 picks up the instance profile — no keys needed.',
    interview: 'Mention: instance profile = no hardcoded keys. The role needs alb:DescribeTargetHealth — scope it tightly.',
    extras: [
      {
        label: 'real-world improvement',
        code: `# Real-world improvement:
# dynamically discover the Target Group ARN instead
# of passing it manually.

# Example:
#
# resp = alb.describe_target_groups(Names=["my-target-group"])
# tg_arn = resp["TargetGroups"][0]["TargetGroupArn"]`,
      },
    ],
    code: `#!/usr/bin/env python3
import boto3
import sys

# s3 = boto3.client("s3")
# ec2 = boto3.client("ec2")

tg_arn = sys.argv[1]

alb = boto3.client("alb")
resp = alb.describe_target_health(TargetGroupArn=tg_arn)

failed = 0

for t in resp["TargetHealthDescriptions"]:
    state  = t["TargetHealth"]["State"]
    target = t["Target"]["Id"]
    reason = t["TargetHealth"].get("Reason", "")
    print(state, target, reason)
    if state != "healthy":
        failed += 1

sys.exit(1 if failed else 0)`,
  },
]

export const operationalScripts = [
  {
    id: 'disk-usage-reporter',
    heading: 'DISK USAGE REPORTER',
    tags: ['disk', 'lsof', 'deleted files'],
    stdlib: true,
    demonstrates: 'subprocess to run shell commands, lsof +L1 to catch deleted-but-held files that du misses.',
    whenToUse: 'Disk full incidents. Finds what is consuming space including files deleted but still held open.',
    interview: 'Mention lsof +L1 — files deleted but held open by a process. du misses them, df counts them. That gap trips people up.',
    code: `#!/usr/bin/env python3
import subprocess

result = subprocess.run(["du", "-sh", "/var/log"], capture_output=True, text=True)

for line in result.stdout.splitlines():
    size, path = line.split("\\t", 1)
    print(size, path)

lsof = subprocess.run(["lsof", "+L1"], capture_output=True, text=True)

if lsof.stdout.strip():
    print("\\nDeleted files still held open:")
    print(lsof.stdout)`,
  },
  {
    id: 'db-connection-monitor',
    heading: 'DB CONNECTION MONITOR',
    tags: ['connections', 'ss', 'monitoring'],
    stdlib: true,
    demonstrates: 'Polling loop with subprocess and time.sleep to build a timestamped trend.',
    whenToUse: 'Connection exhaustion incidents. Watch the trend over time, not just a single snapshot.',
    interview: 'The value is the trend. 90 connections is ambiguous — watching it climb from 10 to 90 in 2 minutes means leak.',
    code: `#!/usr/bin/env python3
import subprocess
import time
import datetime

port = "5432"
interval = 5

while True:
    result = subprocess.run(
        f"ss -tp | grep ESTABLISHED | grep :{port} | wc -l",
        shell=True, capture_output=True, text=True
    )
    count = result.stdout.strip()
    ts = datetime.datetime.now().strftime("%H:%M:%S")
    print(ts, "connections:", count)
    time.sleep(interval)`,
  },
]
