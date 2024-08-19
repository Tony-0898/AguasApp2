import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
//import { LoginScreen } from '../screens/login/LoginScreen';
//import { UserScreen } from '../screens/user/UserScreen';
import { useWindowDimensions, View } from 'react-native';
import { UserScreen } from '../sreens/user/UserScreen';
import { LoginScreen } from '../sreens/login/LoginScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: width >= 758 ? 'permanent' : 'front',
        headerShown: false,
        drawerActiveTintColor: 'white',
        drawerItemStyle: {
          borderRadius: 100,
          paddingHorizontal: 20,
        },
      }}
    >
      <Drawer.Screen name="User" component={UserScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
};

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          borderRadius: 50,
          margin: 30,
        }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};