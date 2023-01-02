import React, { useState, useRef } from 'react';

const Routine = props => {

    const inputEl = useRef()
    const formEl = useRef()

    const [medInput, setMedInput] = useState('')

    const handleMedInput = (e) => {
        setMedInput(e.target.value)
    }

    const addItem = (e) => {
        e.preventDefault()
        const newItem = inputEl.current.value
        if (newItem === '') return

        let newRoutine = [...props.tempRoutine]
        newRoutine[props.index] = [...newRoutine[props.index], newItem]

        props.setTempRoutine(newRoutine)
        console.log(props.routine)
        setMedInput('')
    }

    const removeItem = item => {
        let newRoutine = [...props.tempRoutine]
        newRoutine[props.index] = newRoutine[props.index].filter(medication => medication !== item)
        props.setTempRoutine(newRoutine)
    }

    const searchWithEnterKey = (e) => {
        let code = (e.keyCode ? e.keyCode : e.which);
        if(code === 13) { //Enter keycode
            addItem();
        }
    }

    return (
        <article className={props.isProfileOpen ? "dailyRoutine" : ""}>
            <div className="routineDay">
                <h2>{props.dayOfWeek}</h2>
                <div className={props.isProfileOpen ? "medications medications-edit" : "medications"}>
                {
                    props.dailyRoutine.length > 0 &&
                    props.dailyRoutine.map((medication, i) => {
                        return (
                            props.isProfileOpen ?
                            <article className="med-container" key={`${props.dayOfWeek}${i}`}>
                                <button className="removeMedication" 
                                        onClick={() => removeItem(medication)}
                                >&times;</button>
                                <p>{medication}</p>
                            </article>
                            :
                            <article key={`${props.dayOfWeek}${i}`}>
                                <p>{medication}</p>
                            </article>
                        )
                    })
                }
                </div>
            </div>
            {
                props.isProfileOpen &&
                <form ref={formEl} className="editMedForm">
                    <button className="addMedButton"
                            type="submit"
                            onClick={addItem}
                    >
                    +
                    </button>
                    <input  ref={inputEl}
                            className="addMedInput"
                            onChange={handleMedInput}
                            onKeyPress={searchWithEnterKey}
                            type="text" 
                            placeholder="Enter medication"
                            id={`${props.dayOfWeek}routine`}
                            value={medInput}
                    />
                </form>
            }
            
        </article>
    )
}

export default Routine;