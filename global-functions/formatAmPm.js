const formatAmPm = (ampm, hour) => {
  if (hour === null) {
    ampm = null; // Correct assignment
  } else if (hour >= 12) {
    ampm = 'PM'; // Correct assignment
  } else {
    ampm = 'AM'; // Correct assignment
  }

  return ampm;
};

export default formatAmPm;
