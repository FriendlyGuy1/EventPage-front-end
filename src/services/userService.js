import axios from "axios";

//post api call
const loginUser = async(user) => {
    
    try {
        const response = await axios.post('/api/user/login', user);
        console.log(response);
        return response;
    } catch(error){
        console.error(error)
    }
}

//post api call
const registerUser = async(newUser) => {
    
    try{
        const response = await axios.post('/api/user/register', newUser);
        //console.log(response);
        return response;
    } catch(error){
        console.error(error)
    }
}


const userServices = {
    registerUser,
    loginUser
}

export default userServices