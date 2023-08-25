import DesiredIncome from "../../src/api/desired-income.js";

exports.handler = async (event, context) => {
  const { mode, pid, air, wf, dy, crc, cf } = event.queryStringParameters;
  let result;
  switch (mode) {
    case "total-income-required":
      result = DesiredIncome.totalIncomeRequired(pid, air, wf, dy, crc, cf);
      break;
    case "get-withdrawl-data":
      result = DesiredIncome.getWithdrawlData(pid, air, wf, dy, crc, cf);
      break;
    default:
      result = "Not Found";
  }
  return {
    statusCode: 200,
    body: result.toString(),
  };
};

exports.handler.path = "/api/di";

