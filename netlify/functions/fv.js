import FutureValue from '../../src/api/future-value.js';

exports.handler = async (event, context) => {
	const { mode, ia, li, ifr, y, p } = event.queryStringParameters;
	let result;
	switch(mode) {
		case 'periodic-annual-compound-return':
			result = FutureValue.getFutureValuePeriodic_annualCompoundReturn(ia, ifr, y, p);
			break;
		case 'lumpsum-annual-compound-return':
			result = FutureValue.getFutureValueLumpSum_annualCompoundReturn(li, y, p);
			break;
		case 'periodic-lumpsum-annual-compound-return':
			result = FutureValue.getFutureValuePeriodicLumpSum_annualCompoundReturn(ia, li, ifr, y, p);
			break;
		default:
			result = 'Not Found';
	}
	return {
		statusCode: 200,
		body: result.toString(),
	};
};

exports.handler.path = "/api/fv";
