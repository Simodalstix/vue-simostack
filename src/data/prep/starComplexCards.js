export const starComplexCards = [
  {
    title: 'Ghost MFA Policy — Login Blocked',
    logo: '/images/companies/cititec-logo.jpg',
    question: 'Tell me about a technically complex problem you\'ve had to work through.',
    anchors: [
      { tag: '[DATA]', text: 'Redirect URL — identified which auth flow they were hitting, not just that it was broken' },
      { tag: '[DATA]', text: 'User returning from leave — explains why this hadn\'t surfaced recently' },
      { tag: '[DATA]', text: 'Traced full chain: CA policy → Duo Members group → on-prem AD → separate sync agent VM' },
      { tag: '[DATA]', text: 'Delta sync attempted on DC — wrong host, had to discover correct topology first' },
      { tag: '[DATA]', text: 'User back in the same call after escalation; root cause documented' },
      { tag: '[LP]',   text: 'Dive Deep — didn\'t accept surface error, traced across two systems to find the chain' },
      { tag: '[LP]',   text: 'Earn Trust — escalated at the right boundary with full context so ops manager could act immediately' },
      { tag: '[TONE]', text: 'Systematic, not showy. The complexity is that every step revealed the next constraint.' },
    ],
    rehearsal: `A call came in — user couldn't log in, error wasn't descriptive. But the redirect URL was. It was a Duo MFA page, which stood out immediately because the user didn't have Duo installed. No enrolled device, so the authentication flow just died there.

I asked a senior engineer whether we still used Duo. Confirmed decommissioned — nobody should be hitting that flow. So this wasn't a broken MFA setup, it was a ghost policy still active for this specific user.

I pulled the Entra conditional access policies and found one still enforcing Duo MFA success for members of a synced security group — 'Duo Members' — sitting in on-premises AD. The user was still in it. Because that group was on-prem authoritative, synced via Entra Connect, I couldn't touch it from the cloud side. Went to the DC, removed him from the group directly.

Then I tried to trigger a delta sync — ran Start-ADSyncSyncCycle on the domain controller, no response. Wrong host. The Entra Connect sync service runs on a separate server. I didn't have access to it, so I'd hit the limit of what I could do. I brought the ops manager in with the full picture: root cause identified, group corrected, sync not propagating and here's why.

Turned out he and a senior were already working on that system — probably why the sync was behaving oddly. He forced it through manually.

The policy stopped intercepting, the user was back in within the hour. I documented the root cause — stale Duo group membership tied to an active conditional access policy — so if it hit another user, the next person wouldn't be starting from zero.

What stayed with me was how much the redirect URL mattered. A generic access denied message would've sent me in completely the wrong direction. Pattern recognition on one detail — knowing that URL was Duo, knowing that was wrong — that was the whole investigation.`,
    cues: [
      'SITUATION',
      'User returning from leave couldn\'t log in — error wasn\'t descriptive',
      'Redirect URL was a Duo MFA page — Duo had been decommissioned',
      'User had no Duo installed — flow dies at the redirect',
      'Live call — user actively waiting, needed a resolution not a callback',
      '---',
      'ACTION',
      'Redirect URL identified which auth flow they were hitting — used that as the investigative lead',
      'Pulled Entra Conditional Access — found a ghost policy still enforcing Duo',
      'Policy was scoped to a \'Duo Members\' group — group lived in on-prem AD, synced to Entra',
      'On-prem is authoritative — can\'t edit group membership from the cloud side',
      'Attempted delta sync from the DC — wrong host, no access — had to discover the topology',
      'Identified that the DC and the Azure AD Connect sync agent are on separate VMs — segregated infrastructure',
      'Hit my access boundary — brought ops manager in with the full picture (policy → group → on-prem → topology constraint)',
      'Ops manager was already on the Azure AD Connect VM — forced the sync manually',
      '---',
      'RESULT',
      'Group membership propagated, CA policy stopped intercepting — user back in before the call ended',
      'Documented root cause: stale group + active CA policy — so next person starts from a better position',
      '---',
      'CLOSE',
      'The redirect URL was the whole investigation — not the error message',
      'The returning-from-leave detail explains why nobody else had hit it',
      'Discovering the segregated topology before escalating meant the ops manager could act immediately',
    ],
    lps: ['Dive Deep', 'Customer Obsession', 'Earn Trust', 'Deliver Results'],
    toneWarning: 'Systematic, not showy. Don\'t let the tech names become the story — the reasoning is.',
  },
  {
    title: 'Packer AMI Pipeline — Built from Scratch',
    logo: '/images/project-icons/Packer.svg',
    question: 'Tell me about something technical you built that you\'re proud of.',
    anchors: [
      { tag: '[DATA]', text: 'Recognised AMI management as foundational to AWS at scale — underpins DR, fleet consistency, reproducible deployments. Deliberate learning target.' },
      { tag: '[DATA]', text: 'Chose Packer deliberately — cloud-agnostic, industry standard, not AWS-specific' },
      { tag: '[DATA]', text: 'Two-layer pipeline: base → app. Each build ~10–15 min on a t3.small' },
      { tag: '[DATA]', text: 'SSM Parameter Store as config bus — zero hardcoded AMI IDs anywhere' },
      { tag: '[DATA]', text: 'verify_build.sh — explicit PASS/FAIL smoke tests before AMI is created' },
      { tag: '[LP]',   text: 'Learn and Be Curious — practical signal (hackathon) → went and learned it holistically, not just enough for the task' },
      { tag: '[LP]',   text: 'Invent and Simplify — SSM as handoff; downstream never touches a hardcoded ID' },
      { tag: '[TONE]', text: 'Enthusiasm is genuine — don\'t over-explain the architecture, let the SSM insight land naturally' },
      { code: 'aws ec2 create-image \\\n  --instance-id i-1234567890abcdef0 \\\n  --name "my-manual-ami" \\\n  --no-reboot' },
    ],
    rehearsal: `Image management kept coming up as a pattern in serious systems work — golden AMIs, consistent instance state, reproducible builds. I had a genuine gap there and decided to fill it properly rather than just read about it.

I started the way most people do — SSH into the instance, configure it manually, snapshot it. It works, but it's not reproducible and you have no idea what's actually on the image over time. That's what pushed me toward Packer properly.

I picked Packer deliberately — it's cloud-agnostic and the industry standard for image building. I wanted something transferable, not just an AWS-specific tool.

I designed a two-layer pipeline. The base layer handles everything that belongs on every instance — OS hardening, CloudWatch agent, SSH config, kernel parameters via sysctl. The app layer inherits from base and adds the Python runtime, FastAPI, and the systemd service unit. The thing I'm most proud of is how I wired the two layers together — SSM Parameter Store as the handoff. The base build writes its AMI ID to /ops-lab/images/base-ami-id. The app template reads that at build time as its source AMI. The ASG reads /ops-lab/images/app-ami-id on every deploy. Nothing downstream ever touches a hardcoded ID — you rebuild an image and the whole stack picks it up.

I also added a verify_build.sh that runs inside the builder instance before the AMI is sealed — explicit PASS/FAIL checks for every service and dependency, so a broken build fails immediately rather than producing a bad image silently. Each build is a separate ephemeral t3.small — launches, provisions, creates the AMI, terminates. Around 10-15 minutes per layer.

The SSM pattern was the real insight — once you wire infrastructure to reference a parameter rather than a hardcoded value, you start seeing where else that applies. It's the same principle as not hardcoding container image tags. And the pre-baked images have a direct connection to DR — an ASG in a recovery region launching from a known-good AMI is meaningfully faster than bootstrapping from scratch at launch time.`,
    cues: [
      'SITUATION',
      'During the hackathon I hit a point where I needed to build an image manually — and I was caught out. Didn\'t have the fundamentals.',
      'That\'s when I understood how foundational AMI management actually is — reproducible deployments, scaling, DR. All of it depends on getting this right.',
      '---',
      'ACTION',
      'Chose Packer — cloud-agnostic and widely used',
      'Split builds into two layers: hardened base (OS hardening, fail2ban, sysctl, CW agent) → app image (Python 3.11, FastAPI, systemd unit)',
      'Biggest design choice: avoid hardcoded AMI IDs entirely',
      'Used SSM Parameter Store as the handoff point — base writes its AMI ID, app layer reads it, ASG consumes the latest automatically',
      'Made the whole stack modular and rebuildable',
      'Wrote smoke tests to validate the image before sealing it',
      '---',
      'RESULT',
      'Pipeline runs on demand via CodeBuild — one CLI command triggers the build, AMI ID lands in SSM automatically',
      'Went from not being able to create an image manually to having a fully automated two-layer pipeline',
      '---',
      'CLOSE',
      'Breakthrough project — SSM as a config bus was the real insight, downstream stacks read a parameter, never a hardcoded ID',
      'I reused that exact pattern across the rest of the ops-lab platform to wire five projects together',
    ],
    scripts: [
      {
        name: 'publish_ami.py',
        description: 'Write a newly baked AMI ID to SSM Parameter Store and tag the AMI.',
        policy: [
          'Verifies AMI is in available state before promoting — fails fast rather than publishing a bad image',
          'Writes both the AMI ID and a build version timestamp (YYYYMMDD-hhmm) to SSM',
        ],
        usage: [
          'publish_ami.py --ami-id ami-0abc1234 --type base',
          'publish_ami.py --ami-id ami-0abc1234 --type app --region ap-southeast-2',
        ],
      },
      {
        name: 'verify_ami.py',
        description: 'Verify the AMI in Parameter Store exists, is available, and has consistent tags.',
        policy: [
          'Reads the AMI ID from SSM and describes it in EC2 directly — confirms SSM and reality are in sync',
          'Explicit PASS/FAIL checks for state, Name, Project, Type, and PublishedAt tags',
        ],
        usage: [
          'verify_ami.py --type base',
          'verify_ami.py --type app --region ap-southeast-2',
        ],
      },
      {
        name: 'deprecate_ami.py',
        description: 'Deprecate AMIs beyond the retention window, optionally deregistering very old ones.',
        policy: [
          'SSM-current AMI always protected',
          '3 most recent kept active',
          'Older AMIs deprecated — hidden from default searches, still launchable',
          '--deregister-older-than-days N to permanently remove beyond that age',
        ],
        usage: [
          'deprecate_ami.py --type base --dry-run',
          'deprecate_ami.py --type app --deregister-older-than-days 90',
        ],
      },
    ],
    lps: ['Learn and Be Curious', 'Invent and Simplify', 'Dive Deep'],
    toneWarning: 'Genuine enthusiasm. Don\'t over-explain the architecture — let the SSM insight land naturally.',
  },
]
