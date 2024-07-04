import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Icon, Touchable, withTheme } from '@draftbit/ui';
import { View } from 'react-native';

const EventFilterAndSearchBarBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 24,
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 24,
          width: '100%',
        },
        dimensions.width
      )}
    >
      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
        {/* Touchable 2 */}
        <Touchable>
          <Icon name={'Ionicons/filter'} size={30} />
        </Touchable>
      </View>

      <View style={StyleSheet.applyWidth({ marginLeft: 16 }, dimensions.width)}>
        <Touchable>
          <Icon name={'AntDesign/search1'} size={30} />
        </Touchable>
      </View>
    </View>
  );
};

export default withTheme(EventFilterAndSearchBarBlock);