import mongoose from "mongoose";

const userSchema =  mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "Please Enter Valid Name"]
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please provide a valid email address.',
            ],
        },
        password:{
            type:String,
            required: [true, "Please Enter Valid Password"],
            min: 6
        },
        phone:{
            type:Number,
            required: [true, "Please Enter valid Number"]
        },
    }
)

userSchema.pre('save', async function(next){
    const checkExistingUser = await User.findOne({email: this.email});

    if(checkExistingUser) {
        throw new Error('Email already in use, please use different one')
    }

    next();

})

const User = mongoose.model("User", userSchema);

export default User;
