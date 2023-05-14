import { useDispatch } from "react-redux";
import { deleteEvent, updateEvent } from "../features/events/eventSlice";

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
        <h2>Title: {event.title}</h2>
        <h2>Category :{event.category}</h2>
        <h2>Description: {event.description}</h2>
        <h2>Place: {event.place}</h2>
        <h2>Date: {event.date}</h2>
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
