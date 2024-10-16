const daysAway = inputDateStr => {
  // Parse the input date
  const inputDate = new Date(inputDateStr);

  // Get today's date without the time component
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

  // Calculate the difference in time (in milliseconds)
  const diffInTime = inputDate - today;

  // Convert time difference from milliseconds to days
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  return diffInDays;
};

export default daysAway;
