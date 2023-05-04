import { useDispatch } from 'react-redux'
import { deleteEvent } from '../features/events/eventSlice'
import UpdateEvent from './UpdateEvent'
import { useState } from 'react'

function OneEvent({ event, showDeleteButton, category }) {
  const dispatch = useDispatch()

  const [updateEvent, setUpdateEvent] = useState(false)
  const [showEvent, setShowEvent] = useState(true)

  const handleUpdate = () => {
    setUpdateEvent(true)
    setShowEvent(false)
  }


  //standart
  if(category === ""){
    return(
      <>
        {showEvent && 
          <div className='goal'>
            <img src={event.image} alt="No Image"></img>
            <h2>Title: {event.title}</h2>
            <h2>Category :{event.category}</h2>
            <h2>Description: {event.description}</h2>
            <h2>Place: {event.place}</h2>
            <h2>Date: {event.date}</h2>
            {showDeleteButton && 
              <>
                <button onClick={() => dispatch(deleteEvent(event._id))} className="btn btn-block">DELETE</button>
                <button onClick={() => handleUpdate()} className="btn btn-block">UPDATE</button>
              </>
            }
          </div>
        }
          
        {updateEvent && 
          <UpdateEvent event={event}/>
        }
      </>
    )
  }
  //category filter active
  else{
    return(
      <>
      {
      category === event.category ? (
        <div className='goal'>
          <h2>{event.title}</h2>
          <h2>{event.category}</h2>
          <h2>{event.description}</h2>
          <h2>{event.place}</h2>
          <h2>{event.date}</h2>
          <img src={event.image} alt="No Image"></img>
          {showDeleteButton && 
            <button onClick={() => dispatch(deleteEvent(event._id))} className='close'>
            X
            </button>
          }
        </div>
        ) : (
          <div>
      
          </div>
        )
      }
      </>  
    )
  }
}

export default OneEvent

