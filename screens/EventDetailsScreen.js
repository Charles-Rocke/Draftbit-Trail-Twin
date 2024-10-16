import React from 'react';
import {
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import AttendeesDisplayBlock from '../components/AttendeesDisplayBlock';
import EventDetailsCardBlock from '../components/EventDetailsCardBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openShareUtil from '../utils/openShare';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { event_id: 126 };

const EventDetailsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'loading',
        value: false,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
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
          event_id={props.route?.params?.event_id ?? defaultProps.event_id}
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
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontFamily: 'Inter_500Medium',
                fontSize: 18,
                marginBottom: 24,
              }),
              dimensions.width
            )}
          >
            {'Riders Attending'}
          </Text>
          <AttendeesDisplayBlock />
        </View>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(EventDetailsScreen);
