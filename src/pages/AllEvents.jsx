import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OneEvent from '../components/OneEvent'
import Spinner from '../components/Spinner'
import { getEvents, reset } from '../features/events/eventSlice'
import { getCategories} from '../features/categories/categorySlice'
import { getFavourites } from '../features/favourite/favouriteSlice'

function AllEvents() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    //Filter
    const [category, setCategory] = useState("")
    const [ageOption, setageOption] = useState("empty")
    const [sortMemory, setSortMemory] = useState("sort_choice0")

    const { events, isLoading, isError, message } = useSelector(
      (state) => state.events
    )

    const { favourites} = useSelector(
      (state) => state.favourites
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
        dispatch(getFavourites())

        return () => {
          dispatch(reset())
        }
      }, [isError, message, dispatch])
      
      if (isLoading) {
        return <Spinner />
      }

      const changeActive = (e) => {

        document.getElementById(sortMemory).classList.remove("active")
        document.getElementById(e).classList.add('active')
        setSortMemory(e)
      }

      //Date filter
      let eventsCopy = events.filter((event) => event.approved).slice();
      let datenow = new Date(new Date().toDateString());

        if(ageOption === "today"){
          eventsCopy = eventsCopy.filter((a) => new Date(a.date) === datenow );

        }else if(ageOption === "week"){

          eventsCopy = eventsCopy.filter((a)=> new Date(a.date).getMonth() === datenow.getMonth())
          
          if(datenow.getDay() === 1){

            let days = datenow.getDate()
            let date1 = new Date(datenow)
            let date2 = new Date(datenow.setDate(days+6))

            let eventsCopy1 = eventsCopy.filter((a) => new Date(a.date).getDate() >= date1.getDate());

            eventsCopy = eventsCopy1.filter((a) => new Date(a.date).getDate() <= date2.getDate())

          }else{

            let week = datenow.getDay()
            week -= 1
            let days = datenow.getDate()

            let date1 = new Date(datenow.setDate(days-week))
            let date2 = new Date(date1.setDate(days+6))

            let eventsCopy1 = eventsCopy.filter((a) => new Date(a.date).getDate() >= date1.getDate());

            eventsCopy = eventsCopy1.filter((a) => new Date(a.date).getDate() <= date2.getDate())

          }
        }else if(ageOption === "month"){
          eventsCopy = eventsCopy.filter((a) => new Date(a.date).getMonth() === datenow.getMonth() );


        }else if(ageOption === "later"){
          eventsCopy = eventsCopy.filter((a) => new Date(a.date).getMonth() > datenow.getMonth() );
          
        }
        //something a litle extra 
        else if(ageOption === "favs"){
          eventsCopy = eventsCopy.sort((a, b)=> a.favorites < b.favorites)
        }


  return (
    <>
      <section>
            <div className='sort'>
              <button id={"sort_choice0"} className='sort_category active' onClick={(e)=>{
                setCategory("")
                changeActive(e.target.id)
                }}>All</button>
            {
                categories.map((cat, index) =>(
                  <button id={`sort_choice${index+1}`}  className='sort_category' key={index} onClick={
                    (e)=>{
                    setCategory(cat.category)
                    changeActive(e.target.id)
                  }}>{cat.category}</button>
                ))
              }
            </div>
            <select className='dateFilter' defaultValue={""} onInput={(e)=>setageOption(e.target.value)}>
                <option value={""} disabled hidden>Sort by</option>
                <option value={"empty"}>None</option> 
                <option value={"today"}>Today</option>
                <option value={"week"}>This Week</option>
                <option value={"month"}>This Month</option>
                <option value={"later"}>Later</option>
                <option value={"favs"}>Most Favorites</option>
            </select>
        </section>
        <section className='heading'>
          <h1>Events</h1>
        </section>
        <section className='content'>
            {eventsCopy.length > 0 ? (
                <div className='goals'>
                {eventsCopy.map((event) => {
                  const isFavorited = favourites?.some((fav) => fav.eventID === event._id);
            
                  return (
                    <OneEvent
                      key={event._id}
                      event={event}
                      showFavouriteButton={true}
                      category={category}
                      Favorited={isFavorited}
                    />
                  );
                })}
              </div>
                ) : (
                <h3>Events not Found</h3>
            )}
        </section>
    </>
  )
}

export default AllEvents