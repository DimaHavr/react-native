import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import Main from "./components/Main";
import { store } from "./redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
