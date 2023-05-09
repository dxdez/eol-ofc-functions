import MajorPurchase from '../../src/api/major-purchase.js';

exports.handler = async (event, context) => {
	const { mode, cr, ny, ai } = event.queryStringParameters;
	let result;
	switch(mode) {
		case 'get-capital-required':
			result = MajorPurchase.getCapitalRequired(cr, ny, ai);
			break;
		default:
			result = 'Not Found';
	}
	return {
		statusCode: 200,
		body: result.toString(),
	};
};

exports.handler.path = "/api/mp";
