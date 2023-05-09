import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import { Tags, DueDate } from '../config/globals.js';

export default {
	getAmountPerWithdrawl: function (presentValue, years, withdrawls, frequency, returnPercentage) {
		let _presentValue = Helper.getNumber(presentValue);
		let _percentage = Helper.getNumber(returnPercentage);
		let _parameterYear = Helper.getNumber(years);
		let _numberOfWithdrawls = Helper.getNumber(withdrawls);
		let _frequency = Helper.getValueFromFrequencyAlt(frequency);
		let returnAmount = (Math.pow((1 + (_percentage / 100) * (1.0 / _frequency)), _frequency)) - 1;
		let finalValue = -Calculations.calculatePayment(Math.pow((1 + returnAmount), (1 / _numberOfWithdrawls)) - 1, (_numberOfWithdrawls * _parameterYear), _presentValue, 0, DueDate.EndOfPeriod);
		return Helper.getReturnValue(finalValue);
	},
	getTotalPayout: function (amountPerWithdrawl, years, withdrawls) {
		let _amount = Helper.getNumber(amountPerWithdrawl);
		let _parameterYear = Helper.getNumber(years);
		let _numberOfWithdrawls = Helper.getNumber(withdrawls);
		let finalValue = _amount * _parameterYear * _numberOfWithdrawls;
		return Helper.getReturnValue(finalValue);
	}
}
