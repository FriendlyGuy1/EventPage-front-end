import { useDispatch } from "react-redux";
import { deleteEvent, updateEvent } from "../features/events/eventSlice";
import { MdOutlinePlace } from "react-icons/md";

function OneApprovalEvent({ event }) {
  const dispatch = useDispatch();

  const handleApproval = (e) => {
    e.preventDefault();

    let updatedApproval = {
      approved: true,
      _id: event._id,
    };

    dispatch(updateEvent(updatedApproval));
  };

  const handleDisapproval = (e) => {
    e.preventDefault();

    dispatch(deleteEvent(event._id));
  };


  return (
    <>
      <div className="goalApproval">
            <img src={event.image} alt="No Image"></img>
            <h2 className='title'>{event.title}</h2>
            <p className="description">{event.description}</p>
            <h4 className='eventplace'><MdOutlinePlace /> {event.place}</h4>
            <h2>{event.date.slice(0, 10)}</h2>
            <div className="types">
              <span className="project-type">• {event.category}</span>
            </div>
        <div className="buttons">
          <button
            onClick={handleApproval}
            className="approveBtn approveBtn-block"
          >
            Approve
          </button>
          <button
            onClick={handleDisapproval}
            className="disapproveBtn approveBtn-block"
          >
            Disapprove
          </button>
        </div>
      </div>
    </>
  );
}

export default OneApprovalEvent;
