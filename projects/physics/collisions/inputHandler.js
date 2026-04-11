export let InputState = {
    isPaused: false,
    isVectorsVisible: true,
    vectorScale: 0.25,

    gravityStrength: 0,
    elasticity: 1,

    mouseDown: false,
    spawningParticle: false,
    mouseUp: false,
    mousePositionX: 0,
    mousePositionY: 0
}

//SETTINGS / VISIBLE INPUT --------------------------------------

//PAUSE
const togglePause = document.getElementById("togglePause");
togglePause.checked = InputState.isPaused;

togglePause.addEventListener("change", () => {
    InputState.isPaused = togglePause.checked;
});

//VECTORS
const toggleVectors = document.getElementById("toggleVectors");
toggleVectors.checked = InputState.isVectorsVisible;

toggleVectors.addEventListener("change", () => {
    InputState.isVectorsVisible = toggleVectors.checked;
});

//VECTOR SCALE
const vectorScale = document.getElementById("vectorScale");
vectorScale.value = InputState.vectorScale;

vectorScale.addEventListener("change", () => {
    InputState.vectorScale = vectorScale.value;
});

//SIMULATION INPUT ----------------------------------------------

//GRAVITY
const gravityStrength = document.getElementById("gravityStrength");
gravityStrength.value = InputState.gravityStrength;

gravityStrength.addEventListener("change", () => {
    InputState.gravityStrength = gravityStrength.value;
});

//ELASTICITY
const elasticity = document.getElementById("elasticity");
elasticity.value = InputState.elasticity;

elasticity.addEventListener("change", () => {
    InputState.elasticity = elasticity.value;
});

//CANVAS INPUT ---------------------------------------------------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener('mousedown', e => 
    {   InputState.mouseDown = true;
        InputState.spawningParticle = true;
        InputState.mousePositionX = e.offsetX;
        InputState.mousePositionY = e.offsetY;
    });

canvas.addEventListener('mouseup', e => 
{   InputState.mouseUp = true;
    InputState.spawningParticle = false;

    InputState.mousePositionX = e.offsetX;
    InputState.mousePositionY = e.offsetY;
});

canvas.addEventListener('mouseleave', e => 
{   if (InputState.spawningParticle)
    {
        InputState.mouseUp = true;
        InputState.spawningParticle = false;
    }
    InputState.mousePositionX = e.offsetX;
    InputState.mousePositionY = e.offsetY;
});