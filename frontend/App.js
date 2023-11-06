import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/pages/Auth/Home";
import LoginScreen from "./src/pages/Auth/Login";
import SignUpScreen from "./src/pages/Auth/SignUp";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen}/>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen}/>
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
