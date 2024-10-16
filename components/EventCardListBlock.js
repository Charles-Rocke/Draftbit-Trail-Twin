import React from 'react';
import {
  Button,
  Icon,
  LoadingIndicator,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as EventPhotosApi from '../apis/EventPhotosApi.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import FilterUpcomingAndTodaysEvents from '../global-functions/FilterUpcomingAndTodaysEvents';
import createEventStatus from '../global-functions/createEventStatus';
import filterEvents from '../global-functions/filterEvents';
import formatAmPm from '../global-functions/formatAmPm';
import formatDate from '../global-functions/formatDate';
import formatHours from '../global-functions/formatHours';
import formatJSON from '../global-functions/formatJSON';
import sortEvents from '../global-functions/sortEvents';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const EventCardListBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [ampm, setAmpm] = React.useState('');
  const [weather, setWeather] = React.useState([]);
  const reverseArray = data => {
    return data.reverse();
  };

  // Filters events based on the search query
  const filterEvents = (Variables, setGlobalVariableValue, data) => {
    // Function to filter and sort data based on input term
    // function filterAndSortData(inputTerm) {
    const filteredData = data.filter(item => {
      // Modify conditions according to your search criteria
      console.log(data);
      return item.address
        .toLowerCase()
        .includes(Variables.searchAndFilterQuery.toLowerCase());
    });

    //set screen variable 'search_is_empty' default to 'false'
    // setSearch_is_empty(false);

    // // Check if the filtered data is empty
    // if (filteredData.length === 0) {
    //   setSearch_is_empty(true);
    // }

    // Sort the filtered data (if needed)
    // Example: sorting by first name
    filteredData.sort((a, b) => {
      if (a.address < b.address) return -1;
      if (a.address > b.address) return 1;
      return 0;
    });

    return filteredData;
  };
  const supabaseEventsUpdateEventStatusPATCH =
    SupabaseEventsApi.useUpdateEventStatusPATCH();
  React.useEffect(() => {
    const handler = async () => {
      try {
        (await SupabaseEventsApi.getEventsGET(Constants, { select: '*' }))
          ?.json;
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, []);

  return (
    <SupabaseEventsApi.FetchGetEventsGET
      handlers={{
        onData: fetchData => {
          const handler = async () => {
            try {
              const events = (
                await SupabaseEventsApi.getEventsGET(Constants, { select: '*' })
              )?.json;
              setGlobalVariableValue({
                key: 'filteredEvents',
                value: filterEvents(
                  events,
                  Constants['eventTypeFilter'],
                  Constants['tagsFilter'],
                  Constants['rideNameFilter'],
                  Constants['trailFilter'],
                  Constants['skillLevelFilter'],
                  Constants['minDateFilter'],
                  Constants['maxDateFilter'],
                  undefined,
                  undefined
                ),
              });
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        },
      }}
      select={'*'}
    >
      {({ loading, error, data, refetchGetEvents }) => {
        const fetchData = data?.json;
        if (loading) {
          return <ActivityIndicator />;
        }

        if (error || data?.status < 200 || data?.status >= 300) {
          return <ActivityIndicator />;
        }

        return (
          <SimpleStyleFlatList
            data={sortEvents(FilterUpcomingAndTodaysEvents(fetchData))}
            horizontal={false}
            keyExtractor={(listData, index) =>
              listData?.id ??
              listData?.uuid ??
              index?.toString() ??
              JSON.stringify(listData)
            }
            keyboardShouldPersistTaps={'never'}
            listKey={'xT0hVDb1'}
            nestedScrollEnabled={false}
            numColumns={1}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => {
              const listData = item;
              return (
                <View
                  onLayout={event => {
                    const handler = async () => {
                      try {
                        (
                          await supabaseEventsUpdateEventStatusPATCH.mutateAsync(
                            {
                              event_status: createEventStatus(listData?.date),
                              id: listData?.id,
                            }
                          )
                        )?.json;
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      backgroundColor:
                        palettes['Trail Twin']['Background - Trail Twin'],
                      borderColor: theme.colors.border.brand,
                      borderRadius: 12,
                      borderWidth: 0,
                      marginBottom: 56,
                      overflow: 'hidden',
                    },
                    dimensions.width
                  )}
                >
                  <Touchable>
                    <EventPhotosApi.FetchGetEventPhotoGET
                      event_id={listData?.id}
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
                          <Image
                            resizeMode={'cover'}
                            {...GlobalStyles.ImageStyles(theme)['Image'].props}
                            source={imageSource(
                              Images['screenshot20230807at101342am']
                            )}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageStyles(theme)['Image'].style,
                                { borderRadius: 12, height: 300, width: '100%' }
                              ),
                              dimensions.width
                            )}
                          />
                        );
                      }}
                    </EventPhotosApi.FetchGetEventPhotoGET>
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-start',
                          alignSelf: 'center',
                          marginTop: 24,
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
                            alignItems: 'flex-start',
                            alignSelf: 'auto',
                            flexDirection: 'column',
                            gap: 0,
                            justifyContent: 'flex-start',
                            marginBottom: 6,
                            position: 'relative',
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <>
                          {!listData?.event_name ? null : (
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)['Text'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text'].style,
                                  {
                                    fontFamily: 'Inter_500Medium',
                                    fontSize: 24,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.event_name}
                            </Text>
                          )}
                        </>
                      </View>
                      {/* Skill and Ride Type 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 6,
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
                                fontSize: 14,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {listData?.event_type}
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
                                fontSize: 14,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {formatJSON(listData?.skill_level)}
                          </Text>
                        </View>
                      </View>
                      {/* Trail View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 6,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Trails Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          ellipsizeMode={'tail'}
                          numberOfLines={2}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_400Regular',
                              fontSize: 14,
                            },
                            dimensions.width
                          )}
                        >
                          {'Trails: '}
                          {listData?.trail_names}
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
                            },
                            dimensions.width
                          )}
                        >
                          {formatDate(listData?.date)}
                          {', '}
                          {formatHours(listData?.start_time)}{' '}
                          {formatAmPm(ampm, listData?.start_time)}
                          {', '}
                          {weather}
                        </Text>
                        <Icon
                          name={'Ionicons/partly-sunny-outline'}
                          size={18}
                          style={StyleSheet.applyWidth(
                            { marginLeft: 5, marginRight: 5 },
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                    {/* Button View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 24,
                          marginTop: 24,
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
                                  setGlobalVariableValue({
                                    key: 'eventDetailsId',
                                    value: listData?.id,
                                  });
                                  console.log(Constants['eventDetailsId']);
                                  await waitUtil({ milliseconds: 1000 });
                                  navigation.navigate('EventDetailsScreen', {
                                    event_id: Constants['eventDetailsId'],
                                  });
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
                                  fontSize: 14,
                                  height: 15,
                                  width: '100%',
                                }
                              ),
                              dimensions.width
                            )}
                            title={'View Event'}
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
                  </Touchable>
                </View>
              );
            }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            inverted={false}
            style={StyleSheet.applyWidth(
              { flexDirection: 'column' },
              dimensions.width
            )}
          />
        );
      }}
    </SupabaseEventsApi.FetchGetEventsGET>
  );
};

export default withTheme(EventCardListBlock);
