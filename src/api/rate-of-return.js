import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import { DueDate } from '../config/globals.js';

export default {
	getRateOfReturnAnnualCompoundReturn: function (amountValue, presentValue, durationYears, durationMonths, frequency) {
		let _amount = Helper.getNumber(amountValue);
		let _presentVal = Helper.getNumber(presentValue);
		let _durYears = Helper.getNumber(durationYears, true);
		let _durMonths = Helper.getNumber(durationMonths, true);
		let _freq = Helper.getValueFromFrequency(frequency);
		let periods = (_durMonths + (_durYears * 12)) / _freq;
		let rate = Calculations.calculateRateOfReturn(periods, -_amount, 0.0, _presentVal, DueDate.BegOfPeriod);
		let finalValue = (Math.pow((1 + rate), (12 / _freq)) - 1) * 100;
		return Helper.getReturnValue(finalValue);
	},
	getRateOfReturnTotalPercentageGain: function (amountValue, presentValue, durationYears, durationMonths, frequency) {
		let _amount = Helper.getNumber(amountValue);
		let _presentVal = Helper.getNumber(presentValue);
		let _durYears = Helper.getNumber(durationYears, true);
		let _durMonths = Helper.getNumber(durationMonths, true);
		let _freq = Helper.getValueFromFrequency(frequency);
		let periods = (_durMonths + (_durYears * 12)) / _freq;
		let finalValue = 100 * (_presentVal - (_amount * periods)) / (_amount * periods);
		return Helper.getReturnValue(finalValue);
	},
	getRateOfReturnLumpSumAnnualCompoundReturn: function(lumpInvested, presentValue, durationYears, durationMonths) {
		let _investment = Helper.getNumber(lumpInvested);
		let _presentVal = Helper.getNumber(presentValue);
		let _durYears = Helper.getNumber(durationYears);
		let _durMonths = Helper.getNumber(durationMonths);
		let _time = Math.round(_durYears, 0) + (Math.round(_durMonths, 1) / 12);
		let finalValue = (Math.pow((_presentVal / _investment), (1 / _time)) - 1) * 100;
		return Helper.getReturnValue(finalValue);
	},
	getRateOfReturnLumpSumTotalPercentageGain: function (lumpInvested, presentValue) {
		let _investment = Helper.getNumber(lumpInvested);
		let _presentVal = Helper.getNumber(presentValue);
		let finalValue = 100 * (_presentVal - _investment) / _investment;
		return Helper.getReturnValue(finalValue);
	},
	getRateOfReturnLumpSumAverageAnnualGain: function (lumpInvested, presentValue, durationYears, durationMonths) {
		let _investment = Helper.getNumber(lumpInvested);
		let _presentVal = Helper.getNumber(presentValue);
		let _durYears = Helper.getNumber(durationYears);
		let _durMonths = Helper.getNumber(durationMonths);
		let _time = Math.round(_durYears, 0) + (Math.round(_durMonths, 1) / 12);
		let finalValue = (100 * (_presentVal - _investment) / _investment) / _time;
		return Helper.getReturnValue(finalValue);
	}
}
