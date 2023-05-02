import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OneEvent from '../components/OneEvent'
import Spinner from '../components/Spinner'
import { getEvents, reset } from '../features/events/eventSlice'

function AllEvents() {
    const dispatch = useDispatch()

      //Filter
      const [category, setCategory] = useState("")
      // const [ageOption, setageOption] = useState("Oldest") // Oldest

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

      // let eventsCopy = events.slice()

      // console.log("Standart")
      // console.log(events)
      // //console.log(eventsCopy)

      //   if(ageOption === "Newest"){
      //     eventsCopy.sort((a, b) => a.date - b.date);
      //     console.log("Newest")
      //     return console.log(eventsCopy.map(o => o.title))
      //   }else{
      //     eventsCopy.sort((a, b) => b.date - a.date);
      //     console.log("Oldest")
      //     return console.log(eventsCopy.map(o => o.title))
      //   }

    //   const sortByAge = () => {

    //     if(ageOption === "Newest"){

    //       events.sort((a, b) => a.date - b.date);

    //     }else{

    //       events.sort((a, b) => b.date - a.date);
    //     }
    // }

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
            <select>
                <option>Newest</option>
                <option>Oldest</option>
            </select>
        </section>
        <section className='content'>
            {events.length > 0 ? (
                <div className='goals'>
                    {
                        events.map((event) => (
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