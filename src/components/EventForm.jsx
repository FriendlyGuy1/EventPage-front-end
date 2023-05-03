import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, reset } from '../features/categories/categorySlice'
import { createEvent } from '../features/events/eventSlice'

function EventForm() {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')

  

  const { categories } = useSelector(
    (state) => state.categories
  )


  useEffect(() => {

    dispatch(getCategories())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])
  

  const handleChange = (e) => {
    setCategory(e.target.value);
  };


  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createEvent({ title, category, description, place, date, image }))
    setTitle('')
    setCategory('')
    setDescription('')
    setPlace('')
    setDate('')
    setImage('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            placeholder='enter title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>Category</label>
          <select onChange={handleChange}>
            <option value="">--Please choose category--</option>
            {
              categories.map((cat,index) => (
                <option key={index} value={cat.category}>{cat.category}</option>
              ))
            }
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='text'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            value={description}
            placeholder='enter description'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>Place</label>
          <input
            type='text'
            name='place'
            id='place'
            value={place}
            placeholder='enter place'
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>Date</label>
          <input
            type='date'
            name='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>Image</label>
          <input
            type='text'
            name='image'
            id='image'
            value={image}
            placeholder='image address'
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Event
          </button>
        </div>
      </form>
    </section>
  )
}

export default EventForm