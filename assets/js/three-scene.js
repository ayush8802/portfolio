/* ========================================
   THREE-SCENE.JS - DISABLED FOR PERFORMANCE
======================================== */

(function() {
    'use strict';
    
    // Disable Three.js for better performance
    const canvas = document.getElementById('webgl-canvas');
    if (canvas) {
        canvas.style.display = 'none';
    }
    
    console.log('⚠️ Three.js disabled for performance');
})();
