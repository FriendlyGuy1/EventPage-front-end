import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, reset } from "../features/categories/categorySlice";
import { updateEvent } from "../features/events/eventSlice";
import imageService from "../features/image/imageService";

function UpdateEvent({ event, updateBackButton }) {
  const inputRef = useRef(null);
  let base64 = "";

  const dispatch = useDispatch();

  const [editEvent, setEditEvent] = useState({
    title: event.title,
    category: event.category,
    description: event.description,
    place: event.place,
    date: event.date.slice(0, 10),
    image: event.image,
    _id: event._id,
  });

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
      setImage(await imageService.uploadSingleImage(base64));
      return;
    }
  };

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setEditEvent({ ...editEvent, category: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (editEvent.title == "") {
      alert("Title can't be empty");
      return;
    }
    if (editEvent.category == "") {
      alert("Must select a category");
      return;
    }
    if (editEvent.description == "") {
      alert("Description can't be empty");
      return;
    }
    if (editEvent.place == "") {
      alert("Place can't be empty");
      return;
    }
    if (editEvent.date == "") {
      alert("Must select a date");
      return;
    }

    // if(image == "" && base64 == ""){
    //   alert("Must upload an image")
    //   return
    // }
    // if(image == ""){
    //   alert("Image still loading")
    //   return
    // }

    dispatch(updateEvent(editEvent));
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={editEvent.title}
            placeholder="enter title"
            onChange={(e) => {
              setEditEvent({
                ...editEvent,
                title: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Category</label>
          <select onChange={handleChange}>
            <option value="">{editEvent.category}</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="text">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={editEvent.description}
            placeholder="enter description"
            onChange={(e) => {
              setEditEvent({
                ...editEvent,
                description: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Place</label>
          <input
            type="text"
            name="place"
            id="place"
            value={editEvent.place}
            placeholder="enter place"
            onChange={(e) => {
              setEditEvent({
                ...editEvent,
                place: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={editEvent.date}
            onChange={(e) => {
              setEditEvent({
                ...editEvent,
                date: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Image</label>
          <input
            ref={inputRef}
            onChange={uploadImage}
            className="ImageBackground"
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Update Event
          </button>
        </div>

        <div className="form-group">
          <button
            className="btn btn-block"
            type="submit"
            onClick={() => updateBackButton(false)}
          >
            BACK
          </button>
        </div>
      </form>
    </section>
  );
}

export default UpdateEvent;
