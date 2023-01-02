import React from 'react';
import TodoList from '../TodoList/TodoList'
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';


const DailyInfo = props => {

    const name = props.userName.toUpperCase();

    const onSignOut = () => {
        props.setIsSigningOut(true)
        signOut(auth).then(() => {
            props.setIsSigningOut(false)
            props.onRouteChange('start')
        }).catch((error) => {
            console.log(error.message)
            props.setIsSigningOut(false)
        })
    }
        
    return (
        <section id="dailyInfo">
            <article id="welcome-signout">
                <h1 id="welcome">Welcome, <span>{name}</span></h1>
                <div id="signout">
                    <button onClick={onSignOut} >Sign Out</button>
                </div>
            </article>
            <h2 id="today">TODAY</h2>
            <TodoList todoTasks={props.todoTasks} setTodoTasks={props.setTodoTasks} />
        </section>
    )
}

export default DailyInfo