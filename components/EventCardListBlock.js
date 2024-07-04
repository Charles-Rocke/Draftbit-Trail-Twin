import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Icon,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const EventCardListBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

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
                      alignItems: 'stretch',
                      backgroundColor: 'rgb(245, 245, 245)',
                      borderColor: theme.colors['Divider'],
                      borderRadius: 8,
                      borderWidth: 1,
                      marginBottom: 72,
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
                          alignItems: 'flex-start',
                          alignSelf: 'center',
                          marginBottom: 32,
                          marginTop: 32,
                          paddingLeft: 32,
                          paddingRight: 32,
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Title and Riders View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              { fontFamily: 'Inter_300Light', fontSize: 24 }
                            ),
                            dimensions.width
                          )}
                        >
                          {listData?.event_name}
                        </Text>
                      </View>
                      {/* Location and Trail View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 8,
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
                              fontFamily: 'Inter_300Light',
                              fontSize: 14,
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
                            marginBottom: 8,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Date Icon */}
                        <Icon
                          color={theme.colors['Strong']}
                          name={'AntDesign/calendar'}
                          size={20}
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: 'rgb(255, 255, 255)',
                              marginRight: 8,
                            },
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
                              color: theme.colors['Medium'],
                              fontFamily: 'Inter_300Light',
                              fontSize: 14,
                              lineHeight: 24,
                            },
                            dimensions.width
                          )}
                        >
                          {listData?.date}
                          {' - '}
                          {listData?.start_time}
                        </Text>
                      </View>
                      {/* Riders View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 8,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Riders Icon */}
                        <Icon
                          color={theme.colors['Strong']}
                          name={'MaterialCommunityIcons/bike'}
                          size={20}
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: 'rgb(255, 255, 255)',
                              marginRight: 8,
                            },
                            dimensions.width
                          )}
                        />
                        {/* Riders Text */}
                        <Text
                          accessible={true}
                          ellipsizeMode={'tail'}
                          numberOfLines={2}
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Medium'],
                              fontFamily: 'Inter_300Light',
                              fontSize: 14,
                              lineHeight: 24,
                            },
                            dimensions.width
                          )}
                        >
                          {'6 Riders'}
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
                        <Text
                          accessible={true}
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors.medium,
                              fontFamily: 'Inter_300Light',
                              fontSize: 14,
                            },
                            dimensions.width
                          )}
                        >
                          {listData?.tags?.[0]}
                        </Text>
                      </View>
                    </View>
                    {/* Button View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          marginBottom: 32,
                          paddingLeft: 32,
                          paddingRight: 32,
                          width: '100%',
                        },
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
                              backgroundColor: 'rgb(48, 93, 35)',
                              fontFamily: 'Inter_300Light',
                              fontSize: 14,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'Learn More'}
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
