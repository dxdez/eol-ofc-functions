import FutureAmount from '../../src/api/future-amount.js';

exports.handler = async (event, context) => {
	const { mode, ra, ar, dy, dm, fr, at, acr } = event.queryStringParameters;
	let result;
	switch(mode) {
		case 'periodic-investment':
			result = FutureAmount.getFutureAmountPeriodicInvestment(ra, ar, dy, dm, fr);	
			break;
		case 'lumpsum-investment':
			result = FutureAmount.getFutureAmountLumpSumInvestment(ra, ar, dy, dm);
			break;
		case 'periodic-lumpsum-investment':
			result = FutureAmount.getFutureAmountPeriodicLumpSumInvestment(ra, ar, at, dy, dm, fr);
			break;
		case 'leveraged-required-lump-sum':
			result = FutureAmount.getFutureAmountLeveragedRequiredLumpSumLeveraged(ra, dy, acr);
			break;
		default:
			result = 'Not Found'
	}
	return {
		statusCode: 200,
		body: result.toString(),
	};
};

exports.handler.path = "/api/fa";
