import React, { useState } from "react";
import eventServices from "../services/eventServices";

const CreateEvent = () => {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [place, setPlace] = useState('')
    const [date, setDate] = useState('')
    const [image, setImage] = useState('')

    //the main function
    const creator = async(f) => {
        f.preventDefault();

        //template
        const event = {
            title: title,
            category: category,
            description: description,
            place: place,
            date: date,
            image: image,

        }
        eventServices.createEvent(event)
        

        setTitle('')
        setCategory('')
        setDescription('')
        setPlace('')
        setDate('')
        setImage('')

        console.log("event creator function done")
    }

    return(
        <div>
            <form>
                <label>Title</label>
                <input 
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}/>
            </form>

            <form>
                <label>Category</label>
                <input 
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}/>
            </form>

            <form>
                <label>Description</label>
                <textarea
                    rows="4" 
                    cols="50"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}/>
            </form>

            <form>
                <label>Place</label>
                <input 
                    type="text"
                    placeholder="Enter place"
                    value={place}
                    onChange={(e)=>setPlace(e.target.value)}/>
            </form>

            <form>
                <label>Date</label>
                <input 
                    type="text"
                    placeholder="Enter date"
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}/>
            </form>

            <form>
                <label>Image</label>
                <input 
                    type="text"
                    placeholder="Enter image"
                    value={image}
                    onChange={(e)=>setImage(e.target.value)}/>
            </form>

            <button onClick={creator}>Create</button>
        </div>
    )
}

export default CreateEvent