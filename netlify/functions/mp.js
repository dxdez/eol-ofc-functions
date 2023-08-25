import MajorPurchase from "../../src/api/major-purchase.js";

exports.handler = async (event, context) => {
  const { mode, cr, ny, ai, acr, crc, ls, ec, ca } =
    event.queryStringParameters;
  let result;
  switch (mode) {
    case "get-capital-required":
      result = MajorPurchase.getCapitalRequired(cr, ny, ai);
      break;
    case "get-lumpsum-today":
      result = MajorPurchase.getLumpSumToday(acr, ny, crc);
      break;
    case "get-lumpsum-required":
      result = MajorPurchase.getLumpSumRequired(ls, ec);
      break;
    case "get-monthly-investment":
      result = MajorPurchase.getMonthlyInvestments(acr, ny, ca, crc);
      break;
    default:
      result = "Not Found";
  }
  return {
    statusCode: 200,
    body: result.toString(),
  };
};

exports.handler.path = "/api/mp";

