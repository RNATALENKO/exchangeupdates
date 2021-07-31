import React, {useState} from 'react';
import { useRef } from 'react';
import {Text, View, TextInput, FlatList, ScrollView} from 'react-native'
import { useEffect } from 'react/cjs/react.development';
import { Card } from '../Components/Card';
import {io} from 'socket.io-client';





//parent component
export const Screen1 = () =>{

    const [dataSet, setDataSet] = useState([]);
    const [dataBool, setDataBool] = useState(false);
    const [userId, setUserId] = useState(202);


    const socketRef = useRef();

    //executes once on render
    useEffect(()=>{

        //connect the socket
        const socket = io('http://localhost:8080');
        socketRef.current = socket; 

        //save the id in the database
        socket.emit('saveSocketId', {
            id:userId,
        })

        //get a list of people
        socket.emit('getPeople');


        //when app one adds a person update the list
        socket.on('triggerAppTwo',()=> {
            console.log('trigger for app two update received...')
            socket.emit('getPeople');
        })
        socket.on('receiveAllPeople', (data)=>{
            setDataSet(data);
        })
    
        return ()=>{
            socket.close()
        }
        
    },[])



    
    const setChosenPersonState= (timestamp)=>{
        setChosenPerson(timestamp)
    }

  


    return(
        <ScrollView style={{width:'100%', padding:30}} scrollEnabled={true} scrollEventThrottle={1}>
                <FlatList data={dataSet}  keyExtractor={(item, index)=>'key:' + index} renderItem={(item,index)=>{
                   return( 
                       /* cards that need the updated search results */
                        <Card singleProject={item.item}
                        setChosenPersonState={setChosenPersonState}
                        socketRef={socketRef}
                        userId={userId}
                        />
                    )
                }}></FlatList>
        </ScrollView>   
    )
}