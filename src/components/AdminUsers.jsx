import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, reset } from "../features/usercontrol/userSlice";


function AdminUsers() {
    const dispatch = useDispatch()


    const { users } = useSelector(
        (state) => state.users
    )

    useEffect(() => {

        dispatch(getUsers())

        return () =>{
            dispatch(reset())
        }
    }, [dispatch])

    const filteredUsers = users.filter(user => user.role !== 'admin')

    // removes User
    
    return (
        <div>
            {filteredUsers.map((aUser) => (
                <div key={aUser._id}>
                    <h3>{aUser.name}</h3>
                    <button onClick={() => dispatch(deleteUser(aUser._id))}>Remove User</button>
                </div>
            ))}
        </div>

    )
}

export default AdminUsers