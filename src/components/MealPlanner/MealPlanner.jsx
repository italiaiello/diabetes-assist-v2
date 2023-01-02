import React, { useState } from 'react'
import SelectMeal from './SelectMeal'
import PlusSign from '../../images/plus_sign.svg'
import HomeButton from '../../images/Home.svg'
import ErrorIcon from '../../images/Error.svg'

const MealPlanner = props => {

    let recipeData = props.recipeData

    const [index, setIndex] = useState(0)
    const [slicedRecipeData, setSlicedRecipeData] = useState([])
    const [validSelection, setValidSelection] = useState(true)
    const [validText, setValidText] = useState("")
    const [breakfastMeals, setBreakfastMeals] = useState({
        "title": "",
        "image": ""
    })
    const [lunchMeals, setLunchMeals] = useState({
        "title": "",
        "image": ""
    })
    const [dinnerMeals, setDinnerMeals] = useState({
        "title": "",
        "image": ""
    })
    console.log(breakfastMeals)
    console.log(lunchMeals)
    console.log(dinnerMeals)

    const onMealTimeSelect = (e) => {
        setValidSelection(true)
        setValidText("")
        handleClick(e)
        props.onRouteChange('mealSelect')
    }

    const handleClick = (e) => {
        setIndex(e.target.dataset.index)
        console.log(e.target.dataset.index)
        switch(e.target.dataset.index) {
            case "0":
                setSlicedRecipeData(recipeData.slice(0, 3))
                break;
            case "1":
                setSlicedRecipeData(recipeData.slice(3, 6))
                break;
            case "2":
                setSlicedRecipeData(recipeData.slice(6, 9))
                break;
            default:
                return;
        }
    }

    const onSubmitMealSelection = () => {
        if (breakfastMeals.title === "" || lunchMeals.title === "" || dinnerMeals.title === "") {
            setValidSelection(false)
            setValidText("You still have meal(s) to select")
            return;
        }

        fetch('https://floating-waters-62169.herokuapp.com/plan-meals', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: props.userEmail,
                breakfast: breakfastMeals.title,
                lunch: lunchMeals.title,
                dinner: dinnerMeals.title
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
        <div>
        {
            !recipeData.length ?
            <h1>Loading</h1>
            :
            (
                props.route === 'mealSelect' || props.route === 'recipe' ?
                <SelectMeal index={index}
                                slicedRecipeData={slicedRecipeData} 
                                    setBreakfastMeals={setBreakfastMeals} 
                                        setLunchMeals={setLunchMeals}
                                            setDinnerMeals={setDinnerMeals} 
                                                onRouteChange={props.onRouteChange}
                                                    route={props.route}
                />
                :
                <div className="pageDisplay">
                    <div className="backAndHeading">
                        <div className="sectionHeading">
                            <div className="back">
                                <div className="leftArrow" onClick={() => props.onRouteChange('home')}></div>
                                <p>Back</p>
                            </div>
                            <h1>Meal Planner</h1>
                        </div>
                    </div>
                    <h2>Choose Your Meals</h2>
                    <section>
                        <article id="breakfast" className="chooseMealHome" onClick={onMealTimeSelect} data-index="0">
                            <figure data-index="0">
                                {
                                    breakfastMeals.image.length === 0 ?
                                    <img src={PlusSign} alt="Plus sign" />
                                    :
                                    <img data-index="0" className="selectedMealImage" src={`https://spoonacular.com/recipeImages/${breakfastMeals.image}`} alt={breakfastMeals.title} />
                                }
                            </figure>
                            <div data-index="0">
                                <p>Breakfast</p>
                            </div>
                        </article>
                        <article id="lunch" className="chooseMealHome" onClick={onMealTimeSelect} data-index="1">
                            <figure data-index="1">
                                {
                                    lunchMeals.image.length === 0 ?
                                    <img src={PlusSign} alt="Plus sign" />
                                    :
                                    <img data-index="1" className="selectedMealImage" src={`https://spoonacular.com/recipeImages/${lunchMeals.image}`} alt={lunchMeals.title} />
                                }
                            </figure>
                            <div data-index="1">
                                <p>Lunch</p>
                            </div>
                        </article>
                        <article id="dinner" className="chooseMealHome" onClick={onMealTimeSelect} data-index="2">
                            <figure data-index="2">
                                {
                                    dinnerMeals.image.length === 0 ?
                                    
                                    <img src={PlusSign} alt="Plus sign" />
                                    :
                                    <img data-index="2" className="selectedMealImage" src={`https://spoonacular.com/recipeImages/${dinnerMeals.image}`} alt={dinnerMeals.title} />
                                }
                            </figure>
                            <div data-index="2">
                                <p>Dinner</p>
                            </div>
                        </article>
                    </section>
                    <div className={!validSelection ? 'formError show' : 'hide'}>
                        <figure className="errorIcon">
                            <img src={ErrorIcon} alt="Error symbol" />
                        </figure>
                        <p>{validText}</p>
                    </div>
                    <button className="done" onClick={onSubmitMealSelection}>Done</button>
                    <figure className="homeButton">
                        <img src={HomeButton} alt="Home button" onClick={() => props.onRouteChange('home')} />
                    </figure>
                </div>
            )
        }
        </div>
            
            
    )
}

export default MealPlanner