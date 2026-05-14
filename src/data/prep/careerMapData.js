export const careerBlocks = [
  { id: 0, short: 'TRANSITION', label: 'The Transition', color: '#818cf8' },
  { id: 1, short: 'BUILDER',    label: 'The Builder',    color: '#fb923c' },
  { id: 2, short: 'CEILING',    label: 'The Ceiling',    color: '#34d399' },
  { id: 4, short: 'CURIOUS',    label: 'The Curious',    color: '#a78bfa' },
  { id: 5, short: 'TEAMMATE',   label: 'The Teammate',   color: '#38bdf8' },
]

export const careerQuestions = [
  {
    label: 'About yourself', full: 'Tell me about yourself.',
    blockAnchors: {
      0: ['Pharmacy: natural fit — science, health, helping people', "Environment didn't reward curiosity — ceiling became obvious"],
      1: ['Went all in: study, labs, certs as structured milestones', '"I absorb things by building and breaking, not just reading"', 'Healthtech startup — natural bridge. Intentional sequencing.', 'MSP: breadth, varied clients, real production at pace'],
      2: ['Pharmacy eventually made me one of the most capable people in the room — visible ceiling', 'Outgrew it. Want to be surrounded by people stronger than me and keep growing'],
    },
  },
  {
    label: 'Most proud of', full: 'What are you most proud of professionally?',
    blockAnchors: {
      0: ['The career transition — not a project, not a cert', 'Left pharmacy with no tech track record', 'Real doubt — people close to me pushing back', 'Pushed through, landed a role in a tough market. Let it land.'],
    },
  },
  {
    label: 'Why AWS', full: 'Why AWS? Why this role?',
    blockAnchors: {
      2: ['Pharmacy eventually made me one of the most capable people in the room — visible ceiling', 'AWS is the opposite — constant depth, stronger people everywhere, endless room to grow'],
      1: ['Linux + AWS is where I naturally spend time — labs, debugging, building, breaking things', 'Automation is expected here, not optional — scripting and tooling are part of the work', 'Want to become extremely strong: Python, Bash, Linux tooling, operational workflows'],
      4: ['Clearance, isolated regions, infra that actually matters — intellectually that pulls hard'],
      5: ['Want to work alongside highly motivated, growth-oriented engineers — environment shapes your standards', 'Being around strong technical people raises your own level fast'],
    },
  },
  {
    label: 'Why Systems Eng.', full: 'Why Systems Engineering specifically?',
    blockAnchors: {
      1: ['CLI → logs → root cause → automate the problem away', 'Turning repeated operational pain into tooling genuinely appeals to me'],
      2: ['Strong systems engineers understand Linux, networking, debugging and automation deeply', 'That foundation compounds into everything else I want to become technically'],
      5: ["The people strongest at systems engineering tend to think clearly under pressure — that's the environment I want", 'I learn fastest around people operating at a high technical level'],
    },
  },
  {
    label: 'Next role', full: 'What are you looking for in your next role?',
    blockAnchors: {
      2: ['Environment where learning is expected and the work is genuinely complex', 'Systems engineering at AWS — say it directly'],
      1: ['Depth — building and troubleshooting real systems, not supporting from outside'],
      4: ['Genuinely want complex, intellectually demanding work — not just a step up'],
    },
  },
  {
    label: 'Success', full: 'What does success look like to you?',
    blockAnchors: {
      4: ['Genuine fluency — sit in complex situations and feel like I belong', 'Real depth. Not cert-shaped depth — actually knowing why things behave the way they do'],
      1: ['Build deep troubleshooting ability across Linux, networking and core AWS services', 'Eventually validate that depth with a professional-level cert — likely DevOps Professional'],
      5: ['Become the person people reach for when something is broken or unclear', 'Success is being genuinely trusted in high-pressure situations — not just technically capable'],
    },
  },
]

export const standaloneItems = [
  {
    label: "Biggest weakness",
    full: "What's your biggest weakness?",
    anchors: ['Brain reaches for complex before ruling out simple', "Real cause often something simpler I haven't seen hands-on", 'Fix: pause, clarifying questions, check obvious layer first', 'Usually leads to faster resolutions anyway'],
  },
  {
    label: 'Handle mistakes',
    full: 'How do you handle making a mistake?',
    anchors: ["Mistakes stick in a way reading doesn't — set the frame", 'Offboarding error — deactivated user a week early', 'Owned immediately, fixed fast, transparent with manager + requestor', 'Changed permanently — effective date is the first thing checked now'],
  },
]
