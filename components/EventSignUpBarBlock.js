import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, withTheme } from '@draftbit/ui';
import { View } from 'react-native';

const EventSignUpBarBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [textInput2Value, setTextInput2Value] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: theme.colors['Custom #ffffff'],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          bottom: 0,
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'absolute',
          width: '100%',
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            marginBottom: 16,
            marginTop: 16,
            paddingLeft: 32,
            paddingRight: 32,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <Button
          iconPosition={'left'}
          {...GlobalStyles.ButtonStyles(theme)['Sign Up'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['Sign Up'].style,
              {
                backgroundColor: 'rgb(45, 82, 0)',
                fontFamily: 'Inter_300Light',
                fontSize: 18,
                width: '100%',
              }
            ),
            dimensions.width
          )}
          title={'Join Ride\n'}
        />
      </View>
    </View>
  );
};

export default withTheme(EventSignUpBarBlock);
