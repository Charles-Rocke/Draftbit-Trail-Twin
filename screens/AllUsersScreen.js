import React from 'react';
import * as DBExampleDataApi from '../apis/DBExampleDataApi.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';
import {
  Circle,
  ScreenContainer,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const AllUsersScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={true}
      hasTopSafeArea={false}
    >
      <DBExampleDataApi.FetchPeopleGET limit={18}>
        {({ loading, error, data, refetchPeople }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <SimpleStyleFlatList
              data={fetchData}
              horizontal={false}
              inverted={false}
              keyExtractor={(listData, index) =>
                listData?.id ?? listData?.uuid ?? index.toString()
              }
              keyboardShouldPersistTaps={'never'}
              listKey={'iI6NzFJa'}
              nestedScrollEnabled={false}
              onEndReachedThreshold={0.5}
              renderItem={({ item, index }) => {
                const listData = item;
                return (
                  <Touchable
                    style={StyleSheet.applyWidth(
                      {
                        marginBottom: 16,
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 16,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      <Circle bgColor={theme.colors.light} size={90}>
                        <Image
                          resizeMode={'cover'}
                          source={{ uri: `${listData?.avatar}` }}
                          style={StyleSheet.applyWidth(
                            { height: 90, width: 90 },
                            dimensions.width
                          )}
                        />
                      </Circle>
                      {/* Name, Age */}
                      <Text
                        accessible={true}
                        style={StyleSheet.applyWidth(
                          {
                            color: theme.colors.strong,
                            fontFamily: 'Poppins_400Regular',
                            fontSize: 13,
                            marginTop: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {listData?.first_name}
                        {', '}
                        {listData?.orgId}
                      </Text>
                    </View>
                  </Touchable>
                );
              }}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              numColumns={3}
              style={StyleSheet.applyWidth(
                { alignItems: 'center' },
                dimensions.width
              )}
            />
          );
        }}
      </DBExampleDataApi.FetchPeopleGET>
    </ScreenContainer>
  );
};

export default withTheme(AllUsersScreen);
