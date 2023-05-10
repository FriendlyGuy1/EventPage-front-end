
import { useDispatch } from 'react-redux'
import { deleteFavourite } from '../features/favourite/favouriteSlice'

function OneFavouriteEvent({ event, favouriteEventID }) {
    const dispatch = useDispatch()

    return(
      <>
        <div className='goal'>
            <img src={event.image} alt="No Image"></img>
            <h2>Title: {event.title}</h2>
            <h2>Category :{event.category}</h2>
            <h2>Description: {event.description}</h2>
            <h2>Place: {event.place}</h2>
            <h2>Date: {event.date}</h2>
            <button onClick={() => dispatch(deleteFavourite(favouriteEventID))} className="btn btn-block">UNLIST</button>
        </div>
      </>
    )
}

export default OneFavouriteEvent

