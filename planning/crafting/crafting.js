testRecipes = {
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
}

let craftingGrid = [[" "," "," "],[" "," "," "],[" "," "," "]]
reformatRecipe(testRecipes)

function addItem(item, position){
    vertical = Math.floor(position/3)
    horizontal = position % 3
    craftingGrid[vertical][horizontal] = item
}


function reformatRecipe(recipe){
    let pattern = recipe['pattern']
    let reformattedRecipe = pattern.map(item => [...item]);
    let key = recipe['key']
    for (let i = 0; i < reformattedRecipe.length; i++) {
        let row = reformattedRecipe[i]
        for (let j = 0; j < row.length; j++) {
            reformattedRecipe[i][j] = key[reformattedRecipe[i][j]]
            
        }
        
    }


    console.log(reformattedRecipe)
}