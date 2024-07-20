import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import { Icon, TextInput, Touchable, withTheme } from '@draftbit/ui';
import { View } from 'react-native';

const EventFilterAndSearchBarBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchAndFilterInput, setSearchAndFilterInput] = React.useState('');
  const [searchAndFilterInputValue, setSearchAndFilterInputValue] =
    React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: '"rgb(253, 253, 245)"',
          borderBottomWidth: 1,
          borderColor: theme.colors.border.brand,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 32,
          paddingRight: 32,
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Search And Filter View */}
      <View>
        {/* searchAndFilterInput */}
        <>
          {!openSearch ? null : (
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newSearchAndFilterInputValue => {
                try {
                  setGlobalVariableValue({
                    key: 'searchAndFilterQuery',
                    value: newSearchAndFilterInputValue,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              autoComplete={'address-line1'}
              clearButtonMode={'always'}
              placeholder={'Search for a ride'}
              placeholderTextColor={theme.colors.text.light}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'center',
                  backgroundColor: palettes.App['Custom Color'],
                  borderBottomWidth: 1,
                  borderColor: theme.colors.text.light,
                  borderLeftWidth: 1,
                  borderRadius: 12,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  color: palettes.Brand['Secondary Text'],
                  fontFamily: 'Inter_300Light',
                  height: 48,
                  minWidth: '75%',
                  paddingBottom: 8,
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 8,
                },
                dimensions.width
              )}
              value={Constants['searchAndFilterQuery']}
            />
          )}
        </>
      </View>

      <View
        style={StyleSheet.applyWidth(
          { marginBottom: 24, marginTop: 24 },
          dimensions.width
        )}
      >
        {/* Touchable 2 */}
        <Touchable
          onPress={() => {
            try {
              if (openSearch) {
                setOpenSearch(false);
              } else {
                setOpenSearch(true);
              }
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Icon name={'AntDesign/search1'} size={20} />
        </Touchable>
      </View>
    </View>
  );
};

export default withTheme(EventFilterAndSearchBarBlock);
