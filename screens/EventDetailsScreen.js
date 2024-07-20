import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseEventsApi from '../apis/SupabaseEventsApi.js';
import EventDetailsCardBlock from '../components/EventDetailsCardBlock';
import RiderProfileDisplayBlock from '../components/RiderProfileDisplayBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openShareUtil from '../utils/openShare';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';

const EventDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        (
          await SupabaseEventsApi.getAttendeesByEventIdGET(Constants, {
            eventId: props.route?.params?.event_id ?? 121,
            select: '*',
          })
        )?.json;
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: '"rgb(253, 253, 245)"' },
        dimensions.width
      )}
    >
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth(
          { alignItems: 'stretch', backgroundColor: 'rgb(253, 253, 245)' },
          dimensions.width
        )}
      >
        <EventDetailsCardBlock
          event_id={props.route?.params?.event_id ?? 121}
        />
        {/* Riders Attending View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              marginTop: 32,
              paddingLeft: 32,
              paddingRight: 32,
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontFamily: 'Inter_400Regular',
                fontSize: 18,
                marginBottom: 24,
              }),
              dimensions.width
            )}
          >
            {'Other Riders Attending'}
          </Text>
          <RiderProfileDisplayBlock
            event_id={props.route?.params?.event_id ?? 121}
          />
        </View>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(EventDetailsScreen);
