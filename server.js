import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db.js";
import asyncHandler from "express-async-handler";
import Led from "./ledModal.js";
import Room from "./roomModal.js";

dotenv.config();

connectDB();
const app = express()
app.use(express.json())
app.use(cors())
const PORT = 5000;



const updateLEDStatus = async (status) => {
    try {
        const led = await Led.findOne();
        if (led) {
            led.status = status;
            await led.save();
        } else {
            await Led.create({ status });
        }
    } catch (error) {
        console.error('Error updating LED status:', error);
    }
};

const addRoom = asyncHandler(async (req, res) => {
    const {room} = req.body;
    const roomData = await Room.create({
        room
    });
    if (roomData) {
        res.status(201).json(roomData)
    } else {
        res.status(400);
        throw new Error('Invalid Data')
    }
})

app.get('/api/led/on', (req, res) => {
    updateLEDStatus(1); // Update status in the database
    res.json({ message: 'LED turned on' });
});

app.post('/api/room', async (req, res) => {
    const {room} = req.body;
    const roomData = await Room.create({
        room
    });
    if (roomData) {
        res.status(201).json(roomData)
    } else {
        res.status(400);
        throw new Error('Invalid Data')
    }
});
app.get('/api/room', async (req, res) => {
    const rooms = await Room.find({});
    if (rooms) {
        res.status(201).json(rooms)
    } else {
        res.status(400);
        throw new Error('Invalid Data')
    }
});
app.get('/api/led/off', (req, res) => {
    updateLEDStatus(0); // Update status in the database
    res.json({ message: 'LED turned off' });
});

app.get('/api/led/status', async (req, res) => {
    try {
        const led = await Led.findOne();
        const status = led ? led.status : 0;
        res.json({ status });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching LED status' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})