export const addCommas = (amount) => {
  if (amount === "NaN" || isNaN(amount) || amount === "" || amount === undefined || amount === null) {
    return "0";
  } else {
    return amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const separateNumberParts = (value) => {
  if (value === "N/A") {
    return { whole: "N/A", decimal: "", hasDecimal: false };
  }

  let n;
  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, "").trim();
    if (cleaned === "") {
      n = 0;
    } else {
      n = parseFloat(cleaned);
    }
  } else if (typeof value === "number") {
    n = value;
  } else {
    throw new Error(`separateDecimal: unsupported type ${typeof value}`);
  }

  if (isNaN(n)) {
    throw new Error(`separateDecimal: "${value}" is not a valid number`);
  }

  const formatted = format4(n);

  const [whole, decimal = ""] = formatted.split(".");
  const hasDecimal = decimal !== "0000";

  return { whole, decimal, hasDecimal };
};
