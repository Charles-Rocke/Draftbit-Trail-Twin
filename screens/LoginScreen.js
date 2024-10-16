import React from 'react';
import {
  Button,
  LoadingIndicator,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as SupabaseAuthApi from '../apis/SupabaseAuthApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const LoginScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [emailInputV1, setEmailInputV1] = React.useState('');
  const [error_message, setError_message] = React.useState('');
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [passwordInputV1, setPasswordInputV1] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const checkLoginStatus = status => {
    if (status === '200 OK') {
      return true;
    }
    return false;
  };
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
      hasBottomSafeArea={false}
      hasSafeArea={true}
      hasTopSafeArea={true}
      scrollable={true}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: '25%',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            zIndex: 1,
          },
          dimensions.width
        )}
      >
        {/* Heading */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes['Trail Twin']['White - Trail Twin'],
              fontFamily: 'Inter_300Light',
              fontSize: 48,
            },
            dimensions.width
          )}
        >
          {'Log in'}
        </Text>
      </View>

      <View
        style={StyleSheet.applyWidth(
          { justifyContent: 'center', zIndex: 1 },
          dimensions.width
        )}
      >
        {/* Form */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes['Trail Twin']['White - Trail Twin'],
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              bottom: -30,
              flex: 1,
              justifyContent: 'center',
              overflow: 'hidden',
              paddingBottom: 48,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 36,
              position: 'relative',
            },
            dimensions.width
          )}
        >
          {/* Error Message */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text 2'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text 2'].style,
                {
                  color: palettes['Trail Twin']['Black - Trail Twin'],
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                }
              ),
              dimensions.width
            )}
          >
            {Constants['ERROR_MESSAGE']}
          </Text>
          {/* Email */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}
          >
            {/* Label */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                },
                dimensions.width
              )}
            >
              {'Email'}
            </Text>
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setLoginEmail(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              editable={true}
              placeholder={'Your email'}
              style={StyleSheet.applyWidth(
                {
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderRadius: 10,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 12,
                  height: 48,
                  marginTop: 10,
                  paddingBottom: 8,
                  paddingLeft: 15,
                  paddingRight: 8,
                  paddingTop: 8,
                },
                dimensions.width
              )}
              value={loginEmail}
            />
          </View>
          {/* Password */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}
          >
            {/* Label */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                },
                dimensions.width
              )}
            >
              {'Password'}
            </Text>
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setLoginPassword(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              editable={true}
              placeholder={'********'}
              secureTextEntry={true}
              style={StyleSheet.applyWidth(
                {
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderRadius: 10,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 12,
                  height: 48,
                  marginTop: 10,
                  paddingBottom: 8,
                  paddingLeft: 15,
                  paddingRight: 8,
                  paddingTop: 8,
                },
                dimensions.width
              )}
              value={loginPassword}
            />
          </View>
          {/* Already have an account  */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 30,
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.text.strong,
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                },
                dimensions.width
              )}
            >
              {"Don't have an account?"}
            </Text>

            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('SignUpScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth({ marginLeft: 8 }, dimensions.width)}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes['Trail Twin']['Primary Green - Trail Twin'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                  },
                  dimensions.width
                )}
              >
                {'Sign up'}
              </Text>
            </Touchable>
          </View>

          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', justifyContent: 'center' },
              dimensions.width
            )}
          >
            {/* Log in Button */}
            <>
              {Constants['loading'] ? null : (
                <Button
                  iconPosition={'left'}
                  onPress={() => {
                    const handler = async () => {
                      try {
                        setGlobalVariableValue({
                          key: 'loading',
                          value: true,
                        });
                        const loginResponseJson = (
                          await SupabaseAuthApi.loginPOST(Constants, {
                            loginEmail: loginEmail,
                            loginPassword: loginPassword,
                          })
                        )?.json;
                        console.log(loginResponseJson);
                        const accessToken = loginResponseJson?.['access_token'];
                        const extractedUserID =
                          loginResponseJson?.['user']['id'];
                        const message =
                          loginResponseJson?.['error_description'];
                        setGlobalVariableValue({
                          key: 'ERROR_MESSAGE',
                          value: message,
                        });
                        console.log(accessToken, '< Extracted Auth Token');
                        if (!accessToken) {
                          return;
                        }
                        setGlobalVariableValue({
                          key: 'AUTHORIZATION_HEADER',
                          value: 'Bearer ' + accessToken,
                        });
                        setGlobalVariableValue({
                          key: 'user_id',
                          value: extractedUserID,
                        });
                        console.log(
                          Constants['AUTHORIZATION_HEADER'],
                          '- AUTH HEADER'
                        );
                        console.log(extractedUserID, '< Extracted User ID');
                        console.log(Constants['user_id'], '< users id');
                        await waitUtil({ milliseconds: 1000 });
                        navigation.navigate('BottomTabNavigator', {
                          screen: 'EventMapScreen',
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor:
                        palettes['Trail Twin'][
                          'Secondary Green #2 - Trail Twin'
                        ],
                      borderRadius: 8,
                      fontFamily: 'Inter_600SemiBold',
                      height: 5,
                      marginTop: 25,
                      textAlign: 'center',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                  title={'Log in'}
                />
              )}
            </>
            <>
              {!Constants['loading'] ? null : (
                <LoadingIndicator
                  size={30}
                  color={palettes.Brand['Secondary Grey']}
                  type={'flow'}
                />
              )}
            </>
          </View>
        </View>
      </View>
      <Image
        resizeMode={'cover'}
        {...GlobalStyles.ImageStyles(theme)['Image 2'].props}
        source={imageSource(Images['federicobottosz3ncesezqgiunsplash'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image 2'].style, {
            height: '100%',
            position: 'absolute',
            width: '100%',
          }),
          dimensions.width
        )}
      />
    </ScreenContainer>
  );
};

export default withTheme(LoginScreen);
