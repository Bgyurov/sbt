require('dotenv').config();

const mongoose = require('mongoose');

async function initDatabase() {
    mongoose.set('strictQuery', false);
    
    // Използване на променлива на средата за връзка с базата данни
        const dbUri = process.env.MONGOD_CONNECT_URI
     // Задаване на фалбек, ако променливата на средата не е дефинирана
     try{
         await mongoose.connect(dbUri); 

         console.log('DB connected');
     } catch (error){
         console.log('Error: ', error);
     }

}

module.exports = initDatabase;
