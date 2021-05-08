import Item from './Item'

const Items = ({ items, onDelete, onToggle, editItem }) => {
    // sorting by id before status, otherwise only sorted by id in frontend
    // sort items by id
    items.sort((a,b)=>a.id-b.id)
    // false items first
    items.sort((a,b)=>a.status-b.status)

    return (
        <div className="all-items">
            {items.map((item)=>(
                <Item key={item.id} item={item} onDelete={onDelete} onToggle={onToggle} editItem={editItem}/>
            ))}
        </div>
    )
}

export default Items