const express = require('express');
const mongoose = require('mongoose'); // Modül adı "mongoose" olarak değiştirildi.
const cors = require('cors');
const { PORT, mongoDBURL } = require('./config');
const cookieParser = require('cookie-parser');


const app = express();

// CORS
app.use(cors({
    origin: 'https://bungalovbooking-faxg.onrender.com' // Sadece belirli bir domainden gelen isteklere izin verir
}));

// Routers
const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');
const cityRoutes = require('./routes/city');

// MongoDB Connection
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        const PORT = process.env.PORT || 5252; // Render.com'un belirlediği port numarasını kullanır veya 5252 numaralı portu varsayılan olarak kullanır
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api",cityRoutes);


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

app.get('/', (req, res) => {
    res.send('Node server worked!');
});
