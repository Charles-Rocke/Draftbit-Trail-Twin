import React from 'react';
import { SimpleStyleFlatList, Touchable, withTheme } from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseAttendeesApi from '../apis/SupabaseAttendeesApi.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as SupabaseUsersApi from '../apis/SupabaseUsersApi.js';
import * as UserPhotosApi from '../apis/UserPhotosApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const AttendeesDisplayBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [refreshingbN1REGEy, setRefreshingbN1REGEy] = React.useState(false);

  return (
    <View>
      <SupabaseAttendeesApi.FetchGetUsersByEventIDGET
        event_id={Constants['eventDetailsId']}
        select={'*'}
      >
        {({ loading, error, data, refetchGetUsersByEventID }) => {
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
              keyExtractor={(listData, index) =>
                listData?.id ??
                listData?.uuid ??
                index?.toString() ??
                JSON.stringify(listData)
              }
              keyboardShouldPersistTaps={'never'}
              listKey={'bN1REGEy'}
              nestedScrollEnabled={false}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingbN1REGEy}
                  onRefresh={() => {
                    const handler = async () => {
                      try {
                        setRefreshingbN1REGEy(true);
                        await refetchGetAttendeesByEventId();
                        setRefreshingbN1REGEy(false);
                      } catch (err) {
                        console.error(err);
                        setRefreshingbN1REGEy(false);
                      }
                    };
                    handler();
                  }}
                />
              }
              renderItem={({ item, index }) => {
                const listData = item;
                return (
                  <SupabaseUsersApi.FetchGetUserByUniqueUserIdGET
                    select={'*'}
                    user_id={listData?.user_id}
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

                      if (error || data?.status < 200 || data?.status >= 300) {
                        return <ActivityIndicator />;
                      }

                      return (
                        <>
                          {/* User Record */}
                          <Touchable
                            onPress={() => {
                              try {
                                undefined;
                                navigation.navigate('OtherUsersProfileScreen');
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            {/* Image and Name View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor: '"rgb(253, 253, 245)"',
                                  borderColor: theme.colors.border.brand,
                                  borderRadius: 12,
                                  marginLeft: 24,
                                  marginRight: 24,
                                  maxWidth: 120,
                                  paddingBottom: 12,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                },
                                dimensions.width
                              )}
                            >
                              {/* User Image View */}
                              <View>
                                <UserPhotosApi.FetchGetUserPhotosGET
                                  user_id={fetchData?.[0]?.id}
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
                                        {/* User image */}
                                        <Image
                                          resizeMode={'cover'}
                                          source={imageSource(
                                            Images[
                                              'screenshot20240810at10837pm'
                                            ]
                                          )}
                                          style={StyleSheet.applyWidth(
                                            {
                                              borderRadius: 100,
                                              height: 92,
                                              width: 92,
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
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 8,
                                    justifyContent: 'flex-start',
                                    marginTop: 6,
                                    maxHeight: 110,
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
                                      alignSelf: 'center',
                                      color: theme.colors.text.strong,
                                      fontFamily: 'Inter_400Regular',
                                      fontSize: 14,
                                      lineHeight: 20,
                                      textAlign: 'left',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {fetchData?.[0]?.name}
                                  {','}
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
                                      fontSize: 14,
                                      lineHeight: 20,
                                      textAlign: 'center',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {fetchData?.[0]?.age}
                                </Text>
                              </View>
                            </View>
                          </Touchable>
                        </>
                      );
                    }}
                  </SupabaseUsersApi.FetchGetUserByUniqueUserIdGET>
                );
              }}
              horizontal={false}
              inverted={false}
              numColumns={2}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'flex-start',
                  alignItems: 'stretch',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 32,
                  justifyContent: 'space-around',
                },
                dimensions.width
              )}
            />
          );
        }}
      </SupabaseAttendeesApi.FetchGetUsersByEventIDGET>
    </View>
  );
};

export default withTheme(AttendeesDisplayBlock);
