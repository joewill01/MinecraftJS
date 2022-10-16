'use strict';

/* global THREE */

var scene;
var world;
var gen;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class VoxelWorld {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.cellSliceSize = cellSize * cellSize;
    this.cells = {};
  }
  computeCellId(x, y, z) {
    const {cellSize} = this;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / 255);
    const cellZ = Math.floor(z / cellSize);
    return `${cellX},${cellY},${cellZ}`;
  }
  computeVoxelOffset(x, y, z) {
    const {cellSize, cellSliceSize} = this;
    const voxelX = THREE.Math.euclideanModulo(x, cellSize) | 0;
    const voxelY = THREE.Math.euclideanModulo(y, 255) | 0;
    const voxelZ = THREE.Math.euclideanModulo(z, cellSize) | 0;
    return voxelY * cellSliceSize +
           voxelZ * cellSize +
           voxelX;
  }
  getCellForVoxel(x, y, z) {
    return this.cells[this.computeCellId(x, y, z)];
  }
  setVoxel(x, y, z, v) {
    let cell = this.getCellForVoxel(x, y, z);
    if (!cell) {
      console.log("Here")
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    cell[voxelOffset] = v;
  }
  addCellForVoxel(x, y, z) {
    const cellId = this.computeCellId(x, y, z);
    let cell = this.cells[cellId];
    if (!cell) {
      return 0;
    }
    return cell;
  }
  getVoxel(x, y, z) {
    const cell = this.getCellForVoxel(x, y, z);
    if (!cell) {
      return 1;
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    return cell[voxelOffset];
  }
  generateGeometryDataForCell(cellX, cellY, cellZ) {
    const {cellSize} = this;
    const positions = [];
    const normals = [];
    const indices = [];
    const colours = [];
    const uvs = [];
    const block_ids = [];
    const corners_ao = [];
    const startX = cellX * cellSize;
    const startY = cellY * 255;
    const startZ = cellZ * cellSize;

    for (let y = 0; y < 255; ++y) {
      const voxelY = startY + y;
      for (let z = 0; z < cellSize; ++z) {
        const voxelZ = startZ + z;
        for (let x = 0; x < cellSize; ++x) {
          const voxelX = startX + x;
          const voxel = this.getVoxel(voxelX, voxelY, voxelZ);
          if (voxel) {
            // There is a voxel here but do we need faces for it?
            for (const {dir, corners} of VoxelWorld.faces) {
              const neighbor = this.getVoxel(
                  voxelX + dir[0],
                  voxelY + dir[1],
                  voxelZ + dir[2]);
              if (!neighbor) {
                // this voxel has no neighbor in this direction so we need a face.
                const ndx = positions.length / 3;
                for (const {pos, uv} of corners) {
                  positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
                  normals.push(...dir);
                  uvs.push((uv[0]), (uv[1]));
                }
                indices.push(
                  ndx, ndx + 1, ndx + 2,
                  ndx + 2, ndx + 1, ndx + 3,
                );
                block_ids.push(voxel)
                colours.push(0, 0, 0);
                let [tl, tr, bl, br] = [randInt(0,2), randInt(0,2), randInt(0,2), randInt(0,2)]
                corners_ao.push(tl, tr, bl, br);
                corners_ao.push(tl, tr, bl, br);
                corners_ao.push(tl, tr, bl, br);
                corners_ao.push(tl, tr, bl, br);
              }
            }
          }
        }
      }
    }

    return {
      positions,
      normals,
      uvs,
      indices,
      block_ids,
      colours,
      corners_ao
    };
  }
  generateCell(cellX, cellY, cellZ){
    const cellId = `${cellX},${cellY},${cellZ}`
    const {cellSize} = this;
    let cell = new Uint8Array(cellSize * 255 * cellSize);
    this.cells[cellId] = cell;

    for (let y = 0; y < 255; ++y) {
      for (let z = cellZ*cellSize; z < (cellZ*cellSize) + cellSize; ++z) {
        for (let x = cellX*cellSize; x < (cellX*cellSize) + cellSize; ++x) {
            const height = (Math.sin(x / cellSize * Math.PI * 2) + Math.sin(z / cellSize * Math.PI * 3)) * (cellSize / 6) + (cellSize / 2);
          
            if (y < 30) {
              this.setVoxel(x, y, z, randInt(1,6));
            } else if (y < 60) {
              this.setVoxel(x, y, z, 2)
            } else if (y < 90) {
              this.setVoxel(x, y, z, 3)
            }else if (y < 120) {
              this.setVoxel(x, y, z, 4)
            }else if (y < height+160) {
              this.setVoxel(x, y, z, 5)
            }
        }
      }
    }
  }
}

//grass 2, orange 4
//bedrock 3, cobble 1

VoxelWorld.faces = [
  { // left
    uvRow: 0,
    dir: [ -1,  0,  0, ],
    corners: [
      { pos: [ 0, 1, 0 ], uv: [ 0, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
    ],
  },
  { // right
    uvRow: 0,
    dir: [  1,  0,  0, ],
    corners: [
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 0 ], },
    ],
  },
  { // bottom
    uvRow: 1,
    dir: [  0, -1,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
    ],
  },
  { // top
    uvRow: 2,
    dir: [  0,  1,  0, ],
    corners: [
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 0, 1, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 0, 0 ], },
    ],
  },
  { // back
    uvRow: 0,
    dir: [  0,  0, -1, ],
    corners: [
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
      { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
    ],
  },
  { // front
    uvRow: 0,
    dir: [  0,  0,  1, ],
    corners: [
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 1, 1 ], },
    ],
  },
];

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const cellSize = 16;

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-cellSize * .3, 1 * .8, -cellSize * .3);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(cellSize / 2, 255 / 3, cellSize / 2);
  controls.update();

  scene = new THREE.Scene();
  scene.background = new THREE.Color('lightblue');

  function addLight(x, y, z) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
  }
  addLight(-1,  2,  4);
  addLight( 1, -1, -2);

  const loader = new THREE.TextureLoader();

  function vertexShader() {
    return `
      varying vec2 vUv;

      attribute vec4 corner;

      varying vec4 corners;

      void main() {
          vUv = uv;

          corners = corner;

          gl_Position =   projectionMatrix * 
                          modelViewMatrix * 
                          vec4(position,1.0);
      }
    `
  }

  function fragmentShader(){
     return `
        uniform sampler2D texture1;

        varying vec2 vUv;

        varying vec4 corners;

        vec4 colorTop = vec4(0,0,0,0);
        vec4 colorBottom = vec4(0,0,0,0);
        vec4 col = vec4(0,0,0,0);

        void main() {

            colorTop = mix(vec4(0,0,0,corners[0]*0.5), vec4(0,0,0,corners[1]*0.5), vUv.x);
            colorBottom = mix(vec4(0,0,0,corners[2]*0.5), vec4(0,0,0, corners[3]*0.5), vUv.x);
            col = mix(colorTop, colorBottom, vUv.y);

            //gl_FragColor = texture2D(texture1, vUv);
            if (texture2D(texture1, vUv).a == 0.0){
              gl_FragColor = texture2D(texture1, vUv);
            }else{
              gl_FragColor = mix(vec4(texture2D(texture1, vUv).rgb, 1.0), col, col.a);
            }
            
        }
      `
  }

  const glass_texture = loader.load('glass.png', render);
  var glass_uniforms = {
    texture1: { type: "t", value: glass_texture }
  };
  const glass_material = new THREE.ShaderMaterial({
    uniforms: glass_uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
    transparent: true
  })
  glass_texture.magFilter = THREE.NearestFilter;
  glass_texture.minFilter = THREE.NearestFilter;

  const cobblestone_texture = loader.load('cobblestone.png', render);
  var cobble_uniforms = {
    texture1: { type: "t", value: cobblestone_texture }
  };
  const cobblestone_material = new THREE.ShaderMaterial({
    uniforms: cobble_uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  })
  cobblestone_texture.magFilter = THREE.NearestFilter;
  cobblestone_texture.minFilter = THREE.NearestFilter;

  const grass_texture = loader.load('grass_block_side.png', render);
  var grass_uniforms = {
    texture1: { type: "t", value: grass_texture }
  };
  const grass_material = new THREE.ShaderMaterial({
    uniforms: grass_uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  })
  grass_texture.magFilter = THREE.NearestFilter;
  grass_texture.minFilter = THREE.NearestFilter;

  const bedrock_texture = loader.load('bedrock.png', render);
  var bedrock_uniforms = {
    texture1: { type: "t", value: bedrock_texture }
  };
  const bedrock_material = new THREE.ShaderMaterial({
    uniforms: bedrock_uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  })
  bedrock_texture.magFilter = THREE.NearestFilter;
  bedrock_texture.minFilter = THREE.NearestFilter;

  const orange_concrete_powder_texture = loader.load('orange_concrete_powder.png', render);
  var orange_concrete_powder_uniforms = {
    texture1: { type: "t", value: orange_concrete_powder_texture }
  };
  const orange_concrete_powder_material = new THREE.ShaderMaterial({
    uniforms: orange_concrete_powder_uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  })
  orange_concrete_powder_texture.magFilter = THREE.NearestFilter;
  orange_concrete_powder_texture.minFilter = THREE.NearestFilter;

  world = new VoxelWorld(cellSize);

  const cellIdToMesh = {};
  function updateCellGeometry(x, y, z, reloadOnly){
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / 255);
    const cellZ = Math.floor(z / cellSize);
    const cellId = world.computeCellId(x, y, z);
    let mesh = cellIdToMesh[cellId];
    if (!mesh) {
      if(reloadOnly){
        return
      }
      const geometry = new THREE.BufferGeometry();
      const positionNumComponents = 3;
      const normalNumComponents = 3;
      const uvNumComponents = 2;
      const colorComponents = 3;
      const cornerComponents = 4;

      geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(0), positionNumComponents));
      geometry.setAttribute(
          'normal',
          new THREE.BufferAttribute(new Float32Array(0), normalNumComponents));
      geometry.setAttribute(
          'uv',
          new THREE.BufferAttribute(new Float32Array(0), uvNumComponents));
      geometry.setAttribute(
          'color',
          new THREE.BufferAttribute(new Float32Array(0), colorComponents));
      geometry.setAttribute(
          'corner',
          new THREE.BufferAttribute(new Float32Array(0), cornerComponents))

      mesh = new THREE.Mesh(geometry, 
      [
        glass_material, 
        glass_material, 
        cobblestone_material, 
        grass_material, 
        bedrock_material,
        orange_concrete_powder_material
      ]);
      mesh.name = cellId;
      cellIdToMesh[cellId] = mesh;
      scene.add(mesh);
      mesh.position.set(cellX * cellSize, cellY * cellSize, cellZ * cellSize);
    }

    const {positions, normals, uvs, indices, block_ids, colors, corners_ao} = world.generateGeometryDataForCell(cellX, cellY, cellZ);
    const geometry = mesh.geometry;

    //Setup texture groups for geometry
    const offset = 6
    let currentIndex = 0
    let prev = null
    let count = 0
    geometry.clearGroups()
    for(let block_id of block_ids){
      if (block_id != prev) {
        if (prev != null) {
          // Add group and reset
          geometry.addGroup(currentIndex, count*offset, prev);
          prev = block_id
          currentIndex += (count*offset)
          count = 1
        }else{
          // Reset
          prev = block_id
          count = 1
        }
      }else{
        count+=1;
        prev = block_id
      }
    }
    geometry.addGroup(currentIndex, count*offset, prev);  

    geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.getAttribute('position').needsUpdate = true;

    geometry.setAttribute('normal',new THREE.BufferAttribute(new Float32Array(normals), 3));
    geometry.getAttribute('normal').needsUpdate = true;

    geometry.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geometry.getAttribute('uv').needsUpdate = true;

    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    geometry.getAttribute('color').needsUpdate = true;

    geometry.setAttribute('corner', new THREE.BufferAttribute(new Float32Array(corners_ao), 4));
    geometry.getAttribute('corner').needsUpdate = true;

    geometry.setIndex(indices);
    geometry.computeBoundingSphere();
  }


  for(let x=0;x<1;x++){
    for(let z=0;z<1;z++){
      world.generateCell(x,0,z);
      updateCellGeometry(x*16,0,z*16);
      const offsets = [
        [0,1],
        [1,0],
        [-1,0],
        [0,-1]
      ]
      for (let offset of offsets){
        updateCellGeometry((x+offset[0])*cellSize, 0, (z+offset[1]) * cellSize, true)
      }
    } 
  }


  gen = function(x,y,z){
    world.generateCell(x,0,z);
    updateCellGeometry(x*16,0,z*16);
    const offsets = [
      [0,1],
      [1,0],
      [-1,0],
      [0,-1]
    ]
    for (let offset of offsets){
      updateCellGeometry((x+offset[0])*cellSize, 0, (z+offset[1]) * cellSize, true)
    }
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let renderRequested = false;

  var stats;
  function createStats() {
    var stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';

    return stats;
  }

  stats = createStats();
  document.body.appendChild( stats.domElement );

  var rendererStats = new THREEx.RendererStats()
  rendererStats.domElement.style.position = 'absolute'
  rendererStats.domElement.style.left = '0px'
  rendererStats.domElement.style.bottom = '0px'
  rendererStats.domElement.style.zIndex = '100'
  document.body.appendChild( rendererStats.domElement )

  function render() {
    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();
    renderer.render(scene, camera);
    rendererStats.update(renderer);
    stats.update();
  }
  render();

  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  controls.addEventListener('change', requestRenderIfNotRequested);
  window.addEventListener('resize', requestRenderIfNotRequested);
}

main();
