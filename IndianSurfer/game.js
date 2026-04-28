// Global THREE is loaded from index.html

// --- Procedural Texture Generation ---
function createCanvas(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    return canvas;
}

// Zone 0: Railway
function createGrassTexture() {
    const canvas = createCanvas(512);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#4a5d23'; 
    ctx.fillRect(0, 0, 512, 512);
    for(let i=0; i<30000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#556b2f' : '#3e4a1a';
        ctx.fillRect(Math.random()*512, Math.random()*512, 2, 2);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);
    return tex;
}

// Zone 1: Bazaar (Dusty / Cobblestone)
function createBazaarTexture() {
    const canvas = createCanvas(512);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#c2a578'; // Sand color
    ctx.fillRect(0, 0, 512, 512);
    // Draw some cobblestones
    ctx.fillStyle = '#a68a5e';
    for(let i=0; i<500; i++) {
        ctx.beginPath();
        ctx.arc(Math.random()*512, Math.random()*512, Math.random()*15+5, 0, Math.PI*2);
        ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);
    return tex;
}

// Zone 2: Tunnel (Dark concrete)
function createTunnelTexture() {
    const canvas = createCanvas(512);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#222';
    for(let i=0; i<10000; i++) {
        ctx.fillRect(Math.random()*512, Math.random()*512, 4, 4);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);
    return tex;
}

function createTrackTexture(zoneIndex) {
    const canvas = createCanvas(256);
    const ctx = canvas.getContext('2d');
    
    // Base color based on zone
    if(zoneIndex === 0) ctx.fillStyle = '#444'; // Gravel
    else if(zoneIndex === 1) ctx.fillStyle = '#8a6e45'; // Dusty road
    else ctx.fillStyle = '#111'; // Tunnel floor
    
    ctx.fillRect(0, 0, 256, 256);
    
    // Sleepers only for zone 0
    if(zoneIndex === 0) {
        ctx.fillStyle = '#2c1e16';
        for(let y=0; y<256; y+=32) ctx.fillRect(0, y+8, 256, 16);
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 4);
    return tex;
}

// --- Standard Textures ---
function createWoodTexture() {
    const canvas = createCanvas(256);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#3e2411';
    for(let i=0; i<100; i++) {
        ctx.beginPath();
        let x = Math.random() * 256;
        ctx.moveTo(x, 0);
        for(let y=0; y<=256; y+=20) ctx.lineTo(x + Math.sin(y*0.05 + x)*3, y);
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.stroke();
    }
    return new THREE.CanvasTexture(canvas);
}

function createLeafTexture() {
    const canvas = createCanvas(256);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,256,256);
    for(let i=0; i<200; i++) {
        ctx.beginPath();
        let radius = 20 + Math.random()*15;
        let angle = Math.random() * Math.PI * 2;
        let dist = Math.random() * 100;
        ctx.arc(128 + Math.cos(angle)*dist, 128 + Math.sin(angle)*dist, radius, 0, Math.PI*2);
        const g = 80 + Math.floor(Math.random()*60);
        ctx.fillStyle = `rgba(20, ${g}, 20, 0.9)`;
        ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
}

function createStripeTexture() {
    const canvas = createCanvas(256);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#111111';
    for(let i=-256; i<512; i+=40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i+20, 0); ctx.lineTo(i-256+20, 256); ctx.lineTo(i-256, 256);
        ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 1);
    return tex;
}

function createMetalTexture() {
    const canvas = createCanvas(256);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#b33939'; 
    ctx.fillRect(0, 0, 256, 256);
    for(let i=0; i<8000; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random()*0.15})`;
        ctx.fillRect(Math.random()*256, Math.random()*256, Math.random()*15+2, 2);
    }
    ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 100, 256, 20);
    ctx.fillStyle = '#ecf0f1'; ctx.fillRect(0, 120, 256, 10);
    ctx.fillStyle = '#1a1a1a'; 
    for(let x=20; x<256; x+=60) {
        ctx.fillRect(x, 40, 40, 40);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath(); ctx.moveTo(x+5, 40); ctx.lineTo(x+15, 40); ctx.lineTo(x+5, 80); ctx.fill();
        ctx.fillStyle = '#1a1a1a';
    }
    return new THREE.CanvasTexture(canvas);
}

// --- Powerup Textures ---
function createStarTexture() {
    const canvas = createCanvas(128);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = '#fff';
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("2x", 64, 64);
    return new THREE.CanvasTexture(canvas);
}

function createMagnetTexture() {
    const canvas = createCanvas(128);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#3498db';
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.arc(64, 70, 30, Math.PI, 0);
    ctx.lineTo(94, 90); ctx.moveTo(34, 70); ctx.lineTo(34, 90);
    ctx.stroke();
    ctx.fillStyle = '#e74c3c'; ctx.fillRect(86, 90, 16, 20);
    ctx.fillStyle = '#ecf0f1'; ctx.fillRect(26, 90, 16, 20);
    return new THREE.CanvasTexture(canvas);
}

function createJetpackTexture() {
    const canvas = createCanvas(128);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(64, 20); ctx.lineTo(84, 100); ctx.lineTo(44, 100);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
}

// --- Game Variables ---
let scene, camera, renderer, dirLight;
let player, cop;
let playerMixer, copMixer;
let playerActionRun, copActionRun;
let clock = new THREE.Clock();

let gameSpeed = 25;
let isPlaying = false;
let distance = 0;
let coinsCollected = 0;

let currentLane = 0;
let copCurrentLane = 0;
const LANE_WIDTH = 4.5;

let yVelocity = 0;
const GRAVITY = -60;
const JUMP_FORCE = 22;
let isJumping = false;
let isRolling = false;
let rollTimer = 0;
let isStumbling = false;
let stumbleTimer = 0;

let trackSegments = [];
let obstacles = [];
let coins = [];
let sceneries = [];
let activePowerupMeshes = [];

// Map Zones: 0=Railway, 1=Bazaar, 2=Tunnel
let currentZone = 0; 
let zoneTextures = {};

// --- Persistent Data & Shop ---
let totalCoins = parseInt(localStorage.getItem('indianSurferTotalCoins')) || 0;
let upgrades = JSON.parse(localStorage.getItem('indianSurferUpgrades')) || {
    magnet: 1, multiplier: 1, jetpack: 1
};
const MAX_UPGRADE_LEVEL = 5;

// Active Powerups
let activeBuffs = {
    magnet: 0,
    multiplier: 0,
    jetpack: 0
};

// UI Elements
const distanceEl = document.getElementById('distance-val');
const coinsEl = document.getElementById('coins-val');
const totalCoinsEl = document.getElementById('total-coins-val');
const startScreen = document.getElementById('start-screen');
const loadingScreen = document.getElementById('loading-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const shopScreen = document.getElementById('shop-screen');
const activePowerupsContainer = document.getElementById('active-powerups');
const finalDistanceEl = document.getElementById('final-distance');
const finalCoinsEl = document.getElementById('final-coins');

// Materials
let trackMaterial, groundMaterial, trainMaterial, barricadeMaterial, woodMaterial, leafMaterial, coinMaterial, railMaterial;
let starMat, magnetMat, jetpackMat;

function initMaterials() {
    zoneTextures.grass = createGrassTexture();
    zoneTextures.bazaar = createBazaarTexture();
    zoneTextures.tunnel = createTunnelTexture();
    zoneTextures.track0 = createTrackTexture(0);
    zoneTextures.track1 = createTrackTexture(1);
    zoneTextures.track2 = createTrackTexture(2);

    groundMaterial = new THREE.MeshStandardMaterial({ map: zoneTextures.grass, roughness: 1.0 });
    trackMaterial = new THREE.MeshStandardMaterial({ map: zoneTextures.track0, roughness: 0.9 });
    
    woodMaterial = new THREE.MeshStandardMaterial({ map: createWoodTexture(), roughness: 0.9 });
    leafMaterial = new THREE.MeshStandardMaterial({ 
        map: createLeafTexture(), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.8
    });
    barricadeMaterial = new THREE.MeshStandardMaterial({ map: createStripeTexture(), roughness: 0.6 });
    trainMaterial = new THREE.MeshStandardMaterial({ map: createMetalTexture(), metalness: 0.7, roughness: 0.4 });
    coinMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1.0, roughness: 0.1 });
    railMaterial = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.9, roughness: 0.2 });

    starMat = new THREE.MeshStandardMaterial({ map: createStarTexture(), roughness: 0.5 });
    magnetMat = new THREE.MeshStandardMaterial({ map: createMagnetTexture(), roughness: 0.5 });
    jetpackMat = new THREE.MeshStandardMaterial({ map: createJetpackTexture(), roughness: 0.5 });
}

function loadModels(callback) {
    const loader = new THREE.GLTFLoader();
    const url = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/Soldier.glb';
    
    loader.load(url, (gltfPlayer) => {
        player = gltfPlayer.scene;
        player.scale.set(1.5, 1.5, 1.5);
        player.rotation.y = Math.PI; 
        
        player.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = child.material.clone();
                child.material.color.setHex(0x3498db);
            }
        });

        playerMixer = new THREE.AnimationMixer(player);
        playerActionRun = playerMixer.clipAction(gltfPlayer.animations[1]);
        playerActionRun.play();

        loader.load(url, (gltfCop) => {
            cop = gltfCop.scene;
            cop.scale.set(1.5, 1.5, 1.5);
            cop.rotation.y = Math.PI;
            
            cop.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material = child.material.clone();
                    child.material.color.setHex(0x8a724d);
                }
            });

            copMixer = new THREE.AnimationMixer(cop);
            copActionRun = copMixer.clipAction(gltfCop.animations[1]);
            copActionRun.play();

            callback();
        });
    });
}

function init() {
    initMaterials();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x7ec0ee); 
    scene.fog = new THREE.FogExp2(0x7ec0ee, 0.008);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('game-container').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    dirLight = new THREE.DirectionalLight(0xffeedd, 0.9);
    dirLight.position.set(-30, 50, -30);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 80;
    dirLight.shadow.camera.bottom = -80;
    dirLight.shadow.camera.left = -80;
    dirLight.shadow.camera.right = 80;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 300;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    loadModels(() => {
        scene.add(player);
        cop.position.set(0, 0, -8);
        scene.add(cop);

        for (let i = -2; i < 15; i++) spawnTrackSegment(i * 20);

        window.addEventListener('resize', onWindowResize);
        document.addEventListener('keydown', onKeyDown);
        
        document.getElementById('start-btn').addEventListener('click', startGame);
        document.getElementById('restart-btn').addEventListener('click', resetGame);
        
        // Shop Listeners
        document.getElementById('shop-btn').addEventListener('click', () => {
            startScreen.classList.remove('active');
            shopScreen.classList.remove('hidden');
            shopScreen.classList.add('active');
            updateShopUI();
        });
        document.getElementById('close-shop-btn').addEventListener('click', () => {
            shopScreen.classList.remove('active');
            setTimeout(() => {
                shopScreen.classList.add('hidden');
                startScreen.classList.add('active');
            }, 300);
        });

        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => buyUpgrade(e.target.dataset.item));
        });

        updateCamera();
        if(totalCoinsEl) totalCoinsEl.innerText = totalCoins;
        
        loadingScreen.classList.remove('active');
        startScreen.classList.add('active');

        requestAnimationFrame(animate);
    });
}

function updateShopUI() {
    ['magnet', 'multiplier', 'jetpack'].forEach(item => {
        let level = upgrades[item];
        let cost = level * 100 + (item === 'jetpack' ? 50 : 0);
        
        document.getElementById(`${item}-level-bar`).style.width = `${(level/MAX_UPGRADE_LEVEL)*100}%`;
        
        let btn = document.getElementById(`buy-${item}`);
        if(level >= MAX_UPGRADE_LEVEL) {
            btn.innerText = "MAXED";
            btn.disabled = true;
        } else {
            document.getElementById(`cost-${item}`).innerText = cost;
            btn.disabled = totalCoins < cost;
        }
    });
}

function buyUpgrade(item) {
    let level = upgrades[item];
    let cost = level * 100 + (item === 'jetpack' ? 50 : 0);
    
    if (totalCoins >= cost && level < MAX_UPGRADE_LEVEL) {
        totalCoins -= cost;
        upgrades[item]++;
        localStorage.setItem('indianSurferTotalCoins', totalCoins);
        localStorage.setItem('indianSurferUpgrades', JSON.stringify(upgrades));
        
        if(totalCoinsEl) totalCoinsEl.innerText = totalCoins;
        updateShopUI();
    }
}

function spawnTrackSegment(zPos) {
    const group = new THREE.Group();

    const groundGeo = new THREE.PlaneGeometry(120, 20);
    const ground = new THREE.Mesh(groundGeo, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.1, 10);
    ground.receiveShadow = true;
    group.add(ground);

    for (let i = -1; i <= 1; i++) {
        const trackGeo = new THREE.PlaneGeometry(3.5, 20);
        const track = new THREE.Mesh(trackGeo, trackMaterial);
        track.rotation.x = -Math.PI / 2;
        track.position.set(i * LANE_WIDTH, 0.01, 10);
        track.receiveShadow = true;
        group.add(track);

        if(currentZone < 2) { // Tunnels don't need shiny rails, they are dark
            const railGeo = new THREE.BoxGeometry(0.2, 0.3, 20);
            const railL = new THREE.Mesh(railGeo, railMaterial);
            railL.position.set(i * LANE_WIDTH - 1.2, 0.15, 10);
            railL.castShadow = true;
            group.add(railL);

            const railR = new THREE.Mesh(railGeo, railMaterial);
            railR.position.set(i * LANE_WIDTH + 1.2, 0.15, 10);
            railR.castShadow = true;
            group.add(railR);
        }
    }

    group.position.z = zPos;
    scene.add(group);
    trackSegments.push({ mesh: group, zEnd: zPos + 20 });

    spawnScenery(zPos);

    if (zPos > 60) spawnObstacles(zPos);
}

function spawnScenery(zPos) {
    // No trees in tunnel zone
    if(currentZone === 2) return; 

    for (let side of [-1, 1]) {
        if (Math.random() > 0.2) { 
            const isTree = Math.random() > 0.4;
            const xPos = side * (12 + Math.random() * 20);
            const zOffset = Math.random() * 20;
            const group = new THREE.Group();
            
            if (isTree && currentZone === 0) { // Trees only in Railway
                const trunkGeo = new THREE.CylinderGeometry(0.5, 0.8, 6, 8);
                const trunk = new THREE.Mesh(trunkGeo, woodMaterial);
                trunk.position.y = 3;
                trunk.castShadow = true;
                group.add(trunk);
                
                const planeGeo = new THREE.PlaneGeometry(8, 8);
                for(let k=0; k<4; k++) {
                    const leafPlane = new THREE.Mesh(planeGeo, leafMaterial);
                    leafPlane.position.y = 6;
                    leafPlane.rotation.y = (Math.PI / 4) * k;
                    leafPlane.castShadow = true;
                    group.add(leafPlane);
                }
            } else { // Bushes/Rocks
                const planeGeo = new THREE.PlaneGeometry(5, 5);
                for(let k=0; k<3; k++) {
                    const bushPlane = new THREE.Mesh(planeGeo, currentZone===0 ? leafMaterial : barricadeMaterial);
                    bushPlane.position.y = 2.5;
                    bushPlane.rotation.y = (Math.PI / 3) * k;
                    bushPlane.castShadow = true;
                    group.add(bushPlane);
                }
            }
            group.position.set(xPos, 0, zPos + zOffset);
            scene.add(group);
            sceneries.push(group);
        }
    }
}

function spawnObstacles(zPos) {
    const rand = Math.random();
    
    // Spawn Powerup? (5% chance)
    if (Math.random() < 0.05) {
        const lane = Math.floor(Math.random() * 3) - 1;
        const pType = Math.random();
        
        let geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        let mat, typeStr;
        
        if (pType < 0.33) { mat = magnetMat; typeStr = 'magnet'; }
        else if (pType < 0.66) { mat = starMat; typeStr = 'multiplier'; }
        else { mat = jetpackMat; typeStr = 'jetpack'; }
        
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(lane * LANE_WIDTH, 2, zPos + 10);
        mesh.castShadow = true;
        scene.add(mesh);
        activePowerupMeshes.push({ mesh, type: typeStr });
        return; // Don't spawn obstacle here
    }

    if (rand < 0.30) { // Train
        const lane = Math.floor(Math.random() * 3) - 1;
        const group = new THREE.Group();
        
        const trainGeo = new THREE.BoxGeometry(3.6, 5, 14);
        const trainBody = new THREE.Mesh(trainGeo, trainMaterial);
        trainBody.position.y = 3;
        trainBody.castShadow = true;
        group.add(trainBody);

        const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 3.8, 16);
        const wheelMat = new THREE.MeshStandardMaterial({color: 0x111111});
        for(let w of [-5, -2, 2, 5]) {
            const wheel = new THREE.Mesh(wheelGeo, wheelMat);
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(0, 0.5, w);
            group.add(wheel);
        }

        group.position.set(lane * LANE_WIDTH, 0, zPos + 10);
        scene.add(group);
        
        const hitGeo = new THREE.BoxGeometry(3.6, 5, 14);
        const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({visible:false}));
        hitMesh.position.set(lane * LANE_WIDTH, 3, zPos + 10);
        scene.add(hitMesh);

        obstacles.push({ mesh: hitMesh, visual: group, type: 'train' });
    } else if (rand < 0.65) { // Barricade
        const lane = Math.floor(Math.random() * 3) - 1;
        const group = new THREE.Group();
        
        const barGeo = new THREE.BoxGeometry(4, 1.2, 0.5);
        const bar = new THREE.Mesh(barGeo, barricadeMaterial);
        bar.position.set(0, 0.8, 0);
        bar.castShadow = true;
        group.add(bar);

        const legGeo = new THREE.BoxGeometry(0.2, 1.4, 0.8);
        const legMat = new THREE.MeshStandardMaterial({color: 0x333333});
        const lLeg = new THREE.Mesh(legGeo, legMat);
        lLeg.position.set(-1.8, 0.7, 0);
        const rLeg = new THREE.Mesh(legGeo, legMat);
        rLeg.position.set(1.8, 0.7, 0);
        group.add(lLeg);
        group.add(rLeg);

        group.position.set(lane * LANE_WIDTH, 0, zPos + 10);
        scene.add(group);
        
        const hitGeo = new THREE.BoxGeometry(4, 1.4, 0.8);
        const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({visible: false}));
        hitMesh.position.set(lane * LANE_WIDTH, 0.7, zPos + 10);
        scene.add(hitMesh);
        
        obstacles.push({ mesh: hitMesh, visual: group, type: 'barricade' });
        
        if (Math.random() > 0.4) spawnCoin(lane, 3.8, zPos + 10);
    } else if (rand < 0.95) { // Coins
        const lane = Math.floor(Math.random() * 3) - 1;
        // If Jetpack is active, don't spawn coins on ground normally? Or just let them be.
        for (let i = 0; i < 4; i++) spawnCoin(lane, 1.5, zPos + 5 + (i * 3));
    }
}

function spawnCoin(lane, yPos, zPos) {
    const coinGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.15, 16);
    const coin = new THREE.Mesh(coinGeo, coinMaterial);
    coin.rotation.x = Math.PI / 2;
    coin.rotation.z = Math.random() * Math.PI;
    coin.position.set(lane * LANE_WIDTH, yPos, zPos);
    coin.castShadow = true;
    scene.add(coin);
    coins.push(coin);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
    if (!isPlaying) return;

    switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
            if (currentLane < 1) {
                currentLane++;
                player.rotation.z = 0.3;
                setTimeout(() => player.rotation.z = 0, 200);
            }
            break;
        case 'ArrowRight':
        case 'KeyD':
            if (currentLane > -1) {
                currentLane--;
                player.rotation.z = -0.3;
                setTimeout(() => player.rotation.z = 0, 200);
            }
            break;
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
            // Jetpack disables jumping
            if (!isJumping && !isRolling && activeBuffs.jetpack <= 0) {
                isJumping = true;
                yVelocity = JUMP_FORCE;
            }
            break;
        case 'ArrowDown':
        case 'KeyS':
            if (!isJumping && !isRolling && activeBuffs.jetpack <= 0) {
                isRolling = true;
                rollTimer = 0.8;
                player.rotation.x = Math.PI / 2 + 0.3; 
                player.position.y -= 0.5;
            } else if (isJumping) {
                yVelocity = -JUMP_FORCE * 2.0; 
            }
            break;
    }
}

function startGame() {
    startScreen.classList.remove('active');
    isPlaying = true;
    lastTime = performance.now();
}

function resetGame() {
    trackSegments.forEach(seg => scene.remove(seg.mesh));
    sceneries.forEach(sc => scene.remove(sc));
    obstacles.forEach(obs => {
        scene.remove(obs.mesh);
        if (obs.visual) scene.remove(obs.visual);
    });
    coins.forEach(c => scene.remove(c));
    activePowerupMeshes.forEach(p => scene.remove(p.mesh));

    trackSegments = [];
    sceneries = [];
    obstacles = [];
    coins = [];
    activePowerupMeshes = [];
    activePowerupsContainer.innerHTML = '';
    
    // Reset Zone
    currentZone = 0;
    groundMaterial.map = zoneTextures.grass;
    trackMaterial.map = zoneTextures.track0;
    scene.background.setHex(0x7ec0ee);
    scene.fog.color.setHex(0x7ec0ee);

    isPlaying = true;
    distance = 0;
    coinsCollected = 0;
    gameSpeed = 25;
    currentLane = 0;
    copCurrentLane = 0;
    
    // Reset Buffs
    activeBuffs = { magnet: 0, multiplier: 0, jetpack: 0 };

    player.position.set(0, 0, 0);
    player.rotation.set(0, Math.PI, 0);
    isJumping = false;
    isRolling = false;
    isStumbling = false;
    stumbleTimer = 0;
    yVelocity = 0;

    cop.position.set(0, 0, -10); 
    
    for (let i = -2; i < 15; i++) spawnTrackSegment(i * 20);
    
    camera.position.z = player.position.z - 15;
    camera.position.y = player.position.y + 8;
    camera.position.x = player.position.x * 0.5;
    camera.lookAt(player.position.x * 0.2, 3, player.position.z + 30);
    
    updateUI();
    gameOverScreen.classList.remove('active');
    lastTime = performance.now();
}

function updateUI() {
    distanceEl.innerText = Math.floor(distance) + 'm';
    coinsEl.innerText = coinsCollected;
}

function gameOver() {
    isPlaying = false;
    totalCoins += coinsCollected;
    localStorage.setItem('indianSurferTotalCoins', totalCoins);
    if(totalCoinsEl) totalCoinsEl.innerText = totalCoins;
    
    finalDistanceEl.innerText = Math.floor(distance);
    finalCoinsEl.innerText = coinsCollected;
    gameOverScreen.classList.add('active');
}

function updateCamera() {
    const targetZ = player.position.z - 15;
    // Camera pulls back slightly when Jetpack is active
    const targetY = player.position.y + (activeBuffs.jetpack > 0 ? 12 : 8);
    const targetX = player.position.x * 0.5;

    camera.position.z += (targetZ - camera.position.z) * 0.2;
    camera.position.y += (targetY - camera.position.y) * 0.1;
    camera.position.x += (targetX - camera.position.x) * 0.1;
    camera.lookAt(player.position.x * 0.2, player.position.y + 3, player.position.z + 30);
}

function getPlayerHitbox() {
    const box = new THREE.Box3();
    const size = isRolling ? new THREE.Vector3(1.2, 1.2, 2.5) : new THREE.Vector3(1.2, 3.0, 1.2);
    const center = player.position.clone();
    center.y += size.y / 2;
    box.setFromCenterAndSize(center, size);
    box.expandByScalar(-0.2); 
    return box;
}

function activatePowerup(type) {
    // Base 5 seconds + 2.5 seconds per upgrade level
    const duration = 5 + (upgrades[type] * 2.5);
    activeBuffs[type] = duration;
    
    // Add UI
    const existing = document.getElementById(`hud-${type}`);
    if(!existing) {
        const div = document.createElement('div');
        div.id = `hud-${type}`;
        div.className = `powerup-indicator ${type}`;
        div.innerHTML = `
            <strong>${type.toUpperCase()}</strong>
            <div class="powerup-bar-bg"><div class="powerup-bar-fill" id="fill-${type}"></div></div>
        `;
        activePowerupsContainer.appendChild(div);
    }
}

function checkMapZones() {
    let newZone = currentZone;
    if(distance > 1000) newZone = 2; // Tunnel
    else if(distance > 500) newZone = 1; // Bazaar
    
    if(newZone !== currentZone) {
        currentZone = newZone;
        if(currentZone === 1) {
            groundMaterial.map = zoneTextures.bazaar;
            trackMaterial.map = zoneTextures.track1;
            scene.background.setHex(0xe6cda3); // Dusty sky
            scene.fog.color.setHex(0xe6cda3);
        } else if(currentZone === 2) {
            groundMaterial.map = zoneTextures.tunnel;
            trackMaterial.map = zoneTextures.track2;
            scene.background.setHex(0x050505); // Dark tunnel
            scene.fog.color.setHex(0x050505);
        }
        groundMaterial.needsUpdate = true;
        trackMaterial.needsUpdate = true;
    }
}

function animate(time) {
    requestAnimationFrame(animate);

    let dt = clock.getDelta(); 
    dt = Math.min(dt, 0.1); 
    
    if (playerMixer && isPlaying) playerMixer.update(dt * (gameSpeed/20));
    if (copMixer && isPlaying) copMixer.update(dt * (gameSpeed/20));

    if (!isPlaying) {
        renderer.render(scene, camera);
        return;
    }

    // Process Active Powerups
    ['magnet', 'multiplier', 'jetpack'].forEach(type => {
        if(activeBuffs[type] > 0) {
            activeBuffs[type] -= dt;
            const fill = document.getElementById(`fill-${type}`);
            if(fill) {
                const max = 5 + (upgrades[type] * 2.5);
                fill.style.transform = `scaleX(${Math.max(0, activeBuffs[type] / max)})`;
            }
            if(activeBuffs[type] <= 0) {
                const el = document.getElementById(`hud-${type}`);
                if(el) el.remove();
            }
        }
    });

    // Jetpack physics override
    if (activeBuffs.jetpack > 0) {
        player.position.y += (12 - player.position.y) * 5 * dt; // Fly up to y=12
        
        // Spawn sky coins dynamically in front of player
        if (Math.random() < 0.1) {
            spawnCoin(currentLane, 12, player.position.z + 50);
        }
    } else if (player.position.y > 0 && !isJumping) {
        // Fall back down smoothly when jetpack ends
        yVelocity -= 30 * dt;
        player.position.y += yVelocity * dt;
        if(player.position.y <= 0) {
            player.position.y = 0;
            yVelocity = 0;
        }
    }

    let currentSpeed = gameSpeed;
    if (isStumbling && activeBuffs.jetpack <= 0) {
        stumbleTimer -= dt;
        currentSpeed = gameSpeed * 0.5;
        if (stumbleTimer <= 0) isStumbling = false;
    }

    // Distance Score (Multiplier buff applied)
    const distGain = (currentSpeed * dt) / 5;
    distance += (activeBuffs.multiplier > 0) ? distGain * 2 : distGain;
    
    player.position.z += currentSpeed * dt;
    
    if (!isStumbling) gameSpeed += dt * 0.25;

    const targetX = currentLane * LANE_WIDTH;
    player.position.x += (targetX - player.position.x) * 15 * dt;

    if (isJumping && activeBuffs.jetpack <= 0) {
        yVelocity += GRAVITY * dt;
        player.position.y += yVelocity * dt;
        if (player.position.y <= 0) {
            player.position.y = 0;
            isJumping = false;
            yVelocity = 0;
        }
    }

    if (isRolling && activeBuffs.jetpack <= 0) {
        rollTimer -= dt;
        if (rollTimer <= 0) {
            isRolling = false;
            player.rotation.x = 0;
            if(!isJumping) player.position.y = 0;
        }
    }

    // Cop Logic (Doesn't fly with jetpack)
    let copSpeed = gameSpeed;
    const distToPlayer = player.position.z - cop.position.z;
    
    if (isStumbling && activeBuffs.jetpack <= 0) {
        copSpeed = gameSpeed + 12;
    } else {
        if (distToPlayer > 12) copSpeed = gameSpeed + 6;
        else if (distToPlayer < 8) copSpeed = gameSpeed - 3;
    }
    
    cop.position.z += copSpeed * dt;
    
    if (Math.abs(cop.position.x - targetX) > 0.1) {
        if (copCurrentLane !== currentLane) copCurrentLane = currentLane;
    }
    cop.position.x += ((copCurrentLane * LANE_WIDTH) - cop.position.x) * 6 * dt;

    if (distToPlayer <= 1.5 && activeBuffs.jetpack <= 0 && player.position.y < 3) {
        gameOver(); 
    }

    updateCamera();
    checkMapZones();

    // Cleanup World
    const lastSeg = trackSegments[trackSegments.length - 1];
    if (player.position.z + 150 > lastSeg.zEnd) spawnTrackSegment(lastSeg.zEnd);

    for (let i = trackSegments.length - 1; i >= 0; i--) {
        if (trackSegments[i].zEnd < player.position.z - 40) {
            scene.remove(trackSegments[i].mesh);
            trackSegments.splice(i, 1);
        }
    }

    for (let i = sceneries.length - 1; i >= 0; i--) {
        if (sceneries[i].position.z < player.position.z - 40) {
            scene.remove(sceneries[i]);
            sceneries.splice(i, 1);
        }
    }

    // Collisions
    const playerBox = getPlayerHitbox();

    for (let i = coins.length - 1; i >= 0; i--) {
        const coin = coins[i];
        coin.rotation.z += 4 * dt;
        
        // Magnet Logic
        if(activeBuffs.magnet > 0) {
            const dist = player.position.distanceTo(coin.position);
            if(dist < 20) {
                coin.position.lerp(player.position, 12 * dt);
            }
        }
        
        const coinBox = new THREE.Box3().setFromObject(coin);
        if (playerBox.intersectsBox(coinBox)) {
            scene.remove(coin);
            coins.splice(i, 1);
            coinsCollected += 10;
        } else if (coin.position.z < player.position.z - 10) {
            scene.remove(coin);
            coins.splice(i, 1);
        }
    }

    for (let i = activePowerupMeshes.length - 1; i >= 0; i--) {
        const pObj = activePowerupMeshes[i];
        pObj.mesh.rotation.y += 2 * dt;
        pObj.mesh.position.y = 2 + Math.sin(time/200) * 0.5;

        const pBox = new THREE.Box3().setFromObject(pObj.mesh);
        if (playerBox.intersectsBox(pBox)) {
            activatePowerup(pObj.type);
            scene.remove(pObj.mesh);
            activePowerupMeshes.splice(i, 1);
        } else if (pObj.mesh.position.z < player.position.z - 10) {
            scene.remove(pObj.mesh);
            activePowerupMeshes.splice(i, 1);
        }
    }

    // Only process obstacles if not flying on Jetpack
    if(activeBuffs.jetpack <= 0) {
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            const obsBox = new THREE.Box3().setFromObject(obs.mesh);
            
            if (obs.type === 'train') {
                obsBox.min.x += 0.3; obsBox.max.x -= 0.3;
            } else {
                obsBox.max.y -= 0.3;
            }

            if (playerBox.intersectsBox(obsBox)) {
                if (obs.type === 'train') {
                    gameOver();
                } else {
                    isStumbling = true;
                    stumbleTimer = 1.0; 
                    
                    scene.remove(obs.mesh);
                    if (obs.visual) scene.remove(obs.visual);
                    obstacles.splice(i, 1);
                    
                    player.rotation.z = (Math.random() > 0.5 ? 1 : -1) * 0.3;
                    setTimeout(() => player.rotation.z = 0, 300);
                }
                continue;
            }

            if (obs.mesh.position.z < player.position.z - 15) {
                scene.remove(obs.mesh);
                if (obs.visual) scene.remove(obs.visual);
                obstacles.splice(i, 1);
            }
        }
    }

    updateUI();
    renderer.render(scene, camera);
}

init();
