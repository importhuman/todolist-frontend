import { useState } from 'react'

const AddItem = ({ onAdd }) => {
    const [task, setTask] = useState('')
    const [status, setStatus] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!task){
            return
        }
        onAdd({task, status})
        setTask('')
        setStatus(false)
    }

    return (
        <form className="add-task" onSubmit={onSubmit} > 
            <div>
            <label>Add a new task!</label>
            <input className="form-input" type="text" placeholder="Add task" value={task} onChange={(e) => setTask(e.target.value)} />
            </div>
            <div className="form-status">
            <label>Status</label>
            {/* checked={status} to revert to unchecked after adding a task */}
            <input className="form-checkbox" type="checkbox" checked={status} value={status} onChange={(e) => setStatus(e.currentTarget.checked)} />
            </div> 
            <input id="form-submit" type="submit" value="Add task"/>
        </form>
    )
}

export default AddItem
