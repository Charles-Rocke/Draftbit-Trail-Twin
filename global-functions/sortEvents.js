const sortEvents = events => {
  // Get today's date
  const today = new Date();

  // Sort the events based on the absolute difference from today's date
  return events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return Math.abs(dateA - today) - Math.abs(dateB - today);
  });
};

export default sortEvents;
