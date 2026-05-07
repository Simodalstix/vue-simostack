export const starInventSimplifyCards = [
  {
    question: 'Tell me about a time you simplified a process that was creating friction.',
    anchors: [
      { tag: '[DATA]', text: 'Manual process: build, upload dist, invalidate cache — 10–15 min per push' },
      { tag: '[DATA]', text: 'Multiple pushes per day — friction compounding, becoming disruptive' },
      { tag: '[DATA]', text: 'IAM user scoped to minimum required, credentials stored as GitHub secrets' },
      { tag: '[DATA]', text: 'CloudFront must return index.html on unmatched paths — otherwise client-side routing breaks at CDN level' },
      { tag: '[LP]',   text: 'Invent and Simplify — eliminated an entire category of manual work, not just sped it up' },
      { tag: '[LP]',   text: 'Bias for Action — identified the problem was mine to fix, didn\'t wait for someone to assign it' },
    ],
    rehearsal: `I run my own site on AWS — S3, CloudFront, Route 53. Every change meant manually building the Vue app, uploading the dist folder through the console, then triggering a CloudFront cache invalidation by hand. I was pushing changes multiple times a day — it was becoming genuinely disruptive.

I set up a GitHub Actions pipeline to own the whole process. Scoped an IAM user to just what the workflow needed, stored the credentials as GitHub secrets, and wrote a workflow that builds and syncs to S3 on every push to main, then automatically invalidates the cache. I also had to configure CloudFront to return index.html on unmatched paths — otherwise client-side routing breaks at the CDN level.

What used to be 10–15 minutes of manual steps with room for error on each one just runs in the background. Removed an entire category of friction from my workflow.

It's a simple example, but it taught me how much time compounds when you're repeating manual steps. Automating it was obvious once I actually mapped out what I was doing each time.`,
    cues: [
      'SITUATION',
      'Personal site on S3 + CloudFront + Route 53',
      'Every push: manual build → upload dist → invalidate cache → 10–15 min',
      'Multiple pushes a day — friction compounding, becoming disruptive',
      '---',
      'ACTION',
      'GitHub Actions pipeline: build + S3 sync + cache invalidation on push to main',
      'IAM user scoped to minimum required — credentials as GitHub secrets',
      'CloudFront: configured to return index.html on unmatched paths',
      '(without this: client-side routing breaks at the CDN level)',
      '---',
      'RESULT',
      'Manual steps eliminated — runs in background on every push',
      'Removed an entire category of friction from the workflow',
      '---',
      'CLOSE',
      'Simple example — but time compounds when you repeat manual steps',
      'Automating it was obvious once I mapped out what I was doing each time',
    ],
    lps: ['Invent and Simplify', 'Bias for Action'],
  },
]
