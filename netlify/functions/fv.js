import FutureValue from '../../src/api/future-value.js';

exports.handler = async (event, context) => {
	const { mode, ia, if, y, p } = event.queryStringParameters;
	let result;
	switch(mode) {
		case 'periodic-annual-compound-return':
			result = FutureValue.getFutureValuePeriodic_annualCompoundReturn(ia, if, y, p);
			break;
	}
	return {
		statusCode: 200,
		body: result.toString(),
	};
};

exports.handler.path = "/api/fv";
