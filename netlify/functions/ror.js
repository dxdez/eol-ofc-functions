import RateOfReturn from '../../src/api/rate-of-return.js';

exports.handler = async (event, context) => {
	const { mode, li, av, pv, dy, dm, fr } = event.queryStringParameters;
	let result;
	switch(mode) {
		case 'annual-compound-return':
			result = RateOfReturn.getRateOfReturnAnnualCompoundReturn(av, pv, dy, dm, fr) 
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
