class Crafting {
    constructor(){
        this.craftingGrid = [
            [' ',' ', ' '],
            [' ',' ', ' '],
            [' ', ' ', ' ']
        ];
        this.recipes = this.reformatAll(this.getRecipes());
        console.log(this.recipes)
    }

    getRecipes(){
        const directoryPath = 'minecraft/recipe/torch.json';
        const request = new XMLHttpRequest();
        let recipes = [];
        request.open("GET", directoryPath, false); // Synchronous request
        request.send(null);
        if (request.status === 200) {
            recipes.push(JSON.parse(request.responseText));
        }
        return recipes
    }

    reformatRecipe(recipe){
        let pattern = recipe.pattern
        let key = recipe.key
        let reformattedRecipe = pattern.map(item => [...item]);
        return reformattedRecipe.map(row => row.map(cell => key[cell]));
    }

    reformatAll(unformattedRecipes){
        return unformattedRecipes.map(recipe => {
          let { key, ...newRecipe } = recipe;
          return { ...newRecipe, pattern: this.reformatRecipe(recipe) };
        });
    }

    reshapeGrid(craftingGrid){
        let rowsRemoved = this.trimRows(craftingGrid);
        console.log(rowsRemoved)
        return(this.trimColumns(rowsRemoved))
    }
      
    trimRows(craftingGrid){
        return craftingGrid.filter((inner, index, arr) => {
            const isEmpty = inner.every(item => item.trim() === ""); // Check if an inner array is empty
            if (index === 1 && isEmpty) {
                // Keep the second array unless the first or last is empty
                return !(arr[0].every(item => item.trim() === "") || arr[2].every(item => item.trim() === ""));
            }
            return !isEmpty; // Remove if empty
        });
    }
      
    trimColumns(craftingGrid){
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
                    if(emptyColumns[column] == 0){
                        craftingGrid[row].shift();
                    } else{
                        craftingGrid[row].splice(emptyColumns[column]) 
                    }
                }
            }
        }
        return (craftingGrid)
    }
      
    shapedCraft(){
        let reshapedGrid = this.reshapeGrid(this.craftingGrid);
        console.log(reshapedGrid)
        let filteredArray = this.recipes.find(obj => JSON.stringify(obj['pattern']) === JSON.stringify(reshapedGrid));
        if (filteredArray){
            return filteredArray.result
        }
    }
}