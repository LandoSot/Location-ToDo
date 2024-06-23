import 'react-native-gesture-handler';
import React from "react";
import Dashboard from './src/screens/Dashboard';
import { PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./src/redux/Store";
import { NavigationContainer } from '@react-navigation/native';
import DashboardStack from './src/navigation/Stack';
import { CustomDefaultTheme } from './src/styles/Theme';
import SplashModal from './src/components/SplashModal';

export default function App() {
  return (
    <ReduxProvider store={Store}>
      <NavigationContainer>
        <PaperProvider theme={CustomDefaultTheme}>
          <DashboardStack />
          <SplashModal/>
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}
