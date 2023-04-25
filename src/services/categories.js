import axios from 'axios';

const API_GET = '/api/categories/'
const API_SEND = '/api/categories'

const getCategories = async()=>{
    try{
        const response = await axios.get(API_GET)
        return response
    }
    catch(error){
        console.error(error);
    }
}

const postCategories = async(category) =>{
    try{
        const response = await axios.post(API_SEND, category)
        return response
    }
    catch(error){
        console.error(error);
    }
}

const removeCategory = async(chosenCategory) =>{
    const API_REMOVE = `/api/categories/${chosenCategory}`

    try{
        const response = await axios.delete(API_REMOVE)
        return response
    }
    catch(error){
        console.error(error);
    }

}

const changeCategory = async(chosenChangeCategory, chosenChangeCategoryName) =>{
    const API_UPDATE = `/api/categories/${chosenChangeCategory}`
    console.log(API_UPDATE);
    console.log(chosenChangeCategoryName);
    try{
        const response = await axios.put(API_UPDATE, chosenChangeCategoryName)
        return response
    }
    catch(error){
        console.error(error);
    }

}
const categoryService = {
    getCategories,
    postCategories,
    removeCategory,
    changeCategory
}
export default categoryService