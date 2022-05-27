import  React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Screens/Home';
import { ScreenNameHome, ScreenNameHomeDetailsModal, ScreenNameHomeDetailsScreen } from './ScreenNames';
import { STRINGS } from '../constants';
import DetailScreen from '../Screens/DetailScreen';

const Stack = createNativeStackNavigator();
  const RouteStack=()=>{
    return (
        <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName={ScreenNameHome}>
          <Stack.Screen   options={{ title: STRINGS.screen_message_home }} name={ScreenNameHome} component={Home} />
          <Stack.Screen   options={{ title: STRINGS.screen_message_details }} name={ScreenNameHomeDetailsScreen} component={DetailScreen} />
        </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    )
}

export default RouteStack
 