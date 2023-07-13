import { useNavigate, useParams } from 'react-router-dom';
import { useBeerRecipesStore } from '../../store/store.ts';
import {Container, Typography, Button} from '@mui/material';
import { StoreState } from "../../store/store.ts";
import { Recipe as RecipeType } from "../../types/recipe-api.type.ts";
import styled from "styled-components";
import {useEffect} from "react";
const Recipe = () => {
    const { id } = useParams();
    const recipes = useBeerRecipesStore((state: StoreState) => state.recipes);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id]);

    const recipe: RecipeType | null = id ? recipes.find((r) => r.id === parseInt(id)) || null : null;

    const handleGoBack = () => {
        navigate(-1);
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

    const renderFoodPairing = () => {
        return (
            <>
                <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                    Food Pairing:
                </Typography>
                <ul style={{ marginBottom: '1rem', paddingLeft: '1.2rem' }}>
                    {recipe.food_pairing.map((pairing, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>
                            {pairing}
                        </li>
                    ))}
                </ul>
            </>
        );
    };

    const BackButton = styled(Button)`
      background-color: #37664E;
      color: white;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #37504E;
      }
    `;

    return (
        <Container sx={{padding: '20px'}}>
            <BackButton onClick={handleGoBack}>
                Go Back
            </BackButton>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>
                {recipe.name}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: '0.5rem' }}>
                {recipe.tagline}
            </Typography>
            <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                First Brewed: {recipe.first_brewed}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                {recipe.description}
            </Typography>
            <img
                src={recipe.image_url}
                alt={recipe.name}
                style={{ height: '400px', margin: '1rem auto' }}
            />
            <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                ABV: {recipe.abv}%
            </Typography>
            {recipe.ibu && (
                <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                    IBU: {recipe.ibu}
                </Typography>
            )}
            <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                Target FG: {recipe.target_fg}
            </Typography>
            <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                Target OG: {recipe.target_og}
            </Typography>
            {recipe.ebc && (
                <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                    EBC: {recipe.ebc}
                </Typography>
            )}
            {recipe.srm && (
                <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                    SRM: {recipe.srm}
                </Typography>
            )}
            {recipe.ph && (
                <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                    pH: {recipe.ph}
                </Typography>
            )}
            <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                Attenuation Level: {recipe.attenuation_level}
            </Typography>
            <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                Volume: {recipe.volume.value} {recipe.volume.unit}
            </Typography>
            <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                Boil Volume: {recipe.boil_volume.value} {recipe.boil_volume.unit}
            </Typography>
            {renderFoodPairing()}
            <Typography variant="subtitle2" style={{ marginBottom: '0.5rem' }}>
                Brewer's Tips: {recipe.brewers_tips}
            </Typography>
            <Typography variant="subtitle2" style={{ marginBottom: '1rem' }}>
                Contributed By: {recipe.contributed_by}
            </Typography>
        </Container>
    );
};

export default Recipe;
