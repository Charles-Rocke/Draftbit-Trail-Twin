import React from 'react';
import {
  Button,
  DatePicker,
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
import * as GlobalVariables from '../config/GlobalVariableContext';
import displayNoFilter from '../global-functions/displayNoFilter';
import formatAmPm from '../global-functions/formatAmPm';
import formatHours from '../global-functions/formatHours';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const FilterEventsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [ampm, setAmpm] = React.useState(null);
  const [pickerValue, setPickerValue] = React.useState('');
  const [sliderValue, setSliderValue] = React.useState(0);
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
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
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
          {/* Date View */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', justifyContent: 'space-between' },
              dimensions.width
            )}
          >
            {/* Min Date */}
            <View
              style={StyleSheet.applyWidth({ width: '45%' }, dimensions.width)}
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
                {'Min Date'}
              </Text>
              {/* dateInput */}
              <DatePicker
                autoDismissKeyboard={true}
                disabled={false}
                label={'Date'}
                leftIconMode={'inset'}
                mode={'date'}
                onDateChange={newDateInputValue => {
                  console.log('dateInput ON_DATE_CHANGE Start');
                  let error = null;
                  try {
                    console.log('Start ON_DATE_CHANGE:0 SET_VARIABLE');
                    setGlobalVariableValue({
                      key: 'minDateFilter',
                      value: newDateInputValue,
                    });
                    console.log('Complete ON_DATE_CHANGE:0 SET_VARIABLE');
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'dateInput ON_DATE_CHANGE Complete',
                    error ? { error } : 'no error'
                  );
                }}
                date={Constants['minDateFilter']}
                format={'mm/dd/yyyy'}
                hideLabel={true}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor:
                      palettes['Trail Twin']['Background - Trail Twin'],
                    borderColor: theme.colors.text.light,
                    borderRadius: 12,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    marginTop: 8,
                    paddingLeft: 5,
                    paddingRight: 5,
                  },
                  dimensions.width
                )}
                type={'solid'}
              />
            </View>
            {/* Max Date */}
            <View
              style={StyleSheet.applyWidth({ width: '45%' }, dimensions.width)}
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
                {'Max Date'}
              </Text>
              {/* dateInput */}
              <DatePicker
                autoDismissKeyboard={true}
                disabled={false}
                label={'Date'}
                leftIconMode={'inset'}
                mode={'date'}
                onDateChange={newDateInputValue => {
                  console.log('dateInput ON_DATE_CHANGE Start');
                  let error = null;
                  try {
                    console.log('Start ON_DATE_CHANGE:0 SET_VARIABLE');
                    setGlobalVariableValue({
                      key: 'maxDateFilter',
                      value: newDateInputValue,
                    });
                    console.log('Complete ON_DATE_CHANGE:0 SET_VARIABLE');
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'dateInput ON_DATE_CHANGE Complete',
                    error ? { error } : 'no error'
                  );
                }}
                borderColorActive={theme.colors.text.strong}
                date={Constants['maxDateFilter']}
                format={'mm/dd/yyyy'}
                hideLabel={true}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor:
                      palettes['Trail Twin']['Background - Trail Twin'],
                    borderColor: theme.colors.text.light,
                    borderRadius: 12,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    marginTop: 8,
                    paddingLeft: 5,
                    paddingRight: 5,
                  },
                  dimensions.width
                )}
                type={'solid'}
              />
            </View>
          </View>
          {/* Distance */}
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
                {'Distance Away'}
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
                {metersToMile(Constants['searchRadius'])}
                {' Miles'}
              </Text>
            </View>
            <Slider
              onValueChange={newSliderValue => {
                try {
                  setGlobalVariableValue({
                    key: 'searchRadius',
                    value: newSliderValue,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              maximumTrackTintColor={palettes.Brand['Secondary Grey']}
              maximumValue={250000 ?? 60}
              minimumTrackTintColor={
                palettes['Trail Twin']['Secondary Green #2 - Trail Twin']
              }
              minimumValue={2000 ?? 1}
              thumbTintColor={
                palettes['Trail Twin']['Secondary Green #2 - Trail Twin']
              }
              value={Constants['searchRadius']}
            />
          </View>
          {/* Start time */}
          <View>
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                },
                dimensions.width
              )}
            >
              {/* Start Time */}
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
                {'Start Time'}
              </Text>
            </View>
            {/* After */}
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
              {/* After */}
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
                {'After'}
              </Text>
              {/* Time */}
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
                {displayNoFilter(
                  formatHours(Constants['startTimeAfterFilter'])
                )}{' '}
                {formatAmPm(ampm, Constants['startTimeAfterFilter'])}
              </Text>
            </View>
            <Slider
              onValueChange={newSliderValue => {
                try {
                  setGlobalVariableValue({
                    key: 'startTimeAfterFilter',
                    value: newSliderValue,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              maximumTrackTintColor={
                palettes['Trail Twin']['Secondary Green #2 - Trail Twin']
              }
              maximumValue={24 ?? 60}
              minimumTrackTintColor={palettes.Brand['Secondary Grey']}
              minimumValue={0 ?? 1}
              thumbTintColor={
                palettes['Trail Twin']['Secondary Green #2 - Trail Twin']
              }
              value={Constants['startTimeAfterFilter']}
            />
            {/* Before */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row', justifyContent: 'space-between' },
                dimensions.width
              )}
            >
              {/* Start Time 4 */}
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
                {'Before'}
              </Text>
              {/* Time */}
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
                {displayNoFilter(
                  formatHours(Constants['startTimeBeforeFilter'])
                )}{' '}
                {formatAmPm(ampm, Constants['startTimeBeforeFilter'])}
              </Text>
            </View>
            {/* Slider 2 */}
            <Slider
              onValueChange={newSlider2Value => {
                try {
                  setGlobalVariableValue({
                    key: 'startTimeBeforeFilter',
                    value: newSlider2Value,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              maximumTrackTintColor={palettes.Brand['Secondary Grey']}
              maximumValue={24 ?? 60}
              minimumTrackTintColor={
                palettes['Trail Twin']['Primary Green - Trail Twin']
              }
              minimumValue={0 ?? 1}
              thumbTintColor={
                palettes['Trail Twin']['Primary Green - Trail Twin']
              }
              value={Constants['startTimeBeforeFilter']}
            />
          </View>
          {/* Event Type */}
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
            {/* Event Type */}
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
                {'Event Type'}
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
                      key: 'eventTypeFilter',
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
                  { label: 'Any Type', value: 'Any Type' },
                  { label: 'Group Ride', value: 'Group Ride' },
                  { label: 'Trail Work', value: 'Trail Work' },
                  { label: 'Race', value: 'Race' },
                  { label: 'Bike Trip', value: 'Bike Trip' },
                  { label: 'Other', value: 'Other' },
                ]}
                placeholder={'Select options'}
                rightIconName={'AntDesign/down'}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.Brand.Surface,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    position: 'relative',
                  },
                  dimensions.width
                )}
                value={Constants['eventTypeFilter']}
              />
            </View>
          </View>
          {/* Tags View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                flex: 1,
                justifyContent: 'space-evenly',
                zIndex: -1,
              },
              dimensions.width
            )}
          >
            {/* Event Tags */}
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
                {'Tags'}
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
                      key: 'tagsFilter',
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
                  { label: 'Jump session', value: 'Jump session' },
                  { label: 'Dirt Jumping', value: 'Dirt Jumping' },
                  { label: 'Enduro', value: 'Enduro' },
                  { label: 'Freeride', value: 'Freeride' },
                  { label: 'Flow Trails', value: 'Flow Trails' },
                  { label: 'Tech Trails', value: 'Tech Trails' },
                  { label: 'Private Trails', value: 'Private Trails' },
                  { label: 'Bmx', value: 'Bmx' },
                  { label: 'E-Bikes', value: 'E-Bikes' },
                  { label: 'Hard Tails', value: 'Hard Tails' },
                  { label: 'Full Suspensions', value: 'Full Suspensions' },
                  { label: 'Beginner Friendly', value: 'Beginner Friendly' },
                  { label: 'Training Ride', value: 'Training Ride' },
                  { label: 'Coaching', value: 'Coaching' },
                  { label: 'No Coaching', value: 'No Coaching' },
                  { label: 'Scenic Ride', value: 'Scenic Ride' },
                  { label: 'Slow Climb', value: 'Slow Climb' },
                  { label: 'Fast Climb', value: 'Fast Climb' },
                  { label: 'Fitness Ride', value: 'Fitness Ride' },
                  { label: 'First Aid Trained', value: 'First Aid Trained' },
                  { label: 'Shuttle Service', value: 'Shuttle Service' },
                  { label: 'Bike Park', value: 'Bike Park' },
                  { label: 'Mixed Gender', value: 'Mixed Gender' },
                  { label: 'Females', value: 'Females' },
                  { label: 'Males', value: 'Males' },
                  { label: 'LGBTQ+', value: 'LGTBQ+' },
                  { label: 'Volunteer Work', value: 'Volunteer Work' },
                  { label: 'Paid Work', value: 'Paid Work' },
                  {
                    label: 'Authorized Trail Work',
                    value: 'Authorized Trail Work',
                  },
                  { label: 'Trail Sculpting', value: 'Trail Sculpting' },
                  { label: 'Trail Digging', value: 'Trail Digging' },
                  { label: 'Trail Maintenance', value: 'Trail Maintenance' },
                  { label: 'Tools Provied', value: 'Tools Provided' },
                  { label: 'Tools Not Provided', value: 'Tools Not Provided' },
                  { label: 'Waiver Required', value: 'Waiver Required' },
                  { label: 'Ages 18-25', value: 'Ages 18-25' },
                  { label: 'Ages 26-30', value: 'Ages 26-30' },
                  { label: 'Ages 30-40', value: 'Ages 30-40' },
                  { label: 'Ages 40-50', value: 'Ages 40-50' },
                  { label: 'Ages 50+', value: 'Ages 50+' },
                ]}
                placeholder={'Select options'}
                rightIconName={'AntDesign/down'}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.Brand.Surface,
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    position: 'relative',
                  },
                  dimensions.width
                )}
                value={Constants['tagsFilter']}
              />
            </View>
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
            {/* Event Skill */}
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
                      key: 'skillLevelFilter',
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
                    color: palettes.Brand['Secondary Text'],
                    fontFamily: 'Inter_300Light',
                    position: 'relative',
                  },
                  dimensions.width
                )}
                value={Constants['skillLevelFilter']}
              />
            </View>
          </View>
          {/* Trail Name */}
          <View style={StyleSheet.applyWidth({ zIndex: -3 }, dimensions.width)}>
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
              {'Trail'}
            </Text>
            {/* trailNameInput */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTrailNameInputValue => {
                try {
                  setGlobalVariableValue({
                    key: 'trailFilter',
                    value: newTrailNameInputValue,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              maxLength={64}
              placeholder={'Enter keywords for a trail or trail network'}
              placeholderTextColor={theme.colors.text.light}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes['Trail Twin']['White - Trail Twin'],
                  borderBottomWidth: 1,
                  borderColor: theme.colors.text.light,
                  borderLeftWidth: 1,
                  borderRadius: 12,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  color: palettes.Brand['Secondary Text'],
                  fontFamily: 'Inter_300Light',
                  height: 48,
                  marginTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingRight: 8,
                  paddingTop: 8,
                },
                dimensions.width
              )}
              value={Constants['trailFilter']}
            />
          </View>
          {/* Ride Name */}
          <View style={StyleSheet.applyWidth({ zIndex: -4 }, dimensions.width)}>
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
              {'Event Name'}
            </Text>
            {/* rideNameInput */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newRideNameInputValue => {
                try {
                  setGlobalVariableValue({
                    key: 'rideNameFilter',
                    value: newRideNameInputValue,
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              webShowOutline={true}
              maxLength={64}
              placeholder={'Enter keywords for the event name'}
              placeholderTextColor={theme.colors.text.light}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes['Trail Twin']['White - Trail Twin'],
                  borderBottomWidth: 1,
                  borderColor: theme.colors.text.light,
                  borderLeftWidth: 1,
                  borderRadius: 12,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  color: palettes.Brand['Secondary Text'],
                  fontFamily: 'Inter_300Light',
                  height: 48,
                  marginTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 20,
                  paddingRight: 8,
                  paddingTop: 8,
                },
                dimensions.width
              )}
              value={Constants['rideNameFilter']}
            />
          </View>
          {/* Apply View */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', justifyContent: 'center', zIndex: 1 },
              dimensions.width
            )}
          >
            {/* Apply Button */}
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
                        key: 'eventTypeFilter',
                        value: checkForNoFilter(Constants['eventTypeFilter']),
                      });
                      setGlobalVariableValue({
                        key: 'skillLevelFilter',
                        value: checkForNoFilter(Constants['skillLevelFilter']),
                      });
                      navigation.navigate('BottomTabNavigator', {
                        screen: 'EventMapScreen',
                      });
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
                        key: 'minDateFilter',
                        value: null,
                      });
                      setGlobalVariableValue({
                        key: 'maxDateFilter',
                        value: null,
                      });
                      undefined;
                      setGlobalVariableValue({
                        key: 'eventTypeFilter',
                        value: null,
                      });
                      setGlobalVariableValue({
                        key: 'tagsFilter',
                        value: null,
                      });
                      setGlobalVariableValue({
                        key: 'skillLevelFilter',
                        value: null,
                      });
                      setGlobalVariableValue({
                        key: 'trailFilter',
                        value: null,
                      });
                      setGlobalVariableValue({
                        key: 'rideNameFilter',
                        value: null,
                      });
                      navigation.navigate('BottomTabNavigator', {
                        screen: 'EventMapScreen',
                      });
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

export default withTheme(FilterEventsScreen);
