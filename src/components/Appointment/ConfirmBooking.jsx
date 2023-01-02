import React from 'react';
import HealthProfessionals from '../../json/test.json'

const ConfirmBooking = props => {

    const images = require.context('../../images/Health_Professionals', true);
    const idNum = props.professionalId;
    console.log(idNum)

    const onSubmitBooking = () => {
        fetch('https://floating-waters-62169.herokuapp.com/book-appointment', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: props.userEmail,
                professional: idNum,
                date: props.dateText,
                time: props.timeSlot
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data === 'success') {
                props.onRouteChange('home')
            }
        })
    }

    return (
        <article className="pageDisplay">
            <div className="backAndHeading">
                <div className="sectionHeading">
                    <div className="back">
                        <div className="leftArrow" onClick={() => props.onRouteChange('appointmentTime')}></div>
                        <p>Back</p>
                    </div>
                    <h1>Confirm Booking</h1>
                </div>
            </div>
            <article className="confirmBookingInfo">
                <h2>Are these details correct?</h2>
                <div className="professional confirmProfessional">
                    <figure>
                        <img src={images(`./${HealthProfessionals[idNum - 1].image}`)} 
                            alt={`Health Professional ${HealthProfessionals[idNum - 1].first_name}`} 
                        />
                    </figure>
                    <div className="HPInfo">
                        <h3>{`${HealthProfessionals[idNum - 1].first_name} ${HealthProfessionals[idNum - 1].last_name}`}</h3>
                        <p>{`${props.dateText.substr(0, props.dateText.length-5)} at ${props.timeSlot}`}</p>
                    </div>
                </div>
            </article>
            <article className="confirmationButtons">
                <button className="cancelButton" onClick={() => props.onRouteChange('appointmentTime')}>Cancel</button>
                <button className="confirmButton" onClick={onSubmitBooking}>Confirm</button>
            </article>
            
        </article>
    )
}

export default ConfirmBooking