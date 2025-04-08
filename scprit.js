const canvas = document.getElementById("canvas");const ctx = canvas.getContext("2d");canvas.width = canvas.offsetWidth;canvas.height = canvas.offsetHeight;
let painting = false;let tool = 'draw';
function startPosition(e) {
painting = true;
draw(e);}
function endPosition() {
    painting = false;
    ctx.beginPath();
}
function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.lineWidth = document.getElementById("brushSize").value;
    ctx.lineCap = "round";
    ctx.strokeStyle = tool === 'draw' ? document.getElementById("colorPicker").value : "#ffffff";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}
function setTool(selectedTool) {
    tool = selectedTool;
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function downloadImage() {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
}
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", draw);
const brushPreview = document.getElementById("brushPreview");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
function updateBrushPreview() {
    const size = brushSize.value;
    brushPreview.style.width = size + "px";
    brushPreview.style.height = size + "px";
    brushPreview.style.backgroundColor = tool === "draw" ? colorPicker.value : "#ffffff";
}
colorPicker.addEventListener("input", updateBrushPreview);
brushSize.addEventListener("input", updateBrushPreview);
function setTool(selectedTool) {
    tool = selectedTool;
    updateBrushPreview();
    document.querySelectorAll(".toolbar button").forEach(btn => {
    btn.classList.remove("active");
});
const button = [...document.querySelectorAll(".toolbar button")].find(b =>
    b.textContent.toLowerCase().includes(selectedTool)
);
if (button) button.classList.add("active");
}
updateBrushPreview();
