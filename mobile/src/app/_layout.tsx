import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

import { Satisfy_400Regular } from "@expo-google-fonts/satisfy";

import Loading from "../components/loading";
import { ImageBackground, StyleSheet } from "react-native";
import { View } from "react-native";

export default function Layout() {
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
    Satisfy_400Regular,
  });

  if (Boolean(fontsLoaded) === false) {
    return <Loading />;
  }

  return (
    <View className="h-full flex-1">
      <ImageBackground
        source={{ uri: "https://i.ibb.co/dfbb3GB/Sem-t-tulo-1.png" }}
        resizeMode="cover"
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
        }}
        className="bg-tertiary"
      ></ImageBackground>

      <SafeAreaView className="h-full flex-1 items-center justify-center pt-6 pb-10">
        <StatusBar style="light" backgroundColor="transparent" translucent />

        <>
          <Slot />
        </>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
