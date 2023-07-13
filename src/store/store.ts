//libs
import {create} from 'zustand';
//types
import {Recipe} from '../types/recipe-api.type';

export interface StoreState {
    recipes: Recipe[];
    selectedRecipes: Recipe[];
    fetchRecipes: () => Promise<void>;
    deleteSelectedRecipes: () => Promise<void>;
    currentPage: number;
    addPage: () => void;
    updateSelectedRecipes: (recipes: Recipe[]) => void;
}

const MIN_PER_RENDER = 15;

export const useBeerRecipesStore = create<StoreState>((set, getState) => ({
    recipes: [],
    selectedRecipes: [],
    currentPage: 1,
    addPage: () => {
        set((state) => ({currentPage: state.currentPage + 1}));
    },
    updateSelectedRecipes: (recipes) => {
        set({selectedRecipes: recipes});
    },
    fetchRecipes: async () => {
        try {
            const {currentPage} = getState();
            const response = await fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}`);
            const data = await response.json() as Recipe[];
            set((state) => ({recipes: [...state.recipes, ...data]})); // Append new recipes to existing ones
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
        }
    },
    deleteSelectedRecipes: async () => {
        const {recipes, selectedRecipes} = getState();
        const filteredRecipes = recipes.filter((recipe) => !selectedRecipes.includes(recipe));
        set({selectedRecipes: []});
        if (filteredRecipes.length < MIN_PER_RENDER) {
            set({recipes: filteredRecipes});
            set((state) => ({currentPage: state.currentPage + 1})); // Increment the current page
            await getState().fetchRecipes(); // Fetch the next page of recipes
        } else {
            set({recipes: filteredRecipes});
        }
    },
}));
