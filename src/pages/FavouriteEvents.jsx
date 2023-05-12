import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getFavourites, reset } from '../features/favourite/favouriteSlice'
import { getEvents } from '../features/events/eventSlice'
import OneFavouriteEvent from '../components/OneFavouriteEvent'

function FavouriteEvents() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { favourites, isLoading, isError, message } = useSelector(
    (state) => state.favourites
  )
  const { events } = useSelector(
    (state) => state.events
  )

  useEffect(() => {
    
    if (message.success === 'Favorite deleted') {
      dispatch(reset())
    }
    dispatch(getEvents())   
    dispatch(getFavourites())
    
  }, [navigate, dispatch, message])

  if (favourites === undefined) {
    return (<h3>NO FAVOURITE EVENTS</h3>)
  }

  return (
    <>
      <section className='heading'>
        <h1>Favourite Events</h1>
      </section>


      <section className='content'> 
            <div className='goals'>
                {
                    events?.map((event) => (
                        favourites?.map((fav) => (
                            fav.eventID === event._id ? (
                                <OneFavouriteEvent key={event._id} event={event} favouriteEventID={fav._id}/>
                            ) : (null)
                        ))
                    ))
                }
            </div>
    </section>
    </>
  )
}

export default FavouriteEvents