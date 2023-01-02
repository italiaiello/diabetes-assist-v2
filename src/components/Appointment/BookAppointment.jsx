import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import SelectTime from './SelectTime'
import ConfirmBooking from './ConfirmBooking'
import Calendar from '../../images/calendar.svg'
import HomeButton from '../../images/Home.svg'
import HealthProfessionals from '../../json/test.json'
import ErrorIcon from '../../images/Error.svg'

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

const BookAppointment = props => {

    const images = require.context('../../images/Health_Professionals', true);
    const idNum = parseInt(props.professionalId) - 1;

    const [startDate, setStartDate] = useState(new Date());

    let newDate = new Intl.DateTimeFormat('en-AU', {
        month: 'long',
        weekday: 'long',
        day: '2-digit',
        year: 'numeric'
    }).format(startDate)

    const [dateText, setDateText] = useState(newDate);
    const [timeSlot, setTimeSlot] = useState("");

    const [isBookingValid, setIsBookingValid] = useState(true);
    const [isBookingValidText, setIsBookingValidText] = useState('')

    const checkBookingIsValid = () => {
        if (timeSlot === '') {
            setIsBookingValid(false)
            setIsBookingValidText('Please select a time for your booking')
        }
        
        props.onRouteChange('confirmBooking')
    }


    const handleDateIncrement = (operation) => {
        if (operation === "add") {
            startDate.setDate(startDate.getDate() + 1)
        } else if (operation === "minus") {
            startDate.setDate(startDate.getDate() - 1)
        }

        newDate = new Intl.DateTimeFormat('en-AU', {
            month: 'long',
            weekday: 'long',
            day: '2-digit',
            year: 'numeric'
        }).format(startDate)
        setDateText(newDate)
    }

    const handleDatePick = date => {
        setStartDate(date)
        newDate = new Intl.DateTimeFormat('en-AU', {
            month: 'long',
            weekday: 'long',
            day: '2-digit',
            year: 'numeric'
        }).format(startDate)
        pickDate(newDate)
    }

    const pickDate = date => {
        setDateText(date)
    }

    

    

    
    return (
        props.route === 'confirmBooking' ?
        <ConfirmBooking professionalId={props.professionalId} 
                        onRouteChange={props.onRouteChange} 
                        dateText={dateText}
                        timeSlot={timeSlot}
                        userEmail={props.userEmail} />
        :
        <article className="pageDisplay">
            <div className="backAndHeading">
                <div className="sectionHeading">
                    <div className="back">
                        <div className="leftArrow" onClick={() => props.onRouteChange('appointment')}></div>
                        <p>Back</p>
                    </div>
                    <h1>My Health</h1>
                </div>
            </div>
            <div id="dateSelection">
                <figure id="professionalImage">
                    <img src={images(`./${HealthProfessionals[idNum].image}`)} 
                        alt={`${HealthProfessionals[idNum].first_name} 
                        ${HealthProfessionals[idNum].last_name}`} 
                    />
                    <p>{`${HealthProfessionals[idNum].first_name} 
                        ${HealthProfessionals[idNum].last_name}`}
                    </p>
                </figure>
                <div id="selectDate">
                    <div className="leftArrow" onClick={() => handleDateIncrement("minus")}></div>
                    <p>{dateText}</p>
                    <div className="rightArrow" onClick={() => handleDateIncrement("add")}></div>
                </div>
                <label>
                    <DatePicker
                        id="datePicker"
                        showPopperArrow={false}
                        selected={startDate}
                        onChange={date => handleDatePick(date)}
                        dateFormat="MMMM, d yyyy"
                    />
                    <figure id="calendarIcon">
                        <img src={Calendar} alt="Calendar button" />
                    </figure>
                </label>            
            </div>
            <SelectTime professionalId={props.professionalId} setTimeSlot={setTimeSlot}/>
            <div className={!isBookingValid ? 'formError show' : 'hide'}>
                <figure className="errorIcon">
                    <img src={ErrorIcon} alt="Error symbol" />
                </figure>
                <p>{isBookingValidText}</p>
            </div>
            <button id="bookAppointment" onClick={checkBookingIsValid}>Book Appointment</button>
            <figure className="homeButton">
                <img src={HomeButton} alt="Home button" onClick={() => props.onRouteChange('home')} />
            </figure>
        </article>
    )
}

export default BookAppointment