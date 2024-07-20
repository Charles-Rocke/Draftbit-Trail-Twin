import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as base64decode from '../custom-files/base64decode';
import * as supabase from '../custom-files/supabase';
import checkIfHasAlreadyJoined from '../global-functions/checkIfHasAlreadyJoined';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openCameraUtil from '../utils/openCamera';
import openImagePickerUtil from '../utils/openImagePicker';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Divider,
  Icon,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const JoinEventScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [addressInput, setAddressInput] = React.useState('');
  const [addressInputV1, setAddressInputV1] = React.useState('');
  const [ageInputV1, setAgeInputV1] = React.useState(0);
  const [attendeeAgeInputV1, setAttendeeAgeInputV1] = React.useState(0);
  const [attendeeSafetySelfie, setAttendeeSafetySelfie] = React.useState('');
  const [dateInput, setDateInput] = React.useState(new Date());
  const [dateInputV1, setDateInputV1] = React.useState(new Date());
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [descriptionInputV1, setDescriptionInputV1] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');
  const [eventIdInputV1, setEventIdInputV1] = React.useState(
    props.route?.params?.event_id ?? 29
  );
  const [eventNameInputV1, setEventNameInputV1] = React.useState('');
  const [eventNameInputValue, setEventNameInputValue] = React.useState('');
  const [eventTypeInput, setEventTypeInput] = React.useState('');
  const [hostNameInput, setHostNameInput] = React.useState('');
  const [hostNameInputV1, setHostNameInputV1] = React.useState('');
  const [invitesInputIntV1, setInvitesInputIntV1] = React.useState(0);
  const [invitesInputValue, setInvitesInputValue] = React.useState([]);
  const [isAttendeeSafetySelfie, setIsAttendeeSafetySelfie] =
    React.useState(false);
  const [isSafetySelfie, setIsSafetySelfie] = React.useState(false);
  const [joinAttendeeNameInputV1, setJoinAttendeeNameInputV1] =
    React.useState('');
  const [numberInputValue, setNumberInputValue] = React.useState('');
  const [partySizeInput, setPartySizeInput] = React.useState('');
  const [partySizeInputV1, setPartySizeInputV1] = React.useState(0);
  const [safetySelfie, setSafetySelfie] = React.useState('');
  const [safteySelfiePath, setSafteySelfiePath] = React.useState('');
  const [startTimeInputV1, setStartTimeInputV1] = React.useState(new Date());
  const [startTimeInputValue, setStartTimeInputValue] = React.useState('');
  const [tagsInputV1, setTagsInputV1] = React.useState([]);
  const [tagsInputValue, setTagsInputValue] = React.useState([]);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
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

  const checkBase64Data = base64Data => {
    // Ensure base64 data is provided
    if (!base64Data) {
      console.error('No base64 data provided');
      return { error: 'No base64 data provided' };
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

  // Checks if an attendee already join an event by query their name with the event id. Returns True if they already joined.
  const checkIfAlreadyJoined = async (attendeeName, eventId) => {
    const checkIfAlreadyJoined = async (attendeeName, eventId) => {
      let { data, error } = await supabase
        .from('attendees')
        .select('id')
        .eq('attendee_name', attendeeName)
        .eq('event', eventId);

      if (error) {
        console.error('Error checking attendee:', error);
        return false; // Return false if there's an error
      }

      return data.length > 0;
    };
  };

  const generateImageName = () => {
    // Generate a unique image name
    const imgName = `${Math.random()
      .toString(36)
      .substring(2)}-${Date.now()}.jpg`;
    return imgName;
  };

  const convertImageNameToDbPath = imageName => {
    const fullImagePath = convertUserImagePathToLink(
      imageName,
      supabase.default.supabaseUrl
    );

    // Return the full image path
    return fullImagePath;
  };

  const convertUserImagePathToLink = (imagePath, supabaseUrl) => {
    const userImageDbLink = `${supabaseUrl}/storage/v1/object/public/safety_selfies/${imagePath}`;
    return userImageDbLink;
  };

  const decodeBase64ToArrayBuffer = base64String => {
    console.log(
      'TYPE OF base64decode.decode(base64String): ',
      typeof base64decode.decode(base64String)
    );
    return base64decode.decode(base64String);
  };

  const extractBase64Components = base64Data => {
    // Extract the base64 string and mime type
    const [prefix, base64String] = base64Data.split(',');
    const mimeType = prefix.match(/:(.*?);/)[1];
    console.log('MIME TYPE: ', mimeType);
    return { base64String, mimeType };
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
  const supabaseEventsCreateAttendeePOST =
    SupabaseEventsApi.useCreateAttendeePOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setSafetySelfie(null);
      setIsAttendeeSafetySelfie(false);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: '"rgb(253, 253, 245)"' },
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
        <SupabaseEventsApi.FetchGetSingleEventGET
          id={props.route?.params?.event_id ?? 29}
          select={'*'}
        >
          {({ loading, error, data, refetchGetSingleEvent }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <SimpleStyleFlatList
                data={fetchData}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ?? listData?.uuid ?? index.toString()
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'UqVrIqzO'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flex: 1,
                          marginBottom: 32,
                          marginTop: 32,
                          paddingLeft: 32,
                          paddingRight: 32,
                          width: '100%',
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
                            fontSize: 16,
                            marginBottom: 6,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      >
                        {'Event: '}
                        {listData?.event_name}
                      </Text>
                      {/* sub title */}
                      <Text
                        accessible={true}
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.text.strong,
                            fontFamily: 'Inter_300Light',
                            fontSize: 12,
                            marginTop: 2,
                            opacity: 0.4,
                          },
                          dimensions.width
                        )}
                      >
                        {'Please fill in a few details below to join'}
                      </Text>
                      <Divider
                        color={theme.colors.border.brand}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
                            { marginBottom: 24, marginTop: 24 }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Full Name */}
                      <View>
                        {/* title */}
                        <Text
                          accessible={true}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_400Regular',
                              fontSize: 12,
                              opacity: 0.85,
                            },
                            dimensions.width
                          )}
                        >
                          {'Your Name'}
                        </Text>
                        {/* Attendee Name Input */}
                        <TextInput
                          autoCapitalize={'none'}
                          autoCorrect={true}
                          changeTextDelay={500}
                          onChangeText={newAttendeeNameInputValue => {
                            try {
                              setJoinAttendeeNameInputV1(
                                newAttendeeNameInputValue
                              );
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
                              fontFamily: 'Inter_400Regular',
                              height: 48,
                              marginTop: 8,
                              paddingBottom: 8,
                              paddingLeft: 20,
                              paddingRight: 8,
                              paddingTop: 8,
                            },
                            dimensions.width
                          )}
                          value={joinAttendeeNameInputV1}
                        />
                      </View>
                      {/* Age View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { marginTop: 24 },
                          dimensions.width
                        )}
                      >
                        {/* Age Text */}
                        <Text
                          accessible={true}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_400Regular',
                              fontSize: 12,
                              opacity: 0.85,
                            },
                            dimensions.width
                          )}
                        >
                          {'Your Age\n'}
                        </Text>
                        {/* Age Input */}
                        <TextInput
                          autoCapitalize={'none'}
                          autoCorrect={true}
                          changeTextDelay={500}
                          onChangeText={newAgeInputValue => {
                            try {
                              setAttendeeAgeInputV1(newAgeInputValue);
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
                              fontFamily: 'Inter_400Regular',
                              height: 48,
                              marginTop: 8,
                              paddingBottom: 8,
                              paddingLeft: 20,
                              paddingRight: 8,
                              paddingTop: 8,
                            },
                            dimensions.width
                          )}
                          value={attendeeAgeInputV1}
                        />
                      </View>
                      {/* Personal Photo */}
                      <View
                        style={StyleSheet.applyWidth(
                          { marginTop: 20 },
                          dimensions.width
                        )}
                      >
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
                                const attendeeSafetySelfie =
                                  await openImagePickerUtil({
                                    mediaTypes: 'Images',
                                    allowsEditing: false,
                                    quality: 0.5,
                                    allowsMultipleSelection: false,
                                    permissionErrorMessage:
                                      'Sorry, we need media library permissions to make this work.',
                                    showAlertOnPermissionError: true,
                                  });

                                if (attendeeSafetySelfie) {
                                  console.log('Image was captured'.toString());
                                  setIsAttendeeSafetySelfie(true);
                                  console.log(
                                    'attendeeSafetySelfie is set to True'
                                  );
                                  setAttendeeSafetySelfie(attendeeSafetySelfie);
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
                              {!attendeeSafetySelfie ? null : (
                                <Image
                                  resizeMode={'cover'}
                                  {...GlobalStyles.ImageStyles(theme)['Image']
                                    .props}
                                  source={{ uri: `${attendeeSafetySelfie}` }}
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.ImageStyles(theme)['Image']
                                      .style,
                                    dimensions.width
                                  )}
                                />
                              )}
                            </>
                            <>
                              {isAttendeeSafetySelfie ? null : (
                                <Text
                                  accessible={true}
                                  {...GlobalStyles.TextStyles(theme)['Text']
                                    .props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)['Text']
                                        .style,
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
                              {isAttendeeSafetySelfie ? null : (
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
                      {/* Divider 2 */}
                      <Divider
                        color={theme.colors.border.brand}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
                            { marginBottom: 24, marginTop: 24 }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Confirm */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Join Event Button */}
                        <Button
                          iconPosition={'left'}
                          onPress={() => {
                            const handler = async () => {
                              try {
                                const hasAlreadyJoined =
                                  await checkIfHasAlreadyJoined(
                                    joinAttendeeNameInputV1,
                                    listData?.id
                                  );
                                if (hasAlreadyJoined) {
                                  showAlertUtil({
                                    title: 'Failed',
                                    message: 'Successfully joined event',
                                    buttonText: 'Ok',
                                  });
                                } else {
                                  const generatedImageName =
                                    generateImageName();
                                  const convertedImageDbUrl =
                                    convertImageNameToDbPath(
                                      generatedImageName
                                    );
                                  const successCreateAttendee = (
                                    await supabaseEventsCreateAttendeePOST.mutateAsync(
                                      {
                                        attendeeAgeInputV1: attendeeAgeInputV1,
                                        attendeeSafetySelfie:
                                          convertedImageDbUrl,
                                        eventIdInputV1:
                                          props.route?.params?.event_id ?? 29,
                                        joinAttendeeNameInputV1:
                                          joinAttendeeNameInputV1,
                                      }
                                    )
                                  )?.json;
                                  await uploadSelfieToBucket(
                                    attendeeSafetySelfie,
                                    generatedImageName
                                  );
                                  navigation.navigate('EventDetailsScreen', {
                                    event_id:
                                      props.route?.params?.event_id ?? 29,
                                  });

                                  showAlertUtil({
                                    title: 'Success',
                                    message: 'Successfully joined event',
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
                              fontFamily: 'Inter_300Light',
                              fontSize: 16,
                              height: 52,
                              textAlign: 'center',
                            },
                            dimensions.width
                          )}
                          title={'Join'}
                        />
                      </View>
                    </View>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
              />
            );
          }}
        </SupabaseEventsApi.FetchGetSingleEventGET>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(JoinEventScreen);
