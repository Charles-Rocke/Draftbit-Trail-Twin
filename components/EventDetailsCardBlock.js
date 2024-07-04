import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  Circle,
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
      id={props.event_id ?? 26}
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
                        backgroundColor: 'rgb(245, 245, 245)',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Image View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderRadius: 8,
                          height: 240,
                          width: '100%',
                          zIndex: 1,
                        },
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
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'flex-end',
                              flexDirection: 'row',
                              marginTop: 32,
                            },
                            dimensions.width
                          )}
                        >
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 32,
                              },
                              dimensions.width
                            )}
                          >
                            <Circle
                              {...GlobalStyles.CircleStyles(theme)['Circle']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.CircleStyles(theme)['Circle']
                                    .style,
                                  {
                                    backgroundColor: 'rgb(245, 245, 245)',
                                    marginLeft: 0,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {/* Back */}
                              <Icon
                                size={24}
                                color={theme.colors['Strong']}
                                name={'AntDesign/arrowleft'}
                                style={StyleSheet.applyWidth(
                                  {
                                    marginBottom: 5,
                                    marginLeft: 5,
                                    marginRight: 5,
                                    marginTop: 5,
                                  },
                                  dimensions.width
                                )}
                              />
                            </Circle>
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                    {/* Event Desc and Details View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'flex-start',
                          paddingLeft: 32,
                          paddingRight: 32,
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
                            marginTop: 32,
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
                            {'\n'}
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
                            {null}
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
                            {null}
                            {' - '}
                            {null}
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
                                fontFamily: 'Inter_200ExtraLight',
                                fontSize: 12,
                              },
                              dimensions.width
                            )}
                          >
                            {null}
                          </Text>
                        </View>
                      </View>
                      {/* Divider 3 */}
                      <Divider
                        color={theme.colors.divider}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
                            { marginBottom: 32, marginTop: 32, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Desc View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { width: '100%' },
                          dimensions.width
                        )}
                      >
                        {/* Short Description */}
                        <Text
                          accessible={true}
                          ellipsizeMode={'tail'}
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Medium'],
                              fontFamily: 'Inter_300Light',
                              fontSize: 14,
                              lineHeight: 24,
                              textAlign: 'left',
                            },
                            dimensions.width
                          )}
                        >
                          {
                            'Short description describing the ride. Maybe we could put a word cap to keep it short and simple.'
                          }
                        </Text>
                      </View>
                      {/* Divider 2 */}
                      <Divider
                        color={theme.colors.divider}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
                            { marginBottom: 32, marginTop: 32, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Button View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { marginBottom: 32, marginTop: 32, width: '100%' },
                          dimensions.width
                        )}
                      >
                        {/* Join Button */}
                        <Button
                          iconPosition={'left'}
                          onPress={() => {
                            try {
                              navigation.navigate('JoinEventScreen', {
                                event_id: props.event_id ?? 26,
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
                                fontSize: 18,
                              }
                            ),
                            dimensions.width
                          )}
                          title={'Join'}
                        />
                      </View>
                      {/* Divider 4 */}
                      <Divider
                        color={theme.colors.divider}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
                            { marginBottom: 32, marginTop: 32, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Host and Desc View */}
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
                        {/* User image */}
                        <Image
                          resizeMode={'cover'}
                          source={{
                            uri: 'https://d1nymbkeomeoqg.cloudfront.net/photos/27/68/398347_13844_XL.jpg',
                          }}
                          style={StyleSheet.applyWidth(
                            {
                              borderRadius: 100,
                              height: 80,
                              marginRight: 16,
                              width: 80,
                            },
                            dimensions.width
                          )}
                        />
                        {/* Hosted by and Name View */}
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'flex-start' },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                { fontFamily: 'Inter_300Light', fontSize: 18 }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Organised by\n'}
                          </Text>
                          {/* Name and Age View */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 8,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Host Name Text */}
                            <Text
                              accessible={true}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors['Strong'],
                                  fontFamily: 'Inter_300Light',
                                  fontSize: 14,
                                  lineHeight: 20,
                                  marginRight: 12,
                                  opacity: 1,
                                },
                                dimensions.width
                              )}
                            >
                              {listData?.host_name}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Divider
                        color={theme.colors.divider}
                        {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.DividerStyles(theme)['Divider'].style,
                            { marginBottom: 32, marginTop: 32, width: '100%' }
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
