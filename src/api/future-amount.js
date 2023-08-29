import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import {
  Tags,
  DueDate
} from '../config/globals.js';

export default {
  // Calculates the future value of a periodic investment. The function takes the return rate, the required amount, the duration in years and months, and the frequency of investment as inputs. It returns the future value of the investment.
  getFutureAmountPeriodicInvestment: function (returnAmount, amountRequired, durationYears, durationMonths, frequency) {
    let valueFutureAmountRequired = Helper.getNumber(amountRequired);
    let valueDurationYears = Helper.getNumber(durationYears);
    let valueDurationMonths = Helper.getNumber(durationMonths);
    let valueFrequencySelection = frequencytoUpperCase();
    let valueFrequency = 0;
    let valueDurationation = 0;
    switch (valueFrequencySelection) {
      case Tags.frequencyAnnual:
        valueFrequency = 1;
        valueDurationation = valueDurationYears + (valueDurationMonths / 12);
        break;
      case Tags.frequencyQuarterly:
        valueFrequency = 4;
        valueDurationation = (valueDurationYears * 4) + (valueDurationMonths / 3);
        break;
      case Tags.frequencyMonthly:
        valueFrequency = 12;
        valueDurationation = (valueDurationYears * 12) + valueDurationMonths;
        break;
      default:
        valueFrequency = 0;
        valueDurationation = 0;
        break;
    }
    let rate = Math.pow((1.0 + (returnAmount / 100)), (1.0 / valueFrequency)) - 1;
    let duration = valueDurationation;
    let finalValue = Calculations.calculatePayment(rate, duration, 0, -valueFutureAmountRequired, DueDate.BegOfPeriod);
    return Helper.getReturnValue(finalValue);
  },
  // Calculates the future value of a lump sum investment. The function takes the return rate, the required amount, and the duration in years and months as inputs. It returns the future value of the investment.
  getFutureAmountLumpSumInvestment: function (returnAmount, amountRequired, durationYears, durationMonths) {
    let valueFutureAmountRequired = Helper.getNumber(amountRequired);
    let valueDurationYears = Helper.getNumber(durationYears);
    let valueDurationMonths = Helper.getNumber(durationMonths);
    let calculatedReturnPercentage = Helper.getNumber(returnAmount / 100);
    let calculatedTime = valueDurationYears + (valueDurationMonths / 12);
    let finalValue = valueFutureAmountRequired / Math.pow((1 + calculatedReturnPercentage), calculatedTime);
    return Helper.getReturnValue(finalValue);
  },
  // Calculates the future value of a periodic lump sum investment. The function takes the return rate, the required amount, the current investment amount, the duration in years and months, and the frequency of investment as inputs. It returns the future value of the investment.
  getFutureAmountPeriodicLumpSumInvestment: function (returnAmount, amountRequired, amountToday, durationYears, durationMonths, frequency) {
    let valueFutureAmountRequired = Helper.getNumber(amountRequired);
    let valueAmountToday = Helper.getNumber(amountToday);
    let valueDurationYears = Helper.getNumber(durationYears);
    let valueDurationMonths = Helper.getNumber(durationMonths);
    let valueFrequencySelection = frequencytoUpperCase();
    let valueFrequency = 0;
    let valueDurationation = 0;
    switch (valueFrequencySelection) {
      case Tags.frequencyAnnual:
        valueFrequency = 1;
        valueDurationation = valueDurationYears + (valueDurationMonths / 12);
        break;
      case Tags.frequencyQuarterly:
        valueFrequency = 4;
        valueDurationation = (valueDurationYears * 4) + (valueDurationMonths / 3);
        break;
      case Tags.frequencyMonthly:
        valueFrequency = 12;
        valueDurationation = (valueDurationYears * 12) + valueDurationMonths;
        break;
      default:
        valueFrequency = 0;
        valueDurationation = 0;
        break;
    }
    let finalValue = Calculations.calculatePayment(Math.pow((1.0 + (returnAmount / 100.0)), (1.0 / valueFrequency)) - 1, valueDurationation, valueAmountToday, -valueFutureAmountRequired, DueDate.BegOfPeriod);
    return Helper.getReturnValue(finalValue);
  },
  // Calculates the future value of a required lump sum investment, assuming a leverage loan. The function takes the required amount, the duration in years, and the annual compound return rate as inputs. It returns the future value of the investment.
  getFutureAmountLeveragedRequiredLumpSumLeveraged: function (requiredAmount, durationYears, annualCompoundReturn) {
    let valueAmountRequired = Helper.getNumber(requiredAmount);
    let valueDurationYears = Helper.getNumber(durationYears);
    let valueAnnualCompoundReturn = Helper.getNumber(annualCompoundReturn);
    let finalValue = NaN;
    if (valueDurationYears > 0 && valueAnnualCompoundReturn > 0) {
      finalValue = valueAmountRequired / (Math.pow(1 + (valueAnnualCompoundReturn / 100.00), valueDurationYears) - 1);
    }
    return Helper.getReturnValue(finalValue);
  },
  // Calculates the future value of an investment with leverage, given the required amount and the duration in years, and the annual compound return rate. The function returns the future value of the investment.
  getFutureAmountLeveragedValueAmount: function (requiredAmount, durationYears, annualCompoundReturn) {
    let valueAmountRequired = Helper.getNumber(requiredAmount);
    let valueDurationYears = Helper.getNumber(durationYears);
    let valueAnnualCompoundReturn = Helper.getNumber(annualCompoundReturn);
    let finalValue = NaN;
    if (valueDurationYears > 0 && valueAnnualCompoundReturn > 0) {
      let requiredLumpSumValue = valueAmountRequired / (Math.pow(1 + (valueAnnualCompoundReturn / 100.00), valueDurationYears) - 1);
      finalValue = requiredLumpSumValue * (Math.pow((1 + (valueAnnualCompoundReturn / 100.00)), valueDurationYears));
    }
    return Helper.getReturnValue(finalValue);
  },
  // Calculates the balance after loan repayment for an investment with leverage. The function takes the required amount, the duration in years, and the annual compound return rate as inputs. It returns the balance after loan repayment.
  getFutureAmountLeveragedValueBalanceAfterLoan: function (requiredAmount, durationYears, annualCompoundReturn) {
    let valueAmountRequired = Helper.getNumber(requiredAmount);
    let valueDurationYears = Helper.getNumber(durationYears);
    let valueAnnualCompoundReturn = Helper.getNumber(annualCompoundReturn);
    let finalValue = NaN;
    if (valueDurationYears > 0 && valueAnnualCompoundReturn > 0) {
      let requiredLumpSumValue = valueAmountRequired / (Math.pow(1 + (valueAnnualCompoundReturn / 100.00), valueDurationYears) - 1);
      let leveragedAmountValue = requiredLumpSumValue * (Math.pow((1 + (valueAnnualCompoundReturn / 100.00)), valueDurationYears));
      finalValue = leveragedAmountValue - requiredLumpSumValue;
    }
    return Helper.getReturnValue(finalValue);
  }
}
