import React from 'react';
import {
  Circle,
  Icon,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as SupabaseMessagesApi from '../apis/SupabaseMessagesApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openCameraUtil from '../utils/openCamera';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { id: null };

const EventChatScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [textInputValue, setTextInputValue] = React.useState('');
  const [user_id1, setUser_id1] = React.useState(null);
  const [user_id2, setUser_id2] = React.useState(null);
  const supabaseMessagesSendMessagePOST =
    SupabaseMessagesApi.useSendMessagePOST();

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes['Trail Twin']['Background - Trail Twin'] },
        dimensions.width
      )}
    >
      {/* Fetch Chat */}
      <SupabaseEventsApi.FetchGetSingleEventGET
        handlers={{
          onData: fetchChatData => {
            try {
              setUser_id1(fetchChatData?.[0]?.user_id1);
              setUser_id2(fetchChatData?.[0]?.user_id2);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        id={216}
        select={'*'}
      >
        {({ loading, error, data, refetchGetSingleEvent }) => {
          const fetchChatData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              {/* Navigation Frame 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor:
                      palettes['Trail Twin']['Background - Trail Twin'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.border.brand,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 24,
                    paddingLeft: 32,
                    paddingRight: 32,
                    paddingTop: 24,
                  },
                  dimensions.width
                )}
              >
                {/* Touchable 3 */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('EventDetailsScreen', {
                        event_id: fetchChatData?.[0]?.id,
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {/* Info Icon */}
                  <Icon name={'Feather/info'} size={24} />
                </Touchable>

                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('EventDetailsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
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
                        textAlign: 'left',
                        textDecorationLine: 'none',
                      },
                      dimensions.width
                    )}
                  >
                    {fetchChatData?.[0]?.event_name}
                  </Text>
                </Touchable>
                {/* Touchable 2 */}
                <Touchable
                  onPress={() => {
                    try {
                      Linking.openURL(
                        `https://www.google.com/maps?q=${fetchChatData?.[0]?.meetup_lat},${fetchChatData?.[0]?.meetup_lon}`
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {/* Directions Icon  */}
                  <Icon name={'Feather/map-pin'} size={24} />
                </Touchable>
              </View>
            </>
          );
        }}
      </SupabaseEventsApi.FetchGetSingleEventGET>
      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            height: '100%',
            justifyContent: 'flex-start',
            marginTop: 24,
            overflow: 'hidden',
            paddingLeft: 24,
            paddingRight: 24,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <SupabaseMessagesApi.FetchGetMessagesGET
          chat_id={216}
          refetchInterval={1000}
        >
          {({ loading, error, data, refetchGetMessages }) => {
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
                listKey={'5xsKsjzG'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <>
                      {/* Frame */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: [
                              {
                                minWidth: Breakpoints.Mobile,
                                value: 'flex-start',
                              },
                              {
                                minWidth: Breakpoints.Mobile,
                                value:
                                  listData?.sender_id === Constants['user_id']
                                    ? 'flex-end'
                                    : 'flex-start',
                              },
                            ],
                            gap: 4,
                            marginBottom: 16,
                            position: 'relative',
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        {/* View 2 */}
                        <View>
                          {/* Name */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                { fontFamily: 'Inter_400Regular', fontSize: 12 }
                              ),
                              dimensions.width
                            )}
                          >
                            {null}
                          </Text>
                          {/* Message Bubble Frame */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor:
                                  palettes['Trail Twin'][
                                    'Secondary Green - Trail Twin'
                                  ],
                                borderBottomLeftRadius: 24,
                                borderBottomRightRadius: 24,
                                borderTopLeftRadius: 24,
                                borderTopRightRadius: 24,
                                flexGrow: 1,
                                flexShrink: 0,
                                gap: 0,
                                justifyContent: 'center',
                                paddingBottom: 16,
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 16,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Message */}
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: 'theme.colors.communityTrueOption',
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 14,
                                  lineHeight: 18,
                                },
                                dimensions.width
                              )}
                            >
                              {listData?.message}
                              {'\n'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
              />
            );
          }}
        </SupabaseMessagesApi.FetchGetMessagesGET>
      </SimpleStyleKeyboardAwareScrollView>
      {/* Keyboard with Emoticons Group */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes['Trail Twin']['White - Trail Twin'],
            borderColor: theme.colors.border.brand,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderTopWidth: 1,
            bottom: 50,
            flexGrow: 1,
            flexShrink: 0,
            justifyContent: 'flex-end',
            paddingLeft: 32,
            paddingRight: 32,
            position: 'absolute',
            zIndex: 2,
          },
          dimensions.width
        )}
      >
        {/* Message Frame */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'auto',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 32,
              paddingTop: 32,
            },
            dimensions.width
          )}
        >
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth(
              { flexGrow: 0, flexShrink: 0 },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    await openCameraUtil({
                      mediaTypes: 'Images',
                      allowsEditing: false,
                      cameraType: 'back',
                      videoMaxDuration: undefined,
                      quality: 0.2,
                      permissionErrorMessage:
                        'Please allow Trail Twin to access camera.',
                      showAlertOnPermissionError: true,
                      outputBase64: true,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* Flex Frame for Icons */}
              <View>
                <Icon name={'Feather/camera'} size={24} />
              </View>
            </Touchable>
          </View>
          {/* Flex Input */}
          <View
            style={StyleSheet.applyWidth(
              { flexGrow: 1, flexShrink: 0 },
              dimensions.width
            )}
          >
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setTextInputValue(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              placeholder={'Type something...'}
              style={StyleSheet.applyWidth(
                {
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                  borderBottomWidth: 1,
                  borderColor: palettes['Brand Fire'].Divider,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  borderTopWidth: 1,
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_300Light',
                  marginLeft: 16,
                  marginRight: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 16,
                },
                dimensions.width
              )}
              value={textInputValue}
            />
          </View>

          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  (
                    await supabaseMessagesSendMessagePOST.mutateAsync({
                      chat_id: 216,
                      message: textInputValue,
                      sender_id: Constants['user_id'],
                      sender_name: 'Senders Name',
                    })
                  )?.json;
                  setTextInputValue(null);
                  console.log(textInputValue, '< Text Input');
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            <Circle
              size={48}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor:
                    palettes['Trail Twin']['Secondary Green #2 - Trail Twin'],
                  maxHeight: 36,
                  maxWidth: 36,
                },
                dimensions.width
              )}
            >
              <Icon
                color={palettes['Trail Twin']['White - Trail Twin']}
                name={'AntDesign/arrowup'}
                size={24}
              />
            </Circle>
          </Touchable>
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth(
              { flexGrow: 0, flexShrink: 0 },
              dimensions.width
            )}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(EventChatScreen);
