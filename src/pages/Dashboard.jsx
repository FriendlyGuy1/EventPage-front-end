import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EventForm from '../components/EventForm'
import Spinner from '../components/Spinner'
import { getUserEvents, reset } from '../features/events/eventSlice'
import OneEvent from '../components/OneEvent'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getUserEvents())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Events Dashboard</p>
      </section>

      <EventForm />

      <section className='content'>
        {events.length > 0 ? (
          <div className='goals'>
            {events.map((event) => (
              <OneEvent key={event._id} event={event} showDeleteButton={true} category={""}/>
            ))}
          </div>
        ) : (
          <h3>You have not set any events</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard