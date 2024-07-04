import React from 'react';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { SimpleStyleFlatList, Touchable, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const RiderProfileDisplayBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <SupabaseEventsApi.FetchGetAttendeesByEventIdGET
      eventId={props.event_id ?? 26}
      select={'*'}
    >
      {({ loading, error, data, refetchGetAttendeesByEventId }) => {
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
              listData?.id ?? listData?.uuid ?? index.toString()
            }
            keyboardShouldPersistTaps={'never'}
            listKey={'jmFAKtpE'}
            nestedScrollEnabled={false}
            numColumns={1}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => {
              const listData = item;
              return (
                <>
                  {/* User Record */}
                  <Touchable>
                    {/* Image and Name View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'stretch',
                          justifyContent: 'center',
                          marginBottom: 24,
                        },
                        dimensions.width
                      )}
                    >
                      {/* Image View */}
                      <View>
                        {/* User image */}
                        <Image
                          resizeMode={'cover'}
                          source={{
                            uri: 'https://d1nymbkeomeoqg.cloudfront.net/photos/23/51/356641_23375_XL.jpg',
                          }}
                          style={StyleSheet.applyWidth(
                            { borderRadius: 100, height: 140, width: 140 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Name and Age View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginTop: 6,
                            maxWidth: '95%',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Attendee Name Text */}
                        <Text
                          accessible={true}
                          ellipsizeMode={'tail'}
                          numberOfLines={1}
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'center',
                              color: theme.colors['Strong'],
                              fontFamily: 'Inter_300Light',
                              fontSize: 14,
                              lineHeight: 20,
                              marginLeft: 8,
                              marginRight: 8,
                              paddingLeft: 8,
                              paddingRight: 8,
                              textAlign: 'center',
                            },
                            dimensions.width
                          )}
                        >
                          {listData?.attendee_name}
                        </Text>
                      </View>
                    </View>
                  </Touchable>
                </>
              );
            }}
            horizontal={false}
            inverted={false}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            style={StyleSheet.applyWidth(
              {
                alignContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                width: '100%',
              },
              dimensions.width
            )}
          />
        );
      }}
    </SupabaseEventsApi.FetchGetAttendeesByEventIdGET>
  );
};

export default withTheme(RiderProfileDisplayBlock);
