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
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseChatsApi from '../apis/SupabaseChatsApi.js';
import * as SupabaseMessagesApi from '../apis/SupabaseMessagesApi.js';
import * as SupabaseUsersApi from '../apis/SupabaseUsersApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openCameraUtil from '../utils/openCamera';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { id: null };

const ChatScreen = props => {
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
      <SupabaseChatsApi.FetchGetSingleChatByIdGET
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
        id={31}
      >
        {({ loading, error, data, refetchGetSingleChatById }) => {
          const fetchChatData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return null;
        }}
      </SupabaseChatsApi.FetchGetSingleChatByIdGET>
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['Trail Twin']['White - Trail Twin'],
            borderBottomWidth: 1,
            borderColor: theme.colors.border.brand,
            height: 100,
            justifyContent: 'center',
          },
          dimensions.width
        )}
      >
        {/* Fetch Other Users Data */}
        <SupabaseUsersApi.FetchGetUserByUniqueUserIdGET
          select={'*'}
          user_id={'077be2b4-e553-4b44-a4c5-b5c193794e48'}
        >
          {({ loading, error, data, refetchGetUserByUniqueUserId }) => {
            const fetchOtherUsersDataData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor:
                      palettes['Trail Twin']['White - Trail Twin'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.border.brand,
                    gap: 6,
                    justifyContent: 'center',
                    position: 'absolute',
                    zIndex: 1,
                  },
                  dimensions.width
                )}
              >
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['screenshot20240812at15053pm'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { borderRadius: 100, height: 54, width: 54, zIndex: 1 }
                    ),
                    dimensions.width
                  )}
                />
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text 2'].style,
                      { fontFamily: 'Inter_400Regular' }
                    ),
                    dimensions.width
                  )}
                >
                  {fetchOtherUsersDataData?.[0]?.name}
                </Text>
              </View>
            );
          }}
        </SupabaseUsersApi.FetchGetUserByUniqueUserIdGET>
      </View>

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
          chat_id={24}
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
                listKey={'jKf60yzq'}
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
                      chat_id: 24,
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

export default withTheme(ChatScreen);
