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
    tags: ['file I/O', 'regex', 'Counter'],
    stdlib: true,
    demonstrates: 'Line-by-line file reading, regex matching, and Counter for frequency aggregation — the core pattern for any log analysis task.',
    whenToUse: 'Parse access logs, error logs, audit trails. Pure stdlib, zero dependencies, works everywhere.',
    interview: 'Mention Counter.most_common(n) — cleaner than sorting a dict. Walk through why parts[8] is the status field in CLF format.',
    code: `#!/usr/bin/env python3
"""Parse access log — top N source IPs causing 5xx errors."""
import sys, re
from collections import Counter

def top_5xx_ips(path, n=10):
    ips = []
    with open(path) as f:
        for line in f:
            parts = line.split()
            if len(parts) > 9 and parts[8].startswith('5'):
                ips.append(parts[0])
    for ip, count in Counter(ips).most_common(n):
        print(f"{count:>6}  {ip}")

def count_levels(path):
    counts = Counter()
    with open(path) as f:
        for line in f:
            m = re.match(r'^(ERROR|WARN|CRIT)', line)
            if m:
                counts[m.group(1)] += 1
    for level, n in counts.most_common():
        print(f"{n:>6}  {level}")

if __name__ == '__main__':
    path = sys.argv[1] if len(sys.argv) > 1 else '/var/log/access.log'
    top_5xx_ips(path)`,
  },
  {
    id: 'health-checker',
    heading: 'HEALTH CHECKER',
    tags: ['HTTP check', 'exit codes'],
    stdlib: true,
    demonstrates: 'Checking service availability with urllib, using exit codes correctly so the script is safe to call from cron or a CI pipeline.',
    whenToUse: 'Pre-deployment readiness checks, cron-based monitoring, pipeline gates. No external deps.',
    interview: 'The key design point: exit 0 = all clear, exit 1 = action needed. Pipelines and cron depend on this contract.',
    code: `#!/usr/bin/env python3
"""Check endpoints, report status, exit 1 if any fail."""
import sys
import urllib.request

CHECKS = [
    ('app',     'http://localhost:8080/health'),
    ('metrics', 'http://localhost:9090/metrics'),
]

def check(name, url, timeout=3):
    try:
        with urllib.request.urlopen(url, timeout=timeout) as r:
            ok = r.status == 200
            print(f"{'  OK' if ok else 'FAIL'}  {name}  HTTP {r.status}")
            return ok
    except Exception as e:
        print(f"FAIL  {name}  {e}")
        return False

results = [check(name, url) for name, url in CHECKS]
sys.exit(0 if all(results) else 1)
# exit 0 = all healthy  |  exit 1 = one or more failed`,
  },
  {
    id: 'boto3-target-health',
    heading: 'BOTO3 — ALB TARGET HEALTH',
    tags: ['AWS SDK', 'ALB', 'IAM role'],
    stdlib: false,
    demonstrates: 'Calling the AWS API via boto3, extracting nested data from the response, and exiting with a meaningful status code.',
    whenToUse: 'Operational scripts on EC2 or Lambda. boto3 picks up the instance profile automatically — no keys needed.',
    interview: 'Mention: instance profile = no hardcoded keys. The role needs elbv2:DescribeTargetHealth — scope it tightly.',
    code: `#!/usr/bin/env python3
"""Check ALB target group health, exit 1 if any target unhealthy."""
import boto3, sys

def check_targets(tg_arn):
    client = boto3.client('elbv2')
    resp = client.describe_target_health(TargetGroupArn=tg_arn)

    unhealthy = []
    for t in resp['TargetHealthDescriptions']:
        state  = t['TargetHealth']['State']
        target = t['Target']['Id']
        reason = t['TargetHealth'].get('Reason', '')
        print(f"{'  OK' if state == 'healthy' else 'FAIL'}  {target:20}  {state}  {reason}")
        if state != 'healthy':
            unhealthy.append(target)

    if unhealthy:
        print(f"\\n{len(unhealthy)} unhealthy target(s)")
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("usage: check_targets.py <tg-arn>", file=sys.stderr)
        sys.exit(2)
    check_targets(sys.argv[1])
# boto3 uses instance profile on EC2 — no static keys required`,
  },
]
