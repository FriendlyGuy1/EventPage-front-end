import { useDispatch } from 'react-redux'
import { deleteEvent } from '../features/events/eventSlice'

function OneEvent({ event, showDeleteButton }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      {/* <div>{new Date(event.createdAt).toLocaleString('en-US')}</div> */}
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
  )
}

export default OneEvent