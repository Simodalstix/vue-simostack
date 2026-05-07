export const starDisagreeCommitCards = [
  {
    question: 'Tell me about a time you disagreed with a decision. How did you handle it?',
    anchors: [
      { tag: '[DATA]', text: 'Traced issue to Intune policy, not a local setting — escalated to right people first' },
      { tag: '[DATA]', text: 'Escalated to Intune engineer → senior security engineer' },
      { tag: '[DATA]', text: 'Proposed a concrete solution: change management, heads-up email, one week\'s notice' },
      { tag: '[DATA]', text: 'Documented outcome clearly — technically feasible, requires planning — client got a real answer' },
      { tag: '[LP]',   text: 'Have Backbone; Disagree and Commit — pushed back with a solution, accepted the decision, executed professionally' },
      { tag: '[LP]',   text: 'Customer Obsession — closed the loop with the client, gave them a real answer not just a dead end' },
      { tag: '[TONE]', text: 'Don\'t sound bitter about the outcome. The acceptance and execution are the point.' },
    ],
    rehearsal: `A client requested we set up Windows Hello for Business on his device. When I remoted in, the fingerprint scanner was greyed out — I recognised it was likely controlled by an Intune policy rather than a local setting, so I told him I'd investigate and get back to him.

I escalated internally — first to the Intune engineer, then to the senior security engineer. I raised that Windows Hello is a recommended authentication method and that it made sense to enable it. The senior flagged that enabling it would trigger all users in the tenant to enrol authentication methods, which could cause confusion. I pushed back — I suggested it could be handled with some change management, a heads-up email to staff and a week's notice to prepare them. Ultimately they decided it wasn't a priority given the current workload. I accepted that, and closed the ticket with a note documenting that while it was technically feasible, it would require further planning and change management to implement properly — so the client had a clear answer and the ticket was closed from our end.

The client had a full explanation rather than just a dead end. The decision was documented, and the door was left open for it to be revisited properly rather than just dropped.

I didn't agree with the call, but I understood it. Once the decision was made I didn't keep pushing — I made sure it was documented properly and moved on. That's the part I think matters: you say your piece, you propose a solution, and if they go another way you execute cleanly.`,
    cues: [
      'SITUATION',
      'Client requested Windows Hello for Business — fingerprint scanner greyed out',
      'Recognised it as an Intune policy, not a local setting',
      '---',
      'ACTION',
      'Escalated: Intune engineer → senior security engineer',
      'Raised Windows Hello as a recommended auth method, worth enabling',
      'Senior flagged: enabling it would trigger tenant-wide enrolment — confusion risk',
      'Pushed back: proposed change management, heads-up email, one week\'s notice',
      'Decision: not a priority given current workload',
      'Accepted — didn\'t keep pushing',
      'Documented outcome clearly: feasible, requires planning, door left open',
      'Client given a real answer, ticket closed cleanly',
      '---',
      'RESULT',
      'Client had a full explanation, not just a dead end',
      'Decision documented — revisitable later, not just dropped',
      '---',
      'CLOSE',
      'I didn\'t agree with the call, but I understood it',
      'You say your piece, propose a solution, and if they go another way you execute cleanly',
    ],
    lps: ['Have Backbone; Disagree and Commit', 'Customer Obsession', 'Dive Deep'],
  },
]
