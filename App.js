import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home'
import {createDrawerNavigator} from '@react-navigation/drawer'
import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import {Provider} from 'react-redux'
import { userReducer } from './state/user';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';


const Tab = createDrawerNavigator()

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

function AuthDrawer() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false}} />
      <Tab.Screen name="Register" component={RegisterPage} options={{ headerShown: false}} />
      <Tab.Screen name="LogIn" component={LoginPage} options={{ headerShown: false}}  />
    </Tab.Navigator>
  )
}

export default function App() {
  let fontsLoaded = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
});
  return (
    <Provider store={store} style={{fontFamily: 'Roboto_400Regular'}}>
      <NavigationContainer>
      <AuthDrawer />
      </NavigationContainer>
    </Provider>
  );
}