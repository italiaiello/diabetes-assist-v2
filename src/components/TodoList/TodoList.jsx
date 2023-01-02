import React, { useState } from 'react';
import ListItems from './ListItems'
import { auth, database } from '../../firebase';
import { ref, set, child, push } from "firebase/database";

const TodoList = props => {

    const [currentItem, setCurrentItem] = useState('')

    const handleInput = e => {
        setCurrentItem(e.target.value)
    }

    const addItem = () => {
        const newTaskKey = push(child(ref(database), `users/${auth.currentUser.uid}/tasks`)).key;
        if (currentItem !== "") {
            if (props.todoTasks !== null) {
                const newItems = props.todoTasks.slice()
                newItems.push({ id: newTaskKey, detail: currentItem })
                props.setTodoTasks(newItems)
                
            } else {
                const newItem = [currentItem]
                props.setTodoTasks(newItem)
            }

            addTaskToDatabase(newTaskKey)
        }

        setCurrentItem('')
    }

    const addWithEnterKey = (e) => {
        let code = (e.keyCode ? e.keyCode : e.which);
        if(code === 13) { // Keycode for Enter button
            addItem()
        }
    }

    const addTaskToDatabase = (taskId) => {
        set(ref(database, `users/${auth.currentUser.uid}/tasks/${taskId}`), {
            id: taskId,
            task: currentItem
        })
    }

    return (
        <div>
            <ListItems todoTasks={props.todoTasks} setTodoTasks={props.setTodoTasks}/>
            <article id="addTask">
                <button type="submit" onClick={addItem}>+</button>
                <input type="text" onKeyPress={addWithEnterKey} placeholder="Add a task" 
                    value={currentItem} onChange={handleInput}
                />
            </article>
        </div>
    )
}

export default TodoList;