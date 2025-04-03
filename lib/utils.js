
export const generateOffer = () => {
  const availableDiscounts = [20, 45, 75, null];
  return availableDiscounts[
    Math.floor(Math.random() * availableDiscounts.length)
  ];
};

export const loaderProp =({ src }) => {
  return src;
}