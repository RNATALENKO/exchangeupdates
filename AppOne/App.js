import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {Navigation} from './src/Navigation/Navigation';
import {test} from './src/Redux/Store';
import {Provider, useDispatch} from 'react-redux';
import {Store} from './src/Redux/Store';
import { io } from 'socket.io-client';



export default function App() {

  


  return (
    //connect the store here as well
    <Provider store={Store}>
        <Navigation></Navigation>
    </Provider>
  );
}

