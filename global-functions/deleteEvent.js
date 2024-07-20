import React from 'react';
import * as supabase from '../custom-files/supabase';

// Deletes an event.
const deleteEvent = async eventId => {
  const deleteEvent = async eventId => {
    const { error } = await supabase.from('events').delete().eq('id', eventId);
    if (error) {
      console.error('Error deleting event:', error);
    } else {
      console.log('Event deleted successfully');
    }
  };
};

export default deleteEvent;
