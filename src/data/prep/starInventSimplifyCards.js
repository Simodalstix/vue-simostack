export const starInventSimplifyCards = [
  {
    title: 'AWS Deploy — Zero Manual Steps',
    logo: '/images/project-icons/vue-icon.svg',
    question: 'Tell me about a time you made something more efficient.',
    anchors: [
      { tag: '[DATA]', text: 'Manual process: build, upload dist, invalidate cache — 10–15 min per push' },
      { tag: '[DATA]', text: 'Multiple pushes per day — friction compounding, becoming genuinely disruptive' },
      { tag: '[DATA]', text: 'IAM user scoped to minimum required, credentials stored as GitHub secrets' },
      { tag: '[DATA]', text: 'CloudFront must return index.html on unmatched paths — otherwise client-side routing breaks at CDN level' },
      { tag: '[DATA]', text: 'Visitor counter: Lambda + API Gateway + DynamoDB — on-demand, essentially free at personal site traffic levels' },
      { tag: '[DATA]', text: 'Full stack costs pennies per month — static hosting over compute, serverless over persistent services' },
      { tag: '[LP]',   text: 'Invent and Simplify — eliminated an entire category of manual work, not just sped it up' },
      { tag: '[LP]',   text: 'Bias for Action — identified the problem was mine to fix, didn\'t wait for someone to assign it' },
      { tag: '[LP]',   text: 'Frugality — right-sized every layer: no tooling beyond what already existed, no idle compute, scales if needed' },
    ],
    rehearsal: `I run my own site on AWS — S3, CloudFront, Route 53. Every change meant manually building the Vue app, uploading the dist folder through the console, then triggering a CloudFront cache invalidation by hand. I was pushing changes multiple times a day — it was becoming genuinely disruptive.

I set up a GitHub Actions pipeline to own the whole process. Scoped an IAM user to just what the workflow needed, stored the credentials as GitHub secrets, and wrote a workflow that builds and syncs to S3 on every push to main, then automatically invalidates the cache. I also had to configure CloudFront to return index.html on unmatched paths — otherwise client-side routing breaks at the CDN level.

For the visitor counter I went serverless — Lambda behind API Gateway, DynamoDB for state. On-demand execution, essentially free at personal site traffic levels. No idle compute, no server to manage.

The whole stack costs pennies a month. S3 and CloudFront for static assets, serverless for the dynamic parts. If the traffic justified it, the architecture scales — but right-sizing it to what I actually needed was the deliberate call.

What used to be 10–15 minutes of manual steps with room for error on each one just runs in the background. Removed an entire category of friction from my workflow.`,
    cues: [
      'SITUATION',
      'Personal site on S3 + CloudFront + Route 53',
      'Every push: manual build → upload dist → invalidate cache → 10–15 min',
      'Multiple pushes a day — friction compounding, becoming genuinely disruptive',
      '---',
      'ACTION',
      'GitHub Actions pipeline: build + S3 sync + cache invalidation on push to main',
      'IAM user scoped to minimum required — credentials as GitHub secrets',
      'CloudFront: configured to return index.html on unmatched paths',
      '(without this: client-side routing breaks at the CDN level)',
      'Visitor counter: Lambda + API Gateway + DynamoDB — serverless, on-demand',
      'No idle compute, no server to manage — essentially free at this scale',
      '---',
      'RESULT',
      'Manual steps eliminated — runs in background on every push',
      'Whole stack costs pennies a month — right-sized to what was actually needed',
      'Architecture scales if traffic justifies it — deliberate call not to over-provision',
      '---',
      'CLOSE',
      'Removed an entire category of friction from the workflow',
      'Right-sizing every layer was as important as automating it',
    ],
    lps: ['Invent and Simplify', 'Bias for Action', 'Frugality'],
  },
]
