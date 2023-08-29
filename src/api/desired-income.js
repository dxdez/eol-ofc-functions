import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import {
  Tags,
  DueDate
} from '../config/globals.js';

export default {
  totalIncomeRequired: function (periodicIncomeDesired, annualInflationRate, withdrawlFrequency, durationYears, capitalReturnCompounding, compoundingFrequency) {
    let valueIncomeDesired = Helper.getNumber(periodicIncomeDesired);
    let valueAnnualInflationRate = Helper.getNumber(annualInflationRate);
    let valueCapitalReturnCompounding = Helper.getNumber(capitalReturnCompounding);
    let valueDurationYears = Helper.getNumber(durationYears, true);
    let valueWithdrawlFrequency = Helper.getValueFromFrequencyAlt(withdrawlFrequency);
    let valueCompoundingFrequency = Helper.getValueFromFrequencyAlt(compoundingFrequency);
    let finalValue = NaN;
    if (valueWithdrawlFrequency > 0 && valueDurationYears > 0) {
      let calculatedIndex = valueAnnualInflationRate / 100;
      let compoundIndex = valueCapitalReturnCompounding / 100;
      let returnRate = Math.pow((1.0 + (compoundIndex * (1.0 / valueCompoundingFrequency))), (valueCompoundingFrequency / 1.0)) - 1;
      let presentValueRate = Math.pow(1.0 + returnRate, 1.0 / valueWithdrawlFrequency) - 1;

      let currentIncomeDesiredValues = [];

      let currentIncomeDesired = valueIncomeDesired;
      for (let i = 0; i < valueDurationYears; i++) {
        currentIncomeDesiredValues.push(currentIncomeDesired);
        currentIncomeDesired *= (1 + calculatedIndex);
      }
      let nextWithdrawl = 0;
      let currentCapitalRemaining = 0;
      for (let j = valueDurationYears; j > 0; j--) {
        let capitalRemaining = 0;
        if (j < valueDurationYears) {
          nextWithdrawl = currentIncomeDesiredValues[j];
          capitalRemaining = Calculations.calculatePresentValue(presentValueRate, valueWithdrawlFrequency, -nextWithdrawl, -currentCapitalRemaining, DueDate.EndOfPeriod);
        }
        currentCapitalRemaining = capitalRemaining;
      }
      finalValue = Calculations.calculatePresentValue(presentValueRate, valueWithdrawlFrequency, -valueIncomeDesired, -currentCapitalRemaining, DueDate.EndOfPeriod);
    }
    return Helper.getReturnValue(finalValue);
  },
  getWithdrawlData: function (periodicIncomeDesired, annualInflationRate, withdrawlFrequency, durationYears, capitalReturnCompounding, compoundingFrequency) {
    let valueIncomeDesired = Helper.getNumber(periodicIncomeDesired);
    let valueAnnualInflationRate = Helper.getNumber(annualInflationRate);
    let valueCapitalReturnCompounding = Helper.getNumber(capitalReturnCompounding);
    let valueDurationYears = Helper.getNumber(durationYears, true);
    let valueWithdrawlFrequency = Helper.getValueFromFrequencyAlt(withdrawlFrequency);
    let valueCompoundingFrequency = Helper.getValueFromFrequencyAlt(compoundingFrequency);
    let withdrawlData = {
      wd: []
    };
    if (valueWithdrawlFrequency > 0 && valueDurationYears > 0) {
      let calculatedIndex = valueAnnualInflationRate / 100;
      let compoundIndex = valueCapitalReturnCompounding / 100;
      let returnRate = Math.pow((1.0 + (compoundIndex * (1.0 / valueCompoundingFrequency))), (valueCompoundingFrequency / 1.0)) - 1;
      let presentValueRate = Math.pow(1.0 + returnRate, 1.0 / valueWithdrawlFrequency) - 1;

      let currentIncomeDesiredValues = [];
      let capitalRemainingValues = [];
      let mainData = [];

      let currentIncomeDesired = valueIncomeDesired;
      for (let i = 0; i < valueDurationYears; i++) {
        currentIncomeDesiredValues.push(currentIncomeDesired);
        currentIncomeDesired *= (1 + calculatedIndex);
      }
      let nextWithdrawl = 0;
      let currentCapitalRemaining = 0;
      for (let j = valueDurationYears; j > 0; j--) {
        let capitalRemaining = 0;
        if (j < valueDurationYears) {
          nextWithdrawl = currentIncomeDesiredValues[j];
          capitalRemaining = Calculations.calculatePresentValue(presentValueRate, valueWithdrawlFrequency, -nextWithdrawl, -currentCapitalRemaining, DueDate.EndOfPeriod);
        }
        capitalRemainingValues.push(capitalRemaining);
        currentCapitalRemaining = capitalRemaining;
      }
      capitalRemainingValues.reverse();
      for (let k = 0; k < currentIncomeDesiredValues.length; k++) {
        let currentIndexyear = (k + 1);
        mainData.push({
          id: `000${currentIndexyear}`,
          year: currentIndexyear,
          withdrawls: currentIncomeDesiredValues[k],
          remainingValue: capitalRemainingValues[k]
        });
      }
      withdrawlData.wd = mainData;
    }
    return JSON.stringify(withdrawlData);
  }
}
