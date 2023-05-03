import axios from 'axios'

const API_URL = '/api/uploadImage/'


const uploadSingleImage = async (base64) => {

    const response = await axios.post(API_URL, {image: base64})    
    return response.data
  }  

const imageService = {
    uploadSingleImage
}

export default imageService