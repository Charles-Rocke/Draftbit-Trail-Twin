const filterEventsByDateRange = (events, minDateStr, maxDateStr) => {
  // Convert the min and max date strings to Date objects
  const minDate = new Date(minDateStr);
  const maxDate = new Date(maxDateStr);

  // Filter events within the date range
  return Object.values(events).filter(event => {
    const eventDate = new Date(event.date);
    // Return events whose date is between the min and max date (inclusive)
    return eventDate >= minDate && eventDate <= maxDate;
  });
};

export default filterEventsByDateRange;
