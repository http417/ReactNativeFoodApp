const convertToDollars = (price) => {
  const dollars = price / 100;
  dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
  return dollars;
};

export default convertToDollars;
