const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const penBtn=document.getElementById("pen");
const eraserBtn=document.getElementById("eraser");
const colorPicker=document.getElementById("color");
const brushSize=document.getElementById("size");
const downloadBtn=document.getElementById("download");
const sizePreview=document.getElementById("size-preview");
let isDrawing=false,isTouchActive=false,tool="draw";
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
penBtn.addEventListener("click",()=>{
tool="draw";
penBtn.classList.add("active");
eraserBtn.classList.remove("active");
});
eraserBtn.addEventListener("click",()=>{
tool="erase";
eraserBtn.classList.add("active");
penBtn.classList.remove("active");
});
brushSize.addEventListener("input",()=>{
sizePreview.style.width=sizePreview.style.height=brushSize.value+"px";
});
canvas.addEventListener("mousedown",()=>{});
canvas.addEventListener("mousemove",draw);
canvas.addEventListener("mouseup",()=>{
isDrawing=false;
ctx.beginPath();
});
canvas.addEventListener("dblclick",(e)=>{
isDrawing=true;
draw(e);
});
canvas.addEventListener("touchstart",(e)=>{
if(e.touches.length===1){
const now=Date.now();
const timeSince=now-(canvas.lastTouch||0);
if(timeSince<300&&timeSince>0){
isTouchActive=true;
const touch=e.touches[0];
ctx.beginPath();
ctx.moveTo(touch.clientX-canvas.offsetLeft,touch.clientY-canvas.offsetTop);
}
canvas.lastTouch=now;
}
});
canvas.addEventListener("touchmove",(e)=>{
if(!isTouchActive)return;
e.preventDefault();
const touch=e.touches[0];
drawTouch(touch);
});
canvas.addEventListener("touchend",()=>{
isTouchActive=false;
ctx.beginPath();
});
function draw(e){
if(!isDrawing)return;
const x=e.clientX-canvas.offsetLeft;
const y=e.clientY-canvas.offsetTop;
ctx.lineWidth=brushSize.value;
ctx.lineCap="round";
ctx.strokeStyle=tool==="draw"?colorPicker.value:"#ffffff";
ctx.lineTo(x,y);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(x,y);
}
function drawTouch(touch){
const x=touch.clientX-canvas.offsetLeft;
const y=touch.clientY-canvas.offsetTop;
ctx.lineWidth=brushSize.value;
ctx.lineCap="round";
ctx.strokeStyle=tool==="draw"?colorPicker.value:"#ffffff";
ctx.lineTo(x,y);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(x,y);
}
downloadBtn.addEventListener("click",()=>{
const link=document.createElement("a");
link.download="drawing.png";
link.href=canvas.toDataURL();
link.click();
});
