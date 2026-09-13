# California week with friends

Static itinerary for San Francisco and Napa, October 18–25, 2026.

## Deploying

The production deployment is performed by GitHub Actions using GitHub OIDC. Configure these repository variables after infrastructure deployment:

- `AWS_REGION`
- `AWS_ROLE_ARN`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`

The workflow syncs `site/` to the private S3 origin and invalidates CloudFront. No long-lived AWS credentials are stored in GitHub.

Infrastructure is split by AWS scope:

- `infrastructure/origin.yaml` — us-east-2 private S3 origin.
- `infrastructure/github-oidc.yaml` — GitHub OIDC deployment role (after the production distribution exists).
- `infrastructure/edge.yaml` — us-east-1 ACM, Route 53, CloudFront, WAF, and optional free pricing plan.
- `infrastructure/budget.yaml` — global AWS Budget (deploy in us-east-1 with a notification email parameter).
- `infrastructure/preferences.yaml` — us-east-2 POST-only guest-preferences HTTP API, Lambda, and encrypted DynamoDB storage.

## Guest preference responses

Guest responses are retained in the private `california-week-preferences-PreferencesTable-*` DynamoDB table until shortly after the trip. They are not available through the public site or API. With authenticated AWS access, retrieve responses using:

```sh
aws dynamodb scan --table-name "$(aws cloudformation describe-stacks --stack-name california-week-preferences --region us-east-2 --query 'Stacks[0].Outputs[?OutputKey==`PreferencesTableName`].OutputValue' --output text)" --region us-east-2
```

Treat this output as private guest information; do not copy it into GitHub, issues, or logs.
