import React from 'react';
import EventCardBlock from '../components/EventCardBlock';
import EventFilterBlock from '../components/EventFilterBlock';
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
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <EventFilterBlock />
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          { marginLeft: 23, marginRight: 24 },
          dimensions.width
        )}
      ></SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(ExploreEventsScreen);
