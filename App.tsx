import { SafeAreaView, StatusBar } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Intro from "./src/screens/Intro";
import Login from "./src/screens/Login";
import CreateAccount from "./src/screens/CreateAccount";

import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Recharges from "./src/screens/Recharges";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveBackgroundColor: "#CCC",
        animation: "shift",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" color="#150230" size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="account" color="#150230" size={24} />,
        }}
      />
      <Tab.Screen
        name="Recharges"
        component={Recharges}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="cellphone" color="#150230" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Intro"
            component={Intro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar backgroundColor="#150230" />
      </NavigationContainer>
    </SafeAreaView>
  );
}
