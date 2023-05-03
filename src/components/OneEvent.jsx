import { useDispatch } from 'react-redux'
import { deleteEvent } from '../features/events/eventSlice'

function OneEvent({ event, showDeleteButton, category }) {
  const dispatch = useDispatch()

  //standart
  if(category === ""){
    return(
      <>
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

