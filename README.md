1. Technologies: 
* react.js 
*  zustand (https://github.com/pmndrs/zustand) 

2. Resources: 
*  https://api.punkapi.com/v2/beers?page=n 

3. Task description: 
You will need to create an app that should display a list of beer recipes. Users should be able to scroll through a list of recipes and to view a single recipe. 

4. Detailed explanation: 
*  Get a list of recipes on initial load, save them in the zustand store 
(https://api.punkapi.com/v2/beers?page=1) 
* The amount of recipes rendered should always be 15 
* Implement multiple selection of recipes. User can select multiple recipes by clicking on recipes with the mouse right button. If user selected at least one recipe, the "Delete" button should appear somewhere. 
* If the user clicks the "Delete" button, selected items should be removed from rendered list (but still 15 recipes should be rendered). 
* Users can deselect recipe if item is clicked one more time. 
* Users can go to a single recipe page by clicking on recipe card with mouse left button. ? If there is no more recipes to show, you should make another API request to get another 25 recipes. 

5. Additional options: 
* Only 5 recipes should be visible on a current screen. 
* The amount of recipes rendered should always be 15. 
* Implement lazy scroll functionality. If the user will scroll to the bottom of the list, the first 5 recipes should be removed from render and next 5 should be added. This way user will be able to see 5 new recipes but the rendered amount will always be 15.