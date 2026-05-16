export const starDifficultClientCards = [
  {
    title: 'Frustrated Client — Access Restored Live',
    logo: '/images/companies/cititec-logo.jpg',
    question: 'Tell me about a challenging customer or stakeholder interaction.',
    anchors: [
      { tag: '[DATA]', text: 'Existing open ticket found mid-call — flagged it before she raised it' },
      { tag: '[DATA]', text: 'Access restored during the call — tone shifted before she brought up the secondary issue' },
      { tag: '[DATA]', text: 'Diagnosed the real frustration: the audio ticket sitting unresolved, not the password. Login was the trigger.' },
      { tag: '[DATA]', text: 'Applied urgency to the colleague — not a passive flag, communicated she was unhappy with progress. She got a callback within 30 minutes.' },
      { tag: '[DATA]', text: 'Learned post-call she was a known difficult customer — validates instinct, not self-congratulation' },
      { tag: '[LP]',   text: 'Bias for Action — moved to the solution without waiting for context I couldn\'t get' },
      { tag: '[LP]',   text: 'Customer Obsession — de-escalated before fixing, spotted open ticket unprompted, set expectations before she asked' },
      { tag: '[LP]',   text: 'Ownership — didn\'t just hand off the audio ticket, applied urgency. Followed up with both techs after. Nothing dropped.' },
      { tag: '[TONE]', text: 'Don\'t dwell on "difficult customer" framing — the point is not getting defensive, not throwing anyone under the bus' },
    ],
    rehearsal: `Frustrated client called in blaming a previous tech for breaking her login. I had no context on what had been done and couldn't reach him quickly.

Before touching anything I let her say her piece. She mentioned her computer had never been properly fixed — that told me the login issue was the trigger, not the real frustration. I searched her account mid-call and found an existing open ticket for an audio issue. I flagged it before she had a chance to raise it — told her I could see it was being worked on and I'd make sure it got followed up properly.

Then I focused on what I could actually solve: reset her password through the M365 admin centre and got her back in during the call. Once she was back in, she brought up the audio issue herself. I made a deliberate call not to dig into it — it was already assigned to a senior tech, and clicking around pretending to help would've just extended her frustration without resolving anything. I captured the details and escalated directly to the right person.

I flagged to both the engineer and my manager that she wasn't happy with the progress — that communication resulted in her getting a callback within 30 minutes to troubleshoot the audio issue directly. After the call I followed up with both techs — nobody had to chase me.

Access restored during the call, tone shifted. Secondary issue handed off with a clear owner and she knew it. Team had full context without waiting to be asked.

Found out after that she was a known difficult customer. Reassuring — not for the validation, but because it confirmed the instincts held without knowing that. The password reset was the easy part. What actually mattered was not getting defensive, not pretending to fix things outside my scope, and making sure she felt like someone was paying attention.`,
    cues: [
      'SITUATION',
      'Frustrated client — blaming previous tech for breaking her login',
      'No context on what had been done, couldn\'t reach the previous tech',
      '---',
      'ACTION',
      'Let her say her piece first — she needed to be heard before touching anything',
      'Didn\'t defend or explain the previous tech — acknowledged access was broken, made it the priority',
      'Moved straight to solution — reset password via M365 admin centre, restored access during the call',
      'Mid-call: noticed existing open ticket for audio issue — flagged it before she raised it',
      'Set the expectation it was being handled — pre-empted her second concern',
      'Judgment call: don\'t dig into audio on same call — captured details, escalated to senior tech responsible',
      'Applied urgency to colleague — not just a handoff note. She\'s not happy with progress, she needs a callback.',
      'Result: she got a callback within 30 minutes to troubleshoot the audio issue directly',
      'After call: followed up with both previous tech and senior — nobody had to chase me',
      '---',
      'RESULT',
      'Access restored during the call — tone shifted',
      'Recognised real frustration was the unresolved audio ticket, not the password — that awareness drove the urgency',
      'Secondary issue handed off with a clear owner and direct pressure to act on it',
      'Team across everything without waiting to be asked',
      '---',
      'CLOSE',
      'Found out after: known difficult customer',
      'Reassuring — instincts held under pressure without knowing the context',
      'The point wasn\'t the password reset — it was not getting defensive, not throwing anyone under the bus',
    ],
    lps: ['Bias for Action', 'Customer Obsession', 'Ownership'],
    toneWarning: 'Don\'t frame this as handling a difficult person. It\'s a composure and ownership story.',
  },
  {
    title: 'Overseas Script — Real Answer, Not a Dead End',
    logo: '/images/companies/chemist-warehouse-logo.png',
    question: 'Tell me about a time you exceeded what was expected of you.',
    anchors: [
      { tag: '[DATA]', text: 'Late evening — patient already frustrated, in pain' },
      { tag: '[DATA]', text: 'Already turned away once — the easy answer had already been given by another pharmacy' },
      { tag: '[DATA]', text: 'Two references checked (AMH + additional) before identifying root cause' },
      { tag: '[DATA]', text: 'Drug not available in Australia — overseas practitioner prescribed it' },
      { tag: '[DATA]', text: 'OTC interim relief provided while she pursued the fix' },
      { tag: '[LP]',   text: 'Customer Obsession — made a conscious choice to take on more work because it was what she actually needed' },
      { tag: '[LP]',   text: 'Dive Deep — didn\'t accept "not in stock", kept investigating until she had a real explanation' },
      { tag: '[TONE]', text: 'Don\'t frame as "I was better than the other pharmacy" — frame as a personal choice to keep going' },
    ],
    rehearsal: `Late evening — woman came in with a prescription for a painkiller I didn't recognise, brand or drug name. She'd already been turned away by another pharmacy who told her they didn't have it in stock. She was clearly in pain.

We didn't have it either, but something was off — it wasn't just out of stock, it wasn't appearing in our system at all. I checked the AMH and another Australian reference. Nothing. That told me this wasn't a stock issue.

I kept digging and worked out the drug isn't available in Australia — it's prescribed in other countries but simply can't be dispensed here. When I explained that to her, she said she thought the doctor had recently moved from overseas — which confirmed it. The prescription had come from someone who'd prescribed something that doesn't exist in this market. She could have gone to every pharmacy in the city and gotten the same answer.

I gave her the full picture — what had gone wrong, why she couldn't find it anywhere, and what she actually needed to do: go back to the after-hours service and get something equivalent that's actually available here. In the meantime I gave her the strongest OTC analgesics we had to take the edge off while she sorted it.

She left knowing exactly what had happened and exactly what to do next — not just that no one had what she needed.

The easy answer was already available — the other pharmacy gave it. She'd already been failed once. The difference between 'we don't have it' and 'here's why and here's what you do next' was maybe fifteen minutes of my time. That felt like a straightforward call.`,
    cues: [
      'SITUATION',
      'Late evening — patient in pain, already turned away once by another pharmacy',
      'Prescription for a drug I didn\'t recognise — not showing up in system at all',
      '---',
      'ACTION',
      'Checked AMH + other Australian references — nothing',
      'Could have stopped there — chose not to',
      'Kept digging — drug available overseas but not in Australia',
      'Suspected overseas after-hours practitioner had prescribed it',
      'Made a conscious call: give her the full picture, not just "we don\'t have it"',
      'Explained the root cause, what she needed to do (go back to after-hours service)',
      'Gave her strongest OTC analgesics as interim relief while she sorted it',
      '---',
      'RESULT',
      'She left knowing exactly what happened and exactly what to do next',
      '---',
      'CLOSE',
      'Easy answer was already available — the other pharmacy gave it',
      'I don\'t think it was good enough',
      'Extra time was worth it — she\'d already been failed once by the system',
    ],
    lps: ['Customer Obsession', 'Dive Deep', 'Deliver Results'],
    toneWarning: 'don\'t compare to other pharmacy',
  },
]
