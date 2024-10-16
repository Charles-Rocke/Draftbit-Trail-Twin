import React from 'react';
import {
  Circle,
  Divider,
  Icon,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseChatsApi from '../apis/SupabaseChatsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const EventInboxScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [chatType, setChatType] = React.useState('events');
  const [openSearch, setOpenSearch] = React.useState(false);
  const [switchValue, setSwitchValue] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
          height: '100%',
        },
        dimensions.width
      )}
    >
      <View>
        {/* Search And Filter */}
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
              paddingLeft: 32,
              paddingRight: 32,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Search Chat View */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 24, marginTop: 24, width: '100%' },
              dimensions.width
            )}
          >
            {/* searchAndFilterInput */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              webShowOutline={true}
              autoComplete={'address-line1'}
              clearButtonMode={'always'}
              placeholder={'Search'}
              placeholderTextColor={theme.colors.text.light}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'center',
                  borderBottomWidth: 1,
                  borderColor: theme.colors.text.light,
                  borderLeftWidth: 1,
                  borderRadius: 12,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  color: palettes.Brand['Secondary Text'],
                  fontFamily: 'Inter_400Regular',
                  fontSize: 14,
                  height: 32,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                },
                dimensions.width
              )}
              value={Constants['searchAndFilterQuery']}
            />
          </View>
        </View>
        {/* Chat Nav */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor:
                palettes['Trail Twin']['Background - Trail Twin'],
              borderBottomWidth: 1,
              borderColor: theme.colors.border.brand,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
            dimensions.width
          )}
        >
          {/* Event Chats */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                height: 50,
                justifyContent: 'center',
                width: 150,
              },
              dimensions.width
            )}
          >
            {/* Touchable 2 */}
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('BottomTabNavigator', {
                    screen: 'EventInboxScreen',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { height: '100%', width: '100%' },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text 2'].style,
                    {
                      alignSelf: 'center',
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginTop: 14,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Event Chats'}
              </Text>
            </Touchable>
          </View>
          {/* Group Chats */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                height: 50,
                justifyContent: 'center',
                width: 150,
              },
              dimensions.width
            )}
          >
            {/* Touchable 2 */}
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('FriendsInboxScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { height: '100%', width: '100%' },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text 2'].style,
                    {
                      alignSelf: 'center',
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginTop: 14,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Friends'}
              </Text>
            </Touchable>
          </View>
        </View>
      </View>

      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          { marginLeft: 24, marginRight: 24, marginTop: 12 },
          dimensions.width
        )}
      >
        {/* Get Users Events */}
        <SupabaseChatsApi.FetchGetChatsGET select={'*'}>
          {({ loading, error, data, refetchGetChats }) => {
            const getUsersEventsData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <SimpleStyleFlatList
                data={getUsersEventsData}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'n3fEdf8U'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <>
                      {/* Chat */}
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.navigate('EventChatScreen', {
                              id: listData?.id,
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor:
                                palettes['Trail Twin'][
                                  'Background - Trail Twin'
                                ],
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingBottom: 12,
                              paddingTop: 12,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Image */}
                          <View
                            style={StyleSheet.applyWidth(
                              { justifyContent: 'center' },
                              dimensions.width
                            )}
                          >
                            {/* User image */}
                            <Image
                              resizeMode={'cover'}
                              source={imageSource(
                                Images['screenshot20240812at21145pm']
                              )}
                              style={StyleSheet.applyWidth(
                                { borderRadius: 100, height: 58, width: 58 },
                                dimensions.width
                              )}
                            />
                            <Circle
                              size={8}
                              style={StyleSheet.applyWidth(
                                {
                                  minWidth: 12,
                                  position: 'absolute',
                                  right: 0,
                                  top: 0,
                                  zIndex: 1,
                                },
                                dimensions.width
                              )}
                            />
                          </View>
                          {/* Name and Message */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 16,
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-start',
                                  flexDirection: 'column',
                                  justifyContent: 'space-around',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Name ~ */}
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.text.strong,
                                    fontFamily: 'Inter_400Regular',
                                    fontSize: 16,
                                    lineHeight: 20,
                                    opacity: 1,
                                  },
                                  dimensions.width
                                )}
                              >
                                {null}
                              </Text>
                              {/* Message ~ */}
                              <Text
                                accessible={true}
                                selectable={false}
                                numberOfLines={1}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: theme.colors.text.strong,
                                    fontFamily: 'Inter_300Light',
                                    fontSize: 12,
                                    lineHeight: 20,
                                    marginTop: 8,
                                    opacity: 0.5,
                                  },
                                  dimensions.width
                                )}
                              >
                                {'most recent message'}
                              </Text>
                            </View>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  alignSelf: 'auto',
                                  flexDirection: 'row',
                                  gap: 8,
                                },
                                dimensions.width
                              )}
                            >
                              <Icon name={'AntDesign/right'} size={14} />
                            </View>
                          </View>
                        </View>
                        <Divider
                          {...GlobalStyles.DividerStyles(theme)['Divider']
                            .props}
                          color={palettes['Brand Fire'].Divider}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.DividerStyles(theme)['Divider']
                                .style,
                              { marginBottom: 12, marginTop: 12 }
                            ),
                            dimensions.width
                          )}
                        />
                      </Touchable>
                    </>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
              />
            );
          }}
        </SupabaseChatsApi.FetchGetChatsGET>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(EventInboxScreen);
