# SAFE_MODE (Pre-Launch)

**SAFE_MODE=true** prevents accidental cloud spend while developing:
- CI blocks deploy commands (`sls deploy`, `terraform apply`, `cdk deploy`).
- Local pre-push hook scans the repo for dangerous deploy verbs.
- Use **plan/package/synth** commands safely:
  - Terraform: `terraform plan` (no apply)
  - Serverless: `serverless package` (no deploy)
  - CDK: `cdk synth` (no deploy)

To launch, explicitly disable SAFE_MODE in a controlled PR and add approved deploy workflows.


