import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Gado-gado',
      imageUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/gado-gado-salad.jpg?itok=MTTSriC8',
      ingredients: ['Lontong', 'Sawi', 'Bumbu Kecap', 'Tauge']
    },
    {
      id: 'r2',
      title: 'Ketupat',
      imageUrl: 'https://static.tokopedia.net/blog/wp-content/uploads/2019/03/9.-Ketupat.jpg',
      ingredients: ['Nasi', 'Daun Kelapa']
    },
    {
      id: 'r3',
      title: 'Pizza Margerita',
      imageUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--2043_12.jpg?itok=1wgdjG_t',
      ingredients: ['Tepung', 'Toping']
    },
  ]
  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string){
    return this.recipes.find( recipe => recipe.id == recipeId);
  }

  deleteRecipe(recipeId: string){
    this.recipes = this.recipes.filter( recipe => {
      return recipe.id !== recipeId
    });
  }
}
