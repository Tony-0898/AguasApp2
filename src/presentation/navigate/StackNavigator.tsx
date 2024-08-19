/*import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CalendarScreen} from '../sreens/calendar/CalendarScreen';
import {MapScreen} from '../sreens/map/MapScreeen';
import {ReleaseScreen} from '../sreens/release/ReleaseScreen';
import {UserScreen} from '../sreens/user/UserScreen';
import {LoginScreen} from '../sreens/login/LoginScreen';
import { HomeScreen } from '../sreens/home/HomeScreen';

const Tab = createBottomTabNavigator();

export const StackNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4386f8',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Cominicado"
        component={HomeScreen}
        options={{title: 'Comunicado'}}
      />
      <Tab.Screen
        name="Calendario"
        component={CalendarScreen}
        options={{title: 'Calendario'}}
      />
      <Tab.Screen
        name="Mapa"
        component={MapScreen}
        options={{title: 'Mapa'}}
      />
      <Tab.Screen
        name="Reporte"
        component={ReleaseScreen}
        options={{title: 'Reporte'}}
      />
      <Tab.Screen
        name="Usuario"
        component={UserScreen}
        options={{title: 'Usuario'}}
      />
      <Tab.Screen
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};*/

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarScreen } from '../sreens/calendar/CalendarScreen';
import { MapScreen } from '../sreens/map/MapScreeen';
import { ReleaseScreen } from '../sreens/release/ReleaseScreen';
import { UserScreen } from '../sreens/user/UserScreen';
import { LoginScreen } from '../sreens/login/LoginScreen';
import { HomeScreen } from '../sreens/home/HomeScreen';
import { Icon } from '@ui-kitten/components';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

const Tab = createBottomTabNavigator();

export const StackNavigator = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
              backgroundColor: '#27AAE1',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Comunicado':
                  iconName = 'home-outline';
                  break;
                case 'Calendario':
                  iconName = 'calendar-outline';
                  break;
                case 'Mapa':
                  iconName = 'map-outline';
                  break;
                case 'Reporte':
                  iconName = 'file-text-outline';
                  break;
                case 'Usuario':
                  iconName = 'person-outline';
                  break;
                case 'Login':
                  iconName = 'log-in-outline';
                  break;
                default:
                  iconName = 'question-mark-outline';
                  break;
              }

              return <Icon name={iconName} fill={color} style={{ width: size, height: size }} />;
            },
          })}
        >
          <Tab.Screen name="Comunicado" component={HomeScreen} />
          <Tab.Screen name="Calendario" component={CalendarScreen} />
          <Tab.Screen name="Mapa" component={MapScreen} />
          <Tab.Screen name="Reporte" component={ReleaseScreen} />
          <Tab.Screen name="Usuario" component={UserScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
          
        </Tab.Navigator>
      </ApplicationProvider>
    </>
  );
};