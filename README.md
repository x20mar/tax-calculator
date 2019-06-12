# Tax-Calculator

Tax Calculator assignment from ECS Digital

## Notes/Thoughts while working

- Tax band values should live in a config file. This will allow extension of further tax years eaiser
- Creating the config file should be the first step
- Becareful calculating tax as you don't want to double tax some values
- Example shown is based upon Scottish Income bands, we should also be able to support English bands without code changes

## Plan of action

1. Setup `Hello World` cli
2. Develop Config file
3. Write method of seperating salary into the correct bands (with the correct values)
4. Create text CLI wrapper with correct details
5. Write Unit tests for cli
6. Produce demoable Dockerfile
