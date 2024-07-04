import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Button,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const JoinEventScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [emailInput, setEmailInput] = React.useState('');
  const [eventIdInputV1, setEventIdInputV1] = React.useState(
    props.route?.params?.event_id ?? 6
  );
  const [joinAttendeeNameInputV1, setJoinAttendeeNameInputV1] =
    React.useState('');
  const [numberInputValue, setNumberInputValue] = React.useState('');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const supabaseEventsCreateAttendeePOST =
    SupabaseEventsApi.useCreateAttendeePOST();

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Background'] },
        dimensions.width
      )}
    >
      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
      >
        <SupabaseEventsApi.FetchGetSingleEventGET
          id={props.route?.params?.event_id ?? 6}
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
                listKey={'UqVrIqzO'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1, paddingBottom: 25 },
                        dimensions.width
                      )}
                    >
                      {/* Title */}
                      <Text
                        accessible={true}
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.strong,
                            fontFamily: 'Inter_500Medium',
                            fontSize: 25,
                            marginLeft: 30,
                            marginTop: 15,
                            opacity: 0.8,
                          },
                          dimensions.width
                        )}
                      >
                        {'Event: '}
                        {listData?.event_name}
                      </Text>
                      {/* sub title */}
                      <Text
                        accessible={true}
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.strong,
                            fontFamily: 'Inter_400Regular',
                            fontSize: 15,
                            marginLeft: 30,
                            marginTop: 15,
                            opacity: 0.4,
                          },
                          dimensions.width
                        )}
                      >
                        {'Please fill in a few details below'}
                      </Text>
                      {/* Full Name */}
                      <View>
                        {/* title */}
                        <Text
                          accessible={true}
                          style={StyleSheet.applyWidth(
                            {
                              color: theme.colors['Medium'],
                              fontFamily: 'Inter_400Regular',
                              marginLeft: 30,
                              marginTop: 35,
                              opacity: 0.85,
                            },
                            dimensions.width
                          )}
                        >
                          {'Your full name'}
                        </Text>
                        {/* Attendee Name Input */}
                        <TextInput
                          autoCapitalize={'none'}
                          autoCorrect={true}
                          changeTextDelay={500}
                          onChangeText={newAttendeeNameInputValue => {
                            try {
                              setJoinAttendeeNameInputV1(
                                newAttendeeNameInputValue
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          webShowOutline={true}
                          placeholder={'Enter your full name'}
                          placeholderTextColor={theme.colors['Light']}
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: theme.colors['Custom Color'],
                              borderBottomWidth: 1,
                              borderColor: theme.colors['Light'],
                              borderLeftWidth: 1,
                              borderRadius: 12,
                              borderRightWidth: 1,
                              borderTopWidth: 1,
                              fontFamily: 'Inter_400Regular',
                              height: 48,
                              marginLeft: 30,
                              marginRight: 30,
                              marginTop: 8,
                              paddingBottom: 8,
                              paddingLeft: 20,
                              paddingRight: 8,
                              paddingTop: 8,
                            },
                            dimensions.width
                          )}
                          value={joinAttendeeNameInputV1}
                        />
                      </View>
                      {/* Confirm */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            marginTop: 45,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Join Event Button */}
                        <Button
                          iconPosition={'left'}
                          onPress={() => {
                            const handler = async () => {
                              try {
                                const successCreateAttendee = (
                                  await supabaseEventsCreateAttendeePOST.mutateAsync(
                                    {
                                      eventIdInputV1:
                                        props.route?.params?.event_id ?? 6,
                                      joinAttendeeNameInputV1:
                                        joinAttendeeNameInputV1,
                                    }
                                  )
                                )?.json;
                                navigation.navigate('EventDetailsScreen', {
                                  event_id: props.route?.params?.event_id ?? 6,
                                });

                                showAlertUtil({
                                  title: 'Success',
                                  message: 'Successfully joined event',
                                  buttonText: 'Ok',
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: theme.colors['Custom Color_38'],
                              borderRadius: 12,
                              color: theme.colors['Custom Color'],
                              fontFamily: 'Inter_500Medium',
                              fontSize: 16,
                              height: 52,
                              marginLeft: 30,
                              marginRight: 30,
                              textAlign: 'center',
                            },
                            dimensions.width
                          )}
                          title={'Join'}
                        />
                      </View>
                    </View>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
              />
            );
          }}
        </SupabaseEventsApi.FetchGetSingleEventGET>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(JoinEventScreen);
