const formatRideLength = number => {
  return number === 1 ? `${number} Hour` : `${number} Hours`;
};

export default formatRideLength;
