import React from 'react';
import Cybel from '../Cybel/Cybel'
import Emergency from '../Emergency/Emergency'
import Health from '../Health/Health'
import MealPlanner from '../MealPlanner/MealPlanner'
import Appointment from '../Appointment/Appointment'
import SignIn from '../SignIn/SignIn'
import Register from '../Register/Register'
import { useDataFetch } from '../../hooks/DisplayRecipes'

const OtherPages = props => {

    let route = props.route
    const [isLoading, recipeData] = useDataFetch('https://api.spoonacular.com/recipes/search?apiKey=d464b770a6c2452cb7d56fc6ccea9eb5', props.fetchData)

    return (
        <div>
            {

            isLoading && route === 'meal' ? 
            <h1>Fetching Recipe Data</h1>
            :
            (
                isLoading ?
                <h1>Loading...</h1>
                :
                (
                    route === 'signin' ?
                    <SignIn onRouteChange={props.onRouteChange} loadUser={props.loadUser} />
                    :
                    (
                        route === 'register' ?
                        <Register onRouteChange={props.onRouteChange} loadUser={props.loadUser} />
                        :
                        (
                            route === 'health' ?
                            <Health onRouteChange={props.onRouteChange}/>
                            :
                            (
                                route === 'cybel' ?
                                <Cybel onRouteChange={props.onRouteChange} />
                                :
                                (
                                    route === 'meal' || route === 'mealSelect' || route === 'recipe'
                                    ?
                                    <MealPlanner recipeData={recipeData}
                                                onRouteChange={props.onRouteChange}
                                                route={route}
                                                userEmail={props.userEmail}
                                                
                                    />
                                    :
                                    (
                                        route === 'appointment' || route === 'appointmentTime' || 
                                        route === 'confirmBooking' 
                                        ?
                                        <Appointment route={route} 
                                                        onRouteChange={props.onRouteChange}
                                                            userEmail={props.userEmail} />
                                        :
                                        (
                                            route === 'Emergency' &&
                                            <Emergency onRouteChange={props.onRouteChange} />
                                        )                               
                                        
                                
                                        
                                    )
                                )
                            )
                        )
                    )
                )
            )
        }
        </div>
    )
}

export default OtherPages;