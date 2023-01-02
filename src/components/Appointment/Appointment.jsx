import React, { useState } from 'react'
import HomeButton from '../../images/Home.svg'
import BookAppointment from './BookAppointment'
import HealthProfessionals from '../../json/test.json'
import AliceManiniImg from '../../images/Health_Professionals/AliceManini.png'
import CamilleGreenImg from '../../images/Health_Professionals/CamilleGreen.png'
import DanielleBrownImg from '../../images/Health_Professionals/DanielleBrown.png'
import SquiresBrownImg from '../../images/Health_Professionals/SquiresBrown.png'

const Appointment = props => {

    const images = [AliceManiniImg, CamilleGreenImg, DanielleBrownImg, SquiresBrownImg]
    const [professionalId, setProfessionalId] = useState(1)

    const onProfessionalSelect = e => {
        console.log(e.currentTarget.dataset.id)
        setProfessionalId(e.currentTarget.dataset.id)
        props.onRouteChange('appointmentTime')
    }

    return (
        props.route === 'appointmentTime' || props.route === 'confirmBooking' ?
        <BookAppointment onRouteChange={props.onRouteChange} 
                            professionalId={professionalId} 
                                userEmail={props.userEmail}
                                    route={props.route} />
        :
        <div className="pageDisplay">
            <div className="backAndHeading">
                <div className="sectionHeading">
                    <div className="back">
                        <div className="leftArrow" onClick={() => props.onRouteChange('home')}></div>
                        <p>Back</p>
                    </div>
                    <h1>Choose a Health Professional</h1>
                </div>
            </div>
            <nav className="filter">
                <button className="active">All</button>
                <button>Most Recent</button>
                <button>Recommended</button>
            </nav>
            <ul className="healthProfessionals">
                
                {
                    HealthProfessionals.map((professional, i) => {

                        return (
                            <li key={professional.id} data-id={professional.id} className="professional" onClick={onProfessionalSelect}>
                                <figure>
                                    <img src={images[i]} 
                                        alt={`Health Professional ${professional.first_name}`} 
                                    />
                                </figure>
                                <div className="HPInfo">
                                    <h3>{`${professional.first_name} ${professional.last_name}`}</h3>
                                    <p>{`Specialty: ${professional.specialty}`}
                                        <br />
                                        {`Location: ${professional.location}`}
                                    </p>
                                </div>
                                <div className="rightArrow appointmentArrow" 
                                    onClick={props.onRouteChange.bind(this, 'appointmentTime')}>
                                </div>
                            </li>
                        )
                    })
                }

            </ul> 
            <figure className="homeButton">
                <img src={HomeButton} alt="Home button" onClick={() => props.onRouteChange('home')}/>
            </figure>
        </div>
        
    )
}

export default Appointment