const CARS = [
    {
        id: 'car1',
        name: 'Crimson Diablo GT',
        speed: 175,
        handling: 88,
        bodyColor: 0xff0033, // Vivid Candy Red
        stripeColor: 0xffd700, // Gold Racing Stripe
        accentColor: 0x111111, // Forged Carbon
        caliperColor: 0xffd700, // Gold Calipers
        nitroColor: 0xff0044, // Red Nitro Flame
        rimColor: 0x1a1a1a // Gloss Charcoal Rims
    },
    {
        id: 'car2',
        name: 'Viper Stryker',
        speed: 190,
        handling: 95,
        bodyColor: 0x00e676, // Acid Emerald Green
        stripeColor: 0x0a0a0a, // Carbon Black Stripe
        accentColor: 0x050505, // Matte Carbon
        caliperColor: 0x00f3ff, // Electric Cyan Calipers
        nitroColor: 0x00ff88, // Neon Lime-Green Nitro
        rimColor: 0xd4af37 // Satin Gold Rims
    },
    {
        id: 'car3',
        name: 'Chiron Phantom',
        speed: 185,
        handling: 82,
        bodyColor: 0x0066ff, // Liquid French Blue
        stripeColor: 0x00e5ff, // Electric Cyan Accent
        accentColor: 0x08080c, // Carbon Black
        caliperColor: 0xff0055, // Hot Pink/Red Calipers
        nitroColor: 0xbc13fe, // Neon Purple Nitro
        rimColor: 0xffffff // Diamond Cut Chrome Rims
    },
    {
        id: 'car4',
        name: 'Solaris Gold GT',
        speed: 180,
        handling: 85,
        bodyColor: 0xffab00, // Metallic Sunset Gold/Amber
        stripeColor: 0xffffff, // Pure White Stripe
        accentColor: 0x151515, // Forged Carbon
        caliperColor: 0xff1744, // Red Calipers
        nitroColor: 0xff5500, // Solar Fire Nitro
        rimColor: 0x222222 // Matte Black Rims
    },
    {
        id: 'car5',
        name: 'Ultraviolet Spectre',
        speed: 195,
        handling: 90,
        bodyColor: 0x7c4dff, // Deep Neon Violet/Purple
        stripeColor: 0x00e676, // Acid Green Stripe
        accentColor: 0x0d0d0d, // Dark Carbon
        caliperColor: 0x00e676, // Acid Green Calipers
        nitroColor: 0x00f3ff, // Cyan Nitro
        rimColor: 0xe0e0e0 // Polished Silver Rims
    }
];

// --- REAL-WORLD CIVILIAN TRAFFIC VEHICLE TYPES ---
const TRAFFIC_MODELS = [
    // 1. Red Heavy-Duty Ford F-150 SuperCrew Pickup (User Image 1)
    { type: 'f150_pickup', name: 'Heavy-Duty F-150 Pickup', bodyColor: 0xd90429, length: 5.3, width: 2.25, speed: 52 },
    // 2. White Isuzu Commercial Box Delivery Truck (User Image 2)
    { type: 'isuzu_truck', name: 'Isuzu Commercial Box Truck', bodyColor: 0xf8f9fa, length: 5.8, width: 2.35, speed: 40 },
    // 3. Heavy 18-Wheeler Semi-Truck with Corrugated Chrome Trailer (User Image 3)
    { type: 'semi_truck', name: 'Peterbilt 18-Wheeler Semi', bodyColor: 0x1e272c, length: 11.2, width: 2.5, speed: 35 },
    // 4. Classic NYC Yellow Cab Taxi
    { type: 'taxi', name: 'NYC Yellow Cab Taxi', bodyColor: 0xffb703, length: 4.3, width: 2.0, speed: 48 },
    // 5. Luxury Full-Size 4x4 SUV
    { type: 'suv', name: 'Executive Black SUV', bodyColor: 0x14171a, length: 4.8, width: 2.2, speed: 50 }
];

class Car3D {
    constructor(scene, isPlayer = false, carData = CARS[0]) {
        this.scene = scene;
        this.isPlayer = isPlayer;
        this.carData = carData;
        
        this.speed = 0;
        this.maxSpeed = isPlayer ? carData.speed : (carData.speed || Math.random() * 15 + 40);
        this.handling = carData.handling || 75;
        
        this.width = isPlayer ? 2.3 : (carData.width || 2.2);
        this.length = isPlayer ? 4.6 : (carData.length || 4.5);
        
        this.mesh = this.isPlayer ? this.buildHypercarMesh(carData) : this.buildTrafficMesh(carData);
        this.scene.add(this.mesh);
    }
    
    // ==========================================
    // 1. PLAYER'S ASPHALT EXOTIC HYPERCAR MESH
    // ==========================================
    buildHypercarMesh(data) {
        const group = new THREE.Group();
        
        const paintMat = new THREE.MeshStandardMaterial({ 
            color: data.bodyColor, 
            roughness: 0.08, 
            metalness: 0.92,
            envMapIntensity: 1.6
        });

        const stripeMat = new THREE.MeshStandardMaterial({ 
            color: data.stripeColor, 
            roughness: 0.12, 
            metalness: 0.85,
            envMapIntensity: 1.4
        });
        
        const carbonMat = new THREE.MeshStandardMaterial({ 
            color: 0x141416, 
            roughness: 0.28, 
            metalness: 0.75,
            envMapIntensity: 1.0
        });

        const glassMat = new THREE.MeshStandardMaterial({ 
            color: 0x040608, 
            roughness: 0.02, 
            metalness: 0.98,
            envMapIntensity: 2.0
        });

        const titaniumMat = new THREE.MeshStandardMaterial({ 
            color: 0x88bbff, 
            roughness: 0.08, 
            metalness: 1.0,
            envMapIntensity: 1.8
        });

        const tireMat = new THREE.MeshStandardMaterial({ 
            color: 0x1c1c1c, 
            roughness: 0.85, 
            metalness: 0.08 
        });

        const rimMat = new THREE.MeshStandardMaterial({
            color: data.rimColor,
            roughness: 0.12,
            metalness: 0.96,
            envMapIntensity: 1.5
        });

        const caliperMat = new THREE.MeshStandardMaterial({
            color: data.caliperColor,
            roughness: 0.15,
            metalness: 0.7,
            emissive: data.caliperColor,
            emissiveIntensity: 0.4
        });

        const rotorMat = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            roughness: 0.22,
            metalness: 0.95
        });

        // Main Chassis
        const mainChassisGeom = new THREE.BoxGeometry(1.86, 0.36, 4.2);
        const mainChassis = new THREE.Mesh(mainChassisGeom, paintMat);
        mainChassis.position.set(0, 0.42, 0);
        mainChassis.castShadow = true;
        mainChassis.receiveShadow = true;
        group.add(mainChassis);

        // Center Racing Stripe
        const centerStripeGeom = new THREE.BoxGeometry(0.36, 0.365, 4.2);
        const centerStripe = new THREE.Mesh(centerStripeGeom, stripeMat);
        centerStripe.position.set(0, 0.425, 0);
        group.add(centerStripe);

        // Sloped Nose & Hood
        const hoodGeom = new THREE.BoxGeometry(1.78, 0.24, 1.5);
        const hood = new THREE.Mesh(hoodGeom, paintMat);
        hood.position.set(0, 0.46, -1.9);
        hood.rotation.x = 0.15;
        hood.castShadow = true;
        group.add(hood);

        const hoodStripeGeom = new THREE.BoxGeometry(0.36, 0.245, 1.5);
        const hoodStripe = new THREE.Mesh(hoodStripeGeom, stripeMat);
        hoodStripe.position.set(0, 0.465, -1.9);
        hoodStripe.rotation.x = 0.15;
        group.add(hoodStripe);

        // Hood Extractors
        const hoodVentGeom = new THREE.BoxGeometry(0.38, 0.06, 0.65);
        const hoodVentL = new THREE.Mesh(hoodVentGeom, carbonMat);
        hoodVentL.position.set(-0.52, 0.54, -1.8);
        hoodVentL.rotation.x = 0.15;
        group.add(hoodVentL);

        const hoodVentR = new THREE.Mesh(hoodVentGeom, carbonMat);
        hoodVentR.position.set(0.52, 0.54, -1.8);
        hoodVentR.rotation.x = 0.15;
        group.add(hoodVentR);

        // Carbon Front Splitter
        const splitterGeom = new THREE.BoxGeometry(2.18, 0.05, 0.55);
        const splitter = new THREE.Mesh(splitterGeom, carbonMat);
        splitter.position.set(0, 0.2, -2.4);
        group.add(splitter);

        // Front Aero Canards
        const canardGeom = new THREE.BoxGeometry(0.3, 0.03, 0.22);
        const canardL = new THREE.Mesh(canardGeom, carbonMat);
        canardL.position.set(-0.98, 0.46, -2.25);
        canardL.rotation.set(0.2, 0, -0.2);
        group.add(canardL);

        const canardR = new THREE.Mesh(canardGeom, carbonMat);
        canardR.position.set(0.98, 0.46, -2.25);
        canardR.rotation.set(0.2, 0, 0.2);
        group.add(canardR);

        // Widebody Fenders
        const fenderFrontGeom = new THREE.BoxGeometry(0.26, 0.46, 1.15);
        const frontFenderL = new THREE.Mesh(fenderFrontGeom, paintMat);
        frontFenderL.position.set(-1.06, 0.5, -1.35);
        group.add(frontFenderL);

        const frontFenderR = new THREE.Mesh(fenderFrontGeom, paintMat);
        frontFenderR.position.set(1.06, 0.5, -1.35);
        group.add(frontFenderR);

        const fenderRearGeom = new THREE.BoxGeometry(0.32, 0.5, 1.3);
        const rearFenderL = new THREE.Mesh(fenderRearGeom, paintMat);
        rearFenderL.position.set(-1.08, 0.54, 1.35);
        group.add(rearFenderL);

        const rearFenderR = new THREE.Mesh(fenderRearGeom, paintMat);
        rearFenderR.position.set(1.08, 0.54, 1.35);
        group.add(rearFenderR);

        // Cockpit Canopy
        const cabinGeom = new THREE.BoxGeometry(1.42, 0.48, 1.9);
        const cabin = new THREE.Mesh(cabinGeom, paintMat);
        cabin.position.set(0, 0.88, -0.05);
        cabin.castShadow = true;
        group.add(cabin);

        const windshieldGeom = new THREE.PlaneGeometry(1.38, 0.88);
        const windshield = new THREE.Mesh(windshieldGeom, glassMat);
        windshield.position.set(0, 0.9, -0.98);
        windshield.rotation.x = -Math.PI / 2.65;
        group.add(windshield);

        const rearGlassGeom = new THREE.PlaneGeometry(1.32, 1.25);
        const rearGlass = new THREE.Mesh(rearGlassGeom, glassMat);
        rearGlass.position.set(0, 0.85, 1.05);
        rearGlass.rotation.x = Math.PI / 2.9;
        group.add(rearGlass);

        const roofGeom = new THREE.BoxGeometry(1.28, 0.06, 1.25);
        const roof = new THREE.Mesh(roofGeom, carbonMat);
        roof.position.set(0, 1.13, -0.05);
        group.add(roof);

        // Le Mans Shark Fin
        const sharkFinGeom = new THREE.BoxGeometry(0.04, 0.38, 1.6);
        const sharkFin = new THREE.Mesh(sharkFinGeom, carbonMat);
        sharkFin.position.set(0, 1.18, 0.7);
        sharkFin.rotation.x = -0.15;
        group.add(sharkFin);

        // Swan-Neck GT Wing
        const wingPillarGeom = new THREE.BoxGeometry(0.06, 0.48, 0.32);
        const wingPillarL = new THREE.Mesh(wingPillarGeom, carbonMat);
        wingPillarL.position.set(-0.58, 0.86, 1.95);
        wingPillarL.rotation.x = -0.18;
        group.add(wingPillarL);

        const wingPillarR = new THREE.Mesh(wingPillarGeom, carbonMat);
        wingPillarR.position.set(0.58, 0.86, 1.95);
        wingPillarR.rotation.x = -0.18;
        group.add(wingPillarR);

        const wingBladeGeom = new THREE.BoxGeometry(2.22, 0.06, 0.48);
        const wingBlade = new THREE.Mesh(wingBladeGeom, carbonMat);
        wingBlade.position.set(0, 1.12, 2.0);
        wingBlade.rotation.x = -0.14;
        wingBlade.castShadow = true;
        group.add(wingBlade);

        // Quad Titanium Exhaust Tips
        const exhaustGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.32, 16);
        exhaustGeom.rotateX(Math.PI / 2);
        [-0.32, -0.12, 0.12, 0.32].forEach(x => {
            const exhaust = new THREE.Mesh(exhaustGeom, titaniumMat);
            exhaust.position.set(x, 0.46, 2.32);
            group.add(exhaust);
        });

        // LED Headlights & Taillights
        const headlightGeom = new THREE.BoxGeometry(0.52, 0.09, 0.28);
        this.headlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x00f3ff, emissiveIntensity: 1.6, roughness: 0.1 });
        const hlL = new THREE.Mesh(headlightGeom, this.headlightMat);
        hlL.position.set(-0.68, 0.5, -2.4);
        hlL.rotation.y = -0.22;
        group.add(hlL);
        const hlR = new THREE.Mesh(headlightGeom, this.headlightMat);
        hlR.position.set(0.68, 0.5, -2.4);
        hlR.rotation.y = 0.22;
        group.add(hlR);

        const lightbarGeom = new THREE.BoxGeometry(1.68, 0.08, 0.1);
        this.tailLightMat = new THREE.MeshStandardMaterial({ color: 0xff0033, emissive: 0xff0033, emissiveIntensity: 2.2, roughness: 0.1 });
        const lightbar = new THREE.Mesh(lightbarGeom, this.tailLightMat);
        lightbar.position.set(0, 0.56, 2.3);
        group.add(lightbar);

        // 2-Tier Automotive Wheel Rig
        this.setupAutomotiveWheels(group, paintMat, rimMat, tireMat, carbonMat, rotorMat, caliperMat);

        // Nitro Boost & Underglow
        this.setupNitroVFX(group, data);

        return group;
    }

    // =========================================================================
    // 2. REALISTIC CIVILIAN TRAFFIC MESHES (MATCHING USER IMAGES: PICKUP, ISUZU, SEMI)
    // =========================================================================
    buildTrafficMesh(data) {
        const group = new THREE.Group();
        const type = data.type || 'f150_pickup';

        const carPaintMat = new THREE.MeshStandardMaterial({
            color: data.bodyColor,
            roughness: 0.25,
            metalness: 0.75,
            envMapIntensity: 1.3
        });

        const blackTrimMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7, metalness: 0.2 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.08, metalness: 0.98, envMapIntensity: 1.8 });
        const glassMat = new THREE.MeshStandardMaterial({ color: 0x0d131a, roughness: 0.04, metalness: 0.95 });
        const tireMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.88 });
        const rimMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.2, metalness: 0.9 });
        const amberLightMat = new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0xff7700, emissiveIntensity: 2.0 });
        const redTailMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 2.2 });

        if (type === 'f150_pickup') {
            // =========================================================================
            // IMAGE 1: MODERN RED FORD F-150 SUPERCREW HEAVY-DUTY PICKUP TRUCK
            // =========================================================================
            // 4-Door Crew Cab Lower Chassis
            const cabLower = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.55, 2.6), carPaintMat);
            cabLower.position.set(0, 0.65, -0.4);
            cabLower.castShadow = true;
            group.add(cabLower);

            // High Muscular Squared Hood
            const hood = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.45, 1.6), carPaintMat);
            hood.position.set(0, 0.8, -2.1);
            hood.castShadow = true;
            group.add(hood);

            // Massive Black Mesh Front Grille with Center Ford Bar
            const grille = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.52, 0.25), blackTrimMat);
            grille.position.set(0, 0.78, -2.85);
            group.add(grille);

            // Signature C-Clamp Wrap-Around LED Headlights
            const cClampMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1.8 });
            const headL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.46, 0.15), cClampMat);
            headL.position.set(-0.95, 0.8, -2.88);
            group.add(headL);
            const headR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.46, 0.15), cClampMat);
            headR.position.set(0.95, 0.8, -2.88);
            group.add(headR);

            // Heavy-Duty Front Bumper & Skid Plate
            const bumperF = new THREE.Mesh(new THREE.BoxGeometry(2.22, 0.35, 0.35), carPaintMat);
            bumperF.position.set(0, 0.4, -2.82);
            group.add(bumperF);

            // 4-Door Glass Greenhouse / Cab
            const cabGlass = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.65, 2.3), glassMat);
            cabGlass.position.set(0, 1.25, -0.35);
            group.add(cabGlass);

            // Cab Roof
            const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.08, 2.1), carPaintMat);
            cabRoof.position.set(0, 1.58, -0.35);
            group.add(cabRoof);

            // Black Side Step Running Boards
            const stepGeom = new THREE.BoxGeometry(0.18, 0.05, 2.3);
            const stepL = new THREE.Mesh(stepGeom, blackTrimMat);
            stepL.position.set(-1.18, 0.38, -0.4);
            group.add(stepL);
            const stepR = new THREE.Mesh(stepGeom, blackTrimMat);
            stepR.position.set(1.18, 0.38, -0.4);
            group.add(stepR);

            // OPEN REAR PICKUP TRUCK BED
            // Bed Floor
            const bedFloor = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.15, 2.0), blackTrimMat);
            bedFloor.position.set(0, 0.45, 1.85);
            group.add(bedFloor);

            // Left & Right Bed Side Walls with Black Rails
            const bedWallGeom = new THREE.BoxGeometry(0.12, 0.52, 2.0);
            const bedWallL = new THREE.Mesh(bedWallGeom, carPaintMat);
            bedWallL.position.set(-1.02, 0.68, 1.85);
            group.add(bedWallL);
            const bedWallR = new THREE.Mesh(bedWallGeom, carPaintMat);
            bedWallR.position.set(1.02, 0.68, 1.85);
            group.add(bedWallR);

            // Tailgate
            const tailgate = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.52, 0.12), carPaintMat);
            tailgate.position.set(0, 0.68, 2.82);
            group.add(tailgate);

            // Vertical Corner Taillights
            const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.45, 0.12), redTailMat);
            tailL.position.set(-1.02, 0.68, 2.84);
            group.add(tailL);
            const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.45, 0.12), redTailMat);
            tailR.position.set(1.02, 0.68, 2.84);
            group.add(tailR);

            // All-Terrain High Clearance Wheels
            this.setupCustomWheels(group, 0.52, 2.2, -1.8, 1.8, rimMat, tireMat);

        } else if (type === 'isuzu_truck') {
            // =========================================================================
            // IMAGE 2: WHITE ISUZU NPR COMMERCIAL FORWARD-CONTROL BOX DELIVERY TRUCK
            // =========================================================================
            // Forward-Control Cab (White)
            const cab = new THREE.Mesh(new THREE.BoxGeometry(2.25, 1.25, 1.6), carPaintMat);
            cab.position.set(0, 1.05, -1.8);
            cab.castShadow = true;
            group.add(cab);

            // Aerodynamic White Wind Deflector Roof Fairing (with red ISUZU style badge)
            const fairingGeom = new THREE.BoxGeometry(2.2, 0.6, 1.4);
            const fairing = new THREE.Mesh(fairingGeom, carPaintMat);
            fairing.position.set(0, 1.95, -1.6);
            fairing.rotation.x = -0.25;
            group.add(fairing);

            const badgeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const badge = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.15, 0.05), badgeMat);
            badge.position.set(0, 2.05, -2.2);
            group.add(badge);

            // Large Panoramic Windshield
            const wind = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.65, 0.1), glassMat);
            wind.position.set(0, 1.2, -2.58);
            group.add(wind);

            // Polished Chrome Front Grille & Crystal Headlights
            const grille = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.35, 0.12), chromeMat);
            grille.position.set(0, 0.72, -2.59);
            group.add(grille);

            const hlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1.5 });
            const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.1), hlMat);
            hlL.position.set(-0.92, 0.72, -2.58);
            group.add(hlL);
            const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.1), hlMat);
            hlR.position.set(0.92, 0.72, -2.58);
            group.add(hlR);

            // White Bumper with Fog Lights
            const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.35, 0.3), carPaintMat);
            bumper.position.set(0, 0.38, -2.55);
            group.add(bumper);

            // Dual Black Side Mirrors on Stalks
            const mirrorGeom = new THREE.BoxGeometry(0.12, 0.38, 0.2);
            const mirL = new THREE.Mesh(mirrorGeom, blackTrimMat);
            mirL.position.set(-1.28, 1.2, -2.2);
            group.add(mirL);
            const mirR = new THREE.Mesh(mirrorGeom, blackTrimMat);
            mirR.position.set(1.28, 1.2, -2.2);
            group.add(mirR);

            // LARGE WHITE BOX CARGO CONTAINER
            const cargoBoxMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 });
            const cargoBox = new THREE.Mesh(new THREE.BoxGeometry(2.38, 2.05, 3.8), cargoBoxMat);
            cargoBox.position.set(0, 1.5, 0.8);
            cargoBox.castShadow = true;
            group.add(cargoBox);

            // Hazard Red & White Safety Reflective Strip along bottom
            const hazardMat = new THREE.MeshBasicMaterial({ color: 0xff1744 });
            const hazardL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 3.8), hazardMat);
            hazardL.position.set(-1.2, 0.52, 0.8);
            group.add(hazardL);
            const hazardR = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 3.8), hazardMat);
            hazardR.position.set(1.2, 0.52, 0.8);
            group.add(hazardR);

            // Side Under-Run Crash Guardrails
            const railGeom = new THREE.BoxGeometry(0.08, 0.25, 2.2);
            const sideRailL = new THREE.Mesh(railGeom, carPaintMat);
            sideRailL.position.set(-1.18, 0.35, -0.4);
            group.add(sideRailL);
            const sideRailR = new THREE.Mesh(railGeom, carPaintMat);
            sideRailR.position.set(1.18, 0.35, -0.4);
            group.add(sideRailR);

            // Rear Taillights
            const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.08), redTailMat);
            tailL.position.set(-0.85, 0.5, 2.72);
            group.add(tailL);
            const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.08), redTailMat);
            tailR.position.set(0.85, 0.5, 2.72);
            group.add(tailR);

            this.setupCustomWheels(group, 0.46, 2.15, -1.8, 1.6, chromeMat, tireMat);

        } else if (type === 'semi_truck') {
            // =========================================================================
            // IMAGE 3: PETERBILT / KENWORTH 18-WHEELER SEMI-TRUCK WITH CORRUGATED CHROME TRAILER
            // =========================================================================
            // Long Conventional Chrome/Black Hood
            const semiHood = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.9, 2.4), carPaintMat);
            semiHood.position.set(0, 0.95, -3.4);
            semiHood.castShadow = true;
            group.add(semiHood);

            // Massive Giant Polished Chrome Vertical Grille
            const semiGrille = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.92, 0.35), chromeMat);
            semiGrille.position.set(0, 0.95, -4.55);
            group.add(semiGrille);

            // Polished Giant Chrome Drop Visor Bumper
            const semiBumper = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.45, 0.4), chromeMat);
            semiBumper.position.set(0, 0.35, -4.6);
            group.add(semiBumper);

            // Chrome Square Headlight Pods on Fenders
            const podL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), chromeMat);
            podL.position.set(-1.08, 0.75, -4.2);
            group.add(podL);
            const podR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), chromeMat);
            podR.position.set(1.08, 0.75, -4.2);
            group.add(podR);

            // High Sleeper Cab (Dark Metallic)
            const sleeperCab = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.45, 2.2), carPaintMat);
            sleeperCab.position.set(0, 1.45, -1.5);
            sleeperCab.castShadow = true;
            group.add(sleeperCab);

            // Split Windshield with Chrome Visor
            const visor = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.15, 0.4), chromeMat);
            visor.position.set(0, 2.05, -2.4);
            group.add(visor);

            // 5 Amber Roof Marker Clearance Lights
            for (let i = -2; i <= 2; i++) {
                const marker = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 8), amberLightMat);
                marker.position.set(i * 0.4, 2.22, -2.35);
                group.add(marker);
            }

            // TWIN TOWERING CHROME EXHAUST SMOKESTACKS
            const stackGeom = new THREE.CylinderGeometry(0.12, 0.12, 2.6, 16);
            const stackL = new THREE.Mesh(stackGeom, chromeMat);
            stackL.position.set(-1.22, 2.1, -0.5);
            group.add(stackL);
            const stackR = new THREE.Mesh(stackGeom, chromeMat);
            stackR.position.set(1.22, 2.1, -0.5);
            group.add(stackR);

            // Dual Large Chrome Cylindrical Fuel Tanks
            const tankGeom = new THREE.CylinderGeometry(0.38, 0.38, 1.8, 16);
            tankGeom.rotateZ(Math.PI / 2);
            const tankL = new THREE.Mesh(tankGeom, chromeMat);
            tankL.position.set(-1.18, 0.5, -2.1);
            group.add(tankL);
            const tankR = new THREE.Mesh(tankGeom, chromeMat);
            tankR.position.set(1.18, 0.5, -2.1);
            group.add(tankR);

            // MASSIVE CORRUGATED ALUMINUM SEMI-TRAILER (18-WHEELER)
            const trailerMat = new THREE.MeshStandardMaterial({
                color: 0xeeeeee,
                roughness: 0.15,
                metalness: 0.95,
                envMapIntensity: 1.8
            });
            const trailer = new THREE.Mesh(new THREE.BoxGeometry(2.48, 2.6, 7.2), trailerMat);
            trailer.position.set(0, 2.1, 3.4);
            trailer.castShadow = true;
            group.add(trailer);

            // Refrigeration Unit / ThermoKing on front of trailer (3000R Style)
            const reefer = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 0.4), chromeMat);
            reefer.position.set(0, 2.6, -0.4);
            group.add(reefer);

            // Red/White Hazard Stripes along bottom of trailer
            const hazardMat = new THREE.MeshBasicMaterial({ color: 0xff1744 });
            const hazL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 7.0), hazardMat);
            hazL.position.set(-1.25, 0.85, 3.4);
            group.add(hazL);
            const hazR = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 7.0), hazardMat);
            hazR.position.set(1.25, 0.85, 3.4);
            group.add(hazR);

            // Rear Semi Taillights
            const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.08), redTailMat);
            tailL.position.set(-0.85, 0.9, 7.02);
            group.add(tailL);
            const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.08), redTailMat);
            tailR.position.set(0.85, 0.9, 7.02);
            group.add(tailR);

            // Multi-Axle 18-Wheeler Truck Wheels (Steer + Dual Drive + Dual Trailer Axles)
            this.setupSemiWheels(group, chromeMat, tireMat);

        } else if (type === 'taxi') {
            // =========================================================================
            // NYC YELLOW CAB TAXI (Crown Victoria Sedan)
            // =========================================================================
            const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.45, 4.2), carPaintMat);
            body.position.set(0, 0.48, 0);
            body.castShadow = true;
            group.add(body);

            const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.52, 2.3), glassMat);
            cabin.position.set(0, 0.95, -0.1);
            group.add(cabin);

            const roof = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.08, 1.8), carPaintMat);
            roof.position.set(0, 1.22, -0.1);
            group.add(roof);

            const taxiSignMat = new THREE.MeshStandardMaterial({ color: 0xffeb3b, emissive: 0xffb703, emissiveIntensity: 1.5 });
            const taxiSign = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.35), taxiSignMat);
            taxiSign.position.set(0, 1.35, -0.1);
            group.add(taxiSign);

            this.setupCustomWheels(group, 0.42, 1.9, -1.3, 1.3, chromeMat, tireMat);

        } else {
            // =========================================================================
            // EXECUTIVE 4x4 LUXURY SUV
            // =========================================================================
            const body = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.55, 4.6), carPaintMat);
            body.position.set(0, 0.6, 0);
            body.castShadow = true;
            group.add(body);

            const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.65, 3.0), glassMat);
            cabin.position.set(0, 1.15, 0.2);
            group.add(cabin);

            const roof = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.08, 2.8), carPaintMat);
            roof.position.set(0, 1.5, 0.2);
            group.add(roof);

            this.setupCustomWheels(group, 0.48, 2.1, -1.4, 1.4, rimMat, tireMat);
        }

        return group;
    }

    setupCustomWheels(group, radius, width, zF, zR, rimMat, tireMat) {
        const tireGeom = new THREE.CylinderGeometry(radius, radius, 0.34, 18);
        tireGeom.rotateZ(Math.PI / 2);
        const rimGeom = new THREE.CylinderGeometry(radius * 0.68, radius * 0.68, 0.35, 14);
        rimGeom.rotateZ(Math.PI / 2);

        const xPos = width / 2;
        const positions = [
            [-xPos, radius, zF],
            [xPos, radius, zF],
            [-xPos, radius, zR],
            [xPos, radius, zR]
        ];

        this.rollingHubs = [];
        positions.forEach(pos => {
            const wheelGroup = new THREE.Group();
            wheelGroup.position.set(pos[0], pos[1], pos[2]);

            const tire = new THREE.Mesh(tireGeom, tireMat);
            tire.castShadow = true;
            wheelGroup.add(tire);

            const rim = new THREE.Mesh(rimGeom, rimMat);
            wheelGroup.add(rim);

            this.rollingHubs.push(wheelGroup);
            group.add(wheelGroup);
        });
    }

    setupSemiWheels(group, rimMat, tireMat) {
        const radius = 0.52;
        const tireGeom = new THREE.CylinderGeometry(radius, radius, 0.36, 18);
        tireGeom.rotateZ(Math.PI / 2);
        const rimGeom = new THREE.CylinderGeometry(radius * 0.65, radius * 0.65, 0.37, 14);
        rimGeom.rotateZ(Math.PI / 2);

        const xPos = 1.15;
        // Steer Axle + Dual Tractor Drive Axles + Dual Trailer Axles
        const zPositions = [-3.4, -0.6, 0.6, 4.8, 6.0];

        this.rollingHubs = [];
        zPositions.forEach(z => {
            [-xPos, xPos].forEach(x => {
                const wheelGroup = new THREE.Group();
                wheelGroup.position.set(x, radius, z);

                const tire = new THREE.Mesh(tireGeom, tireMat);
                tire.castShadow = true;
                wheelGroup.add(tire);

                const rim = new THREE.Mesh(rimGeom, rimMat);
                wheelGroup.add(rim);

                this.rollingHubs.push(wheelGroup);
                group.add(wheelGroup);
            });
        });
    }

    setupAutomotiveWheels(group, paintMat, rimMat, tireMat, carbonMat, rotorMat, caliperMat) {
        const tireGeom = new THREE.CylinderGeometry(0.46, 0.46, 0.38, 28);
        tireGeom.rotateZ(Math.PI / 2);
        const rimGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.39, 20);
        rimGeom.rotateZ(Math.PI / 2);
        const centerCapGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 10);
        centerCapGeom.rotateZ(Math.PI / 2);
        const rotorGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.04, 20);
        rotorGeom.rotateZ(Math.PI / 2);
        const caliperGeom = new THREE.BoxGeometry(0.09, 0.22, 0.16);

        const wheelPositions = [
            [-1.05, 0.46, -1.35, -1], // Front Left (Steers)
            [1.05, 0.46, -1.35, 1],   // Front Right (Steers)
            [-1.08, 0.48, 1.35, -1],  // Rear Left
            [1.08, 0.48, 1.35, 1]     // Rear Right
        ];

        this.steeringHubs = [];
        this.rollingHubs = [];
        this.currentSteerAngle = 0;
        this.wheelSpinAngle = 0;

        wheelPositions.forEach(pos => {
            const steeringHub = new THREE.Group();
            steeringHub.position.set(pos[0], pos[1], pos[2]);

            const rollingHub = new THREE.Group();
            const tire = new THREE.Mesh(tireGeom, tireMat);
            tire.castShadow = true;
            rollingHub.add(tire);

            const rim = new THREE.Mesh(rimGeom, rimMat);
            rollingHub.add(rim);

            const centerCap = new THREE.Mesh(centerCapGeom, carbonMat);
            rollingHub.add(centerCap);

            for (let s = 0; s < 6; s++) {
                const spokeGeom = new THREE.BoxGeometry(0.4, 0.05, 0.28);
                const spoke = new THREE.Mesh(spokeGeom, rimMat);
                spoke.rotation.x = (s * Math.PI) / 3.0;
                rollingHub.add(spoke);
            }

            const rotor = new THREE.Mesh(rotorGeom, rotorMat);
            rotor.position.x = pos[3] * -0.065;
            rollingHub.add(rotor);

            steeringHub.add(rollingHub);

            const caliper = new THREE.Mesh(caliperGeom, caliperMat);
            caliper.position.set(pos[3] * -0.065, 0.18, -0.06);
            caliper.rotation.z = pos[3] * 0.25;
            steeringHub.add(caliper);

            this.steeringHubs.push(steeringHub);
            this.rollingHubs.push(rollingHub);
            group.add(steeringHub);
        });
    }

    setupNitroVFX(group, data) {
        this.nitroGroup = new THREE.Group();
        
        const flameGeom = new THREE.ConeGeometry(0.14, 1.1, 16);
        flameGeom.rotateX(-Math.PI / 2);

        const nitroMatOuter = new THREE.MeshBasicMaterial({ color: data.nitroColor, transparent: true, opacity: 0.85 });
        const nitroMatInner = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });

        const flameOuterL = new THREE.Mesh(flameGeom, nitroMatOuter);
        flameOuterL.position.set(-0.22, 0.46, 2.9);
        this.nitroGroup.add(flameOuterL);

        const flameOuterR = new THREE.Mesh(flameGeom, nitroMatOuter);
        flameOuterR.position.set(0.22, 0.46, 2.9);
        this.nitroGroup.add(flameOuterR);

        const flameInnerGeom = new THREE.ConeGeometry(0.07, 0.65, 10);
        flameInnerGeom.rotateX(-Math.PI / 2);

        const flameInnerL = new THREE.Mesh(flameInnerGeom, nitroMatInner);
        flameInnerL.position.set(-0.22, 0.46, 2.65);
        this.nitroGroup.add(flameInnerL);

        const flameInnerR = new THREE.Mesh(flameInnerGeom, nitroMatInner);
        flameInnerR.position.set(0.22, 0.46, 2.65);
        this.nitroGroup.add(flameInnerR);

        this.nitroLight = new THREE.PointLight(data.nitroColor, 0, 20);
        this.nitroLight.position.set(0, 0.5, 3.0);
        this.nitroGroup.add(this.nitroLight);

        this.underglowLight = new THREE.PointLight(data.nitroColor, 0, 12);
        this.underglowLight.position.set(0, 0.15, 0);
        group.add(this.underglowLight);

        this.nitroGroup.visible = false;
        group.add(this.nitroGroup);
    }
    
    update(dt, input, roadWidth) {
        // Smooth forward wheel spin on X-axis (all wheels roll with speed)
        this.wheelSpinAngle -= this.speed * dt * 0.6;
        if (this.rollingHubs) {
            this.rollingHubs.forEach(hub => hub.rotation.x = this.wheelSpinAngle);
        }
        
        if (this.isPlayer) {
            let steerDir = 0;
            if (input.left) steerDir = -1;
            if (input.right) steerDir = 1;
            
            const speedFactor = Math.max(0.4, Math.min(this.speed / 50, 1.25));
            const steerSpeed = (this.handling / 100) * 19 * dt * speedFactor;
            this.mesh.position.x += steerDir * steerSpeed;
            
            // True Ackermann front wheel steering angle with smooth mechanical spring damping
            const targetSteer = steerDir * 0.48;
            this.currentSteerAngle += (targetSteer - this.currentSteerAngle) * 14 * dt;
            
            if (this.steeringHubs && this.steeringHubs.length >= 2) {
                this.steeringHubs[0].rotation.y = this.currentSteerAngle;
                this.steeringHubs[1].rotation.y = this.currentSteerAngle;
            }
            
            // Aerodynamic supercar chassis roll & subtle yaw
            const targetRoll = steerDir * 0.12 * Math.min(this.speed / 40, 1.0);
            this.mesh.rotation.z += (targetRoll - this.mesh.rotation.z) * 10 * dt;
            this.mesh.rotation.y = -this.currentSteerAngle * 0.18;
            
            // W (Nitro / Gas) & S (Brake) Physics
            if (input.accel) {
                this.speed += 65 * dt;
                
                if (this.nitroGroup) {
                    this.nitroGroup.visible = true;
                    const pulse = Math.sin(Date.now() * 0.06);
                    this.nitroLight.intensity = 4.0 + pulse * 2.0;
                    this.underglowLight.intensity = 3.0 + pulse * 1.0;
                    const flameScale = 1.0 + pulse * 0.3;
                    this.nitroGroup.scale.set(1.0, 1.0, flameScale);
                }
                if (this.tailLightMat) {
                    this.tailLightMat.emissiveIntensity = 2.0;
                }
            } else if (input.brake) {
                this.speed -= 100 * dt;
                if (this.nitroGroup) this.nitroGroup.visible = false;
                if (this.underglowLight) this.underglowLight.intensity = 0;
                
                if (this.tailLightMat) {
                    this.tailLightMat.emissive.setHex(0xff0000);
                    this.tailLightMat.emissiveIntensity = 4.0;
                }
            } else {
                if (this.nitroGroup) this.nitroGroup.visible = false;
                if (this.underglowLight) this.underglowLight.intensity = 0.5;
                const baseCruise = 55;
                if (this.speed > baseCruise) {
                    this.speed -= 16 * dt;
                } else if (this.speed < baseCruise) {
                    this.speed += 28 * dt;
                }
                if (this.tailLightMat) {
                    this.tailLightMat.emissive.setHex(0xff0033);
                    this.tailLightMat.emissiveIntensity = 2.0;
                }
            }
            
            const minSpeed = input.brake ? 5 : 30;
            if (this.speed < minSpeed) this.speed = minSpeed;
            if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
            
            const limit = roadWidth / 2 - this.width / 2;
            if (this.mesh.position.x < -limit) {
                this.mesh.position.x = -limit;
                this.mesh.rotation.z = 0;
                this.speed = Math.max(minSpeed, this.speed * 0.95);
            }
            if (this.mesh.position.x > limit) {
                this.mesh.position.x = limit;
                this.mesh.rotation.z = 0;
                this.speed = Math.max(minSpeed, this.speed * 0.95);
            }
            
        } else {
            // Traffic moves towards camera (+Z axis)
            const relativeSpeed = (playerSpeed - this.speed);
            this.mesh.position.z += relativeSpeed * dt;
        }
    }
    
    destroy() {
        this.scene.remove(this.mesh);
        this.mesh.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose();
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => m.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
    }
}
