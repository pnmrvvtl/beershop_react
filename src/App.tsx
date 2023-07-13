//libs
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
//components
import {Navigation} from "./components";
import {Error, Recipe, RecipesList} from "./pages";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Navigation/>}
            errorElement={
                <Navigation>
                    <Error/>
                </Navigation>
            }
        >
            <Route index path="/" element={<RecipesList/>}/>
            <Route path="/recipe/:id" element={<Recipe/>}/>
        </Route>,
    ),
);

const App = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;
