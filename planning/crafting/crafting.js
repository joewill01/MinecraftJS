const fs = require('fs');
const path = require('path');

let craftingGrid = [
  [" ", " ", " "],
  ['minecraft:white_wool','minecraft:white_wool','minecraft:white_wool'],
  [ '#minecraft:planks', '#minecraft:planks', '#minecraft:planks' ]
]
let recipes = getRecipes()
console.log(recipes)

function getRecipes() {
    const directoryPath = path.resolve('../../minecraft/recipe');
    let recipes = []
    try {
      const files = fs.readdirSync(directoryPath);
      files.forEach(file => {
          const filePath = path.join(directoryPath, file);
          
          if (fs.statSync(filePath).isFile()) {
              let content = fs.readFileSync(filePath, 'utf8');
              content = JSON.parse(content)
              if(content.type == 'minecraft:crafting_shaped'){
                recipes.push(content)
              }
          }
      });
      recipes = reformatAll(recipes);

      return recipes;
  } catch (error) {
      console.error('Error reading directory:', error);
      return [];
  }
}


function addItem(item, position){
    vertical = Math.floor(position/3)
    horizontal = position % 3
    craftingGrid[vertical][horizontal] = item
}

function reformatRecipe(recipe){
  let pattern = recipe.pattern
  let key = recipe.key
  let reformattedRecipe = pattern.map(item => [...item]);
  return reformattedRecipe.map(row => row.map(cell => key[cell]));
}

function reformatAll(unformattedRecipes){
  return unformattedRecipes.map(recipe => {
    let { key, ...newRecipe } = recipe;
    return { ...newRecipe, pattern: reformatRecipe(recipe) };
  });
}

function shapedCraft(craftingGrid, recipes){
  craftingGrid = craftingGrid.filter(row => JSON.stringify(row) !== JSON.stringify([" ", " ", " "]));
  filteredArray = recipes.find(obj => JSON.stringify(obj['pattern']) === JSON.stringify(craftingGrid));
  return filteredArray.result
}