import { DueDate } from '../config/globals.js';

export default {
	calculateRateOfReturn: function(numberOfPeriods, payment, presentValue, futureValue = 0.0, dueDate, guess = 0.1) {
		if (numberOfPeriods <= 0.0) {
			return NaN;
		}
		// Set the initial guess rate to use in the calculation
		var rate1 = guess;
		// Use the initial guess rate to calculate the payment
		var payment1 = calculateInternalRateOfReturn(rate1, numberOfPeriods, payment, presentValue, futureValue, dueDate);
		// Choose a second rate to use in the calculation
		var rate2 = payment1 <= 0.0 ? rate1 * 2.0 : rate1 / 2.0;
		// Use the second rate to calculate the payment
		var payment2 = calculateInternalRateOfReturn(rate2, numberOfPeriods, payment, presentValue, futureValue, dueDate);
		// Use a loop to refine the rate of return estimate
		var numIterations = 0;
		do {
			// If the two payments are equal, adjust the first rate by a small amount
			if (payment2 == payment1) {
				if (rate2 > rate1) {
					rate1 -= 1E-05;
				} else {
					rate1 += 1E-05;
				}
				payment1 = calculateInternalRateOfReturn(rate1, numberOfPeriods, payment, presentValue, futureValue, dueDate);
				// If the adjusted payment is still equal to the second payment, return NaN
				if (payment2 == payment1) {
					return NaN;
				}
			}
			// Calculate a new rate estimate based on the two payments and their corresponding rates
			var rate3 = rate2 - ((rate2 - rate1) * payment2 / (payment2 - payment1));
			var payment3 = calculateInternalRateOfReturn(rate3, numberOfPeriods, payment, presentValue, futureValue, dueDate);
			// If the payment is within a certain threshold, return the rate of return estimate
			if (Math.abs(payment3) < 1E-07) {
				return rate3;
			}
			// Adjust the rates and payments for the next iteration of the loop
			var rate1temp = rate1;
			var rate2temp = rate2;
			rate1 = rate2temp;
			rate2 = rate3;
			payment1 = payment2;
			payment2 = payment3;
			// Increment the number of iterations of the loop
			numIterations++;
		} while (numIterations <= 39)
		// If the loop has run too many times without converging, return NaN
		return NaN;
	},
	calculateInternalRateOfReturn: function(rate, numberOfPeriods, payment, presentValue, futureValue, dueDate) {
		var result;
		if(rate == 0.0) {
			// If the rate is zero, use a simplified formula for the payment
			result = presentValue + payment * numberOfPeriods + futureValue;
		} else {
			// If the rate is not zero, use a more complex formula for the payment
			var factor = Math.pow(rate + 1.0, numberOfPeriods);
			var adjustment = (dueDate == DueDate.EndOfPeriod) ? 1.0 : 1.0 + rate;
			result = presentValue * factor + payment * adjustment * (factor - 1.0) / rate + futureValue;
		}
		return result;
	}
}
