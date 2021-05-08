import { useState } from 'react'

const Item = ({ item, onDelete, onToggle, editItem }) => {
    const [edit, toggleEdit] = useState(false)
    // const [task, setTask] = useState(item.task)
    const [currItem, setItem] = useState(item)

    // change the task on frontend
    const handleChange = (e) => {
        setItem({...currItem, task: e.target.value});
    }

    // make the API call after clicking outside the input field
    // Not calling API in handleChange as setItem is asynchronous, thus last change is not taken into account there
    const handleBlur = () => {
        toggleEdit(false);
        editItem(currItem)
    }

    return (
        <div className={`item ${item.status ? 'done' : ''}`}>
            {!edit ? (
                <h3 className="task">{currItem.task}</h3>
            ) : (
                <input className="edit-task-input" type="text" value={currItem.task} onChange={handleChange} onBlur={handleBlur}/>
            )}
            <div className="current-item-status"><input className="checkbox" type="checkbox" checked={item.status} value={item.status} onChange={()=>onToggle(item.id)} />
            <label>Done</label></div>
            <p className="edit" style={{cursor: 'pointer'}} onClick={() => toggleEdit(!edit)}>Edit</p>
            <p className="delete" style={{cursor: 'pointer'}} onClick={() => onDelete(item.id)}>Delete</p>
        </div>
    )
}

export default Item
