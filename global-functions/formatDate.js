const formatDate = date => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export default formatDate;
