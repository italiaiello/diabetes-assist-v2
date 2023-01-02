import { useState, useEffect } from 'react';

export const useDataFetch = (url, dependencies) => {

    const [isLoading, setIsLoading] = useState(false);
    const [recipeData, setRecipeData] = useState([]);


    useEffect(() => {
        setIsLoading(true);

        if (dependencies === false) {
            setIsLoading(false);
            return;
        }

        console.log('Fetching recipe data...');
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then (data => {
            setIsLoading(false);
            setRecipeData(data.results);
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false);
            setRecipeData('Not found');
        })

    }, [url])

    return [isLoading, recipeData];

}