import React from 'react';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
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
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  React.useEffect(() => {
    const handler = async () => {
      try {
        (
          await SupabaseEventsApi.getAttendeesByEventIdGET(Constants, {
            eventId: props.event_id ?? 121,
            select: '*',
          })
        )?.json;
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, []);

  return (
    <SupabaseEventsApi.FetchGetAttendeesByEventIdGET
      eventId={props.event_id ?? 121}
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
                        {/* User image */}
                        <Image
                          resizeMode={'cover'}
                          source={{
                            uri: `${listData?.attendee_safety_selfie}`,
                          }}
                          style={StyleSheet.applyWidth(
                            { borderRadius: 100, height: 110, width: 110 },
                            dimensions.width
                          )}
                        />
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
                          numberOfLines={1}
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'center',
                              color: theme.colors.text.strong,
                              fontFamily: 'Inter_300Light',
                              fontSize: 12,
                              lineHeight: 20,
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {listData?.attendee_name}
                        </Text>
                        {/* Attendee Age Text */}
                        <Text
                          accessible={true}
                          numberOfLines={1}
                          style={StyleSheet.applyWidth(
                            {
                              alignSelf: 'center',
                              color: palettes.Brand['Secondary Text'],
                              fontFamily: 'Inter_300Light',
                              fontSize: 12,
                              lineHeight: 20,
                              textAlign: 'center',
                            },
                            dimensions.width
                          )}
                        >
                          {listData?.attendee_age}
                        </Text>
                      </View>
                    </View>
                  </Touchable>
                </>
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
    </SupabaseEventsApi.FetchGetAttendeesByEventIdGET>
  );
};

export default withTheme(RiderProfileDisplayBlock);
