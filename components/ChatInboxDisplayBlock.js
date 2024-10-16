import React from 'react';
import {
  Circle,
  Icon,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseUsersApi from '../apis/SupabaseUsersApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import filterOtherUserId from '../global-functions/filterOtherUserId';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  chat_id: 11,
  user_id1: '27857bdc-d8c5-40dd-a527-ee0a097d8d96',
  user_id2: '27857bdc-d8c5-40dd-a527-ee0a097d8y4744',
};

const ChatInboxDisplayBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View>
      {/* Fetch Friends Data */}
      <SupabaseUsersApi.FetchGetUserByUniqueUserIdGET
        select={'*'}
        user_id={filterOtherUserId(
          props.user_id1 ?? defaultProps.user_id1,
          props.user_id2 ?? defaultProps.user_id2,
          Constants['user_id']
        )}
      >
        {({ loading, error, data, refetchGetUserByUniqueUserId }) => {
          const fetchFriendsDataData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <SimpleStyleFlatList
              data={fetchFriendsDataData}
              horizontal={false}
              inverted={false}
              keyExtractor={(listData, index) =>
                listData?.id ??
                listData?.uuid ??
                index?.toString() ??
                JSON.stringify(listData)
              }
              keyboardShouldPersistTaps={'never'}
              listKey={'nWvkThBZ'}
              nestedScrollEnabled={false}
              numColumns={1}
              onEndReachedThreshold={0.5}
              renderItem={({ item, index }) => {
                const listData = item;
                return (
                  <>
                    {/* Chat */}
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate('ChatScreen', {
                            id: props.chat_id ?? defaultProps.chat_id,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor:
                              palettes['Trail Twin']['Background - Trail Twin'],
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingBottom: 12,
                            paddingTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Image */}
                        <View
                          style={StyleSheet.applyWidth(
                            { justifyContent: 'center' },
                            dimensions.width
                          )}
                        >
                          {/* User image */}
                          <Image
                            resizeMode={'cover'}
                            source={imageSource(
                              Images['screenshot20240810at10304pm']
                            )}
                            style={StyleSheet.applyWidth(
                              { borderRadius: 100, height: 58, width: 58 },
                              dimensions.width
                            )}
                          />
                          <Circle
                            size={8}
                            style={StyleSheet.applyWidth(
                              {
                                minWidth: 12,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                zIndex: 1,
                              },
                              dimensions.width
                            )}
                          />
                        </View>
                        {/* Name and Message */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flex: 1,
                              justifyContent: 'center',
                              marginLeft: 16,
                            },
                            dimensions.width
                          )}
                        >
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
                            {/* Name ~ */}
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: theme.colors.text.strong,
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 16,
                                  lineHeight: 20,
                                  opacity: 1,
                                },
                                dimensions.width
                              )}
                            >
                              {listData?.name}
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-end',
                                  alignSelf: 'auto',
                                  flexDirection: 'row',
                                  gap: 8,
                                },
                                dimensions.width
                              )}
                            >
                              <Icon name={'AntDesign/right'} size={14} />
                            </View>
                          </View>
                          {/* Message ~ */}
                          <Text
                            accessible={true}
                            selectable={false}
                            numberOfLines={1}
                            style={StyleSheet.applyWidth(
                              {
                                color: theme.colors.text.strong,
                                fontFamily: 'Inter_300Light',
                                fontSize: 12,
                                lineHeight: 20,
                                marginTop: 8,
                                opacity: 0.5,
                              },
                              dimensions.width
                            )}
                          >
                            {'This is a chat!'}
                          </Text>
                        </View>
                      </View>
                    </Touchable>
                  </>
                );
              }}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
            />
          );
        }}
      </SupabaseUsersApi.FetchGetUserByUniqueUserIdGET>
    </View>
  );
};

export default withTheme(ChatInboxDisplayBlock);
