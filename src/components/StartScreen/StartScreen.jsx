import React from 'react'
import Logo from '../../images/DA_logo.svg'

const StartScreen = props => {
    return (
        <article id="startScreen">
            <figure id="startScreenLogo">
                <img src={Logo} alt="Diabetes Assist Logo" />
                <p>DiabetesAssist</p>
            </figure>
            <button className="formButton" onClick={() => props.onRouteChange('signin')}>Get Started</button>
        </article>
    )
}

export default StartScreen