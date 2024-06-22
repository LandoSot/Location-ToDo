import 'react-native-gesture-handler';
import React from "react";
import Dashboard from './src/screens/Dashboard';
import { PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./src/redux/Store";
import { NavigationContainer } from '@react-navigation/native';
import DashboardStack from './src/navigation/Stack';

export default function App() {
  return (
    <ReduxProvider store={Store}>
      <NavigationContainer>
        <PaperProvider>
          <DashboardStack />
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}
