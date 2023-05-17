
import { useDispatch } from 'react-redux'
import { deleteFavourite } from '../features/favourite/favouriteSlice'
import { MdOutlinePlace } from "react-icons/md";



function OneFavouriteEvent({ event, favouriteEventID }) {

    const dispatch = useDispatch()


    return(
      <>
        <div className='goal'>
            <img src={event.image} alt="No Image"></img>
            <h2 className='title'>{event.title}</h2>
            <p className="description">{event.description}</p>
            <h4 className='eventplace'><MdOutlinePlace /> {event.place}</h4>
            <h2>{event.date.slice(0, 10)}</h2>
            <div className="types">
              <span className="project-type">• {event.category}</span>
            </div>
            <button onClick={() => dispatch(deleteFavourite(favouriteEventID))} className="btn btn-block">UNLIST</button>
        </div>
      </>
    )
}

export default OneFavouriteEvent

