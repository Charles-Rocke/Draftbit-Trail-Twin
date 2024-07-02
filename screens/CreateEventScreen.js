import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  DatePicker,
  MultiSelectPicker,
  Picker,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';

const CreateEventScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [addressInput, setAddressInput] = React.useState('');
  const [addressInputV1, setAddressInputV1] = React.useState('');
  const [dateInput, setDateInput] = React.useState(new Date());
  const [dateInputV1, setDateInputV1] = React.useState(new Date());
  const [dateInputValue, setDateInputValue] = React.useState('');
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [emailInput, setEmailInput] = React.useState('');
  const [eventNameInputV1, setEventNameInputV1] = React.useState('');
  const [eventNameInputValue, setEventNameInputValue] = React.useState('');
  const [eventTypeInput, setEventTypeInput] = React.useState('');
  const [eventTypeInputV1, setEventTypeInputV1] = React.useState('');
  const [hostNameInput, setHostNameInput] = React.useState('');
  const [hostNameInputV1, setHostNameInputV1] = React.useState('');
  const [invitesInputArrayV1, setInvitesInputArrayV1] = React.useState([]);
  const [invitesInputIntV1, setInvitesInputIntV1] = React.useState(0);
  const [invitesInputV1, setInvitesInputV1] = React.useState([]);
  const [invitesInputValue, setInvitesInputValue] = React.useState([]);
  const [multiSelectPicker2Value, setMultiSelectPicker2Value] = React.useState(
    []
  );
  const [multiSelectPickerValue, setMultiSelectPickerValue] = React.useState(
    []
  );
  const [numberInput2Value, setNumberInput2Value] = React.useState('');
  const [numberInputValue, setNumberInputValue] = React.useState('');
  const [numberInputValue2, setNumberInputValue2] = React.useState('');
  const [partySizeInput, setPartySizeInput] = React.useState('');
  const [partySizeInputV1, setPartySizeInputV1] = React.useState(0);
  const [pickerValue, setPickerValue] = React.useState('');
  const [pickerValue2, setPickerValue2] = React.useState('');
  const [startTimeInput, setStartTimeInput] = React.useState(new Date());
  const [startTimeInputV1, setStartTimeInputV1] = React.useState(new Date());
  const [startTimeInputValue, setStartTimeInputValue] = React.useState('');
  const [startTimeInputValue2, setStartTimeInputValue2] = React.useState('');
  const [stepperValue, setStepperValue] = React.useState('');
  const [stepperValue2, setStepperValue2] = React.useState('');
  const [tagsInputV1, setTagsInputV1] = React.useState([]);
  const [tagsInputValue, setTagsInputValue] = React.useState([]);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [trailNameInput, setTrailNameInput] = React.useState('');
  const convertDateToCustomFormat = isoString => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  const convertTimeToCustomFormat = isoString => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    // We set seconds to "00" as per the requirement
    const seconds = '00';
    return `${hours}:${minutes}:${seconds}`;
  };
  const supabaseEventsCreateEventPOST = SupabaseEventsApi.useCreateEventPOST();

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Divider'] },
        dimensions.width
      )}
    >
      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
      >
        <SimpleStyleScrollView
          bounces={true}
          horizontal={false}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
        >
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, paddingBottom: 25 },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.strong,
                  fontFamily: 'Inter_500Medium',
                  fontSize: 25,
                  marginLeft: 30,
                  marginTop: 15,
                  opacity: 0.8,
                },
                dimensions.width
              )}
            >
              {'Create your event\nShare with the world'}
            </Text>
            {/* sub title */}
            <Text
              accessible={true}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.strong,
                  fontFamily: 'Inter_400Regular',
                  fontSize: 15,
                  marginLeft: 30,
                  marginTop: 15,
                  opacity: 0.4,
                },
                dimensions.width
              )}
            >
              {'Fill in a few details'}
            </Text>
            {/* Full Name */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Medium'],
                    fontFamily: 'Inter_400Regular',
                    marginLeft: 30,
                    marginTop: 35,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Full name'}
              </Text>
              {/* hostNameInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newHostNameInputValue => {
                  try {
                    setHostNameInputV1(newHostNameInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                placeholder={'Enter your full name'}
                placeholderTextColor={theme.colors['Light']}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Light'],
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    fontFamily: 'Inter_400Regular',
                    height: 48,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={hostNameInputV1}
              />
            </View>
            {/* Trail Name */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Medium'],
                    fontFamily: 'Inter_400Regular',
                    marginLeft: 30,
                    marginTop: 25,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Trail Name'}
              </Text>
              {/* eventNameInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newEventNameInputValue => {
                  try {
                    setEventNameInputV1(newEventNameInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                placeholder={'Name of Trail'}
                placeholderTextColor={theme.colors['Light']}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Light'],
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    fontFamily: 'Inter_400Regular',
                    height: 48,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={eventNameInputV1}
              />
            </View>
            {/* Trail Address */}
            <View>
              {/* title */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Medium'],
                    fontFamily: 'Inter_400Regular',
                    marginLeft: 30,
                    marginTop: 25,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Trail address'}
              </Text>
              {/* addressInput */}
              <TextInput
                autoCorrect={true}
                changeTextDelay={500}
                multiline={true}
                numberOfLines={4}
                onChangeText={newAddressInputValue => {
                  try {
                    setAddressInputV1(newAddressInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                textAlignVertical={'top'}
                webShowOutline={true}
                placeholder={'Enter full Trail address'}
                placeholderTextColor={theme.colors['Light']}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors['Light'],
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    fontFamily: 'Inter_400Regular',
                    height: 100,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
                value={addressInputV1}
              />
            </View>
            {/* Date */}
            <View
              style={StyleSheet.applyWidth(
                { marginLeft: 30, marginRight: 30 },
                dimensions.width
              )}
            >
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Medium'],
                    fontFamily: 'Inter_400Regular',
                    marginTop: 25,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Date'}
              </Text>
              {/* dateInput */}
              <DatePicker
                autoDismissKeyboard={true}
                disabled={false}
                hideLabel={false}
                leftIconMode={'inset'}
                mode={'date'}
                onDateChange={newDateInputValue => {
                  console.log('dateInput ON_DATE_CHANGE Start');
                  let error = null;
                  try {
                    console.log('Start ON_DATE_CHANGE:0 SET_VARIABLE');
                    const valueQQqj8kUx =
                      convertDateToCustomFormat(newDateInputValue);
                    setDateInputV1(valueQQqj8kUx);
                    const formattedDateInputV1 = valueQQqj8kUx;
                    console.log('Complete ON_DATE_CHANGE:0 SET_VARIABLE');
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'dateInput ON_DATE_CHANGE Complete',
                    error ? { error } : 'no error'
                  );
                }}
                date={dateInputV1}
                format={'yyyy-mm-dd'}
                label={'Select desired date'}
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
            </View>
            {/* Start Time */}
            <View
              style={StyleSheet.applyWidth(
                { marginLeft: 30, marginRight: 30 },
                dimensions.width
              )}
            >
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Medium'],
                    fontFamily: 'Inter_400Regular',
                    marginTop: 25,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Start time'}
              </Text>
              {/* startTimeInput */}
              <DatePicker
                autoDismissKeyboard={true}
                disabled={false}
                hideLabel={false}
                leftIconMode={'inset'}
                onDateChange={newStartTimeInputValue => {
                  try {
                    setStartTimeInputV1(newStartTimeInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                date={startTimeInputV1}
                format={'HH:MM:00'}
                label={'Select desired start time'}
                mode={'time'}
                rightIconName={'AntDesign/clockcircleo'}
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
            </View>
            {/* Party Size */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Medium'],
                    fontFamily: 'Inter_400Regular',
                    marginLeft: 30,
                    marginTop: 25,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Party Size'}
              </Text>
              {/* partySizeInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newPartySizeInputValue => {
                  try {
                    setPartySizeInputV1(newPartySizeInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                placeholder={'Enter your desired party size'}
                placeholderTextColor={theme.colors['Light']}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      backgroundColor: theme.colors['Custom Color'],
                      borderColor: theme.colors['Light'],
                      borderRadius: 12,
                      fontFamily: 'Inter_400Regular',
                      height: 48,
                      marginLeft: 30,
                      marginRight: 30,
                      marginTop: 8,
                      paddingLeft: 20,
                    }
                  ),
                  dimensions.width
                )}
                value={partySizeInputV1}
              />
            </View>
            {/* Invite Friend */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Medium'],
                    fontFamily: 'Inter_400Regular',
                    marginLeft: 30,
                    marginTop: 25,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Invite a Friend'}
              </Text>
              {/* invitesInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newInvitesInputValue => {
                  try {
                    setInvitesInputIntV1(newInvitesInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                placeholder={'Enter 1 friends phone number'}
                placeholderTextColor={theme.colors['Light']}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      backgroundColor: theme.colors['Custom Color'],
                      borderColor: theme.colors['Light'],
                      borderRadius: 12,
                      fontFamily: 'Inter_400Regular',
                      height: 48,
                      marginLeft: 30,
                      marginRight: 30,
                      marginTop: 8,
                      paddingLeft: 20,
                    }
                  ),
                  dimensions.width
                )}
                value={invitesInputIntV1}
              />
            </View>
            {/* Event Tags */}
            <View
              style={StyleSheet.applyWidth(
                { marginLeft: 30, marginRight: 30, position: 'relative' },
                dimensions.width
              )}
            >
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Medium'],
                    fontFamily: 'Inter_400Regular',
                    marginTop: 25,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Tags (Optional)'}
              </Text>
              {/* tagsInput */}
              <MultiSelectPicker
                dropDownBackgroundColor={theme.colors.background}
                dropDownBorderColor={theme.colors.divider}
                dropDownBorderRadius={8}
                dropDownBorderWidth={1}
                dropDownTextColor={theme.colors.strong}
                iconSize={24}
                leftIconMode={'inset'}
                onValueChange={newTagsInputValue => {
                  try {
                    setTagsInputV1(newTagsInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                selectedIconColor={theme.colors.strong}
                selectedIconName={'Feather/check'}
                selectedIconSize={20}
                type={'solid'}
                autoDismissKeyboard={true}
                options={[
                  { label: '🟤 dig party', value: 'dig party' },
                  { label: '🔵 group ride', value: 'group ride' },
                  { label: '🟣 race', value: 'race' },
                  { label: '⚫ jump session', value: 'jump session' },
                  { label: '🟠 enduro', value: 'enduro' },
                  { label: '🟢 Beginner Friendly', value: 'Beginner Friendly' },
                  { label: '🟡 Technical', value: 'Technical' },
                ]}
                placeholder={'Select tags'}
                rightIconName={'AntDesign/down'}
                style={StyleSheet.applyWidth(
                  {
                    borderColor: theme.colors['Light'],
                    borderRadius: 12,
                    height: '100%',
                    marginTop: 8,
                    paddingLeft: 5,
                    paddingRight: 5,
                  },
                  dimensions.width
                )}
                value={tagsInputV1}
              />
            </View>
          </View>
          {/* Confirm */}
          <View
            style={StyleSheet.applyWidth(
              {
                flex: 2,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                marginTop: 45,
                position: 'relative',
              },
              dimensions.width
            )}
          >
            {/* Create Event Button */}
            <Button
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  console.log('Create Event Button ON_PRESS Start');
                  let error = null;
                  try {
                    console.log('Start ON_PRESS:0 FETCH_REQUEST');
                    (
                      await supabaseEventsCreateEventPOST.mutateAsync({
                        addressInputV1: addressInputV1,
                        dateInputV1: convertDateToCustomFormat(dateInputV1),
                        eventNameInputV1: eventNameInputV1,
                        eventTypeInputV1: eventTypeInputV1,
                        hostNameInputV1: hostNameInputV1,
                        invitesInputV1: invitesInputIntV1,
                        partySizeInputV1: partySizeInputV1,
                        startTimeInputV1:
                          convertTimeToCustomFormat(startTimeInputV1),
                        tagsInputV1: tagsInputV1,
                      })
                    )?.json;
                    console.log('Complete ON_PRESS:0 FETCH_REQUEST');
                    console.log('Start ON_PRESS:1 CONSOLE_LOG');
                    console.log(
                      hostNameInputV1,
                      invitesInputArrayV1,
                      convertDateToCustomFormat(dateInputV1),
                      tagsInputV1,
                      convertTimeToCustomFormat(startTimeInputV1)
                    );
                    console.log('Complete ON_PRESS:1 CONSOLE_LOG');
                    console.log('Start ON_PRESS:2 NAVIGATE');
                    navigation.navigate('BottomTabNavigator', {
                      screen: 'ExploreEventsScreen',
                    });
                    console.log('Complete ON_PRESS:2 NAVIGATE');
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'Create Event Button ON_PRESS Complete',
                    error ? { error } : 'no error'
                  );
                };
                handler();
              }}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors['Primary'],
                  borderRadius: 12,
                  color: theme.colors['Custom Color'],
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  height: 52,
                  marginBottom: 30,
                  marginLeft: 30,
                  marginRight: 30,
                  textAlign: 'center',
                },
                dimensions.width
              )}
              title={'Confirm '}
            />
          </View>
        </SimpleStyleScrollView>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(CreateEventScreen);
