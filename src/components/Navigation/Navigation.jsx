import React from 'react';
import MealPlannerIcon from '../../images/meal.svg';
import HealthIcon from '../../images/Health.svg';
import AppointmentIcon from '../../images/appointment.svg';
import CybelIcons from '../../images/Cybel.svg';
import EmergencyIcon from '../../images/Emergency.svg';

const Navigation = props => {

    return (
        <nav id="navigationBar">
            <div id="navButtons">
                <figure>
                    <img id="healthIcon" src={HealthIcon} alt="Icon for My Health section" onClick={() => props.onRouteChange('health')} />
                    <p>My Health</p>
                </figure>
                <figure>
                    <img id="apptIcon" src={AppointmentIcon} alt="Icon for the Book Appointment section" onClick={() => props.onRouteChange('appointment')} />
                    <p>Appointments</p>
                </figure>
                <figure>
                    <img id="mealIcon" src={MealPlannerIcon} alt="Icon for the Meal Planner section" onClick={() => props.onRouteChange('meal')} />
                    <p>Meal Planner</p>
                </figure>
                <figure>
                    <img id="cybelIcon" src={CybelIcons} alt="Icon for Cybel" onClick={() => props.onRouteChange('cybel')} />
                    <p>Cybel</p>
                </figure>
            </div>
            <figure id="emergency">
                <img id="emergencyIcon" src={EmergencyIcon} alt="Icon for making an emergency call" onClick={() => props.onRouteChange('emergency')} />
                <p>Emergency Call</p>
            </figure>
        </nav>
    )
}

export default Navigation