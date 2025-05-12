import User from "../models/user-models.js";

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        console.log(req.body);
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(400).json({ message: "user already exist" })
        }
        const newUser = await User.create({ username, email, phone, password })

        res.status(200).json({
            message: "registration successfull",
            token: await newUser.generateToken(),
            // `newUser` already has `_id` here, even before saving to DB!
            userId: newUser._id.toString()
        })
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email })
        console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ extradetails: "user does not exist" })
        }

        const isValidPassword = await userExist.isValidPassword(password)

        if (isValidPassword) {
            res.status(200).json({
            message: "login successfull",
            token: await userExist.generateToken(),
            userId: userExist._id.toString()
        })
        }else{
            return res.status(400).json({extradetails:"invalid email or password"})
        }
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}

export { register, login };