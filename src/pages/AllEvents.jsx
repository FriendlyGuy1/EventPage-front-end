import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OneEvent from '../components/OneEvent'
import Spinner from '../components/Spinner'
import { getEvents, reset } from '../features/events/eventSlice'

function AllEvents() {
    const dispatch = useDispatch()
    
    const { events, isLoading, isError, message } = useSelector(
        (state) => state.events
    )
    
    useEffect(() => {
        if (isError) {
          console.log(message)
        }
    
        dispatch(getEvents())
    
        return () => {
          dispatch(reset())
        }
      }, [isError, message, dispatch])
    
      if (isLoading) {
        return <Spinner />
      }



  return (
    <>
      <section className='heading'>
        <h1>Events</h1>
      </section>

      <section className='content'>
        {events.length > 0 ? (
          <div className='goals'>
            {events.map((event) => (
              <OneEvent key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <h3>Events not Found</h3>
        )}
      </section>
    </>
  )
}

export default AllEvents