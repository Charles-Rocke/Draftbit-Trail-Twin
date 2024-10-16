const displayNoFilter = startTimeFilter => {
  if (startTimeFilter === null) {
    return 'No Filter';
  } else {
    return startTimeFilter;
  }
};

export default displayNoFilter;
