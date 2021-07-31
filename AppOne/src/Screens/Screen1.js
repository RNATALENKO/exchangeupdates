import React, {useState, useRef} from 'react';
import {Text, View, TextInput, FlatList, ScrollView, TouchableOpacity} from 'react-native'
import { useEffect } from 'react/cjs/react.development';
import { Card } from '../Components/Card';
import {io} from 'socket.io-client';
import {OrangeCard} from '../Components/OrangeCard';
import { TEST_ACTION } from '../Redux/TestActions';
import { useDispatch } from 'react-redux';







export const Screen1 = () =>{

    const [dataSet, setDataSet] = useState([]);
    const [userId, setUserId] = useState(101);
    const [count, setCount] = useState(0);

    const socketRef = useRef(); 

    useEffect(()=>{

        //connect to socket/store it
        const socket = io('http://localhost:8080');
        socketRef.current = socket; 


        //save the socket id 
        socket.emit('saveSocketId', {
            id:userId,
        })


        //get my people
        socket.emit('getMyPeople', {userId});
        socket.on('receiveMyPeople',(data)=>{
            setDataSet(data);
        });


        socket.on('triggerAppOne', (data)=>{
            console.log('trigger for app one received...');
            //a different request to get the updated
            socket.emit('getMyPeople', {userId});
        })


        return ()=>{
            socket.close();
        }
    },[])


    return(
        <ScrollView style={{width:'100%', padding:30}} scrollEnabled={true} scrollEventThrottle={1}>


                <TouchableOpacity style={{backgroundColor:'blue', padding:10, marginBottom:10}} onPress={()=>{
                    const date = new Date(); 
                    

                    //a new person 
                    let person = {
                        name:'Greg',
                        age:19,
                        timestamp:100000000+count,
                        userId,
                    }

                    //update the ui (but this creates a new connection in the server)
                    setDataSet([...dataSet,person]);
                    
                    //emit the person to the server
                    socketRef.current.emit('addPerson', person);

                    setCount(count+1);

                }}>
                    <Text style={{color:'white'}}> Add a person </Text>

                </TouchableOpacity>


                <FlatList data={dataSet}  keyExtractor={(item, index)=>'key:' + index} renderItem={(item,index)=>{
                        
                    return item.item.chosen?
                    (
                    <OrangeCard></OrangeCard>
                    )
                    :

                   ( 
                       /* cards that need the updated search results */
                        <Card 
                        singleProject={item.item} 
                        dataSet={dataSet} 
                        />
                    )
                }}></FlatList>



        </ScrollView>   
    )
}