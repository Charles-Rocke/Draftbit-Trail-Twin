import React from 'react';
import {
  Circle,
  Divider,
  Icon,
  ScreenContainer,
  SimpleStyleScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const InboxScreenDisplayOnlyScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [openSearch, setOpenSearch] = React.useState(false);
  const [switchValue, setSwitchValue] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
          height: '100%',
        },
        dimensions.width
      )}
    >
      {/* Search And Filter */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            borderBottomWidth: 1,
            borderColor: theme.colors.border.brand,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 48,
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

      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        {/* Chats */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor:
                palettes['Trail Twin']['Background - Trail Twin'],
              borderRadius: 12,
              gap: 8,
              marginLeft: 32,
              marginRight: 32,
              marginTop: 8,
            },
            dimensions.width
          )}
        >
          {/* Chat */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('MessagingScreenDisplayOnlyScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor:
                    palettes['Trail Twin']['Background - Trail Twin'],
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 12,
                  paddingTop: 12,
                },
                dimensions.width
              )}
            >
              {/* Image */}
              <View
                style={StyleSheet.applyWidth(
                  { justifyContent: 'center' },
                  dimensions.width
                )}
              >
                {/* User image */}
                <Image
                  resizeMode={'cover'}
                  source={imageSource(Images['screenshot20240810at10304pm'])}
                  style={StyleSheet.applyWidth(
                    { borderRadius: 100, height: 58, width: 58 },
                    dimensions.width
                  )}
                />
                <Circle
                  size={8}
                  style={StyleSheet.applyWidth(
                    {
                      minWidth: 12,
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      zIndex: 1,
                    },
                    dimensions.width
                  )}
                />
              </View>
              {/* Name and Message */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, justifyContent: 'center', marginLeft: 16 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  {/* Name ~ */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Inter_400Regular',
                        fontSize: 16,
                        lineHeight: 20,
                        opacity: 1,
                      },
                      dimensions.width
                    )}
                  >
                    {'Liam Anderson'}
                  </Text>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        alignSelf: 'auto',
                        flexDirection: 'row',
                        gap: 8,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Date */}
                    <Text
                      accessible={true}
                      selectable={false}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.text.strong,
                          fontFamily: 'Inter_300Light',
                          fontSize: 12,
                          marginTop: 8,
                          opacity: 0.5,
                        },
                        dimensions.width
                      )}
                    >
                      {'7:33 AM'}
                    </Text>
                    <Icon name={'AntDesign/right'} size={14} />
                  </View>
                </View>
                {/* Message ~ */}
                <Text
                  accessible={true}
                  selectable={false}
                  numberOfLines={1}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_300Light',
                      fontSize: 12,
                      lineHeight: 20,
                      marginTop: 8,
                      opacity: 0.5,
                    },
                    dimensions.width
                  )}
                >
                  {'Yo wanna ride this weekend?'}
                </Text>
              </View>
            </View>
          </Touchable>
          {/* Divider 3 */}
          <Divider
            {...GlobalStyles.DividerStyles(theme)['Divider'].props}
            color={theme.colors.border.brand}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.DividerStyles(theme)['Divider'].style,
                { width: '100%' }
              ),
              dimensions.width
            )}
          />
          {/* Chat 2 */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('MessagingScreenDisplayOnlyScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 12,
                  paddingTop: 12,
                },
                dimensions.width
              )}
            >
              {/* Image */}
              <View
                style={StyleSheet.applyWidth(
                  { justifyContent: 'center' },
                  dimensions.width
                )}
              >
                {/* User image */}
                <Image
                  resizeMode={'cover'}
                  source={imageSource(Images['screenshot20240812at21145pm'])}
                  style={StyleSheet.applyWidth(
                    { borderRadius: 100, height: 58, width: 58 },
                    dimensions.width
                  )}
                />
                <Circle
                  size={8}
                  style={StyleSheet.applyWidth(
                    {
                      minWidth: 12,
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      zIndex: 1,
                    },
                    dimensions.width
                  )}
                />
              </View>
              {/* Name and Message */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, justifyContent: 'center', marginLeft: 16 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  {/* Name ~ */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Inter_400Regular',
                        fontSize: 16,
                        lineHeight: 20,
                        opacity: 1,
                      },
                      dimensions.width
                    )}
                  >
                    {'Galbraith Group Ride'}
                  </Text>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        alignSelf: 'auto',
                        flexDirection: 'row',
                        gap: 8,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Date */}
                    <Text
                      accessible={true}
                      selectable={false}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.text.strong,
                          fontFamily: 'Inter_300Light',
                          fontSize: 12,
                          marginTop: 8,
                          opacity: 0.5,
                        },
                        dimensions.width
                      )}
                    >
                      {'Yesterday'}
                    </Text>
                    <Icon name={'AntDesign/right'} size={14} />
                  </View>
                </View>
                {/* Message ~ */}
                <Text
                  accessible={true}
                  selectable={false}
                  numberOfLines={1}
                  style={StyleSheet.applyWidth(
                    {
                      fontFamily: 'Inter_300Light',
                      fontSize: 12,
                      lineHeight: 20,
                      marginTop: 8,
                      opacity: 0.5,
                    },
                    dimensions.width
                  )}
                >
                  {'Hey! Where specifically are we meeting up at this spot?'}
                </Text>
              </View>
            </View>
          </Touchable>
          {/* Divider 6 */}
          <Divider
            color={theme.colors.border.brand}
            {...GlobalStyles.DividerStyles(theme)['Divider'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.DividerStyles(theme)['Divider'].style,
                { width: '100%' }
              ),
              dimensions.width
            )}
          />
          {/* Chat 3 */}
          <Touchable>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 12,
                  paddingTop: 12,
                },
                dimensions.width
              )}
            >
              {/* Image */}
              <View
                style={StyleSheet.applyWidth(
                  { justifyContent: 'center' },
                  dimensions.width
                )}
              >
                {/* User image */}
                <Image
                  resizeMode={'cover'}
                  source={imageSource(Images['screenshot20240810at10837pm'])}
                  style={StyleSheet.applyWidth(
                    { borderRadius: 100, height: 58, width: 58 },
                    dimensions.width
                  )}
                />
                <Circle
                  size={8}
                  style={StyleSheet.applyWidth(
                    {
                      minWidth: 12,
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      zIndex: 1,
                    },
                    dimensions.width
                  )}
                />
              </View>
              {/* Name and Message */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, justifyContent: 'center', marginLeft: 16 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  {/* Name ~ */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Inter_400Regular',
                        fontSize: 16,
                        lineHeight: 20,
                        opacity: 1,
                      },
                      dimensions.width
                    )}
                  >
                    {'Sophia Clark'}
                  </Text>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        alignSelf: 'auto',
                        flexDirection: 'row',
                        gap: 8,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Date */}
                    <Text
                      accessible={true}
                      selectable={false}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.text.strong,
                          fontFamily: 'Inter_300Light',
                          fontSize: 12,
                          marginTop: 8,
                          opacity: 0.5,
                        },
                        dimensions.width
                      )}
                    >
                      {'Yesterday'}
                    </Text>
                    <Icon name={'AntDesign/right'} size={14} />
                  </View>
                </View>
                {/* Message ~ */}
                <Text
                  accessible={true}
                  selectable={false}
                  numberOfLines={1}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_300Light',
                      fontSize: 12,
                      lineHeight: 20,
                      marginTop: 8,
                      opacity: 0.5,
                    },
                    dimensions.width
                  )}
                >
                  {'What bike do you have?'}
                </Text>
              </View>
            </View>
          </Touchable>
          {/* Divider 5 */}
          <Divider
            color={theme.colors.border.brand}
            {...GlobalStyles.DividerStyles(theme)['Divider'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.DividerStyles(theme)['Divider'].style,
                { width: '100%' }
              ),
              dimensions.width
            )}
          />
          {/* Chat 4 */}
          <Touchable>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 12,
                  paddingTop: 12,
                },
                dimensions.width
              )}
            >
              {/* Image */}
              <View
                style={StyleSheet.applyWidth(
                  { justifyContent: 'center' },
                  dimensions.width
                )}
              >
                {/* User image */}
                <Image
                  resizeMode={'cover'}
                  source={imageSource(Images['screenshot20240810at11052pm'])}
                  style={StyleSheet.applyWidth(
                    { borderRadius: 100, height: 58, width: 58 },
                    dimensions.width
                  )}
                />
              </View>
              {/* Name and Message */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, justifyContent: 'center', marginLeft: 16 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  {/* Name ~ */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Inter_400Regular',
                        fontSize: 16,
                        lineHeight: 20,
                        opacity: 1,
                      },
                      dimensions.width
                    )}
                  >
                    {'Riding Gang\n'}
                  </Text>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        alignSelf: 'auto',
                        flexDirection: 'row',
                        gap: 8,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Date */}
                    <Text
                      accessible={true}
                      selectable={false}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.text.strong,
                          fontFamily: 'Inter_300Light',
                          fontSize: 12,
                          marginTop: 8,
                          opacity: 0.5,
                        },
                        dimensions.width
                      )}
                    >
                      {'Monday'}
                    </Text>
                    <Icon name={'AntDesign/right'} size={14} />
                  </View>
                </View>
                {/* Message ~ */}
                <Text
                  accessible={true}
                  selectable={false}
                  numberOfLines={1}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_300Light',
                      fontSize: 12,
                      lineHeight: 20,
                      marginTop: 8,
                      opacity: 0.5,
                    },
                    dimensions.width
                  )}
                >
                  {'Sent'}
                </Text>
              </View>
            </View>
          </Touchable>
          {/* Divider 4 */}
          <Divider
            color={theme.colors.border.brand}
            {...GlobalStyles.DividerStyles(theme)['Divider'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.DividerStyles(theme)['Divider'].style,
                { width: '100%' }
              ),
              dimensions.width
            )}
          />
          {/* Chat 5 */}
          <Touchable>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 12,
                  paddingTop: 12,
                },
                dimensions.width
              )}
            >
              {/* Image */}
              <View
                style={StyleSheet.applyWidth(
                  { justifyContent: 'center' },
                  dimensions.width
                )}
              >
                {/* User image */}
                <Image
                  resizeMode={'cover'}
                  source={imageSource(Images['screenshot20240813at91758am'])}
                  style={StyleSheet.applyWidth(
                    { borderRadius: 100, height: 58, width: 58 },
                    dimensions.width
                  )}
                />
              </View>
              {/* Name and Message */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, justifyContent: 'center', marginLeft: 16 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    dimensions.width
                  )}
                >
                  {/* Name ~ */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: theme.colors.text.strong,
                        fontFamily: 'Inter_400Regular',
                        fontSize: 16,
                        lineHeight: 20,
                        opacity: 1,
                      },
                      dimensions.width
                    )}
                  >
                    {'Mason'}
                  </Text>

                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-end',
                        alignSelf: 'auto',
                        flexDirection: 'row',
                        gap: 8,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Date */}
                    <Text
                      accessible={true}
                      selectable={false}
                      numberOfLines={1}
                      style={StyleSheet.applyWidth(
                        {
                          color: theme.colors.text.strong,
                          fontFamily: 'Inter_300Light',
                          fontSize: 12,
                          marginTop: 8,
                          opacity: 0.5,
                        },
                        dimensions.width
                      )}
                    >
                      {'7/20/24'}
                    </Text>
                    <Icon name={'AntDesign/right'} size={14} />
                  </View>
                </View>
                {/* Message ~ */}
                <Text
                  accessible={true}
                  selectable={false}
                  numberOfLines={1}
                  style={StyleSheet.applyWidth(
                    {
                      color: theme.colors.text.strong,
                      fontFamily: 'Inter_300Light',
                      fontSize: 12,
                      lineHeight: 20,
                      marginTop: 8,
                      opacity: 0.5,
                    },
                    dimensions.width
                  )}
                >
                  {'Seen'}
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(InboxScreenDisplayOnlyScreen);
