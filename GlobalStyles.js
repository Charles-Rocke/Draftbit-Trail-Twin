import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

import palettes from './themes/palettes';

export const ImageStyles = theme =>
  StyleSheet.create({
    Image: { style: { height: 100, width: 100 }, props: {} },
    'Image 2': { style: { height: 100, width: 100 }, props: {} },
  });

export const CircleStyles = theme =>
  StyleSheet.create({
    Circle: {
      style: {
        alignItems: 'center',
        backgroundColor: theme.colors.branding.primary,
        justifyContent: 'center',
      },
      props: {},
    },
  });

export const DividerStyles = theme =>
  StyleSheet.create({ Divider: { style: { height: 1 }, props: {} } });

export const TextStyles = theme =>
  StyleSheet.create({
    Text: { style: { color: theme.colors.text.strong }, props: {} },
    'Text 2': { style: { color: theme.colors.text.strong }, props: {} },
  });

export const H1Styles = theme =>
  StyleSheet.create({
    H1: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 32,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const H2Styles = theme =>
  StyleSheet.create({
    H2: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 24,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const H3Styles = theme =>
  StyleSheet.create({
    H3: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 18.72,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const H4Styles = theme =>
  StyleSheet.create({
    H4: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 16,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const H5Styles = theme =>
  StyleSheet.create({
    H5: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 13.28,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    'App Btns': {
      style: {
        backgroundColor: theme.colors.border.brand,
        borderBottomWidth: 1,
        borderColor: theme.colors.text.light,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        color: theme.colors.text.strong,
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        textAlign: 'center',
        width: '45%',
      },
      props: {},
    },
    Button: {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
    'Sign Up': {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
    'Upload Photo': {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
  });

export const H6Styles = theme =>
  StyleSheet.create({
    H6: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 10.72,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Age Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
    'Name Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
    'Text Area': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
    'Text Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const SquareStyles = theme =>
  StyleSheet.create({
    Square: {
      style: {
        alignItems: 'center',
        backgroundColor: theme.colors.branding.primary,
        justifyContent: 'center',
      },
      props: {},
    },
  });

export const LottieAnimationStyles = theme =>
  StyleSheet.create({
    'Lottie Animation': { style: { height: 100, width: 100 }, props: {} },
  });

export const ActivityIndicatorStyles = theme =>
  StyleSheet.create({
    'Activity Indicator': { style: { height: 36, width: 36 }, props: {} },
  });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { style: { minHeight: 40 }, props: {} } });

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({ 'Image Background': { style: { flex: 1 }, props: {} } });

export const NumberInputStyles = theme =>
  StyleSheet.create({
    'Number Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const LinkStyles = theme =>
  StyleSheet.create({
    Link: { style: { color: theme.colors.branding.primary }, props: {} },
  });

export const MapViewStyles = theme =>
  StyleSheet.create({
    'Map View': {
      style: { flex: 1, height: '100%', width: '100%' },
      props: {},
    },
  });

export const ViewStyles = theme =>
  StyleSheet.create({
    Messages: { style: {}, props: {} },
    'header action': {
      style: {
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        width: 48,
      },
      props: {},
    },
  });

export const DeckSwiperStyles = theme =>
  StyleSheet.create({
    'Deck Swiper': { style: { position: 'absolute' }, props: {} },
  });

export const DeckSwiperCardStyles = theme =>
  StyleSheet.create({
    'Deck Swiper Card': {
      style: {
        alignItems: 'center',
        borderWidth: 2,
        justifyContent: 'center',
        padding: 20,
      },
      props: {},
    },
  });

export const WebViewStyles = theme =>
  StyleSheet.create({ 'HTML View': { style: { flex: 1 }, props: {} } });
