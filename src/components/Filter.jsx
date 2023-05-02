import { useState } from 'react'

const Filter = ({OneEvent, events}) => {

    const [category, setCategory] = useState("")
    const [sortByAge, setSortByAge] = useState("Newest") // Oldest

    return(
        <>
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

export default Filter