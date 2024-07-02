import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import extractTagsFormatter from '../global-functions/extractTagsFormatter';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Circle,
  Divider,
  Icon,
  SimpleStyleFlatList,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, ImageBackground, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const DetailedEventDescriptionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <SupabaseEventsApi.FetchGetSingleEventGET
      id={props.event_id ?? 1}
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
            listKey={'OpmtnrFQ'}
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
                      { marginTop: 0 },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: theme.colors.surface,
                          borderBottomWidth: 1,
                          borderColor: theme.colors.divider,
                          borderLeftWidth: 1,
                          borderRadius: 8,
                          borderRightWidth: 1,
                          borderTopWidth: 1,
                          marginBottom: 0,
                          marginLeft: 0,
                          marginRight: 0,
                          marginTop: 0,
                          overflow: 'hidden',
                        },
                        dimensions.width
                      )}
                    >
                      <Touchable>
                        <View
                          style={StyleSheet.applyWidth(
                            { height: 240 },
                            dimensions.width
                          )}
                        >
                          <ImageBackground
                            resizeMode={'cover'}
                            source={{
                              uri: 'https://nsmb.com/media/images/ww_191_header.2e16d0ba.fill-460x259.jpg',
                            }}
                            style={StyleSheet.applyWidth(
                              {
                                borderRadius: theme.roundness,
                                height: '100%',
                                width: '100%',
                              },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-end',
                                  flexDirection: 'row',
                                  marginTop: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {/* View 2 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { alignItems: 'flex-start', marginLeft: 12 },
                                  dimensions.width
                                )}
                              >
                                <Circle
                                  {...GlobalStyles.CircleStyles(theme)['Circle']
                                    .props}
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.CircleStyles(theme)['Circle']
                                      .style,
                                    dimensions.width
                                  )}
                                >
                                  {/* Back */}
                                  <Icon
                                    size={24}
                                    color={theme.colors.internalPrimaryColor}
                                    name={'AntDesign/arrowleft'}
                                  />
                                </Circle>
                              </View>

                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    backgroundColor: theme.colors.primary,
                                    borderBottomLeftRadius: 8,
                                    borderTopLeftRadius: 8,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    paddingBottom: 4,
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    paddingTop: 4,
                                    position: 'absolute',
                                    right: 0,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  accessible={true}
                                  ellipsizeMode={'tail'}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: theme.colors.surface,
                                      fontFamily: 'Poppins_500Medium',
                                      fontSize: 10,
                                    },
                                    dimensions.width
                                  )}
                                  textBreakStrategy={'highQuality'}
                                >
                                  {'# Riders Going\n'}
                                </Text>
                              </View>
                            </View>
                          </ImageBackground>
                        </View>

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
                            {/* Event Name Title */}
                            <Text
                              accessible={true}
                              ellipsizeMode={'tail'}
                              numberOfLines={2}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.strong,
                                  fontFamily: 'Poppins_600SemiBold',
                                  fontSize: 18,
                                  marginBottom: 6,
                                },
                                dimensions.width
                              )}
                              textBreakStrategy={'highQuality'}
                            >
                              {listData?.event_name}
                              {'\n'}
                            </Text>
                            {/* Date and Time */}
                            <Text
                              accessible={true}
                              ellipsizeMode={'tail'}
                              numberOfLines={2}
                              style={StyleSheet.applyWidth(
                                { color: theme.colors.medium, lineHeight: 24 },
                                dimensions.width
                              )}
                            >
                              {'Date: '}
                              {listData?.date}
                              {'\nStart Time: '}
                              {listData?.start_time}
                            </Text>
                            {/* Location and Trails */}
                            <Text
                              accessible={true}
                              ellipsizeMode={'tail'}
                              numberOfLines={2}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.medium,
                                  lineHeight: 24,
                                  marginBottom: 32,
                                },
                                dimensions.width
                              )}
                            >
                              {'Location - Trails'}
                            </Text>
                            {/* Divider 2 */}
                            <Divider
                              {...GlobalStyles.DividerStyles(theme)['Divider']
                                .props}
                              color={theme.colors['Divider']}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.DividerStyles(theme)['Divider']
                                  .style,
                                dimensions.width
                              )}
                            />
                            {/* Short Description */}
                            <Text
                              accessible={true}
                              ellipsizeMode={'tail'}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.internalSecondaryDark,
                                  fontFamily: 'OpenSans_400Regular',
                                  fontSize: 14,
                                  lineHeight: 24,
                                  marginBottom: 32,
                                  marginTop: 32,
                                },
                                dimensions.width
                              )}
                            >
                              {
                                'Short description describing the ride. Maybe we could put a word cap to keep it word and simple.'
                              }
                            </Text>
                            {/* Divider 3 */}
                            <Divider
                              {...GlobalStyles.DividerStyles(theme)['Divider']
                                .props}
                              color={theme.colors['Divider']}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.DividerStyles(theme)['Divider']
                                  .style,
                                dimensions.width
                              )}
                            />
                            {/* Divider 4 */}
                            <Divider
                              {...GlobalStyles.DividerStyles(theme)['Divider']
                                .props}
                              color={theme.colors['Divider']}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.DividerStyles(theme)['Divider']
                                  .style,
                                dimensions.width
                              )}
                            />
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  flexWrap: 'wrap',
                                  marginBottom: 32,
                                  marginTop: 32,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  },
                                  dimensions.width
                                )}
                              >
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
                                  {extractTagsFormatter(listData?.tags)}
                                  {' \n'}
                                </Text>
                              </View>
                              <Spacer bottom={8} left={8} right={8} top={8} />
                              {/* Spacer 2 */}
                              <Spacer bottom={8} left={8} right={8} top={8} />
                              <Spacer bottom={8} left={8} right={8} top={8} />
                            </View>
                          </View>
                        </View>
                      </Touchable>
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

export default withTheme(DetailedEventDescriptionBlock);
