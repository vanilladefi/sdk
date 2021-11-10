export var ConversionState;
(function (ConversionState) {
    ConversionState[ConversionState["LOADING"] = 0] = "LOADING";
    ConversionState[ConversionState["HIDDEN"] = 1] = "HIDDEN";
    ConversionState[ConversionState["AVAILABLE"] = 2] = "AVAILABLE";
    ConversionState[ConversionState["READY"] = 3] = "READY";
    ConversionState[ConversionState["APPROVING"] = 4] = "APPROVING";
    ConversionState[ConversionState["APPROVED"] = 5] = "APPROVED";
    ConversionState[ConversionState["MINTED"] = 6] = "MINTED";
    ConversionState[ConversionState["ERROR"] = 7] = "ERROR";
})(ConversionState || (ConversionState = {}));
