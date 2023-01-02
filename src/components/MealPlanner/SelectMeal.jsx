import React, { useState, useRef } from 'react';
import Recipe from './Recipe'
import HomeButton from '../../images/Home.svg';

const SelectMeal = props => {

    console.log('selectMeal', props.route)

    console.log(props.index)
    console.log(props.slicedRecipeData)

    const mealImage = useRef()

    const headingArray = ["Breakfast", "Lunch", "Dinner"];
    const [counter, setCounter] = useState(0)
    const [showOptions, setShowOptions] = useState(false)
    const [image, setImage] = useState(`https://spoonacular.com/recipeImages/${props.slicedRecipeData[counter].image}`)

    const changeImage = (index) => {
        setImage(`https://spoonacular.com/recipeImages/${props.slicedRecipeData[index].image}`)
    }

    
    const changeMeal = (prevOrNext) => {
        if (prevOrNext === 'next') {
            if (counter === 2) {
                setCounter(0)
                changeImage(0)
            } else {
                setCounter(counter + 1)
                changeImage(counter + 1)
            }
        } else if (prevOrNext === 'prev') {
            if (counter === 0) {
                setCounter(2)
                changeImage(2)
            } else {
                setCounter(counter - 1)
                changeImage(counter - 1)
            }
        }

        return counter
    }

    const toggleOptions = () => {
        setShowOptions(!showOptions)
    }

    const onSeeRecipe = () => {
        console.log('Clicked')
        props.onRouteChange('recipe')
    }

    const onMealSelect = () => {
        switch(props.index) {
            case "0":
                props.setBreakfastMeals({
                    "title":`${props.slicedRecipeData[counter].title}`,
                    "image":`${props.slicedRecipeData[counter].image}`
                })
                break;
            case "1":
                props.setLunchMeals({
                    "title":`${props.slicedRecipeData[counter].title}`,
                    "image":`${props.slicedRecipeData[counter].image}`
                })
                break;
            case "2":
                props.setDinnerMeals({
                    "title":`${props.slicedRecipeData[counter].title}`,
                    "image":`${props.slicedRecipeData[counter].image}`
                })
                break;
            default:
                return;
        }

        props.onRouteChange('meal')
    }

    return (
        props.route === 'recipe' ?
        <Recipe counter={counter} slicedRecipeData={props.slicedRecipeData} onRouteChange={props.onRouteChange} />
        :
        <div className="pageDisplay">
            <div className="backAndHeading">
                <div className="sectionHeading">
                    <div className="back">
                        <div className="leftArrow" onClick={() => props.onRouteChange('meal')}></div>
                        <p>Back</p>
                    </div>
                    <h1>{headingArray[props.index]}</h1>
                </div>
            </div>
            <nav className="filter">
                <button className="active">All</button>
                <button>Favourites</button>
                <button>New</button>
                <button>Recommended</button>
            </nav>
            <article className="availableMeals">
                <div className="leftArrow" onClick={() => changeMeal('prev')}></div>
                <article ref={mealImage} className="foodCard" >
                    <figure className="mealImage" onClick={onMealSelect}>
                        <img src={image} alt={props.slicedRecipeData[counter].image} />
                    </figure>
                    <div className={!showOptions ? "foodName" : "foodName showOptions"}>
                        <div className={showOptions ? "arrow-down" : "arrow-up"} onClick={toggleOptions}></div>
                        <p>{props.slicedRecipeData[counter].title}</p>
                        <div className={showOptions ? "mealInfo show" : "hide"}>
                            <h3>Meal Information</h3>
                            <p>{`Ready in: ${props.slicedRecipeData[counter].readyInMinutes} mins
                                | Servings: ${props.slicedRecipeData[counter].servings}`}                              
                            </p>
                            <button className="seeRecipe" onClick={onSeeRecipe}>See Recipe</button>
                        </div>
                    </div>
                </article>
                <div className="rightArrow" onClick={() => changeMeal('next')}></div>
            </article>
            <figure className="homeButton">
                <img src={HomeButton} alt="Home button" onClick={() => props.onRouteChange('home')}/>
            </figure>
        </div>
    )

}

export default SelectMeal