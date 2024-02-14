import React, { useState } from "react";
import { LogBox,StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from "native-base"
import AppNavigator from "./AppNavigator";
//import PaperProvider  from 'react-native-paper';
//import AppStack from "./AppStack";
import store from './redux/store/store';
import { NavigationContainer } from "@react-navigation/native";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs()


App = () => {
    return (
        <>
        <StatusBar backgroundColor={"#f76504"}
                barStyle="light-content" />
         <Provider store={store}>
             <NativeBaseProvider>
            <AppNavigator/>
            
             </NativeBaseProvider>
         </Provider>
         </>
    )
}

export default App
