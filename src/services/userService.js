import axios from "axios";

//post api call
// const loginUser = async() => {
    
//     try {

//     } catch(error){
//         console.error(error)
//     }
// }

//post api call
const registerUser = async(newUser) => {
    console.log(newUser)
    try{
        const response = await axios.post('/api/user/register', newUser);
        console.log(response);
        return response;
    } catch(error){
        console.error(error)
    }
}


const userServices = {
    registerUser
}

export default userServices