
import React from 'react';
import {NavigationContainer, navigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screen1} from '../Screens/Screen1';
import {Screen2} from '../Screens/Screen2';


//screen 1 and screen 2 in tabs navigator
const Tabs = createBottomTabNavigator();
const TabsNav = () =>{
    return(
    <Tabs.Navigator>
        <Tabs.Screen name="Screen1" component= {Screen1}></Tabs.Screen>
        <Tabs.Screen name="Screen2" component= {Screen2}></Tabs.Screen>
    </Tabs.Navigator>
    )
    
}



//screen 1 and screen 2 in stack navigator
const Stack = createStackNavigator();
const StackNav = () => {
    return(
        <Stack.Navigator>
                <Stack.Screen name="Screen1" component={TabsNav} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name="Screen2" component={Screen2} options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
    )
}




export const Navigation = () => {
    return(
        <NavigationContainer>
                <StackNav></StackNav>
        </NavigationContainer>
    )
}
