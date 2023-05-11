import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCategory, postCategory, changeACategory, getCategories, reset } from "../features/categories/categorySlice"
import AdminUsers from "../components/AdminUsers"

function AdminPanel() {
    const dispatch = useDispatch()


    const { categories } = useSelector(
        (state) => state.categories
    )

    useEffect(() => {

        dispatch(getCategories())

        return () =>{
            dispatch(reset())
        }
    }, [dispatch])

    //Creates new category
    const [category, setCategory] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(postCategory({ category }))
    }

    // change category name
    const [newName, setNewName] = useState('')

    const change = (chosenId) => {
        console.log("hello");
        console.log(newName);
        dispatch(changeACategory({ chosenId, newName }))
    }
    //===========================
    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text"
                        placeholder="Add category name"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <button type='submit'>Submit</button>

                </form>
                {categories.map((Acategory) => (
                    <div key={Acategory._id}>
                        <h2>{Acategory.category}</h2>
                        <button onClick={() => dispatch(deleteCategory(Acategory._id))}>remove</button>
                        <input type="text"
                            placeholder="Add new category name"
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <button onClick={() => change(Acategory._id)}>update</button>
                    </div>
                ))}
            </div>
                
            <div>
                <AdminUsers/>
            </div>
        </div>

    )
}

export default AdminPanel