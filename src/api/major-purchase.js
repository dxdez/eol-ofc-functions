import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import { Tags, DueDate } from '../config/globals.js';

export default {
	majorPurchase_getCapitalRequired: function (capitalRequired, numberYears, annualInflation) {
		let _capitalRequired = Helper.getNumber(capitalRequired);
		let _numberOfYears = Helper.getNumber(numberYears);
		let _annualInflationRate = Helper.getNumber(annualInflation);
		let calculatedRate = _annualInflationRate / 100;
		let finalValue = _capitalRequired * Math.pow(1 + calculatedRate, _numberOfYears);
		return Helper.getReturnValue(finalValue);
	}
}
