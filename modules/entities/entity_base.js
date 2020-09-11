class Entity {
	constructor(hw, hh, el, x, y, z, name) {
		this.hitboxWidth = hw;
		this.hitboxHeight = hh;
		this.eyeLevel = el;
		this.x = x;
		this.y = y;
		this.z = z;

		let geom = new THREE.CubeGeometry( this.hitboxWidth, this.hitboxHeight, this.hitboxWidth);
		let wireMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe:true } );
		this.hitbox = new THREE.Mesh( geom, wireMaterial);
		this.hitbox.visible = renderHitboxes;
		this.hitbox.name= name+"-hitbox"
		this.hitbox.position.x = this.x
		this.hitbox.position.y = this.y
		this.hitbox.position.z = this.z
		scene.add( this.hitbox );

		if(el !== false){
			geom = new THREE.CubeGeometry( this.hitboxWidth+0.0001, 0.02, this.hitboxWidth+0.0001);
			wireMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe:true } );
			this.eyeLevelHitbox = new THREE.Mesh( geom, wireMaterial);
			this.eyeLevelHitbox.visible = renderHitboxes;
			this.eyeLevelHitbox.name=name+"-eye-level"
			scene.add( this.eyeLevelHitbox );
		}
	}
}