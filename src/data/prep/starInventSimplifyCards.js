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
      { tag: '[TONE]', text: 'Practical and direct. Don\'t turn it into an AWS tour — the story is removing friction, not the architecture.' },
    ],
    rehearsal: `I run my own site on AWS — S3, CloudFront, Route 53. Every change meant manually building the Vue app, uploading the dist folder through the console, then triggering a CloudFront cache invalidation by hand. I was pushing changes multiple times a day — it was becoming genuinely disruptive.

I set up a GitHub Actions pipeline to own the whole process. Scoped an IAM user to just what the workflow needed, stored the credentials as GitHub secrets, and wrote a workflow that builds and syncs to S3 on every push to main, then automatically invalidates the cache. I also had to configure CloudFront to return index.html on unmatched paths — otherwise client-side routing breaks at the CDN level. CloudFront was returning a 403 on direct navigation because the path doesn't exist as an S3 object — the fix is a custom error response that serves index.html and lets the client-side router take over.

Same principle on the dynamic parts — visitor counter runs on Lambda behind API Gateway with DynamoDB for state. No idle compute, no server to manage, essentially free at personal site traffic levels.

The whole stack costs pennies a month. S3 and CloudFront for static assets, serverless for the dynamic parts. Right-sized to what I actually needed — but the architecture scales if traffic justifies it.

What used to be 10-15 minutes of manual steps with room for error on each one just runs in the background. Removed an entire category of friction from the workflow. Right-sizing every layer was as important as automating it.`,
    cues: [
      'SITUATION',
      'Running my own site on AWS — S3, CloudFront, Route 53',
      'Every push meant manually building the Vue app, uploading the dist folder, then triggering a CloudFront cache invalidation by hand — 10 to 15 minutes each time',
      'I was pushing multiple times a day — the friction was compounding, it was becoming genuinely disruptive',
      'I was also trying to get into DevOps practices at the time, so this felt like a really approachable real-world pipeline to actually build and learn from',
      '---',
      'ACTION',
      'Set up a GitHub Actions pipeline to own the whole thing — build, S3 sync, cache invalidation on every push to main',
      'Scoped an IAM user to just what the workflow actually needed, stored the credentials as GitHub secrets',
      'Had to configure CloudFront to return index.html on unmatched paths — without that, client-side routing breaks at the CDN level because the path doesn\'t exist as an S3 object',
      'Visitor counter: Lambda behind API Gateway, DynamoDB for state — no idle compute, no server to manage, essentially free at this traffic level',
      '---',
      'RESULT',
      'What used to be 10–15 minutes of manual steps just runs in the background on every push now',
      'Whole stack costs pennies a month — static hosting over compute, serverless where I needed dynamic behaviour',
      'Architecture scales if traffic ever justifies it — wasn\'t going to over-provision for a personal site',
      '---',
      'CLOSE',
      'The interesting part wasn\'t the website itself — it was realising how much smoother development becomes once repetitive operational tasks disappear into the background',
      'It stopped feeling like manually deploying a website every time I made a change',
      'By the end, I could just push to GitHub and watch the pipeline handle the rest — which genuinely made development more enjoyable',
    ],
    workflow: {
      name: 'deploy.yml',
      setup: [
        'Scoped IAM permissions',
        'GitHub Secrets',
        'CloudFront SPA fallback to index.html',
      ],
      pipeline: [
        'git push',
        'Actions starts',
        { name: 'checkout repo', sub: 'download source code' },
        { name: 'setup Node', sub: 'install JS runtime' },
        { name: 'npm ci', sub: 'install exact dependencies' },
        'npm run build',
        'aws s3 sync dist/ --delete',
        'CloudFront invalidation',
        'site live',
      ],
    },
    lps: ['Invent and Simplify', 'Bias for Action', 'Frugality'],
    toneWarning: 'Practical and direct. Don\'t turn it into an AWS tour — the story is removing friction, not the architecture.',
  },
]
