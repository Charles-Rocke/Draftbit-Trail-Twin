import React from 'react';
import * as supabase from '../custom-files/supabase';

// Checks if the users name already exists in the event given the id. Returns true if it exists.
const checkIfHasAlreadyJoined = async (attendeeName, eventId) => {
  const checkIfAlreadyJoined = async (attendeeName, eventId) => {
    let { data, error } = await supabase
      .from('attendees')
      .select('id')
      .eq('attendee_name', attendeeName)
      .eq('event', eventId);

    if (error) {
      console.error('Error checking attendee:', error);
      return false; // Return false if there's an error
    }

    return data.length > 0;
  };
};

export default checkIfHasAlreadyJoined;
