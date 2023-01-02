import React from 'react'
import Phone from '../../images/ringing_phone.svg'

const Emergency = props => {
    return (
        <article className="pageDisplay">
            <div className="backAndHeading">
                    <div className="sectionHeading">
                        <div className="back">
                            <div className="leftArrow" onClick={() => props.onRouteChange('home')}></div>
                            <p>Back</p>
                        </div>
                        <h1>Emergency</h1>
                    </div>
                </div>
            <figure id="phone">
                <img src={Phone} alt="Phone ringing" />
            </figure>
            <p id="calling">Calling "<span>000</span>" For You...</p>
            <button id="cancelCall" onClick={() => props.onRouteChange('home')}>Cancel</button>
        </article>
    )
}

export default Emergency