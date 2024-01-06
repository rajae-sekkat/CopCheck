import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PageAcceuil from './Screens/PageAcceuil';
import Page2 from './Screens/Page2';
import Page3 from './Screens/Page3';
import Page4 from './Screens/Page4';
import Page5 from './Screens/Page5';
import PageCamera from './Screens/PageCamera';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageAcceuil" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PageAcceuil" component={PageAcceuil} />
        <Stack.Screen name="Page2" component={Page2} />
        <Stack.Screen name="Page3" component={Page3} />
        <Stack.Screen name="Page4" component={Page4} />
        <Stack.Screen name="Page5" component={Page5} />
        <Stack.Screen name="PageCamera" component={PageCamera} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

