import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Touchable, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';

const RiderProfileDisplayBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <Touchable
      style={StyleSheet.applyWidth(
        { marginRight: 10, width: '48%' },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 14,
            paddingTop: 14,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View>
          {/* User image */}
          <Image
            resizeMode={'cover'}
            source={{
              uri: 'https://d1nymbkeomeoqg.cloudfront.net/photos/23/51/356641_23375_XL.jpg',
            }}
            style={StyleSheet.applyWidth(
              { borderRadius: 0, height: 145, width: 150 },
              dimensions.width
            )}
          />
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              marginLeft: 14,
              marginRight: 20,
            },
            dimensions.width
          )}
        >
          {/* Name ~ */}
          <Text
            accessible={true}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Strong'],
                fontFamily: 'Poppins_500Medium',
                fontSize: 14,
                lineHeight: 20,
                marginRight: 12,
                marginTop: 8,
                opacity: 1,
              },
              dimensions.width
            )}
          >
            {'{(host_name}}\n'}
          </Text>
          {/* Distance */}
          <Text
            accessible={true}
            numberOfLines={1}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors['Medium'],
                fontFamily: 'Poppins_400Regular',
                fontSize: 12,
                lineHeight: 20,
                marginLeft: 12,
                marginTop: 8,
                opacity: 0.5,
              },
              dimensions.width
            )}
          >
            {'Age\n'}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

export default withTheme(RiderProfileDisplayBlock);
