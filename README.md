# ofc-serverless-functions

The Open Financial Calculator is an application that provides basic financial calculations to assist users with financial planning. The application utilizes serverless functions on Netlify. 

The base url to access these serverless functions can be returned by the following end-point:

```
https://ofc-serverless-functions.netlify.app
```

The Open Financial Calculator application provides many financial calculations to assist users with their financial planning. These functions include:

&nbsp;
## Rate of Return

### Description
The `/api/ror` endpoint provides rate of return functionality for various financial calculations. It calculates the rate of return and other related metrics for investments or financial transactions. The API offers five modes of operation, each serving different calculations related to rate of return based on different parameters. The mode is specified as a query parameter in the request.

### Parameters
The following parameters can be passed as query parameters in the API request:

- `mode` (required): Specifies the mode of operation. It can have one of five values:
    - `annual-compound-return`: Calculates the annual compound return based on the present value, amount value, duration, and frequency.
    - `total-percentage-gain`: Calculates the total percentage gain based on the present value, amount value, duration, and frequency.
    - `lumpsum-annual-compound-return`: Calculates the annual compound return based on a lump sum investment.
    - `lumpsum-total-percentage-gain`: Calculates the total percentage gain based on a lump sum investment.
    - `lumpsum-average-annual-gain`: Calculates the average annual gain based on a lump sum investment.
- `li` (required for `lumpsum-annual-compound-return`, `lumpsum-total-percentage-gain`, and `lumpsum-average-annual-gain modes`): The lump sum investment amount.
- `av` (required for `annual-compound-return` and `total-percentage-gain modes`): The amount value or final amount received.
- `pv` (required for `annual-compound-return`, `total-percentage-gain`, and `lumpsum-annual-compound-return modes`): The present value or initial investment amount.
- `dy` (required for all modes): The number of years for which the investment is made.
- `dm` (optional): The number of months for which the investment is made (used in conjunction with `dy` for more precise calculations).
- `fr` (required for `annual-compound-return mode`): The frequency of compounding, such as 'annual', 'monthly', etc.

### Examples
The following are examples of the rate of return functionality.

Annual Compound Return<br/>
```
/api/ror?mode=annual-compound-return&av=10000&pv=8000&dy=5&fr=annual
```

Total Percentage Gain<br/>
```
/api/ror?mode=total-percentage-gain&av=10000&pv=8000&dy=5&fr=annual
```

Annual Compound Return with Lump Sum Investment<br/>
```
/api/ror?mode=lumpsum-annual-compound-return&li=5000&pv=3000&dy=5
```

Total Percentage Gain with Lump Sum Investment<br/>
```
/api/ror?mode=lumpsum-total-percentage-gain&li=5000&pv=3000
```

Average Annual Gain with Lump Sum Investment<br/>
```
/api/ror?mode=lumpsum-average-annual-gain&li=5000&pv=3000&dy=5
```

&nbsp;
## Future Value

### Description
The `/api/fv` endpoint calculates the future value of an investment based on a specified interest rate and compounding period, as well as the initial investment amount and the length of the investment. It provides three modes of operation: `periodic-annual-compound-return`, `lumpsum-annual-compound-return`, and `periodic-lumpsum-annual-compound-return`. The mode is specified as a query parameter in the request.

### Parameters
The following parameters can be passed as query parameters in the API request:

- `mode` (required): Specifies the mode of operation. It can have one of three values:
    - `periodic-annual-compound-return`: Calculates the future value based on a periodic investment with annual compounding.
    - `lumpsum-annual-compound-return`: Calculates the future value based on a lump sum investment with annual compounding.
    - `periodic-lumpsum-annual-compound-return`: Calculates the future value based on a combination of periodic and lump sum investments with annual compounding.
- `ia` (required for `periodic-annual-compound-return` and `periodic-lumpsum-annual-compound-return modes`): The periodic investment amount.
- `li` (`required for lumpsum-annual-compound-return` and `periodic-lumpsum-annual-compound-return modes`): The lump sum investment amount.
- `ifr` (`required for periodic-annual-compound-return` and `periodic-lumpsum-annual-compound-return modes`): The investment freuqncy (i.e. annually, semi-annually, monthly, quarterly)
- `y` (required): The number of years for which the investment is made.
- `p` (required): The number of compounding periods per year.

### Examples
The following are examples of the future value functionality.

Future Value with Periodic Investment (Annual Compounding)<br/>
```
/api/fv?mode=periodic-annual-compound-return&ia=1000&ifr=monthly&y=5&p=1
```

Future Value with Lump Sum Investment (Annual Compounding)<br/>
```
/api/fv?mode=lumpsum-annual-compound-return&li=5000&y=10&p=1
```

Future Value with Periodic and Lump Sum Investments (Annual Compounding)<br/>
```
/api/fv?mode=periodic-lumpsum-annual-compound-return&ia=1000&li=5000&ifr=semi-annually&y=10&p=1
```


&nbsp;
## Future Amount

### Description
The `/api/fa` endpoint calculates the future amount of a regular investment based on a specified interest rate and compounding period, as well as the initial investment amount, the length of the investment, and the regular investment amount. It provides six modes of operation, each serving different calculations related to future amounts based on different parameters. The mode is specified as a query parameter in the request.

### Parameters
The following parameters can be passed as query parameters in the API request:

- `mode` (required): Specifies the mode of operation. It can have one of six values:
    - `periodic-investment`: Calculates the future amount based on a periodic investment.
    - `lumpsum-investment`: Calculates the future amount based on a lump sum investment.
    - `periodic-lumpsum-investment`: Calculates the future amount based on a combination of periodic and lump sum investments.
    - `leveraged-required-lumpsum`: Calculates the future amount required to cover a leveraged investment with a lump sum.
    - `leveraged-value-amount`: Calculates the future amount of a leveraged investment.
    - `leveraged-value-balance-after-loan`: Calculates the future amount of a leveraged investment after deducting the loan amount.
- `ra` (required for `periodic-investment`, `lumpsum-investment`, `periodic-lumpsum-investment`, `leveraged-required-lumpsum`, `leveraged-value-amount`, and `leveraged-value-balance-after-loan` modes): The return amount.
- `ar` (required for `periodic-investment`, `lumpsum-investment`, and `periodic-lumpsum-investment modes`): The amount required at the end of the investment period.
- `dy` (required for all modes): The number of years for which the investment is made.
- `dm` (required for all modes): The number of compounding periods per year.
- `fr` (required for `periodic-investment` and `periodic-lumpsum-investment` modes): The frequency of compounding, this can be annually, monthly or quarterly.
- `at` (required for `periodic-lumpsum-investment` mode): The amount value for today.
- `acr` (required for `leveraged-required-lumpsum`, `leveraged-value-amount`, and `leveraged-value-balance-after-loan` modes): The annual compounding rate as a decimal value.

### Examples
The following are examples of the future amount function.

Future Amount with Periodic Investment<br/>
```
/api/fa?mode=periodic-investment&ra=100&ar=1000&dy=5&dm=0&fr=annually
```

Future Amount with Lump Sum Investment<br/>
```
/api/fa?mode=lumpsum-investment&ra=15&ar=5&dy=10&dm=1
```

Future Amount with Periodic and Lump Sum Investments<br/>
```
/api/fa?mode=periodic-lumpsum-investment&ra=1&ar=5&at=5000&dy=10&dm=1&fr=monthly
```

Future Amount of Leveraged Investment<br/>
```
/api/fa?mode=leveraged-value-amount&ra=1000&dy=10&acr=0.08
```

Future Amount Required for Leveraged Investment (Lump Sum)<br/>
```
/api/fa?mode=leveraged-required-lumpsum&ra=1000&dy=5&acr=0.10
```

Future Amount of Leveraged Investment After Loan Deduction<br/>
```
/api/fa?mode=leveraged-value-balance-after-loan&ra=1000&dy=10&acr=0.08
```


&nbsp;
## Major Purchase

### Description
Calculates the required amount of money that needs to be saved on a regular basis in order to reach a specified financial goal, such as a down payment on a home or a college education. The `/api/mp` endpoint calculates the required amount of money that needs to be saved on a regular basis in order to reach a specified financial goal, such as a down payment on a home or a college education. It provides four modes of operation, each serving different calculations related to major purchase savings based on different parameters. The mode is specified as a query parameter in the request.

### Parameters
The following parameters can be passed as query parameters in the API request:

- `mode` (required): Specifies the mode of operation. It can have one of four values:
    - `get-capital-required`: Calculates the required capital amount to reach the financial goal.
    - `get-lumpsum-today`: Calculates the lump sum amount required to achieve the financial goal when invested today.
    - `get-lumpsum-required`: Calculates the lump sum amount required to reach the financial goal with existing capital.
    - `get-monthly-investment`: Calculates the required monthly investment amount to reach the financial goal.
- `cr` (required for `get-capital-required` mode): The financial goal or capital required for the major purchase.
- `ny` (required for all modes): The number of years for which the investment is made.
- `ai` (required for `get-capital-required mode`): The annual inflation rate as a decimal value.
- `acr` (required for `get-lumpsum-today` and `get-monthly-investment modes`): The annual compound return rate as a decimal value.
- `crc` (required for `get-lumpsum-today` and `get-monthly-investment modes`): The calculated return capital or the amount already accumulated towards the goal.
- `ls` (required for `get-lumpsum-required mode`): The lump sum amount available or currently saved.
- `ec` (required for `get-lumpsum-required mode`): The existing capital or investments.
- `ca` (required for `get-monthly-investment mode`): The capital accumulated or investments already made.

### Examples
The following are examples of the major purchase function.

Capital Required for Major Purchase<br/>
```
/api/mp?mode=get-capital-required&cr=50000&ny=5&ai=0.03
```

Lump Sum Amount Required Today for Major Purchase<br/>
```
/api/mp?mode=get-lumpsum-today&acr=0.05&ny=10&crc=0
```

Lump Sum Amount Required with Existing Capital for Major Purchase<br/>
```
/api/mp?mode=get-lumpsum-required&ls=10000&ec=5000
```

Monthly Investment Required for Major Purchase<br/>
```
/api/mp?mode=get-monthly-investment&acr=0.06&ny=5&ca=10000&crc=5000
```


&nbsp;
## Capital Depletion

### Description
Tracks the depletion of capital over time based on a specified investment rate of return, initial investment amount, and regular withdrawals. The /api/cd endpoint calculates and tracks the depletion of capital over time based on a specified investment rate of return, initial investment amount, and regular withdrawals. It provides two modes of operation: `get-amount-per-withdrawl` and `get-total-payouti`. The mode is specified as a query parameter in the request.

### Parameters
The following parameters can be passed as query parameters in the API request:

- `mode` (required): Specifies the mode of operation. It can have one of two values:
    - `get-amount-per-withdrawl`: Calculates the amount available per withdrawal based on the provided parameters.
    - `get-total-payout`: Calculates the total payout over a specified number of years based on the provided parameters.
- `pv` (required for `get-amount-per-withdrawl` mode): The present value or initial investment amount.
- `y` (required): The number of years over which the calculations are performed.
- `w` (required): The number of withdrawals per year.
- `f` (required): The future value or target value to be reached.
- `rp` (required for `get-amount-per-withdrawl` mode): The annual rate of return on the investment as a decimal value (e.g., 0.05 for 5% rate of return).
- `apw` (required for `get-total-payout` mode): The amount per withdrawal.

### Examples
The following are examples of the capital depletion function.

Get Amount Per Withdrawl<br/>
```
/api/cd?mode=get-amount-per-withdrawl&pv=100000&y=10&w=12&f=0&rp=0.05
```

Get Total Payout<br/>
```
/api/cd?mode=get-total-payout&apw=1000&y=5&w=4
```

