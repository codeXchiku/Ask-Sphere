import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

//.pre() is a middleware hook that runs before certain actions like saving, validating, or removing a document.
userSchema.pre("save", async function (next) {
    const user = this;
    try {
        if (!user.isModified("password")) {
            return next()
        }
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
        next()
    } catch (error) {
        next(error);
    }
})

//jwt authentication->
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '2d'
            }
        );
    } catch (error) {
        console.log(error);

    }
}

const User = model("User", userSchema);
export default User;
