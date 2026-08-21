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

function createVandeBharatTexture(theme = 'orange') {
    const canvas = createCanvas(1024);
    const ctx = canvas.getContext('2d');

    const isOrange = (theme === 'orange');
    const primaryColor = isOrange ? '#ff5500' : '#0052cc';
    const primaryDark = isOrange ? '#cc3d00' : '#003999';
    const accentColor = isOrange ? '#ff8833' : '#3385ff';
    const baseWhite = '#f4f6fa';
    const darkSkirt = '#18202c';

    // 1. Base Metallic White Coach Body
    ctx.fillStyle = baseWhite;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle metallic brushed panel lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 1024; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
    }

    // 2. Lower Aerodynamic Skirt / Chassis (Dark Grey / Black)
    ctx.fillStyle = darkSkirt;
    ctx.fillRect(0, 780, 1024, 244);
    ctx.fillStyle = '#0f1722';
    ctx.fillRect(0, 880, 1024, 144);

    // Hazard safety trim above skirt
    ctx.fillStyle = primaryColor;
    ctx.fillRect(0, 765, 1024, 15);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 755, 1024, 10);

    // 3. Signature High-Speed Aerodynamic Livery Bands
    ctx.fillStyle = primaryColor;
    ctx.fillRect(0, 360, 1024, 380);

    ctx.fillStyle = primaryDark;
    ctx.fillRect(0, 710, 1024, 35);
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 330, 1024, 30);

    // 4. Continuous Panoramic Dark Tinted Glass Window Ribbon
    ctx.fillStyle = '#080c14';
    ctx.fillRect(0, 420, 1024, 250);

    // Window Frames, Glass Reflection Streaks & Interior Passenger Glow
    for (let x = 30; x < 1024; x += 130) {
        // Soft interior passenger cabin light glow
        ctx.fillStyle = 'rgba(255, 235, 180, 0.25)';
        ctx.fillRect(x + 10, 440, 95, 210);

        // Passenger silhouettes
        ctx.fillStyle = 'rgba(10, 15, 25, 0.55)';
        ctx.beginPath();
        ctx.arc(x + 40, 530, 20, 0, Math.PI * 2);
        ctx.arc(x + 80, 530, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(x + 25, 550, 30, 60);
        ctx.fillRect(x + 65, 550, 30, 60);

        // Glass reflection sheen
        const grad = ctx.createLinearGradient(x, 420, x + 110, 670);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.08)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, 420, 115, 250);

        // Window mullion pillars
        ctx.fillStyle = '#18202c';
        ctx.fillRect(x + 115, 420, 15, 250);
    }

    // 5. Realistic Automatic Sliding Passenger Coach Doors
    for (let d of [40, 890]) {
        // Door frame
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(d, 350, 90, 420);

        // Door panel
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(d + 6, 360, 78, 400);

        // Door window
        ctx.fillStyle = '#080c14';
        ctx.fillRect(d + 18, 420, 54, 160);

        // Door window reflection
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.moveTo(d + 20, 420);
        ctx.lineTo(d + 45, 420);
        ctx.lineTo(d + 25, 580);
        ctx.lineTo(d + 20, 580);
        ctx.fill();

        // Safety edge indicator stripe
        ctx.fillStyle = isOrange ? '#ff5500' : '#e11d48';
        ctx.fillRect(d + 42, 360, 6, 400);

        // Illuminated Door Open Touch Button
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(d + 26, 620, 6, 0, Math.PI * 2);
        ctx.fill();
    }

    // 6. Stylized Train Branding & Lettering
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.fillText(isOrange ? 'VANDE BHARAT' : 'SUPERFAST EXPRESS', 240, 395);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText('EXECUTIVE CHAIR CAR • C-1', 242, 700);

    // 7. Roof Aerodynamic Fairing & Speed Ribs
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, 0, 1024, 120);
    ctx.fillStyle = primaryColor;
    ctx.fillRect(0, 120, 1024, 25);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 145, 1024, 12);

    // Roof ventilation grooves
    ctx.fillStyle = '#334155';
    for (let y = 15; y < 105; y += 14) {
        ctx.fillRect(0, y, 1024, 5);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
}

// Classic Indian Railways Maroon/Red Train with Yellow Stripe Livery
function createMaroonTrainTexture() {
    const canvas = createCanvas(1024);
    const ctx = canvas.getContext('2d');

    const maroonColor = '#7a1f24';
    const darkMaroon = '#581418';
    const yellowStripe = '#f1c40f';
    const darkRoof = '#2c3e50';

    // 1. Base Maroon Coach Body
    ctx.fillStyle = maroonColor;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle metallic panel lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 1024; x += 128) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
    }

    // 2. Dark Chassis / Undercarriage Skirt
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 780, 1024, 244);

    // 3. Iconic Yellow Center Livery Bands
    ctx.fillStyle = yellowStripe;
    ctx.fillRect(0, 360, 1024, 45);
    ctx.fillRect(0, 680, 1024, 35);

    // 4. Dark Window Ribbon
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 420, 1024, 245);

    // Passenger Windows
    for (let x = 30; x < 1024; x += 130) {
        ctx.fillStyle = 'rgba(255, 235, 180, 0.28)';
        ctx.fillRect(x + 10, 440, 95, 205);

        // Passenger silhouettes
        ctx.fillStyle = 'rgba(10, 15, 25, 0.6)';
        ctx.beginPath();
        ctx.arc(x + 40, 530, 20, 0, Math.PI * 2);
        ctx.arc(x + 80, 530, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(x + 25, 550, 30, 60);
        ctx.fillRect(x + 65, 550, 30, 60);

        // Glass reflection sheen
        const grad = ctx.createLinearGradient(x, 420, x + 110, 665);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.08)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, 420, 115, 245);

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x + 115, 420, 15, 245);
    }

    // 5. Classic Coach Doors
    for (let d of [40, 890]) {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(d, 350, 90, 420);
        ctx.fillStyle = darkMaroon;
        ctx.fillRect(d + 6, 360, 78, 400);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(d + 18, 420, 54, 160);
        ctx.fillStyle = yellowStripe;
        ctx.fillRect(d + 42, 360, 6, 400);
    }

    // 6. Indian Railways Branding
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.fillText('INDIAN RAILWAYS', 270, 395);

    ctx.fillStyle = yellowStripe;
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillText('SUPERFAST EXPRESS', 310, 705);

    // 7. Dark Charcoal Roof
    ctx.fillStyle = darkRoof;
    ctx.fillRect(0, 0, 1024, 120);
    ctx.fillStyle = yellowStripe;
    ctx.fillRect(0, 120, 1024, 15);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
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
let trackMaterial, groundMaterial, trainMaterial, barricadeMaterial, woodMaterial, leafMaterial, coinMaterial, railMaterial;
let starMat, magnetMat, jetpackMat;
let vandeOrangeMat, vandeBlueMat, maroonTrainMat, headlightGlowMat, tailLightGlowMat;
let equippedMagnetMesh = null, equippedJetpackMesh = null;

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
    orangeStripeMaterial = new THREE.MeshStandardMaterial({ 
        map: createOrangeStripeTexture(), 
        roughness: 0.35, 
        metalness: 0.1 
    });
    
    // Train Materials (Classic Indian Maroon, Vande Bharat Orange & Bullet Blue)
    maroonTrainMat = new THREE.MeshStandardMaterial({
        map: createMaroonTrainTexture(),
        roughness: 0.3,
        metalness: 0.25
    });
    vandeOrangeMat = new THREE.MeshStandardMaterial({ 
        map: createVandeBharatTexture('orange'), 
        roughness: 0.25, 
        metalness: 0.35 
    });
    vandeBlueMat = new THREE.MeshStandardMaterial({ 
        map: createVandeBharatTexture('blue'), 
        roughness: 0.25, 
        metalness: 0.35 
    });

    headlightGlowMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xfff3cc,
        emissiveIntensity: 1.5
    });

    tailLightGlowMat = new THREE.MeshStandardMaterial({
        color: 0xff1122,
        emissive: 0xff0022,
        emissiveIntensity: 1.0
    });

    coinMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0x443300, metalness: 0.8, roughness: 0.2 });
    railMaterial = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.9, roughness: 0.2 });

    starMat = new THREE.MeshStandardMaterial({ map: createStarTexture(), roughness: 0.5 });
    magnetMat = new THREE.MeshStandardMaterial({ map: createMagnetTexture(), roughness: 0.5 });
    jetpackMat = new THREE.MeshStandardMaterial({ map: createJetpackTexture(), roughness: 0.5 });
}

function createModernTrainMesh(theme = 'maroon') {
    const group = new THREE.Group();
    
    let bodyMat = maroonTrainMat;
    let primaryHex = 0x7a1f24;
    if (theme === 'orange') {
        bodyMat = vandeOrangeMat;
        primaryHex = 0xff5500;
    } else if (theme === 'blue') {
        bodyMat = vandeBlueMat;
        primaryHex = 0x0052cc;
    }

    // Materials
    const darkChassisMat = new THREE.MeshStandardMaterial({ color: 0x18202c, roughness: 0.6, metalness: 0.5 });
    const silverMetalMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.85 });
    const primaryNoseMat = new THREE.MeshStandardMaterial({ color: primaryHex, roughness: 0.2, metalness: 0.4 });
    const darkGlassMat = new THREE.MeshStandardMaterial({ color: 0x060910, roughness: 0.05, metalness: 0.95 });
    const steelWheelMat = new THREE.MeshStandardMaterial({ color: 0x222a35, roughness: 0.2, metalness: 0.9 });
    const chromeEmblemMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1.0, roughness: 0.05 });

    // 1. Main Aerodynamic Coach Body
    const bodyGeo = new THREE.BoxGeometry(3.6, 4.2, 16);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 2.6, 0);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // 2. Sculpted Multi-Tier Aerodynamic Bullet Nose (Front Cabin facing -Z)
    const hoodGeo = new THREE.BoxGeometry(3.56, 3.2, 3.8);
    const hood = new THREE.Mesh(hoodGeo, primaryNoseMat);
    hood.position.set(0, 2.35, -8.6);
    hood.rotation.x = -Math.PI / 7.5; 
    hood.castShadow = true;
    group.add(hood);

    // Low Aerodynamic Nose Wedge & Cowcatcher Splitter
    const wedgeGeo = new THREE.BoxGeometry(3.58, 1.4, 2.8);
    const wedge = new THREE.Mesh(wedgeGeo, darkChassisMat);
    wedge.position.set(0, 0.95, -9.4);
    wedge.castShadow = true;
    group.add(wedge);

    // Lower Air-dam Lip (Safety Highlight)
    const lipGeo = new THREE.BoxGeometry(3.52, 0.35, 1.2);
    const lip = new THREE.Mesh(lipGeo, primaryNoseMat);
    lip.position.set(0, 0.35, -10.4);
    group.add(lip);

    // Front Knuckle Coupler (Schaku Coupler)
    const couplerGeo = new THREE.BoxGeometry(0.5, 0.4, 0.9);
    const coupler = new THREE.Mesh(couplerGeo, silverMetalMat);
    coupler.position.set(0, 0.65, -10.8);
    group.add(coupler);

    // 3. Panoramic Wraparound Windshield Glass
    const glassGeo = new THREE.BoxGeometry(3.1, 1.45, 0.2);
    const glass = new THREE.Mesh(glassGeo, darkGlassMat);
    glass.position.set(0, 3.2, -9.7);
    glass.rotation.x = -Math.PI / 6.8;
    group.add(glass);

    // Silver Windshield Frame Trim
    const frameGeo = new THREE.BoxGeometry(3.18, 0.08, 0.22);
    const frameTop = new THREE.Mesh(frameGeo, silverMetalMat);
    frameTop.position.set(0, 3.85, -9.5);
    frameTop.rotation.x = -Math.PI / 6.8;
    group.add(frameTop);

    // Dual Wiper Blades
    const wiperGeo = new THREE.BoxGeometry(0.04, 0.8, 0.04);
    for (let wx of [-0.6, 0.6]) {
        const wiper = new THREE.Mesh(wiperGeo, darkChassisMat);
        wiper.position.set(wx, 3.1, -9.8);
        wiper.rotation.z = Math.PI / 10 * (wx < 0 ? -1 : 1);
        wiper.rotation.x = -Math.PI / 6.8;
        group.add(wiper);
    }

    // Front Chrome Emblem Badge
    const badgeGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 24);
    const badge = new THREE.Mesh(badgeGeo, chromeEmblemMat);
    badge.rotation.x = Math.PI / 2 - Math.PI / 7.5;
    badge.position.set(0, 2.05, -10.2);
    group.add(badge);

    // 4. Projector Headlights (Aggressive Angular LED Headlights + Center High Beam)
    const headlampGeo = new THREE.BoxGeometry(0.65, 0.28, 0.15);
    const leftLight = new THREE.Mesh(headlampGeo, headlightGlowMat);
    leftLight.position.set(-1.15, 1.65, -10.15);
    leftLight.rotation.y = Math.PI / 16;
    group.add(leftLight);

    const rightLight = new THREE.Mesh(headlampGeo, headlightGlowMat);
    rightLight.position.set(1.15, 1.65, -10.15);
    rightLight.rotation.y = -Math.PI / 16;
    group.add(rightLight);

    // Chrome Bezel around headlights
    const bezelGeo = new THREE.BoxGeometry(0.72, 0.34, 0.08);
    const lBezel = new THREE.Mesh(bezelGeo, silverMetalMat);
    lBezel.position.set(-1.15, 1.65, -10.1);
    lBezel.rotation.y = Math.PI / 16;
    group.add(lBezel);
    const rBezel = new THREE.Mesh(bezelGeo, silverMetalMat);
    rBezel.position.set(1.15, 1.65, -10.1);
    rBezel.rotation.y = -Math.PI / 16;
    group.add(rBezel);

    // Center Top High-Beam Projector
    const topLightGeo = new THREE.BoxGeometry(0.7, 0.25, 0.15);
    const topLight = new THREE.Mesh(topLightGeo, headlightGlowMat);
    topLight.position.set(0, 4.05, -9.15);
    group.add(topLight);

    // Rear Dual Red LED Marker Lamps (+Z)
    const rTail = new THREE.Mesh(headlampGeo, tailLightGlowMat);
    rTail.position.set(-1.15, 2.2, 8.05);
    group.add(rTail);
    const lTail = new THREE.Mesh(headlampGeo, tailLightGlowMat);
    lTail.position.set(1.15, 2.2, 8.05);
    group.add(lTail);

    // 5. Roof Equipment: Sculpted AC Housings, Pantograph & Fairings
    const roofRibGeo = new THREE.BoxGeometry(3.2, 0.12, 16);
    const roofRib = new THREE.Mesh(roofRibGeo, silverMetalMat);
    roofRib.position.set(0, 4.75, 0);
    group.add(roofRib);

    // Sculpted Dual AC Units with Grilles
    const acUnitGeo = new THREE.BoxGeometry(2.5, 0.55, 4.2);
    for (let z of [-3.5, 3.5]) {
        const ac = new THREE.Mesh(acUnitGeo, silverMetalMat);
        ac.position.set(0, 4.95, z);
        ac.castShadow = true;
        group.add(ac);

        // AC Intake Grille
        const grilleGeo = new THREE.BoxGeometry(2.1, 0.1, 3.6);
        const grille = new THREE.Mesh(grilleGeo, darkChassisMat);
        grille.position.set(0, 5.25, z);
        group.add(grille);
    }

    // High-Voltage Articulated Pantograph Assembly
    const pantoBaseGeo = new THREE.BoxGeometry(1.8, 0.15, 1.4);
    const pantoBase = new THREE.Mesh(pantoBaseGeo, darkChassisMat);
    pantoBase.position.set(0, 5.15, 0);
    group.add(pantoBase);

    // Ceramic Insulator Pots
    const insulatorGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.35, 12);
    const insulatorMat = new THREE.MeshStandardMaterial({ color: 0xb84b2b, roughness: 0.3 }); 
    for (let ix of [-0.65, 0.65]) {
        for (let iz of [-0.45, 0.45]) {
            const ins = new THREE.Mesh(insulatorGeo, insulatorMat);
            ins.position.set(ix, 5.35, iz);
            group.add(ins);
        }
    }

    // Pantograph Diamond/Z Arms & Contact Collector Horn
    const armGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
    const armL = new THREE.Mesh(armGeo, silverMetalMat);
    armL.position.set(-0.4, 5.75, 0);
    armL.rotation.z = Math.PI / 6;
    group.add(armL);

    const armR = new THREE.Mesh(armGeo, silverMetalMat);
    armR.position.set(0.4, 5.75, 0);
    armR.rotation.z = -Math.PI / 6;
    group.add(armR);

    const hornGeo = new THREE.BoxGeometry(2.4, 0.06, 0.25);
    const horn = new THREE.Mesh(hornGeo, silverMetalMat);
    horn.position.set(0, 6.2, 0);
    group.add(horn);

    // 6. Detailed Undercarriage Bogies, Suspension & Steel Flanged Wheels
    for (let bogieZ of [-5.5, 5.5]) {
        const bogieFrameGeo = new THREE.BoxGeometry(3.4, 0.35, 3.2);
        const bogieFrame = new THREE.Mesh(bogieFrameGeo, darkChassisMat);
        bogieFrame.position.set(0, 0.8, bogieZ);
        group.add(bogieFrame);

        for (let wheelOffset of [-1.1, 1.1]) {
            const wZ = bogieZ + wheelOffset;
            
            const axleGeo = new THREE.CylinderGeometry(0.1, 0.1, 3.6, 16);
            const axle = new THREE.Mesh(axleGeo, steelWheelMat);
            axle.rotation.z = Math.PI / 2;
            axle.position.set(0, 0.55, wZ);
            group.add(axle);

            const rimGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.22, 24);
            const lWheel = new THREE.Mesh(rimGeo, steelWheelMat);
            lWheel.rotation.z = Math.PI / 2;
            lWheel.position.set(-1.65, 0.55, wZ);
            group.add(lWheel);

            const rWheel = new THREE.Mesh(rimGeo, steelWheelMat);
            rWheel.rotation.z = Math.PI / 2;
            rWheel.position.set(1.65, 0.55, wZ);
            group.add(rWheel);
        }
    }

    // Aerodynamic Lower Side Fairing Skirts
    const skirtGeo = new THREE.BoxGeometry(3.64, 0.65, 15.6);
    const skirt = new THREE.Mesh(skirtGeo, darkChassisMat);
    skirt.position.set(0, 0.75, 0);
    group.add(skirt);

    return group;
}

// --- 3D Sloped Train Ramp (Guides Player up onto Train Roof) ---
function createTrainRampMesh() {
    const group = new THREE.Group();

    // Length of ramp along Z is 8.5. Height reaches 4.75.
    const rampAngle = Math.atan2(4.75, 8.5);
    const rampHypot = Math.sqrt(4.75 * 4.75 + 8.5 * 8.5); // ~9.73

    const woodDeckMat = new THREE.MeshStandardMaterial({ 
        map: createWoodTexture(), 
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

    // 1. Sloped Main Wooden Deck Ramp
    const deckGeo = new THREE.BoxGeometry(3.6, 0.2, rampHypot);
    const deck = new THREE.Mesh(deckGeo, woodDeckMat);
    deck.rotation.x = -rampAngle;
    deck.position.set(0, 2.38, -4.25);
    deck.castShadow = true;
    deck.receiveShadow = true;
    group.add(deck);

    // 2. High-Visibility Orange & White Hazard Side Curbs
    const curbGeo = new THREE.BoxGeometry(0.25, 0.45, rampHypot);
    for (let cx of [-1.7, 1.7]) {
        const curb = new THREE.Mesh(curbGeo, stripeMat);
        curb.rotation.x = -rampAngle;
        curb.position.set(cx, 2.5, -4.25);
        curb.castShadow = true;
        group.add(curb);
    }

    // 3. Heavy-Duty Steel Truss Support Posts Under Ramp
    for (let z of [-2, -4, -6]) {
        const h = ((8.5 + z) / 8.5) * 4.6;
        const postGeo = new THREE.BoxGeometry(3.5, h, 0.25);
        const post = new THREE.Mesh(postGeo, steelMat);
        post.position.set(0, h / 2, z);
        post.castShadow = true;
        group.add(post);
    }

    return group;
}

// --- Type III 3-Rail Highway Barricade (Orange & White) ---
function createType3Barricade() {
    const group = new THREE.Group();
    const plankGeo = new THREE.BoxGeometry(4.2, 0.65, 0.08);
    const postGeo = new THREE.BoxGeometry(0.12, 3.4, 0.12);
    const footGeo = new THREE.BoxGeometry(0.12, 0.12, 1.6);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 });

    // 3 Horizontal Orange & White Striped Planks (Top, Middle, Bottom)
    for (let y of [0.9, 1.9, 2.9]) {
        const plank = new THREE.Mesh(plankGeo, orangeStripeMaterial);
        plank.position.set(0, y, 0);
        plank.castShadow = true;
        plank.receiveShadow = true;
        group.add(plank);
    }

    // 2 Vertical Perforated Steel Posts
    for (let x of [-1.55, 1.55]) {
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.set(x, 1.7, -0.08);
        post.castShadow = true;
        group.add(post);

        // Steel base foot on the ground
        const foot = new THREE.Mesh(footGeo, postMat);
        foot.position.set(x, 0.06, 0);
        foot.castShadow = true;
        group.add(foot);

        // Stand riser bracket
        const bracketGeo = new THREE.BoxGeometry(0.18, 0.4, 0.18);
        const bracket = new THREE.Mesh(bracketGeo, postMat);
        bracket.position.set(x, 0.25, 0);
        group.add(bracket);
    }

    return { group, height: 3.4, hitboxY: 1.7, hitboxH: 3.4 };
}

// --- Standard Single-Rail Low Hurdle Barricade ---
function createStandardBarricade() {
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

    return { group, height: 1.4, hitboxY: 0.7, hitboxH: 1.4 };
}

// --- 3D Horseshoe Magnet Pickup Mesh (Glossy Red with Chrome Tips) ---
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

    // 1. Red Horseshoe Body (Arch + Legs)
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

    // 2. Chrome / Silver Pole Tips
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

// --- 3D Dual-Thruster Sci-Fi Jetpack Pickup Mesh (Chrome & Gold) ---
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

    // 1. Central Engine Power Core / Harness
    const coreGeo = new THREE.BoxGeometry(0.65, 0.9, 0.45);
    const core = new THREE.Mesh(coreGeo, goldMat);
    core.castShadow = true;
    group.add(core);

    const topCowlGeo = new THREE.BoxGeometry(0.55, 0.25, 0.4);
    const topCowl = new THREE.Mesh(topCowlGeo, darkMat);
    topCowl.position.set(0, 0.5, 0);
    group.add(topCowl);

    const midPanelGeo = new THREE.BoxGeometry(0.42, 0.45, 0.48);
    const midPanel = new THREE.Mesh(midPanelGeo, goldMat);
    group.add(midPanel);

    // Cross-connecting harness bar
    const barGeo = new THREE.BoxGeometry(1.3, 0.18, 0.3);
    const bar = new THREE.Mesh(barGeo, darkMat);
    group.add(bar);

    // 2. Dual Chrome Rocket Thrusters (Left & Right)
    for (let x of [-0.62, 0.62]) {
        // Rocket Body Cylinder
        const thrusterGeo = new THREE.CylinderGeometry(0.22, 0.26, 1.3, 20);
        const thruster = new THREE.Mesh(thrusterGeo, chromeMat);
        thruster.position.set(x, 0, 0);
        thruster.castShadow = true;
        group.add(thruster);

        // Top Conical Nose Cap
        const capGeo = new THREE.ConeGeometry(0.22, 0.45, 20);
        const cap = new THREE.Mesh(capGeo, chromeMat);
        cap.position.set(x, 0.87, 0);
        cap.castShadow = true;
        group.add(cap);

        // Bottom Flare Exhaust Nozzle
        const nozzleGeo = new THREE.CylinderGeometry(0.28, 0.18, 0.35, 20);
        const nozzle = new THREE.Mesh(nozzleGeo, darkMat);
        nozzle.position.set(x, -0.8, 0);
        nozzle.castShadow = true;
        group.add(nozzle);

        // Inside Flame Glow Nozzle
        const flameGeo = new THREE.ConeGeometry(0.16, 0.35, 16);
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.set(x, -1.0, 0);
        flame.rotation.x = Math.PI; // pointing down
        group.add(flame);
    }

    group.scale.set(1.2, 1.2, 1.2);
    return group;
}

// --- 3D Multiplier 2X Star/Gem Pickup Mesh ---
function createMultiplierPickupMesh() {
    const group = new THREE.Group();
    const starGeo = new THREE.OctahedronGeometry(0.7, 0);
    const starMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0x665500,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1
    });
    const star = new THREE.Mesh(starGeo, starMat);
    star.castShadow = true;
    group.add(star);

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
        
        let initialColor = 0xffea00; // Bright yellow & white default
        if (equippedCharacter === 'red') initialColor = 0xe74c3c;
        else if (equippedCharacter === 'green') initialColor = 0x2ecc71;
        else if (equippedCharacter === 'gold') initialColor = 0xf1c40f;

        let rightHandBone = null;
        let spineBone = null;

        player.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = child.material.clone();
                child.material.color.setHex(initialColor);
            }
            if (child.isBone) {
                const bName = child.name.toLowerCase();
                if (bName.includes('righthand') || bName.includes('right_hand') || (bName.includes('hand') && bName.includes('r'))) {
                    rightHandBone = child;
                }
                if (bName.includes('spine2') || bName.includes('spine1') || bName.includes('spine') || bName.includes('chest')) {
                    if (!spineBone) spineBone = child;
                }
            }
        });

        // 1. Equipped Magnet (Held in Right Hand)
        equippedMagnetMesh = createMagnetPickupMesh();
        equippedMagnetMesh.scale.set(0.35, 0.35, 0.35);
        equippedMagnetMesh.position.set(-0.5, 0.9, -0.15); // Right hand side
        equippedMagnetMesh.rotation.set(0, Math.PI / 2, Math.PI / 2);
        equippedMagnetMesh.visible = false;
        player.add(equippedMagnetMesh);

        // 2. Equipped Jetpack (Mounted on Back)
        equippedJetpackMesh = createJetpackPickupMesh();
        equippedJetpackMesh.scale.set(0.65, 0.65, 0.65);
        equippedJetpackMesh.position.set(0, 1.25, 0.32); // On upper back facing camera
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
        
        // Touch Swipe Controls for Mobile/Tablet
        const touchOptions = { passive: false };
        window.addEventListener('touchstart', handleTouchStart, touchOptions);
        window.addEventListener('touchmove', handleTouchMove, touchOptions);
        window.addEventListener('touchend', handleTouchEnd, touchOptions);
        window.addEventListener('touchcancel', handleTouchEnd, touchOptions);
        
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
        return; // Don't spawn obstacle here
    }

    if (rand < 0.38) { // Indian Railways Maroon / Vande Bharat / Bullet Train
        const lane = Math.floor(Math.random() * 3) - 1;
        const themeRand = Math.random();
        const theme = (themeRand < 0.45) ? 'maroon' : (themeRand < 0.75 ? 'orange' : 'blue');
        const group = createModernTrainMesh(theme);
        const trainZ = zPos + 10;
        group.position.set(lane * LANE_WIDTH, 0, trainZ);
        scene.add(group);
        
        // 55% chance for a ramp leading smoothly onto the train roof!
        const hasRamp = (Math.random() < 0.55);
        let rampGroup = null;
        if (hasRamp) {
            rampGroup = createTrainRampMesh();
            rampGroup.position.set(lane * LANE_WIDTH, 0, trainZ - 8.5);
            scene.add(rampGroup);

            // Spawn trail of coins smoothly up the ramp and across the roof!
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
        
        const hitGeo = new THREE.BoxGeometry(3.6, 5, 17);
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
    } else if (rand < 0.65) { // Barricades (Type III 3-rail construction barriers & Standard hurdles)
        const lane = Math.floor(Math.random() * 3) - 1;
        const isType3 = (Math.random() > 0.45); // Mix of new 3-rail orange/white barricades & standard hurdles
        const barData = isType3 ? createType3Barricade() : createStandardBarricade();
        const group = barData.group;

        group.position.set(lane * LANE_WIDTH, 0, zPos + 10);
        scene.add(group);
        
        const hitGeo = new THREE.BoxGeometry(4.2, barData.hitboxH, 0.8);
        const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({visible: false}));
        hitMesh.position.set(lane * LANE_WIDTH, barData.hitboxY, zPos + 10);
        scene.add(hitMesh);
        
        obstacles.push({ mesh: hitMesh, visual: group, type: 'barricade' });
        
        if (Math.random() > 0.35) spawnCoin(lane, barData.height + 0.6, zPos + 10);
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
    const threshold = 25; // 25px threshold

    if (Math.abs(diffX) > threshold || Math.abs(diffY) > threshold) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (diffX > 0) {
                // Swiped right on screen -> Move Right
                moveRight();
            } else {
                // Swiped left on screen -> Move Left
                moveLeft();
            }
        } else {
            // Vertical swipe
            if (diffY < 0) {
                // Swiped up on screen -> Jump
                jump();
            } else {
                // Swiped down on screen -> Roll
                roll();
            }
        }
        // Update anchor point for fluid chaining
        touchStartX = t.clientX;
        touchStartY = t.clientY;
    }
}

function handleTouchEnd(evt) {
    isSwiping = false;
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

    // Update Equipped visual items on character
    if (equippedMagnetMesh) {
        equippedMagnetMesh.visible = (activeBuffs.magnet > 0);
    }
    if (equippedJetpackMesh) {
        equippedJetpackMesh.visible = (activeBuffs.jetpack > 0);
        if (activeBuffs.jetpack > 0) {
            // Animate rocket flames
            const flamePulse = 1.0 + Math.sin(time * 0.04) * 0.35;
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
        if (obs.type === 'train' && Math.abs(pX - obs.mesh.position.x) < 2.2) {
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

            // On the roof of the train
            if (pZ >= noseZ && pZ <= rearZ) {
                // If player is already on the roof, jumping onto roof, coming from ramp, or falling onto roof
                if (player.position.y >= 3.6 || targetFloorY > 0) {
                    targetFloorY = 4.75;
                }
            }
        }
    }

    // Jetpack physics override
    if (activeBuffs.jetpack > 0) {
        player.position.y += (12 - player.position.y) * 5 * dt; // Fly up to y=12
        
        // Spawn sky coins dynamically in front of player
        if (Math.random() < 0.1) {
            spawnCoin(currentLane, 12, player.position.z + 50);
        }
    } else {
        // Normal / Roof Gravity physics
        if (player.position.y > targetFloorY || isJumping) {
            yVelocity += GRAVITY * dt;
            player.position.y += yVelocity * dt;
            if (player.position.y <= targetFloorY) {
                player.position.y = targetFloorY;
                isJumping = false;
                yVelocity = 0;
            }
        } else if (player.position.y < targetFloorY) {
            // Smoothly ascend ramp slope
            player.position.y = targetFloorY;
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
                    // If on train roof or ascending a ramp, player doesn't die!
                    if (player.position.y >= 3.6 || (obs.hasRamp && player.position.z < obs.mesh.position.z - 4)) {
                        // Safe on roof or on ramp
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
