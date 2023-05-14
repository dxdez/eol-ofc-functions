import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import { Tags, DueDate } from '../config/globals.js';

export default {
	totalIncomeRequired: function(periodicIncomeDesired, annualInflationRate, withdrawlFrequency, durationYears, capitalReturnCompounding, compoundingFrequency) {
		let _parameterIncomeDesired = Helper.getNumber(periodicIncomeDesired);
		let _parameterAnnualInflationRate = Helper.getNumber(annualInflationRate);
		let _parameterCapitalReturnCompounding = Helper.getNumber(capitalReturnCompounding);
		let _parameterDurationYears = Helper.getNumber(durationYears, true);
		let _parameterWithdrawlFrequency = Helper.getValueFromFrequencyAlt(withdrawlFrequency);
		let _parameterCompoundingFrequency = Helper.getValueFromFrequencyAlt(compoundingFrequency);
		let finalValue = NaN;
		if (_parameterWithdrawlFrequency > 0 && _parameterDurationYears > 0) {
			let calculatedIndex = _parameterAnnualInflationRate / 100;
			let compoundIndex = _parameterCapitalReturnCompounding / 100;
			let returnRate = Math.pow((1.0 + (compoundIndex * (1.0 / _parameterCompoundingFrequency))), (_parameterCompoundingFrequency / 1.0)) - 1;
			let presentValueRate = Math.pow(1.0 + returnRate, 1.0 / _parameterWithdrawlFrequency) - 1;

			let currentIncomeDesiredValues = [];

			let currentIncomeDesired = _parameterIncomeDesired;
			for (let i = 0; i < _parameterDurationYears; i++) {
				currentIncomeDesiredValues.push(currentIncomeDesired);
				currentIncomeDesired *= (1 + calculatedIndex);
			}
			let nextWithdrawl = 0;
			let currentCapitalRemaining = 0;   
			for (let j = _parameterDurationYears; j > 0; j--) {
				let capitalRemaining = 0;
				if (j < _parameterDurationYears) {
					nextWithdrawl = currentIncomeDesiredValues[j];
					capitalRemaining = Calculations.calculatePresentValue(presentValueRate, _parameterWithdrawlFrequency, -nextWithdrawl, -currentCapitalRemaining, DueDate.EndOfPeriod);
				}
				currentCapitalRemaining = capitalRemaining;
			}
			finalValue = Calculations.calculatePresentValue(presentValueRate, _parameterWithdrawlFrequency, -_parameterIncomeDesired, -currentCapitalRemaining, DueDate.EndOfPeriod);        
		}
		return Helper.getReturnValue(finalValue);
	},
	getWithdrawlData: function(periodicIncomeDesired, annualInflationRate, withdrawlFrequency, durationYears, capitalReturnCompounding, compoundingFrequency) {
		let _parameterIncomeDesired = Helper.getNumber(periodicIncomeDesired);
		let _parameterAnnualInflationRate = Helper.getNumber(annualInflationRate);
		let _parameterCapitalReturnCompounding = Helper.getNumber(capitalReturnCompounding);
		let _parameterDurationYears = Helper.getNumber(durationYears, true);
		let _parameterWithdrawlFrequency = Helper.getValueFromFrequencyAlt(withdrawlFrequency);
		let _parameterCompoundingFrequency = Helper.getValueFromFrequencyAlt(compoundingFrequency);
		if (_parameterWithdrawlFrequency > 0 && _parameterDurationYears > 0) {
			let calculatedIndex = _parameterAnnualInflationRate / 100;
			let compoundIndex = _parameterCapitalReturnCompounding / 100;
			let returnRate = Math.pow((1.0 + (compoundIndex * (1.0 / _parameterCompoundingFrequency))), (_parameterCompoundingFrequency / 1.0)) - 1;
			let presentValueRate = Math.pow(1.0 + returnRate, 1.0 / _parameterWithdrawlFrequency) - 1;

			let currentIncomeDesiredValues = [];
			let capitalRemainingValues = [];
			let mainData = [];

			let currentIncomeDesired = _parameterIncomeDesired;
			for (let i = 0; i < _parameterDurationYears; i++) {
				currentIncomeDesiredValues.push(currentIncomeDesired);
				currentIncomeDesired *= (1 + calculatedIndex);
			}
			let nextWithdrawl = 0;
			let currentCapitalRemaining = 0;
			for (let j = _parameterDurationYears; j > 0; j--) {
				let capitalRemaining = 0;
				if (j < _parameterDurationYears) {
					nextWithdrawl = currentIncomeDesiredValues[j];
					capitalRemaining = Calculations.calculatePresentValue(presentValueRate, _parameterWithdrawlFrequency, -nextWithdrawl, -currentCapitalRemaining, DueDate.EndOfPeriod);
				}
				capitalRemainingValues.push(capitalRemaining);
				currentCapitalRemaining = capitalRemaining;
			}
			capitalRemainingValues.reverse();
			for(let k = 0; k < currentIncomeDesiredValues.length; k++) {
				let currentIndexyear = (k + 1);
				mainData.push({
					id: `000${currentIndexyear}`,
					year: currentIndexyear,
					withdrawls: currentIncomeDesiredValues[k],
					remainingValue: capitalRemainingValues[k]
				});
			}
			return mainData;
		}
		return [];
	}
}
