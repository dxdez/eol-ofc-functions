# ofc-serverless-functions

The Open Financial Calculator is an application that provides basic financial calculations to assist users with financial planning. The application utilizes serverless functions on Netlify, and the provided functions are used to calculate rates of return for various financial scenarios, such as annual compound return, total percentage gain, and lump sum average annual gain. In addition to the rate of return functionality, the Open Financial Calculator application also provides several other financial calculations to assist users with their financial planning. Some of these additional functions include:

## Future Value

Calculates the future value of an investment based on a specified interest rate and compounding period, as well as the initial investment amount and the length of the investment.

## Future Amount

Calculates the future amount of a regular investment based on a specified interest rate and compounding period, as well as the initial investment amount, the length of the investment, and the regular investment amount.

## Major Purchase

Calculates the required amount of money that needs to be saved on a regular basis in order to reach a specified financial goal, such as a down payment on a home or a college education.

## Capital Depletion

### Description
Tracks the depletion of capital over time based on a specified investment rate of return, initial investment amount, and regular withdrawals. The /api/cd endpoint calculates and tracks the depletion of capital over time based on a specified investment rate of return, initial investment amount, and regular withdrawals. It provides two modes of operation: get-amount-per-withdrawl and get-total-payout. The mode is specified as a query parameter in the request.

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

### Examples and Additional Notes
The following are examples of the capital depletion function.

Get Amount Per Withdrawl 
`GET /api/cd?mode=get-amount-per-withdrawl&pv=100000&y=10&w=12&f=0&rp=0.05`

Get Total Payout
`GET /api/cd?mode=get-total-payout&apw=1000&y=5&w=4`

- Use appropriate decimal values for percentage-based parameters (e.g., `rp` should be `0.05` for a 5% rate of return).
- Handle any errors or missing parameters by checking the response status code and body.
- Use the appropriate mode (`get-amount-per-withdrawl` or `get-total-payout`) based on the desired calculation.
- Validate the input parameters on the client side before making the API request to ensure data integrity and prevent unnecessary requests.
- Store the initial investment amount (`pv`) securely and handle it with caution, as it can affect the depletion calculation.
- Consider caching the results if the same calculations are performed frequently to improve performance and reduce unnecessary computations.

## Retirement Income

Calculates the amount of money that needs to be saved on a regular basis in order to achieve a desired level of income in retirement, based on a specified interest rate and the length of the retirement period.

All of these calculations can be very useful in helping users make informed financial decisions and plan for their future financial goals.
