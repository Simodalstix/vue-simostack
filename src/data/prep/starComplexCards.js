export const starComplexCards = [
  {
    title: 'Ghost MFA Policy — Login Blocked',
    logo: '/images/companies/cititec-logo.jpg',
    question: 'Tell me about a technically complex problem you\'ve had to work through.',
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
    title: 'Packer AMI Pipeline — Built from Scratch',
    logo: '/images/project-icons/Packer.svg',
    question: 'Tell me about something technical you built that you\'re proud of.',
    anchors: [
      { tag: '[DATA]', text: 'Image management kept coming up as a core pattern in serious systems work — recognised a genuine gap' },
      { tag: '[DATA]', text: 'Chose Packer deliberately — cloud-agnostic, industry standard, not AWS-specific' },
      { tag: '[DATA]', text: 'Two-layer pipeline: base → app. Each build ~10–15 min on a t3.small' },
      { tag: '[DATA]', text: 'SSM Parameter Store as config bus — zero hardcoded AMI IDs anywhere' },
      { tag: '[DATA]', text: 'verify_build.sh — explicit PASS/FAIL smoke tests before AMI is created' },
      { tag: '[LP]',   text: 'Learn and Be Curious — practical signal (hackathon) → went and learned it holistically, not just enough for the task' },
      { tag: '[LP]',   text: 'Invent and Simplify — SSM as handoff; downstream never touches a hardcoded ID' },
      { tag: '[TONE]', text: 'Enthusiasm is genuine — don\'t over-explain the architecture, let the SSM insight land naturally' },
    ],
    rehearsal: `Image management kept coming up as a pattern in serious systems work — golden AMIs, consistent instance state, reproducible builds. I had a genuine gap there and decided to fill it properly rather than just read about it.

I picked Packer deliberately — it's cloud-agnostic and the industry standard for image building. I wanted something transferable, not just an AWS-specific tool.

I designed a two-layer pipeline. The base layer handles everything that belongs on every instance — OS hardening, CloudWatch agent, SSH config, kernel parameters. The app layer inherits from base and adds the Python runtime, FastAPI, and the systemd service unit. The thing I'm most proud of is how I wired the two layers together — SSM Parameter Store as the handoff. The base build writes its AMI ID to Parameter Store. The app template reads it at build time. The ASG reads the app AMI ID from Parameter Store on every deploy. Nothing downstream ever touches a hardcoded ID — you rebuild an image and the whole stack picks it up.

I also added a verify_build.sh that runs inside the builder instance before the AMI is sealed — explicit PASS/FAIL checks for every service and dependency, so a broken build fails immediately rather than producing a bad image silently.

What I like about the project is how it connects things I care about. It's OS management and hardening, application packaging, and DR readiness — the same AMIs are what ASGs in a recovery region would launch from. It's not just automation, it's a pattern that makes the whole infrastructure more predictable and consistent. Build time is 10–15 minutes per layer on a t3.small.

The SSM pattern was the real insight — once you wire infrastructure to reference a parameter rather than a hardcoded value, you start seeing where else that applies. It's the same principle as not hardcoding container image tags.`,
    cues: [
      'SITUATION',
      'Image management kept coming up as a core pattern in serious systems work',
      'Had a genuine gap — decided to learn it properly, not just read about it',
      '---',
      'ACTION',
      'Chose Packer deliberately — cloud-agnostic, industry standard, transferable',
      'Two layers: base (OS hardening, CW agent, SSH config) → app (Python, FastAPI, systemd)',
      'SSM Parameter Store as config bus — base writes AMI ID, app reads it, ASG reads app AMI ID',
      'Zero hardcoded IDs anywhere — rebuild and the whole stack picks it up',
      'verify_build.sh — PASS/FAIL smoke tests before AMI is sealed',
      '---',
      'RESULT',
      'Reproducible, versioned pipeline — every build produces a known-good image',
      'Connects OS management, app packaging, and DR readiness in one pattern',
      'ASG always launches from pre-baked image — no drift, no manual steps',
      '10–15 min per layer on t3.small',
      '---',
      'CLOSE',
      'SSM pattern was the real insight — reference, not hardcoded value — applies everywhere',
      'Same principle as not hardcoding container image tags',
    ],
    lps: ['Learn and Be Curious', 'Invent and Simplify', 'Dive Deep'],
  },
]
