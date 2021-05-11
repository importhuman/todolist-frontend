import { useState, useEffect } from "react"
import { useAuth0 } from "../react-auth0-spa.jsx" 
import Items from './Items.jsx'
import AddItem from './AddItem.jsx'

const LoggedIn = () => {
  const { getTokenSilently, loading, logout, isAuthenticated } = useAuth0();

  const [items, setItems] = useState([])


  // alternate method for GET ------------


  // fetch tasks, render the tasks fetched from backend to frontend
  useEffect(() => {
    const getItems = async () => {
      try {
        const token = await getTokenSilently();

        console.log("success 1");
        // console.log(token);
        // Send a GET request to the server and add the signed in user's
        // access token in the Authorization header
        const response = await fetch("http://localhost:8000/list", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("success 2");

        const responseData = await response.json();

        console.log("success 3");

        setItems(responseData);
      } catch (error) {
        console.log("caught error")
        console.error(error);
      }
    };

    getItems();
  });

  // -------------
  
  // // render the tasks fetched from backend to frontend
  // useEffect(() => {
  //   const getItems = async () => {
  //     const data = await fetchItems()
  //     setItems(data)
  //   }

  //   getItems()
  // })
  

  // // // fetch tasks from backend
  // const fetchItems = async () => {
  //   try {
  //     const token = await getTokenSilently();
  //       // Send a GET request to the server and add the signed in user's
  //       // access token in the Authorization header
  //     const response = await fetch('http://localhost:8000/list', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     })
  //     const data = await response.json()

  //     return data
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } 

  // add task
  // works with backend
  const addItem = async (item) => {
    try {
      const token = await getTokenSilently();
      const res = await fetch("http://localhost:8000/list/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(item)
    })

    const data = await res.json()
      if (res.ok){
        setItems([...items, data])
      } else {
        console.log(res.status)
      } 
    } catch (error) {
      console.error(error)
    }    
  }

  // delete task
  // works with backend
  const deleteItem = async (id) => {
    try {
      const token = await getTokenSilently();
      const res = await fetch(`http://localhost:8000/list/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    const newItems = await res.json()

    if (res.ok) {
      setItems(newItems)
    } else {
      console.log(res.status)
    }
    } catch (error) {
      console.error(error)
    }
  }

  // toggle status
  // works with backend
  const toggleStatus = async (id) => {
    try {
      const token = await getTokenSilently();
      const res = await fetch(`http://localhost:8000/list/done/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const updatedItem = await res.json()
     
      if (res.ok) {
        setItems(items.map((item) => item.id === id ? updatedItem : item))
      } else {
        console.log(res.status)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // edit task
  const editItem = async (editItem) => {
    try {
      const token = await getTokenSilently();
      const res = await fetch(`http://localhost:8000/list/edit/${editItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editItem)
      })

      const data = await res.json()
      if (res.ok) {
        setItems(items.map((item) => item.id === editItem.id ? data : item))

        // if task is empty, delete task
        if (data.task === "") {
          deleteItem(data.id)
        }
      } else {
        console.log(res.status)
      }

    } catch (error) {
      console.error(error)
    }
  }

    if (loading) {
      return <div>Loadng...{loading} </div>;
    }

    return (
        <>
        {isAuthenticated && <span onClick={() => logout()} id="logout">Log out</span>}
        <h1 className="heading">To-do list</h1>
        <AddItem onAdd={addItem} />
        {items.length > 0 ? (
        <Items items={items} onDelete={deleteItem} onToggle={toggleStatus} editItem={editItem}/>
        ) : (
          <div className="no-tasks">
          No tasks yet! <br/><br/>
          <ul>
            <li>Add a task by typing in the box above!</li>
            <li>Mark a task as done by clicking the checkbox!</li>
            <li>Click the "Edit" button to modify your task, and click it again to save your changes! (Empty tasks are automatically deleted)</li>
            <li>Click "Delete" to remove the task!</li>
          </ul>
          </div>
        )}
        </>
    )
}

export default LoggedIn