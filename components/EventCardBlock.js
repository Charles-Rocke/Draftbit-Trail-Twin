import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import MoreDetailsButtonBlock from '../components/MoreDetailsButtonBlock';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Icon,
  SimpleStyleFlatList,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const EventCardBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
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
            renderItem={({ item, index }) => {
              const listData = item;
              return (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors['Background'],
                      borderRadius: 8,
                      marginBottom: 48,
                      overflow: 'hidden',
                    },
                    dimensions.width
                  )}
                >
                  <Touchable>
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={Images.screenshot20230807at101342am}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { borderRadius: 8, height: 240, width: '100%' }
                        ),
                        dimensions.width
                      )}
                    />
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          paddingBottom: 16,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 16,
                        },
                        dimensions.width
                      )}
                    >
                      <View>
                        {/* Title and Riders View */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Ride Title */}
                          <Text
                            accessible={true}
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                            style={StyleSheet.applyWidth(
                              {
                                alignSelf: 'auto',
                                color: theme.colors.strong,
                                fontFamily: 'Poppins_600SemiBold',
                                fontSize: 16,
                                marginBottom: 4,
                              },
                              dimensions.width
                            )}
                            textBreakStrategy={'highQuality'}
                          >
                            {listData?.event_name}
                          </Text>
                          {/* Number of Riders Text */}
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                { color: 'rgb(45, 82, 0)', fontSize: 14 }
                              ),
                              dimensions.width
                            )}
                          >
                            {'# Riders\n'}
                          </Text>
                        </View>
                        {/* Location and Trail View */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              marginBottom: 4,
                            },
                            dimensions.width
                          )}
                        >
                          {/* Location Icon */}
                          <Icon
                            color={theme.colors['Strong']}
                            name={'EvilIcons/location'}
                            size={20}
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: 'rgb(255, 255, 255)',
                                marginRight: 8,
                              },
                              dimensions.width
                            )}
                          />
                          {/* Location Text */}
                          <Text
                            accessible={true}
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors['Medium'],
                                fontSize: 10,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {listData?.address}
                          </Text>
                        </View>
                        {/* Date and Time View */}
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center', flexDirection: 'row' },
                            dimensions.width
                          )}
                        >
                          {/* Date Icon */}
                          <Icon
                            name={'AntDesign/calendar'}
                            size={18}
                            style={StyleSheet.applyWidth(
                              { marginRight: 8 },
                              dimensions.width
                            )}
                          />
                          {/* Date Text */}
                          <Text
                            accessible={true}
                            ellipsizeMode={'tail'}
                            numberOfLines={2}
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.medium,
                                fontSize: 10,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {listData?.date}
                            {' - '}
                            {listData?.start_time}
                            {'\n'}
                          </Text>
                        </View>
                        {/* Tags View */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              marginTop: 12,
                            },
                            dimensions.width
                          )}
                        >
                          {/* View 1 */}
                          <View
                            style={StyleSheet.applyWidth(
                              { alignItems: 'center', flexDirection: 'row' },
                              dimensions.width
                            )}
                          >
                            <Spacer left={2} right={2} />
                            <Text
                              accessible={true}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.medium,
                                  fontFamily: 'Poppins_400Regular',
                                  fontSize: 12,
                                },
                                dimensions.width
                              )}
                            >
                              {listData?.tags?.[0]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <MoreDetailsButtonBlock />
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

export default withTheme(EventCardBlock);
