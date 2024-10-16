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
import * as SupabaseUsersApi from '../apis/SupabaseUsersApi.js';
import * as UserPhotosApi from '../apis/UserPhotosApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const SignUpScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [emailInputV1, setEmailInputV1] = React.useState('');
  const [nameInputV1, setNameInputV1] = React.useState('');
  const [passwordInputV1, setPasswordInputV1] = React.useState('');
  const [signupEmail, setSignupEmail] = React.useState('');
  const [signupName, setSignupName] = React.useState('');
  const [signupPassword, setSignupPassword] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');
  const [textInputValue3, setTextInputValue3] = React.useState('');
  const supabaseAuthSignupPOST = SupabaseAuthApi.useSignupPOST();
  const supabaseUsersCreateUserDataPOST =
    SupabaseUsersApi.useCreateUserDataPOST();
  const userPhotosCreateUserPhotoRowPOST =
    UserPhotosApi.useCreateUserPhotoRowPOST();
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
      hasTopSafeArea={false}
      scrollable={true}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            height: '25%',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            zIndex: 1,
          },
          dimensions.width
        )}
      >
        {/* Sign Up */}
        <Text
          accessible={true}
          selectable={false}
          numberOfLines={1}
          style={StyleSheet.applyWidth(
            {
              alignSelf: 'center',
              color: palettes['Trail Twin']['White - Trail Twin'],
              fontFamily: 'Inter_300Light',
              fontSize: 48,
            },
            dimensions.width
          )}
        >
          {'Sign up'}
        </Text>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'stretch',
            bottom: 200,
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            zIndex: 1,
          },
          dimensions.width
        )}
      >
        {/* Form */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'center',
              alignItems: 'stretch',
              alignSelf: 'auto',
              backgroundColor:
                palettes['Trail Twin']['Background - Trail Twin'],
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              overflow: 'hidden',
              paddingBottom: 48,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 48,
              position: 'relative',
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Label 2 */}
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
                  setSignupEmail(newTextInputValue);
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
              value={signupEmail}
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
                  setSignupPassword(newTextInputValue);
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
              value={signupPassword}
            />
          </View>

          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', justifyContent: 'center' },
              dimensions.width
            )}
          >
            {/* Sign up Button */}
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
                        const signupResponse = (
                          await supabaseAuthSignupPOST.mutateAsync({
                            signupEmail: signupEmail,
                            signupPassword: signupPassword,
                          })
                        )?.json;
                        console.log(signupResponse);
                        const message = signupResponse?.msg;
                        setGlobalVariableValue({
                          key: 'ERROR_MESSAGE',
                          value: message,
                        });
                        if (message) {
                          return;
                        }
                        const userUID = signupResponse?.['user']['id'];
                        console.log(userUID, 'User UID ^^');
                        setGlobalVariableValue({
                          key: 'user_id',
                          value: userUID,
                        });
                        (
                          await supabaseUsersCreateUserDataPOST.mutateAsync({
                            user_id: userUID,
                          })
                        )?.json;
                        (
                          await userPhotosCreateUserPhotoRowPOST.mutateAsync({
                            user_id: userUID,
                          })
                        )?.json;
                        await waitUtil({ milliseconds: 1000 });
                        navigation.navigate('SetupAndEditProfileScreen');
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
                      marginTop: 30,
                      textAlign: 'center',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                  title={'Sign up'}
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
          {/* Already have an account  */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 30,
                position: 'relative',
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
              {'Already have an account?'}
            </Text>

            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('RootNavigator');
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
                {'Log in'}
              </Text>
            </Touchable>
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
            width: '100%',
          }),
          dimensions.width
        )}
      />
    </ScreenContainer>
  );
};

export default withTheme(SignUpScreen);
