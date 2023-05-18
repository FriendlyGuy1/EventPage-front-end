import { useSelector, useDispatch } from "react-redux";
import { deleteEvent, getEvents, updateEvent } from "../features/events/eventSlice";
import UpdateEvent from "./UpdateEvent";
import { useEffect, useState } from "react";
import { getFavourites, postFavourite } from "../features/favourite/favouriteSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlinePlace } from "react-icons/md";
import { RxHeartFilled } from "react-icons/rx";

function OneEvent({ event, showFavouriteButton, category, Favorited}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [updateevent, setUpdateEvent] = useState(false);
  const [showEvent, setShowEvent] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showCounter, setShowCounter] = useState(true);
  const [showDisapproval, setShowDisapproval] = useState(false);

  useEffect(() => {
    if (user === null) {
    } else if (user.role === "admin") {
      setShowDeleteButton(true);
      setShowDisapproval(true);
    } else if (user._id === event.user) {
      setShowDeleteButton(true);
    }
  }, []);

  const handleUpdate = () => {
    setUpdateEvent(true);
    setShowEvent(false);
    setShowCounter(false);
  };

  const handleFavourite = async() => {
    if (!user) {
      navigate("/login");
    }

    if(Favorited){
      
    }
    else{
      await dispatch(postFavourite(event._id)) 
    }
    
    dispatch(getEvents())
    dispatch(getFavourites())
  
  };
  
  const handleDisapproval = () => {
    let updatedDisapproval = {
      approved: false,
      _id: event._id,
    };

    dispatch(updateEvent(updatedDisapproval));
  };

  const updateBackButton = (show) => {
    setUpdateEvent(show)
    setShowEvent(true)
    setShowCounter(true)
  }

  //standart
  if (category === "") {
    return (
      <>
        {showEvent && (
          <div className="goal">
            <img src={event.image} alt="No Image"></img>
            <h2 className="title">{event.title}</h2>
            <p className="description">{event.description}</p>
            <h4 className="eventplace">
              <MdOutlinePlace /> {event.place}
            </h4>
            <h2>{event.date.slice(0, 10)}</h2>
            <div className="types">
              <span className="project-type">• {event.category}</span>
            </div>
            {showDeleteButton && (
              <>
                <button
                  onClick={() => dispatch(deleteEvent(event._id))}
                  className="btn btn-block"
                >
                  DELETE
                </button>
                <button
                  onClick={() => handleUpdate()}
                  className="btn btn-block"
                >
                  UPDATE
                </button>
              </>
            )}

            {showDisapproval && (
              <button onClick={handleDisapproval} className="btn btn-block">
                Remove Approval
              </button>
            )}

            <div className="fav_container">
              {showFavouriteButton && (
                <button
                  onClick={() => handleFavourite()}
                  className={`${Favorited ? "favouriteIconRed fav" : "favouriteIcon fav"}`}
                >
                  <RxHeartFilled />
                </button>
              )}
              {showCounter && (
                <h2 className="fav_counter">({event.favorites})</h2>
              )}
            </div>
          </div>
        )}

        {updateevent && <UpdateEvent event={event}  updateBackButton={updateBackButton}/>}
      </>
    );
  }
  //category filter active
  else {
    return (
      <>
        {category === event.category ? (
          <div className="goal">
          <img src={event.image} alt="No Image"></img>
          <h2 className="title">{event.title}</h2>
          <p className="description">{event.description}</p>
          <h4 className="eventplace">
            <MdOutlinePlace /> {event.place}
          </h4>
          <h2>{event.date.slice(0, 10)}</h2>
          <div className="types">
            <span className="project-type">• {event.category}</span>
          </div>
          {showDeleteButton && (
            <>
              <button
                onClick={() => dispatch(deleteEvent(event._id))}
                className="btn btn-block"
              >
                DELETE
              </button>
              <button
                onClick={() => handleUpdate()}
                className="btn btn-block"
              >
                UPDATE
              </button>
            </>
          )}

          {showDisapproval && (
            <button onClick={handleDisapproval} className="btn btn-block">
              Remove Approval
            </button>
          )}

          <div className="fav_container">
            {showFavouriteButton && (
              <button
                onClick={() => handleFavourite()}
                className={`${Favorited ? "favouriteIconRed fav" : "favouriteIcon fav"}`}
              >
                <RxHeartFilled />
              </button>
            )}
            {showCounter && (
              <h2 className="fav_counter">({event.favorites})</h2>
            )}
          </div>
        </div>
        ) : (
          null
        )}
      </>
    );
  }
}

export default OneEvent;
