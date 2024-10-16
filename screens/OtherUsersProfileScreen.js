import React from 'react';
import {
  Button,
  Divider,
  Icon,
  LoadingIndicator,
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseChatsApi from '../apis/SupabaseChatsApi.js';
import * as SupabaseUsersApi from '../apis/SupabaseUsersApi.js';
import * as UserPhotosApi from '../apis/UserPhotosApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import createArray from '../global-functions/createArray';
import formatJSON from '../global-functions/formatJSON';
import getDisplayPhoto from '../global-functions/getDisplayPhoto';
import getRecentChatId from '../global-functions/getRecentChatId';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const OtherUsersProfileScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [Interests, setInterests] = React.useState([
    'Festivals',
    'Travel',
    'Plant-based',
    'Movies',
    'Road Trips',
  ]);
  const [UserDetailsModal, setUserDetailsModal] = React.useState(false);
  const [displayImageArray, setDisplayImageArray] = React.useState('');
  const [displayImageIndex, setDisplayImageIndex] = React.useState(0);
  const [friendDisplayPhoto, setFriendDisplayPhoto] = React.useState('');
  const increment = index => {
    return index + 1;
  };

  const decrement = index => {
    return index - 1;
  };

  const getLastId = data => {
    if (data.length === 0) {
      return null; // Handle empty array
    }
    return data[data.length - 1].id;
  };
  const supabaseChatsCreateChatPOST = SupabaseChatsApi.useCreateChatPOST();
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

      const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
      return () => StatusBar.popStackEntry?.(entry);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes['Trail Twin']['Background - Trail Twin'] },
        dimensions.width
      )}
    >
      <SupabaseUsersApi.FetchGetUserByUniqueUserIdGET
        select={'*'}
        user_id={Constants['otherUserId']}
      >
        {({ loading, error, data, refetchGetUserByUniqueUserId }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <SimpleStyleScrollView
              bounces={true}
              horizontal={false}
              keyboardShouldPersistTaps={'never'}
              nestedScrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor:
                      palettes['Trail Twin']['Background - Trail Twin'],
                    height: '100%',
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'auto',
                      backgroundColor: theme.colors.background.brand,
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      marginBottom: 64,
                    },
                    dimensions.width
                  )}
                >
                  {/* Details */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: theme.colors.background.brand,
                        flex: 1,
                        justifyContent: 'flex-start',
                        marginTop: 48,
                        paddingLeft: 32,
                        paddingRight: 32,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Profile Photo and Name */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'auto',
                          backgroundColor: theme.colors.background.brand,
                          flexDirection: 'row',
                          gap: 24,
                          justifyContent: 'flex-start',
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* User Image View */}
                      <View>
                        {/* Fetch 2 */}
                        <UserPhotosApi.FetchGetUserPhotosGET
                          user_id={fetchData?.[0]?.id}
                        >
                          {({ loading, error, data, refetchGetUserPhotos }) => {
                            const fetch2Data = data?.json;
                            if (loading) {
                              return <ActivityIndicator />;
                            }

                            if (
                              error ||
                              data?.status < 200 ||
                              data?.status >= 300
                            ) {
                              return <ActivityIndicator />;
                            }

                            return (
                              <>
                                {/* User image */}
                                <Image
                                  resizeMode={'cover'}
                                  source={imageSource(
                                    `${fetch2Data?.[0]?.profile_photo?.url}`
                                  )}
                                  style={StyleSheet.applyWidth(
                                    {
                                      borderRadius: 100,
                                      height: 90,
                                      width: 90,
                                    },
                                    dimensions.width
                                  )}
                                />
                              </>
                            );
                          }}
                        </UserPhotosApi.FetchGetUserPhotosGET>
                      </View>
                      {/* Name and Age View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            gap: 8,
                            justifyContent: 'center',
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              alignSelf: 'center',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Attendee Name Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            numberOfLines={1}
                            style={StyleSheet.applyWidth(
                              {
                                alignSelf: 'flex-start',
                                color: theme.colors.text.strong,
                                fontFamily: 'Inter_500Medium',
                                fontSize: 22,
                                marginRight: 8,
                                textAlign: 'auto',
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.[0]?.name}
                            {', '}
                          </Text>
                          {/* Attendee Age Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            numberOfLines={1}
                            style={StyleSheet.applyWidth(
                              {
                                alignSelf: 'center',
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 22,
                                textAlign: 'center',
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.[0]?.age}
                          </Text>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Location */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 16,
                                marginTop: 2,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.[0]?.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* Divider 4 */}
                    <Divider
                      color={theme.colors.border.brand}
                      {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.DividerStyles(theme)['Divider'].style,
                          { marginBottom: 32, marginTop: 32, width: '100%' }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* Bike View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          flexWrap: 'nowrap',
                          marginBottom: 16,
                        },
                        dimensions.width
                      )}
                    >
                      {/* Bike View */}
                      <Icon
                        color={theme.colors.text.strong}
                        name={'MaterialIcons/directions-bike'}
                        size={22}
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: '"rgb(253, 253, 245)"',
                            marginRight: 8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Bike Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Secondary Text'],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {'Bike: '}
                        {fetchData?.[0]?.bike}
                      </Text>
                    </View>
                    {/* SKill View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          flexWrap: 'nowrap',
                          marginBottom: 16,
                        },
                        dimensions.width
                      )}
                    >
                      {/* Experience Icon */}
                      <Icon
                        color={theme.colors.text.strong}
                        name={
                          'MaterialCommunityIcons/format-list-bulleted-type'
                        }
                        size={22}
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: '"rgb(253, 253, 245)"',
                            marginRight: 8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Experience Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Secondary Text'],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {'Skill Level: '}
                        {fetchData?.[0]?.skill_level}{' '}
                      </Text>
                    </View>
                    {/* style */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          flexWrap: 'nowrap',
                          marginBottom: 16,
                        },
                        dimensions.width
                      )}
                    >
                      {/* Experience Icon */}
                      <Icon
                        color={theme.colors.text.strong}
                        name={'MaterialCommunityIcons/bike-fast'}
                        size={22}
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: '"rgb(253, 253, 245)"',
                            marginRight: 8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Experience Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Secondary Text'],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {'Riding Style: '}
                        {formatJSON(fetchData?.[0]?.riding_style)}
                      </Text>
                    </View>
                    {/* Looking for */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          flexWrap: 'nowrap',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Experience Icon */}
                      <Icon
                        color={theme.colors.text.strong}
                        name={'AntDesign/search1'}
                        size={22}
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: '"rgb(253, 253, 245)"',
                            marginRight: 8,
                          },
                          dimensions.width
                        )}
                      />
                      {/* Experience Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Secondary Text'],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {'Looking for: '}
                        {formatJSON(fetchData?.[0]?.looking_for)}
                      </Text>
                    </View>
                    {/* Divider 3 */}
                    <Divider
                      color={theme.colors.border.brand}
                      {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.DividerStyles(theme)['Divider'].style,
                          { marginBottom: 32, marginTop: 32, width: '100%' }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* About */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.Brand['Secondary Text'],
                          fontFamily: 'Inter_400Regular',
                          fontSize: 16,
                        },
                        dimensions.width
                      )}
                    >
                      {fetchData?.[0]?.bio}
                    </Text>
                    {/* Divider 5 */}
                    <Divider
                      color={theme.colors.border.brand}
                      {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.DividerStyles(theme)['Divider'].style,
                          { marginBottom: 32, marginTop: 32, width: '100%' }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* Button View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 32,
                        paddingRight: 32,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Button 2 */}
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
                                const chatCreationResult = (
                                  await supabaseChatsCreateChatPOST.mutateAsync(
                                    {
                                      chatName: createArray('owen', 'tyler'),
                                      user_ids: createArray(
                                        'o2i3hfo23f',
                                        '23f23f231d'
                                      ),
                                    }
                                  )
                                )?.json;
                                const chats = (
                                  await SupabaseChatsApi.getChatsGET(
                                    Constants,
                                    { select: '*' }
                                  )
                                )?.json;
                                await waitUtil({ milliseconds: 500 });
                                navigation.navigate('ChatScreen', {
                                  id: getRecentChatId(
                                    chats,
                                    Constants['user_id']
                                  ),
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ButtonStyles(theme)['Button'].style,
                              {
                                backgroundColor:
                                  palettes['Trail Twin'][
                                    'Secondary Green #2 - Trail Twin'
                                  ],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 12,
                                height: 15,
                                width: '48%',
                              }
                            ),
                            dimensions.width
                          )}
                          title={'Message'}
                        />
                      )}
                    </>
                    <>
                      {Constants['loading'] ? null : (
                        <Button
                          iconPosition={'left'}
                          onPress={() => {
                            try {
                              setGlobalVariableValue({
                                key: 'loading',
                                value: true,
                              });
                              navigation.navigate('ExploreEventsScreen');
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ButtonStyles(theme)['Button'].style,
                              {
                                backgroundColor:
                                  palettes['Trail Twin'][
                                    'Secondary Green #2 - Trail Twin'
                                  ],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 12,
                                height: 15,
                                width: '48%',
                              }
                            ),
                            dimensions.width
                          )}
                          title={'Invite'}
                        />
                      )}
                    </>
                  </View>
                  {/* Loading View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', justifyContent: 'center' },
                      dimensions.width
                    )}
                  >
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
                  {/* Button View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 64,
                        marginTop: 32,
                        paddingLeft: 32,
                        paddingRight: 32,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  ></View>
                </View>
              </View>
            </SimpleStyleScrollView>
          );
        }}
      </SupabaseUsersApi.FetchGetUserByUniqueUserIdGET>
    </ScreenContainer>
  );
};

export default withTheme(OtherUsersProfileScreen);
