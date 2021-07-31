



const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const TestRoute = require('../Server/Routes/TestRoute');
const PersonModel = require('./Models/Person');
const SocketModel = require('./Models/Socket');



//activate middlewares
app.use(express.json()); 
app.use(cors());
app.use(TestRoute);

const httpServer = require('http').createServer();
const io = require("socket.io")(httpServer,{
    cors:{
        origin:true, //user side app origin, true allows all requests
        methods:["GET", "POST"]
    }
})



httpServer.listen(8080, ()=>{

    //connect to your database
    mongoose.connect(`YOUR DB CONNECTION STRING`, {useNewUrlParser:true}, { useUnifiedTopology: true }).then(results=>{});

    //log if the connection fails or succesfully connected
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection Error: '));
   
    //create the indexes
    //db.collection('People').createIndex({number:1});
    //db.collection('People').createIndex({age:1});
    //db.collection('People').createIndex({eligable:1});
    
    
    db.once('open', ()=>{


        const date = new Date(); 
        

        //delete all documents, used for development purposes
        db.collection('People').deleteMany({});

        /*
        for(let x = 0; x <200; x++){
            db.collection('People').insertOne({
                firstname:'Greg',
                age: Math.round(Math.random()*95),
                eligable:Math.random()>.5?true:false,
                number:x,
                timestamp:100000000 + x,
            })
        }
        
        */
        

    });



    //socket work
    io.on('connection', (socket)=>{


        //socket connected
        console.log('a socket connected...with id...' + socket.id);

        socket.on('saveSocketId', async (data)=>{

                //find one and updated, if nothing found create a document and save it
                let foundOne = await SocketModel.findOneAndUpdate({id:data.id},{socketId:socket.id}, {new:true, useFindAndModify:false});

                if(foundOne==null){
                    const newDocument = new SocketModel({
                        id:data.id,
                        socketId:socket.id, 
                    })
                    newDocument.save(); 
                }
        })


        socket.on('getMyPeople', async (data)=>{

            let foundMyPeople = await PersonModel.find({userId:data.userId});
            io.to(socket.id).emit('receiveMyPeople', foundMyPeople);
                
        })


        //adds a person and saves it to the database
        socket.on('addPerson', (data)=>{

            //save this person inside of our database
            let document = new PersonModel({
                name:data.name,
                age:data.age,
                timestamp:data.timestamp,
                userId:data.userId,
            })
            document.save();

           socket.broadcast.emit('triggerAppTwo', {});

        })



        
        //gets all people from database
        socket.on('getPeople', async ()=>{

            //this is the query that will need a limit, to about 50-100 near you, with the earliest time stamps at the top i.e. ascending
            //also make sure that out of the entire bunch, that the earliest timestamps are selected  
           let allPeople = await PersonModel.find({chooser:null, chosen:false});

           //emit it back to that socket
           io.to(socket.id).emit('receiveAllPeople', allPeople);

        })



        socket.on('personChosen', async (data)=>{

            console.log(data);

            //update the document with chooser and 
            let foundOneAndUpdated = await PersonModel.findOneAndUpdate({timestamp:data.timestamp}, {chooser:data.chooser, chosen:true});

            //trigger to update servicer's ui (to remove it)
            io.to(socket.id).emit('triggerAppTwo');


            //find the socket id based on the found project
            let foundSocket = await SocketModel.findOne({id:foundOneAndUpdated.userId});
            io.to(foundSocket.socketId).emit('triggerAppOne', {foundOneAndUpdated});

        })
        


    })






})



