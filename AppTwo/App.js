import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Navigation} from './src/Navigation/Navigation';
import {test} from './src/Redux/Store';
import {Provider} from 'react-redux';
import {Store} from './src/Redux/Store';



export default function App() {
  return (
    //connect the store here as well
    <Provider store={Store}>
        <Navigation></Navigation>
    </Provider>
  );
}

