import React from 'react';
import { MapCallout, MapCircle, MapMarker, MapView } from '@draftbit/maps';
import {
  Button,
  Icon,
  LoadingIndicator,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as SupabaseUsersApi from '../apis/SupabaseUsersApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import filterEvents from '../global-functions/filterEvents';
import filterEventsWithRadius from '../global-functions/filterEventsWithRadius';
import formatAmPm from '../global-functions/formatAmPm';
import formatDate from '../global-functions/formatDate';
import formatHours from '../global-functions/formatHours';
import formatJSON from '../global-functions/formatJSON';
import getUserLat from '../global-functions/getUserLat';
import getUserLon from '../global-functions/getUserLon';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getLocationUtil from '../utils/getLocation';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const EventMapScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [ampm, setAmpm] = React.useState('');
  const [weather, setWeather] = React.useState([]);
  const getName = event => {
    return event.event_name;
  };

  const getLat = event => {
    // return event.map(event => event.meetup_lat);
    const latitude = event.meetup_lat;
    return latitude;
  };

  const getLon = event => {
    // return event.map(event => event.meetup_lon);
    const longitude = event.meetup_lon;
    return longitude;
  };

  const getNames = events => {
    const names = events.map(event => event.event_name || 'Unnamed Event');
    console.log('Event Names:', names);
    return names;
  };

  const getLats = events => {
    const latitudes = events.map(event => event.meetup_lat);
    return latitudes;
  };

  const getLons = events => {
    const longitudes = events.map(event => event.meetup_lon);
    return longitudes;
  };

  const getIds = events => {
    const ids = events.map(event => event.id);
    return ids;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        setGlobalVariableValue({
          key: 'loading',
          value: false,
        });
        const events = (
          await SupabaseEventsApi.getEventsGET(Constants, { select: '*' })
        )?.json;
        console.log(Constants['user_id'], '< User ID');
        setGlobalVariableValue({
          key: 'filteredEvents',
          value: filterEventsWithRadius(
            filterEvents(
              events,
              Constants['eventTypeFilter'],
              Constants['tagsFilter'],
              Constants['rideNameFilter'],
              Constants['trailFilter'],
              Constants['skillLevelFilter'],
              Constants['minDateFilter'],
              Constants['maxDateFilter'],
              Constants['startTimeAfterFilter'],
              Constants['startTimeBeforeFilter']
            ),
            Constants['usersLocationLat'],
            Constants['usersLocationLon'],
            Constants['searchRadius']
          ),
        });
        const data = await getLocationUtil({ accuracy: 'Highest' });
        setGlobalVariableValue({
          key: 'usersLocationLat',
          value: getUserLat(data),
        });
        setGlobalVariableValue({
          key: 'usersLocationLon',
          value: getUserLon(data),
        });
        const usersNameFetch = (
          await SupabaseUsersApi.getUserDetailGET(Constants, {
            detail: 'name',
            user_id: '3ff9525f-2476-406a-9dfc-3cb99fa9dca1',
          })
        )?.json;
        setGlobalVariableValue({
          key: 'usersName',
          value: usersNameFetch,
        });
        console.log(Constants['usersName'], '< NAME');
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes['Trail Twin']['Background - Trail Twin'] },
        dimensions.width
      )}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            borderBottomWidth: 1,
            borderColor: theme.colors.border.brand,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 64,
            paddingBottom: 12,
            paddingLeft: 48,
            paddingRight: 48,
            paddingTop: 12,
            width: '100%',
            zIndex: 1,
          },
          dimensions.width
        )}
      >
        {/* Filter View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'flex-start' },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('CreateEventScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', gap: 4 },
                dimensions.width
              )}
            >
              <Icon name={'AntDesign/plus'} size={24} />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text 2'].style,
                    { fontFamily: 'Inter_400Regular', fontSize: 12 }
                  ),
                  dimensions.width
                )}
              >
                {'Create'}
              </Text>
            </View>
          </Touchable>
        </View>

        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flex: 1 },
            dimensions.width
          )}
        ></View>
        {/* Filter View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'flex-end' },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('FilterEventsScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', gap: 4 },
                dimensions.width
              )}
            >
              <Icon name={'Ionicons/options-outline'} size={24} />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text 2'].style,
                    { fontFamily: 'Inter_400Regular', fontSize: 12 }
                  ),
                  dimensions.width
                )}
              >
                {'Filter'}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>

      <SupabaseEventsApi.FetchGetEventsGET select={'*'}>
        {({ loading, error, data, refetchGetEvents }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <MapView
              apiKey={'AIzaSyBzktToWosjNgrrUawZnbslB9NSXSXCkwo'}
              autoClusterMarkers={false}
              autoClusterMarkersDistanceMeters={10000}
              customMapStyle={'Lorem ipsum dolor sit amet'}
              keyExtractor={(mapViewData, index) =>
                mapViewData?.id ??
                mapViewData?.uuid ??
                index?.toString() ??
                JSON.stringify(mapViewData)
              }
              listKey={'UHBqOUuL'}
              loadingEnabled={true}
              markersData={(() => {
                const e = Constants['filteredEvents'];
                console.log('jhjhj', e);
                return e;
              })()}
              moveOnMarkerPress={true}
              renderItem={({ item, index }) => {
                const mapViewData = item;
                return (
                  <>
                    <MapCircle
                      fillColor={
                        palettes['Trail Twin']['Radius Circle - Trail Twin']
                      }
                      latitude={48.738521}
                      longitude={-122.481657}
                      radius={15000}
                      strokeColor={
                        palettes['Trail Twin']['Primary Green - Trail Twin']
                      }
                    />
                    <MapMarker
                      androidUseDefaultIconImplementation={false}
                      flat={false}
                      pinImageSize={50}
                      tracksViewChanges={true}
                      latitude={getLat(mapViewData)}
                      longitude={getLon(mapViewData)}
                      pinImage={imageSource(Images['location2'])}
                    >
                      <MapCallout showTooltip={true}>
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              height: 132,
                              justifyContent: 'center',
                              position: 'relative',
                              width: 170,
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginBottom: 8,
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            {/* Title View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'auto',
                                  flexDirection: 'row',
                                  gap: 0,
                                  justifyContent: 'center',
                                  marginBottom: 2,
                                  position: 'relative',
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
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
                                      fontSize: 18,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {mapViewData?.event_name}
                              </Text>
                            </View>
                            {/* Skill and Ride Type 2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  { flexDirection: 'row' },
                                  dimensions.width
                                )}
                              >
                                {/* Ride Type */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  ellipsizeMode={'tail'}
                                  numberOfLines={2}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.Brand['Secondary Text'],
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 12,
                                      lineHeight: 24,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {mapViewData?.event_type}
                                  {' - '}
                                </Text>
                                {/* Skill */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  ellipsizeMode={'tail'}
                                  numberOfLines={2}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.Brand['Secondary Text'],
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 12,
                                      lineHeight: 24,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {formatJSON(mapViewData?.skill_level)}
                                </Text>
                              </View>
                            </View>
                            {/* Date View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 0,
                                  justifyContent: 'center',
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
                                    fontSize: 12,
                                  },
                                  dimensions.width
                                )}
                              >
                                {formatDate(mapViewData?.date)}
                                {', '}
                                {formatHours(mapViewData?.start_time)}{' '}
                                {formatAmPm(ampm, mapViewData?.start_time)}
                              </Text>
                            </View>
                          </View>
                          {/* View Event */}
                          <Button
                            iconPosition={'left'}
                            onPress={() => {
                              try {
                                setGlobalVariableValue({
                                  key: 'loading',
                                  value: true,
                                });
                                navigation.navigate('EventDetailsScreen', {
                                  event_id: mapViewData?.id,
                                });
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
                                  fontSize: 14,
                                  height: 5,
                                  width: 152,
                                }
                              ),
                              dimensions.width
                            )}
                            title={'View Event'}
                          />
                        </View>
                      </MapCallout>
                    </MapMarker>
                  </>
                );
              }}
              scrollEnabled={true}
              showsCompass={false}
              zoomEnabled={true}
              {...GlobalStyles.MapViewStyles(theme)['Map View'].props}
              followsUserLocation={true}
              latitude={48.738521}
              loadingBackgroundColor={
                palettes['Trail Twin']['Background - Trail Twin']
              }
              loadingIndicatorColor={
                palettes['Trail Twin']['Primary Green - Trail Twin']
              }
              longitude={-122.481657}
              mapType={'satellite'}
              provider={'google'}
              rotateEnabled={false}
              showsPointsOfInterest={false}
              showsUserLocation={true}
              style={StyleSheet.applyWidth(
                GlobalStyles.MapViewStyles(theme)['Map View'].style,
                dimensions.width
              )}
              zoom={9}
            />
          );
        }}
      </SupabaseEventsApi.FetchGetEventsGET>
      {/* Button View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            borderBottomWidth: 0,
            borderColor: theme.colors.border.brand,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderTopWidth: 1,
            borderWidth: 1,
            bottom: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            left: 0,
            paddingBottom: 18,
            paddingLeft: 54,
            paddingRight: 54,
            paddingTop: 32,
            position: 'absolute',
            right: 0,
            zIndex: 1,
          },
          dimensions.width
        )}
      >
        {/* View Rides */}
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
                  palettes['Trail Twin']['Secondary Green #2 - Trail Twin'],
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                height: 5,
                marginBottom: 24,
                marginTop: 24,
                width: '100%',
              }
            ),
            dimensions.width
          )}
          title={'View List of Rides'}
        />
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
    </ScreenContainer>
  );
};

export default withTheme(EventMapScreen);
