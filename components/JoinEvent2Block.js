import React from 'react';
import {
  Button,
  Divider,
  Icon,
  SimpleStyleFlatList,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openCameraUtil from '../utils/openCamera';
import openImagePickerUtil from '../utils/openImagePicker';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';

const JoinEvent2Block = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [attendeeAgeInputV1, setAttendeeAgeInputV1] = React.useState(0);
  const [attendeeSafetySelfie, setAttendeeSafetySelfie] = React.useState('');
  const [eventIdInputV1, setEventIdInputV1] = React.useState(0);
  const [isAttendeeSafetySelfie, setIsAttendeeSafetySelfie] =
    React.useState(false);
  const [isSafetySelfie, setIsSafetySelfie] = React.useState(false);
  const [joinAttendeeNameInputV1, setJoinAttendeeNameInputV1] =
    React.useState('');
  const [safetySelfie, setSafetySelfie] = React.useState('');
  const supabaseEventsCreateAttendeePOST =
    SupabaseEventsApi.useCreateAttendeePOST();

  return (
    <View>
      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
      >
        <SupabaseEventsApi.FetchGetSingleEventGET id={213} select={'*'}>
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
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'rk9C1TZB'}
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
                          marginBottom: 64,
                          marginTop: 64,
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
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.text.strong,
                            fontFamily: 'Inter_500Medium',
                            fontSize: 18,
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
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.text.strong,
                            fontFamily: 'Inter_400Regular',
                            fontSize: 14,
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
                          selectable={false}
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
                          selectable={false}
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
                          selectable={false}
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
                                    outputBase64: true,
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
                                  source={imageSource(
                                    `${attendeeSafetySelfie}`
                                  )}
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
                                  selectable={false}
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
                                <Icon name={'AntDesign/camerao'} size={35} />
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
                                (
                                  await supabaseEventsCreateAttendeePOST.mutateAsync(
                                    {
                                      attendeeAgeInputV1: attendeeAgeInputV1,
                                      eventIdInputV1: null,
                                      joinAttendeeNameInputV1:
                                        joinAttendeeNameInputV1,
                                    }
                                  )
                                )?.json;
                                /* hidden 'Navigate' action */
                                navigation.navigate(
                                  'MessagingScreenDisplayOnlyScreen'
                                );

                                showAlertUtil({
                                  title: undefined,
                                  message: "You've successfully joined",
                                  buttonText: 'Ok',
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          style={StyleSheet.applyWidth(
                            {
                              borderRadius: 12,
                              fontFamily: 'Inter_500Medium',
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
    </View>
  );
};

export default withTheme(JoinEvent2Block);
