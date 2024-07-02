import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { DatePicker, withTheme } from '@draftbit/ui';

const PickerBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [pickerValue, setPickerValue] = React.useState('');

  return (
    <DatePicker
      autoDismissKeyboard={true}
      disabled={false}
      hideLabel={false}
      leftIconMode={'inset'}
      mode={'date'}
      onDateChange={newDatePickerValue => {
        try {
          setPickerValue(newDatePickerValue);
        } catch (err) {
          console.error(err);
        }
      }}
      date={pickerValue}
      format={'mm-dd-yyyy'}
      label={'Select desired ride date'}
      rightIconName={'AntDesign/calendar'}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: theme.colors['Custom Color'],
          borderColor: theme.colors['Light'],
          borderRadius: 12,
          marginTop: 8,
          paddingLeft: 5,
          paddingRight: 5,
        },
        dimensions.width
      )}
      type={'solid'}
    />
  );
};

export default withTheme(PickerBlock);
