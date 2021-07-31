import React, {useEffect} from 'react';
import {Text, View,  TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';

export const Screen2 = () =>{

    const socket = useSelector(state=>state.TestReducer.socket);

    return(
        <TouchableOpacity style={{backgroundColor:'blue', padding:10, marginBottom:10}} onPress={()=>{}}>
            <Text style={{color:'white'}}> Add a person from another component</Text>

        </TouchableOpacity>
    )
}