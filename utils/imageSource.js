const imageSource = obj => (typeof obj === 'string' ? { uri: obj } : obj);
export default imageSource;
