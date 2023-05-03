import FutureValue from '../../src/api/future-value.js';

exports.handler = async (event, context) => {
	const { mode, ia, li, if, y, p } = event.queryStringParameters;
	let result;
	switch(mode) {
		case 'periodic-annual-compound-return':
			result = FutureValue.getFutureValuePeriodic_annualCompoundReturn(ia, if, y, p);
			break;
		case 'lumpsum-annual-compound-return':
			result = FutureValue.getFutureValueLumpSum_annualCompoundReturn(li, y, p);
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
