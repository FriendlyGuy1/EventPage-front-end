import axios from "axios";

//post api call
const createEvent = async(event) => {
    
    try {
        const response = await axios.post('/api/events', event);
        console.log(response);
        return response;
    } catch(error){
        console.error(error)
    }
}

//put api call
const editEvent = async(id, event) => {
    
    try{
        const response = await axios.put(`/api/events/${id}`, event);
        console.log(response);
        return response;
    } catch(error){
        console.error(error)
    }
}


// const deleteEvent = async(event) => {
    
//     try{
//         const response = await axios.delete('/api/events', event);
//         console.log(response);
//         return response;
//     } catch(error){
//         console.error(error)
//     }
// }

// const getEvents = async() => {
    
//     try{
//         const response = await axios.get('/api/events');
//         console.log(response);
//         return response;
//     } catch(error){
//         console.error(error)
//     }
// }


const eventServices = {
    createEvent,
    editEvent
}

export default eventServices