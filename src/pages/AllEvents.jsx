import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OneEvent from '../components/OneEvent'
import Spinner from '../components/Spinner'
import { getEvents, reset } from '../features/events/eventSlice'
import Filter from '../components/Filter'

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

      <Filter OneEvent={OneEvent} events={events}/>

    </>
  )
}

export default AllEvents