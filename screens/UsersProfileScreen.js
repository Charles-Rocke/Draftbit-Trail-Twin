import React from 'react';
import {
  Button,
  Divider,
  Icon,
  LoadingIndicator,
  ScreenContainer,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseUsersApi from '../apis/SupabaseUsersApi.js';
import * as UserPhotosApi from '../apis/UserPhotosApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import formatJSON from '../global-functions/formatJSON';
import getDisplayPhoto from '../global-functions/getDisplayPhoto';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openShareUtil from '../utils/openShare';
import useWindowDimensions from '../utils/useWindowDimensions';

const UsersProfileScreen = props => {
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
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
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
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors.background.brand },
        dimensions.width
      )}
    >
      <SupabaseUsersApi.FetchGetUserByUniqueUserIdGET
        select={'*'}
        user_id={Constants['user_id']}
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
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={false}
            >
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.background.brand,
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
                      flexDirection: 'row',
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
                        {/* User image */}
                        <Image
                          resizeMode={'cover'}
                          source={imageSource('')}
                          style={StyleSheet.applyWidth(
                            { borderRadius: 100, height: 90, width: 90 },
                            dimensions.width
                          )}
                        />
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
                            maxHeight: 110,
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
                                alignSelf: 'auto',
                                color: theme.colors.text.strong,
                                fontFamily: 'Inter_500Medium',
                                fontSize: 22,
                                marginRight: 8,
                                textAlign: 'left',
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
                                alignSelf: 'auto',
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 22,
                                textAlign: 'left',
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.[0]?.age}
                          </Text>
                        </View>
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
                        name={'MaterialIcons/pedal-bike'}
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
                      {/* skill level */}
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
                      {/* skill level */}
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
                      {/* styles */}
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
                      {/* Styles */}
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
                      {/* Looking For Icon */}
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
                      {/* Looking forText */}
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
                    {/* Button View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginBottom: 16,
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
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
                                  await openShareUtil(
                                    'Check Out My Trail Twin Profile!'
                                  );
                                } catch (err) {
                                  console.error(err);
                                }
                              };
                              handler();
                            }}
                            {...GlobalStyles.ButtonStyles(theme)['Button']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button']
                                  .style,
                                {
                                  backgroundColor:
                                    palettes['Trail Twin'][
                                      'Secondary Green #2 - Trail Twin'
                                    ],
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 12,
                                  height: 15,
                                  width: '45%',
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Share Profile'}
                          />
                        )}
                      </>
                      {/* Button 2 */}
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
                                navigation.navigate('UsersEventsScreen');
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            {...GlobalStyles.ButtonStyles(theme)['Button']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button']
                                  .style,
                                {
                                  backgroundColor:
                                    palettes['Trail Twin'][
                                      'Secondary Green #2 - Trail Twin'
                                    ],
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 12,
                                  height: 15,
                                  width: '45%',
                                }
                              ),
                              dimensions.width
                            )}
                            title={'My Rides'}
                          />
                        )}
                      </>
                    </View>
                    {/* Button View 3 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          justifyContent: 'space-around',
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
                              try {
                                setGlobalVariableValue({
                                  key: 'loading',
                                  value: true,
                                });
                                navigation.navigate(
                                  'SetupAndEditProfileScreen'
                                );
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            {...GlobalStyles.ButtonStyles(theme)['Button']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button']
                                  .style,
                                {
                                  backgroundColor:
                                    palettes['Trail Twin'][
                                      'Secondary Green #2 - Trail Twin'
                                    ],
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 12,
                                  height: 15,
                                  width: '45%',
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Edit Profile'}
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
                                setGlobalVariableValue({
                                  key: 'AUTHORIZATION_HEADER',
                                  value: null,
                                });
                                setGlobalVariableValue({
                                  key: 'user_id',
                                  value: null,
                                });
                                navigation.navigate('LoginScreen');
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            {...GlobalStyles.ButtonStyles(theme)['Button']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button']
                                  .style,
                                {
                                  backgroundColor:
                                    palettes['Trail Twin'][
                                      'Secondary Green #2 - Trail Twin'
                                    ],
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 12,
                                  height: 15,
                                  width: '45%',
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Logout'}
                          />
                        )}
                      </>
                    </View>
                  </View>
                  {/* Loading View */}
                  <View>
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
              </View>
            </SimpleStyleScrollView>
          );
        }}
      </SupabaseUsersApi.FetchGetUserByUniqueUserIdGET>
    </ScreenContainer>
  );
};

export default withTheme(UsersProfileScreen);
