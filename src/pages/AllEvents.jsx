import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OneEvent from '../components/OneEvent'
import Spinner from '../components/Spinner'
import { getEvents, reset } from '../features/events/eventSlice'
import { getCategories} from '../features/categories/categorySlice'

function AllEvents() {
    const dispatch = useDispatch()

      //Filter
      const [category, setCategory] = useState("")
      const [ageOption, setageOption] = useState("Oldest") // Oldest

    const { events, isLoading, isError, message } = useSelector(
      (state) => state.events
  )

  const { categories } = useSelector(
    (state) => state.categories
  )
    
    useEffect(() => {
        if (isError) {
          console.log(message)
        }
    
        dispatch(getEvents())
        dispatch(getCategories())
    
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
            <select className='categoryFilter' onInput={(e)=>setCategory(e.target.value)}>
              <option value=""></option>
              {
                categories.map((cat, index) =>(
                  <option key={index} value={cat.category}>{cat.category}</option>
                ))
              }
            </select>
            {/* idk what the hell to call the 2 options */}
            <select className='dateFilter' onInput={(e)=>setageOption(e.target.value)}> 
                <option value={"Oldest"}>Earliest</option>
                <option value={"Newest"}>Latest</option>
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