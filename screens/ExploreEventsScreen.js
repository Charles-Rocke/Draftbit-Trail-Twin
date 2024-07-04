import React from 'react';
import EventCardListBlock from '../components/EventCardListBlock';
import EventFilterAndSearchBarBlock from '../components/EventFilterAndSearchBarBlock';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  ScreenContainer,
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
        { backgroundColor: 'rgb(245, 245, 245)' },
        dimensions.width
      )}
    >
      <EventFilterAndSearchBarBlock />
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          { marginLeft: 32, marginRight: 32 },
          dimensions.width
        )}
      >
        <EventCardListBlock />
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(ExploreEventsScreen);
