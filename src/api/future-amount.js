import Calculations from '../services/calculator.js';
import Helper from '../services/helper.js';
import { DueDate } from '../config/globals.js';

export default {
	getFutureAmountPeriodicInvestment: function (returnAmount, amountRequired, durationYears, durationMonths, frequency) {
		let _futureAmountRequired = Helper.getNum(amountRequired);
		let _durYears = Helper.getNum(durationYears);
		let _durMonths = Helper.getNum(durationMonths);
		let _frequencySelection = frequency;
		let _frequency = 0;
		let _duration = 0;
		switch (_frequencySelection)
		{
			case Tags.frequencyAnnual:
				_frequency = 1;
				_duration = _durYears + (_durMonths / 12);
				break;
			case Tags.frequencyQuarterly:
				_frequency = 4;
				_duration = (_durYears * 4) + (_durMonths / 3);
				break;
			case Tags.frequencyMonthly:
				_frequency = 12;
				_duration = (_durYears * 12) + _durMonths;
				break;
			default:
				_frequency = 0;
				_duration = 0;
				break;
		}
		let rate = Math.pow((1.0 + (returnAmount / 100)), (1.0 / _frequency)) - 1;
		let duration = _duration;
		let finalValue = Calculations.calculatePayment(rate, duration, 0, -_futureAmountRequired, DueDate.BegOfPeriod);
		return Helper.getReturnValue(finalValue);
	}
}
