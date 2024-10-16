import React from 'react';
import {
  Button,
  Divider,
  Icon,
  Link,
  LoadingIndicator,
  SimpleStyleFlatList,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as EventPhotosApi from '../apis/EventPhotosApi.js';
import * as SupabaseAttendeesApi from '../apis/SupabaseAttendeesApi.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as SupabaseUsersApi from '../apis/SupabaseUsersApi.js';
import * as UserPhotosApi from '../apis/UserPhotosApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import checkEventStatus from '../global-functions/checkEventStatus';
import daysAway from '../global-functions/daysAway';
import formatAmPm from '../global-functions/formatAmPm';
import formatDate from '../global-functions/formatDate';
import formatHours from '../global-functions/formatHours';
import formatJSON from '../global-functions/formatJSON';
import formatString from '../global-functions/formatString';
import formatTotalRiders from '../global-functions/formatTotalRiders';
import posthogEventCapture from '../global-functions/posthogEventCapture';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openShareUtil from '../utils/openShare';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { event_id: 216 };

const EventDetailsCardBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [ampm, setAmpm] = React.useState(null);
  const [previousEvent, setPreviousEvent] = React.useState('');
  const addUserIdToJson = (userIds, userId) => {
    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
    return userIds;
  };

  const extractTrailNames = events => {
    return events.map(event => event.trail_names);
  };
  const supabaseAttendeesCreateAttendeePOST =
    SupabaseAttendeesApi.useCreateAttendeePOST();
  const supabaseEventsUpdateAttendeesPUT =
    SupabaseEventsApi.useUpdateAttendeesPUT();
  React.useEffect(() => {
    try {
      setGlobalVariableValue({
        key: 'loading',
        value: false,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <SupabaseEventsApi.FetchGetSingleEventGET
      id={props.event_id ?? defaultProps.event_id}
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
          <>
            {/* List 2 */}
            <SimpleStyleFlatList
              data={fetchData}
              horizontal={false}
              inverted={false}
              keyExtractor={(list2Data, index) =>
                list2Data?.id ??
                list2Data?.uuid ??
                index?.toString() ??
                JSON.stringify(list2Data)
              }
              keyboardShouldPersistTaps={'never'}
              listKey={'Qlzrfr4S'}
              nestedScrollEnabled={false}
              numColumns={1}
              onEndReachedThreshold={0.5}
              renderItem={({ item, index }) => {
                const list2Data = item;
                return (
                  <>
                    {/* Tab 1 Frame True */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: '"rgb(253, 253, 245)"',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { height: 300, width: '100%', zIndex: 1 },
                          dimensions.width
                        )}
                      >
                        <EventPhotosApi.FetchGetEventPhotoGET
                          event_id={list2Data?.id}
                        >
                          {({ loading, error, data, refetchGetEventPhoto }) => {
                            const fetchData = data?.json;
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
                              <ImageBackground
                                resizeMode={'cover'}
                                source={imageSource(
                                  Images['screenshot20240812at21145pm']
                                )}
                                style={StyleSheet.applyWidth(
                                  {
                                    borderRadius: 8,
                                    height: '100%',
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              />
                            );
                          }}
                        </EventPhotosApi.FetchGetEventPhotoGET>
                      </View>
                      {/* Event Desc and Details View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            paddingLeft: 32,
                            paddingRight: 32,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Details View */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-start',
                              alignSelf: 'center',
                              marginTop: 32,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Title and Riders View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'stretch',
                                alignSelf: 'auto',
                                flexDirection: 'row',
                                gap: 6,
                                justifyContent: 'space-between',
                                marginBottom: 12,
                                position: 'relative',
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            <View>
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
                                      fontFamily: 'Inter_500Medium',
                                      fontSize: 24,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {fetchData?.[0]?.event_name}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {/* Weather View */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              gap: 0,
                              justifyContent: 'flex-start',
                              marginBottom: 12,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          <Icon
                            name={'Ionicons/partly-sunny-outline'}
                            size={24}
                            style={StyleSheet.applyWidth(
                              { marginRight: 8 },
                              dimensions.width
                            )}
                          />
                          {/* Weather Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_300Light',
                                fontSize: 14,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {'Partly Cloudy'}
                          </Text>
                        </View>
                        {/* Riders View */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              marginBottom: 12,
                              position: 'relative',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Riders Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_300Light',
                                fontSize: 14,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {formatTotalRiders(list2Data?.total_riders)}
                            {' Riders'}
                          </Text>
                        </View>
                        {/* Date View */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              gap: 0,
                              justifyContent: 'flex-start',
                              marginBottom: 12,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Date Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_300Light',
                                fontSize: 14,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {formatDate(fetchData?.[0]?.date)}
                            {', '}
                            {formatHours(list2Data?.start_time)}{' '}
                            {formatAmPm(ampm, undefined)}
                          </Text>
                        </View>
                        {/* Days Out */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              gap: 0,
                              justifyContent: 'flex-start',
                              marginBottom: 12,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Days Out */}
                          <Text
                            accessible={true}
                            selectable={false}
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_300Light',
                                fontSize: 14,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {'Starts in: '}
                            {daysAway(list2Data?.date)}
                            {' Days'}
                          </Text>
                        </View>
                        {/* Estimated Ride Length */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              gap: 0,
                              justifyContent: 'flex-start',
                              marginBottom: 12,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Ride Length */}
                          <Text
                            accessible={true}
                            selectable={false}
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_300Light',
                                fontSize: 14,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {'Estimated Ride Length: '}
                            {list2Data?.ride_length}
                            {' Hours'}
                          </Text>
                        </View>
                        {/* Divider 3 */}
                        <Divider
                          color={theme.colors.border.brand}
                          {...GlobalStyles.DividerStyles(theme)['Divider']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.DividerStyles(theme)['Divider']
                                .style,
                              { marginBottom: 32, marginTop: 32, width: '100%' }
                            ),
                            dimensions.width
                          )}
                        />
                        {/* Skill and Ride Type */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              marginBottom: 12,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Tags Icon */}
                          <Icon
                            color={theme.colors.text.strong}
                            name={
                              'MaterialCommunityIcons/format-list-bulleted-type'
                            }
                            size={24}
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: '"rgb(253, 253, 245)"',
                                marginRight: 8,
                              },
                              dimensions.width
                            )}
                          />
                          <View
                            style={StyleSheet.applyWidth(
                              { flexDirection: 'row' },
                              dimensions.width
                            )}
                          >
                            {/* Skill and Ride Type */}
                            <Text
                              accessible={true}
                              selectable={false}
                              ellipsizeMode={'tail'}
                              numberOfLines={2}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.Brand['Secondary Text'],
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 16,
                                  lineHeight: 24,
                                },
                                dimensions.width
                              )}
                            >
                              {list2Data?.event_type}
                              {' - '}
                            </Text>
                            {/* Skill and Ride Type */}
                            <Text
                              accessible={true}
                              selectable={false}
                              ellipsizeMode={'tail'}
                              numberOfLines={2}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.Brand['Secondary Text'],
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 16,
                                  lineHeight: 24,
                                },
                                dimensions.width
                              )}
                            >
                              {formatJSON(list2Data?.skill_level)}
                            </Text>
                          </View>
                        </View>
                        {/* Trails with icon */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              flexWrap: 'nowrap',
                              gap: 0,
                              justifyContent: 'flex-start',
                              marginBottom: 12,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Trails Icon */}
                            <Icon
                              color={theme.colors.text.strong}
                              name={'Ionicons/trail-sign-outline'}
                              size={24}
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: '"rgb(253, 253, 245)"',
                                  marginRight: 8,
                                },
                                dimensions.width
                              )}
                            />
                            {/* trails */}
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
                              {'Trails: '}
                              {list2Data?.trail_names}
                              {' - '}
                            </Text>
                            {/* Click for Details View */}
                            <View
                              style={StyleSheet.applyWidth(
                                { justifyContent: 'center' },
                                dimensions.width
                              )}
                            >
                              <Link
                                accessible={true}
                                onPress={() => {
                                  try {
                                    Linking.openURL(
                                      `https://www.trailforks.com/search/?q=${list2Data?.trail_names}`
                                    );
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                selectable={false}
                                {...GlobalStyles.LinkStyles(theme)['Link']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.LinkStyles(theme)['Link']
                                      .style,
                                    {
                                      color:
                                        palettes['Trail Twin'][
                                          'Primary Green - Trail Twin'
                                        ],
                                      fontFamily: 'Inter_400Regular',
                                      textDecorationLine: 'underline',
                                    }
                                  ),
                                  dimensions.width
                                )}
                                title={'Click for Trail Details'}
                              />
                            </View>
                          </View>
                        </View>
                        {/* Tags View 4 */}
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
                          {/* Tags Icon */}
                          <Icon
                            color={theme.colors.text.strong}
                            name={'AntDesign/tagso'}
                            size={24}
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: '"rgb(253, 253, 245)"',
                                marginRight: 8,
                              },
                              dimensions.width
                            )}
                          />
                          {/* Tags Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 16,
                                marginRight: 48,
                                textAlign: 'left',
                              },
                              dimensions.width
                            )}
                          >
                            {formatString(list2Data?.tags)}
                          </Text>
                        </View>
                        {/* Divider 5 */}
                        <Divider
                          color={theme.colors.border.brand}
                          {...GlobalStyles.DividerStyles(theme)['Divider']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.DividerStyles(theme)['Divider']
                                .style,
                              { marginBottom: 32, marginTop: 32, width: '100%' }
                            ),
                            dimensions.width
                          )}
                        />
                        {/* Desc View */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '100%' },
                            dimensions.width
                          )}
                        >
                          {/* Description */}
                          <Text
                            accessible={true}
                            selectable={false}
                            ellipsizeMode={'tail'}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Secondary Text'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 16,
                                lineHeight: 24,
                                textAlign: 'left',
                              },
                              dimensions.width
                            )}
                          >
                            {list2Data?.event_description}
                          </Text>
                        </View>
                        {/* Divider 2 */}
                        <>
                          {checkEventStatus('[0].event_status') ? null : (
                            <Divider
                              color={theme.colors.border.brand}
                              {...GlobalStyles.DividerStyles(theme)['Divider']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.DividerStyles(theme)['Divider']
                                    .style,
                                  {
                                    marginBottom: 64,
                                    marginTop: 32,
                                    width: '100%',
                                  }
                                ),
                                dimensions.width
                              )}
                            />
                          )}
                        </>
                        {/* Join Button View */}
                        <>
                          {checkEventStatus('[0].event_status') ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Join Button */}
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
                                          (
                                            await supabaseAttendeesCreateAttendeePOST.mutateAsync(
                                              {
                                                event_id: fetchData?.[0]?.id,
                                                user_id: Constants['user_id'],
                                              }
                                            )
                                          )?.json;
                                          (
                                            await supabaseEventsUpdateAttendeesPUT.mutateAsync(
                                              {
                                                attendeeIds: addUserIdToJson(
                                                  list2Data?.attendee_ids,
                                                  Constants['user_id']
                                                ),
                                                id: 216,
                                              }
                                            )
                                          )?.json;

                                          showAlertUtil({
                                            title: 'Success!',
                                            message:
                                              'You have successfully joined!',
                                            buttonText: 'Ok',
                                          });

                                          await waitUtil({ milliseconds: 500 });
                                          navigation.navigate(
                                            'EventChatScreen',
                                            { id: list2Data?.id }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      };
                                      handler();
                                    }}
                                    {...GlobalStyles.ButtonStyles(theme)[
                                      'Button'
                                    ].props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.ButtonStyles(theme)[
                                          'Button'
                                        ].style,
                                        {
                                          backgroundColor:
                                            palettes['Trail Twin'][
                                              'Secondary Green #2 - Trail Twin'
                                            ],
                                          fontFamily: 'Inter_400Regular',
                                          fontSize: 14,
                                          height: 30,
                                          marginBottom: 8,
                                          width: '100%',
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    title={'Join'}
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
                          )}
                        </>
                        {/* Share Button View */}
                        <>
                          {checkEventStatus('[0].event_status') ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                { width: '100%' },
                                dimensions.width
                              )}
                            >
                              {/* Share Button */}
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
                                          await openShareUtil(`Wanna ride at ${extractTrailNames(
                                            fetchData
                                          )} on  at  ${formatAmPm(
                                            ampm,
                                            undefined
                                          )}?

You can join on Trail Twin: https://www.trailtwin.co/`);
                                          posthogEventCapture(
                                            'shared event',
                                            'Event shared with a friend'
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      };
                                      handler();
                                    }}
                                    {...GlobalStyles.ButtonStyles(theme)[
                                      'Button'
                                    ].props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.ButtonStyles(theme)[
                                          'Button'
                                        ].style,
                                        {
                                          backgroundColor:
                                            palettes['Trail Twin'][
                                              'Secondary Green #2 - Trail Twin'
                                            ],
                                          fontFamily: 'Inter_400Regular',
                                          fontSize: 14,
                                          height: 30,
                                          marginTop: 24,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    title={'Share'}
                                  />
                                )}
                              </>
                            </View>
                          )}
                        </>
                        {/* Divider 4 */}
                        <Divider
                          color={theme.colors.border.brand}
                          {...GlobalStyles.DividerStyles(theme)['Divider']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.DividerStyles(theme)['Divider']
                                .style,
                              { marginBottom: 32, marginTop: 64, width: '100%' }
                            ),
                            dimensions.width
                          )}
                        />
                        {/* User */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          <SupabaseUsersApi.FetchGetUserByUniqueUserIdGET
                            select={'*'}
                            user_id={'077be2b4-e553-4b44-a4c5-b5c193794e48'}
                          >
                            {({
                              loading,
                              error,
                              data,
                              refetchGetUserByUniqueUserId,
                            }) => {
                              const fetchData = data?.json;
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
                                  {/* Details */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        borderColor: theme.colors.border.brand,
                                        borderRadius: 12,
                                        flexDirection: 'row',
                                        paddingBottom: 16,
                                        paddingTop: 16,
                                        width: '100%',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <UserPhotosApi.FetchGetUserPhotosGET
                                      user_id={fetchData?.[0]?.user_id}
                                    >
                                      {({
                                        loading,
                                        error,
                                        data,
                                        refetchGetUserPhotos,
                                      }) => {
                                        const fetchData = data?.json;
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
                                            {/* Host Photo */}
                                            <Image
                                              resizeMode={'cover'}
                                              source={imageSource(`${fetchData?.[0]?.profile_photo?.url}
`)}
                                              style={StyleSheet.applyWidth(
                                                {
                                                  borderRadius: 100,
                                                  height: 80,
                                                  width: 80,
                                                },
                                                dimensions.width
                                              )}
                                            />
                                          </>
                                        );
                                      }}
                                    </UserPhotosApi.FetchGetUserPhotosGET>
                                    <View>
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: theme.colors.text.strong,
                                            fontFamily: 'Inter_500Medium',
                                            fontSize: 18,
                                            marginLeft: 16,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Organized by'}
                                      </Text>

                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            gap: 8,
                                            justifyContent: 'flex-start',
                                            marginTop: 8,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* Host Name */}
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.text.strong,
                                              fontFamily: 'Inter_400Regular',
                                              fontSize: 14,
                                              marginLeft: 16,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {null}
                                          {','}
                                        </Text>
                                        {/* Host age */}
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          {...GlobalStyles.TextStyles(theme)[
                                            'Text'
                                          ].props}
                                          style={StyleSheet.applyWidth(
                                            StyleSheet.compose(
                                              GlobalStyles.TextStyles(theme)[
                                                'Text'
                                              ].style,
                                              {
                                                color:
                                                  palettes.Brand[
                                                    'Secondary Text'
                                                  ],
                                                fontFamily: 'Inter_400Regular',
                                                fontSize: 14,
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {null}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </>
                              );
                            }}
                          </SupabaseUsersApi.FetchGetUserByUniqueUserIdGET>
                        </View>
                        <Divider
                          color={theme.colors.border.brand}
                          {...GlobalStyles.DividerStyles(theme)['Divider']
                            .props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.DividerStyles(theme)['Divider']
                                .style,
                              { marginTop: 24, width: '100%' }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  </>
                );
              }}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
            />
          </>
        );
      }}
    </SupabaseEventsApi.FetchGetSingleEventGET>
  );
};

export default withTheme(EventDetailsCardBlock);
