class FallingBlock extends Entity{
    constructor(x,y,z,block) {
        super(1,1,false,x,y+3,z,"entity_"+uuid());

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let texture = block.texture_names["N"]
        this.block = block
        let mat_index = registry.registerMaterial(texture, false)
        let material = registry.materials[mat_index]
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.position.set(x,y+3,z)
        scene.add( this.cube );
    }
    update(){
        this.updateCollBoxes();
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;
        if(this.velocity.y - 9.8 * this.mass > -this.terminalVelocity){
            this.velocity.y -= 9.8 * this.mass;
        }else{
            this.velocity.y = -this.terminalVelocity
        }

        this.move(-this.velocity.x, this.velocity.y*delta, -this.velocity.z, this.hitbox);

        this.x = this.hitbox.position.x
        this.y = this.hitbox.position.y
        this.z = this.hitbox.position.z
        this.cube.position.set(this.x,this.y,this.z)
    }
    onHitGround() {

        world.set_block(this.x,Math.floor(this.y),this.z,this.block.ID)
        this.cleanup()

    }
    cleanup(){
        this.boxes.forEach((box, index) => {
            box[0].geometry.dispose( );
            box[0].material.dispose( );
            scene.remove(box[0])
        })
        this.boxes = null;
        registry.unRegisterEntity(this.entityId)
        scene.remove(this.cube)
    }
}