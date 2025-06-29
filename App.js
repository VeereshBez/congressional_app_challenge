import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import BillsPage from './pages/Bills';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';
import { userReducer } from './state/user';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

const Tab = createDrawerNavigator();
const SideBar = createDrawerNavigator();

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function AuthDrawer() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
      <Tab.Screen name="LogIn" component={LoginPage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <SideBar.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <SideBar.Screen name="Bills" component={BillsPage} />
    </SideBar.Navigator>
  );
}

function AppNavigator() {
  const isLogged = useSelector(state => state.user.isLoggedIn);
  return isLogged ? <MainNavigator /> : <AuthDrawer />;
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null; // or loading spinner
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
