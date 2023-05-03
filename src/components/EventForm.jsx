import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, reset } from '../features/categories/categorySlice'
import { createEvent } from '../features/events/eventSlice'
import imageService from '../features/image/imageService'


function EventForm() {
  const inputRef = useRef(null);
  let base64 = ""

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      base64 = await convertBase64(files[0]);
      setImage(await imageService.uploadSingleImage(base64))
      return;
    }
  };

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

    if(title == ""){
      alert("Title can't be empty")
      return
    }
    if(category == ""){
      alert("Must select a category")
      return
    } 
    if(description == ""){
      alert("Description can't be empty")
      return
    } 
    if(place == ""){
      alert("Place can't be empty")
      return
    } 
    if(date == ""){
      alert("Must select a date")
      return
    }
    if(image == "" && base64 == ""){
      alert("Must upload an image")
      return
    }
    if(image == ""){
      alert("Image still loading")
      return
    }  

    dispatch(createEvent({ title, category, description, place, date, image }))
    setTitle('')
    setCategory('')
    setDescription('')
    setPlace('')
    setDate('')
    setImage('')
    inputRef.current.value = null;
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
            ref={inputRef}
            onChange={uploadImage}
            className='ImageBackground' 
            type="file"
            accept="image/png, image/jpeg"
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