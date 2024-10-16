import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import LinkingConfiguration from './LinkingConfiguration';
import * as GlobalVariables from './config/GlobalVariableContext';
import filterEvents from './global-functions/filterEvents';
import filterEventsWithRadius from './global-functions/filterEventsWithRadius';
import getUserLat from './global-functions/getUserLat';
import getUserLon from './global-functions/getUserLon';
import ChatScreen from './screens/ChatScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import EditEventScreen from './screens/EditEventScreen';
import EventChatScreen from './screens/EventChatScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import EventInboxScreen from './screens/EventInboxScreen';
import EventMapScreen from './screens/EventMapScreen';
import ExploreEventsScreen from './screens/ExploreEventsScreen';
import FilterEventsScreen from './screens/FilterEventsScreen';
import FilterRidersScreen from './screens/FilterRidersScreen';
import FriendsInboxScreen from './screens/FriendsInboxScreen';
import InboxScreenDisplayOnlyScreen from './screens/InboxScreenDisplayOnlyScreen';
import LoginScreen from './screens/LoginScreen';
import MeetRidersScreen from './screens/MeetRidersScreen';
import MessagingScreenDisplayOnlyScreen from './screens/MessagingScreenDisplayOnlyScreen';
import OtherUsersEventsScreen from './screens/OtherUsersEventsScreen';
import OtherUsersProfileScreen from './screens/OtherUsersProfileScreen';
import PickAMeetupLocationScreen from './screens/PickAMeetupLocationScreen';
import SetupAndEditProfileScreen from './screens/SetupAndEditProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import UsersEventsScreen from './screens/UsersEventsScreen';
import UsersProfileScreen from './screens/UsersProfileScreen';
import palettes from './themes/palettes';
import Breakpoints from './utils/Breakpoints';
import openShareUtil from './utils/openShare';
import parseBoolean from './utils/parseBoolean';
import useWindowDimensions from './utils/useWindowDimensions';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

function DefaultDrawerIcon({ tintColor, navigation }) {
  return (
    <Touchable
      onPress={() => navigation.toggleDrawer()}
      style={[styles.headerContainer, styles.headerContainerLeft]}
    >
      <Icon
        name="EvilIcons/navicon"
        size={27}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </Touchable>
  );
}

function BottomTabNavigator() {
  const theme = useTheme();

  const Constants = GlobalVariables.useValues();

  const tabBarOrDrawerIcons = {
    EventInboxScreen: 'Ionicons/chatbox-outline',
    MeetRidersScreen: 'Ionicons/people-outline',
    EventMapScreen: 'MaterialCommunityIcons/bike',
    UsersProfileScreen: 'Ionicons/person-outline',
    MeetRidersScreen: '',
  };

  return (
    <Tab.Navigator
      initialRouteName="EventMapScreen"
      backBehavior="history"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.colors.background.brand },
        headerTitleAlign: 'center',
        headerTitleStyle: { fontFamily: 'Inter_400Regular', fontSize: 12 },
        tabBarActiveBackgroundColor: theme.colors.background.brand,
        tabBarActiveTintColor:
          palettes['Trail Twin']['Primary Green - Trail Twin'],
        tabBarInactiveBackgroundColor: theme.colors.background.brand,
        tabBarInactiveTintColor: theme.colors.text.strong,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontFamily: 'Inter_400Regular', fontSize: 12 },
        tabBarStyle: {
          backgroundColor: theme.colors.background.brand,
          borderTopColor: 'transparent',
        },
      })}
    >
      <Tab.Screen
        name="EventInboxScreen"
        component={EventInboxScreen}
        options={({ navigation }) => ({
          headerTitle: 'Inbox',
          headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 20 },
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/chatbox-outline"
              size={22}
              color={
                focused
                  ? palettes['Trail Twin']['Primary Green - Trail Twin']
                  : theme.colors.text.strong
              }
            />
          ),
          tabBarLabel: 'Inbox',
          title: 'Event Inbox Screen',
        })}
      />
      <Tab.Screen
        name="MeetRidersScreen"
        component={MeetRidersScreen}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitleStyle: { fontFamily: 'system-400', fontSize: 16 },
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/people-outline"
              size={22}
              color={
                focused
                  ? palettes['Trail Twin']['Primary Green - Trail Twin']
                  : theme.colors.text.strong
              }
            />
          ),
          tabBarLabel: 'Meet Riders',
          title: 'Meet Riders',
        })}
      />
      <Tab.Screen
        name="EventMapScreen"
        component={EventMapScreen}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: 'Event Map',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 20 },
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialCommunityIcons/bike"
              size={22}
              color={
                focused
                  ? palettes['Trail Twin']['Primary Green - Trail Twin']
                  : theme.colors.text.strong
              }
            />
          ),
          tabBarLabel: 'Find Rides',
          title: 'Event Map',
        })}
      />
      <Tab.Screen
        name="UsersProfileScreen"
        component={UsersProfileScreen}
        options={({ navigation }) => ({
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.background.brand,
            borderBottomColor: 'transparent',
          },
          headerTitle: 'My Profile',
          headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 16 },
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Ionicons/person-outline"
              size={22}
              color={
                focused
                  ? palettes['Trail Twin']['Primary Green - Trail Twin']
                  : theme.colors.text.strong
              }
            />
          ),
          tabBarLabel: 'Profile',
          title: 'Users Profile',
        })}
      />
    </Tab.Navigator>
  );
}

export default function RootAppNavigator() {
  const theme = useTheme();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#fdfdf5ff',
        },
      }}
      linking={LinkingConfiguration}
    >
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={({ navigation }) => ({
          cardStyle: { flex: 1 },
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
          headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 16 },
        })}
      >
        <Stack.Screen
          name="CreateEventScreen"
          component={CreateEventScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="Ionicons/chevron-back"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text style={[styles.headerLabel]}>Back</Text>
                  </View>
                </Touchable>
              ) : null,
            headerStyle: {
              backgroundColor: theme.colors.background.brand,
              borderBottomColor: theme.colors.border.brand,
            },
            headerTitle: 'Create Event',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 18 },
            title: 'Create Event',
          })}
        />
        <Stack.Screen
          name="ExploreEventsScreen"
          component={ExploreEventsScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.navigate('BottomTabNavigator', {
                        screen: 'EventMapScreen',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="AntDesign/left"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text style={[styles.headerLabel]}>Back</Text>
                  </View>
                </Touchable>
              ) : null,
            headerRight: ({ tintColor }) => (
              <Touchable
                style={[styles.headerContainer, styles.headerContainerRight]}
                onPress={() => {
                  try {
                    navigation.navigate('CreateEventScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Icon
                  name="AntDesign/plus"
                  size={Platform.OS === 'ios' ? 21 : 24}
                  color={tintColor}
                  style={[styles.headerIcon, styles.headerIconRight]}
                />
              </Touchable>
            ),
            headerStyle: {
              backgroundColor: theme.colors.background.brand,
              borderBottomColor: 'transparent',
            },
            headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 16 },
            title: 'Explore Events',
          })}
        />
        <Stack.Screen
          name="EventDetailsScreen"
          component={EventDetailsScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.navigate('BottomTabNavigator', {
                        screen: 'EventMapScreen',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="AntDesign/left"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text style={[styles.headerLabel]}>Back</Text>
                  </View>
                </Touchable>
              ) : null,
            headerRight: ({ tintColor }) => (
              <Touchable
                style={[styles.headerContainer, styles.headerContainerRight]}
                onPress={() => {
                  const handler = async () => {
                    try {
                      await openShareUtil(
                        'https://www.reddit.com/r/MTB/s/NJQKnZ4M71'
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                <Icon
                  name=""
                  size={Platform.OS === 'ios' ? 21 : 24}
                  color={tintColor}
                  style={[styles.headerIcon, styles.headerIconRight]}
                />
              </Touchable>
            ),
            headerStyle: {
              backgroundColor: theme.colors.background.brand,
              borderBottomColor: theme.colors.border.brand,
            },
            headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 18 },
            title: 'Event Details',
          })}
        />
        <Stack.Screen
          name="OtherUsersProfileScreen"
          component={OtherUsersProfileScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="Ionicons/chevron-back"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text style={[styles.headerLabel]}>Back</Text>
                  </View>
                </Touchable>
              ) : null,
            headerStyle: {
              backgroundColor: theme.colors.background.brand,
              borderBottomColor: 'transparent',
            },
            headerTitle: 'User Profile',
            headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 16 },
            title: "Other User's Profile",
          })}
        />
        <Stack.Screen
          name="InboxScreenDisplayOnlyScreen"
          component={InboxScreenDisplayOnlyScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerStyle: {
              backgroundColor: theme.colors.background.brand,
              borderBottomColor: 'transparent',
            },
            headerTitleStyle: { fontFamily: 'Inter_400Regular', fontSize: 16 },
            title: 'Inbox Screen (Display Only)',
          })}
        />
        <Stack.Screen
          name="MessagingScreenDisplayOnlyScreen"
          component={MessagingScreenDisplayOnlyScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="Ionicons/chevron-back-outline"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text style={[styles.headerLabel]}>Back</Text>
                  </View>
                </Touchable>
              ) : null,
            headerRight: ({ tintColor }) => (
              <Touchable
                style={[styles.headerContainer, styles.headerContainerRight]}
                onPress={() => {
                  try {
                    navigation.navigate('EventDetailsScreen', {
                      event_id: 216,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Icon
                  name="AntDesign/infocirlceo"
                  size={Platform.OS === 'ios' ? 21 : 24}
                  color={tintColor}
                  style={[styles.headerIcon, styles.headerIconRight]}
                />
              </Touchable>
            ),
            headerStyle: {
              backgroundColor: theme.colors.background.brand,
              borderBottomColor: theme.colors.background.brand,
            },
            headerTitle: ' Galbraith Group Ride',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 16 },
            title: 'Messaging Screen (Display only)',
          })}
        />
        <Stack.Screen
          name="FilterEventsScreen"
          component={FilterEventsScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="Ionicons/chevron-back"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text style={[styles.headerLabel]}>Back</Text>
                  </View>
                </Touchable>
              ) : null,
            headerStyle: { backgroundColor: theme.colors.background.brand },
            headerTitle: 'Filter Events',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 18 },
            title: 'Filter Events Screen',
          })}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerStyle: { backgroundColor: 'transparent' },
            title: 'Sign up',
          })}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Login',
          })}
        />
        <Stack.Screen
          name="PickAMeetupLocationScreen"
          component={PickAMeetupLocationScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="AntDesign/left"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={theme.colors.text.strong}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text
                      style={[
                        styles.headerLabel,
                        { color: theme.colors.text.strong },
                      ]}
                    >
                      Back
                    </Text>
                  </View>
                </Touchable>
              ) : null,
            headerStyle: {
              backgroundColor:
                palettes['Trail Twin']['Background - Trail Twin'],
              borderBottomColor: theme.colors.border.brand,
            },
            headerTintColor: palettes['Trail Twin']['Black - Trail Twin'],
            headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 16 },
            title: 'Pick a Meetup Location',
          })}
        />
        <Stack.Screen
          name="SetupAndEditProfileScreen"
          component={SetupAndEditProfileScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Setup and Edit Profile',
          })}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ navigation }) => ({
            cardStyle: {
              backgroundColor:
                palettes['Trail Twin']['Background - Trail Twin'],
            },
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="AntDesign/left"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text style={[styles.headerLabel]}>Back</Text>
                  </View>
                </Touchable>
              ) : null,
            headerTitleStyle: { fontFamily: 'Inter_500Medium', fontSize: 20 },
            title: 'Chat',
          })}
        />
        <Stack.Screen
          name="UsersEventsScreen"
          component={UsersEventsScreen}
          options={({ navigation }) => ({
            headerLeft: ({ tintColor, canGoBack }) =>
              canGoBack ? (
                <Touchable
                  style={[styles.headerContainer, styles.headerContainerLeft]}
                  onPress={() => {
                    try {
                      navigation.navigate('UsersEventsScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name="AntDesign/left"
                    size={Platform.OS === 'ios' ? 21 : 24}
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text style={[styles.headerLabel]}>Back</Text>
                  </View>
                </Touchable>
              ) : null,
            title: 'Users Events',
          })}
        />
        <Stack.Screen
          name="FilterRidersScreen"
          component={FilterRidersScreen}
          options={({ navigation }) => ({
            title: 'Filter Riders Screen',
          })}
        />
        <Stack.Screen
          name="EventChatScreen"
          component={EventChatScreen}
          options={({ navigation }) => ({
            title: 'Event Chat',
          })}
        />
        <Stack.Screen
          name="OtherUsersEventsScreen"
          component={OtherUsersEventsScreen}
          options={({ navigation }) => ({
            title: 'Other Users Events',
          })}
        />
        <Stack.Screen
          name="EditEventScreen"
          component={EditEventScreen}
          options={({ navigation }) => ({
            title: 'Edit Event',
          })}
        />
        <Stack.Screen
          name="FriendsInboxScreen"
          component={FriendsInboxScreen}
          options={({ navigation }) => ({
            title: 'Friends Inbox Screen',
          })}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Bottom Tab Navigator',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerContainerRight: Platform.select({ ios: { marginRight: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
  headerIconRight: Platform.select({ ios: { marginLeft: 6 } }),
  headerLabel: { fontSize: 17, letterSpacing: 0.35 },
  headerLabelWrapper: { flexDirection: 'row', alignItems: 'flex-start' },
});
