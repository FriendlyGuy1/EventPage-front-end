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
      const [ageOption, setageOption] = useState("empty")

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
      let eventsCopy = events.slice();
      let datenow = new Date(new Date().toDateString());

        if(ageOption === "today"){
          eventsCopy = eventsCopy.filter((a) => new Date(a.date) === datenow );
          //console.log(eventsCopy);

        }else if(ageOption === "week"){

          eventsCopy = eventsCopy.filter((a)=> new Date(a.date).getMonth() === datenow.getMonth())
          
          if(datenow.getDay() === 1){

            let days = datenow.getDate()
            let date1 = new Date(datenow)
            let date2 = new Date(datenow.setDate(days+6))

            // console.log(date1.getDate())
            // console.log(datenow.getDate())

            let eventsCopy1 = eventsCopy.filter((a) => new Date(a.date).getDate() >= date1.getDate());

            // console.log(eventsCopy1)

            eventsCopy = eventsCopy1.filter((a) => new Date(a.date).getDate() <= date2.getDate())

            // console.log(eventsCopy)

          }else{

            let week = datenow.getDay()
            week -= 1
            let days = datenow.getDate()

            let date1 = new Date(datenow.setDate(days-week))
            let date2 = new Date(date1.setDate(days+6))

            let eventsCopy1 = eventsCopy.filter((a) => new Date(a.date).getDate() >= date1.getDate());
            console.log(eventsCopy1)

            eventsCopy = eventsCopy1.filter((a) => new Date(a.date).getDate() <= date2.getDate())

            console.log(eventsCopy)

          }
        }else if(ageOption === "month"){
          eventsCopy = eventsCopy.filter((a) => new Date(a.date).getMonth() === datenow.getMonth() );
          //console.log(eventsCopy);

        }else if(ageOption === "later"){
          eventsCopy = eventsCopy.filter((a) => new Date(a.date).getMonth() > datenow.getMonth() );
          //console.log(eventsCopy);
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
                <option value={"empty"}></option> 
                <option value={"today"}>Today</option>
                <option value={"week"}>Week</option>
                <option value={"month"}>Month</option>
                <option value={"later"}>Later</option>
            </select>
        </section>
        <section className='content'>
            {eventsCopy.length > 0 ? (
                <div className='goals'>
                    {
                        eventsCopy.map((event) => (
                            <OneEvent key={event._id} event={event} showFavouriteButton={true} category={category}/>
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