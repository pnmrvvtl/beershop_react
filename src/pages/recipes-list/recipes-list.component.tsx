import {useEffect, useState} from 'react';
import {useStore} from '../../store/store.ts';
import {Container, Grid, Button, Card, CardContent, Typography} from '@mui/material';
import {Recipe} from '../../types/recipe-api.type.ts';
import styled from 'styled-components';


const DeleteButton = styled(Button)`&& {
      position: fixed;
      background-color: rgba(55, 102, 78);
      width: 100px;
      height: 50px;
      opacity: 0.8;
      color: white;
      bottom: 0;
      right: 0;
      margin: 1rem;
    }

      &&:hover {
        background-color: rgba(55, 80, 78);
        color: white;
      }
    `;

const CardImage = styled.img`
      width: 100%;
      height: auto;
      max-height: 55vh;
      object-fit: contain;
    `;

const CardContainer = styled(CardContent)`
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      height: 100%;
    `;

const CardWrapper = styled(Card)`
      display: flex;
      flex-direction: column;
      height: 83vh;
    `;

const RecipesList = () => {
    const fetchRecipes = useStore((state) => state.fetchRecipes);
    const recipes = useStore((state) => state.recipes);
    const addPage = useStore((state) => state.addPage);
    const selectedRecipes = useStore((state) => state.selectedRecipes);
    const deleteSelectedRecipes = useStore((state) => state.deleteSelectedRecipes);
    const [isLoading, setIsLoading] = useState(false);
    const [range, setRange] = useState<[number, number]>([0, 15]);


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
    }, [fetchRecipes]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                if (recipes.length < range[1] + 5) {
                    addPage();
                    fetchRecipes()
                        .then(() => {
                            setRange((prevRange) => [prevRange[0] + 5, prevRange[1] + 5]);
                            console.log('loading succeded');
                        })
                        .catch(() => {
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
    }, []);

    const handleRecipeSelection = (recipe: Recipe) => {
        console.log(recipe);
    };

    const handleDeleteSelected = async () => {
        setIsLoading(true);
        try {
            await deleteSelectedRecipes();
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    const handleAddToSelected = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, recipe: Recipe) => {
        event.preventDefault();
        if (selectedRecipes.includes(recipe)) {
            const newSelectedRecipes = selectedRecipes.filter((selectedRecipe) => selectedRecipe.id !== recipe.id);
            useStore.setState({selectedRecipes: newSelectedRecipes});
        } else {
            const newSelectedRecipes = [...selectedRecipes, recipe];
            useStore.setState({selectedRecipes: newSelectedRecipes});
        }
    };

    return (
        isLoading ? <div>Loading...</div> :
            <Container

            >
                {selectedRecipes.length > 0 && <DeleteButton onClick={handleDeleteSelected}>Delete</DeleteButton>}
                <Grid container spacing={2}>
                    {recipes.slice(range[0], range[1]).map((recipe, idx) => (
                        <Grid item xs={2.4} sm={2.4} md={2.4} key={recipe.id}>
                            <CardWrapper
                                onClick={() => handleRecipeSelection(recipe)}
                                style={{backgroundColor: selectedRecipes.includes(recipe) ? 'lightgrey' : 'white'}}
                                onContextMenu={(event) => handleAddToSelected(event, recipe)}
                                sx={{
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Customize the box shadow here
                                    transition: 'box-shadow 0.3s ease', // Add transition for smooth hover effect
                                    margin: '1rem 0',
                                    '&:hover': {
                                        boxShadow: '0px 0px 20px rgba(55, 102, 78)', // Customize the box shadow on hover
                                    },
                                }}
                            >
                                <CardContainer>
                                    <CardImage src={recipe.image_url} alt={recipe.name}/>
                                    <Typography variant="h6"
                                                sx={{height: '5rem', overflow:'hidden', display: 'flex'
                                                , justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        {`${idx + 1 + range[0]}. `+recipe.name}
                                    </Typography>
                                    <Typography variant="subtitle1"
                                                sx={{height: '2rem', overflow:'hidden'}}>
                                        {recipe.tagline}
                                    </Typography>
                                </CardContainer>
                            </CardWrapper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
    );
};

export default RecipesList;
