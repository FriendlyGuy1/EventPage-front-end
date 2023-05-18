import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCategory, postCategory, changeACategory, getCategories, reset } from "../features/categories/categorySlice"
import AdminUsers from "../components/AdminUsers"
import EventApproval from "../components/EventApproval"

function AdminPanel() {
    const dispatch = useDispatch()


    const { categories } = useSelector(
        (state) => state.categories
    )
    useEffect(() => {
        dispatch(getCategories())
        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    function refresh() {
        dispatch(getCategories())
        dispatch(reset())
    }
    //Creates new category
    const [category, setCategory] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(postCategory({ category }))
        setTimeout(refresh, 200)

    }

    // change category name
    const [newName, setNewName] = useState('')

    const change = (chosenId) => {
        dispatch(changeACategory({chosenId, newName }))
        setTimeout(refresh, 400)
    }

    //===========================

    const deleteACategory = (id) => {
        dispatch(deleteCategory(id))
        setTimeout(refresh, 400)

    }
    return (
        <div>
            <div className="approvalWindow">
                <EventApproval />
            </div>
            <div className="categoriesAndUsers">
                <div className="adminCategories">
                    <form onSubmit={onSubmit} className="adminForm">
                        <input type="text"
                            placeholder="Add category name"
                            className="adminInput"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <button type='submit' className="adminSubmit">Submit</button>

                    </form>
                    {categories?.map((Acategory) => (
                        <div key={Acategory._id} className="adminSeparateCategory">
                            <h2>{Acategory.category}</h2>

                            <input type="text"
                                placeholder="Add new category name"
                                className="adminInput"
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <div>
                                <button onClick={() => change(Acategory._id)} className="adminApproveBtn">update</button>
                                <button onClick={() => deleteACategory(Acategory._id)} className="adminRemoveBtn">remove</button>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="adminUsers">
                    <AdminUsers />
                </div>
            </div>

        </div>

    )
}

export default AdminPanel
