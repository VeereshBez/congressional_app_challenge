import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import BillsPage from './pages/Bills';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { clearUser, userReducer } from './state/user';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import LearnPage from './pages/Learn';
import Profile from './pages/Profile';
import AuthButton from './components/AuthButton';

const Tab = createDrawerNavigator();
const SideBar = createDrawerNavigator();

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

function CustomDrawerContent(props) {
  const dispatch = useDispatch()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <AuthButton title="Logout" onPress={() => dispatch(clearUser())} />
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
    <SideBar.Navigator 
      screenOptions={{
    headerStyle: {
      backgroundColor: '#4169E1',  // nav bar background color
    },
    headerTintColor: '#FFFFFF',     // color for text & icons in the nav bar
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
    drawerContent={props => <CustomDrawerContent {...props} 
    />}>
      {/* <SideBar.Screen options={{ headerTitle: '' }} name="Profile" component={Profile} /> */}
      <SideBar.Screen options={{ headerTitle: '' }} name="Learn" component={LearnPage} />
      <SideBar.Screen options={{ headerTitle: '' }} name="Bills" component={BillsPage} />
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
