import React from 'react';
import { MapMarker, MapView } from '@draftbit/maps';
import {
  Button,
  LoadingIndicator,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { editingEvent: null, editingEventId: null };

const PickAMeetupLocationScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [pinLat, setPinLat] = React.useState(0);
  const [pinLon, setPinLon] = React.useState(0);
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
      hasSafeArea={false}
      scrollable={false}
      hasLeftSafeArea={false}
      hasRightSafeArea={false}
      hasTopSafeArea={false}
    >
      <MapView
        apiKey={'AIzaSyBzktToWosjNgrrUawZnbslB9NSXSXCkwo'}
        autoClusterMarkers={false}
        autoClusterMarkersDistanceMeters={10000}
        customMapStyle={'Lorem ipsum dolor sit amet'}
        loadingEnabled={true}
        moveOnMarkerPress={true}
        onPress={(latitude, longitude) => {
          try {
            setPinLat(latitude);
            setPinLon(longitude);
          } catch (err) {
            console.error(err);
          }
        }}
        onRegionChange={newRegion => {
          try {
            setPinLat(newRegion?.latitude);
            setPinLon(newRegion?.longitude);
          } catch (err) {
            console.error(err);
          }
        }}
        scrollEnabled={true}
        showsCompass={false}
        zoomEnabled={true}
        {...GlobalStyles.MapViewStyles(theme)['Map View'].props}
        followsUserLocation={true}
        latitude={48.738521}
        loadingBackgroundColor={
          palettes['Trail Twin']['Background - Trail Twin']
        }
        loadingIndicatorColor={
          palettes['Trail Twin']['Primary Green - Trail Twin']
        }
        longitude={-122.481657}
        mapType={'hybrid'}
        provider={'google'}
        rotateEnabled={false}
        showsPointsOfInterest={false}
        showsUserLocation={true}
        style={StyleSheet.applyWidth(
          GlobalStyles.MapViewStyles(theme)['Map View'].style,
          dimensions.width
        )}
        zoom={9}
      >
        <MapMarker
          androidUseDefaultIconImplementation={false}
          tracksViewChanges={true}
          flat={false}
          latitude={pinLat}
          longitude={pinLon}
          pinColor={palettes['Trail Twin']['Pin Color - Trail twin']}
          pinImage={imageSource(Images['location2'])}
          pinImageSize={100}
        />
      </MapView>
      {/* Button */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['Trail Twin']['Background - Trail Twin'],
            borderColor: theme.colors.border.brand,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderTopWidth: 1,
            borderWidth: 1,
            bottom: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            left: 0,
            paddingBottom: 48,
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 32,
            position: 'absolute',
            right: 0,
            zIndex: 1,
          },
          dimensions.width
        )}
      >
        <Button
          iconPosition={'left'}
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'loading',
                value: true,
              });
              setGlobalVariableValue({
                key: 'meetupLat',
                value: pinLat,
              });
              setGlobalVariableValue({
                key: 'meetupLon',
                value: pinLon,
              });

              showAlertUtil({
                title: undefined,
                message: 'Meetup Spot Selected',
                buttonText: undefined,
              });

              if (
                props.route?.params?.editingEvent ??
                defaultProps.editingEvent
              ) {
                navigation.navigate('EditEventScreen', {
                  id:
                    props.route?.params?.editingEventId ??
                    defaultProps.editingEventId,
                });
              } else {
                navigation.navigate('CreateEventScreen');
              }
            } catch (err) {
              console.error(err);
            }
          }}
          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['Button'].style,
              {
                backgroundColor:
                  palettes['Trail Twin']['Secondary Green #2 - Trail Twin'],
                fontFamily: 'Inter_400Regular',
                fontSize: 14,
                height: 5,
                marginTop: 32,
                width: '100%',
              }
            ),
            dimensions.width
          )}
          title={'Select Location'}
        />
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
    </ScreenContainer>
  );
};

export default withTheme(PickAMeetupLocationScreen);
