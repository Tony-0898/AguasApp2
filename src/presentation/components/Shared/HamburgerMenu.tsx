import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Pressable, Text } from 'react-native';

export const HamburgerMenu = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => {
            console.log('TOGGLE_DRAWER');
            navigation.dispatch(DrawerActions.toggleDrawer);
          }}
        >
          <Text>Menu</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return <></>;
};
