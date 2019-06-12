# Installation of Docker Demo

## 1. Build Dockerfile

`docker build -t ecs-tax-calc .`

## 2. Run Docker Container

```bash
docker run --rm -it ecs-tax-calc /bin/bash
```

This will start the containiner and open a bash prompt in the containiner

## 3. Run Test command

```bash
root@f1d0b8f62759:/usr/src/app# CalculateTax 2018 43500
```

The output should be

```bash
Tax Year: 2018-2019
Gross Salary: £43,500.00

Personal Allowance: £11,850.00

Taxable Income: £31,650.00

Starter Rate: £2,000.00 @ 19% = £380.00
Base Rate: £10,149.00 @ 20% = £2,029.80
Intermediate Rate: £19,429.00 @ 21% = £4,080.09
Higher Rate: £72.00 @ 40% = £28.80

Total Tax Due: £6,518.69
```
