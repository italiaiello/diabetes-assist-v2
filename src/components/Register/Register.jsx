import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, database } from '../../firebase'
import { ref, set } from "firebase/database";
import Logo from '../../images/DA_logo.svg'
import ErrorIcon from '../../images/Error.svg'

const Register = props => {

    const [userName, setUserName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('nothing')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [diagnosis, setDiagnosis] = useState('nothing')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const [counter, setCounter] = useState(0)
    const [step, setStep] = useState('Step 1')
    const [isValid, setIsValid] = useState(true);
    const [isInfoValidText, setIsInfoValidText] = useState('')

    const [isRegistering, setIsRegistering] = useState(false)

    const infoIsValid = () => {
        if (counter === 0) {
            if (userName.length === 0 || email.length === 0 || age.length === 0 || gender === "nothing") {
                setIsValid(false)
                setIsInfoValidText('Please fill in each field')
                return false
            } else {
                setIsValid(true)
                return true
            }
        } else if (counter === 1) {
            if (weight.length === 0 || height.length === 0 || diagnosis === "nothing") {
                setIsValid(false)
                setIsInfoValidText('Please fill in each field')
                return false
            } else {
                setIsValid(true)
                return true
            }
        }
    }

    const passwordDoesMatch = () => {
        if (password === confirmedPassword) {
            setIsValid(true)
            setIsInfoValidText('Passwords match')
            return true
        } else {
            setIsValid(false)
            setIsInfoValidText('Passwords must match!')
            return false;
        }
    }
    
    const changeText = () => {
        if (!infoIsValid()) {
            return 'Form incorrectly filled'
        }

        if (counter === 2) {
            setCounter(0)
            setStep('Step 1')
        } else {
            setCounter(counter + 1)
            setStep(`Step ${counter + 2}`)
            console.log(counter)
        }
    }

    const onNameChange = e => { setUserName(e.target.value) }
    const onAgeChange = e => { setAge(e.target.value) }
    const onGenderChange = e => { setGender(e.target.value) }
    const onWeightChange = e => { setWeight(e.target.value) }
    const onHeightChange = e => { setHeight(e.target.value) }
    const onDiagnosisChange = e => { setDiagnosis(e.target.value) }
    const onEmailChange = e => { setEmail(e.target.value) }
    const onPasswordChange = e => { setPassword(e.target.value) }
    const onConfirmedPasswordChange = e => { setConfirmedPassword(e.target.value) }

    const onSubmitRegister = (e) => {
        e.preventDefault()
        setIsRegistering(true)
        if (!passwordDoesMatch()) {
            return 'Passwords must match'
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.sessionStorage.setItem("userId", user.uid)
            writeUserData(user.uid, userName, age, gender, weight, height, diagnosis)
            props.loadUser({ name: userName, age: age, gender: gender, weight: weight, height: height, diagnosis: diagnosis })
            setIsRegistering(false)
            props.onRouteChange('home')
        })
        .catch((error) => {
            console.log(error.message)
            setIsRegistering(false)
        });
    }

    const writeUserData = (userId, name, age, gender, weight, height, diagnosis) => {
        set(ref(database, 'users/' + userId), {
            name: name,
            age: age,
            gender: gender,
            weight: weight,
            height: height,
            diagnosis: diagnosis
        })
    }

    return (
        <article id="register">
            <figure className="logo">
                <img src={Logo} alt="Diabetes Assist Logo" />
            </figure>
            <h2>{step}</h2>
            <form className="form">
                <div id="firstStep" className={counter === 0 ? 'show' : 'hide'}>
                    <input className="inputField" type="text" placeholder="Name" onChange={onNameChange}/>
                    <input className="inputField" type="email" placeholder="Email" onChange={onEmailChange}/>
                    <input className="inputField" type="text" placeholder="Age" onChange={onAgeChange} />
                    <div className="dropdownWrapper">
                        <select className="dropdown" name="Gender" onChange={onGenderChange} >
                            <option value="nothing">Please select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Rather not say">Rather not say</option>
                        </select>
                    </div>
                </div>
                <div id="secondStep" className={counter === 1 ? 'show' : 'hide'}>
                    <input className="inputField" type="text" placeholder="Weight" onChange={onWeightChange} />
                    <input className="inputField" type="text" placeholder="Height" onChange={onHeightChange} />
                    <div className="dropdownWrapper">
                        <select className="dropdown" name="Diagnosis" onChange={onDiagnosisChange} >
                            <option value="nothing">Please select your diagnosis</option>
                            <option value="Type 1 Diabetes">Type 1 Diabetes</option>
                            <option value="Type 2 Diabetes">Type 2 Diabetes</option>
                        </select>
                    </div>
                </div>
                <div id="thirdStep" className={counter === 2 ? 'show' : 'hide'}>
                    <input className="inputField" type="password" placeholder="Password" onChange={onPasswordChange} />
                    <input className="inputField" type="password" placeholder="Confirm password" onChange={onConfirmedPasswordChange} />
                </div>
                <div className={!isValid ? 'formError show' : 'hide'}>
                    <figure className="errorIcon">
                        <img src={ErrorIcon} alt="Error symbol" />
                    </figure>
                    <p>{isInfoValidText}</p>
                </div>
                <button className={counter < 2 ? 'formButton show' : 'formButton hide'} onClick={changeText} type="button">Next Step</button>
                <button className={counter === 2 ? 'formButton show' : 'formButton hide'} type="submit" onClick={onSubmitRegister} >Register</button>
                <p>Already have an account?
                    <br/><br/>
                    <span className="alternateFormLink" onClick={() => props.onRouteChange('signin')}>Sign In</span>
                </p>
            </form>
            <div className={isRegistering ? "show submitFormPopUp" : "hide submitFormPopUp"}>
                <p>Registering...</p>
            </div>
        </article>
    )
}

export default Register