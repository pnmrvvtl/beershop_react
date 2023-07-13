import { useParams } from 'react-router-dom';
import { useStore } from '../../store/store.ts'
import { Container, Typography, Button } from '@mui/material';
import {StoreState} from "../../store/store.ts";

const Recipe = () => {
    const { id } = useParams();
    const recipes = useStore((state: StoreState) => state.recipes);

    const recipe = id ? recipes.find((r) => r.id === parseInt(id)) : null;

    const handleGoBack = () => {
        console.log('go back')
    };

    if (!recipe) {
        return (
            <Container>
                <Typography variant="h6">Recipe not found</Typography>
                <Button variant="contained" onClick={handleGoBack}>
                    Go Back
                </Button>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4">{recipe.name}</Typography>
            <Typography variant="subtitle1">{recipe.tagline}</Typography>
            <Button variant="contained" onClick={handleGoBack}>
                Go Back
            </Button>
        </Container>
    );
};

export default Recipe;
