export const starLearnCuriousCards = [
  {
    title: 'Strongroom — Solo from Day One',
    logo: '/images/companies/strongroom-logo.jpg',
    question: 'Tell me about a time you had to get up to speed quickly with no formal training.',
    anchors: [
      { tag: '[DATA]', text: '4 days onboarding — 1 day setup, 3 days of limited shadowing and reading. Live calls from week one' },
      { tag: '[DATA]', text: 'End of months 1–2: escalating ~10–20% of calls, down from most in week one. Remaining: invoice integration and rarer vendor setups' },
      { tag: '[DATA]', text: 'Local SQL Express + app installed — reproduced real workflows (Methadone setups, billing, reports) to build muscle memory before doing it live' },
      { tag: '[DATA]', text: 'SQL fix — told to wait for manager via TeamViewer. Assessed the risk (single field, single column), validated with AI, executed independently' },
      { tag: '[DATA]', text: 'Free SQL course + AI conversations on SSMS and SQL Server Configuration Manager — done outside work hours' },
      { tag: '[LP]',   text: 'Bias for Action — manager said wait. I assessed the risk, confirmed it was safe, and made the call' },
      { tag: '[LP]',   text: 'Learn and Be Curious — nobody told me to set up the lab, take the SQL course, or map the connection layer. I did it because I needed to understand it properly' },
      { tag: '[LP]',   text: 'Deliver Results — measurable reduction in escalations, cannabis queries made me the go-to on a high-frequency issue type' },
      { tag: '[TONE]', text: 'Confident about the pace, not boastful. Don\'t apologise for the four months — own it.' },
    ],
    rehearsal: `First tech role. Four days onboarding — one day setup, three days of limited shadowing and reading. Remote work made proper shadowing impractical, and from week one I was on live calls independently on a complex, regulated SaaS used by pharmacy clients nationally.

I didn't wait for more training. I set up SQL Express locally, installed the app, and reproduced real workflows — Methadone setups, billing, dispensing — to build muscle memory before doing them live. I mapped the high-frequency issue categories and learned them specifically.

Cannabis queries alone were probably 20-25% of call volume across three distinct problem types: data entry errors — products like pastilles and gummies need to be entered per unit, not per pack, so a pack of 30 gets entered as 30 in the drug register, which isn't intuitive; invoicing — if it wasn't entered correctly in the dispensing software, Fred or others, it wouldn't show up in StrongER at all; and manual product entry had a steep learning curve to get right consistently. Understanding all three meant I could resolve most of those calls without escalating. Login issues, database connection errors, and user education were probably another 15-20% — high frequency but faster to resolve once you knew the pattern.

I also did a free SQL course in my own time and used AI to properly understand the connection layer. The moment that illustrates it best — there was a role glitch affecting an intern-pharmacist that needed a single-field SQL update. Default was to wait for the manager on TeamViewer. I understood exactly what the command was doing, validated it, confirmed it was a single field on a single column, and ran it myself.

By the end of months one and two I was escalating maybe 10-20% of calls — down from escalating most of them in week one. The remaining escalations were invoice integration issues and rarer vendor setups I hadn't encountered enough to handle confidently yet. I knew I didn't need to master everything immediately — I focused on the highest-frequency categories first and worked outward. I was made redundant at four months, but by twelve I'd have been very capable across the full platform.

Nobody told me to set up the local environment, take the SQL course, or map the call categories. I did it because I could see what the job actually required and I wasn't going to get there by waiting.`,
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
      '[DATA] SELECT * FROM user_roles WHERE user_id = ?    -- validate before touching',
      '[DATA] UPDATE user_roles SET role = ? WHERE user_id = ?    -- single field, single row',
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
    lps: ['Bias for Action', 'Learn and Be Curious', 'Deliver Results'],
    toneWarning: 'Confident about the pace, not boastful. Don\'t apologise for the four months — own it.',
  },
]
