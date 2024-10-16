import React from 'react';
import {
  Button,
  Icon,
  LoadingIndicator,
  MultiSelectPicker,
  Picker,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  Slider,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseUsersApi from '../apis/SupabaseUsersApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as base64decode from '../custom-files/base64decode';
import * as supabase from '../custom-files/supabase';
import convertImageNameToDbPath from '../global-functions/convertImageNameToDbPath';
import formatAmPm from '../global-functions/formatAmPm';
import generateImageName from '../global-functions/generateImageName';
import uploadImageToBucket from '../global-functions/uploadImageToBucket';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openImagePickerUtil from '../utils/openImagePicker';
import parseBoolean from '../utils/parseBoolean';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const SetupAndEditProfileScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [ampm, setAmpm] = React.useState('AM');
  const [attendeeAgeInputV1, setAttendeeAgeInputV1] = React.useState(0);
  const [attendeeSafetySelfie, setAttendeeSafetySelfie] = React.useState('');
  const [displayPhotoUpload, setDisplayPhotoUpload] = React.useState('');
  const [isAttendeeSafetySelfie, setIsAttendeeSafetySelfie] =
    React.useState(false);
  const [isProfilePhotoUpload, setIsProfilePhotoUpload] = React.useState(false);
  const [joinAttendeeNameInputV1, setJoinAttendeeNameInputV1] =
    React.useState('');
  const [multiSelectPickerValue, setMultiSelectPickerValue] = React.useState(
    []
  );
  const [profilePhotoUpload, setProfilePhotoUpload] = React.useState('');
  const [ridingStyleInput, setRidingStyleInput] = React.useState([]);
  const [safetySelfie, setSafetySelfie] = React.useState('');
  const [skillLevelInput, setSkillLevelInput] = React.useState([]);
  const [startTimeInput, setStartTimeInput] = React.useState(11);
  const [userAgeInput, setUserAgeInput] = React.useState(0);
  const [userBikeInput, setUserBikeInput] = React.useState('');
  const [userBioInput, setUserBioInput] = React.useState('');
  const [userLocationInput, setUserLocationInput] = React.useState('');
  const [userLookingForInput, setUserLookingForInput] = React.useState('');
  const [userNameInput, setUserNameInput] = React.useState('');
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
    console.log('In correct check for base64');
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

  const uploadPhotoToBucket = async (base64Data, genImageName) => {
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

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64); // Decode Base64 string
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const extractBase64Info = dataUrl => {
    const mimeType = dataUrl.match(
      /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
    )[1];
    const base64Data = dataUrl.split(',')[1]; // Split to get Base64 data
    return { mimeType, base64Data };
  };

  const photoUpload = async (userId, profilePhotoFile) => {
    const formData = new FormData();

    // Append the profile photo as a file
    formData.append('profile_photo', profilePhotoFile);

    try {
      // Log the final URL to verify it's correct
      const url = `https://x8ki-letl-twmt.n7.xano.io/api:ZNE4kd-w/user_photos/${userId}`;
      console.log('Uploading to:', url);

      // Send the request to Xano API
      const response = await fetch(url, {
        method: 'POST', // Ensure the correct method is used
        body: formData,
        headers: {
          Authorization: 'Bearer your-authorization-token', // Ensure your token is correct
        },
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Profile photo uploaded successfully:', result);
        return result;
      } else {
        console.error('Failed to upload profile photo:', result);
      }
    } catch (error) {
      console.error('Error uploading profile photo:', error);
    }
  };
  const supabaseUsersUpdateUserDataPATCH =
    SupabaseUsersApi.useUpdateUserDataPATCH();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'loading',
        value: false,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasBottomSafeArea={false}
      hasSafeArea={false}
      hasTopSafeArea={false}
      scrollable={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes['Trail Twin']['Background - Trail Twin'] },
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
        style={StyleSheet.applyWidth({ marginTop: 64 }, dimensions.width)}
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
                gap: 32,
                justifyContent: 'space-between',
                marginBottom: 256,
                marginTop: 72,
                paddingLeft: 32,
                paddingRight: 32,
              },
              dimensions.width
            )}
          >
            {/* Name */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Full Name *'}
              </Text>
              {/* nameInput */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newNameInputValue => {
                  try {
                    setUserNameInput(newNameInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                maxLength={64}
                placeholder={'...'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor:
                      palettes['Trail Twin']['White - Trail Twin'],
                    borderBottomWidth: 1,
                    borderColor: palettes.Brand['Secondary Grey'],
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 48,
                    marginTop: 12,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={userNameInput}
              />
            </View>
            {/* Age */}
            <View>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 12,
                  },
                  dimensions.width
                )}
              >
                {/* Age */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                    },
                    dimensions.width
                  )}
                >
                  {'Age'}
                </Text>
                {/* Age */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                    },
                    dimensions.width
                  )}
                >
                  {userAgeInput}
                </Text>
              </View>
              <Slider
                onValueChange={newSliderValue => {
                  try {
                    setUserAgeInput(newSliderValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                maximumTrackTintColor={palettes.Brand['Secondary Grey']}
                maximumValue={80 ?? 60}
                minimumTrackTintColor={palettes.Brand['Secondary Grey']}
                minimumValue={0 ?? 1}
                thumbTintColor={
                  palettes['Trail Twin']['Secondary Green #2 - Trail Twin']
                }
                value={userAgeInput}
              />
            </View>
            {/* Profile Photo */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Profile Photo *'}
              </Text>

              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const profilePhotoUpload = await openImagePickerUtil({
                        mediaTypes: 'Images',
                        allowsEditing: false,
                        quality: 0.5,
                        allowsMultipleSelection: false,
                        permissionErrorMessage:
                          'Sorry, we need media library permissions to make this work.',
                        showAlertOnPermissionError: true,
                        outputBase64: true,
                      });

                      if (profilePhotoUpload) {
                        console.log('Image was captured'.toString());
                        setIsProfilePhotoUpload(true);
                        console.log('profile Photo upload is set to true');
                        setProfilePhotoUpload(profilePhotoUpload);
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
                      backgroundColor:
                        palettes['Trail Twin']['White - Trail Twin'],
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
                    {!isProfilePhotoUpload ? null : (
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(`${profilePhotoUpload}`)}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                  <>
                    {isProfilePhotoUpload ? null : (
                      <Text
                        accessible={true}
                        selectable={false}
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
                    {isProfilePhotoUpload ? null : (
                      <Icon name={'AntDesign/camerao'} size={35} />
                    )}
                  </>
                </View>
              </Touchable>
            </View>
            {/* Display Photo */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Display Photo *'}
              </Text>
              {/* Touchable 2 */}
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const displayPhotoUploadRes = await openImagePickerUtil({
                        mediaTypes: 'Images',
                        allowsEditing: false,
                        quality: 0.5,
                        allowsMultipleSelection: false,
                        permissionErrorMessage:
                          'Sorry, we need media library permissions to make this work.',
                        showAlertOnPermissionError: true,
                        outputBase64: true,
                      });
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
                      backgroundColor:
                        palettes['Trail Twin']['White - Trail Twin'],
                      borderBottomWidth: 1,
                      borderColor: palettes.Brand['Secondary Grey'],
                      borderLeftWidth: 1,
                      borderRadius: 12,
                      borderRightWidth: 1,
                      borderStyle: 'solid',
                      borderTopWidth: 1,
                      height: 140,
                      justifyContent: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {/* Photo Upload */}
                  <>
                    {!attendeeSafetySelfie ? null : (
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource('')}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                  <>
                    {isAttendeeSafetySelfie ? null : (
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            {
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_300Light',
                              fontSize: 14,
                              marginBottom: 8,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Tap to Upload Photo'}
                      </Text>
                    )}
                  </>
                  <>
                    {isAttendeeSafetySelfie ? null : (
                      <Icon name={'AntDesign/camerao'} size={35} />
                    )}
                  </>
                </View>
              </Touchable>
            </View>
            {/* Location */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Location *'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setUserLocationInput(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                placeholder={'...'}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      backgroundColor:
                        palettes['Trail Twin']['White - Trail Twin'],
                      borderColor: palettes.Brand['Secondary Grey'],
                      borderRadius: 12,
                      color: palettes.Brand['Secondary Text'],
                      fontFamily: 'Inter_300Light',
                      height: 48,
                      marginTop: 12,
                      paddingLeft: 20,
                    }
                  ),
                  dimensions.width
                )}
                value={userLocationInput}
              />
            </View>
            {/* Bike */}
            <View>
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Your Bike *'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setUserBikeInput(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                placeholder={'...'}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      backgroundColor:
                        palettes['Trail Twin']['White - Trail Twin'],
                      borderColor: palettes.Brand['Secondary Grey'],
                      borderRadius: 12,
                      color: palettes.Brand['Secondary Text'],
                      fontFamily: 'Inter_300Light',
                      height: 48,
                      marginTop: 12,
                      padding: 12,
                      paddingLeft: 20,
                    }
                  ),
                  dimensions.width
                )}
                value={userBikeInput}
              />
            </View>
            {/* Bio */}
            <View>
              {/* title */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Bio *\n'}
              </Text>
              {/* bioInput */}
              <TextInput
                autoCorrect={true}
                changeTextDelay={500}
                multiline={true}
                numberOfLines={4}
                onChangeText={newBioInputValue => {
                  try {
                    setUserBioInput(newBioInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                textAlignVertical={'top'}
                webShowOutline={true}
                maxLength={300}
                placeholder={'...'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor:
                      palettes['Trail Twin']['White - Trail Twin'],
                    borderBottomWidth: 1,
                    borderColor: palettes.Brand['Secondary Grey'],
                    borderLeftWidth: 1,
                    borderRadius: 12,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    height: 96,
                    marginTop: 12,
                    paddingBottom: 8,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
                value={userBioInput}
              />
            </View>
            {/* Skill Level */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  flex: 1,
                  justifyContent: 'space-evenly',
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
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      opacity: 0.85,
                    },
                    dimensions.width
                  )}
                >
                  {'Skill Level *'}
                </Text>
                <Picker
                  autoDismissKeyboard={true}
                  dropDownBorderColor={theme.colors.border.brand}
                  dropDownBorderRadius={8}
                  dropDownBorderWidth={1}
                  dropDownTextColor={theme.colors.text.strong}
                  iconSize={24}
                  leftIconMode={'inset'}
                  mode={'native'}
                  onValueChange={newPickerValue => {
                    try {
                      setSkillLevelInput(newPickerValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  placeholder={'Select an option'}
                  selectedIconColor={theme.colors.text.strong}
                  selectedIconName={'Feather/check'}
                  selectedIconSize={20}
                  type={'solid'}
                  dropDownBackgroundColor={
                    palettes['Trail Twin']['White - Trail Twin']
                  }
                  options={[
                    { label: 'Beginner', value: 'Beginner' },
                    { label: 'Intermediate', value: 'Intermediate' },
                    { label: 'Advanced', value: 'Advanced' },
                    { label: 'Pro', value: 'Pro' },
                  ]}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor:
                        palettes['Trail Twin']['White - Trail Twin'],
                      borderColor: palettes.Brand['Secondary Grey'],
                      marginTop: 12,
                    },
                    dimensions.width
                  )}
                  value={skillLevelInput}
                />
              </View>
            </View>
            {/* Riding Style */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  flex: 1,
                  justifyContent: 'space-evenly',
                  zIndex: -1,
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
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      opacity: 0.85,
                    },
                    dimensions.width
                  )}
                >
                  {'Riding Style *'}
                </Text>
                {/* styleinput */}
                <MultiSelectPicker
                  autoDismissKeyboard={true}
                  dropDownBorderColor={theme.colors.border.brand}
                  dropDownBorderRadius={8}
                  dropDownBorderWidth={1}
                  dropDownTextColor={theme.colors.text.strong}
                  iconSize={24}
                  leftIconMode={'inset'}
                  onValueChange={newStyleinputValue => {
                    try {
                      setRidingStyleInput(newStyleinputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  placeholder={'Select an option'}
                  selectedIconColor={theme.colors.text.strong}
                  selectedIconName={'Feather/check'}
                  selectedIconSize={20}
                  type={'solid'}
                  dropDownBackgroundColor={
                    palettes['Trail Twin']['White - Trail Twin']
                  }
                  options={[
                    { label: 'Downhill', value: 'Downhill' },
                    { label: 'Enduro', value: 'Enduro' },
                    { label: 'Freeride', value: 'Freeride' },
                    { label: 'Tech', value: 'Tech' },
                    { label: 'Flow', value: 'Flow' },
                    { label: 'Jumps', value: 'Jumps' },
                    { label: 'Tricks', value: 'Tricks' },
                    { label: 'Trail Builder', value: 'Trail Builder' },
                  ]}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor:
                        palettes['Trail Twin']['White - Trail Twin'],
                      borderColor: palettes.Brand['Secondary Grey'],
                    },
                    dimensions.width
                  )}
                  value={ridingStyleInput}
                />
              </View>
            </View>
            {/* Looking For 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  flex: 1,
                  justifyContent: 'space-evenly',
                  zIndex: -2,
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
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      opacity: 0.85,
                    },
                    dimensions.width
                  )}
                >
                  {'Looking For *'}
                </Text>
                {/* lookingforinput */}
                <MultiSelectPicker
                  autoDismissKeyboard={true}
                  dropDownBorderColor={theme.colors.border.brand}
                  dropDownBorderRadius={8}
                  dropDownBorderWidth={1}
                  dropDownTextColor={theme.colors.text.strong}
                  iconSize={24}
                  leftIconMode={'inset'}
                  onValueChange={newLookingforinputValue => {
                    try {
                      setUserLookingForInput(newLookingforinputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  selectedIconColor={theme.colors.text.strong}
                  selectedIconName={'Feather/check'}
                  selectedIconSize={20}
                  type={'solid'}
                  dropDownBackgroundColor={
                    palettes['Trail Twin']['White - Trail Twin']
                  }
                  options={[
                    { label: 'Group Rides', value: 'Group Rides' },
                    { label: 'Riding Partners', value: 'Riding Partners' },
                    { label: 'Training Partners', value: 'Training Partners' },
                    { label: 'Casual Riders', value: 'Casual Riders' },
                    { label: 'Serious Riders', value: 'Serious Riders' },
                    { label: 'Trail Work', value: 'Trail Work' },
                    { label: 'Coaching', value: 'Coaching' },
                    { label: 'Races', value: 'Races' },
                    { label: 'E-Bike Rides', value: 'E-Bike Rides' },
                  ]}
                  placeholder={'Select options'}
                  rightIconName={'AntDesign/down'}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.Brand.Surface,
                      borderColor: palettes.Brand['Secondary Grey'],
                      color: palettes.Brand['Secondary Text'],
                      fontFamily: 'Inter_300Light',
                      marginTop: 12,
                      position: 'relative',
                    },
                    dimensions.width
                  )}
                  value={userLookingForInput}
                />
              </View>
            </View>
            {/* Confirm Button View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 256,
                  zIndex: -3,
                },
                dimensions.width
              )}
            >
              {/* Update User Profile Button */}
              <>
                {Constants['loading'] ? null : (
                  <Button
                    iconPosition={'left'}
                    onPress={() => {
                      const handler = async () => {
                        try {
                          setGlobalVariableValue({
                            key: 'loading',
                            value: true,
                          });
                          const generatedImageName = generateImageName();
                          const convertedImageName = convertImageNameToDbPath(
                            generatedImageName,
                            'profile_photos/profile'
                          );
                          console.log(
                            convertedImageName,
                            '< Converted Image name'
                          );
                          const res =
                            await supabaseUsersUpdateUserDataPATCH.mutateAsync({
                              age: userAgeInput,
                              bike: userBikeInput,
                              bio: userBioInput,
                              location: userLocationInput,
                              looking_for: userLookingForInput,
                              name: userNameInput,
                              profile_photo: convertedImageName,
                              riding_style: ridingStyleInput,
                              skillLevel: skillLevelInput,
                              user_id: Constants['user_id'],
                            });
                          await uploadImageToBucket(
                            profilePhotoUpload,
                            generatedImageName,
                            'profile_photos/profile'
                          );
                          await waitUtil({ milliseconds: 500 });
                          navigation.navigate('BottomTabNavigator', {
                            screen: 'EventMapScreen',
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor:
                          palettes['Trail Twin'][
                            'Secondary Green #2 - Trail Twin'
                          ],
                        borderRadius: 8,
                        fontFamily: 'Inter_500Medium',
                        fontSize: 14,
                        height: 5,
                        textAlign: 'center',
                        width: '100%',
                      },
                      dimensions.width
                    )}
                    title={'Confirm '}
                  />
                )}
              </>
              <>
                {!Constants['loading'] ? null : (
                  <LoadingIndicator
                    size={30}
                    color={palettes.Brand['Secondary Grey']}
                    type={'flow'}
                  />
                )}
              </>
            </View>
          </View>
        </SimpleStyleScrollView>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(SetupAndEditProfileScreen);
