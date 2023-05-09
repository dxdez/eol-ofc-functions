import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import { Tags, DueDate } from '../config/globals.js';

export default {
	getCapitalRequired: function (capitalRequired, numberYears, annualInflation) {
		let _capitalRequired = Helper.getNumber(capitalRequired);
		let _numberOfYears = Helper.getNumber(numberYears);
		let _annualInflationRate = Helper.getNumber(annualInflation);
		let calculatedRate = _annualInflationRate / 100;
		let finalValue = _capitalRequired * Math.pow(1 + calculatedRate, _numberOfYears);
		return Helper.getReturnValue(finalValue);
	},
	getLumpSumToday: function (annualCompoundReturn, numberYears, calculatedReturnCapital) {
		let _numberOfYears = Helper.getNumber(numberYears);
		let _annualCompoundReturn = Helper.getNumber(annualCompoundReturn);
		let calculatedCompound = _annualCompoundReturn / 100;
		let finalValue = calculatedReturnCapital / Math.pow(1 + calculatedCompound, _numberOfYears);
		return Helper.getReturnValue(finalValue);
	},
	getLumpSumRequired: function (lumpSum, existingCapital) {
		let finalValue = lumpSum - existingCapital;
		return Helper.getReturnValue(finalValue);
	},
	getMonthlyInvestments: function (annualCompoundReturn, numberYears, capitalAccumulated, calculatedReturnCapital) {
		let _capitalAccumulated = Helper.getNumber(capitalAccumulated);
		let _annualCompoundReturn = Helper.getNumber(annualCompoundReturn);
		let _numberOfYears = Helper.getNumber(numberYears);
		let calculatedAnnualCompoundReturn = 1 + (_annualCompoundReturn / 100);
		let calculatedTime = _numberOfYears * 12;
		let calculatedRate = Math.pow(calculatedAnnualCompoundReturn, 1.0 / 12) - 1;
		let calculatedValue = calculatedReturnCapital - (_capitalAccumulated * Math.pow(calculatedAnnualCompoundReturn, _numberOfYears));
		let finalValue = -Calculations.calculatePayment(calculatedRate, calculatedTime, 0, calculatedValue, DueDate.BegOfPeriod);
		return Helper.getReturnValue(finalValue);
	}
}
