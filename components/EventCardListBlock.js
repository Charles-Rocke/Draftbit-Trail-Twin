import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import deleteEvent from '../global-functions/deleteEvent';
import formatDate from '../global-functions/formatDate';
import formatTotalRiders from '../global-functions/formatTotalRiders';
import isPastEvent from '../global-functions/isPastEvent';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const EventCardListBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [refreshingxT0hVDb1, setRefreshingxT0hVDb1] = React.useState(false);
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

  return (
    <SupabaseEventsApi.FetchGetEventsGET
      handlers={{
        onData: fetchData => {
          const handler = async () => {
            try {
              const isPastEvent = isPastEvent(fetchData?.date);
              if (isPastEvent) {
                await deleteEvent(undefined);
              } else {
              }
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
            data={fetchData}
            horizontal={false}
            keyExtractor={(listData, index) =>
              listData?.id ?? listData?.uuid ?? index.toString()
            }
            keyboardShouldPersistTaps={'never'}
            listKey={'xT0hVDb1'}
            nestedScrollEnabled={false}
            numColumns={1}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshingxT0hVDb1}
                onRefresh={() => {
                  try {
                    setRefreshingxT0hVDb1(true);
                    if (new Date() ? undefined : undefined) {
                      isPastEvent(undefined);
                    }
                    /* 'Run a Custom Function' action requires configuration: choose a custom function */ setRefreshingxT0hVDb1(
                      false
                    );
                  } catch (err) {
                    console.error(err);
                    setRefreshingxT0hVDb1(false);
                  }
                }}
              />
            }
            renderItem={({ item, index }) => {
              const listData = item;
              return (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'stretch',
                      backgroundColor: '"rgb(253, 253, 245)"',
                      borderColor: theme.colors.border.brand,
                      borderRadius: 12,
                      borderWidth: 0,
                      marginBottom: 48,
                      overflow: 'hidden',
                    },
                    dimensions.width
                  )}
                >
                  {/* Fetch component: no endpoint configured */ null}
                  <Touchable>
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={Images.screenshot20230807at101342am}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { borderRadius: 12, height: 300, width: '100%' }
                        ),
                        dimensions.width
                      )}
                    />
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-start',
                          alignSelf: 'center',
                          marginTop: 12,
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Title and Riders View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'stretch',
                            alignSelf: 'auto',
                            flexDirection: 'row',
                            gap: 0,
                            justifyContent: 'space-between',
                            marginBottom: 1,
                            position: 'relative',
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <View>
                          <>
                            {!listData?.event_name ? null : (
                              <Text
                                accessible={true}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    {
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 16,
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
                        {/* Riders View */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              position: 'relative',
                            },
                            dimensions.width
                          )}
                        >
                          <SupabaseEventsApi.FetchGetAttendeesByEventIdGET
                            eventId={listData?.id}
                            handlers={{
                              onData: fetchData => {
                                try {
                                  const num_attendees = fetchData?.length;
                                  const formattedTotalRiders =
                                    formatTotalRiders(num_attendees);
                                } catch (err) {
                                  console.error(err);
                                }
                              },
                            }}
                            select={'*'}
                          >
                            {({
                              loading,
                              error,
                              data,
                              refetchGetAttendeesByEventId,
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
                                  {/* Riders Text */}
                                  <Text
                                    accessible={true}
                                    ellipsizeMode={'tail'}
                                    numberOfLines={2}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.Brand['Secondary Text'],
                                        fontFamily: 'Inter_300Light',
                                        fontSize: 12,
                                        lineHeight: 24,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {formatTotalRiders(fetchData?.length)}
                                    {' Riders'}
                                  </Text>
                                </>
                              );
                            }}
                          </SupabaseEventsApi.FetchGetAttendeesByEventIdGET>
                        </View>
                      </View>
                      {/* Trail View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 1,
                          },
                          dimensions.width
                        )}
                      >
                        <SupabaseEventsApi.FetchGetTrailNamesGET
                          id={listData?.id}
                          trail_names={'trail_names'}
                        >
                          {({ loading, error, data, refetchGetTrailNames }) => {
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
                              <SimpleStyleFlatList
                                data={fetchData}
                                horizontal={false}
                                inverted={false}
                                keyExtractor={(listData, index) =>
                                  listData?.id ??
                                  listData?.uuid ??
                                  index.toString()
                                }
                                keyboardShouldPersistTaps={'never'}
                                listKey={JSON.stringify(fetchData)}
                                nestedScrollEnabled={false}
                                numColumns={1}
                                onEndReachedThreshold={0.5}
                                renderItem={({ item, index }) => {
                                  const listData = item;
                                  return (
                                    <>
                                      {/* Trails Text */}
                                      <Text
                                        accessible={true}
                                        ellipsizeMode={'tail'}
                                        numberOfLines={2}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.Brand['Secondary Text'],
                                            fontFamily: 'Inter_300Light',
                                            fontSize: 12,
                                            lineHeight: 24,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.trail_names}
                                      </Text>
                                    </>
                                  );
                                }}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                              />
                            );
                          }}
                        </SupabaseEventsApi.FetchGetTrailNamesGET>
                      </View>
                      {/* Address View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 1,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Address Text */}
                        <Text
                          accessible={true}
                          ellipsizeMode={'tail'}
                          numberOfLines={2}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_300Light',
                              fontSize: 12,
                              lineHeight: 24,
                            },
                            dimensions.width
                          )}
                        >
                          {listData?.address}
                        </Text>
                      </View>
                      {/* Date View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 1,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Date Text */}
                        <Text
                          accessible={true}
                          ellipsizeMode={'tail'}
                          numberOfLines={2}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_300Light',
                              fontSize: 12,
                              lineHeight: 24,
                            },
                            dimensions.width
                          )}
                        >
                          {formatDate(listData?.date)}
                          {', '}
                          {listData?.start_time}
                        </Text>
                      </View>
                      {/* Tags View */}
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
                        {/* Tags Text */}
                        <Text
                          accessible={true}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_300Light',
                              fontSize: 12,
                            },
                            dimensions.width
                          )}
                        >
                          {null}
                        </Text>
                      </View>
                    </View>
                    {/* Button View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 12, marginTop: 12, width: '100%' },
                        dimensions.width
                      )}
                    >
                      <Button
                        iconPosition={'left'}
                        onPress={() => {
                          try {
                            navigation.navigate('EventDetailsScreen', {
                              event_id: listData?.id,
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button'].style,
                            {
                              backgroundColor: '"rgb(48, 93, 35)"',
                              borderRadius: 12,
                              fontFamily: 'Inter_300Light',
                              fontSize: 16,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'View Ride'}
                      />
                    </View>
                  </Touchable>
                </View>
              );
            }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            inverted={true}
          />
        );
      }}
    </SupabaseEventsApi.FetchGetEventsGET>
  );
};

export default withTheme(EventCardListBlock);
