import React from 'react';
import * as supabase from '../custom-files/supabase';

// Return false if there is already 3 events created in one day under a hosts name.
const checkEventLimit = async () => {
  const checkEventLimit = async hostName => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    let { count, error } = await supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('host_name', hostName)
      .gte('created_at', startOfDay)
      .lte('created_at', endOfDay);

    if (error) {
      console.error('Error checking events count:', error);
      return false; // Return false if there's an error
    }

    return count < 3;
  };
};

export default checkEventLimit;
