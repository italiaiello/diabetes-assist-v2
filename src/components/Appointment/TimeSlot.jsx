import React, { useState } from 'react'

const TimeSlot = props => {
    
    const apptTime = props.time - 12 < 0 ? `${props.time}:00AM` : `${props.time}:00PM`

    const [timeSelected, setTimeSelected] = useState(false)

    const onTimeSlotSelect = (e) => {
        if (timeSelected) {
            setTimeSelected(false)
            props.setTimeSlot("")
            props.setTimeSlotId(-1)
        } else {
            props.setTimeSlot(apptTime)
            setTimeSelected(true)
            props.setTimeSlotId(props.id)
        }
        
    }

    return (
        <article className={props.availability === "Yes" ? "available timeAvailable" : "not-available timeAvailable"}>
            <div className={(timeSelected && props.timeSlotId === props.id) ? "timeSlot slotSelected" : "timeSlot"}
                onClick={props.availability === "Yes" ? onTimeSlotSelect : null}
            ></div>
            <p>{apptTime}</p>
        </article>
    )
}

export default TimeSlot