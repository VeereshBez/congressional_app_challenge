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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PlayPage from './pages/Play';
import SettingsPage from './pages/Settings'
import IssuesPage from './pages/Issues'
import LeaderboardPage from './pages/Leaderboard';
import {lessonReducer} from './state/lessons'


const Tab = createBottomTabNavigator();
const Tab2 = createBottomTabNavigator();

const store = configureStore({
  reducer: {
    user: userReducer,
    lesson: lessonReducer
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
    <Tab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
      <Tab.Screen name="LogIn" component={LoginPage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Tab2.Navigator initialRouteName='Learn' 
            screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Learn':
                iconName = focused ? 'book' : 'book-outline';
                break;
              case 'Play':
                iconName = focused ? 'game-controller' : 'game-controller-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              case 'Settings':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
              case 'Issues':
                iconName = focused ? 'megaphone' : 'megaphone-outline';
                break;
              case 'Leaderboard':
                iconName = focused ? 'trophy' : 'trophy-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#4169E1', // Example: dark slate
            borderTopWidth: 0,
          },
        })}
    >
      <Tab2.Screen name="Learn" component={LearnPage} />
      <Tab2.Screen name="Profile" component={Profile} />
      <Tab2.Screen name="Play" component={PlayPage} />
      <Tab2.Screen name="Issues" component={IssuesPage} />
      <Tab2.Screen name="Leaderboard" component={LeaderboardPage} />
      <Tab2.Screen name="Settings" component={SettingsPage} />
    </Tab2.Navigator>
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
