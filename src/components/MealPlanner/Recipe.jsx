import React from 'react'
import { useRecipeFetch } from '../../hooks/DisplayMealRecipe'

const Recipe = props => {

    console.log(props.slicedRecipeData[props.counter])

    const id = props.slicedRecipeData[props.counter].id

    const [isLoading, recipeData] = useRecipeFetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=d464b770a6c2452cb7d56fc6ccea9eb5`, id)

    console.log(recipeData)

    return (
        isLoading || !recipeData.length ?
        <h1>Fetching Recipe...</h1>
        :
        
        <article className="pageDisplay">
            <div className="backAndHeading">
                <div className="sectionHeading">
                    <div className="back">
                        <div className="leftArrow" onClick={() => props.onRouteChange('meal')}></div>
                        <p>Back</p>
                    </div>
                    <h1>{props.slicedRecipeData[props.counter].title}</h1>
                </div>
            </div>
            <article id="recipeSection">
                <article id="mealImage">
                    <figure>
                        <img src={`https://spoonacular.com/recipeImages/${props.slicedRecipeData[props.counter].image}`} alt={props.slicedRecipeData[props.counter].title} />
                    </figure>
                    <button id="sendButton">Send ingredients list and recipe to your phone</button>
                </article>
                <article id="recipeInfoContainer">
                    <h3>Recipe</h3>
                    <article className="recipeInfo">
                        
                        {
                            recipeData[0].steps.map((step, i) => {
                                return (
                                    <article key={i} className="step">
                                        <p className="stepNumber">{`${step.number}.`}</p>
                                        <p className="stepDesc">{step.step}</p>
                                    </article>
                                    
                                )
                            })
                        }
                    </article>
                </article>
            </article>
        </article>
    )
}

export default Recipe