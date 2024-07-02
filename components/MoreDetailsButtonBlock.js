import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';

const MoreDetailsButtonBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <Button
      iconPosition={'left'}
      onPress={() => {
        console.log('More Details Button ON_PRESS Start');
        let error = null;
        try {
          console.log('Start ON_PRESS:0 NAVIGATE');
          navigation.navigate('EventDetailsScreen', {
            event_id: props.event_id ?? '',
          });
          console.log('Complete ON_PRESS:0 NAVIGATE');
          console.log('Start ON_PRESS:1 CONSOLE_LOG');
          console.log(props.event_id ?? '');
          console.log('Complete ON_PRESS:1 CONSOLE_LOG');
        } catch (err) {
          console.error(err);
          error = err.message ?? err;
        }
        console.log(
          'More Details Button ON_PRESS Complete',
          error ? { error } : 'no error'
        );
      }}
      {...GlobalStyles.ButtonStyles(theme)['Button'].props}
      style={StyleSheet.applyWidth(
        StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'].style, {
          backgroundColor: 'rgb(45, 82, 0)',
        }),
        dimensions.width
      )}
      title={'More Details'}
    />
  );
};

export default withTheme(MoreDetailsButtonBlock);
