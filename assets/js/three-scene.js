/* ========================================
   THREE-SCENE.JS - 3D Animated Network
======================================== */

(function() {
    'use strict';

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded. Skipping 3D scene.');
        return;
    }

    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true,
        antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 50;

    // Create particles for network effect
    const particlesCount = 100;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const velocities = [];

    // Initialize particles with random positions
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        
        velocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material - subtle white color
    const particlesMaterial = new THREE.PointsMaterial({
        size: 2,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create lines connecting nearby particles
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update particle positions
        const positions = particlesGeometry.attributes.position.array;
        
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            
            // Move particles
            positions[i3] += velocities[i].x;
            positions[i3 + 1] += velocities[i].y;
            positions[i3 + 2] += velocities[i].z;
            
            // Boundary check and bounce
            if (Math.abs(positions[i3]) > 50) velocities[i].x *= -1;
            if (Math.abs(positions[i3 + 1]) > 50) velocities[i].y *= -1;
            if (Math.abs(positions[i3 + 2]) > 25) velocities[i].z *= -1;
        }
        
        particlesGeometry.attributes.position.needsUpdate = true;

        // Draw lines between nearby particles
        linesGroup.clear();
        const linePositions = [];
        const maxDistance = 15;

        for (let i = 0; i < particlesCount; i++) {
            for (let j = i + 1; j < particlesCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < maxDistance) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }

        if (linePositions.length > 0) {
            const lineGeometry = new THREE.BufferGeometry();
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            const lines = new THREE.LineSegments(lineGeometry, linesMaterial);
            linesGroup.add(lines);
        }

        // Smooth mouse parallax effect
        targetX = mouseX * 5;
        targetY = mouseY * 5;
        
        particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.05;
        particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.05;

        // Slow automatic rotation
        particlesMesh.rotation.y += 0.001;
        linesGroup.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    console.log('✅ 3D Animated Network loaded');
})();
