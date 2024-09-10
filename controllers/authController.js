const bycrypt = require('bcrypt');
const User = require('../models/userModel');

const registerController =  async (req, res) => {
  const { name, emailId, password, role } = req.body;

  console.log({name, emailId, password, role})

  try {
    const existUser = await User.findOne({ email: emailId });

    if (existUser) {
      console.log("User exist");
      return res
        .json({
          success: false,
          message: "Email id already exist.",
        })
        .status(401);
    }

    
    const hashedPassword = await bycrypt.hash(password, 18);

    const newUser = await User.create({
        email: emailId,
        name,
        password: hashedPassword,
        role
    })

    if(!newUser) {
        return res.json({
            success: false,
            message: "Cannot create an account, try again"
        }).status(200)
    }
    
    console.log(`new user created: ${newUser.id}`);

    return res.json({
        success: true,
        message: "Account created successfully."
    }).status(201);

  } catch (err) {
    console.log(err.message);
  }
};

  const loginController = async (req, res) => {

    const { emailId, password } = req.body;
  
    // console.log({ emailId, password });
  
    const userExist = await User.findOne({ email: emailId })
  
    if (userExist != null) {
      if (bycrypt.compareSync(password, userExist.password)) {
        console.log("password match.. Login Successfull");
        return res.json({
          success: true,
          message: "password match.. Login Successfull",
          userExist
        }).status(200);
  
        // console.log(userExist)
      }
      else {
        console.log("password does not match.");
        return res.json({
          success: false,
          message: "Password not matched"
        })
      }
    }
  }
  
  module.exports = { 
    registerController, 
    loginController
};
