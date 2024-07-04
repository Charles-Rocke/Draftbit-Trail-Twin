import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import EventDetailsCardBlock from '../components/EventDetailsCardBlock';
import RiderProfileDisplayBlock from '../components/RiderProfileDisplayBlock';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';

const EventDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: theme.colors['Background'] },
        dimensions.width
      )}
    >
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          { alignItems: 'stretch' },
          dimensions.width
        )}
      >
        <EventDetailsCardBlock event_id={props.route?.params?.event_id ?? 26} />
        {/* Riders Attending View */}
        <View
          style={StyleSheet.applyWidth(
            { paddingLeft: 32, paddingRight: 32, width: '100%' },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontFamily: 'Inter_300Light',
                fontSize: 18,
                marginBottom: 32,
              }),
              dimensions.width
            )}
          >
            {'Rider Attending'}
          </Text>
          <RiderProfileDisplayBlock
            event_id={props.route?.params?.event_id ?? 26}
          />
        </View>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(EventDetailsScreen);
