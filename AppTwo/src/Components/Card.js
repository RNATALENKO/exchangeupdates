import React from 'react'; 
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { deleteContribution } from '../Redux/TestActions';


export const Card = (props)=> {

    

    const dispatch = useDispatch();

    return (

        <View style={{padding:10, backgroundColor:'white', borderWidth:1, width:'100%', marginBottom:20, height:100}}>

            <Text>
                {props.singleProject.timestamp}
            </Text>

            {/* button to chose a person */}
            <TouchableOpacity style={{padding:5, backgroundColor:'orange'}} onPress={
                ()=>{
                    props.socketRef.current.emit('personChosen',{
                        chooser:props.userId,
                        timestamp:props.singleProject.timestamp,
                    })
                }
            }>
                <Text style={{color:'white'}}> Choose person </Text>

            </TouchableOpacity>

        </View>
         
    )

   
}

