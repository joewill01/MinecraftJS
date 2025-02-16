class OakSapling extends Block{
	constructor(x,y,z,ctex){
		super(x,y,z,ctex);

		this.ID = 36;
		this.name = "oak_sapling"
		this.displayName = "Oak Sapling"

		this.droppedItemId = 52;
        this.opacity = 0;
		this.hasTransparentFaces = true;
		this.solid=false;

		this.hitbox = false;
	}

    onRightClickWithItem(item){
		if(item.ID == 53){
            //Right clicked on with bone meal
            this.growTree()
        }
	}

    getRandomBoolean() {
        return Math.random() < 0.5;
    }

    genLayer(layerConfig, height){
        for (let block of layerConfig){
            if(block[4]){
                if(this.getRandomBoolean()){
                    continue
                }
            }

            world.set_block(this.x+block[0], this.y+height+block[1], this.z+block[2], block[3]);
        }
    }

    growTree(){

        // [x, y, z offsets], blockId, random?
        let layerConfig = []

        //5-7 random
        let height = Math.random() * (7 - 4) + 4;

        //Trunk
        for(let i=0;i<height-1;i++){
            world.set_block(this.x, this.y+i, this.z, 2);
        }

        //Top layer
        layerConfig = [
            [0,0,0,3,false],
            [1,0,0,3,false],
            [-1,0,0,3,false],
            [0,0,-1,3,false],
            [0,0,1,3,false],
        ]
        this.genLayer(layerConfig, height)


        //One from top
        layerConfig = [
            [1,-1,0,3,false],
            [-1,-1,0,3,false],
            [0,-1,-1,3,false],
            [0,-1,1,3,false],
            [-1,-1,-1,3,true],
            [1,-1,1,3,true],
            [-1,-1,1,3,true],
            [1,-1,-1,3,true]
        ]
        this.genLayer(layerConfig, height)

        //Two from top
        layerConfig = [
            //inner 3x3
            [1,-2,0,3,false],
            [-1,-2,0,3,false],
            [0,-2,-1,3,false],
            [0,-2,1,3,false],
            [-1,-2,-1,3,false],
            [1,-2,1,3,false],
            [-1,-2,1,3,false],
            [1,-2,-1,3,false],
            //s1
            [1,-2,2,3,false],
            [0,-2,2,3,false],
            [-1,-2,2,3,false],
            //s2
            [1,-2,-2,3,false],
            [0,-2,-2,3,false],
            [-1,-2,-2,3,false],
            //s3
            [2,-2,1,3,false],
            [2,-2,0,3,false],
            [2,-2,-1,3,false],
            //s4
            [-2,-2,1,3,false],
            [-2,-2,0,3,false],
            [-2,-2,-1,3,false],
            //corners
            [-2,-2,-2,3,true],
            [-2,-2,2,3,true],
            [2,-2,-2,3,true],
            [2,-2,2,3,true],
        ]
        this.genLayer(layerConfig, height)

        //Three from top
        layerConfig = [
            //inner 3x3
            [1,-3,0,3,false],
            [-1,-3,0,3,false],
            [0,-3,-1,3,false],
            [0,-3,1,3,false],
            [-1,-3,-1,3,false],
            [1,-3,1,3,false],
            [-1,-3,1,3,false],
            [1,-3,-1,3,false],
            //s1
            [1,-3,2,3,false],
            [0,-3,2,3,false],
            [-1,-3,2,3,false],
            //s2
            [1,-3,-2,3,false],
            [0,-3,-2,3,false],
            [-1,-3,-2,3,false],
            //s3
            [2,-3,1,3,false],
            [2,-3,0,3,false],
            [2,-3,-1,3,false],
            //s4
            [-2,-3,1,3,false],
            [-2,-3,0,3,false],
            [-2,-3,-1,3,false],
            //corners
            [-2,-3,-2,3,true],
            [-2,-3,2,3,true],
            [2,-3,-2,3,true],
            [2,-3,2,3,true],
        ];
        this.genLayer(layerConfig, height)
        
    }
}