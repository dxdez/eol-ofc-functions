export default {
    getReturnValue: function (checkValue) {
        if (isNaN(checkValue) || isNull(checkValue) || !isFinite(checkValue)) {
            return "-";
        } else {
            return checkValue.toFixed(2);
        }
    }
}
