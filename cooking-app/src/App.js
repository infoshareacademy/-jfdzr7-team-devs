import { db } from './api/firebase';
import './App.css';
import { AddRecipe } from './components/AddRecipe';
import { DisplayRecipes } from './components/DisplayRecipes';

export const App = () => {
  return (
    <div className="App">
      <h1>Cześć wszystkim!</h1>
      {/* <RecipeForm /> */}





      <AddRecipe />
      <DisplayRecipes />
    </div>
  );
}


