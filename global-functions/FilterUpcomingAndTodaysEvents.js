const FilterUpcomingAndTodaysEvents = events => {
  return events.filter(event => event.event_status !== 'Passed');
};

export default FilterUpcomingAndTodaysEvents;
