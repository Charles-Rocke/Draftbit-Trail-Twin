import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Touchable, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';

const HostProfileDisplayBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <Touchable
      style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            height: 200,
            justifyContent: 'flex-start',
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View>
          <Text
            accessible={true}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontSize: 24,
                marginLeft: 42,
              }),
              dimensions.width
            )}
          >
            {'Hosted by'}
          </Text>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'column',
              marginRight: 42,
              position: 'absolute',
              right: 0,
            },
            dimensions.width
          )}
        >
          <View>
            {/* User image */}
            <Image
              resizeMode={'cover'}
              source={{
                uri: 'https://d1nymbkeomeoqg.cloudfront.net/photos/27/68/398347_13844_XL.jpg',
              }}
              style={StyleSheet.applyWidth(
                { borderRadius: 5, height: 120, width: 120 },
                dimensions.width
              )}
            />
          </View>

          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flex: 1, flexDirection: 'row' },
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
                  marginRight: 4,
                  marginTop: 4,
                  opacity: 1,
                },
                dimensions.width
              )}
            >
              {'Users Name'}
            </Text>
            {/* Distance */}
            <Text
              accessible={true}
              numberOfLines={1}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors['Custom Color_2'],
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 12,
                  lineHeight: 20,
                  marginLeft: 4,
                  marginTop: 4,
                  opacity: 0.5,
                },
                dimensions.width
              )}
            >
              {'Age\n'}
            </Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

export default withTheme(HostProfileDisplayBlock);
