import React, { useState, useEffect } from "react"
import categoryService from "../services/categories"


const AdminPanel = () => {
    //Gets the categories from the database
    const [categories, setcatagories] = useState([])
    const getData = () => {
        categoryService.getCategories().then(res => {
            setcatagories([...res.data])
        })
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(categories);
    //Creates new category
    const [categoryName, setCategoryName] = useState('')

    const onSubmit = e => {
        e.preventDefault()

        const newCategory = {
            category: categoryName
        }
        categoryService.postCategories(newCategory)

        setCategoryName('')
        getData('')
    }

    //removes a category
    const chosenToRemove = (chosen) => {
        categoryService.removeCategory(chosen)
    }
    //change category name
    const [changeCategoryName, setChangeCategoryName] = useState('')

    const change = (chosenToChange) => {

        const newName ={
            category: changeCategoryName
        }
        categoryService.changeCategory(chosenToChange, newName)
    }

    return (
        <div>
            adminpanel
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder="Add category name"
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button>Submit</button>
            </form>
            {categories.map((category) => (
                <div key={category._id}>
                    <form >
                        <h2>{category.category}</h2>
                        <button onClick={() => chosenToRemove(category._id)}>remove</button>
                    </form>
                    <input type="text"
                        placeholder="Add category name"
                        onChange={(e) => setChangeCategoryName(e.target.value)}
                    />
                    <button onClick={() => change(category._id)}>update</button>
                </div>
            ))}
        </div>
    )
}

export default AdminPanel