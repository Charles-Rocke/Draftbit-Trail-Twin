const createEventStatus = eventDateStr => {
  // Parse the event date
  const eventDate = new Date(eventDateStr);
  // Get today's date without time component
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set today's time to 00:00:00 for date comparison

  // Remove the time part from the event date for accurate comparison
  eventDate.setHours(0, 0, 0, 0);

  // Compare the event date with today's date
  if (eventDate < today) {
    return 'Previous';
  } else if (eventDate.getTime() === today.getTime()) {
    return "Today's";
  } else {
    return 'Upcoming';
  }
};

export default createEventStatus;
