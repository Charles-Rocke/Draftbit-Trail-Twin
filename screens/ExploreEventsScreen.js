import React from 'react';
import EventCardListBlock from '../components/EventCardListBlock';
import EventFilterAndSearchBarBlock from '../components/EventFilterAndSearchBarBlock';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';

const ExploreEventsScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasBottomSafeArea={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: '"rgb(253, 253, 245)"' },
        dimensions.width
      )}
    >
      <EventFilterAndSearchBarBlock />
      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        style={StyleSheet.applyWidth(
          { backgroundColor: 'rgb(253, 253, 245)' },
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
            {
              backgroundColor: 'rgb(253, 253, 245)',
              marginLeft: 32,
              marginRight: 32,
            },
            dimensions.width
          )}
        >
          <EventCardListBlock />
        </SimpleStyleScrollView>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(ExploreEventsScreen);
