const generateImageName = () => {
  // Generate a unique image name
  const imgName = `${Math.random()
    .toString(36)
    .substring(2)}-${Date.now()}.jpg`;
  return imgName;
};

export default generateImageName;
