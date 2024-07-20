import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import Images from '../config/Images';
import formatDate from '../global-functions/formatDate';
import formatTags from '../global-functions/formatTags';
import formatTime from '../global-functions/formatTime';
import formatTotalRiders from '../global-functions/formatTotalRiders';
import getAttendeesCount from '../global-functions/getAttendeesCount';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Divider,
  Icon,
  SimpleStyleFlatList,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const EventDetailsCardBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <SupabaseEventsApi.FetchGetSingleEventGET
      id={props.event_id ?? 121}
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
          <SimpleStyleFlatList
            data={fetchData}
            horizontal={false}
            inverted={false}
            keyExtractor={(listData, index) =>
              listData?.id ?? listData?.uuid ?? index.toString()
            }
            keyboardShouldPersistTaps={'never'}
            listKey={'2cNopObg'}
            nestedScrollEnabled={false}
            numColumns={1}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => {
              const listData = item;
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
                      <ImageBackground
                        resizeMode={'cover'}
                        source={Images.screenshot20230807at101342am}
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, height: '100%', width: '100%' },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Event Desc and Details View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-start',
                          flexDirection: 'column',
                          paddingLeft: 24,
                          paddingRight: 24,
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
                            marginTop: 24,
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
                              gap: 0,
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
                              {...GlobalStyles.TextStyles(theme)['Text'].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text'].style,
                                  {
                                    fontFamily: 'Inter_400Regular',
                                    fontSize: 18,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {listData?.event_name}
                            </Text>
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
                                          color:
                                            palettes.Brand['Secondary Text'],
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
                        {/* Trails View */}
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
                            handlers={{
                              onData: fetchData => {
                                try {
                                  getAttendeesCount(listData);
                                } catch (err) {
                                  console.error(err);
                                }
                              },
                            }}
                            id={listData?.id}
                            trail_names={'trail_names'}
                          >
                            {({
                              loading,
                              error,
                              data,
                              refetchGetTrailNames,
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
                                                palettes.Brand[
                                                  'Secondary Text'
                                                ],
                                              fontFamily: 'Inter_300Light',
                                              fontSize: 12,
                                              lineHeight: 24,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {'Trails Attending: '}
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
                            {'Address: '}
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
                            {'Date: '}
                            {formatDate(listData?.date)}
                            {', '}
                            {formatTime(listData?.start_time)}
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
                            { marginBottom: 24, marginTop: 24, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Tags View 3 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            marginBottom: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Tags Icon */}
                        <Icon
                          color={theme.colors.text.strong}
                          name={'AntDesign/tagso'}
                          size={20}
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
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_400Regular',
                              fontSize: 16,
                            },
                            dimensions.width
                          )}
                        >
                          {formatTags(listData?.tags)}
                        </Text>
                      </View>
                      {/* Desc View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: '100%' },
                          dimensions.width
                        )}
                      >
                        <SupabaseEventsApi.FetchGetEventDescriptionGET
                          event_description={'event_description'}
                          id={listData?.id}
                        >
                          {({
                            loading,
                            error,
                            data,
                            refetchGetEventDescription,
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
                                      {/* Description */}
                                      <Text
                                        accessible={true}
                                        ellipsizeMode={'tail'}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.Brand['Secondary Text'],
                                            fontFamily: 'Inter_300Light',
                                            fontSize: 12,
                                            lineHeight: 24,
                                            textAlign: 'left',
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'Description: '}
                                        {listData?.event_description}
                                      </Text>
                                    </>
                                  );
                                }}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                              />
                            );
                          }}
                        </SupabaseEventsApi.FetchGetEventDescriptionGET>
                      </View>
                      {/* Divider 2 */}
                      <Divider
                        color={theme.colors.border.brand}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
                            { marginBottom: 48, marginTop: 24, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Button View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: '100%' },
                          dimensions.width
                        )}
                      >
                        {/* Join Button */}
                        <Button
                          iconPosition={'left'}
                          onPress={() => {
                            try {
                              navigation.navigate('JoinEventScreen', {
                                event_id: props.event_id ?? 121,
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
                          title={'Join'}
                        />
                      </View>
                      {/* Divider 4 */}
                      <Divider
                        color={theme.colors.border.brand}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
                            { marginBottom: 24, marginTop: 48, width: '100%' }
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
                            justifyContent: 'space-between',
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Details */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              borderColor: theme.colors.border.brand,
                              borderRadius: 12,
                              borderWidth: 1,
                              flexDirection: 'row',
                              paddingBottom: 16,
                              paddingLeft: 16,
                              paddingRight: 16,
                              paddingTop: 16,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Host Photo */}
                          <Image
                            resizeMode={'cover'}
                            source={{ uri: `${listData?.safety_selfie}` }}
                            style={StyleSheet.applyWidth(
                              { borderRadius: 100, height: 80, width: 80 },
                              dimensions.width
                            )}
                          />
                          <SupabaseEventsApi.FetchGetHostInfoGET
                            host_age={'*'}
                            id={listData?.id}
                            saftey_selfie={'*'}
                          >
                            {({ loading, error, data, refetchGetHostInfo }) => {
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
                                      <View>
                                        <Text
                                          accessible={true}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: theme.colors.text.strong,
                                              fontFamily: 'Inter_700Bold',
                                              fontSize: 14,
                                              marginLeft: 20,
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
                                            style={StyleSheet.applyWidth(
                                              {
                                                color: theme.colors.text.strong,
                                                fontFamily: 'Inter_500Medium',
                                                fontSize: 12,
                                                marginLeft: 20,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.host_name}
                                          </Text>
                                          {/* Host age */}
                                          <Text
                                            accessible={true}
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
                                                  fontFamily: 'Inter_300Light',
                                                  fontSize: 12,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.host_age}
                                          </Text>
                                        </View>
                                      </View>
                                    );
                                  }}
                                  showsHorizontalScrollIndicator={true}
                                  showsVerticalScrollIndicator={true}
                                />
                              );
                            }}
                          </SupabaseEventsApi.FetchGetHostInfoGET>
                        </View>
                      </View>
                      <Divider
                        color={theme.colors.border.brand}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
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
        );
      }}
    </SupabaseEventsApi.FetchGetSingleEventGET>
  );
};

export default withTheme(EventDetailsCardBlock);
