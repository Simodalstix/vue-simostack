export const starComplexCards = [
  {
    question: 'A user can\'t log in. The error isn\'t descriptive. Walk me through your diagnosis.',
    anchors: [
      { tag: '[DATA]', text: 'Duo redirect URL — the diagnostic clue, not the error message' },
      { tag: '[DATA]', text: '30 minutes — resolution time, within SLA, on a live call' },
      { tag: '[DATA]', text: 'Three stakeholders: senior (confirmed Duo decommissioned), ops manager (forced sync), senior already on Azure AD Connect system' },
      { tag: '[DATA]', text: 'Documented root cause — stale group + active CA policy — so next person starts from a better position' },
      { tag: '[LP]',   text: 'Dive Deep — didn\'t accept the surface error, traced through CA policy → synced AD group → wrong sync host' },
      { tag: '[LP]',   text: 'Earn Trust — correctly identified the boundary of your access, escalated with the full picture' },
    ],
    rehearsal: `A call came in from a user who couldn't log in. The error wasn't descriptive — but the redirect URL was. It was a Duo MFA page, which immediately stood out because the user didn't have Duo installed. No enrolled device, no app — so the authentication flow just died at that redirect with no meaningful message. I had about 30 minutes to resolve it.

The Duo URL was the clue. I turned to a senior engineer and asked whether we still used Duo — they confirmed it had been decommissioned, nobody should be hitting that flow. That told me everything: this wasn't a broken MFA setup, it was a ghost policy still active for this specific user.

I pulled the Entra conditional access policies and found one still enforcing Duo MFA success for members of a synced security group — 'Duo Members' — sitting in on-premises AD. The user was still in it. Because that group was on-premises authoritative — synced to Entra via Azure AD Connect — I couldn't touch it from the cloud side. I removed him from the group in on-premises AD directly.

Then I tried to trigger a delta sync to propagate the change. Ran Start-ADSyncSyncCycle on the domain controller — no response, command not recognised. Wrong host. The Entra Connect sync service lives on a separate server, not the DC — I didn't have access to that system. I'd hit the boundary of what I could do, so I brought the ops manager in. I gave him the full picture: root cause identified, group membership corrected, sync not propagating and here's why.

As it turned out, he and a senior engineer had already been working on the Azure AD Connect system — which likely explains why the normal sync path wasn't behaving. He intervened manually at the application level to force the sync through.

The group membership propagated, the conditional access policy stopped intercepting the user's authentication, and he was back in within the 30-minute window. I documented the root cause — stale Duo group membership with an active conditional access policy — so if it affected other users it wouldn't take anyone as long to diagnose.

What stayed with me was how much the redirect URL mattered. A generic access denied message would have sent me in completely the wrong direction. Recognising that URL as Duo — and knowing that was wrong — was the whole investigation. Pattern recognition on one detail saved probably an hour of work.`,
    cues: [
      'SITUATION',
      'User couldn\'t log in — error not descriptive',
      'Redirect URL was a Duo MFA page',
      'User had no Duo installed — flow dies at the redirect',
      '30-minute SLA window, on a live call',
      '---',
      'ACTION',
      'Duo URL the clue → confirmed with senior: Duo decommissioned',
      'Pulled Entra conditional access → found ghost policy still enforcing Duo',
      'Policy tied to \'Duo Members\' group — on-prem AD, synced to Entra',
      'On-prem authoritative → can\'t edit from cloud → removed from AD directly',
      'Tried delta sync: Start-ADSyncSyncCycle on DC → wrong host, no access',
      'Hit access boundary → brought ops manager in with full picture',
      'Ops manager already on the Azure AD Connect system — forced sync manually',
      '---',
      'RESULT',
      'Membership propagated, CA policy stopped intercepting — user back in within 30 min',
      'Documented root cause for future reference',
      '---',
      'CLOSE',
      'Redirect URL was the whole investigation — not the error message',
      'Pattern recognition on one detail saved ~1 hour of work',
    ],
    lps: ['Dive Deep', 'Customer Obsession', 'Earn Trust', 'Deliver Results'],
  },
  {
    question: 'Tell me about a time you identified a recurring problem and built something to fix it properly.',
    anchors: [
      { tag: '[DATA]', text: 'Two-layer pipeline: base → app. Each build ~10–15 min on a t3.small' },
      { tag: '[DATA]', text: 'SSM Parameter Store as config bus — zero hardcoded AMI IDs anywhere in the platform' },
      { tag: '[DATA]', text: 'verify_build.sh — explicit PASS/FAIL smoke tests baked into every build' },
      { tag: '[DATA]', text: 'Retention: 3 most recent kept + current SSM AMI always protected regardless of age' },
      { tag: '[DATA]', text: 'Sysctl hardening failure — real error, traced to builder environment, iterated to fix' },
      { tag: '[LP]',   text: 'Learn and Be Curious — no prior Packer experience, picked it up because I wanted to understand the pattern properly' },
      { tag: '[LP]',   text: 'Invent and Simplify — SSM as handoff between stages; downstream never touches a hardcoded ID' },
    ],
    rehearsal: `While building out my 3-tier platform on AWS, I kept running into the same friction point — every time I needed a new instance, I was launching a bare Amazon Linux image and either running userdata scripts or configuring things manually after the fact. There was no consistency, no versioning, no way to know what was actually on a given instance. I'd read about golden AMI patterns and wanted to understand how it actually worked in practice — so I built it.

I picked up Packer — no prior experience — and designed a two-layer pipeline. The base layer handles everything that belongs on every instance: CloudWatch agent, OS hardening with fail2ban, SSH config tightened via a drop-in file, kernel parameters, AWS CLI. The app layer inherits from base and adds the Python runtime, FastAPI, and the systemd service unit.

The thing that clicked for me was wiring SSM Parameter Store as the config bus between layers. The base build writes its AMI ID to Parameter Store. The app template reads that ID from Parameter Store at build time — no hardcoded values anywhere. The 3-tier ASG reads the app AMI ID from Parameter Store on every deploy. Nothing downstream knows or cares what the actual ID is.

It took a few iterations to get clean builds. The sysctl hardening step was failing because some kernel parameters aren't writable inside the Packer builder environment — I had to trace the error, understand why, and adjust the provisioner. Python was also throwing warnings about running pip as root, which I suppressed. I also added a verify_build.sh that runs inside the builder instance before the AMI is created — explicit PASS/FAIL checks for every service and dependency, so a broken build fails fast rather than producing a bad image silently.

On the lifecycle side, I wrote a deprecation script that keeps the 3 most recent AMIs plus whatever the current SSM parameter points to — that one's always protected regardless of age — and marks older ones deprecated before eventually deregistering them.

I now have a reproducible, versioned image pipeline. Every build produces a known-good AMI with consistent hardening and dependencies baked in. The 3-tier ASG always launches from that — no manual steps, no configuration drift between instances. Build time is around 10–15 minutes per layer on a t3.small builder.

The part that stuck with me was the SSM pattern — using Parameter Store as the handoff between pipeline stages meant I never have to touch downstream infrastructure when I build a new image. The 3-tier stack just picks it up on the next deploy. It's the same principle as not hardcoding container image tags — you point at a reference, not a value. Once I saw it that way it felt obvious, but getting there required actually building it.`,
    cues: [
      'SITUATION',
      'Kept launching bare AMIs and configuring manually — no consistency, no versioning',
      'Wanted to understand the golden AMI pattern properly — no one asked me to build it',
      '---',
      'ACTION',
      'Picked up Packer with no prior experience',
      'Two layers: base (OS hardening, CW agent, SSH config) → app (Python, FastAPI, systemd)',
      'SSM Parameter Store as config bus — base writes AMI ID, app reads it, ASG reads app AMI ID',
      'Zero hardcoded IDs anywhere in the pipeline',
      'Sysctl step failing — traced to builder environment, not writable inside Packer → adjusted provisioner',
      'verify_build.sh — PASS/FAIL smoke tests before AMI is created',
      'Retention: 3 most recent + current SSM AMI always protected',
      '---',
      'RESULT',
      'Reproducible, versioned pipeline — every build produces a known-good AMI',
      'ASG always launches from pre-baked image — no drift, no manual steps',
      '10–15 min per layer on t3.small',
      '---',
      'CLOSE',
      'SSM as handoff — downstream never needs to change when I rebuild an image',
      'Same principle as not hardcoding container image tags — point at a reference, not a value',
    ],
    lps: ['Learn and Be Curious', 'Invent and Simplify', 'Dive Deep'],
  },
]
