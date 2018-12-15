// Basic entry function to setup canvas object and event listeners
const setupCanvas = () => {

    let mainCanvas = new Canvas("mainCanvas", 20);

    window.addEventListener('resize', () => {
        mainCanvas.resizeCanvas();
    });

};

// Call to our entry function on window.onload
window.onload = setupCanvas;
