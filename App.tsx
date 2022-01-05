import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
import { GREEN } from "./utils/colors";
import { login } from "./store/userSlice";

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
  return (
    <TabNavigation.Navigator
      barStyle={{
        backgroundColor: "white",
        elevation: 0,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const color = focused ? GREEN : "black";
          if (route.name === "Home") {
            return <Feather name="home" size={24} color={color} />;
          } else if (route.name === "Watchlist") {
            return <Feather name="eye" size={24} color={color} />;
          }
        },
      })}
    >
      <TabNavigation.Screen name="Home" component={HomeScreen} />
      <TabNavigation.Screen name="Watchlist" component={WatchlistScreen} />
    </TabNavigation.Navigator>
  );
};

const Container = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispath = useDispatch();
  const [initializing, setInitializing] = useState<boolean>(true);

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
    <NavigationContainer>
      {user ? (
        <CoinStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <CoinStack.Screen name="HomeScreen" component={TabNav} />
          <CoinStack.Screen name="ListingsScreen" component={ListingsScreen} />
          <CoinStack.Screen name="Details" component={DetailsScreen} />
          <CoinStack.Screen name="SettingsScreen" component={SettingsScreen} />
        </CoinStack.Navigator>
      ) : (
        <Auth />
      )}
    </NavigationContainer>
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
        <StatusBar backgroundColor="white" style="dark" />
        <Container />
      </SafeAreaView>
    </Provider>
  );
}
