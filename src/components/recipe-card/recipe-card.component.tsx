import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';
import {Recipe} from "../../types/recipe-api.type.ts";

interface RecipeCardProps {
    recipe: Recipe;
    idx: number;
    range: [number, number];
    selectedRecipes: Recipe[];
    handleRecipeSelection: (recipe: Recipe) => void;
    handleAddToSelected: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, recipe: Recipe) => void;
}

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

const RecipeCard: React.FC<RecipeCardProps> = ({
                                                   recipe,
                                                   idx,
                                                   range,
                                                   selectedRecipes,
                                                   handleRecipeSelection,
                                                   handleAddToSelected
                                               }) => {
    return (
        <CardWrapper
            onClick={() => handleRecipeSelection(recipe)}
            style={{ backgroundColor: selectedRecipes.includes(recipe) ? 'lightgrey' : 'white' }}
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
                <CardImage src={recipe.image_url} alt={recipe.name} />
                <Typography variant="h6" sx={{ height: '5rem', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {`${idx + 1 + range[0]}. ` + recipe.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ height: '2rem', overflow: 'hidden' }}>
                    {recipe.tagline}
                </Typography>
            </CardContainer>
        </CardWrapper>
    );
};

export default RecipeCard;
