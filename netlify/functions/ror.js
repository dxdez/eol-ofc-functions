import RateOfReturn from '../../src/api/rate-of-return.js';

exports.handler = async (event, context) => {
	const { mode, li, av, pv, dy, dm, fr } = event.queryStringParameters;
	let result;
	switch(mode) {
		case 'annual-compound-return':
			result = RateOfReturn.getRateOfReturnAnnualCompoundReturn(av, pv, dy, dm, fr); 
			break;
		case 'total-percentage-gain':
			result = RateOfReturn.getRateOfReturnTotalPercentageGain(av, pv, dy, dm, fr);
			break;
		case 'lumpsum-annual-compound-return':
			result = RateOfReturn.getRateOfReturnLumpSumAnnualCompoundReturn(li, pv, dy, dm);
			break;
		case 'lumpsum-total-percentage-gain':
			result = RateOfReturn.getRateOfReturnLumpSumTotalPercentageGain(li, pv);
			break;
		case 'lumpsum-average-annual-gain':
			result = RateOfReturn.getRateOfReturnLumpSumAverageAnnualGain(li, pv, dy, dm);
			break;
		default:
			result = 'Not Found'
	}
	return {
		statusCode: 200,
		body: result.toString(),
	};
};

exports.handler.path = "/api/ror";
