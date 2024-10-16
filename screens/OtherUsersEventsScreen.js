import React from 'react';
import {
  Button,
  Icon,
  LoadingIndicator,
  ScreenContainer,
  SectionHeader,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  SimpleStyleSectionList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as EventPhotosApi from '../apis/EventPhotosApi.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import createEventStatus from '../global-functions/createEventStatus';
import filterEvents from '../global-functions/filterEvents';
import filterEventsByUserId from '../global-functions/filterEventsByUserId';
import formatAmPm from '../global-functions/formatAmPm';
import formatHours from '../global-functions/formatHours';
import formatString from '../global-functions/formatString';
import hasEvents from '../global-functions/hasEvents';
import sortEvents from '../global-functions/sortEvents';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as DateUtils from '../utils/DateUtils';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { True: null };

const OtherUsersEventsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [ampm, setAmpm] = React.useState('');
  const [hasEvents, setHasEvents] = React.useState(false);
  const supabaseEventsUpdateEventStatusPATCH =
    SupabaseEventsApi.useUpdateEventStatusPATCH();
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
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          { paddingLeft: 24, paddingRight: 24 },
          dimensions.width
        )}
      >
        <SupabaseEventsApi.FetchGetEventsGET
          handlers={{
            onData: fetchData => {
              const handler = async () => {
                try {
                  const events = (
                    await SupabaseEventsApi.getEventsGET(Constants, {
                      select: '*',
                    })
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
              <SimpleStyleSectionList
                data={(() => {
                  const e = filterEventsByUserId(
                    fetchData,
                    'a07137ad-7c9f-412e-b96e-347d26271e3e'
                  );
                  console.log(
                    sortEvents(
                      filterEventsByUserId(
                        fetchData,
                        '3ff9525f-2476-406a-9dfc-3cb99fa9dca1'
                      )
                    ),
                    e
                  );
                  return e;
                })()}
                estimatedItemSize={50}
                horizontal={false}
                keyExtractor={(sectionListData, index) =>
                  sectionListData?.id ??
                  sectionListData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(sectionListData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'iIB9RARY'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, section, index }) => {
                  const sectionListData = item;
                  return (
                    <>
                      <SectionHeader
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor:
                              palettes['Trail Twin']['Olive - Trail Twin'],
                            height: 50,
                            justifyContent: 'center',
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                          selectionColor={
                            palettes['Trail Twin']['Primary Green - Trail Twin']
                          }
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text 2'].style,
                              {
                                fontFamily: 'Inter_400Regular',
                                fontSize: 22,
                                marginLeft: 24,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {section}
                          {' Rides'}
                        </Text>
                      </SectionHeader>

                      <View
                        onLayout={event => {
                          const handler = async () => {
                            try {
                              (
                                await supabaseEventsUpdateEventStatusPATCH.mutateAsync(
                                  {
                                    event_status: createEventStatus(
                                      sectionListData?.date
                                    ),
                                    id: sectionListData?.id,
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
                            marginBottom: 24,
                            marginTop: 24,
                            overflow: 'hidden',
                          },
                          dimensions.width
                        )}
                      >
                        <Touchable>
                          <EventPhotosApi.FetchGetEventPhotoGET>
                            {({
                              loading,
                              error,
                              data,
                              refetchGetEventPhoto,
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
                                <Image
                                  resizeMode={'cover'}
                                  {...GlobalStyles.ImageStyles(theme)['Image']
                                    .props}
                                  source={imageSource(
                                    Images['screenshot20240812at21145pm']
                                  )}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ImageStyles(theme)['Image']
                                        .style,
                                      {
                                        borderRadius: 12,
                                        height: 300,
                                        width: '100%',
                                      }
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
                                  marginBottom: 6,
                                  position: 'relative',
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Title View */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { flex: 1 },
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
                                        fontSize: 24,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {sectionListData?.event_name}
                                </Text>
                              </View>
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
                                  {sectionListData?.event_type}
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
                                  {formatString(sectionListData?.skill_level)}
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
                              {/* Trails */}
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
                                {'Trails: '}
                                {sectionListData?.trail_names}
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
                                {sectionListData?.date}
                                {', '}
                                {formatHours(sectionListData?.start_time)}{' '}
                                {formatAmPm(ampm, undefined)}
                                {', Party Cloudy'}
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
                            {/* View Event */}
                            <Button
                              iconPosition={'left'}
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    setGlobalVariableValue({
                                      key: 'loading',
                                      value: true,
                                    });
                                    undefined;
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
                                    marginBottom: 16,
                                    width: '100%',
                                  }
                                ),
                                dimensions.width
                              )}
                              title={'View Event'}
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
                        </Touchable>
                      </View>
                    </>
                  );
                }}
                inverted={false}
                listComponent={'FlatList'}
                sectionKey={'event_status'}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                stickyHeader={false}
                stickyHeaderHiddenOnScroll={false}
              />
            );
          }}
        </SupabaseEventsApi.FetchGetEventsGET>
        {/* Hosts Evets */}
        <>
          {!hasEvents ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes['Trail Twin']['Olive - Trail Twin'],
                  height: 50,
                  justifyContent: 'center',
                  marginBottom: 32,
                  width: '100%',
                },
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
                      fontFamily: 'Inter_400Regular',
                      fontSize: 22,
                      marginLeft: 24,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Hosted Rides'}
              </Text>
            </View>
          )}
        </>
        {/* Fetch 2 */}
        <SupabaseEventsApi.FetchGetEventByHostIdGET
          handlers={{
            onData: fetch2Data => {
              try {
                setHasEvents(hasEvents(fetch2Data));
              } catch (err) {
                console.error(err);
              }
            },
          }}
          host_id={Constants['otherUserId']}
          select={'*'}
        >
          {({ loading, error, data, refetchGetEventByHostId }) => {
            const fetch2Data = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <SimpleStyleFlatList
                data={fetch2Data}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'y0fHwGnY'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <>
                      {/* View 2 */}
                      <View
                        onLayout={event => {
                          try {
                            console.log(
                              filterEventsByUserId(
                                fetchData,
                                '3ff9525f-2476-406a-9dfc-3cb99fa9dca1'
                              )
                            );
                          } catch (err) {
                            console.error(err);
                          }
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
                          <EventPhotosApi.FetchGetEventPhotoGET>
                            {({
                              loading,
                              error,
                              data,
                              refetchGetEventPhoto,
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
                                <Image
                                  resizeMode={'cover'}
                                  {...GlobalStyles.ImageStyles(theme)['Image']
                                    .props}
                                  source={imageSource(
                                    Images['screenshot20240812at21145pm']
                                  )}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ImageStyles(theme)['Image']
                                        .style,
                                      {
                                        borderRadius: 12,
                                        height: 300,
                                        width: '100%',
                                      }
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
                                  marginBottom: 6,
                                  position: 'relative',
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Title View */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { flex: 1 },
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
                                        fontSize: 24,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {listData?.event_name}
                                </Text>
                              </View>
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
                                  {formatString(listData?.skill_level)}
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
                              {/* Trail */}
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
                                {DateUtils.format(listData?.date, undefined)}
                                {', '}
                                {listData?.start_time}{' '}
                                {formatAmPm(ampm, undefined)}
                                {', Party Cloudy'}
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
                            <Button
                              iconPosition={'left'}
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    setGlobalVariableValue({
                                      key: 'loading',
                                      value:
                                        props.route?.params?.True ??
                                        defaultProps.True,
                                    });
                                    undefined;
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
                    </>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
              />
            );
          }}
        </SupabaseEventsApi.FetchGetEventByHostIdGET>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(OtherUsersEventsScreen);
