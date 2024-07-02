import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import DetailedEventDescriptionBlock from '../components/DetailedEventDescriptionBlock';
import EventSignUpBarBlock from '../components/EventSignUpBarBlock';
import HostProfileDisplayBlock from '../components/HostProfileDisplayBlock';
import RiderProfileDisplayBlock from '../components/RiderProfileDisplayBlock';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Divider,
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';

const EventDetailsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        <DetailedEventDescriptionBlock
          event_id={props.route?.params?.event_id ?? 1}
        />
        {/* Divider 2 */}
        <Divider
          color={theme.colors.divider}
          {...GlobalStyles.DividerStyles(theme)['Divider'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.DividerStyles(theme)['Divider'].style,
            dimensions.width
          )}
        />
        <HostProfileDisplayBlock />
        <Divider
          color={theme.colors.divider}
          {...GlobalStyles.DividerStyles(theme)['Divider'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.DividerStyles(theme)['Divider'].style,
            dimensions.width
          )}
        />
        <Text
          accessible={true}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              fontSize: 32,
              marginBottom: 32,
              marginLeft: 24,
              marginTop: 32,
            }),
            dimensions.width
          )}
        >
          {'Riders Attending'}
        </Text>
        {/* People */}
        <View
          style={StyleSheet.applyWidth(
            { borderRadius: 12, flex: 1, paddingLeft: 20, paddingRight: 20 },
            dimensions.width
          )}
        >
          <RiderProfileDisplayBlock />
        </View>
      </SimpleStyleScrollView>
      <EventSignUpBarBlock />
    </ScreenContainer>
  );
};

export default withTheme(EventDetailsScreen);
