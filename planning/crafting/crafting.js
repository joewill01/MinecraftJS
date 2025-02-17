const fs = require('fs');
const path = require('path');

// let craftingGrid = [
//   [' ', ' ', ' '],
//   ['#minecraft:planks', '#minecraft:planks',' '],
//   ['#minecraft:planks', '#minecraft:planks',' '],
// ]

let craftingGrid = [
  ['#minecraft:planks', '#minecraft:planks',' '],
  ['#minecraft:planks', '#minecraft:planks',' '],
  [' ', ' ', ' '],
]

let recipes = getRecipes()
// console.log((recipes.shapeless)[0])
// console.log((recipes.shaped).length)

console.log(shapedCraft(craftingGrid, recipes.shaped))

function getRecipes() {
    const directoryPath = path.resolve('../../minecraft/recipe');
    let recipes = {shaped: [], shapeless: []}
    try {
      const files = fs.readdirSync(directoryPath);
      files.forEach(file => {
          const filePath = path.join(directoryPath, file);
          if (fs.statSync(filePath).isFile()) {
              let content = fs.readFileSync(filePath, 'utf8');
              content = JSON.parse(content)
              if(content.type == 'minecraft:crafting_shaped'){
                recipes.shaped.push(content)
              } else if (content.type == 'minecraft:crafting_shapeless'){
                recipes.shapeless.push(content)
              }
          }
      });
      recipes.shaped = reformatAll(recipes.shaped);

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

function reshapeGrid(craftingGrid){
  let rowsRemoved = trimRows(craftingGrid);
  return(trimColumns(rowsRemoved))

}

function trimRows(craftingGrid){
  return craftingGrid.filter((inner, index, arr) => {
    const isEmpty = inner.every(item => item.trim() === ""); // Check if an inner array is empty

    if (index === 1 && isEmpty) {
        // Keep the second array unless the first or last is empty
        return !(arr[0].every(item => item.trim() === "") || arr[2].every(item => item.trim() === ""));
    }
    
    return !isEmpty; // Remove if empty
  });
}

function trimColumns(craftingGrid){
  let emptyColumns = []  
  let columnEmpty;
  for (let column = 0; column < craftingGrid[0].length; column++) {
    columnEmpty = true;
    for (let row = 0; row < craftingGrid.length; row++) {
      if(craftingGrid[row][column] != ' '){
        columnEmpty = false;
      }   
    }
    if (columnEmpty == true){
      emptyColumns.push(column)
    }
  }
  emptyColumns = emptyColumns.sort((a,b)=>{return b-a})
  if (emptyColumns.length > 0 && emptyColumns != [1]){
    for (const column in emptyColumns) {
      for (let row = 0; row < craftingGrid.length; row++) {
        craftingGrid[row].splice(emptyColumns[column]) 
      }
    }
  }
  return (craftingGrid)
}

function shapedCraft(craftingGrid, recipes){
  craftingGrid = reshapeGrid(craftingGrid);
  filteredArray = recipes.find(obj => JSON.stringify(obj['pattern']) === JSON.stringify(craftingGrid));
  return filteredArray.result
}