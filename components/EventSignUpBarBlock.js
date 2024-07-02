import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Button, TextInput, withTheme } from '@draftbit/ui';
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
          paddingLeft: 30,
          paddingRight: 30,
          position: 'relative',
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-evenly',
            marginBottom: 14,
            marginTop: 18,
          },
          dimensions.width
        )}
      >
        {/* Text Input 2 */}
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={true}
          changeTextDelay={500}
          onChangeText={newTextInput2Value => {
            const textInputValue = newTextInput2Value;
            try {
              setTextInput2Value(newTextInput2Value);
            } catch (err) {
              console.error(err);
            }
          }}
          webShowOutline={true}
          {...GlobalStyles.TextInputStyles(theme)['Age Input'].props}
          placeholder={'Enter Name'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextInputStyles(theme)['Age Input'].style,
              { width: 100 }
            ),
            dimensions.width
          )}
          value={textInput2Value}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={true}
          changeTextDelay={500}
          onChangeText={newTextInputValue => {
            const textInputValue = newTextInputValue;
            try {
              setTextInputValue(newTextInputValue);
            } catch (err) {
              console.error(err);
            }
          }}
          webShowOutline={true}
          {...GlobalStyles.TextInputStyles(theme)['Name Input'].props}
          placeholder={'Enter Age'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextInputStyles(theme)['Name Input'].style,
              { width: 100 }
            ),
            dimensions.width
          )}
          value={textInputValue}
        />
        {/* Button 2 */}
        <Button
          iconPosition={'left'}
          {...GlobalStyles.ButtonStyles(theme)['Upload Photo'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['Upload Photo'].style,
              { fontSize: 12, width: 150 }
            ),
            dimensions.width
          )}
          title={'Upload Profile Photo\n'}
        />
      </View>
      <Button
        iconPosition={'left'}
        {...GlobalStyles.ButtonStyles(theme)['Sign Up'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ButtonStyles(theme)['Sign Up'].style,
            { marginBottom: 18 }
          ),
          dimensions.width
        )}
        title={'Sign Up\n'}
      />
    </View>
  );
};

export default withTheme(EventSignUpBarBlock);
