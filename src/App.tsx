import React from 'react';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import Navigation from "./components/navigation/navigation.component.tsx";
import RecipesList from "./pages/recipes-list/recipes-list.component.tsx";
import Recipe from "./pages/recipe/recipe.component.tsx";

const ErrorPage: React.FC = () => {
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <p>The requested page does not exist.</p>
        </div>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Navigation />}
            errorElement={
                <Navigation>
                    <ErrorPage />
                </Navigation>
            }
        >
            <Route index path="/" element={<RecipesList/>} />
            <Route path="/recipe/:id" element={<Recipe/>} />
        </Route>,
    ),
);

const App= () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;
