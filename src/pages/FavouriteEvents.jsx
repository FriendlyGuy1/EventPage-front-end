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
    if (isError) {
      console.log(message)
    }

    dispatch(getEvents())   
    dispatch(getFavourites())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])


  if (isLoading || favourites == undefined) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Favourite Events</h1>
      </section>


      <section className='content'>
        {events.length > 0 ? (
            <div className='goals'>
                {
                    events.map((event) => (
                        favourites.map((fav) => (
                            fav.eventID === event._id ? (
                                <OneFavouriteEvent key={event._id} event={event} favouriteEventID={fav._id}/>
                            ) : (null)
                        ))
                    ))
                }
            </div>
            ) : (
            <h3>Favourite Events not Found</h3>
        )}
    </section>
    </>
  )
}

export default FavouriteEvents