import { StatusBar } from "expo-status-bar";

import { User } from "firebase/auth";
import { StyleSheet, Text, View, Button } from "react-native";

import Login from "./screens/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./screens/Dashboard";
import Register from "./screens/Register";
import Sample from "./screens/Sample";
import { useEffect, useState } from "react";
import { firebase } from "./database/firebase.config";
import UserMovies from "./screens/UserMovies";
import UserProfile from "./screens/UserProfile";
import Settings from "./screens/Settings";
import Navigation from "./screens/Navigation";

export default function App() {
  const Stack = createNativeStackNavigator();

  const InsideStack = createNativeStackNavigator();
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="Sample" component= {Sample} options={{ headerShown : false}}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <InsideStack.Navigator>
        <InsideStack.Screen
          name="Movies Bucket"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
        <InsideStack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />
        <InsideStack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <InsideStack.Screen
          name="Navigation"
          component={Navigation}
          options={{
            headerShown: false,
          }}
        />
      </InsideStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    width: 100,
    textAlign: "center",
    borderRadius: 5,
  },
  imageContainer: {
    borderRadius: 30,
    margin: 10,
  },
  btnContainer: {
    color: "red",
  },
});
