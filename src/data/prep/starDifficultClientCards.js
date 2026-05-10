export const starDifficultClientCards = [
  {
    title: 'Frustrated Client — Access Restored Live',
    logo: '/images/companies/cititec-logo.jpg',
    question: 'Tell me about a challenging customer or stakeholder interaction.',
    anchors: [
      { tag: '[DATA]', text: 'Existing open ticket found mid-call — flagged it before she raised it' },
      { tag: '[DATA]', text: 'Access restored during the call — tone shifted before she brought up the secondary issue' },
      { tag: '[DATA]', text: 'Two follow-ups after the call: previous tech and senior — nobody had to chase me' },
      { tag: '[DATA]', text: 'Learned post-call she was a known difficult customer — validates instinct, not self-congratulation' },
      { tag: '[LP]',   text: 'Bias for Action — moved to the solution without waiting for context I couldn\'t get' },
      { tag: '[LP]',   text: 'Customer Obsession — de-escalated before fixing, spotted open ticket unprompted, set expectations before she asked' },
      { tag: '[LP]',   text: 'Ownership — followed up with both techs proactively, nothing dropped' },
      { tag: '[TONE]', text: 'Don\'t dwell on "difficult customer" framing — the point is not getting defensive, not throwing anyone under the bus' },
    ],
    rehearsal: `A frustrated client called in blaming a previous technician for breaking her login. I didn't have full context on what had been done, and I couldn't get hold of the previous tech quickly.

Before touching anything I let her say her piece. She was frustrated and needed to be heard first. I didn't have enough context to defend or explain what the previous tech had done, so I didn't try — I just acknowledged that her access was broken and that fixing it was my immediate priority. Rather than wait for clarity I didn't have, I made the call to move straight to the solution — reset her password through the M365 admin centre and got her back in during the call.

While she was talking I'd pulled up her account and noticed an existing open ticket for a separate audio issue. I flagged it — told her I could see it was already being worked on and that I'd make sure the right person followed up. She hadn't even raised it yet. Once she was back in and her tone shifted, she brought up the audio issue herself. I made a judgment call not to dig into it on the same call — I'd already set the expectation it was being handled, captured the details, and escalated directly to the senior tech responsible.

After the call I followed up with both the previous tech and the senior to make sure the team had full context — nobody had to chase me for it.

She regained access during the call, her secondary issue was handed off cleanly with a clear owner, and the team was across everything without me waiting to be asked.

I found out after the call that she was known as a difficult customer. That was actually reassuring — not because I needed the validation, but because it told me my instincts under pressure were sound. I'd handled it without knowing the context, and the thing that mattered wasn't the password reset — it was not getting defensive, not throwing anyone under the bus, and making sure she felt like someone was actually paying attention.`,
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
      'After call: followed up with both previous tech and senior — nobody had to chase me',
      '---',
      'RESULT',
      'Access restored during the call — tone shifted',
      'Secondary issue handed off cleanly with a clear owner',
      'Team across everything without waiting to be asked',
      '---',
      'CLOSE',
      'Found out after: known difficult customer',
      'Reassuring — instincts held under pressure without knowing the context',
      'The point wasn\'t the password reset — it was not getting defensive, not throwing anyone under the bus',
    ],
    lps: ['Bias for Action', 'Customer Obsession', 'Ownership'],
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
    rehearsal: `A woman came in late in the evening with a prescription for a painkiller I didn't recognise — brand or drug name. She mentioned she'd already been turned away by another pharmacy who said they didn't have it in stock.

We didn't have it either, but something was off — it wasn't just out of stock, it wasn't showing up in our system at all. I checked the AMH and a couple of other Australian references. Nothing. I could have stopped there and sent her away with the same answer she'd already gotten. But she was clearly in pain, and I knew that answer wasn't actually helpful.

I kept digging and worked out that this drug is prescribed in other countries but isn't available in Australia. I pieced together that the doctor — who I suspected was an overseas practitioner doing after-hours work — had prescribed something that simply can't be dispensed here.

At that point I made a conscious call. I'd seen how easy it is to palm a problem off the moment you have a halfway-decent reason to — and this was one of those moments. I knew that once I told her what was actually going on, she'd have more questions and it would take longer. But the alternative was sending her away, still unable to solve her problem. She wasn't just trying to fill a script — she was in pain, already turned away once, and running out of options. So I gave her the full picture.

I explained what had gone wrong, why she couldn't find it anywhere, and what she actually needed to do: go back to the after-hours service and explain the situation so they could prescribe something equivalent available here. In the meantime I gave her the strongest over-the-counter analgesics we had to take the edge off while she sorted it.

She left knowing exactly what had happened and exactly what to do next — not just that no one had what she needed. That's the difference between closing a transaction and actually solving someone's problem.

The easy answer was already available — the previous pharmacy gave it. I don't think it was good enough. She'd been in pain, turned away once, and was running out of options. The extra time was worth it — not just for her outcome, but because it was the right way to treat someone navigating a system that had already failed her once.`,
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
