'use strict';

/* global THREE */

class VoxelWorld {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.cellSliceSize = cellSize * cellSize;
    this.cell = new Uint8Array(cellSize * 255 * cellSize);
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
    const {cellSize} = this;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / 255);
    const cellZ = Math.floor(z / cellSize);
    if (cellX !== 0 || cellY !== 0 || cellZ !== 0) {
      return null;
    }
    return this.cell;
  }
  setVoxel(x, y, z, v) {
    const cell = this.getCellForVoxel(x, y, z);
    if (!cell) {
      return;  // TODO: add a new cell?
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    cell[voxelOffset] = v;
  }
  getVoxel(x, y, z) {
    const cell = this.getCellForVoxel(x, y, z);
    if (!cell) {
      return 0;
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    return cell[voxelOffset];
  }
  generateGeometryDataForCell(cellX, cellY, cellZ) {
    const {cellSize} = this;
    const positions = [];
    const normals = [];
    const indices = [];
    const uvs = [];
    const block_ids = [];
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
      block_ids
    };
  }
}

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

  const scene = new THREE.Scene();
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

  const glass_texture = loader.load('glass.png', render);
  const glass_material = new THREE.MeshBasicMaterial({
    map: glass_texture,
    side: THREE.DoubleSide,
    alphaTest: 0.1,
    transparent: true,
  });
  glass_texture.magFilter = THREE.NearestFilter;
  glass_texture.minFilter = THREE.NearestFilter;

  const cobblestone_texture = loader.load('cobblestone.png', render);
  const cobblestone_material = new THREE.MeshBasicMaterial({
    map: cobblestone_texture,
    side: THREE.DoubleSide,
    alphaTest: 0.1,
    transparent: true,
  });
  cobblestone_texture.magFilter = THREE.NearestFilter;
  cobblestone_texture.minFilter = THREE.NearestFilter;

  const grass_texture = loader.load('grass_block_side.png', render);
  const grass_material = new THREE.MeshBasicMaterial({
    map: grass_texture,
    side: THREE.DoubleSide,
    alphaTest: 0.1,
    transparent: true,
  });
  grass_texture.magFilter = THREE.NearestFilter;
  grass_texture.minFilter = THREE.NearestFilter;

  const bedrock_texture = loader.load('bedrock.png', render);
  const bedrock_material = new THREE.MeshBasicMaterial({
    map: bedrock_texture,
    side: THREE.DoubleSide,
    alphaTest: 0.1,
    transparent: true,
  });
  bedrock_texture.magFilter = THREE.NearestFilter;
  bedrock_texture.minFilter = THREE.NearestFilter;

  const orange_concrete_powder_texture = loader.load('orange_concrete_powder.png', render);
  const orange_concrete_powder_material = new THREE.MeshBasicMaterial({
    map: orange_concrete_powder_texture,
    side: THREE.DoubleSide,
    alphaTest: 0.1,
    transparent: true,
  });
  orange_concrete_powder_texture.magFilter = THREE.NearestFilter;
  orange_concrete_powder_texture.minFilter = THREE.NearestFilter;

  const world = new VoxelWorld(cellSize);

  for (let y = 0; y < 255; ++y) {
    for (let z = 0; z < cellSize; ++z) {
      for (let x = 0; x < cellSize; ++x) {
        const height = (Math.sin(x / cellSize * Math.PI * 2) + Math.sin(z / cellSize * Math.PI * 3)) * (cellSize / 6) + (cellSize / 2);
        if (y < height + 150) {
          world.setVoxel(x, y, z, randInt(1, 6));
        }
      }
    }
  }

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const {positions, normals, uvs, indices, block_ids} = world.generateGeometryDataForCell(0, 0, 0);
  const geometry = new THREE.BufferGeometry();

  //Setup texture groups for geometry
  const offset = 6
  let currentIndex = 0
  let prev = null
  let count = 0
  let added_any = false
  for(let block_id of block_ids){
    if (block_id != prev) {
      if (prev != null) {
        // Add group and reset
        geometry.addGroup(currentIndex, count*offset, block_id-1);
        prev = block_id
        currentIndex += (count*offset)
        count = 1
        added_any = true
      }else{
        // Reset
        prev = block_id
        count = 1
      }
    }else{
      count+=1;
    }
  }
  if(!added_any){
    geometry.addGroup(currentIndex, count*offset, block_ids[block_ids.length-1]-2);  
  }
  

  const positionNumComponents = 3;
  const normalNumComponents = 3;
  const uvNumComponents = 2;
  geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
  geometry.setAttribute(
      'normal',
      new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
  geometry.setAttribute(
      'uv',
      new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
  geometry.setIndex(indices);
  const mesh = new THREE.Mesh(geometry, 
    [
      glass_material, 
      cobblestone_material, 
      grass_material, 
      bedrock_material,
      orange_concrete_powder_material
    ]);
  scene.add(mesh);

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

  function render() {
    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();
    renderer.render(scene, camera);
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
