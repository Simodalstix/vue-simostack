export const starLearnCuriousCards = [
  {
    title: 'Strongroom — 4 Days Onboarding, Solo from Week One',
    logo: '/images/companies/strongroom-logo.jpg',
    question: 'Tell me about a time you had to get up to speed quickly with no formal training.',
    anchors: [
      { tag: '[DATA]', text: '4 days onboarding — 1 day setup, 3 days of limited shadowing and reading. Live calls from week one' },
      { tag: '[DATA]', text: '~30% fewer escalations in first month — each category mastered was roughly 5% of call volume' },
      { tag: '[DATA]', text: 'Local SQL Express + app installed — reproduced real workflows (Methadone setups, billing, reports) to build muscle memory before doing it live' },
      { tag: '[DATA]', text: 'SQL fix — told to wait for manager via TeamViewer. Assessed the risk (single field, single column), validated with AI, executed independently' },
      { tag: '[DATA]', text: 'Free SQL course + AI conversations on SSMS and SQL Server Configuration Manager — done outside work hours' },
      { tag: '[LP]',   text: 'Learn and Be Curious — nobody told me to set up the lab, take the SQL course, or map the connection layer. I did it because I needed to understand it properly' },
      { tag: '[LP]',   text: 'Bias for Action — manager said wait. I assessed the risk, confirmed it was safe, and made the call' },
      { tag: '[LP]',   text: 'Deliver Results — measurable reduction in escalations, cannabis queries made me the go-to on a high-frequency issue type' },
    ],
    rehearsal: `It was my first tech role. Onboarding was four days — one day of setup, three days of limited shadowing and reading. Remote work made proper shadowing impractical, and from week one I was on live calls independently on a complex, regulated SaaS used by pharmacy clients nationally.

I didn't wait for more training. I set up SQL Express locally, installed the app, and reproduced real workflows — Methadone setups, billing, dispensing — to build muscle memory before doing them live. I mapped the high-frequency issue categories and learned them specifically: cannabis entries, connection errors, RAM issues. Each one was roughly 5% of call volume. I did a free SQL course in my own time and used AI to properly understand the connection layer, not just follow a script.

The moment that best illustrates it: there was a role glitch affecting an intern-pharmacist that needed a single-field SQL update. The default was for the manager to join via TeamViewer and run it himself. By that point I'd learned enough SQL to understand exactly what the command was doing — I validated it with AI, confirmed it was a single field on a single column, and ran it myself. I assessed the risk and acted rather than waiting.

By the end of the first month I'd reduced escalations by roughly 30%. The SQL fix closed a category that previously needed manager intervention. Cannabis troubleshooting made me the go-to on one of the highest-frequency issue types on the team.`,
    cues: [
      'SITUATION',
      'First tech role — four days onboarding: day one setup, three days of limited shadowing and reading',
      'Remote work made proper shadowing impractical',
      'From week one: live calls independently on a complex, regulated SaaS — pharmacy clients nationally',
      '---',
      'ACTION',
      'Didn\'t wait for more training — set up SQL Express locally, installed the app',
      'Reproduced real workflows to build muscle memory: Methadone setups, billing, dispensing',
      'Mapped high-frequency categories — cannabis, connection errors, RAM — each ~5% of call volume',
      'Free SQL course in own time + AI to understand the connection layer properly, not just follow a script',
      '---',
      'ACTION (SQL moment)',
      'Intern-pharmacist role glitch — single-field SQL update needed',
      'Manager\'s default: join via TeamViewer and run it himself',
      'Understood what the command did, validated it with AI, confirmed single field on single column',
      'Assessed the risk and ran it myself — didn\'t wait',
      '---',
      'RESULT',
      'Each category mastered was ~5% of call volume — ~30% fewer escalations in the first month',
      'Cannabis troubleshooting: became the go-to on a high-frequency issue type',
      'SQL fix: category that needed manager intervention now closed on the call',
      '---',
      'CLOSE',
      'First tech role — no roadmap, no one told me to build the lab or take the course',
      'The SQL moment was the proof point: I could assess risk independently and act',
    ],
    lps: ['Learn and Be Curious', 'Bias for Action', 'Deliver Results'],
  },
]
