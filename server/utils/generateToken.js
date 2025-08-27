import jwt from "jsonwebtoken";


export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userID: user._id }, process.env.SECRETE_KEY, { expiresIn: "30d" })

    res.status(200).cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge:  30 * 24 * 60 * 60 * 1000 }).json({
        success:true,
        message,
        user
    })
}