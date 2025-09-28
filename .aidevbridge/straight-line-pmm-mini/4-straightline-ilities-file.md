# Backlog Ilities File

<!-- Crosscutting concerns and Definition-of-Done style constraints.
     Written as "ability to ..." and grouped by concern area.
-->

## Security(ility)
- ability to support oauth2 on all external api calls
	+ include token rotation policy
	+ ! never log secrets or tokens

- ability to encrypt sensitive data in transit and at rest
	+ enforce TLS 1.2+ for all endpoints

## Deployability(ility)
- ability to deploy changes automatically with rollback
	+ store infra and pipelines as code
- ability to enable feature flags for risky releases
	+ document kill-switch paths

## Observability(ility)
- ability to trace requests across services
	+ propagate correlation ids
- ability to observe live system behavior
	+ ship metrics, logs, and traces to a single pane

## Scalability(ility)
- ability to scale components horizontally for peak traffic
	+ define autoscale thresholds and tests

## Testability(ility)
- ability to run automated tests at multiple levels
	+ unit, component, contract, e2e, performance smoke
