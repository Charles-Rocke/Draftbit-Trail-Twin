import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as base64decode from '../custom-files/base64decode';
import * as supabase from '../custom-files/supabase';
import checkEventLimit from '../global-functions/checkEventLimit';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openCameraUtil from '../utils/openCamera';
import openImagePickerUtil from '../utils/openImagePicker';
import parseBoolean from '../utils/parseBoolean';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  DatePicker,
  Divider,
  Icon,
  MultiSelectPicker,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';

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
  const [descriptionInputV1, setDescriptionInputV1] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');
  const [eventNameInputV1, setEventNameInputV1] = React.useState('');
  const [eventNameInputValue, setEventNameInputValue] = React.useState('');
  const [eventTypeInput, setEventTypeInput] = React.useState('');
  const [eventTypeInputV1, setEventTypeInputV1] = React.useState('');
  const [hostAgeInput, setHostAgeInput] = React.useState('');
  const [hostAgeInputV1, setHostAgeInputV1] = React.useState(0);
  const [hostNameInput, setHostNameInput] = React.useState('');
  const [hostNameInputV1, setHostNameInputV1] = React.useState('');
  const [imageName, setImageName] = React.useState('');
  const [imageNameDbUrl, setImageNameDbUrl] = React.useState('');
  const [invitesInputArrayV1, setInvitesInputArrayV1] = React.useState([]);
  const [invitesInputIntV1, setInvitesInputIntV1] = React.useState(0);
  const [invitesInputV1, setInvitesInputV1] = React.useState([]);
  const [invitesInputValue, setInvitesInputValue] = React.useState([]);
  const [isSafetySelfie, setIsSafetySelfie] = React.useState(false);
  const [multiSelectPicker2Value, setMultiSelectPicker2Value] = React.useState(
    []
  );
  const [multiSelectPickerValue, setMultiSelectPickerValue] = React.useState(
    []
  );
  const [multiSelectPickerValue2, setMultiSelectPickerValue2] = React.useState(
    []
  );
  const [numberInput2Value, setNumberInput2Value] = React.useState('');
  const [numberInputValue, setNumberInputValue] = React.useState('');
  const [numberInputValue2, setNumberInputValue2] = React.useState('');
  const [partySizeInput, setPartySizeInput] = React.useState('');
  const [partySizeInputV1, setPartySizeInputV1] = React.useState(0);
  const [pickerValue, setPickerValue] = React.useState('');
  const [pickerValue2, setPickerValue2] = React.useState('');
  const [pickerValue3, setPickerValue3] = React.useState('');
  const [rideNameInput, setRideNameInput] = React.useState('');
  const [safetySelfie, setSafetySelfie] = React.useState('');
  const [safteySelfiePath, setSafteySelfiePath] = React.useState('');
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
  const [trailNameInputV1, setTrailNameInputV1] = React.useState('');
  const convertDateToCustomFormat = isoString => {
    // console.log("Date String:", isoString);
    // const date = new Date(isoString);
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // console.log(`${year}-${month}-${day}`);
    // return `${year}-${month}-${day}`;

    console.log('Date String:', isoString);

    const date = new Date(isoString);

    // Get the timezone offset in minutes and convert it to milliseconds
    const timezoneOffset = date.getTimezoneOffset() * 60000;

    // Adjust the date to the local timezone
    const localDate = new Date(date.getTime() - timezoneOffset);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');

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

  const checkBase64Data = base64Data => {
    // Ensure base64 data is provided
    if (!base64Data) {
      console.error('No base64 data provided');
      return { error: 'No base64 data provided' };
    }
    return { success: true };
  };

  const extractBase64Components = base64Data => {
    // Extract the base64 string and mime type
    const [prefix, base64String] = base64Data.split(',');
    const mimeType = prefix.match(/:(.*?);/)[1];
    console.log('MIME TYPE: ', mimeType);
    return { base64String, mimeType };
  };

  const generateImageName = () => {
    // Generate a unique image name
    const imgName = `${Math.random()
      .toString(36)
      .substring(2)}-${Date.now()}.jpg`;
    return imgName;
  };

  const decodeBase64ToArrayBuffer = base64String => {
    console.log(
      'TYPE OF base64decode.decode(base64String): ',
      typeof base64decode.decode(base64String)
    );
    return base64decode.decode(base64String);
  };

  const checkArrayBuffer = arrayBuffer => {
    // Ensure the arrayBuffer has data
    if (arrayBuffer.byteLength === 0) {
      console.error(
        'The arrayBuffer size is 0 bytes. The conversion may have failed.'
      );
      return 'File conversion failed, arrayBuffer size is 0 bytes.';
    }
    return { success: true };
  };

  const uploadToSupabase = async (imageName, arrayBuffer, mimeType) => {
    // Upload the arrayBuffer to Supabase
    const { data: uploadData, error: uploadError } =
      await supabase.default.storage
        .from('safety_selfies')
        .upload(imageName, arrayBuffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: mimeType,
        });

    if (uploadError) {
      console.error('Upload failed:', uploadError);
      return `Upload failed: ${uploadError.message}`;
    }
    console.log('Upload successful!', uploadData.path);
    return { uploadData };
  };

  const convertUserImagePathToLink = (imagePath, supabaseUrl) => {
    const userImageDbLink = `${supabaseUrl}/storage/v1/object/public/safety_selfies/${imagePath}`;
    return userImageDbLink;
  };

  const convertImageNameToDbPath = imageName => {
    const fullImagePath = convertUserImagePathToLink(
      imageName,
      supabase.default.supabaseUrl
    );

    // Return the full image path
    return fullImagePath;
  };

  const uploadSelfieToBucket = async (base64Data, genImageName) => {
    try {
      // Check base64 data
      const base64Check = checkBase64Data(base64Data);
      if (base64Check.error) return base64Check.error;

      // Extract base64 components
      const { base64String, mimeType } = extractBase64Components(base64Data);

      // Generate image name and path
      const generatedImageName = genImageName; // generateImageName(); // Set to global variable
      // const imagePath = `safety_selfies/${imageName}`;
      console.log('IMAGE NAME: ', generatedImageName);
      // Decode base64 string to ArrayBuffer
      const arrayBuffer = decodeBase64ToArrayBuffer(base64String);

      // Check ArrayBuffer
      const arrayBufferCheck = checkArrayBuffer(arrayBuffer);
      if (arrayBufferCheck.error) return arrayBufferCheck.error;

      // Upload to Supabase
      const uploadResult = await uploadToSupabase(
        generatedImageName,
        arrayBuffer,
        mimeType
      );
      if (uploadResult.error) return uploadResult.error;

      // const fullImagePath = `${supabase.supabaseUrl}/storage/v1/object/public/${uploadResult.uploadData.path}`;
      // Variables.safteySelfiePath = fullImagePath;
      // return { imagePath: fullImagePath };
      // const fullImagePath = convertUserImagePathToLink(uploadResult.uploadData.path, supabase.default.supabaseUrl);
      // console.log("FULL IMAGE PATH FOR DB/upload.data.path: ", fullImagePath, uploadResult.uploadData.path);

      // // Return the full image path
      // return { imagePath: fullImagePath };
      return 'Upload to bucket success';
    } catch (error) {
      console.error('Error uploading file:', error);
      return `Error uploading file: ${error.message}`;
    }
  };
  const supabaseEventsCreateEventPOST = SupabaseEventsApi.useCreateEventPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setSafetySelfie(null);
      setIsSafetySelfie(parseBoolean(false));
      console.log(isSafetySelfie);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasBottomSafeArea={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: '"rgb(253, 253, 245)"' },
        dimensions.width
      )}
    >
      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        keyboardShouldPersistTaps={'never'}
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
              {
                gap: 24,
                justifyContent: 'space-between',
                marginBottom: 64,
                marginTop: 64,
                paddingLeft: 32,
                paddingRight: 32,
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_400Regular',
                  fontSize: 18,
                  opacity: 0.8,
                },
                dimensions.width
              )}
            >
              {'Create a Ride'}
            </Text>
            <Divider
              color={theme.colors.border.brand}
              {...GlobalStyles.DividerStyles(theme)['Divider'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.DividerStyles(theme)['Divider'].style,
                  { marginBottom: 12, marginTop: 12 }
                ),
                dimensions.width
              )}
            />
            {/* Host Name */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_300Light',
                    fontSize: 14,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Your Name'}
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
                maxLength={25}
                placeholder={'Enter your name'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.text.light,
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 48,
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
            {/* Host Age */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_300Light',
                    fontSize: 14,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Your Age'}
              </Text>
              {/* hostAgeInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newHostAgeInputValue => {
                  try {
                    setHostAgeInputV1(newHostAgeInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                maxLength={2}
                placeholder={'Enter your age'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.text.light,
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 48,
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={hostAgeInputV1}
              />
            </View>
            {/* Ride Name */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_300Light',
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Ride Name'}
              </Text>
              {/* rideNameInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newRideNameInputValue => {
                  try {
                    setRideNameInput(newRideNameInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                maxLength={25}
                placeholder={'Enter a name for the ride'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.text.light,
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 48,
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={rideNameInput}
              />
            </View>
            {/* Trail Names */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_300Light',
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Trail Names'}
              </Text>
              {/* trailNameInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTrailNameInputValue => {
                  try {
                    setTrailNameInputV1(newTrailNameInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                maxLength={50}
                placeholder={'Enter the name of the trails you plan to ride'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.text.light,
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 48,
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={trailNameInputV1}
              />
            </View>
            {/* Trail Address */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_300Light',
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Address'}
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
                maxLength={75}
                placeholder={'Enter address to parking'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.text.light,
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 48,
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
            {/* Ride Description */}
            <View>
              {/* title */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_300Light',
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Ride Description\n'}
              </Text>
              {/* descriptionInput */}
              <TextInput
                autoCorrect={true}
                changeTextDelay={500}
                multiline={true}
                numberOfLines={4}
                onChangeText={newDescriptionInputValue => {
                  try {
                    setDescriptionInputV1(newDescriptionInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                textAlignVertical={'top'}
                webShowOutline={true}
                maxLength={300}
                placeholder={'Describe the plan of the ride'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.text.light,
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 96,
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
                value={descriptionInputV1}
              />
            </View>
            {/* Date */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_300Light',
                    fontSize: 14,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Date'}
              </Text>
              {/* dateInput 2 */}
              <TextInput
                autoCorrect={true}
                changeTextDelay={500}
                multiline={true}
                onChangeText={newDateInput2Value => {
                  try {
                    setDateInputV1(newDateInput2Value);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                textAlignVertical={'top'}
                webShowOutline={true}
                maxLength={8}
                numberOfLines={1}
                placeholder={'mm/dd/yy'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.text.light,
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 48,
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
                value={dateInputV1}
              />
            </View>
            {/* Start Time */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_300Light',
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Start time'}
              </Text>
              {/* startTimeInput 2 */}
              <TextInput
                autoCorrect={true}
                changeTextDelay={500}
                multiline={true}
                onChangeText={newStartTimeInput2Value => {
                  try {
                    setStartTimeInputV1(newStartTimeInput2Value);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                textAlignVertical={'top'}
                webShowOutline={true}
                maxLength={7}
                numberOfLines={1}
                placeholder={'HH:MMam/pm'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.text.light,
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 48,
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
                value={startTimeInputV1}
              />
            </View>
            {/* Tags View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  flex: 1,
                  justifyContent: 'space-evenly',
                  zIndex: 2,
                },
                dimensions.width
              )}
            >
              {/* Event Tags */}
              <View
                style={StyleSheet.applyWidth(
                  { position: 'relative' },
                  dimensions.width
                )}
              >
                {/* Label */}
                <Text
                  accessible={true}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_300Light',
                      opacity: 0.85,
                    },
                    dimensions.width
                  )}
                >
                  {'Tags (Optional)'}
                </Text>
                <MultiSelectPicker
                  autoDismissKeyboard={true}
                  dropDownBackgroundColor={theme.colors.background.brand}
                  dropDownBorderColor={theme.colors.border.brand}
                  dropDownBorderRadius={8}
                  dropDownBorderWidth={1}
                  dropDownTextColor={theme.colors.text.strong}
                  iconSize={24}
                  leftIconMode={'inset'}
                  onValueChange={newMultiSelectPickerValue => {
                    const pickerValue = newMultiSelectPickerValue;
                    try {
                      setMultiSelectPickerValue2(newMultiSelectPickerValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  placeholder={'Select an option'}
                  selectedIconColor={theme.colors.text.strong}
                  selectedIconName={'Feather/check'}
                  selectedIconSize={20}
                  type={'solid'}
                  options={[
                    { label: 'Dig party', value: 'Dig party' },
                    { label: 'Group ride', value: 'Group ride' },
                    { label: 'Race', value: 'Race' },
                    { label: 'Jump session', value: 'Jump session' },
                    { label: 'Dirt Jumping', value: 'Dirt Jumping' },
                    { label: 'Enduro', value: 'Enduro' },
                    { label: 'Freeride', value: 'Freeride' },
                    { label: 'Beginner ', value: 'Beginner' },
                    { label: 'Intermediate', value: 'Intermediate' },
                    { label: 'Advanced', value: 'Advanced' },
                  ]}
                  rightIconName={'AntDesign/down'}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.Brand.Surface,
                      color: palettes.Brand['Secondary Text'],
                      fontFamily: 'Inter_300Light',
                      position: 'relative',
                    },
                    dimensions.width
                  )}
                  value={multiSelectPickerValue2}
                />
              </View>
            </View>
            {/* Personal Photo */}
            <View>
              <Text
                accessible={true}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_300Light',
                  },
                  dimensions.width
                )}
              >
                {'Profile Photo'}
              </Text>

              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const safetySelfie = await openImagePickerUtil({
                        mediaTypes: 'Images',
                        allowsEditing: false,
                        quality: 0.5,
                        allowsMultipleSelection: false,
                        permissionErrorMessage:
                          'Sorry, we need media library permissions to make this work.',
                        showAlertOnPermissionError: true,
                      });

                      if (safetySelfie) {
                        console.log('Image was captured'.toString());
                        setIsSafetySelfie(true);
                        console.log('isSafetySelfie is set to True');
                        setSafetySelfie(safetySelfie);
                      } else {
                        console.log('Upload Cancelled');
                      }

                      console.log('End of upload action workflow');
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={StyleSheet.applyWidth(
                  { marginTop: 10 },
                  dimensions.width
                )}
              >
                {/* Uploaded Selfie */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      backgroundColor: palettes.App['Custom Color'],
                      borderBottomWidth: 1,
                      borderColor: theme.colors.text.light,
                      borderLeftWidth: 1,
                      borderRadius: 12,
                      borderRightWidth: 1,
                      borderStyle: 'dashed',
                      borderTopWidth: 1,
                      height: 140,
                      justifyContent: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {/* hostProfilePhoto */}
                  <>
                    {!safetySelfie ? null : (
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={{ uri: `${safetySelfie}` }}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                  <>
                    {isSafetySelfie ? null : (
                      <Text
                        accessible={true}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            {
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_300Light',
                              marginBottom: 8,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Upload a profile photo'}
                      </Text>
                    )}
                  </>
                  <>
                    {isSafetySelfie ? null : (
                      <Icon
                        color={palettes.App['Custom Color_38']}
                        name={'AntDesign/camerao'}
                        size={35}
                      />
                    )}
                  </>
                </View>
              </Touchable>
            </View>
            {/* Confirm Button View */}
            <View
              style={StyleSheet.applyWidth(
                { marginTop: 24, zIndex: 1 },
                dimensions.width
              )}
            >
              {/* Create Event Button */}
              <Button
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      const maxedDailyEvents = await (async () => {
                        if (hostNameInputV1) {
                          return await checkEventLimit();
                        }
                      })();
                      if (maxedDailyEvents) {
                        showAlertUtil({
                          title: 'Failed',
                          message: 'Maximun Rides Created Today',
                          buttonText: 'Ok',
                        });
                      } else {
                        const generatedimageName = generateImageName();
                        const convertedImageDbUrl =
                          convertImageNameToDbPath(generatedimageName);
                        const res = (
                          await supabaseEventsCreateEventPOST.mutateAsync({
                            addressInputV1: addressInputV1,
                            dateInputV1: dateInputV1,
                            descriptionInputV1: descriptionInputV1,
                            hostAgeInputV1: hostAgeInputV1,
                            hostNameInputV1: hostNameInputV1,
                            imageDbUrl: convertedImageDbUrl,
                            invitesInputV1: invitesInputIntV1,
                            partySizeInputV1: partySizeInputV1,
                            rideNameInput: rideNameInput,
                            startTimeInputV1: startTimeInputV1,
                            tagsInputV1: multiSelectPickerValue2,
                            trailNameInputV1: trailNameInputV1,
                          })
                        )?.json;
                        console.log(res);
                        await uploadSelfieToBucket(
                          safetySelfie,
                          generatedimageName
                        );
                        navigation.navigate('BottomTabNavigator', {
                          screen: 'ExploreEventsScreen',
                        });

                        showAlertUtil({
                          title: 'Success',
                          message: 'You successfully created a ride!',
                          buttonText: 'Ok',
                        });
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color_38'],
                    borderRadius: 12,
                    color: palettes.App['Custom Color'],
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    height: 52,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Confirm '}
              />
            </View>
          </View>
        </SimpleStyleScrollView>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(CreateEventScreen);
