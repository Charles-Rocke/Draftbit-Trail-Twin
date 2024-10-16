const formatHours = hour => {
  if (hour === 0) {
    return null;
  } else if (hour > 13) {
    return hour - 13;
  } else {
    return hour;
  }
};

export default formatHours;
