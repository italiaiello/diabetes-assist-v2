import { useState, useEffect } from 'react'

export const useRecipeFetch = (url, dependencies) => {

    const [isLoading, setIsLoading] = useState(false)
    const [recipeData, setRecipeData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        if (dependencies === false) {
            setIsLoading(false)
            return;
        }
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setIsLoading(false)
            setRecipeData(data)
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false)
            setRecipeData('Not found')
        })
    }, [url])

    return [isLoading, recipeData]

}