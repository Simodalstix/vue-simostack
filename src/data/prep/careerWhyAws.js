export const careerWhyAwsCards = [
  {
    question: 'Why AWS? Why this role?',
    anchors: [
      { tag: '[ANCHOR]', text: 'Pharmacy was a ceiling — want to be the least capable person in the room' },
      { tag: '[LP]',     text: 'Learn and Be Curious' },
      { tag: '[TONE]',   text: 'Pause before this answer — don\'t race into it' },
      { tag: '[ANCHOR]', text: 'AWS is the mental model I reason from — it\'s where I actually learned computing' },
      { tag: '[LP]',     text: 'Invent and Simplify — automation expected, right env for IaC/DevOps' },
      { tag: '[ANCHOR]', text: 'The nature of this team — clearance, isolated regions, infra that underpins things that actually matter → this is the close, land it' },
      { tag: '[AVOID]',  text: '"AWS is the market leader" / "great career growth" / "industry recognised certifications"' },
    ],
    rehearsal: `Across everything I've worked on, the areas I've consistently gravitated back to are Linux and AWS — not because I had to, but because that's where I actually spend my time outside of work too.

The other thing that drew me in was the people. I came from pharmacy where I was often the most technically capable person around, and that's a ceiling. I don't want a ceiling. AWS is deliberately full of people who are smarter and more experienced than me, and that's the environment where I know I'll grow fastest.

And then the nature of this team specifically — the clearance requirement, the isolated regions, the fact that the infrastructure underpins things that actually matter at a government and critical industry level. That's not a footnote to me, that's the kind of work I want to be accountable for.`,
    cues: [
      'Linux + AWS — where I\'d spend time even without the career',
      '---',
      'Pharmacy → most capable in the room → ceiling',
      'Don\'t want a ceiling — AWS deliberately full of smarter people',
      '---',
      'AWS is the mental model I reason from — where I actually learned computing',
      'Automation expected, not optional — right env for IaC/DevOps',
      '---',
      '[ANCHOR] This team: clearance, isolated regions, infra that actually matters',
      'Land the close — don\'t rush',
    ],
    lps: ['Learn and Be Curious', 'Invent and Simplify'],
    toneWarning: 'Most candidates answer this generically. Specificity is the differentiator.',
  },
  {
    question: 'Why Systems Engineering specifically?',
    anchors: [
      { tag: '[ANCHOR]', text: 'Linux + AWS intersection — this role is literally that' },
      { tag: '[ANCHOR]', text: 'CLI, logs, root cause, then script it away for the next person' },
      { tag: '[ANCHOR]', text: 'Foundation I want to build on — know where I\'m heading' },
      { tag: '[TONE]',   text: 'Brief is fine here — don\'t over-explain' },
    ],
    rehearsal: `Linux and AWS is the intersection I've been building toward. This role is literally that — CLI, logs, root cause analysis, then automating it away so the next person doesn't have to do it manually. It's also the foundation I want to build on. I know where I'm heading and this is the right place to start.`,
    cues: [
      'Linux + AWS intersection — this role is literally that',
      'CLI, logs, root cause analysis, then automate it away',
      'Foundation I want to build on',
      'Know where I\'m heading — this is the right place to start',
    ],
    lps: ['Bias for Action', 'Think Big'],
    toneWarning: null,
  },
  {
    question: 'What experience do you have with cloud infrastructure?',
    anchors: [
      { tag: '[TONE]',   text: 'Own this confidently — don\'t apologise for self-directed work' },
      { tag: '[DATA]',   text: 'ECS Fargate, serverless pipeline, multi-account landing zone, pilot light DR across two regions' },
      { tag: '[ANCHOR]', text: 'IaC: CDK and Terraform' },
      { tag: '[ANCHOR]', text: 'Security: GuardDuty, WAF, KMS' },
      { tag: '[TONE]',   text: 'Close with direction, not gap' },
      { tag: '[AVOID]',  text: '"I\'m still learning" / over-qualifying' },
    ],
    rehearsal: `Most of my hands-on cloud experience has been through self-directed projects across a fairly wide range of AWS services and patterns. That includes container workloads on ECS Fargate, a serverless ingestion pipeline with Lambda and SQS, a multi-account landing zone with CDK, and a pilot light disaster recovery setup across Sydney and Singapore regions. I've used both CDK and Terraform for IaC, worked with observability tooling, and touched security services like GuardDuty, WAF, and KMS. Professionally I've been working in an MSP context — but the projects reflect where my focus has been and the direction I'm building toward.`,
    cues: [
      'Self-directed projects — own it, don\'t apologise',
      '---',
      '[DATA] ECS Fargate, serverless Lambda/SQS pipeline',
      '[DATA] Multi-account landing zone (CDK)',
      '[DATA] Pilot light DR — Sydney + Singapore',
      '---',
      '[ANCHOR] IaC: CDK and Terraform',
      '[ANCHOR] Security: GuardDuty, WAF, KMS',
      '---',
      'MSP professionally — projects show the direction',
    ],
    lps: ['Learn and Be Curious', 'Deliver Results'],
    toneWarning: null,
  },
  {
    question: 'What are you looking for in your next role?',
    anchors: [
      { tag: '[ANCHOR]', text: 'Depth — not supporting from outside but building, managing, troubleshooting properly' },
      { tag: '[LP]',     text: 'Learn and Be Curious — environment where learning is expected, work is complex' },
      { tag: '[ANCHOR]', text: 'Systems engineering at AWS is exactly that — say it directly, don\'t hedge' },
      { tag: '[AVOID]',  text: '"Growth opportunities" / "work-life balance" / anything that sounds like a job board answer' },
    ],
    rehearsal: `I'm looking for a role where I can work with cloud and infrastructure at a real depth — not just supporting it from the outside but building, managing, and troubleshooting it properly. I want to be in an environment where learning is expected and the work is genuinely complex. Systems engineering at AWS is exactly that kind of role for me.`,
    cues: [
      'Depth — building and troubleshooting, not supporting from outside',
      'Environment where learning is expected',
      '[ANCHOR] Systems engineering at AWS is exactly that — say it directly',
    ],
    lps: ['Learn and Be Curious', 'Ownership'],
    toneWarning: null,
  },
]
