//libs
import {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
//store
import {useBeerRecipesStore} from '../../store/store.ts';
//components
import {Container, Grid, Button, CircularProgress} from '@mui/material';
import {RecipeCard} from "../../components";
//types
import {Recipe} from '../../types/recipe-api.type.ts';


const DeleteButton = styled(Button)`
  position: fixed;
  background-color: rgba(55, 102, 78);
  width: 100px;
  height: 50px;
  opacity: 0.8;
  color: white;
  bottom: 0;
  right: 0;
  margin: 1rem;
  transition: background-color 0.3s ease;


  :hover {
    background-color: rgba(55, 80, 78);
  }
`;

const RecipesList = () => {
    const {
        fetchRecipes,
        addPage,
        deleteSelectedRecipes,
        updateSelectedRecipes,
        selectedRecipes,
        recipes,
    } = useBeerRecipesStore((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const [range, setRange] = useState<[number, number]>([0, 15]);
    const navigate = useNavigate();

    useEffect(() => {
        if (recipes.length < 15) {
            setIsLoading(true);
            fetchRecipes()
                .then(() => {
                    setIsLoading(false);
                    console.log('loading succeded');
                })
                .catch(() => {
                    setIsLoading(false);
                    console.log('error while loading data from api');
                });
        }
    }, [fetchRecipes, recipes.length]);

    useEffect(() => {
        const handleScroll = () => {
            const {scrollTop, clientHeight} = document.documentElement;
            if (scrollTop === 0) {
                setIsLoading(false);
                if (range[0] >= 5) {
                    setRange((prevRange) => [prevRange[0] - 5, prevRange[1] - 5]);
                    window.scrollTo(0, 10);
                } else if (range[0] > 0) {
                    setRange((prevRange) => [0, prevRange[1] - range[0]]);
                }
            } else if (scrollTop + clientHeight >= document.documentElement.scrollHeight) {
                if (recipes.length < range[1] + 5) {
                    addPage();
                    setIsLoading(true);
                    fetchRecipes()
                        .then(() => {
                            setIsLoading(false);
                            setRange((prevRange) => [prevRange[0] + 5, prevRange[1] + 5]);
                            console.log('loading succeeded');
                        })
                        .catch(() => {
                            setIsLoading(false);
                            console.log('error while loading data from api');
                        });
                } else {
                    setRange((prevRange) => [prevRange[0] + 5, prevRange[1] + 5]);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [range, recipes, addPage, fetchRecipes]);

    const handleRecipeSelection = useCallback((recipe: Recipe) => {
        navigate(`/recipe/${recipe.id}`);
    }, [navigate]);

    const handleDeleteSelected = useCallback(async () => {
        setIsLoading(true);
        try {
            await deleteSelectedRecipes();
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    }, [deleteSelectedRecipes]);

    const handleAddToSelected = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>, recipe: Recipe) => {
        event.preventDefault();
        if (selectedRecipes.includes(recipe)) {
            const newSelectedRecipes = selectedRecipes.filter((selectedRecipe) => selectedRecipe.id !== recipe.id);
            updateSelectedRecipes(newSelectedRecipes);
        } else {
            const newSelectedRecipes = [...selectedRecipes, recipe];
            updateSelectedRecipes(newSelectedRecipes);
        }
    }, [selectedRecipes]);

    return (
        <Container>
            {isLoading &&
                <CircularProgress
                    sx={{position: 'fixed', top: '50%', right: '50%'}}
                    color="success"
                />}
            {selectedRecipes.length > 0 && <DeleteButton onClick={handleDeleteSelected}>Delete</DeleteButton>}
            <Grid container spacing={2}>
                {recipes.slice(range[0], range[1]).map((recipe, idx) => (
                    <Grid item xs={2.4} sm={2.4} md={2.4} key={recipe.id}>
                        <RecipeCard
                            recipe={recipe}
                            idx={idx}
                            range={range}
                            selectedRecipes={selectedRecipes}
                            handleRecipeSelection={handleRecipeSelection}
                            handleAddToSelected={handleAddToSelected}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RecipesList;
