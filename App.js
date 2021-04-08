import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Connexion">
        <Stack.Screen name="Signin" component={SigninScreen} options={{ title: 'Connexion', headerTitleAlign: 'center'}} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'S\'inscrire', headerTitleAlign: 'center'}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerLeft: null, headerTitleAlign: 'center'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
