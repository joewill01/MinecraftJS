function convolute(x, a){
	x = x.toString()
	a = a.toString()
    return (BigInt(x) * (BigInt(x) * BigInt("6364136223846793005") + BigInt("1442695040888963407"))) + BigInt(a)
}

class GenLayer{
    constructor(base_seed){
    	base_seed = base_seed.toString()
    	this.base_seed = base_seed
        this.base_seed = convolute(this.base_seed, base_seed)
        this.base_seed = convolute(this.base_seed, base_seed)
        this.base_seed = convolute(this.base_seed, base_seed)

        this.world_gen_seed = 0
        this.parent = null;
        this.chunk_seed = 0

        console.log(this.base_seed)
    }
}        
