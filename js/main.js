const setupCanvas = () => {

    let mainCanvas = new Canvas("mainCanvas", 20);

    window.addEventListener('resize', () => {
        mainCanvas.resizeCanvas();
    });

};

window.onload = setupCanvas;
