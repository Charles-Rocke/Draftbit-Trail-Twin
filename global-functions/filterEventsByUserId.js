const filterEventsByUserId = (events, user_id) => {
  return events.filter(event => {
    if (Array.isArray(event.attendee_ids)) {
      return event.attendee_ids.includes(user_id);
    }
    return false; // Handle cases where attendee_ids is null or not an array
  });
};

export default filterEventsByUserId;
