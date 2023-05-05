import CapitalDepletion from '../../src/api/capital-depletion.js';

exports.handler = async (event, context) => {
	const { mode, pv, y, w, f, rp } = event.queryStringParameters;
	let result;
	switch(mode) {
		case 'get-amount-per-withdrawl':
			result = CapitalDepletion.capitalDepletion_getAmountPerWithdrawl(pv, y, w, f, rp);
			break;
		default:
			result = 'Not Found';
	}
	return {
		statusCode: 200,
		body: result.toString(),
	};
};

exports.handler.path = "/api/cd";
