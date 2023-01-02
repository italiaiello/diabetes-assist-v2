import React from 'react';
import { ref, remove } from "firebase/database";
import TaskTick from '../../images/Tick.svg'
import { auth, database } from '../../firebase';

const ListItems = props => {

    const removeItem = taskToDelete => {
        let newTasks = props.todoTasks.slice()
        newTasks = newTasks.filter(task => task.id !== taskToDelete.id)
        remove(ref(database, `users/${auth.currentUser.uid}/tasks/${taskToDelete.id}`))
        props.setTodoTasks(newTasks)
    }

    const listItems = props.todoTasks === null ?
        <p id="noTasksMessage">Nothing to do yet</p>
        :
        props.todoTasks.map((taskTodo) => {
            return (
                <div className="list" key={taskTodo.id}>
                    <div className="circleButton" onClick={() => removeItem(taskTodo)}>
                        <figure className="tickIcon">
                            <img src={TaskTick} alt="Task ticked off" />
                        </figure>
                    </div>
                    <p>{taskTodo.task}</p>
                </div>
            )
        })
    

    return (
        <div id="thingsToDo">{listItems}</div>
    )
}

export default ListItems;