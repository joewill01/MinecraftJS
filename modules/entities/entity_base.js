class Entity {
	constructor(hw, hh, el, x, y, z) {
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
		scene.add( this.hitbox );

		geom = new THREE.CubeGeometry( this.hitboxWidth+0.0001, 0.02, this.hitboxWidth+0.0001);
		wireMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe:true } );
		this.eyeLevelHitbox = new THREE.Mesh( geom, wireMaterial);
		this.eyeLevelHitbox.visible = renderHitboxes;
		scene.add( this.eyeLevelHitbox );
	}
}