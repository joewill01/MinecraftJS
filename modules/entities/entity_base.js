class Entity {
	constructor(hw, hh, el, x, y, z) {
		this.hitboxWidth = hw;
		this.hitboxHeight = hh;
		this.eyeLevel = el;
		this.x = x;
		this.y = y;
		this.z = z;

		let geom = new THREE.BoxBufferGeometry( this.hitboxWidth, this.hitboxHeight, this.hitboxWidth);
		let edges = new THREE.EdgesGeometry( geom );
		this.hitbox = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		this.hitbox.visible = true;
		scene.add( this.hitbox );

		geom = new THREE.BoxBufferGeometry( this.hitboxWidth+0.0001, 0.02, this.hitboxWidth+0.0001);
		edges = new THREE.EdgesGeometry( geom );
		this.eyeLevelHitbox = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xFF0000 } ) );
		this.eyeLevelHitbox.visible = true;
		scene.add( this.eyeLevelHitbox );
	}
}