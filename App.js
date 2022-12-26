// import { Platform, SafeAreaView, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import {  SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./components/Main";
export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
      
    </PaperProvider>
  );
}
