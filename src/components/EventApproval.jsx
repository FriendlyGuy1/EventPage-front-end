import React, { useEffect } from "react";
import { getEvents, reset } from "../features/events/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import OneApprovalEvent from "./OneApprovalEvent";

const EventApproval = () => {
  const dispatch = useDispatch();

  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getEvents());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {events.filter((event) => !event.approved).length > 0 ? (
        <div className="goalsApproval">
          {events
            .filter((event) => !event.approved)
            .map((event) => (
              <OneApprovalEvent key={event._id} event={event} />
            ))}
        </div>
      ) : (
        <h2>No events that need Approval</h2>
      )}
    </div>
  );
};

export default EventApproval;
