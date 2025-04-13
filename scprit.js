const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const penBtn = document.getElementById("penBtn");
const eraserBtn = document.getElementById("eraserBtn");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const brushPreview = document.getElementById("brushPreview");

let isDrawing = false;
let tool = "draw"; // default pen
let color = colorPicker.value;
let brush = brushSize.value;

function resizeCanvas() {
    const container = document.querySelector('#drawingBoard');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight || 500;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setColor();
}

document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    brushPreview.style.width = brush + "px";
    brushPreview.style.height = brush + "px";
    brushPreview.style.backgroundColor = color;

    penBtn.addEventListener("click", () => {
        tool = "draw";
        penBtn.classList.add("active");
        eraserBtn.classList.remove("active");
        setColor();
    });

    eraserBtn.addEventListener("click", () => {
        tool = "erase";
        eraserBtn.classList.add("active");
        penBtn.classList.remove("active");
        setColor();
    });

    brushSize.addEventListener("input", () => {
        brush = brushSize.value;
        brushPreview.style.width = brush + "px";
        brushPreview.style.height = brush + "px";
    });

    colorPicker.addEventListener("input", () => {
        color = colorPicker.value;
        brushPreview.style.backgroundColor = color;
        setColor();
    });

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        draw(e);
    });

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
        ctx.beginPath();
    });

    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        isDrawing = true;
        draw(e.touches[0]);
    });

    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    });

    canvas.addEventListener("touchend", () => {
        isDrawing = false;
        ctx.beginPath();
    });
});

function setColor() {
    ctx.strokeStyle = tool === "draw" ? color : "#ffffff";
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;

    ctx.lineWidth = brush;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function downloadImage() {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
}
