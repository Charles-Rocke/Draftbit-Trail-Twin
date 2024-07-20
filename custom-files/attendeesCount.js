import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as supabase from '../custom-files/supabase';

const getAttendeesCount = async eventId => {
  let { data, error, count } = await supabase
    .from('attendees')
    .select('id', { count: 'exact' })
    .eq('event', eventId);

  if (error) {
    console.error('Error getting attendees count:', error);
    return 0; // Return 0 if there's an error
  }

  if (count == 0) {
    return 1;
  } else {
    return count;
  }
};

const AttendeesCountComponent = ({ eventId }) => {
  const [attendeesCount, setAttendeesCount] = useState(0);

  useEffect(() => {
    const fetchAttendeesCount = async () => {
      const count = await getAttendeesCount(eventId);
      setAttendeesCount(count);
    };

    fetchAttendeesCount();
  }, [eventId]);

  return (
    <Text
      style={styles.attendeesCountText}
    >{`${attendeesCount} Riders Attending`}</Text>
  );
};

const styles = StyleSheet.create({
  attendeesCountText: {
    fontFamily: 'Inter',
    fontWeight: '300', // Light
    fontSize: 12, // React Native uses px by default, adjust if necessary
    lineHeight: 24, // Adjust if necessary
    color: '#454e58',
  },
});

export default AttendeesCountComponent;
