import FutureAmount from '../../src/api/future-amount.js';

exports.handler = async (event, context) => {
	const { mode, ra, ar, dy, dm, fr } = event.queryStringParameters;
	let result;
	switch(mode) {
		case 'periodic-investment':
			result = FutureAmount.getFutureAmountPeriodicInvestment(ra, ar, dy, dm, fr);	
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
