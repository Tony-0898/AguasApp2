import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigate/StackNavigator';
import { useColorScheme } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  //const backgroundColor =
  colorScheme === 'dark' ? theme['color-basic-800'] : ['color-basic-100'];

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={theme}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </ApplicationProvider>
      </GestureHandlerRootView>
    </>
  );
};
