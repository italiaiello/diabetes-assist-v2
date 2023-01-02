import React, { useState } from 'react'
import Routine from './Routine'
import './RoutineEdit.css'

const RoutineEdit = ({toggleModal, daysOfWeek, routine, setRoutine, isProfileOpen} ) => {

    const [tempRoutine, setTempRoutine] = useState(routine)

    const saveChanges = () => {
        setRoutine(tempRoutine)
        toggleModal()
    }

    return (
        <article className="editRoutine-modal">
            <article className="modal-container">
                <div className="modal-heading">
                    <h2>Your Medication Routine</h2>
                    <button className="modal-close" onClick={toggleModal}>&times;</button>
                </div>
                <div className="currentRoutine">
                {
                    daysOfWeek.map((day, i) => {
                        return (
                            <Routine 
                                key={i}
                                dayOfWeek={day}
                                index={i}
                                tempRoutine={tempRoutine}
                                dailyRoutine={tempRoutine[i]}
                                setTempRoutine={setTempRoutine}
                                isProfileOpen={isProfileOpen}
                            />
                                
                        )
                    })
                }
                </div>
                <div className="modal-buttons">
                    <button className="modal-cancel" onClick={toggleModal}>Cancel</button>
                    <button className="modal-save" currentRoutine={tempRoutine} onClick={saveChanges}>Save and Close</button>
                </div>
            </article>
        </article>
    )
}

export default RoutineEdit