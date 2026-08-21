// Global THREE is loaded from index.html

// --- Procedural Texture Generation ---
function createCanvas(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    return canvas;
}

// 1. Warm Golden Railway Ballast Bed
function createBallastTexture() {
    const canvas = createCanvas(512);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#dfbe88'; // Warm sand/gravel base
    ctx.fillRect(0, 0, 512, 512);

    for(let i = 0; i < 22000; i++) {
        const r = Math.random();
        ctx.fillStyle = r > 0.6 ? '#caa56f' : (r > 0.3 ? '#eed6ac' : '#b38f58');
        ctx.fillRect(Math.random()*512, Math.random()*512, Math.random()*3+1, Math.random()*3+1);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
}

// 2. Terracotta Parapet Corridor Walls
function createWallTexture() {
    const canvas = createCanvas(512);
    const ctx = canvas.getContext('2d');
    
    // Terracotta red brick/stone body
    ctx.fillStyle = '#b85437';
    ctx.fillRect(0, 0, 512, 512);

    // Stone block mortar lines
    ctx.strokeStyle = '#8c3a22';
    ctx.lineWidth = 4;
    for (let y = 0; y < 512; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();

        const offset = (y / 48) % 2 === 0 ? 0 : 40;
        for (let x = offset; x < 512; x += 80) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + 48);
            ctx.stroke();
        }
    }

    // Top Cream/Stone Coping Cap
    ctx.fillStyle = '#f5ebdc';
    ctx.fillRect(0, 0, 512, 44);
    ctx.fillStyle = '#dfd3be';
    ctx.fillRect(0, 40, 512, 6);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 1);
    return tex;
}

// 3. Dark Treated Railway Sleeper (Tie) Wood
function createWoodTexture() {
    const canvas = createCanvas(256);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#452b1a';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#2d1a0d';
    ctx.lineWidth = 2;
    for(let i=0; i<60; i++) {
        ctx.beginPath();
        let y = Math.random() * 256;
        ctx.moveTo(0, y);
        ctx.lineTo(256, y + (Math.random()-0.5)*15);
        ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
}

// 4. Chunky Gold Coin with 5-Point Star
function createCoinStarTexture() {
    const canvas = createCanvas(256);
    const ctx = canvas.getContext('2d');
    
    // Gold gradient disc
    const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 128);
    grad.addColorStop(0, '#fff380');
    grad.addColorStop(0.6, '#ffd700');
    grad.addColorStop(0.9, '#e69500');
    grad.addColorStop(1, '#b36b00');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Coin outer ring
    ctx.strokeStyle = '#fff8b3';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(128, 128, 110, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#b36b00';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(128, 128, 98, 0, Math.PI * 2);
    ctx.stroke();

    // 5-Point Golden Star in Center
    ctx.fillStyle = '#fff9d6';
    ctx.beginPath();
    const cx = 128, cy = 128, outerR = 55, innerR = 24;
    for (let i = 0; i < 10; i++) {
        const r = (i % 2 === 0) ? outerR : innerR;
        const angle = (i * Math.PI / 5) - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

// 5. Radial Gold Light Halo for Ground Beneath Coin
function createCoinGlowTexture() {
    const canvas = createCanvas(128);
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 225, 60, 0.7)');
    grad.addColorStop(0.5, 'rgba(255, 180, 0, 0.35)');
    grad.addColorStop(1, 'rgba(255, 180, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
}

// 6. Orange & White Hazard Stripe Texture
function createOrangeStripeTexture() {
    const canvas = createCanvas(512);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f8fafc'; // Crisp reflective white
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#ea580c'; // Construction safety orange
    for(let i = -512; i < 1024; i += 72) {
        ctx.beginPath();
        ctx.moveTo(i, 0); 
        ctx.lineTo(i + 44, 0); 
        ctx.lineTo(i - 512 + 44, 512); 
        ctx.lineTo(i - 512, 512);
        ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 1);
    return tex;
}

// 7. Subway Surfers Metro Train Livery
function createSubwayTrainTexture(theme = 'orange') {
    const canvas = createCanvas(1024);
    const ctx = canvas.getContext('2d');

    const isRed = (theme === 'orange');
    const primaryColor = isRed ? '#e11d48' : '#2563eb';
    const darkSkirt = '#1e293b';

    // 1. Clean White Coach Body
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Dark Lower Chassis
    ctx.fillStyle = darkSkirt;
    ctx.fillRect(0, 800, 1024, 224);

    // 3. Bold Subway Surfers Signature Body Stripe
    ctx.fillStyle = primaryColor;
    ctx.fillRect(0, 380, 1024, 380);

    // Thin White Pinstripes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 360, 1024, 20);
    ctx.fillRect(0, 760, 1024, 20);

    // 4. Tinted Windows with Frames
    for (let x = 40; x < 1024; x += 150) {
        ctx.fillStyle = '#334155';
        ctx.fillRect(x, 420, 110, 220);

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x + 8, 428, 94, 204);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.moveTo(x + 15, 428);
        ctx.lineTo(x + 50, 428);
        ctx.lineTo(x + 25, 632);
        ctx.lineTo(x + 10, 632);
        ctx.fill();
    }

    // 5. Passenger Sliding Doors
    for (let d of [20, 880]) {
        ctx.fillStyle = '#334155';
        ctx.fillRect(d, 350, 90, 450);
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(d + 6, 360, 78, 430);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(d + 18, 420, 54, 160);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
}

// 8. 2x Multiplier Powerup Texture
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

// --- Game Variables ---
let scene, camera, renderer, dirLight, ambientLight;
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
const LANE_WIDTH = 3.6; // Subway Surfers standard 3-rail width

let yVelocity = 0;
const GRAVITY = -65;
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

// Persistent Data & Shop
let totalCoins = parseInt(localStorage.getItem('indianSurferTotalCoins')) || 0;
let upgrades = JSON.parse(localStorage.getItem('indianSurferUpgrades')) || {
    magnet: 1, multiplier: 1, jetpack: 1
};
let unlockedCharacters = JSON.parse(localStorage.getItem('indianSurferUnlockedChars')) || ['blue'];
let equippedCharacter = localStorage.getItem('indianSurferEquippedChar') || 'blue';
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
let ballastMaterial, wallMaterial, woodMaterial, railMaterial, orangeStripeMaterial;
let subwayRedMat, subwayBlueMat, coinStarMat, coinGlowMat, starMat;
let equippedMagnetMesh = null, equippedJetpackMesh = null;

function initMaterials() {
    ballastMaterial = new THREE.MeshStandardMaterial({ map: createBallastTexture(), roughness: 0.95 });
    wallMaterial = new THREE.MeshStandardMaterial({ map: createWallTexture(), roughness: 0.85 });
    woodMaterial = new THREE.MeshStandardMaterial({ map: createWoodTexture(), roughness: 0.9 });
    railMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.95, roughness: 0.15 });
    orangeStripeMaterial = new THREE.MeshStandardMaterial({ map: createOrangeStripeTexture(), roughness: 0.35 });

    subwayRedMat = new THREE.MeshStandardMaterial({ map: createSubwayTrainTexture('orange'), roughness: 0.25, metalness: 0.35 });
    subwayBlueMat = new THREE.MeshStandardMaterial({ map: createSubwayTrainTexture('blue'), roughness: 0.25, metalness: 0.35 });

    coinStarMat = createCoinStarTexture();
    coinGlowMat = createCoinGlowTexture();
    starMat = new THREE.MeshStandardMaterial({ map: createStarTexture(), roughness: 0.5 });
}

// --- Subway Surfers Classic Metro Train Mesh ---
function createModernTrainMesh(theme = 'orange') {
    const group = new THREE.Group();
    const isRed = (theme === 'orange');
    const primaryHex = isRed ? 0xe11d48 : 0x2563eb;

    // Materials
    const bodyMat = isRed ? subwayRedMat : subwayBlueMat;
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35, metalness: 0.2 });
    const cabFaceMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.4 });
    const bumperMat = new THREE.MeshStandardMaterial({ color: primaryHex, roughness: 0.4 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.9 });
    const yellowLightMat = new THREE.MeshStandardMaterial({ color: 0xfde047, emissive: 0xfacc15, emissiveIntensity: 2.0 });
    const redTailMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 1.5 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.3 });

    // 1. Main Train Coach Box Body
    const bodyGeo = new THREE.BoxGeometry(3.3, 3.8, 16);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 2.3, 0);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // 2. Rounded Curved White Roof Cap (Subway Surfers signature profile)
    const roofGeo = new THREE.CylinderGeometry(1.65, 1.65, 16.1, 24, 1, false, 0, Math.PI);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.z = Math.PI;
    roof.rotation.y = Math.PI / 2;
    roof.position.set(0, 4.2, 0);
    roof.castShadow = true;
    group.add(roof);

    // Roof Center Ribs & HVAC Units
    const ribGeo = new THREE.BoxGeometry(1.8, 0.25, 4.5);
    for (let rz of [-3.5, 3.5]) {
        const rib = new THREE.Mesh(ribGeo, metalMat);
        rib.position.set(0, 4.9, rz);
        group.add(rib);
    }

    // 3. Front Cab Face (-Z)
    const cabGeo = new THREE.BoxGeometry(3.26, 3.6, 0.4);
    const cab = new THREE.Mesh(cabGeo, cabFaceMat);
    cab.position.set(0, 2.4, -8.1);
    group.add(cab);

    // Twin Driver Windshield Windows
    const winGeo = new THREE.BoxGeometry(1.2, 1.3, 0.1);
    const lWin = new THREE.Mesh(winGeo, glassMat);
    lWin.position.set(-0.75, 2.9, -8.32);
    group.add(lWin);

    const rWin = new THREE.Mesh(winGeo, glassMat);
    rWin.position.set(0.75, 2.9, -8.32);
    group.add(rWin);

    // Front Bumper with Primary Color
    const bumpGeo = new THREE.BoxGeometry(3.32, 0.8, 0.6);
    const bump = new THREE.Mesh(bumpGeo, bumperMat);
    bump.position.set(0, 0.8, -8.25);
    bump.castShadow = true;
    group.add(bump);

    // Glowing Square LED Headlights
    const lightGeo = new THREE.BoxGeometry(0.5, 0.35, 0.1);
    const lLight = new THREE.Mesh(lightGeo, yellowLightMat);
    lLight.position.set(-0.95, 1.4, -8.38);
    group.add(lLight);

    const rLight = new THREE.Mesh(lightGeo, yellowLightMat);
    rLight.position.set(0.95, 1.4, -8.38);
    group.add(rLight);

    // Rear Red Tail Lights (+Z)
    const lTail = new THREE.Mesh(lightGeo, redTailMat);
    lTail.position.set(-0.95, 1.8, 8.05);
    group.add(lTail);

    const rTail = new THREE.Mesh(lightGeo, redTailMat);
    rTail.position.set(0.95, 1.8, 8.05);
    group.add(rTail);

    // 4. Undercarriage Bogies & Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 3.4, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
    for (let wz of [-5.5, -3.0, 3.0, 5.5]) {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(0, 0.45, wz);
        group.add(wheel);
    }

    return group;
}

// --- 3D Sloped Train Ramp ---
function createTrainRampMesh() {
    const group = new THREE.Group();

    const rampAngle = Math.atan2(4.75, 8.5);
    const rampHypot = Math.sqrt(4.75 * 4.75 + 8.5 * 8.5);

    const woodDeckMat = new THREE.MeshStandardMaterial({ 
        map: woodMaterial.map, 
        roughness: 0.7 
    });
    const stripeMat = new THREE.MeshStandardMaterial({
        map: orangeStripeMaterial.map,
        roughness: 0.35
    });
    const steelMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.8,
        roughness: 0.3
    });

    const deckGeo = new THREE.BoxGeometry(3.3, 0.2, rampHypot);
    const deck = new THREE.Mesh(deckGeo, woodDeckMat);
    deck.rotation.x = -rampAngle;
    deck.position.set(0, 2.38, -4.25);
    deck.castShadow = true;
    deck.receiveShadow = true;
    group.add(deck);

    const curbGeo = new THREE.BoxGeometry(0.25, 0.45, rampHypot);
    for (let cx of [-1.55, 1.55]) {
        const curb = new THREE.Mesh(curbGeo, stripeMat);
        curb.rotation.x = -rampAngle;
        curb.position.set(cx, 2.5, -4.25);
        curb.castShadow = true;
        group.add(curb);
    }

    for (let z of [-2, -4, -6]) {
        const h = ((8.5 + z) / 8.5) * 4.6;
        const postGeo = new THREE.BoxGeometry(3.2, h, 0.25);
        const post = new THREE.Mesh(postGeo, steelMat);
        post.position.set(0, h / 2, z);
        post.castShadow = true;
        group.add(post);
    }

    return group;
}

// --- Overhead Signal Gantry Arch ---
function createGantryArch() {
    const g = new THREE.Group();
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.3 });
    
    // Left & Right upright posts
    const postGeo = new THREE.BoxGeometry(0.3, 7.5, 0.3);
    const lPost = new THREE.Mesh(postGeo, steelMat);
    lPost.position.set(-6.3, 3.75, 0);
    g.add(lPost);

    const rPost = new THREE.Mesh(postGeo, steelMat);
    rPost.position.set(6.3, 3.75, 0);
    g.add(rPost);

    // Cross beam
    const beamGeo = new THREE.BoxGeometry(13.2, 0.35, 0.35);
    const beam = new THREE.Mesh(beamGeo, steelMat);
    beam.position.set(0, 7.2, 0);
    g.add(beam);

    // 3 Traffic Signal Lanterns
    const signalGeo = new THREE.BoxGeometry(0.4, 0.8, 0.3);
    const greenLightMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 2.0 });
    for (let laneIdx of [-1, 0, 1]) {
        const signal = new THREE.Mesh(signalGeo, steelMat);
        signal.position.set(laneIdx * LANE_WIDTH, 6.7, 0);
        g.add(signal);

        const lightGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const light = new THREE.Mesh(lightGeo, greenLightMat);
        light.position.set(laneIdx * LANE_WIDTH, 6.6, -0.16);
        g.add(light);
    }

    return g;
}

// --- Subway Surfers 3D Palm Tree ---
function createSubwayPalmTree() {
    const group = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6, side: THREE.DoubleSide });

    let curY = 0, curX = 0;
    const curveDir = (Math.random() - 0.5) * 0.35;
    for (let s = 0; s < 6; s++) {
        const segGeo = new THREE.CylinderGeometry(0.45 - (s * 0.04), 0.52 - (s * 0.04), 1.6, 10);
        const seg = new THREE.Mesh(segGeo, trunkMat);
        seg.position.set(curX, curY + 0.8, 0);
        seg.rotation.z = curveDir;
        seg.castShadow = true;
        group.add(seg);
        curY += 1.5;
        curX += curveDir * 1.5;
    }

    const frondGeo = new THREE.PlaneGeometry(2.2, 5.0);
    for (let k = 0; k < 8; k++) {
        const angle = (k / 8) * Math.PI * 2;
        const frond = new THREE.Mesh(frondGeo, leafMat);
        frond.position.set(curX + Math.cos(angle) * 1.2, curY + 0.2, Math.sin(angle) * 1.2);
        frond.rotation.y = angle;
        frond.rotation.x = Math.PI / 3.2;
        frond.castShadow = true;
        group.add(frond);
    }

    group.scale.set(1.4, 1.4, 1.4);
    return group;
}

// --- Subway Surfers Coastal Bazaar House (Exact match to screenshot) ---
function createTropicalBuilding() {
    const group = new THREE.Group();

    // Vibrant warm color palette from the screenshot
    const wallColors = [0xd97736, 0xe06d2d, 0xc25e26, 0xd4803d];
    const wallColor = wallColors[Math.floor(Math.random() * wallColors.length)];

    const stuccoMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.85 });
    const woodBeamMat = new THREE.MeshStandardMaterial({ color: 0x3e2415, roughness: 0.85 });
    const roofSlateMat = new THREE.MeshStandardMaterial({ color: 0x696975, roughness: 0.6, metalness: 0.25 });
    const roofDarkMat = new THREE.MeshStandardMaterial({ color: 0x4a4a55, roughness: 0.65 });
    const tealSidingMat = new THREE.MeshStandardMaterial({ color: 0x2e6f7d, roughness: 0.5, metalness: 0.3 });
    const redAwningMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.7 });
    const windowDarkMat = new THREE.MeshStandardMaterial({ color: 0x450a0a, roughness: 0.9 });
    const palmLeafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6, side: THREE.DoubleSide });

    const houseW = 6.8;
    const houseH = 7.0;
    const houseD = 9.5;

    // 1. Main Terracotta / Ochre Stucco House Block
    const mainGeo = new THREE.BoxGeometry(houseW, houseH, houseD);
    const mainMesh = new THREE.Mesh(mainGeo, stuccoMat);
    mainMesh.position.set(0, houseH / 2, 0);
    mainMesh.castShadow = true;
    mainMesh.receiveShadow = true;
    group.add(mainMesh);

    // 2. Teal / Turquoise Corrugated Stall Front Panel
    const panelGeo = new THREE.BoxGeometry(0.2, 3.2, houseD * 0.75);
    const panel = new THREE.Mesh(panelGeo, tealSidingMat);
    panel.position.set(-houseW / 2 - 0.08, 1.6, 0);
    panel.castShadow = true;
    group.add(panel);

    // Horizontal ridge lines on teal panel
    for (let py = 0.5; py < 3.2; py += 0.5) {
        const ridgeGeo = new THREE.BoxGeometry(0.24, 0.08, houseD * 0.75);
        const ridge = new THREE.Mesh(ridgeGeo, woodBeamMat);
        ridge.position.set(-houseW / 2 - 0.1, py, 0);
        group.add(ridge);
    }

    // 3. Narrow Vertical Window Slots with dark red trim
    for (let wz of [-2.8, 0, 2.8]) {
        const winGeo = new THREE.BoxGeometry(0.15, 1.8, 0.65);
        const win = new THREE.Mesh(winGeo, windowDarkMat);
        win.position.set(-houseW / 2 - 0.06, 5.0, wz);
        group.add(win);
    }

    // 4. Large Sloped Overhanging Slate / Corrugated Tin Roof
    const roofAngle = Math.PI / 8.0; // ~22.5 degree slope toward tracks
    const roofLen = 6.8;
    const roofDepth = houseD + 1.2;

    const roofGeo = new THREE.BoxGeometry(roofLen, 0.22, roofDepth);
    const roof = new THREE.Mesh(roofGeo, roofSlateMat);
    roof.rotation.z = -roofAngle;
    roof.position.set(-0.8, houseH + 0.6, 0);
    roof.castShadow = true;
    roof.receiveShadow = true;
    group.add(roof);

    // Stepped Corrugated Overlap Ridges along the roof
    for (let rz = -roofDepth / 2 + 1.2; rz < roofDepth / 2; rz += 2.4) {
        const ridgeGeo = new THREE.BoxGeometry(roofLen + 0.1, 0.12, 0.25);
        const ridge = new THREE.Mesh(ridgeGeo, roofDarkMat);
        ridge.rotation.z = -roofAngle;
        ridge.position.set(-0.8, houseH + 0.75, rz);
        group.add(ridge);
    }

    // Dark Timber Rafter / Fascia along lower roof edge
    const fasciaGeo = new THREE.BoxGeometry(0.3, 0.35, roofDepth);
    const fascia = new THREE.Mesh(fasciaGeo, woodBeamMat);
    fascia.rotation.z = -roofAngle;
    fascia.position.set(-roofLen / 2 - 0.8, houseH + 0.6 - (Math.sin(roofAngle) * roofLen / 2), 0);
    group.add(fascia);

    // 5. Heavy Angled Wooden Support Posts / Timber Pillars
    for (let pz of [-houseD / 2 + 0.8, houseD / 2 - 0.8]) {
        const postGeo = new THREE.BoxGeometry(0.22, 4.8, 0.22);
        const post = new THREE.Mesh(postGeo, woodBeamMat);
        post.position.set(-houseW / 2 - 0.8, 2.4, pz);
        post.castShadow = true;
        group.add(post);

        const braceGeo = new THREE.BoxGeometry(0.18, 1.4, 0.18);
        const brace = new THREE.Mesh(braceGeo, woodBeamMat);
        brace.position.set(-houseW / 2 - 0.4, 4.2, pz);
        brace.rotation.z = Math.PI / 4;
        group.add(brace);
    }

    // 6. Secondary Red Cloth / Canvas Awning Overhang
    const clothAwningGeo = new THREE.BoxGeometry(1.8, 0.15, 3.6);
    const clothAwning = new THREE.Mesh(clothAwningGeo, redAwningMat);
    clothAwning.rotation.z = -Math.PI / 6;
    clothAwning.position.set(-houseW / 2 - 0.6, 3.6, 1.0);
    clothAwning.castShadow = true;
    group.add(clothAwning);

    // 7. Stylized Palm Fronds Peeking Directly Over the Roof
    const palmFrondGeo = new THREE.PlaneGeometry(3.2, 6.2);
    for (let k = 0; k < 6; k++) {
        const angle = (k / 6) * Math.PI - (Math.PI / 6);
        const frond = new THREE.Mesh(palmFrondGeo, palmLeafMat);
        frond.position.set(1.6 + Math.cos(angle) * 1.5, houseH + 2.2 + Math.sin(angle) * 0.8, (k - 3) * 1.3);
        frond.rotation.y = angle;
        frond.rotation.x = Math.PI / 4;
        frond.castShadow = true;
        group.add(frond);
    }

    return group;
}

// --- Type III 3-Rail Highway Barricade ---
function createType3Barricade() {
    const group = new THREE.Group();
    const plankGeo = new THREE.BoxGeometry(3.6, 0.65, 0.08);
    const postGeo = new THREE.BoxGeometry(0.12, 3.4, 0.12);
    const footGeo = new THREE.BoxGeometry(0.12, 0.12, 1.6);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 });

    for (let y of [0.9, 1.9, 2.9]) {
        const plank = new THREE.Mesh(plankGeo, orangeStripeMaterial);
        plank.position.set(0, y, 0);
        plank.castShadow = true;
        plank.receiveShadow = true;
        group.add(plank);
    }

    for (let x of [-1.35, 1.35]) {
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.set(x, 1.7, -0.08);
        post.castShadow = true;
        group.add(post);

        const foot = new THREE.Mesh(footGeo, postMat);
        foot.position.set(x, 0.06, 0);
        foot.castShadow = true;
        group.add(foot);
    }

    return { group, height: 3.4, hitboxY: 1.7, hitboxH: 3.4 };
}

// --- Standard Hurdle Barricade ---
function createStandardBarricade() {
    const group = new THREE.Group();
    const plankGeo = new THREE.BoxGeometry(3.6, 0.6, 0.08);
    const plank = new THREE.Mesh(plankGeo, orangeStripeMaterial);
    plank.position.set(0, 0.9, 0);
    plank.castShadow = true;
    group.add(plank);

    const postGeo = new THREE.BoxGeometry(0.12, 1.4, 0.12);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 });
    for (let x of [-1.35, 1.35]) {
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.set(x, 0.7, 0);
        post.castShadow = true;
        group.add(post);
    }

    return { group, height: 1.4, hitboxY: 0.7, hitboxH: 1.4 };
}

// --- 3D Horseshoe Magnet Pickup Mesh ---
function createMagnetPickupMesh() {
    const group = new THREE.Group();
    
    const magnetRedMat = new THREE.MeshStandardMaterial({ 
        color: 0xee1522, 
        metalness: 0.5, 
        roughness: 0.2, 
        emissive: 0x440008, 
        emissiveIntensity: 0.4 
    });
    const magnetSilverMat = new THREE.MeshStandardMaterial({ 
        color: 0xf1f5f9, 
        metalness: 0.95, 
        roughness: 0.1 
    });

    const extrudeSettings = {
        depth: 0.35,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04,
        curveSegments: 32
    };

    const redShape = new THREE.Shape();
    redShape.moveTo(0.42, -0.35);
    redShape.lineTo(0.78, -0.35);
    redShape.absarc(0, 0.1, 0.78, 0, Math.PI, false);
    redShape.lineTo(-0.78, -0.35);
    redShape.lineTo(-0.42, -0.35);
    redShape.absarc(0, 0.1, 0.42, Math.PI, 0, true);
    redShape.closePath();

    const redGeo = new THREE.ExtrudeGeometry(redShape, extrudeSettings);
    redGeo.center();
    const redMesh = new THREE.Mesh(redGeo, magnetRedMat);
    redMesh.castShadow = true;
    redMesh.receiveShadow = true;
    group.add(redMesh);

    const tipShape = new THREE.Shape();
    tipShape.moveTo(-0.18, -0.2);
    tipShape.lineTo(0.18, -0.2);
    tipShape.lineTo(0.18, 0.2);
    tipShape.lineTo(-0.18, 0.2);
    tipShape.closePath();

    const tipGeo = new THREE.ExtrudeGeometry(tipShape, extrudeSettings);
    tipGeo.center();

    const leftTip = new THREE.Mesh(tipGeo, magnetSilverMat);
    leftTip.position.set(-0.60, -0.65, 0);
    leftTip.castShadow = true;
    leftTip.receiveShadow = true;
    group.add(leftTip);

    const rightTip = new THREE.Mesh(tipGeo, magnetSilverMat);
    rightTip.position.set(0.60, -0.65, 0);
    rightTip.castShadow = true;
    rightTip.receiveShadow = true;
    group.add(rightTip);

    group.scale.set(1.3, 1.3, 1.3);
    return group;
}

// --- 3D Dual-Thruster Sci-Fi Jetpack Pickup Mesh ---
function createJetpackPickupMesh() {
    const group = new THREE.Group();

    const chromeMat = new THREE.MeshStandardMaterial({ 
        color: 0xd8e2ed, 
        metalness: 0.92, 
        roughness: 0.15 
    });
    const goldMat = new THREE.MeshStandardMaterial({ 
        color: 0xd4af37, 
        metalness: 0.85, 
        roughness: 0.25 
    });
    const darkMat = new THREE.MeshStandardMaterial({ 
        color: 0x222a35, 
        metalness: 0.8, 
        roughness: 0.4 
    });
    const flameMat = new THREE.MeshStandardMaterial({ 
        color: 0xff7700, 
        emissive: 0xff5500, 
        emissiveIntensity: 2.5 
    });

    const coreGeo = new THREE.BoxGeometry(0.65, 0.9, 0.45);
    const core = new THREE.Mesh(coreGeo, goldMat);
    core.castShadow = true;
    group.add(core);

    const topCowlGeo = new THREE.BoxGeometry(0.55, 0.25, 0.4);
    topCowl = new THREE.Mesh(topCowlGeo, darkMat);
    topCowl.position.set(0, 0.5, 0);
    group.add(topCowl);

    const barGeo = new THREE.BoxGeometry(1.3, 0.18, 0.3);
    const bar = new THREE.Mesh(barGeo, darkMat);
    group.add(bar);

    for (let x of [-0.62, 0.62]) {
        const cylinderGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.3, 20);
        const nacelle = new THREE.Mesh(cylinderGeo, chromeMat);
        nacelle.position.set(x, 0, 0);
        nacelle.castShadow = true;
        group.add(nacelle);

        const coneGeo = new THREE.ConeGeometry(0.24, 0.45, 20);
        const noseCone = new THREE.Mesh(coneGeo, chromeMat);
        noseCone.position.set(x, 0.85, 0);
        group.add(noseCone);

        const nozzleGeo = new THREE.CylinderGeometry(0.2, 0.27, 0.3, 20);
        const nozzle = new THREE.Mesh(nozzleGeo, darkMat);
        nozzle.position.set(x, -0.75, 0);
        group.add(nozzle);

        const flameGeo = new THREE.ConeGeometry(0.18, 0.65, 16);
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.set(x, -1.15, 0);
        flame.rotation.x = Math.PI;
        group.add(flame);
    }

    group.scale.set(1.2, 1.2, 1.2);
    return group;
}

// --- 3D 2X Multiplier Star Pickup Mesh ---
function createMultiplierPickupMesh() {
    const group = new THREE.Group();

    const starShape = new THREE.Shape();
    const points = 5;
    const outerRadius = 0.65;
    const innerRadius = 0.28;

    for (let i = 0; i < points * 2; i++) {
        const r = (i % 2 === 0) ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) starShape.moveTo(x, y);
        else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const extrudeSettings = {
        depth: 0.25,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.05,
        bevelThickness: 0.05
    };

    const starGeo = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
    starGeo.center();

    const starGoldMat = new THREE.MeshStandardMaterial({
        color: 0xffcc00,
        emissive: 0x664400,
        emissiveIntensity: 0.8,
        metalness: 0.85,
        roughness: 0.15
    });

    const starMesh = new THREE.Mesh(starGeo, starGoldMat);
    starMesh.castShadow = true;
    group.add(starMesh);

    const ringGeo = new THREE.TorusGeometry(0.9, 0.08, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: 0x884400,
        emissiveIntensity: 1.0,
        metalness: 0.8
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    group.add(ring);

    group.scale.set(1.2, 1.2, 1.2);
    return group;
}

function loadModels(callback) {
    const loader = new THREE.GLTFLoader();
    const url = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/Soldier.glb';
    
    loader.load(url, (gltfPlayer) => {
        player = gltfPlayer.scene;
        player.scale.set(1.5, 1.5, 1.5);
        player.rotation.y = Math.PI; 
        
        let initialColor = 0xffea00; // Bright yellow default
        if (equippedCharacter === 'red') initialColor = 0xe74c3c;
        else if (equippedCharacter === 'green') initialColor = 0x2ecc71;
        else if (equippedCharacter === 'gold') initialColor = 0xf1c40f;

        player.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = child.material.clone();
                child.material.color.setHex(initialColor);
            }
        });

        // 1. Equipped Magnet (Held in Right Hand)
        equippedMagnetMesh = createMagnetPickupMesh();
        equippedMagnetMesh.scale.set(0.35, 0.35, 0.35);
        equippedMagnetMesh.position.set(-0.5, 0.9, -0.15);
        equippedMagnetMesh.rotation.set(0, Math.PI / 2, Math.PI / 2);
        equippedMagnetMesh.visible = false;
        player.add(equippedMagnetMesh);

        // 2. Equipped Jetpack (Mounted on Back)
        equippedJetpackMesh = createJetpackPickupMesh();
        equippedJetpackMesh.scale.set(0.65, 0.65, 0.65);
        equippedJetpackMesh.position.set(0, 1.25, 0.32);
        equippedJetpackMesh.rotation.set(0, 0, 0);
        equippedJetpackMesh.visible = false;
        player.add(equippedJetpackMesh);

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
    scene.background = new THREE.Color(0x38bdf8); // Vivid tropical blue sky
    scene.fog = new THREE.Fog(0x7dd3fc, 80, 220); // Warm atmospheric horizon fog

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 400);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('game-container').appendChild(renderer.domElement);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    dirLight = new THREE.DirectionalLight(0xfffae0, 1.2);
    dirLight.position.set(-25, 60, -25);
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
        
        // Touch Swipe Controls for Mobile/Tablet
        const touchOptions = { passive: false };
        window.addEventListener('touchstart', handleTouchStart, touchOptions);
        window.addEventListener('touchmove', handleTouchMove, touchOptions);
        window.addEventListener('touchend', handleTouchEnd, touchOptions);
        window.addEventListener('touchcancel', handleTouchEnd, touchOptions);
        
        document.getElementById('start-btn').addEventListener('click', startGame);
        document.getElementById('restart-btn').addEventListener('click', resetGame);
        
        const pauseBtn = document.getElementById('pause-btn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                if (!isPlaying) return;
                isPlaying = false;
                startScreen.classList.add('active');
                document.querySelector('#start-screen h1').innerText = "PAUSED";
                document.getElementById('start-btn').innerText = "RESUME";
            });
        }

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
            if(!btn.id.startsWith('char-')) {
                btn.addEventListener('click', (e) => buyUpgrade(e.target.dataset.item));
            } else {
                btn.addEventListener('click', (e) => {
                    const char = e.target.dataset.char;
                    const color = parseInt(e.target.dataset.color);
                    const cost = parseInt(e.target.dataset.cost);

                    if (unlockedCharacters.includes(char)) {
                        equippedCharacter = char;
                        localStorage.setItem('indianSurferEquippedChar', equippedCharacter);
                        updatePlayerColor(color);
                        updateShopUI();
                    } else if (totalCoins >= cost) {
                        totalCoins -= cost;
                        unlockedCharacters.push(char);
                        equippedCharacter = char;
                        localStorage.setItem('indianSurferTotalCoins', totalCoins);
                        localStorage.setItem('indianSurferUnlockedChars', JSON.stringify(unlockedCharacters));
                        localStorage.setItem('indianSurferEquippedChar', equippedCharacter);
                        updatePlayerColor(color);
                        if(totalCoinsEl) totalCoinsEl.innerText = totalCoins;
                        updateShopUI();
                    }
                });
            }
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

    ['yellow', 'blue', 'red', 'green', 'gold'].forEach(char => {
        let btn = document.getElementById(`char-${char}`);
        if(btn) {
            const isEquipped = (equippedCharacter === char) || (char === 'yellow' && equippedCharacter === 'blue');
            const isUnlocked = isEquipped || unlockedCharacters.includes(char) || (char === 'yellow' && unlockedCharacters.includes('blue'));
            if(isEquipped) {
                btn.innerText = "EQUIPPED";
                btn.disabled = true;
            } else if (isUnlocked) {
                btn.innerText = "EQUIP";
                btn.disabled = false;
            } else {
                let cost = parseInt(btn.dataset.cost);
                btn.innerText = `Buy (₹${cost})`;
                btn.disabled = totalCoins < cost;
            }
        }
    });
}

function updatePlayerColor(charOrHex) {
    if(!player) return;
    let hex = 0xffea00; // Bright yellow default

    if (charOrHex === 'red' || charOrHex === 0xe74c3c) hex = 0xe74c3c;
    else if (charOrHex === 'green' || charOrHex === 0x2ecc71) hex = 0x2ecc71;
    else if (charOrHex === 'gold' || charOrHex === 0xf1c40f) hex = 0xf1c40f;
    else hex = 0xffea00;

    player.traverse((child) => {
        if (child.isMesh && child.material) {
            child.material.color.setHex(hex);
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

    // 1. Ballast Ground Bed
    const groundGeo = new THREE.PlaneGeometry(32, 20);
    const ground = new THREE.Mesh(groundGeo, ballastMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, 0, 10);
    ground.receiveShadow = true;
    group.add(ground);

    // 2. Continuous Left & Right Terracotta Parapet Walls
    const wallGeo = new THREE.BoxGeometry(0.5, 3.2, 20);
    const lWall = new THREE.Mesh(wallGeo, wallMaterial);
    lWall.position.set(-6.8, 1.6, 10);
    lWall.castShadow = true;
    lWall.receiveShadow = true;
    group.add(lWall);

    const rWall = new THREE.Mesh(wallGeo, wallMaterial);
    rWall.position.set(6.8, 1.6, 10);
    rWall.castShadow = true;
    rWall.receiveShadow = true;
    group.add(rWall);

    // Decorative Pillar Posts
    const pillarGeo = new THREE.BoxGeometry(0.7, 3.6, 0.7);
    const lPillar = new THREE.Mesh(pillarGeo, wallMaterial);
    lPillar.position.set(-6.8, 1.8, 10);
    lPillar.castShadow = true;
    group.add(lPillar);

    const rPillar = new THREE.Mesh(pillarGeo, wallMaterial);
    rPillar.position.set(6.8, 1.8, 10);
    rPillar.castShadow = true;
    group.add(rPillar);

    // 3. Three 3D Railway Tracks with 14 Raised Wooden Sleepers & Steel Rails
    const sleeperGeo = new THREE.BoxGeometry(2.6, 0.18, 0.45);
    const railGeo = new THREE.BoxGeometry(0.12, 0.22, 20);

    for (let laneIdx of [-1, 0, 1]) {
        const laneX = laneIdx * LANE_WIDTH;

        for (let s = 0; s < 14; s++) {
            const sleeperZ = (s * (20 / 14)) + 0.7;
            const sleeper = new THREE.Mesh(sleeperGeo, woodMaterial);
            sleeper.position.set(laneX, 0.09, sleeperZ);
            sleeper.castShadow = true;
            sleeper.receiveShadow = true;
            group.add(sleeper);
        }

        const railL = new THREE.Mesh(railGeo, railMaterial);
        railL.position.set(laneX - 0.95, 0.25, 10);
        railL.castShadow = true;
        group.add(railL);

        const railR = new THREE.Mesh(railGeo, railMaterial);
        railR.position.set(laneX + 0.95, 0.25, 10);
        railR.castShadow = true;
        group.add(railR);
    }

    // 4. Overhead Signal Gantry Arch every 60m
    if (Math.floor(zPos / 20) % 3 === 0) {
        const gantry = createGantryArch();
        gantry.position.set(0, 0, 10);
        group.add(gantry);
    }

    group.position.z = zPos;
    scene.add(group);
    trackSegments.push({ mesh: group, zEnd: zPos + 20 });

    spawnScenery(zPos);

    if (zPos > 40) spawnObstacles(zPos);
}

function spawnScenery(zPos) {
    for (let side of [-1, 1]) {
        // Continuous building corridor alongside both left and right boundary walls
        const bldg = createTropicalBuilding();
        if (side < 0) {
            bldg.position.set(-10.5, 0, zPos + 10);
            bldg.rotation.y = 0; // Roof slopes down toward +X (track center)
        } else {
            bldg.position.set(10.5, 0, zPos + 10);
            bldg.rotation.y = Math.PI; // Roof slopes down toward -X (track center)
        }
        scene.add(bldg);
        sceneries.push(bldg);

        // Extra lush background palm trees behind the roofs
        if (Math.random() > 0.4) {
            const palm = createSubwayPalmTree();
            palm.position.set(side * (14 + Math.random() * 4), 0, zPos + Math.random() * 15);
            scene.add(palm);
            sceneries.push(palm);
        }
    }
}

function spawnObstacles(zPos) {
    const rand = Math.random();
    
    // Spawn Powerup? (6% chance)
    if (Math.random() < 0.06) {
        const lane = Math.floor(Math.random() * 3) - 1;
        const pType = Math.random();
        
        let mesh, typeStr;
        if (pType < 0.38) { 
            mesh = createMagnetPickupMesh(); 
            typeStr = 'magnet'; 
        } else if (pType < 0.68) { 
            mesh = createMultiplierPickupMesh(); 
            typeStr = 'multiplier'; 
        } else { 
            mesh = createJetpackPickupMesh(); 
            typeStr = 'jetpack'; 
        }
        
        mesh.position.set(lane * LANE_WIDTH, 1.6, zPos + 10);
        scene.add(mesh);
        activePowerupMeshes.push({ mesh, type: typeStr });
        return;
    }

    if (rand < 0.38) { // Classic Subway Surfers Train
        const lane = Math.floor(Math.random() * 3) - 1;
        const theme = (Math.random() > 0.45) ? 'orange' : 'blue';
        const group = createModernTrainMesh(theme);
        const trainZ = zPos + 10;
        group.position.set(lane * LANE_WIDTH, 0, trainZ);
        scene.add(group);
        
        const hasRamp = (Math.random() < 0.55);
        let rampGroup = null;
        if (hasRamp) {
            rampGroup = createTrainRampMesh();
            rampGroup.position.set(lane * LANE_WIDTH, 0, trainZ - 8.5);
            scene.add(rampGroup);

            for (let i = 0; i < 6; i++) {
                const prog = (i + 1) / 6;
                const coinZ = (trainZ - 17) + (prog * 8.5);
                const coinY = (prog * 4.75) + 1.2;
                spawnCoin(lane, coinY, coinZ);
            }
            for (let i = 0; i < 4; i++) {
                const coinZ = (trainZ - 6) + (i * 4);
                spawnCoin(lane, 6.0, coinZ);
            }
        }
        
        const hitGeo = new THREE.BoxGeometry(3.3, 5, 16.5);
        const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({visible: false}));
        hitMesh.position.set(lane * LANE_WIDTH, 2.5, trainZ);
        scene.add(hitMesh);

        obstacles.push({ 
            mesh: hitMesh, 
            visual: group, 
            rampVisual: rampGroup,
            type: 'train', 
            hasRamp: hasRamp,
            lane: lane,
            zStart: trainZ - 8.5,
            zEnd: trainZ + 8.5,
            rampStart: trainZ - 17
        });
    } else if (rand < 0.65) { // Barricades
        const lane = Math.floor(Math.random() * 3) - 1;
        const isType3 = (Math.random() > 0.45);
        const barData = isType3 ? createType3Barricade() : createStandardBarricade();
        const group = barData.group;

        group.position.set(lane * LANE_WIDTH, 0, zPos + 10);
        scene.add(group);
        
        const hitGeo = new THREE.BoxGeometry(3.6, barData.hitboxH, 0.8);
        const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({visible: false}));
        hitMesh.position.set(lane * LANE_WIDTH, barData.hitboxY, zPos + 10);
        scene.add(hitMesh);
        
        obstacles.push({ mesh: hitMesh, visual: group, type: 'barricade' });
        
        if (Math.random() > 0.35) spawnCoin(lane, barData.height + 0.6, zPos + 10);
    } else if (rand < 0.95) { // Coins
        const lane = Math.floor(Math.random() * 3) - 1;
        for (let i = 0; i < 4; i++) spawnCoin(lane, 1.4, zPos + 5 + (i * 3.5));
    }
}

// --- Chunky 3D Gold Coin with Star & Ground Glow ---
function spawnCoin(lane, yPos, zPos) {
    const group = new THREE.Group();

    const coinGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.22, 24);
    const coinMat = new THREE.MeshStandardMaterial({ 
        map: coinStarMat,
        metalness: 0.9, 
        roughness: 0.15,
        emissive: 0x553300,
        emissiveIntensity: 0.4
    });
    const coin = new THREE.Mesh(coinGeo, coinMat);
    coin.rotation.x = Math.PI / 2;
    coin.castShadow = true;
    group.add(coin);

    const glowGeo = new THREE.PlaneGeometry(1.8, 1.8);
    const glowMat = new THREE.MeshBasicMaterial({
        map: coinGlowMat,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.set(0, -yPos + 0.12, 0);
    group.add(glow);

    group.position.set(lane * LANE_WIDTH, yPos, zPos);
    scene.add(group);
    coins.push(group);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// --- Unified Movement Functions ---
function moveLeft() {
    if (!isPlaying) return;
    if (currentLane < 1) {
        currentLane++;
        if (player) {
            player.rotation.z = 0.3;
            setTimeout(() => { if (player) player.rotation.z = 0; }, 200);
        }
    }
}

function moveRight() {
    if (!isPlaying) return;
    if (currentLane > -1) {
        currentLane--;
        if (player) {
            player.rotation.z = -0.3;
            setTimeout(() => { if (player) player.rotation.z = 0; }, 200);
        }
    }
}

function jump() {
    if (!isPlaying) return;
    if (!isJumping && !isRolling && activeBuffs.jetpack <= 0) {
        isJumping = true;
        yVelocity = JUMP_FORCE;
    }
}

function roll() {
    if (!isPlaying) return;
    if (!isJumping && !isRolling && activeBuffs.jetpack <= 0) {
        isRolling = true;
        rollTimer = 0.65;
        if (player) {
            player.rotation.x = Math.PI / 4; 
            player.scale.set(1.5, 0.75, 1.8);
            player.position.y = 0;
        }
    } else if (isJumping) {
        yVelocity = -JUMP_FORCE * 2.0; 
    }
}

function onKeyDown(event) {
    if (!isPlaying) return;

    switch (event.code) {
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft();
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight();
            break;
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
            jump();
            break;
        case 'ArrowDown':
        case 'KeyS':
            roll();
            break;
    }
}

// --- Bulletproof Touch / Swipe Logic ---
let touchStartX = 0;
let touchStartY = 0;
let isSwiping = false;

function handleTouchStart(evt) {
    if (!isPlaying) return;
    if (evt.target.closest('button') || evt.target.closest('.screen.active')) return;

    const t = evt.touches ? evt.touches[0] : evt;
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    isSwiping = true;

    if (evt.cancelable) evt.preventDefault();
}

function handleTouchMove(evt) {
    if (!isPlaying || !isSwiping) return;
    if (evt.target.closest('button') || evt.target.closest('.screen.active')) return;

    if (evt.cancelable) evt.preventDefault();

    const t = evt.touches ? evt.touches[0] : evt;
    const diffX = t.clientX - touchStartX;
    const diffY = t.clientY - touchStartY;
    const threshold = 25;

    if (Math.abs(diffX) > threshold || Math.abs(diffY) > threshold) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) moveRight();
            else moveLeft();
        } else {
            if (diffY < 0) jump();
            else roll();
        }
        touchStartX = t.clientX;
        touchStartY = t.clientY;
    }
}

function handleTouchEnd(evt) {
    isSwiping = false;
}

function startGame() {
    startScreen.classList.remove('active');
    document.querySelector('#start-screen h1').innerText = "INDIAN SURFER";
    document.getElementById('start-btn').innerText = "TAP TO PLAY";
    isPlaying = true;
    lastTime = performance.now();
}

function resetGame() {
    trackSegments.forEach(seg => scene.remove(seg.mesh));
    sceneries.forEach(sc => scene.remove(sc));
    obstacles.forEach(obs => {
        scene.remove(obs.mesh);
        if (obs.visual) scene.remove(obs.visual);
        if (obs.rampVisual) scene.remove(obs.rampVisual);
    });
    coins.forEach(c => scene.remove(c));
    activePowerupMeshes.forEach(p => scene.remove(p.mesh));

    trackSegments = [];
    sceneries = [];
    obstacles = [];
    coins = [];
    activePowerupMeshes = [];
    activePowerupsContainer.innerHTML = '';

    isPlaying = true;
    distance = 0;
    coinsCollected = 0;
    gameSpeed = 25;
    currentLane = 0;
    copCurrentLane = 0;
    
    activeBuffs = { magnet: 0, multiplier: 0, jetpack: 0 };
    if (equippedMagnetMesh) equippedMagnetMesh.visible = false;
    if (equippedJetpackMesh) equippedJetpackMesh.visible = false;

    player.position.set(0, 0, 0);
    player.rotation.set(0, Math.PI, 0);
    player.scale.set(1.5, 1.5, 1.5);
    isJumping = false;
    isRolling = false;
    isStumbling = false;
    stumbleTimer = 0;
    yVelocity = 0;

    cop.position.set(0, 0, -8); 
    
    for (let i = -2; i < 15; i++) spawnTrackSegment(i * 20);
    
    updateCamera();
    updateUI();
    gameOverScreen.classList.remove('active');
    lastTime = performance.now();
}

function updateUI() {
    if (distanceEl) {
        distanceEl.innerText = String(Math.floor(distance)).padStart(6, '0');
    }
    if (coinsEl) {
        coinsEl.innerText = coinsCollected;
    }
    const multEl = document.getElementById('hud-mult-val');
    if (multEl) {
        multEl.innerText = (activeBuffs.multiplier > 0) ? 'x2' : 'x1';
    }
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

// --- Subway Surfers Close Dynamic Camera Framing ---
function updateCamera() {
    const targetZ = player.position.z - 7.5;
    const targetY = player.position.y + (activeBuffs.jetpack > 0 ? 10.0 : 4.3);
    const targetX = player.position.x * 0.4;

    camera.position.z += (targetZ - camera.position.z) * 0.25;
    camera.position.y += (targetY - camera.position.y) * 0.15;
    camera.position.x += (targetX - camera.position.x) * 0.2;
    camera.lookAt(player.position.x * 0.2, player.position.y + 2.5, player.position.z + 16);
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
    const duration = 5 + (upgrades[type] * 2.5);
    activeBuffs[type] = duration;
    
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

    // Update Equipped visual items on character
    if (equippedMagnetMesh) {
        equippedMagnetMesh.visible = (activeBuffs.magnet > 0);
        if (activeBuffs.magnet > 0) {
            equippedMagnetMesh.position.y = 0.9 + Math.sin(time * 0.015) * 0.1;
        }
    }
    if (equippedJetpackMesh) {
        equippedJetpackMesh.visible = (activeBuffs.jetpack > 0);
        if (activeBuffs.jetpack > 0) {
            const flamePulse = 1.0 + Math.sin(time * 0.04) * 0.4;
            equippedJetpackMesh.traverse((child) => {
                if (child.isMesh && child.geometry && child.geometry.type === 'ConeGeometry' && child.position.y < -0.5) {
                    child.scale.set(1.0, flamePulse, 1.0);
                }
            });
        }
    }

    // Calculate dynamic floor height (Ground y=0, Train roof y=4.75, or Ramp slope)
    let targetFloorY = 0;
    const pX = player.position.x;
    const pZ = player.position.z;

    for (let obs of obstacles) {
        if (obs.type === 'train' && Math.abs(pX - obs.mesh.position.x) < 2.0) {
            const trainZ = obs.mesh.position.z;
            const noseZ = trainZ - 8.5;
            const rearZ = trainZ + 8.5;

            if (obs.hasRamp) {
                const rampStart = obs.rampStart;
                if (pZ >= rampStart && pZ < noseZ) {
                    const prog = Math.max(0, Math.min(1, (pZ - rampStart) / (noseZ - rampStart)));
                    const rampY = prog * 4.75;
                    if (rampY > targetFloorY) targetFloorY = rampY;
                }
            }

            if (pZ >= noseZ && pZ <= rearZ) {
                if (player.position.y >= 3.6 || targetFloorY > 0) {
                    targetFloorY = 4.75;
                }
            }
        }
    }

    // Jetpack physics override
    if (activeBuffs.jetpack > 0) {
        player.position.y += (11 - player.position.y) * 5 * dt;
        if (Math.random() < 0.12) {
            spawnCoin(currentLane, 11, player.position.z + 40);
        }
    } else {
        if (player.position.y > targetFloorY || isJumping) {
            yVelocity += GRAVITY * dt;
            player.position.y += yVelocity * dt;
            if (player.position.y <= targetFloorY) {
                player.position.y = targetFloorY;
                isJumping = false;
                yVelocity = 0;
            }
        } else if (player.position.y < targetFloorY) {
            player.position.y = targetFloorY;
        }
    }

    let currentSpeed = gameSpeed;
    if (isStumbling && activeBuffs.jetpack <= 0) {
        stumbleTimer -= dt;
        currentSpeed = gameSpeed * 0.5;
        if (stumbleTimer <= 0) isStumbling = false;
    }

    const distGain = (currentSpeed * dt) / 5;
    distance += (activeBuffs.multiplier > 0) ? distGain * 2 : distGain;
    
    player.position.z += currentSpeed * dt;
    
    if (!isStumbling) gameSpeed += dt * 0.25;

    const targetX = currentLane * LANE_WIDTH;
    player.position.x += (targetX - player.position.x) * 16 * dt;

    if (isRolling && activeBuffs.jetpack <= 0) {
        rollTimer -= dt;
        if (rollTimer <= 0) {
            isRolling = false;
            if (player) {
                player.rotation.x = 0;
                player.scale.set(1.5, 1.5, 1.5);
                if(!isJumping && player.position.y <= targetFloorY) player.position.y = targetFloorY;
            }
        }
    }

    // Cop Logic
    let copSpeed = gameSpeed;
    const distToPlayer = player.position.z - cop.position.z;
    
    if (isStumbling && activeBuffs.jetpack <= 0) {
        copSpeed = gameSpeed + 12;
    } else {
        if (distToPlayer > 10) copSpeed = gameSpeed + 6;
        else if (distToPlayer < 6) copSpeed = gameSpeed - 3;
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
        const coinObj = coins[i];
        if (coinObj.children[0]) coinObj.children[0].rotation.z += 4 * dt;
        
        if(activeBuffs.magnet > 0) {
            const dist = player.position.distanceTo(coinObj.position);
            if(dist < 20) {
                coinObj.position.lerp(player.position, 12 * dt);
            }
        }
        
        const coinBox = new THREE.Box3().setFromObject(coinObj);
        if (playerBox.intersectsBox(coinBox)) {
            scene.remove(coinObj);
            coins.splice(i, 1);
            coinsCollected += 1;
        } else if (coinObj.position.z < player.position.z - 10) {
            scene.remove(coinObj);
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

    if(activeBuffs.jetpack <= 0) {
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            const obsBox = new THREE.Box3().setFromObject(obs.mesh);
            
            if (obs.type === 'train') {
                obsBox.min.x += 0.25; obsBox.max.x -= 0.25;
            } else {
                obsBox.max.y -= 0.3;
            }

            if (playerBox.intersectsBox(obsBox)) {
                if (obs.type === 'train') {
                    if (player.position.y >= 3.6 || (obs.hasRamp && player.position.z < obs.mesh.position.z - 4)) {
                        // Safe on train roof / ramp
                    } else {
                        gameOver();
                    }
                } else {
                    isStumbling = true;
                    stumbleTimer = 1.0; 
                    
                    scene.remove(obs.mesh);
                    if (obs.visual) scene.remove(obs.visual);
                    if (obs.rampVisual) scene.remove(obs.rampVisual);
                    obstacles.splice(i, 1);
                    
                    player.rotation.z = (Math.random() > 0.5 ? 1 : -1) * 0.3;
                    setTimeout(() => player.rotation.z = 0, 300);
                }
                continue;
            }

            if (obs.mesh.position.z < player.position.z - 25) {
                scene.remove(obs.mesh);
                if (obs.visual) scene.remove(obs.visual);
                if (obs.rampVisual) scene.remove(obs.rampVisual);
                obstacles.splice(i, 1);
            }
        }
    }

    updateUI();
    renderer.render(scene, camera);
}

init();
