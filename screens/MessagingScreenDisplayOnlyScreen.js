import React from 'react';
import {
  Circle,
  Icon,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import * as Linking from 'expo-linking';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openCameraUtil from '../utils/openCamera';
import useWindowDimensions from '../utils/useWindowDimensions';

const MessagingScreenDisplayOnlyScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes['Trail Twin']['Background - Trail Twin'] },
        dimensions.width
      )}
    >
      {/* Navigation Frame 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            borderBottomWidth: 1,
            borderColor: theme.colors.border.brand,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 24,
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 24,
          },
          dimensions.width
        )}
      >
        {/* Touchable 3 */}
        <Touchable
          onPress={() => {
            try {
              navigation.navigate('EventDetailsScreen');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {/* Info Icon */}
          <Icon name={'Feather/info'} size={24} />
        </Touchable>

        <Touchable
          onPress={() => {
            try {
              navigation.navigate('EventDetailsScreen');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {/* Title */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.text.strong,
                fontFamily: 'Inter_500Medium',
                fontSize: 18,
                textAlign: 'left',
                textDecorationLine: 'none',
              },
              dimensions.width
            )}
          >
            {'Galbraith Group Ride'}
          </Text>
        </Touchable>
        {/* Touchable 2 */}
        <Touchable
          onPress={() => {
            try {
              Linking.openURL('https://www.google.com/maps');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {/* Directions Icon  */}
          <Icon name={'Feather/map-pin'} size={24} />
        </Touchable>
      </View>

      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            height: '100%',
            justifyContent: 'flex-start',
            overflow: 'hidden',
          },
          dimensions.width
        )}
      >
        {/* Content Frame with Scroll */}
        <SimpleStyleScrollView
          bounces={true}
          horizontal={false}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.background.brand,
              gap: 24,
              marginTop: 16,
              paddingLeft: 16,
              paddingRight: 16,
            },
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
                  fontSize: 12,
                }
              ),
              dimensions.width
            )}
          >
            {'Yesterday 6:42 PM'}
          </Text>
          {/* Message Frame */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                flexGrow: 1,
                flexShrink: 0,
                gap: 16,
              },
              dimensions.width
            )}
          >
            {/* Left Side Frame */}
            <View>
              {/* Flex Frame for Touchable */}
              <View>
                <Touchable>
                  {/* Circle Image Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      { justifyContent: 'center' },
                      dimensions.width
                    )}
                  >
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={imageSource(
                        Images['screenshot20240810at10837pm']
                      )}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { borderRadius: 100, height: 54, width: 54 }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                </Touchable>
              </View>
            </View>
            {/* Right Side Frame */}
            <View
              style={StyleSheet.applyWidth(
                { gap: 6, maxWidth: '61%' },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontFamily: 'Inter_400Regular', fontSize: 12 }
                  ),
                  dimensions.width
                )}
              >
                {'Sophia'}
              </Text>
              {/* Message Bubble Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor:
                      palettes['Trail Twin']['Secondary Green - Trail Twin'],
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    flexGrow: 1,
                    flexShrink: 0,
                    gap: 0,
                    paddingBottom: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Rubik Text Style 12/18 Regular */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: 'theme.colors.communityTrueOption',
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      lineHeight: 18,
                    },
                    dimensions.width
                  )}
                >
                  {
                    'Hey welcome to the group ride at Galbraith this weekend! Excited to meet you guys!'
                  }
                </Text>
              </View>
            </View>
          </View>
          {/* Message Frame 3 */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row', gap: 16 },
              dimensions.width
            )}
          >
            {/* Left Side Frame */}
            <View>
              {/* Flex Frame for Touchable */}
              <View>
                <Touchable>
                  {/* Circle Image Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexGrow: 1, flexShrink: 0 },
                      dimensions.width
                    )}
                  >
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={imageSource(
                        Images['screenshot20240813at91758am']
                      )}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { borderRadius: 100, height: 54, width: 54 }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                </Touchable>
              </View>
            </View>
            {/* Right Side Frame */}
            <View style={StyleSheet.applyWidth({ gap: 6 }, dimensions.width)}>
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontFamily: 'Inter_400Regular', fontSize: 12 }
                  ),
                  dimensions.width
                )}
              >
                {'Mason'}
              </Text>
              {/* Message Bubble Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor:
                      palettes['Trail Twin']['Secondary Green - Trail Twin'],
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    flexShrink: 0,
                    gap: 0,
                    paddingBottom: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Rubik Text Style 12/18 Regular */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: 'theme.colors.communityTrueOption',
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      lineHeight: 18,
                    },
                    dimensions.width
                  )}
                >
                  {'Same here!'}
                </Text>
              </View>
            </View>
          </View>
          {/* Text 2 */}
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
                  fontSize: 12,
                }
              ),
              dimensions.width
            )}
          >
            {'Liam joined the event!'}
          </Text>
          {/* Message Frame 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                flexGrow: 1,
                flexShrink: 0,
                gap: 16,
              },
              dimensions.width
            )}
          >
            {/* Left Side Frame */}
            <View>
              {/* Flex Frame for Touchable */}
              <View>
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('OtherUsersProfileScreen');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {/* Circle Image Frame */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexGrow: 1, flexShrink: 0 },
                      dimensions.width
                    )}
                  >
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={imageSource(
                        Images['screenshot20240810at10304pm']
                      )}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { borderRadius: 100, height: 54, width: 54 }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                </Touchable>
              </View>
            </View>
            {/* Right Side Frame */}
            <View
              style={StyleSheet.applyWidth(
                { gap: 6, maxWidth: '61%' },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    { fontFamily: 'Inter_400Regular', fontSize: 12 }
                  ),
                  dimensions.width
                )}
              >
                {'Liam'}
              </Text>
              {/* Message Bubble Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor:
                      palettes['Trail Twin']['Secondary Green - Trail Twin'],
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    gap: 0,
                    paddingBottom: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Rubik Text Style 12/18 Regular */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: 'theme.colors.communityTrueOption',
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                      lineHeight: 18,
                    },
                    dimensions.width
                  )}
                >
                  {'Hey! Where specifically are we meeting up at this spot?'}
                </Text>
              </View>
            </View>
          </View>

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
                  fontSize: 12,
                }
              ),
              dimensions.width
            )}
          >
            {'Today 9:20 AM'}
          </Text>
          {/* Text 3 */}
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
                  fontSize: 12,
                  marginBottom: 12,
                }
              ),
              dimensions.width
            )}
          >
            {'Owen joined the event!'}
          </Text>
        </SimpleStyleScrollView>
      </SimpleStyleKeyboardAwareScrollView>
      {/* Keyboard with Emoticons Group */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            borderColor: theme.colors.border.brand,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderTopWidth: 1,
            flexGrow: 1,
            flexShrink: 0,
            justifyContent: 'flex-end',
            paddingLeft: 32,
            paddingRight: 32,
            position: 'relative',
          },
          dimensions.width
        )}
      >
        {/* Message Frame */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'auto',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 32,
              paddingTop: 32,
            },
            dimensions.width
          )}
        >
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth(
              { flexGrow: 0, flexShrink: 0 },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                const handler = async () => {
                  try {
                    await openCameraUtil({
                      mediaTypes: 'Images',
                      allowsEditing: false,
                      cameraType: 'back',
                      videoMaxDuration: undefined,
                      quality: 0.2,
                      permissionErrorMessage:
                        'Please allow Trail Twin to access camera.',
                      showAlertOnPermissionError: true,
                      outputBase64: true,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            >
              {/* Flex Frame for Icons */}
              <View>
                <Icon name={'Feather/camera'} size={24} />
              </View>
            </Touchable>
          </View>
          {/* Flex Input */}
          <View
            style={StyleSheet.applyWidth(
              { flexGrow: 1, flexShrink: 0 },
              dimensions.width
            )}
          >
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setTextInputValue(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              placeholder={'Type something...'}
              style={StyleSheet.applyWidth(
                {
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                  borderBottomWidth: 1,
                  borderColor: palettes['Brand Fire'].Divider,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  borderTopWidth: 1,
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_300Light',
                  marginLeft: 16,
                  marginRight: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 16,
                },
                dimensions.width
              )}
              value={textInputValue}
            />
          </View>

          <Touchable>
            <Circle
              size={48}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor:
                    palettes['Trail Twin']['Secondary Green #2 - Trail Twin'],
                  maxHeight: 36,
                  maxWidth: 36,
                },
                dimensions.width
              )}
            >
              <Icon
                color={palettes['Trail Twin']['White - Trail Twin']}
                name={'AntDesign/arrowup'}
                size={24}
              />
            </Circle>
          </Touchable>
          {/* Flex Frame for Touchable */}
          <View
            style={StyleSheet.applyWidth(
              { flexGrow: 0, flexShrink: 0 },
              dimensions.width
            )}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(MessagingScreenDisplayOnlyScreen);
