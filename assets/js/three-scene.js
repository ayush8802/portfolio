/* ========================================
   THREE-SCENE.JS - Working 3D Network
======================================== */

(function() {
    'use strict';

    // Wait for DOM to load
    window.addEventListener('load', function() {
        
        // Check if Three.js is loaded
        if (typeof THREE === 'undefined') {
            console.error('Three.js not loaded!');
            return;
        }

        const canvas = document.getElementById('webgl-canvas');
        if (!canvas) {
            console.error('Canvas not found!');
            return;
        }

        console.log('✅ Starting 3D animation...');

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true,
            antialias: true 
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 50;

        // Create particles
        const particlesCount = 150;
        const positions = new Float32Array(particlesCount * 3);
        const velocities = [];

        // Initialize particles
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

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 2.5,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Lines material
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });

        let linesGroup = new THREE.Group();
        scene.add(linesGroup);

        // Mouse tracking
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            const positions = particlesGeometry.attributes.position.array;
            
            // Update particles
            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                
                positions[i3] += velocities[i].x;
                positions[i3 + 1] += velocities[i].y;
                positions[i3 + 2] += velocities[i].z;
                
                // Bounce off boundaries
                if (Math.abs(positions[i3]) > 50) velocities[i].x *= -1;
                if (Math.abs(positions[i3 + 1]) > 50) velocities[i].y *= -1;
                if (Math.abs(positions[i3 + 2]) > 25) velocities[i].z *= -1;
            }
            
            particlesGeometry.attributes.position.needsUpdate = true;

            // Clear old lines
            linesGroup.clear();

            // Draw new lines
            const linePositions = [];
            const maxDistance = 20;

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

            // Mouse parallax
            particlesMesh.rotation.y += (mouseX * 0.5 - particlesMesh.rotation.y) * 0.05;
            particlesMesh.rotation.x += (mouseY * 0.5 - particlesMesh.rotation.x) * 0.05;

            // Slow rotation
            particlesMesh.rotation.y += 0.001;

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        console.log('✅ 3D animation started successfully!');
    });

})();
