const filterEvents = (
  events,
  eventTypeFilter,
  tagsFilter,
  rideNameFilter,
  trailFilter,
  skillLevelFilter,
  minDateFilter,
  maxDateFilter,
  startTimeAfterFilter,
  startTimeBeforeFilter
) => {
  console.log('Non Filtered Events:', events);
  console.log('startTimeBeforeFilter:', startTimeBeforeFilter);
  console.log('startTimeAfterFilter:', startTimeAfterFilter);
  console.log('eventTypeFilter:', eventTypeFilter);
  console.log('tagsFilter:', tagsFilter);
  console.log('rideNameFilter:', rideNameFilter);
  console.log('trailFilter:', trailFilter);
  console.log('skillLevelFilter:', skillLevelFilter);
  console.log('minDateFilter:', minDateFilter);
  console.log('maxDateFilter:', maxDateFilter);

  // If all filters are null, return the entire events array
  if (
    startTimeBeforeFilter === null &&
    startTimeAfterFilter === null &&
    eventTypeFilter === null &&
    (!tagsFilter || tagsFilter.length === 0) &&
    rideNameFilter === null &&
    trailFilter === null &&
    skillLevelFilter === null &&
    minDateFilter === null &&
    maxDateFilter === null
  ) {
    console.log('No Filter, Returning: ', events);
    return events;
  }

  // Ensure events is an array
  if (!Array.isArray(events)) {
    console.error('Error: events is not an array or is undefined', events);
    return [];
  }

  const filteredEvents = events.filter(event => {
    // Check start time filter (event.start_time is a number between 0-23)
    if (startTimeBeforeFilter !== null || startTimeAfterFilter !== null) {
      const eventStartTime = parseInt(event.start_time, 10);

      // Check if event start time is after the specified startTimeAfterFilter
      if (
        startTimeAfterFilter !== null &&
        eventStartTime < startTimeAfterFilter
      ) {
        return false;
      }

      // Check if event start time is before the specified startTimeBeforeFilter
      if (
        startTimeBeforeFilter !== null &&
        eventStartTime > startTimeBeforeFilter
      ) {
        return false;
      }
    }

    // Check event type filter
    if (
      eventTypeFilter &&
      event.event_type &&
      event.event_type !== eventTypeFilter
    ) {
      return false;
    }

    // Check tags filter (assuming tagsFilter is an array)
    if (tagsFilter && tagsFilter.length > 0) {
      const eventTags = event.tags || [];
      if (!tagsFilter.every(tag => eventTags.includes(tag))) {
        return false;
      }
    }

    // Check ride name filter
    if (
      rideNameFilter &&
      event.event_name &&
      !event.event_name.toLowerCase().includes(rideNameFilter.toLowerCase())
    ) {
      return false;
    }

    // Check trail filter
    if (
      trailFilter &&
      event.trail_names &&
      !event.trail_names.toLowerCase().includes(trailFilter.toLowerCase())
    ) {
      return false;
    }

    // Check skill level filter
    if (
      skillLevelFilter &&
      event.skill_level &&
      event.skill_level !== skillLevelFilter
    ) {
      return false;
    }

    // Check date filter (assuming event.date is in the format 'YYYY-MM-DD')
    if (event.date) {
      const eventDate = new Date(event.date).getTime();

      if (minDateFilter && eventDate < new Date(minDateFilter).getTime()) {
        return false;
      }
      if (maxDateFilter && eventDate > new Date(maxDateFilter).getTime()) {
        return false;
      }
    } else {
      console.warn('Invalid or missing date for event:', event);
      return false; // Skip events with invalid or missing dates
    }

    return true;
  });

  console.log('Filtered Events:', filteredEvents); // Log the filtered events
  return filteredEvents;
};

export default filterEvents;
