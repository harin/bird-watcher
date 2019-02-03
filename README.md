# Goal

To create a bot like service that regularly check a company page for internship positons and email me when they are available, so that I don't have to.


# Overview

I used apify.com to scrape bird career page and look for internship positions regularly. Then once it finishes the scraping, have it call a webhook on AWS which is setup in this repository. The lambda function then calls apify to get the result and pass the result to mailgun for it to email me. No server needed!

# Services used

- apify.com
- mailgun.com
- AWS

# Setup
* Note that you'll need to setup mailgun and apify in addition to deploying this code on AWS Lambda. Serverless has a great guide on how to setup AWS for this (AWS is rather complicated).

```bash
npm install -g serverless
```

# Deploy
```bash
serverless deploy
```



