import React, { useEffect, useState } from "react";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import WatchlistScreen from "./screens/WatchlistScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./screens/DetailsScreen";
import { View, Text, SafeAreaView } from "react-native";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import auth from "@react-native-firebase/auth";

import ListingsScreen from "./screens/ListingsScreen";
import { Coin } from "./functions/types";
import SettingsScreen from "./screens/SettingsScreen";
import { ActivityIndicator } from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { BLACK, BLUE, CREAM, GRAY, GREEN, WHITE } from "./utils/colors";
import { login } from "./store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DARK_MODE } from "./utils/constants";
import { toggleTheme } from "./store/themeSlice";

export type CoinStackParams = {
  HomeScreen: undefined;
  Details: {
    coin: Coin;
  };
  ListingsScreen: {
    url: string;
    dataKey?: string;
    title: string;
  };
  SettingsScreen: undefined;
};

export type TabNavigationParams = {
  Home: undefined;
  Watchlist: undefined;
};

export type AuthNavigationParams = {
  LoginScreen: undefined;
};

const TabNavigation = createMaterialBottomTabNavigator<TabNavigationParams>();
const CoinStack = createNativeStackNavigator<CoinStackParams>();
const AuthStack = createNativeStackNavigator<AuthNavigationParams>();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

const TabNav = () => {
  const { dark } = useTheme();
  return (
    <TabNavigation.Navigator
      barStyle={{
        backgroundColor: dark ? "#14213d" : WHITE,
        elevation: 0,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const color = focused ? GREEN : "#646464";
          if (route.name === "Home") {
            return <Feather name="home" size={24} color={color} />;
          } else if (route.name === "Watchlist") {
            return <Feather name="eye" size={24} color={color} />;
          }
        },
      })}
      activeColor={GREEN}
    >
      <TabNavigation.Screen name="Home" component={HomeScreen} />
      <TabNavigation.Screen name="Watchlist" component={WatchlistScreen} />
    </TabNavigation.Navigator>
  );
};

const Container = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const dispath = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    async function getDarkMode() {
      const isDark = await AsyncStorage.getItem(DARK_MODE);
      dispath(toggleTheme(Boolean(isDark)));
    }

    getDarkMode();
  }, []);

  function onAuthStateChanged(currentUser: any) {
    dispath(
      login({
        user: currentUser
          ? {
              displayName: currentUser.displayName,
              email: currentUser.email,
              photoUrl: currentUser.photoURL,
            }
          : null,
      })
    );
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <>
      <StatusBar style={themeMode === "DARK" ? "light" : "dark"} />
      <NavigationContainer
        theme={{
          dark: themeMode === "DARK",
          colors: {
            background: themeMode === "DARK" ? BLUE : WHITE,
            border: "",
            card: "",
            notification: "",
            primary: "",
            text: themeMode === "DARK" ? WHITE : BLACK,
          },
        }}
      >
        {user ? (
          <CoinStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <CoinStack.Screen name="HomeScreen" component={TabNav} />
            <CoinStack.Screen
              name="ListingsScreen"
              component={ListingsScreen}
            />
            <CoinStack.Screen name="Details" component={DetailsScreen} />
            <CoinStack.Screen
              name="SettingsScreen"
              component={SettingsScreen}
            />
          </CoinStack.Navigator>
        ) : (
          <Auth />
        )}
      </NavigationContainer>
    </>
  );
};

GoogleSignin.configure({
  webClientId:
    "380105339462-h8iqv8a21fb5al5qbk1fn3t3dojlokuc.apps.googleusercontent.com",
});
export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Container />
      </SafeAreaView>
    </Provider>
  );
}
