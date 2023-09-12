import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import DueDate from '../config/globals.js';

export default {
  getAmountPerWithdrawl: function (presentValue, years, withdrawls, frequency, returnPercentage) {
    let numberPresentValue = Helper.getNumber(presentValue);
    let numberPercentage = Helper.getNumber(returnPercentage);
    let numberYears = Helper.getNumber(years);
    let numberOfWithdrawls = Helper.getNumber(withdrawls);
    let valueFrequency = Helper.getValueFromFrequencyAlt(frequency);
    let returnAmount = (Math.pow((1 + (numberPercentage / 100) * (1.0 / valueFrequency)), valueFrequency)) - 1;
    let finalValue = -Calculations.calculatePayment(Math.pow((1 + returnAmount), (1 / numberOfWithdrawls)) - 1, (numberOfWithdrawls * numberYears), numberPresentValue, 0, DueDate.EndOfPeriod);
    return Helper.getReturnValue(finalValue);
  },
  getTotalPayout: function (amountPerWithdrawl, years, withdrawls) {
    let numberAmountByWithdrawl = Helper.getNumber(amountPerWithdrawl);
    let numberYears = Helper.getNumber(years);
    let numberOfWithdrawls = Helper.getNumber(withdrawls);
    let finalValue = numberAmountByWithdrawl * numberYears * numberOfWithdrawls;
    return Helper.getReturnValue(finalValue);
  }
}
