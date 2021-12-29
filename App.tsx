import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import { StatusBar } from "expo-status-bar";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./components/icons/Home";
import ListingsScreen from "./screens/ListingsScreen";

export type CoinStackParams = {
  HomeScreen: undefined;
  Details: {
    name: string;
  };
  ListingsScreen: {
    url: string;
    dataKey?: string;
    title: string;
  };
};

const TabNavigation = createMaterialBottomTabNavigator();
const CoinStack = createNativeStackNavigator<CoinStackParams>();

const Container = () => {
  return (
    <TabNavigation.Navigator
      barStyle={{
        backgroundColor: "white",
        elevation: 0,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            return <Home />;
          }
        },
      })}
    >
      <TabNavigation.Screen name="Home" component={HomeScreen} />
      <TabNavigation.Screen name="Watchlist" component={WatchlistScreen} />
    </TabNavigation.Navigator>
  );
};

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
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" />
      <NavigationContainer>
        <CoinStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <CoinStack.Screen name="HomeScreen" component={Container} />
          <CoinStack.Screen name="ListingsScreen" component={ListingsScreen} />
          <CoinStack.Screen name="Details" component={DetailsScreen} />
        </CoinStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
