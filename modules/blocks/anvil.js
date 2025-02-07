class Anvil extends Block{
	constructor(x,y,z,ctex){
        let textures = {}
		super(x,y,z,textures,ctex);

		this.ID = 31;
		this.name = "anvil"
		this.displayName = "Anvil"

        this.opacity = 0;
        this.solid=false;
	}
}