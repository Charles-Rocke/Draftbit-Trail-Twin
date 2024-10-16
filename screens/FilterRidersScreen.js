import React from 'react';
import {
  Button,
  LoadingIndicator,
  MultiSelectPicker,
  ScreenContainer,
  SimpleStyleScrollView,
  Slider,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const FilterRidersScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [ampm, setAmpm] = React.useState(null);
  const [pickerValue, setPickerValue] = React.useState('');
  const [sliderValue, setSliderValue] = React.useState(0);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const metersToMile = meters => {
    const metersInAMile = 1609.34;
    const miles = meters / metersInAMile;
    return Math.floor(miles);
  };

  const checkForNoFilter = value => {
    const specialValues = ['Any Skill Level', 'Any Type'];

    if (specialValues.includes(value)) {
      return null;
    }

    return value;
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
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes['Trail Twin']['Background - Trail Twin'] },
        dimensions.width
      )}
    >
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor:
                palettes['Trail Twin']['Background - Trail Twin'],
              gap: 48,
              marginBottom: 256,
              marginLeft: 32,
              marginRight: 32,
              marginTop: 64,
            },
            dimensions.width
          )}
        >
          {/* Name */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                flex: 1,
                justifyContent: 'space-evenly',
              },
              dimensions.width
            )}
          >
            {/* Name */}
            <View
              style={StyleSheet.applyWidth(
                { position: 'relative' },
                dimensions.width
              )}
            >
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginBottom: 8,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Name'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setGlobalVariableValue({
                      key: 'userNameFilter',
                      value: newTextInputValue,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                placeholder={'Enter a name'}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      backgroundColor:
                        palettes['Trail Twin']['White - Trail Twin'],
                      borderColor: palettes.Brand['Secondary Grey'],
                      color: palettes.Brand['Secondary Grey'],
                      fontFamily: 'Inter_300Light',
                      paddingBottom: 18,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 18,
                    }
                  ),
                  dimensions.width
                )}
                value={Constants['userNameFilter']}
              />
            </View>
          </View>
          {/* Location */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                flex: 1,
                justifyContent: 'space-evenly',
              },
              dimensions.width
            )}
          >
            {/* Name */}
            <View
              style={StyleSheet.applyWidth(
                { position: 'relative' },
                dimensions.width
              )}
            >
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginBottom: 8,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Location'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setGlobalVariableValue({
                      key: 'userLocationFilter',
                      value: newTextInputValue,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                placeholder={'Enter a location'}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      backgroundColor:
                        palettes['Trail Twin']['White - Trail Twin'],
                      borderColor: palettes.Brand['Secondary Grey'],
                      color: palettes.Brand['Secondary Grey'],
                      fontFamily: 'Inter_300Light',
                      paddingBottom: 18,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 18,
                    }
                  ),
                  dimensions.width
                )}
                value={Constants['userLocationFilter']}
              />
            </View>
          </View>
          {/* Age */}
          <View>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 12,
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
                    fontSize: 16,
                  },
                  dimensions.width
                )}
              >
                {'Age'}
              </Text>

              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                  },
                  dimensions.width
                )}
              >
                {Constants['userAgeFilter']}
              </Text>
            </View>
            <Slider
              onValueChange={newSliderValue => {
                try {
                  setGlobalVariableValue({
                    key: 'userAgeFilter',
                    value: newSliderValue,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              maximumTrackTintColor={palettes.Brand['Secondary Grey']}
              maximumValue={70 ?? 60}
              minimumTrackTintColor={
                palettes['Trail Twin']['Secondary Green #2 - Trail Twin']
              }
              minimumValue={0 ?? 1}
              thumbTintColor={
                palettes['Trail Twin']['Secondary Green #2 - Trail Twin']
              }
              value={Constants['userAgeFilter']}
            />
          </View>
          {/* Skill Level */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                flex: 1,
                justifyContent: 'space-evenly',
                zIndex: -2,
              },
              dimensions.width
            )}
          >
            {/* Skill */}
            <View
              style={StyleSheet.applyWidth(
                { position: 'relative' },
                dimensions.width
              )}
            >
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginBottom: 8,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Skill Level'}
              </Text>
              <MultiSelectPicker
                autoDismissKeyboard={true}
                dropDownBackgroundColor={theme.colors.background.brand}
                dropDownBorderColor={theme.colors.border.brand}
                dropDownBorderRadius={8}
                dropDownBorderWidth={1}
                dropDownTextColor={theme.colors.text.strong}
                iconSize={24}
                leftIconMode={'inset'}
                onValueChange={newMultiSelectPickerValue => {
                  try {
                    setGlobalVariableValue({
                      key: 'userSkillLevelFilter',
                      value: newMultiSelectPickerValue,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                selectedIconColor={theme.colors.text.strong}
                selectedIconName={'Feather/check'}
                selectedIconSize={20}
                type={'solid'}
                options={[
                  { label: 'Any Skill Level', value: 'Any Skill Level' },
                  { label: 'Beginner', value: 'Beginner' },
                  { label: 'Intermediate', value: 'Intermediate' },
                  { label: 'Advanced', value: 'Advanced' },
                  { label: 'Pro', value: 'Pro' },
                ]}
                placeholder={'Select options'}
                rightIconName={'AntDesign/down'}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.Brand.Surface,
                    borderColor: palettes.Brand['Secondary Grey'],
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    position: 'relative',
                  },
                  dimensions.width
                )}
                value={Constants['userSkillLevelFilter']}
              />
            </View>
          </View>
          {/* Riding Style */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                flex: 1,
                justifyContent: 'space-evenly',
                zIndex: -2,
              },
              dimensions.width
            )}
          >
            {/* Riding Style */}
            <View
              style={StyleSheet.applyWidth(
                { position: 'relative' },
                dimensions.width
              )}
            >
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginBottom: 8,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Riding Style'}
              </Text>
              <MultiSelectPicker
                autoDismissKeyboard={true}
                dropDownBackgroundColor={theme.colors.background.brand}
                dropDownBorderColor={theme.colors.border.brand}
                dropDownBorderRadius={8}
                dropDownBorderWidth={1}
                dropDownTextColor={theme.colors.text.strong}
                iconSize={24}
                leftIconMode={'inset'}
                onValueChange={newMultiSelectPickerValue => {
                  try {
                    setGlobalVariableValue({
                      key: 'userRidingStyleFilter',
                      value: newMultiSelectPickerValue,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                selectedIconColor={theme.colors.text.strong}
                selectedIconName={'Feather/check'}
                selectedIconSize={20}
                type={'solid'}
                options={[
                  { label: 'Any Skill Level', value: 'Any Skill Level' },
                  { label: 'Beginner', value: 'Beginner' },
                  { label: 'Intermediate', value: 'Intermediate' },
                  { label: 'Advanced', value: 'Advanced' },
                  { label: 'Pro', value: 'Pro' },
                ]}
                placeholder={'Select options'}
                rightIconName={'AntDesign/down'}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.Brand.Surface,
                    borderColor: palettes.Brand['Secondary Grey'],
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    position: 'relative',
                  },
                  dimensions.width
                )}
                value={Constants['userRidingStyleFilter']}
              />
            </View>
          </View>
          {/* Looking For */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                flex: 1,
                justifyContent: 'space-evenly',
                zIndex: -2,
              },
              dimensions.width
            )}
          >
            {/* Looking For */}
            <View
              style={StyleSheet.applyWidth(
                { position: 'relative' },
                dimensions.width
              )}
            >
              {/* Label */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginBottom: 8,
                    opacity: 0.85,
                  },
                  dimensions.width
                )}
              >
                {'Looking For'}
              </Text>
              <MultiSelectPicker
                autoDismissKeyboard={true}
                dropDownBackgroundColor={theme.colors.background.brand}
                dropDownBorderColor={theme.colors.border.brand}
                dropDownBorderRadius={8}
                dropDownBorderWidth={1}
                dropDownTextColor={theme.colors.text.strong}
                iconSize={24}
                leftIconMode={'inset'}
                onValueChange={newMultiSelectPickerValue => {
                  try {
                    setGlobalVariableValue({
                      key: 'userLookingForFilter',
                      value: newMultiSelectPickerValue,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                selectedIconColor={theme.colors.text.strong}
                selectedIconName={'Feather/check'}
                selectedIconSize={20}
                type={'solid'}
                options={[
                  { label: 'Any Skill Level', value: 'Any Skill Level' },
                  { label: 'Beginner', value: 'Beginner' },
                  { label: 'Intermediate', value: 'Intermediate' },
                  { label: 'Advanced', value: 'Advanced' },
                  { label: 'Pro', value: 'Pro' },
                ]}
                placeholder={'Select options'}
                rightIconName={'AntDesign/down'}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.Brand.Surface,
                    borderColor: palettes.Brand['Secondary Grey'],
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    position: 'relative',
                  },
                  dimensions.width
                )}
                value={Constants['userLookingForFilter']}
              />
            </View>
          </View>
          {/* Apply view */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', justifyContent: 'center', zIndex: 1 },
              dimensions.width
            )}
          >
            {/* Apply filter */}
            <>
              {Constants['loading'] ? null : (
                <Button
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'loading',
                        value: true,
                      });
                      navigation.navigate('RootNavigator');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  disabled={undefined ? undefined : undefined}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor:
                        palettes['Trail Twin']['Primary Green - Trail Twin'],
                      borderRadius: 8,
                      fontFamily: 'Inter_500Medium',
                      fontSize: 14,
                      height: 5,
                      textAlign: 'center',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                  title={'Apply Filter'}
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
          {/* remove filter */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 256, zIndex: 1 },
              dimensions.width
            )}
          >
            {/* Clear Filter */}
            <>
              {Constants['loading'] ? null : (
                <Button
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setGlobalVariableValue({
                        key: 'loading',
                        value: true,
                      });
                      setGlobalVariableValue({
                        key: 'userAgeFilter',
                        value: null,
                      });
                      setGlobalVariableValue({
                        key: 'userSkillLevelFilter',
                        value: null,
                      });
                      setGlobalVariableValue({
                        key: 'userRidingStyleFilter',
                        value: null,
                      });
                      navigation.navigate('RootNavigator');
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  disabled={undefined ? undefined : undefined}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor:
                        palettes['Trail Twin']['Primary Green - Trail Twin'],
                      borderRadius: 8,
                      fontFamily: 'Inter_500Medium',
                      fontSize: 14,
                      height: 5,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                  title={'Remove Filter'}
                />
              )}
            </>
          </View>
        </View>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(FilterRidersScreen);
