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

    function refresh() {
        dispatch(getUsers())
        dispatch(reset())

    }

    const filteredUsers = users.filter(user => user.role !== 'admin')

    // removes User
    const removeUser = (id) => {
        dispatch(deleteUser(id))
        setTimeout(refresh, 400)
    }
    return (
        <div>
            {filteredUsers.map((aUser) => (
                <div key={aUser._id} className="adminUser">
                    <h3>{aUser.name}</h3>
                    <button onClick={() => removeUser(aUser._id)} className="adminRemoveBtn">Remove User</button>
                </div>
            ))}
        </div>

    )
}

export default AdminUsers