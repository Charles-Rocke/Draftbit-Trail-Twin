import React from 'react';
import { Icon, TextInput, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const InboxNavBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [chatType, setChatType] = React.useState('');
  const [openSearch, setOpenSearch] = React.useState(false);

  return (
    <View>
      {/* Search And Filter */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            borderBottomWidth: 1,
            borderColor: theme.colors.border.brand,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 32,
            paddingRight: 32,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Search Chat View */}
        <View
          style={StyleSheet.applyWidth(
            { marginBottom: 24, marginTop: 24, width: '70%' },
            dimensions.width
          )}
        >
          {/* searchAndFilterInput */}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            webShowOutline={true}
            autoComplete={'address-line1'}
            clearButtonMode={'always'}
            placeholder={'Search'}
            placeholderTextColor={theme.colors.text.light}
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                borderBottomWidth: 1,
                borderColor: theme.colors.text.light,
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                borderTopWidth: 1,
                color: palettes.Brand['Secondary Text'],
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                height: 32,
                paddingLeft: 16,
                paddingRight: 16,
                width: '100%',
              },
              dimensions.width
            )}
            value={Constants['searchAndFilterQuery']}
          />
        </View>
        {/* Create View */}
        <View
          style={StyleSheet.applyWidth(
            { marginBottom: 16, marginTop: 16 },
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
            <Icon name={'Ionicons/create-outline'} size={24} />
          </Touchable>
        </View>
      </View>
      {/* Chat Nav */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            borderBottomWidth: 1,
            borderColor: theme.colors.border.brand,
            flexDirection: 'row',
            justifyContent: 'space-around',
          },
          dimensions.width
        )}
      >
        {/* Event Chats */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              height: 50,
              justifyContent: 'center',
              width: 150,
            },
            dimensions.width
          )}
        >
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('EventInboxScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { height: '100%', width: '100%' },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text 2'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text 2'].style,
                  {
                    alignSelf: 'center',
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginTop: 14,
                  }
                ),
                dimensions.width
              )}
            >
              {'Event Chats'}
            </Text>
          </Touchable>
        </View>
        {/* Group Chats */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              height: 50,
              justifyContent: 'center',
              width: 150,
            },
            dimensions.width
          )}
        >
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('FriendsInboxScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { height: '100%', width: '100%' },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text 2'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text 2'].style,
                  {
                    alignSelf: 'center',
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginTop: 14,
                  }
                ),
                dimensions.width
              )}
            >
              {'Friends'}
            </Text>
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default withTheme(InboxNavBlock);
