class StructureBlock extends Block{
	constructor(x,y,z,ctex){
		let textures = {
			'N': 'structure_block_save.png',
			'S': 'structure_block_save.png',
			'E': 'structure_block_save.png',
			'W': 'structure_block_save.png',
			'U': 'structure_block_save.png',
			'D': 'structure_block_save.png',
		};
		super(x,y,z,textures,ctex);

		this.ID = 6;
		this.name = "structure_block"
		this.displayName = "Structure Block"

		this.hardness = -1;
		this.resistance = 0;

		this.scanSizeX = 4;
		this.scanSizeY = 4;
		this.scanSizeZ = 4;
		this.offsetX = 0;
		this.offsetY = 0;
		this.offsetZ = 0;

		this.scanSpace = null;
		this.createScanSpace()
	}

	createScanSpace(){

		try{
			scene.remove(this.scanSpace)
		}catch(e){

		}
		geom = new THREE.BoxBufferGeometry(this.scanSizeX, this.scanSizeY, this.scanSizeZ);
		edges = new THREE.EdgesGeometry( geom );
		this.scanSpace = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x0000FF } ) );
		this.scanSpace.visible = true;
		this.scanSpace.name= "scanSpace"
		scene.add( this.scanSpace );

		this.scanSpace.position.x = this.x + this.scanSizeX/2 + 0.5 + this.offsetX;
		this.scanSpace.position.y = this.y + this.scanSizeY/2 - 0.5 + this.offsetY;
		this.scanSpace.position.z = this.z + this.scanSizeZ/2 + 0.5 + this.offsetZ;
	}

	break(){
		this.onBreak();
		scene.remove(this.scanSpace)
		console.log("Broken structure_block")
	}
}