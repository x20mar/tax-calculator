This assignment is designed to test your object-oriented development skills.  You are free to use the language of your choice.

Your submission should include all relevant source code and IDE solution files.  This should include the necessary unit and integration tests.  You should provide all files necessary for the assessor to open, build and execute your submission in your chosen IDE.

**Assignment**

Write a program, with necessary unit tests, that can calculate the amount of income tax due in a given tax year for a given salary.

Everyone has a personal allowance on which no tax is due.  In other words, a worker is not required to pay tax until they have earned more than the personal allowance.  The following table details the personal allowance for recent tax years.

| **Tax Year:** | **2018 to 2019** | **2017 to 2018** | **2016 to 2017** | **2015 to 2016** |
| --- | --- | --- | --- | --- |
| Personal Allowance: | £11,850 | £11,500 | £11,000 | £10,600 |

Once over the personal allowance the amount of income tax due can be calculated using the rates in the table below:

| **Band** | **Rate** | **2018 to 2019** | **2017 to 2018** | **2016 to 2017** | **2015 to 2016** |
| --- | --- | --- | --- | --- | --- |
| Starter rate | 19% | Up to £2,000 | N/A | N/A | N/A |
| Basic rate | 20% | £2,001 to £12,150 | Up to £31,500 | Up to £32,000 | Up to £31,785 |
| Intermediate rate | 21% | £12,151 to £31,580 | N/A | N/A   | N/A |
| Higher rate | 40% | £31,581 to £150,000 | £31,501 to £150,000 | £32,001 to £150,000 | £31,786 to £150,000 |
| Top rate | 46% | Over £150,000 | N/A | N/A | N/A |

The program should accept the tax year and the gross income on the command line.

Input should be in the form: **CalculateTax**  TaxYearGrossIncome

For example: `CalculateTax 2018 43500`

Output should be written to the console, for example:

```
Tax Year: 2018-2019
Gross Salary: £43,500
Personal Allowance: £11,850.00
Taxable Income: £31,650.00
Starter Rate: £2,000.00 @19% = £380
Basic Rate: £10,149.00 @ 20% = £2029.80
Intermediate Rate: £19,429 @ 21% = £4,080.09
Higher Rate: £72.00 @ 40% = £28.80
Total Tax Due: £6,518.69
```

The code and design should not only meet these requirements but it should be extensible.  In particular, adding support for future tax years should not affect the current functionality.  The code should be well structured, suitably commented, have error handling and be tested.
