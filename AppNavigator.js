import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import palettes from './themes/palettes.js';
import LinkingConfiguration from './LinkingConfiguration.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import Breakpoints from './utils/Breakpoints';
import openShareUtil from './utils/openShare';
import parseBoolean from './utils/parseBoolean';
import useWindowDimensions from './utils/useWindowDimensions';

import CreateEventScreen from './screens/CreateEventScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import ExploreEventsScreen from './screens/ExploreEventsScreen';
import JoinEventScreen from './screens/JoinEventScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

function BottomTabNavigator() {
  const theme = useTheme();

  const tabBarIcons = {
    ExploreEventsScreen: 'Feather/map-pin',
    CreateEventScreen: 'Feather/plus-circle',
  };

  return (
    <Tab.Navigator
      initialRouteName="ExploreEventsScreen"
      backBehavior="history"
      screenOptions={({ navigation }) => ({
        headerBackImage:
          Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        headerShown: false,
        headerTitleAllowFontScaling: false,
        tabBarActiveTintColor: palettes.App['Custom Color_38'],
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontFamily: 'Inter_500Medium', fontSize: 12 },
        tabBarStyle: {
          backgroundColor: theme.colors.background.brand,
          borderTopColor: palettes.App['Custom Color_38'],
        },
      })}
    >
      <Tab.Screen
        name="ExploreEventsScreen"
        component={ExploreEventsScreen}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: 'Explore Events',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'Inter_300Light', fontSize: 16 },
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Feather/map-pin"
              size={25}
              color={focused ? palettes.App['Custom Color_38'] : color}
            />
          ),
          tabBarLabel: 'Explore Events',
          title: 'Explore Events',
        })}
      />
      <Tab.Screen
        name="CreateEventScreen"
        component={CreateEventScreen}
        options={({ navigation }) => ({
          headerTitle: 'Create Event',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'Inter_300Light', fontSize: 16 },
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Feather/plus-circle"
              size={25}
              color={focused ? palettes.App['Custom Color_38'] : color}
            />
          ),
          tabBarLabel: 'Create Event',
          title: 'Create Event',
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
        initialRouteName="BottomTabNavigator"
        screenOptions={({ navigation }) => ({
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
        })}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={({ navigation }) => ({
            title: 'Splash',
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
                  name="Feather/share"
                  size={Platform.OS === 'ios' ? 21 : 24}
                  color={tintColor}
                  style={[styles.headerIcon, styles.headerIconRight]}
                />
              </Touchable>
            ),
            title: 'Event Details',
          })}
        />
        <Stack.Screen
          name="JoinEventScreen"
          component={JoinEventScreen}
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
                    color={tintColor}
                    style={[styles.headerIcon, styles.headerIconLeft]}
                  />
                  <View style={styles.headerLabelWrapper}>
                    <Text style={[styles.headerLabel]}>Back</Text>
                  </View>
                </Touchable>
              ) : null,
            headerTitle: 'Join Event',
            title: 'Join Event',
          })}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={({ navigation }) => ({
            headerShown: false,
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
