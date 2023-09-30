import mongoose from "mongoose";

//For offline such as mongodb Compass, use in development mode
// const db="mongodb://127.0.0.1:27017/Login-SignUp"

//For production mode to use online database
const db="mongodb+srv://tic-tac-toe:tictac123@cluster0.ulcb5yv.mongodb.net/Login-SignUp?retryWrites=true&w=majority"
mongoose.connect(db)
.then(()=>{
    console.log("Connected to Login-SignUp db")
})
.catch((error)=>{
    console.log(error)
})