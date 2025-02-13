testRecipes = [{
  "type": "minecraft:crafting_shaped",
  "category": "misc",
  "group": "bed",
  "key": {
    "#": "minecraft:white_wool",
    "X": "#minecraft:planks"
  },
  "pattern": [
    "###",
    "XXX"
  ],
  "result": {
    "count": 1,
    "id": "minecraft:white_bed"
  }
},
{
  "type": "minecraft:crafting_shaped",
  "category": "misc",
  "group": "wooden_fence",
  "key": {
    "#": "minecraft:stick",
    "W": "minecraft:acacia_planks"
  },
  "pattern": [
    "W#W",
    "W#W"
  ],
  "result": {
    "count": 3,
    "id": "minecraft:acacia_fence"
  }
}]
let reformattedRecipes = reformatAll(testRecipes)
// let craftingGrid = [[" "," "," "],[" ","x"," "],[" ","p"," "]]
let craftingGrid = [
  [" ", " ", " "],
  ['minecraft:white_wool','minecraft:white_wool','minecraft:white_wool'],
  [ '#minecraft:planks', '#minecraft:planks', '#minecraft:planks' ]
]
console.log(shapedCraft(craftingGrid, reformattedRecipes))

function addItem(item, position){
    vertical = Math.floor(position/3)
    horizontal = position % 3
    craftingGrid[vertical][horizontal] = item
}

function reformatRecipe(recipe){
    let pattern = recipe['pattern']
    let key = recipe['key']
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