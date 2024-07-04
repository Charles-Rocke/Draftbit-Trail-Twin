import React from 'react';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openImagePickerUtil from '../utils/openImagePicker';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Icon, Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';

const SafetySelfieBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}>
      <Text
        accessible={true}
        style={StyleSheet.applyWidth(
          { color: theme.colors.strong, fontFamily: 'Inter_300Light' },
          dimensions.width
        )}
      >
        {'Perosonal Photo'}
      </Text>

      <Touchable
        onPress={() => {
          const handler = async () => {
            try {
              await openImagePickerUtil({
                mediaTypes: 'All',
                allowsEditing: false,
                quality: 0.2,
                allowsMultipleSelection: false,
                permissionErrorMessage:
                  'Sorry, we need media library permissions to make this work.',
                showAlertOnPermissionError: true,
              });
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
        style={StyleSheet.applyWidth({ marginTop: 10 }, dimensions.width)}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: theme.colors['Custom Color'],
              borderBottomWidth: 1,
              borderColor: theme.colors['Light'],
              borderLeftWidth: 1,
              borderRadius: 12,
              borderRightWidth: 1,
              borderStyle: 'dashed',
              borderTopWidth: 1,
              height: 140,
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          <Icon
            color={theme.colors['Primary']}
            name={'AntDesign/camerao'}
            size={35}
          />
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(SafetySelfieBlock);
