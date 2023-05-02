import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OneEvent from '../components/OneEvent'
import Spinner from '../components/Spinner'
import { getEvents, reset } from '../features/events/eventSlice'

function AllEvents() {
    const dispatch = useDispatch()

      //Filter
      const [category, setCategory] = useState("")
      const [ageOption, setageOption] = useState("Newest") // Oldest

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

      //Date filter
      let eventsCopy = events.slice()

        if(ageOption === "Newest"){
          eventsCopy = eventsCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
          //console.log("Newest")
          //return console.log(eventsCopy.map(o => o.date))
        }else{
          eventsCopy = eventsCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
          //console.log("Oldest")
          //return console.log(eventsCopy.map(o => o.date))
        }


  return (
    <>
      <section className='heading'>
        <h1>Events</h1>
      </section>
      <section>
            <input
                value={category}
                onChange={(e)=>setCategory(e.target.value)}>
            </input>
            <select onInput={(e)=>setageOption(e.target.value)}>
                <option value={"Newest"}>Newest</option>
                <option value={"Oldest"}>Oldest</option>
            </select>
        </section>
        <section className='content'>
            {eventsCopy.length > 0 ? (
                <div className='goals'>
                    {
                        eventsCopy.map((event) => (
                            <OneEvent key={event._id} event={event} category={category}/>
                        ))
                    }
                </div>
                ) : (
                <h3>Events not Found</h3>
            )}
        </section>
    </>
  )
}

export default AllEvents