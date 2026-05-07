export const careerNarrativeCards = [
  {
    question: 'Tell me about yourself.',
    anchors: [
      { tag: '[ANCHOR]', text: 'Pharmacy was a natural fit — science, health, helping people. Sets up the pivot as considered, not impulsive.' },
      { tag: '[ANCHOR]', text: 'Environment didn\'t reward curiosity — ceiling was obvious' },
      { tag: '[TONE]',   text: 'One sentence here, move on — don\'t linger' },
      { tag: '[LP]',     text: 'Learn and Be Curious — "I absorb things by building, not reading" — say this' },
      { tag: '[ANCHOR]', text: 'First role: healthtech startup — natural bridge using pharmacy knowledge. Shows intentional sequencing, not luck.' },
      { tag: '[ANCHOR]', text: 'MSP: breadth across varied clients, real production at pace' },
      { tag: '[ANCHOR]', text: 'Now looking for depth — Linux and AWS, systems engineering → land this clearly, it\'s the close' },
      { tag: '[AVOID]',  text: '"I\'ve always been passionate about technology"' },
    ],
    rehearsal: `Pharmacy was a natural choice — science, health, helping people. But the environment didn't reward curiosity and I started gravitating more toward the technology side of things.

When I made the decision to transition I went all in — self-directed study, hands-on labs, certifications as structured milestones. I find I absorb things properly by building and testing, not just reading.

I landed my first tech role at a healthcare start-up supporting pharmacy clients — a natural bridge. I've since moved into an MSP handling level one and two work across a range of client environments — remote support, endpoint troubleshooting, M365 administration, identity and access management.

What I'm looking for now is a role where I can go deeper into cloud and infrastructure. Systems engineering at AWS is exactly the direction I've been building toward.`,
    cues: [
      '[ANCHOR] Pharmacy: natural fit — science, health, helping people',
      'Environment didn\'t reward curiosity — ceiling was obvious',
      '---',
      'Went all in: self-directed study, labs, certs as milestones',
      '"I absorb things by building and testing, not just reading"',
      '---',
      '[ANCHOR] Healthtech startup — natural bridge, intentional sequencing',
      '[ANCHOR] MSP — breadth, varied clients, real production',
      '---',
      '[ANCHOR] Now: depth. Linux and AWS. Systems engineering at AWS → land this',
    ],
    lps: ['Learn and Be Curious', 'Deliver Results', 'Ownership'],
    toneWarning: null,
  },
  {
    question: 'What does your current role involve day to day?',
    anchors: [
      { tag: '[ANCHOR]', text: 'MSP, L1/L2, varied client environments' },
      { tag: '[ANCHOR]', text: 'Remote support, endpoint troubleshooting, M365 administration' },
      { tag: '[ANCHOR]', text: 'Identity and access management — AD, user lifecycle, access changes → gives you the Duo story if they probe' },
      { tag: '[TONE]',   text: 'Genuine — not complaining about the role' },
      { tag: '[AVOID]',  text: 'Anything that sounds like you\'re running away from it' },
    ],
    rehearsal: `I'm at an MSP handling level one and two work across a range of client environments. Day to day that's remote support, endpoint troubleshooting, M365 administration, and identity and access management — user lifecycle, AD, access changes. It's varied, which I've found valuable, but I'm ready to go deeper into infrastructure and cloud.`,
    cues: [
      '[ANCHOR] MSP, L1/L2, varied client environments',
      'Remote support, endpoint troubleshooting, M365 admin',
      '[ANCHOR] IAM — AD, user lifecycle, access changes',
      'Varied — genuinely valuable',
      'Ready to go deeper now',
    ],
    lps: ['Deliver Results', 'Ownership'],
    toneWarning: null,
  },
  {
    question: 'Why are you leaving your current role?',
    anchors: [
      { tag: '[TONE]',   text: 'Say "good team, real production experience" and mean it — don\'t skip it' },
      { tag: '[ANCHOR]', text: 'It\'s not Linux and it\'s not AWS — simple and honest' },
      { tag: '[ANCHOR]', text: 'Next logical step, not an escape' },
      { tag: '[AVOID]',  text: '"I want more opportunities" / "I need a bigger challenge" / anything vague' },
      { tag: '[TONE]',   text: 'Confident, not apologetic — this is a clear direction' },
    ],
    rehearsal: `It's a good team and I'm getting real production experience — but the work isn't Linux and it isn't AWS. This is the next logical step in the direction I've been building toward, not an exit.`,
    cues: [
      'Good team, real production experience — genuine',
      '[ANCHOR] But: not Linux, not AWS — simple and honest',
      '[ANCHOR] Next logical step in the direction I\'ve been building toward',
      'Not an exit',
    ],
    lps: ['Ownership', 'Bias for Action'],
    toneWarning: 'Confident, not apologetic.',
  },
]
