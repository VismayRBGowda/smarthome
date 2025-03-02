const express = require('express')
const app = express();
const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server, { // Add this line
    cors: {
        origin: "*",
    },
});

const EnergyData = require('./EnergyData');
const HistoryData = require('./HistoryData');
const connectDB = require('./db');
const cors = require('cors');

connectDB();

app.use(cors());

app.get('/', async (req, res) => {
    res.send("Hello API is working correctly");
});

app.get('/api/energy', async (req, res) => {
    try{
        const energyData = await EnergyData.find({}).limit(10);
        res.json(energyData);
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
});

app.get('/api/energy/range', async (req, res) => {
    try{
        const startTime = parseInt(req.query.startTime);
        const endTime = parseInt(req.query.endTime);

        if(isNaN(startTime) || isNaN(endTime)){
            return res.status(400).json({ message: 'Invalid time range parameters' });
        }

        const energyData = await EnergyData.find({ time: { $gte: startTime, $lte: endTime } });
        res.json(energyData);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/energy/latest', async (req, res) => {
    try{
        const latestData = await EnergyData.findOne().sort({time : -1});
        res.json(latestData);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/history', async (req, res) => {
    try{
        const historyData = await HistoryData.find();
        res.json(historyData);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
});

io.on('connection', (socket) => {
    console.log('Client connected');

    let lastSentTime = 0;

    async function sendEnergyData(){
        try{
            const latestData = await EnergyData.findOne({ time: { $gt: lastSentTime } }).sort({ time: 1 });
            if(latestData){
                lastSentTime = latestData.time;
                console.log('Sending latest data:', latestData.time);

                const historyDataToSave = {
                    time: latestData.time,
                    'use [kW]': latestData['use [kW]'],
                    'gen [kW]': latestData['gen [kW]'],
                    'House overall [kW]': latestData['House overall [kW]'],
                    'Dishwasher [kW]': latestData['Dishwasher [kW]'],
                    'Furnace 1 [kW]': latestData['Furnace 1 [kW]'],
                    'Furnace 2 [kW]': latestData['Furnace 2 [kW]'],
                    'Home office [kW]': latestData['Home office [kW]'],
                    'Wine cellar [kW]': latestData['Wine cellar [kW]'],
                    'Garage door [kW]': latestData['Garage door [kW]'],
                    'Barn [kW]': latestData['Barn [kW]'],
                    'Well [kW]': latestData['Well [kW]'],
                    'Microwave [kW]': latestData['Microwave [kW]'],
                    'Living room [kW]': latestData['Living room [kW]'],
                    'Kitchen 12 [kW]': latestData['Kitchen 12 [kW]'],
                    'Kitchen 14 [kW]': latestData['Kitchen 14 [kW]'],
                    'Kitchen 38 [kW]': latestData['Kitchen 38 [kW]'],
                    // ... add any other fields from latestData that you want to store in history
                };

                const newHistoryData = new HistoryData(historyDataToSave);
                await newHistoryData.save();

                
                const roomData = {
                    kitchen: {
                        time: latestData.time,
                        dishwasher: latestData['Dishwasher [kW]'],
                        fridge: latestData['Fridge [kW]'],
                        microwave: latestData['Microwave [kW]'],
                        kitchen12: latestData['Kitchen 12 [kW]'],
                        kitchen14: latestData['Kitchen 14 [kW]'],
                        kitchen38: latestData['Kitchen 38 [kW]'],
                    },
                    livingRoom: {
                        time: latestData.time,
                        livingRoom: latestData['Living room [kW]'],
                    },
                    homeOffice: {
                        time: latestData.time,
                        homeOffice: latestData['Home office [kW]'],
                    },
                    other: {
                        time: latestData.time,
                        furnace1: latestData['Furnace 1 [kW]'],
                        furnace2: latestData['Furnace 2 [kW]'],
                        wineCellar: latestData['Wine cellar [kW]'],
                        garageDoor: latestData['Garage door [kW]'],
                        barn: latestData['Barn [kW]'],
                        well: latestData['Well [kW]'],
                    },
                };

                socket.emit('energyUpdate', {
                    roomData,
                    totalConsumption: {
                        time: latestData.time,
                        value: latestData['House overall [kW]'],
                    },
                });
            }
        }
        catch(error){
            console.error('Error fetching latest data : ', error);
        }
    }

    sendEnergyData();
    setInterval(sendEnergyData, 3000);

    socket.on('disconnect', () => { 
        console.log('Client disconnected');
    });
});

server.listen(3001, () => {
    console.log(`Server listening on http://localhost:3001`);
});