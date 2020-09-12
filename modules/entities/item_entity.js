class ItemEntity extends Entity{
	constructor(x,y,z,item){
		if(item.displayType == "2d"){
			var xySize = 0.35;
			var zSize = 0.02

			super(xySize, xySize, false, x, y, z,"item_" + uuid());

			this.xySize = xySize
			this.zSize = zSize

			var data = null;

		    // this is a "marching ants" algorithm used to calc the outline path
		    (function () {
		        // d3-plugin for calculating outline paths
		        // License: https://github.com/d3/d3-plugins/blob/master/LICENSE
		        //
		        // Copyright (c) 2012-2014, Michael Bostock
		        // All rights reserved.
		        //
		        //  Redistribution and use in source and binary forms, with or without
		        //  modification, are permitted provided that the following conditions are met:
		        //* Redistributions of source code must retain the above copyright notice, this
		        //  list of conditions and the following disclaimer.
		        //* Redistributions in binary form must reproduce the above copyright notice,
		        //  this list of conditions and the following disclaimer in the documentation
		        //  and/or other materials provided with the distribution.
		        //* The name Michael Bostock may not be used to endorse or promote products
		        //  derived from this software without specific prior written permission.
		        // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
		        geom = {};
		        geom.contour = function (grid, start) {
		            var s = start || d3_geom_contourStart(grid), // starting point 
		                c = [], // contour polygon 
		                x = s[0], // current x position 
		                y = s[1], // current y position 
		                dx = 0, // next x direction 
		                dy = 0, // next y direction 
		                pdx = NaN, // previous x direction 
		                pdy = NaN, // previous y direction 
		                i = 0;

		            do {
		                // determine marching squares index 
		                i = 0;
		                if (grid(x - 1, y - 1)) i += 1;
		                if (grid(x, y - 1)) i += 2;
		                if (grid(x - 1, y)) i += 4;
		                if (grid(x, y)) i += 8;

		                // determine next direction 
		                if (i === 6) {
		                    dx = pdy === -1 ? -1 : 1;
		                    dy = 0;
		                } else if (i === 9) {
		                    dx = 0;
		                    dy = pdx === 1 ? -1 : 1;
		                } else {
		                    dx = d3_geom_contourDx[i];
		                    dy = d3_geom_contourDy[i];
		                }

		                // update contour polygon 
		                if (dx != pdx && dy != pdy) {
		                    c.push([x, y]);
		                    pdx = dx;
		                    pdy = dy;
		                }

		                x += dx;
		                y += dy;
		            } while (s[0] != x || s[1] != y);

		            return c;
		        };

		        // lookup tables for marching directions 
		        var d3_geom_contourDx = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1, NaN],
		            d3_geom_contourDy = [0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0, NaN];

		        function d3_geom_contourStart(grid) {
		            var x = 0,
		                y = 0;

		            // search for a starting point; begin at origin 
		            // and proceed along outward-expanding diagonals 
		            while (true) {
		                if (grid(x, y)) {
		                    return [x, y];
		                }
		                if (x === 0) {
		                    x = y + 1;
		                    y = 0;
		                } else {
		                    x = x - 1;
		                    y = y + 1;
		                }
		            }
		        }

		    })();

		    var canvas = document.createElement('canvas');
		    var ctx = canvas.getContext('2d');
		    var img = new Image();
		    img.onload = function (){

		    	var itemOutline = new THREE.Shape();

		    	ctx.scale(1, -1);
		    	let scale = 1;
		        ctx.drawImage(img, 0,-img.height);
		        var theData = ctx.getImageData(0, 0, img.width, img.height);
		        data = theData.data;
		        let points = geom.contour(defineNonTransparent);

		        points = points.map(x => [x[0]/img.width*scale,x[1]/img.height*scale]);

		        itemOutline.moveTo(points[0][0],points[0][1])
		        for(let i=1;i<points.length;i++){
		        	itemOutline.lineTo(points[i][0],points[i][1])
		        }
		        itemOutline.lineTo(points[0][0],points[0][1])

		        let texture = new THREE.TextureLoader().load( img.src );
		        texture.magFilter = THREE.NearestFilter;
				texture.minFilter = THREE.NearestFilter;

		        var geometry = new THREE.ExtrudeBufferGeometry( itemOutline, { depth: zSize, bevelEnabled: false } );
		        var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({map:texture}) );
		        mesh.position.x = -xySize/2;
				mesh.position.y = -xySize/2;
				mesh.scale.x = xySize;
				mesh.scale.y = xySize;

				var pivot = new THREE.Object3D();
				pivot.position.x = x 
				pivot.position.y = y 
				pivot.position.z = z
				pivot.add( mesh );

				scene.add( pivot );
				img.entity.pivot = pivot
		    }

		    img.entity = this
		    img.src = 'minecraft/textures/item/'+item.itemTexture

		    var defineNonTransparent = function (x, y) {
		        var a = data[(y * img.width + x) * 4 + 3];
		        return (a > 20);
		    }

		}else{

			super(0.35, 0.35, false, x, y, z,"item_" + uuid());

			this.size = 0.2 

			var geometry = new THREE.BoxGeometry( this.size, this.size, this.size );
	        var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color:"#ff00ff"}) );

			var pivot = new THREE.Object3D();
			pivot.position.x = x 
			pivot.position.y = y 
			pivot.position.z = z
			pivot.add( mesh );

			scene.add( pivot );
			this.pivot = pivot;
		}	
	}

	update(){
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;
		if(this.velocity.y - 9.8 * this.mass > -this.terminalVelocity){
			this.velocity.y -= 9.8 * this.mass;
		}else{
			this.velocity.y = -this.terminalVelocity
		}
		try{
			if(this.pivot != undefined){
				this.pivot.rotation.y += 0.015;
				let offset = Math.sin(performance.now()/400)*0.02 + 0.1
				if(this.xySize!=undefined){
					this.pivot.children[0].position.y = -this.xySize/2 + offset
				}else{
					this.pivot.children[0].position.y = -this.size/2 + offset
				}
				
				this.move(-this.velocity.x, this.velocity.y*delta, -this.velocity.z, this.pivot, false)
			}
		}catch(e){
			console.log(e)
		}
	}
}