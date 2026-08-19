// --- THREE.JS SETUP ---
const container = document.getElementById('game-container');

const scene = new THREE.Scene();

// 1. Crystal-Clear Radiant Blue Sky & Sun Fog (No more black background!)
scene.background = new THREE.Color(0x38a3f5); // Vibrant Azure Blue Sky
scene.fog = new THREE.Fog(0x38a3f5, 70, 260);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
container.insertBefore(renderer.domElement, container.firstChild);

// --- BRIGHT DAYLIGHT & MULTI-ANGLE LIGHTING ---
// Powerful Ambient Light so no side of any building or car is ever in dark shadow!
const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
scene.add(ambientLight);

// Sky & Ground Hemisphere Light
const hemiLight = new THREE.HemisphereLight(0x64b5f6, 0xfff3e0, 0.9);
scene.add(hemiLight);

// Primary Golden-Hour Sun
const sunLight = new THREE.DirectionalLight(0xfffaed, 1.6);
sunLight.position.set(50, 100, -30);
sunLight.castShadow = true;
sunLight.shadow.camera.top = 50;
sunLight.shadow.camera.bottom = -50;
sunLight.shadow.camera.left = -50;
sunLight.shadow.camera.right = 50;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
scene.add(sunLight);

// Secondary Front Fill Light (Ensures rear/side faces are bright and colorful)
const fillLight = new THREE.DirectionalLight(0x8cd8ff, 0.8);
fillLight.position.set(-40, 50, 50);
scene.add(fillLight);

// --- 1. PROCEDURAL REALISTIC MANHATTAN FACADE TEXTURES ---
function createNYCFacadeTexture(theme) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Base stone / masonry wall
    ctx.fillStyle = theme.wall;
    ctx.fillRect(0, 0, 512, 1024);

    // Subtle stone block masonry texture
    ctx.strokeStyle = theme.stoneJoint;
    ctx.lineWidth = 1;
    for (let y = 0; y < 1024; y += 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
    }

    const cols = 8;
    const rows = 28;
    const padX = 14;
    const padY = 12;
    const w = (512 - padX * (cols + 1)) / cols;
    const h = (1024 - padY * (rows + 1)) / rows;

    for (let r = 0; r < rows; r++) {
        const floorY = padY + r * (h + padY);

        // Architectural Stone Cornice / Belt Molding every 4 floors
        if (r % 4 === 0) {
            ctx.fillStyle = theme.cornice;
            ctx.fillRect(0, floorY - 6, 512, 6);
            ctx.fillStyle = theme.corniceShadow;
            ctx.fillRect(0, floorY, 512, 2);
        }

        for (let c = 0; c < cols; c++) {
            const windowX = padX + c * (w + padX);

            // Stone window sill
            ctx.fillStyle = theme.sill;
            ctx.fillRect(windowX - 2, floorY + h, w + 4, 3);

            // Window Glass
            const isLit = (c * 3 + r * 7) % 5 === 0;
            ctx.fillStyle = isLit ? theme.windowLit : theme.windowDark;
            ctx.fillRect(windowX, floorY, w, h);

            // Window Panes / Mullions
            ctx.strokeStyle = theme.windowFrame;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(windowX, floorY, w, h);
            ctx.beginPath();
            ctx.moveTo(windowX + w / 2, floorY);
            ctx.lineTo(windowX + w / 2, floorY + h);
            ctx.moveTo(windowX, floorY + h / 2);
            ctx.lineTo(windowX + w, floorY + h / 2);
            ctx.stroke();
        }
    }

    // Vertical Classical Masonry Pilasters / Columns
    ctx.fillStyle = theme.pilaster;
    ctx.fillRect(0, 0, 10, 1024);
    ctx.fillRect(502, 0, 10, 1024);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

// 4 Authentic Manhattan Architectural Themes (Limestone, Sandstone, Bronze Glass, Granite)
const nycThemes = [
    // 1. Classic Manhattan Limestone / Pre-War Tower (like 40 Wall St base)
    {
        wall: '#f2e6d8',
        stoneJoint: 'rgba(180, 160, 140, 0.3)',
        cornice: '#dfcebb',
        corniceShadow: '#a68c74',
        sill: '#ffffff',
        windowDark: '#1c2833',
        windowLit: '#fff3d1',
        windowFrame: '#6c5340',
        pilaster: '#ecd8c2',
        matColor: 0xf5ebe0
    },
    // 2. Warm Sandstone / Terracotta High-Rise
    {
        wall: '#e8cca8',
        stoneJoint: 'rgba(160, 130, 100, 0.3)',
        cornice: '#cfaf89',
        corniceShadow: '#8f6e4a',
        sill: '#f8eedd',
        windowDark: '#1a2228',
        windowLit: '#ffecb3',
        windowFrame: '#593e2b',
        pilaster: '#ddbe96',
        matColor: 0xead2b6
    },
    // 3. Dark Bronze & Amber Mirror Glass Corporate High-Rise
    {
        wall: '#26201b',
        stoneJoint: 'rgba(30, 25, 20, 0.4)',
        cornice: '#3d342d',
        corniceShadow: '#14110e',
        sill: '#54473e',
        windowDark: '#181412',
        windowLit: '#ffd580',
        windowFrame: '#524338',
        pilaster: '#382f28',
        matColor: 0x3d322a
    },
    // 4. White Granite & Gotham Deco Tower
    {
        wall: '#e0e2e5',
        stoneJoint: 'rgba(150, 155, 165, 0.3)',
        cornice: '#c8cbd0',
        corniceShadow: '#7a7e86',
        sill: '#ffffff',
        windowDark: '#1a2634',
        windowLit: '#e0f2fe',
        windowFrame: '#4a505c',
        pilaster: '#d2d5da',
        matColor: 0xe8eaec
    }
];

const nycMaterials = nycThemes.map(theme => {
    return new THREE.MeshStandardMaterial({
        map: createNYCFacadeTexture(theme),
        color: theme.matColor,
        roughness: 0.55,
        metalness: 0.05,
        bumpScale: 0.05
    });
});

// Copper Green Patina Material (for iconic NYC pyramid spires like 40 Wall St)
const copperRoofMat = new THREE.MeshStandardMaterial({
    color: 0x38b29c, // Weathered Patina Copper Green
    roughness: 0.45,
    metalness: 0.25
});

// Gold Spire / Finial Material
const goldSpireMat = new THREE.MeshStandardMaterial({
    color: 0xe5a93c, // Aged Architectural Gold
    roughness: 0.2,
    metalness: 0.9,
    envMapIntensity: 1.5
});

// Wooden Rooftop Water Tower Material
const woodWaterTankMat = new THREE.MeshStandardMaterial({
    color: 0x6d4c41, // Weathered Cedar Wood
    roughness: 0.8,
    metalness: 0.1
});
const ironFrameMat = new THREE.MeshStandardMaterial({
    color: 0x37474f, // Industrial Iron
    roughness: 0.6,
    metalness: 0.7
});

// --- ROAD TEXTURES ---
const textureLoader = new THREE.TextureLoader();
const roadTexture = textureLoader.load('assets/road.png');
roadTexture.wrapS = THREE.RepeatWrapping;
roadTexture.wrapT = THREE.RepeatWrapping;
roadTexture.repeat.set(2, 20);

// --- ENVIRONMENT (ROAD & VIBRANT HIGHWAY) ---
const ROAD_WIDTH = 22;
const ROAD_LENGTH = 240;
let roadSegments = [];
let buildings = [];
let sceneryObjects = [];
let roadOffset = 0;

const environmentGroup = new THREE.Group();
scene.add(environmentGroup);

function createEnvironment() {
    // 1. High-Contrast Highway Asphalt
    const roadGeom = new THREE.PlaneGeometry(ROAD_WIDTH, ROAD_LENGTH);
    const roadMat = new THREE.MeshStandardMaterial({ 
        map: roadTexture,
        roughness: 0.5,
        metalness: 0.1,
        color: 0xaaaaaa 
    });
    const road = new THREE.Mesh(roadGeom, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -ROAD_LENGTH/2 + 20;
    road.receiveShadow = true;
    environmentGroup.add(road);
    
    // 2. Red & White Alternating Racing Track Curbs
    const curbGeom = new THREE.BoxGeometry(0.8, 0.15, 4);
    const curbRedMat = new THREE.MeshStandardMaterial({ color: 0xff1744, roughness: 0.3 });
    const curbWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    
    for (let i = 0; i < ROAD_LENGTH; i += 4) {
        const isRed = (Math.floor(i / 4) % 2 === 0);
        const mat = isRed ? curbRedMat : curbWhiteMat;
        
        // Left Curb
        const curbL = new THREE.Mesh(curbGeom, mat);
        curbL.position.set(-ROAD_WIDTH/2 - 0.4, 0.08, -i + 20);
        roadSegments.push(curbL);
        environmentGroup.add(curbL);
        
        // Right Curb
        const curbR = new THREE.Mesh(curbGeom, mat);
        curbR.position.set(ROAD_WIDTH/2 + 0.4, 0.08, -i + 20);
        roadSegments.push(curbR);
        environmentGroup.add(curbR);
    }
    
    // 3. Bright Highway Lane Markings & Golden Edge Lines
    const lineGeom = new THREE.PlaneGeometry(0.45, 4.0);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const yellowLineMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    
    for (let i = 0; i < ROAD_LENGTH; i += 8) {
        // Center Lane 1
        const line1 = new THREE.Mesh(lineGeom, lineMat);
        line1.rotation.x = -Math.PI / 2;
        line1.position.set(-ROAD_WIDTH/6, 0.025, -i + 20);
        roadSegments.push(line1);
        environmentGroup.add(line1);
        
        // Center Lane 2
        const line2 = new THREE.Mesh(lineGeom, lineMat);
        line2.rotation.x = -Math.PI / 2;
        line2.position.set(ROAD_WIDTH/6, 0.025, -i + 20);
        roadSegments.push(line2);
        environmentGroup.add(line2);
        
        // Yellow Outer Guard Lines
        const yellowL = new THREE.Mesh(lineGeom, yellowLineMat);
        yellowL.rotation.x = -Math.PI / 2;
        yellowL.position.set(-ROAD_WIDTH/2 + 0.6, 0.025, -i + 20);
        roadSegments.push(yellowL);
        environmentGroup.add(yellowL);

        const yellowR = new THREE.Mesh(lineGeom, yellowLineMat);
        yellowR.rotation.x = -Math.PI / 2;
        yellowR.position.set(ROAD_WIDTH/2 - 0.6, 0.025, -i + 20);
        roadSegments.push(yellowR);
        environmentGroup.add(yellowR);
    }
    
    // 4. REALISTIC MANHATTAN TIERED SKYSCRAPERS WITH COPPER SPIRES & WATER TOWERS
    const baseBoxGeom = new THREE.BoxGeometry(1, 1, 1);

    for (let i = 0; i < 42; i++) {
        const buildingGroup = new THREE.Group();
        const mat = nycMaterials[i % nycMaterials.length];
        
        const isLeft = (i % 2 === 0);
        const width = 10 + (i % 4) * 2.2;
        const baseHeight = 28 + (i * 7) % 35;
        const depth = 10 + (i % 3) * 2.5;
        
        const xPos = isLeft ? -(ROAD_WIDTH/2 + width/2 + 3.0) : (ROAD_WIDTH/2 + width/2 + 3.0);
        const zPos = -((i * 6.5) % ROAD_LENGTH) + 20;

        // Tier 1: Main Base Tower
        const baseTower = new THREE.Mesh(baseBoxGeom, mat);
        baseTower.scale.set(width, baseHeight, depth);
        baseTower.position.set(0, baseHeight / 2, 0);
        baseTower.castShadow = true;
        baseTower.receiveShadow = true;
        buildingGroup.add(baseTower);

        // Tier 2: Mid-Level Setback (Stepped Architecture)
        const tier2W = width * 0.82;
        const tier2D = depth * 0.82;
        const tier2H = baseHeight * 0.35;
        const tier2Tower = new THREE.Mesh(baseBoxGeom, mat);
        tier2Tower.scale.set(tier2W, tier2H, tier2D);
        tier2Tower.position.set(0, baseHeight + tier2H / 2, 0);
        tier2Tower.castShadow = true;
        tier2Tower.receiveShadow = true;
        buildingGroup.add(tier2Tower);

        // Tier 3: Upper Crown Setback
        const tier3W = tier2W * 0.78;
        const tier3D = tier2D * 0.78;
        const tier3H = baseHeight * 0.25;
        const tier3Tower = new THREE.Mesh(baseBoxGeom, mat);
        tier3Tower.scale.set(tier3W, tier3H, tier3D);
        tier3Tower.position.set(0, baseHeight + tier2H + tier3H / 2, 0);
        tier3Tower.castShadow = true;
        tier3Tower.receiveShadow = true;
        buildingGroup.add(tier3Tower);

        const totalTowerHeight = baseHeight + tier2H + tier3H;

        // Rooftop Architecture Type
        const roofType = i % 3;

        if (roofType === 0) {
            // --- VARIANT A: CLASSIC ART DECO COPPER GREEN PYRAMID & GOLD SPIRE (40 Wall St Style) ---
            const pyramidH = 7.5;
            // 4-Sided Pyramid
            const pyramidGeom = new THREE.ConeGeometry(tier3W * 0.65, pyramidH, 4);
            pyramidGeom.rotateY(Math.PI / 4);
            const copperRoof = new THREE.Mesh(pyramidGeom, copperRoofMat);
            copperRoof.position.set(0, totalTowerHeight + pyramidH / 2, 0);
            copperRoof.castShadow = true;
            buildingGroup.add(copperRoof);

            // Tall Gold Spire Needle
            const spireGeom = new THREE.CylinderGeometry(0.1, 0.35, 9, 8);
            const spire = new THREE.Mesh(spireGeom, goldSpireMat);
            spire.position.set(0, totalTowerHeight + pyramidH + 4.5, 0);
            buildingGroup.add(spire);

        } else if (roofType === 1) {
            // --- VARIANT B: CLASSIC NYC ROOFTOP WITH WOODEN WATER TOWER & MECHANICAL PENTHOUSE ---
            // Mechanical Box
            const mechGeom = new THREE.BoxGeometry(tier3W * 0.5, 3.5, tier3D * 0.5);
            const mechBox = new THREE.Mesh(mechGeom, mat);
            mechBox.position.set(0, totalTowerHeight + 1.75, 0);
            buildingGroup.add(mechBox);

            // Wooden Water Tower (Cylinder Barrel + Conical Cap on Iron Stilts)
            const tankGroup = new THREE.Group();
            tankGroup.position.set(tier3W * 0.2, totalTowerHeight + 3.5, tier3D * 0.2);

            const stiltGeom = new THREE.CylinderGeometry(0.06, 0.06, 2.5, 6);
            for (let s = 0; s < 4; s++) {
                const stilt = new THREE.Mesh(stiltGeom, ironFrameMat);
                const sx = (s % 2 === 0 ? 0.7 : -0.7);
                const sz = (s < 2 ? 0.7 : -0.7);
                stilt.position.set(sx, 1.25, sz);
                tankGroup.add(stilt);
            }

            const barrelGeom = new THREE.CylinderGeometry(1.0, 1.0, 2.2, 12);
            const barrel = new THREE.Mesh(barrelGeom, woodWaterTankMat);
            barrel.position.set(0, 3.6, 0);
            tankGroup.add(barrel);

            const coneCapGeom = new THREE.ConeGeometry(1.1, 1.0, 12);
            const cap = new THREE.Mesh(coneCapGeom, copperRoofMat);
            cap.position.set(0, 5.2, 0);
            tankGroup.add(cap);

            buildingGroup.add(tankGroup);

        } else {
            // --- VARIANT C: STEPPED GOTHAM CROWN WITH RADIO ANTENNAS ---
            const crownStepGeom = new THREE.BoxGeometry(tier3W * 0.6, 3.0, tier3D * 0.6);
            const crownStep = new THREE.Mesh(crownStepGeom, mat);
            crownStep.position.set(0, totalTowerHeight + 1.5, 0);
            buildingGroup.add(crownStep);

            // Tall Radio Antenna Mast
            const antennaGeom = new THREE.CylinderGeometry(0.06, 0.2, 10, 8);
            const antenna = new THREE.Mesh(antennaGeom, ironFrameMat);
            antenna.position.set(0, totalTowerHeight + 8.0, 0);
            buildingGroup.add(antenna);
        }

        buildingGroup.position.set(xPos, 0, zPos);
        buildings.push(buildingGroup);
        environmentGroup.add(buildingGroup);
    }

    // 5. High-Tech Glowing Overhead Highway Gantries / Neon Arches
    const archPillarGeom = new THREE.CylinderGeometry(0.2, 0.25, 9, 8);
    const archTopGeom = new THREE.BoxGeometry(ROAD_WIDTH + 4, 0.6, 0.8);
    const archFrameMat = new THREE.MeshStandardMaterial({ color: 0x1a1a24, metalness: 0.8, roughness: 0.3 });

    const archColors = [0x00e676, 0xff0055, 0x00f3ff, 0xffab00];

    for (let i = 0; i < ROAD_LENGTH; i += 40) {
        const archColor = archColors[(i / 40) % archColors.length];
        const archNeonMat = new THREE.MeshBasicMaterial({ color: archColor });
        
        const gantryGroup = new THREE.Group();
        gantryGroup.position.set(0, 0, -i + 20);

        // Left Pillar
        const pillarL = new THREE.Mesh(archPillarGeom, archFrameMat);
        pillarL.position.set(-ROAD_WIDTH/2 - 1.8, 4.5, 0);
        gantryGroup.add(pillarL);

        // Right Pillar
        const pillarR = new THREE.Mesh(archPillarGeom, archFrameMat);
        pillarR.position.set(ROAD_WIDTH/2 + 1.8, 4.5, 0);
        gantryGroup.add(pillarR);

        // Top Crossbeam
        const topBeam = new THREE.Mesh(archTopGeom, archFrameMat);
        topBeam.position.set(0, 8.8, 0);
        gantryGroup.add(topBeam);

        // Glowing Neon Highway Sign / Lightstrip
        const neonStrip = new THREE.Mesh(new THREE.BoxGeometry(ROAD_WIDTH, 0.25, 0.9), archNeonMat);
        neonStrip.position.set(0, 8.8, 0);
        gantryGroup.add(neonStrip);

        sceneryObjects.push(gantryGroup);
        environmentGroup.add(gantryGroup);
    }

    // 6. Roadside Highway Light Poles with Cyan and Green Glowing Fixtures
    const poleGeom = new THREE.CylinderGeometry(0.08, 0.1, 7, 8);
    const poleArmGeom = new THREE.BoxGeometry(2.5, 0.08, 0.08);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.8, roughness: 0.2 });
    const lampGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });

    for (let i = 0; i < ROAD_LENGTH; i += 20) {
        // Left Street Lamp
        const lampGroupL = new THREE.Group();
        lampGroupL.position.set(-ROAD_WIDTH/2 - 1.5, 3.5, -i + 20);
        
        const poleL = new THREE.Mesh(poleGeom, poleMat);
        lampGroupL.add(poleL);
        const armL = new THREE.Mesh(poleArmGeom, poleMat);
        armL.position.set(1.1, 3.4, 0);
        lampGroupL.add(armL);
        const lightL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.2), lampGlowMat);
        lightL.position.set(2.0, 3.35, 0);
        lampGroupL.add(lightL);

        sceneryObjects.push(lampGroupL);
        environmentGroup.add(lampGroupL);

        // Right Street Lamp
        const lampGroupR = new THREE.Group();
        lampGroupR.position.set(ROAD_WIDTH/2 + 1.5, 3.5, -i + 20);
        
        const poleR = new THREE.Mesh(poleGeom, poleMat);
        lampGroupR.add(poleR);
        const armR = new THREE.Mesh(poleArmGeom, poleMat);
        armR.position.set(-1.1, 3.4, 0);
        lampGroupR.add(armR);
        const lightR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.2), lampGlowMat);
        lightR.position.set(-2.0, 3.35, 0);
        lampGroupR.add(lightR);

        sceneryObjects.push(lampGroupR);
        environmentGroup.add(lampGroupR);
    }
}
createEnvironment();


// --- UI ELEMENTS ---
const uiMainMenu = document.getElementById('main-menu');
const uiGarage = document.getElementById('garage-menu');
const uiHud = document.getElementById('hud');
const uiGameOver = document.getElementById('game-over');

const carNameEl = document.getElementById('car-name');
const statSpeedEl = document.getElementById('stat-speed');
const statHandlingEl = document.getElementById('stat-handling');

const scoreEl = document.getElementById('score');
const speedEl = document.getElementById('speed');
const finalScoreEl = document.getElementById('final-score-val');

// --- GAME STATE ---
let state = 'MENU'; // MENU, GARAGE, PLAYING, GAMEOVER
let currentCarIndex = 0;
let player;
let playerSpeed = 0;
let traffic = [];
let score = 0;
let garageCarModel = null;

const input = { left: false, right: false, accel: false, brake: false };

// --- EVENT LISTENERS ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth Keyboard Controls: W (forward), S (brake), A (left), D (right) & Arrows
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'arrowleft' || key === 'a') input.left = true;
    if (key === 'arrowright' || key === 'd') input.right = true;
    if (key === 'arrowup' || key === 'w') input.accel = true;
    if (key === 'arrowdown' || key === 's') input.brake = true;
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'arrowleft' || key === 'a') input.left = false;
    if (key === 'arrowright' || key === 'd') input.right = false;
    if (key === 'arrowup' || key === 'w') input.accel = false;
    if (key === 'arrowdown' || key === 's') input.brake = false;
});

// Navigation Buttons
document.getElementById('btn-play').addEventListener('click', startGame);
document.getElementById('btn-garage').addEventListener('click', openGarage);
document.getElementById('btn-back-main').addEventListener('click', () => switchState('MENU'));
document.getElementById('btn-select-car').addEventListener('click', () => switchState('MENU'));
document.getElementById('btn-restart').addEventListener('click', startGame);
document.getElementById('btn-menu-from-over').addEventListener('click', () => switchState('MENU'));
document.getElementById('btn-prev-car').addEventListener('click', () => {
    currentCarIndex = (currentCarIndex - 1 + CARS.length) % CARS.length;
    updateGarageDisplay();
});
document.getElementById('btn-next-car').addEventListener('click', () => {
    currentCarIndex = (currentCarIndex + 1) % CARS.length;
    updateGarageDisplay();
});


// --- LOGIC ---

function switchState(newState) {
    state = newState;
    uiMainMenu.classList.add('hidden');
    uiGarage.classList.add('hidden');
    uiHud.classList.add('hidden');
    uiGameOver.classList.add('hidden');

    uiMainMenu.classList.remove('active');
    uiGarage.classList.remove('active');
    uiHud.classList.remove('active');
    uiGameOver.classList.remove('active');

    if (state === 'MENU') uiMainMenu.classList.add('active');
    else if (state === 'GARAGE') uiGarage.classList.add('active');
    else if (state === 'PLAYING') uiHud.classList.add('active');
    else if (state === 'GAMEOVER') uiGameOver.classList.add('active');
    
    // Setup cameras based on state
    if (state === 'MENU' || state === 'GAMEOVER') {
        if(player) {
            camera.position.set(player.mesh.position.x, player.mesh.position.y + 4.5, player.mesh.position.z + 12);
            camera.lookAt(player.mesh.position.x, player.mesh.position.y + 0.5, player.mesh.position.z);
        } else {
            camera.position.set(0, 4.5, 9);
            camera.lookAt(0, 0.5, 0);
        }
    } else if (state === 'GARAGE') {
        // Dramatic close-up showcase view
        camera.position.set(0, 3.2, 8.2);
        camera.lookAt(0, 0.6, 0);
    }
}

function updateGarageDisplay() {
    const carData = CARS[currentCarIndex];
    carNameEl.textContent = carData.name;
    
    statSpeedEl.style.width = `${(carData.speed / 200) * 100}%`;
    statHandlingEl.style.width = `${(carData.handling / 100) * 100}%`;
    
    // Spawn 3D model for garage viewing
    if (garageCarModel) {
        scene.remove(garageCarModel.mesh);
    }
    
    garageCarModel = new Car3D(scene, false, carData);
    garageCarModel.mesh.position.set(0, 0, 0);
    garageCarModel.mesh.rotation.y = Math.PI / 4; // Angle it nicely
}

function openGarage() {
    if(player) player.destroy(); // hide game player
    traffic.forEach(c => c.destroy());
    traffic = [];
    
    updateGarageDisplay();
    switchState('GARAGE');
}

function startGame() {
    if(garageCarModel) {
        scene.remove(garageCarModel.mesh);
        garageCarModel = null;
    }
    if(player) player.destroy();
    traffic.forEach(c => c.destroy());
    traffic = [];
    
    const carData = CARS[currentCarIndex];
    player = new Car3D(scene, true, carData);
    player.mesh.position.set(0, 0, 0);
    
    // Reset inputs
    input.accel = false;
    input.brake = false;
    input.left = false;
    input.right = false;
    
    // Start at smooth cruising speed
    player.speed = 45;
    score = 0;
    
    switchState('PLAYING');
}

function spawnTraffic() {
    // Only spawn traffic if player is moving
    if (player.speed < 10) return;
    
    if (Math.random() < 0.04) {
        const laneWidth = ROAD_WIDTH / 3;
        const lane = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        const spawnX = lane * laneWidth;
        const spawnZ = player.mesh.position.z - 170;
        
        // Ensure no other vehicle is overlapping in this lane
        const tooClose = traffic.some(t => Math.abs(t.mesh.position.x - spawnX) < 2.0 && Math.abs(t.mesh.position.z - spawnZ) < 36);
        if (tooClose) return;

        const randomTrafficData = TRAFFIC_MODELS[Math.floor(Math.random() * TRAFFIC_MODELS.length)];
        const car = new Car3D(scene, false, randomTrafficData);
        car.mesh.position.set(spawnX, 0, spawnZ);
        traffic.push(car);
    }
}

function checkCollisions() {
    const hitboxMargin = 0.5;
    
    for (let car of traffic) {
        // Distance check
        const distZ = Math.abs(player.mesh.position.z - car.mesh.position.z);
        const distX = Math.abs(player.mesh.position.x - car.mesh.position.x);
        
        if (distZ < (player.length/2 + car.length/2 - hitboxMargin) && 
            distX < (player.width/2 + car.width/2 - hitboxMargin)) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    finalScoreEl.textContent = Math.floor(score);
    switchState('GAMEOVER');
}

// --- MAIN LOOP ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const dt = Math.min(clock.getDelta(), 0.1); // Cap delta to prevent huge jumps
    
    if (state === 'GARAGE' && garageCarModel) {
        garageCarModel.mesh.rotation.y += dt * 0.5;
    }
    
    if (state === 'PLAYING') {
        playerSpeed = player.speed;
        player.update(dt, input, ROAD_WIDTH);
        
        // Update score
        score += (playerSpeed / 10) * dt;
        scoreEl.textContent = Math.floor(score);
        speedEl.textContent = Math.floor(playerSpeed);
        
        // 3rd Person Camera Follow (Optimized for clear car & road visibility)
        const cameraZOffset = 7.0;
        const cameraYOffset = 3.2;
        
        // Smooth camera follow on X axis
        camera.position.x += (player.mesh.position.x - camera.position.x) * 6 * dt;
        camera.position.y = player.mesh.position.y + cameraYOffset;
        camera.position.z = player.mesh.position.z + cameraZOffset;
        
        // Look ahead down the road
        const lookAtPos = new THREE.Vector3(
            player.mesh.position.x,
            player.mesh.position.y + 0.8,
            player.mesh.position.z - 16
        );
        camera.lookAt(lookAtPos);
        
        // Asphalt-Style Dynamic FOV on high speed
        const targetFov = 75 + (playerSpeed / player.maxSpeed) * 10;
        camera.fov += (targetFov - camera.fov) * 3 * dt;
        camera.updateProjectionMatrix();
        
        // Scroll Environment
        const scrollDist = playerSpeed * dt;
        roadSegments.forEach(seg => {
            seg.position.z += scrollDist;
            if (seg.position.z > 20) {
                seg.position.z -= ROAD_LENGTH;
            }
        });
        
        buildings.forEach(b => {
            b.position.z += scrollDist;
            if (b.position.z > 20) {
                b.position.z -= ROAD_LENGTH;
            }
        });

        sceneryObjects.forEach(obj => {
            obj.position.z += scrollDist;
            if (obj.position.z > 20) {
                obj.position.z -= ROAD_LENGTH;
            }
        });
        
        // Traffic
        spawnTraffic();
        for (let i = traffic.length - 1; i >= 0; i--) {
            let car = traffic[i];
            car.update(dt, null, ROAD_WIDTH);
            
            // Remove passed cars
            if (car.mesh.position.z > player.mesh.position.z + 20) {
                car.destroy();
                traffic.splice(i, 1);
            }
        }
        
        if (checkCollisions()) {
            gameOver();
        }
    } else if (state === 'MENU' || state === 'GAMEOVER') {
        // Slow environment scroll for background effect
        const scrollDist = 20 * dt;
        roadSegments.forEach(seg => {
            seg.position.z += scrollDist;
            if (seg.position.z > 20) seg.position.z -= ROAD_LENGTH;
        });
        buildings.forEach(b => {
            b.position.z += scrollDist;
            if (b.position.z > 20) b.position.z -= ROAD_LENGTH;
        });
        sceneryObjects.forEach(obj => {
            obj.position.z += scrollDist;
            if (obj.position.z > 20) obj.position.z -= ROAD_LENGTH;
        });
    }

    renderer.render(scene, camera);
}

// Start
switchState('MENU');
animate();
