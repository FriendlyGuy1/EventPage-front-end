import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createEvent } from '../features/events/eventSlice'

function EventForm() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()

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
          <label htmlFor='text'>title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>category</label>
          <input
            type='text'
            name='category'
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>description</label>
          <input
            type='text'
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>place</label>
          <input
            type='text'
            name='place'
            id='place'
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>date</label>
          <input
            type='date'
            name='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>image</label>
          <input
            type='text'
            name='image'
            id='image'
            value={image}
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