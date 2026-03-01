Skip to content
Logo Regular
Home
About Us
Contact
Freight Builder
What are you sending? Click an image to start
Pallet
Pallet
Crate
Crate
Machine
Machine
Boxes
Boxes
Loose
Loose
Custom
Custom
 

<!DOCTYPE html>
<html lang=”en”>
<head>
<meta charset=”UTF-8″>
<meta name=”viewport” content=”width=device-width, initial-scale=1.0″>
<title>Freight Builder – Axis Events</title>
<style>
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: system-ui, -apple-system, ‘Inter’, sans-serif;
}
body {
background: #f3f4f6;
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
padding: 2rem;
}
.container {
max-width: 800px;
width: 100%;
background: white;
border-radius: 40px;
padding: 2.5rem;
box-shadow: 0 30px 60px -15px rgba(0,0,0,0.3);
}
h1 {
font-size: 2.5rem;
font-weight: 700;
margin-bottom: 0.5rem;
color: #000000;
}
.subhead {
color: #333333;
margin-bottom: 2rem;
font-size: 1.2rem;
}
.image-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1.5rem;
margin-bottom: 2rem;
}
.image-card {
background: #ffffff;
border: 3px solid #dddddd;
border-radius: 28px;
padding: 2rem 1rem;
text-align: center;
cursor: pointer;
transition: all 0.2s ease;
font-weight: 600;
color: #000000;
box-shadow: 0 4px 12px rgba(0,0,0,0.08);
font-size: 1.2rem;
}
.image-card:hover {
border-color: #10b981;
background: #f9f9f9;
transform: translateY(-4px);
box-shadow: 0 12px 24px rgba(16,185,129,0.15);
}
.image-card img {
width: 100px;
height: 100px;
object-fit: contain;
margin-bottom: 1rem;
}
.option-panel {
background: #f9f9f9;
border-radius: 32px;
padding: 2rem;
border: 3px solid #10b981;
color: #000000;
animation: slideUp 0.3s ease;
font-size: 1.1rem;
}
@keyframes slideUp {
from { opacity: 0; transform: translateY(30px); }
to { opacity: 1; transform: translateY(0); }
}
.option-row {
display: flex;
gap: 1rem;
margin: 1.5rem 0;
flex-wrap: wrap;
}
.option-btn {
background: white;
border: 3px solid #dddddd;
border-radius: 50px;
padding: 1rem 2rem;
font-weight: 600;
cursor: pointer;
transition: all 0.2s;
flex: 1 1 auto;
color: #000000;
font-size: 1.1rem;
}
.option-btn:hover {
border-color: #10b981;
background: #f0fdf4;
}
.option-btn.active {
background: #10b981;
border-color: #10b981;
color: white;
}
.form-group {
margin-bottom: 1.5rem;
}
.form-group label {
display: block;
font-weight: 600;
margin-bottom: 0.5rem;
color: #000000;
font-size: 1.1rem;
}
.form-group input, .form-group textarea {
width: 100%;
padding: 1rem 1.25rem;
border: 3px solid #dddddd;
border-radius: 20px;
font-size: 1.1rem;
color: #000000;
background: white;
}
.form-group input:focus, .form-group textarea:focus {
outline: none;
border-color: #10b981;
}
.form-group textarea {
min-height: 100px;
resize: vertical;
}
.btn-primary {
background: #10b981;
color: white;
border: none;
border-radius: 50px;
padding: 1.25rem 2rem;
font-weight: 700;
font-size: 1.2rem;
cursor: pointer;
transition: background 0.2s;
width: 100%;
margin-top: 1rem;
}
.btn-primary:hover {
background: #059669;
}
.btn-secondary {
background: white;
color: #000000;
border: 3px solid #dddddd;
border-radius: 50px;
padding: 1rem 2rem;
font-weight: 600;
cursor: pointer;
font-size: 1.1rem;
}
.btn-secondary:hover {
border-color: #10b981;
background: #f0fdf4;
}
.summary-list {
background: #f9f9f9;
border-radius: 28px;
padding: 2rem;
margin-top: 2rem;
color: #000000;
border: 2px solid #e5e7eb;
}
.summary-item {
background: white;
border-radius: 20px;
padding: 1.25rem;
margin-bottom: 1rem;
border: 2px solid #e5e7eb;
box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.summary-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 0.75rem;
font-weight: 700;
font-size: 1.2rem;
color: #10b981;
}
.summary-details {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1rem;
margin-bottom: 0.75rem;
font-size: 1.1rem;
}
.summary-desc {
color: #555;
font-size: 1rem;
padding-top: 0.5rem;
border-top: 1px dashed #ccc;
}
.item-badge {
background: #10b981;
color: white;
padding: 0.25rem 1rem;
border-radius: 40px;
font-size: 0.9rem;
font-weight: 600;
}
.flex-row {
display: flex;
gap: 1rem;
justify-content: space-between;
align-items: center;
margin-top: 1.5rem;
}
.hidden {
display: none;
}
.back-btn {
background: none;
border: none;
color: #10b981;
font-weight: 700;
font-size: 1.1rem;
cursor: pointer;
padding: 0.75rem 0;
margin-bottom: 1.5rem;
display: inline-flex;
align-items: center;
gap: 0.5rem;
}
.back-btn:hover {
text-decoration: underline;
}
.section-title {
font-size: 1.5rem;
font-weight: 700;
margin-bottom: 1.5rem;
color: #000000;
}
</style>
</head>
<body>
<div class=”container” id=”app”>
<h1>Freight Builder</h1>
<div class=”subhead”>What are you sending? Click an image to start</div>

<!– Image Grid –>
<div id=”imageGrid” class=”image-grid”>
<div class=”image-card” data-type=”pallet”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/pallet.jpg” alt=”Pallet”>
<div>Pallet</div>
</div>
<div class=”image-card” data-type=”crate”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/crate.jpg” alt=”Crate”>
<div>Crate</div>
</div>
<div class=”image-card” data-type=”machine”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/machinery.jpg” alt=”Machine”>
<div>Machine</div>
</div>
<div class=”image-card” data-type=”boxes”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/boxes.jpg” alt=”Boxes”>
<div>Boxes</div>
</div>
<div class=”image-card” data-type=”loose”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/loose.jpg” alt=”Loose”>
<div>Loose</div>
</div>
<div class=”image-card” data-type=”custom”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/custom.jpg” alt=”Custom”>
<div>Custom</div>
</div>
</div>

<!– Option Panel –>
<div id=”optionPanel” class=”hidden”></div>

<!– Summary List –>
<div id=”summaryArea” class=”summary-list hidden”>
<div class=”section-title”>📋 Items added</div>
<div id=”summaryItems”></div>
<div class=”flex-row”>
<button id=”continueBtn” class=”btn-primary”>Continue to quote →</button>
</div>
</div>
</div>

<script>
let items = [];
let currentType = null;
let palletSize = null;
let crateSize = null;
let withinSize = null;
let underWeight = null;

const imageGrid = document.getElementById(‘imageGrid’);
const optionPanel = document.getElementById(‘optionPanel’);
const summaryArea = document.getElementById(‘summaryArea’);
const summaryItems = document.getElementById(‘summaryItems’);
const continueBtn = document.getElementById(‘continueBtn’);

function hideGridShowPanel() {
imageGrid.classList.add(‘hidden’);
optionPanel.classList.remove(‘hidden’);
optionPanel.innerHTML = ”;
}

function showGridHidePanel() {
imageGrid.classList.remove(‘hidden’);
optionPanel.classList.add(‘hidden’);
currentType = null;
palletSize = null;
crateSize = null;
withinSize = null;
underWeight = null;
}

function renderSummary() {
if (items.length === 0) {
summaryArea.classList.add(‘hidden’);
return;
}
summaryArea.classList.remove(‘hidden’);
let html = ”;
items.forEach((item, idx) => {
html += `<div class=”summary-item”>
<div class=”summary-header”>
<span>${item.icon} ${item.type}</span>
<span class=”item-badge”>Qty: ${item.qty}</span>
</div>
<div class=”summary-details”>
<div><strong>Weight:</strong> ${item.weight}</div>
<div><strong>Dimensions:</strong> ${item.dimensions || ‘—’}</div>
<div><strong>Total:</strong> ${item.totalWeight || item.weight}</div>
</div>
${item.desc ? `<div class=”summary-desc”>📝 ${item.desc}</div>` : ”}
</div>`;
});
summaryItems.innerHTML = html;
}

function addItem(type, icon, qty, weight, dimensions, desc, totalWeight) {
items.push({ 
type, 
icon, 
qty, 
weight, 
dimensions, 
desc, 
totalWeight: totalWeight || weight 
});
renderSummary();
showGridHidePanel();
}

function addBackButton() {
const back = document.createElement(‘button’);
back.className = ‘back-btn’;
back.innerHTML = ‘← Back to items’;
back.onclick = () => showGridHidePanel();
optionPanel.appendChild(back);
}

// Image card clicks
document.querySelectorAll(‘.image-card’).forEach(card => {
card.addEventListener(‘click’, () => {
const type = card.dataset.type;
currentType = type;
hideGridShowPanel();
addBackButton();

if (type === ‘pallet’) {
optionPanel.innerHTML += `
<div class=”section-title”>🟦 Pallet</div>
<div style=”display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;”>
<div class=”image-card” id=”singlePalletImg” style=”cursor: pointer;”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/pallet.jpg” alt=”Single Pallet”>
<div>Single pallet</div>
</div>
<div class=”image-card” id=”doublePalletImg” style=”cursor: pointer;”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/doublepallet.jpg” alt=”Double Pallet”>
<div>Double pallet</div>
</div>
</div>
<div id=”palletSubOptions”></div>
`;

document.getElementById(‘singlePalletImg’).addEventListener(‘click’, () => {
palletSize = ‘single’;
document.getElementById(‘singlePalletImg’).style.borderColor = ‘#10b981’;
document.getElementById(‘doublePalletImg’).style.borderColor = ‘#dddddd’;
document.getElementById(‘palletSubOptions’).innerHTML = `
<div style=”margin-top: 1rem;”>
<div class=”form-group”>
<label>Within 1200x1200x1800mm?</label>
<div class=”option-row”>
<button class=”option-btn” id=”withinYes”>Yes</button>
<button class=”option-btn” id=”withinNo”>No</button>
</div>
</div>
<div id=”weightQuestion”></div>
<div id=”finalInputs”></div>
<button class=”btn-primary” id=”addPalletBtn”>Add pallet</button>
</div>
`;

document.getElementById(‘withinYes’).addEventListener(‘click’, () => {
withinSize = ‘yes’;
document.getElementById(‘withinYes’).classList.add(‘active’);
document.getElementById(‘withinNo’).classList.remove(‘active’);
document.getElementById(‘weightQuestion’).innerHTML = `
<div class=”form-group”>
<label>Under 1000kg?</label>
<div class=”option-row”>
<button class=”option-btn” id=”weightYes”>Yes</button>
<button class=”option-btn” id=”weightNo”>No</button>
</div>
</div>
`;
document.getElementById(‘weightYes’).addEventListener(‘click’, () => {
underWeight = ‘yes’;
document.getElementById(‘weightYes’).classList.add(‘active’);
document.getElementById(‘weightNo’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
`;
});
document.getElementById(‘weightNo’).addEventListener(‘click’, () => {
underWeight = ‘no’;
document.getElementById(‘weightNo’).classList.add(‘active’);
document.getElementById(‘weightYes’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Exact weight (kg) per pallet</label>
<input type=”number” id=”weightInput” min=”1″ style=”color: #000;”>
</div>
`;
});
});

document.getElementById(‘withinNo’).addEventListener(‘click’, () => {
withinSize = ‘no’;
document.getElementById(‘withinNo’).classList.add(‘active’);
document.getElementById(‘withinYes’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Length (mm)</label>
<input type=”number” id=”lengthInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Width (mm)</label>
<input type=”number” id=”widthInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Height (mm)</label>
<input type=”number” id=”heightInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Weight (kg) per pallet</label>
<input type=”number” id=”weightInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
`;
document.getElementById(‘weightQuestion’).innerHTML = ”;
});

document.getElementById(‘addPalletBtn’).addEventListener(‘click’, () => {
const qty = document.getElementById(‘qtyInput’)?.value || ‘1’;
if (withinSize === ‘yes’ && underWeight === ‘yes’) {
addItem(‘Pallet’, ‘🟦’, qty, ‘under 1000kg ea’, ‘1200x1200x1800mm’, ”, (parseInt(qty) * 1000) + ‘kg’);
} else if (withinSize === ‘yes’ && underWeight === ‘no’) {
const w = document.getElementById(‘weightInput’)?.value || ‘?’;
addItem(‘Pallet’, ‘🟦’, qty, w + ‘kg ea’, ‘1200x1200x1800mm’, ”, (parseInt(qty) * parseInt(w || 0)) + ‘kg’);
} else if (withinSize === ‘no’) {
const l = document.getElementById(‘lengthInput’)?.value || ‘?’;
const w = document.getElementById(‘widthInput’)?.value || ‘?’;
const h = document.getElementById(‘heightInput’)?.value || ‘?’;
const wt = document.getElementById(‘weightInput’)?.value || ‘?’;
addItem(‘Pallet’, ‘🟦’, qty, wt + ‘kg ea’, l+’x’+w+’x’+h+’mm’, ”, (parseInt(qty) * parseInt(wt || 0)) + ‘kg’);
}
});
});

document.getElementById(‘doublePalletImg’).addEventListener(‘click’, () => {
palletSize = ‘double’;
document.getElementById(‘doublePalletImg’).style.borderColor = ‘#10b981’;
document.getElementById(‘singlePalletImg’).style.borderColor = ‘#dddddd’;
document.getElementById(‘palletSubOptions’).innerHTML = `
<div style=”margin-top: 1rem;”>
<div class=”form-group”>
<label>Within 2400x1200x1800mm?</label>
<div class=”option-row”>
<button class=”option-btn” id=”withinYes”>Yes</button>
<button class=”option-btn” id=”withinNo”>No</button>
</div>
</div>
<div id=”weightQuestion”></div>
<div id=”finalInputs”></div>
<button class=”btn-primary” id=”addPalletBtn”>Add pallet</button>
</div>
`;

document.getElementById(‘withinYes’).addEventListener(‘click’, () => {
withinSize = ‘yes’;
document.getElementById(‘withinYes’).classList.add(‘active’);
document.getElementById(‘withinNo’).classList.remove(‘active’);
document.getElementById(‘weightQuestion’).innerHTML = `
<div class=”form-group”>
<label>Under 1000kg?</label>
<div class=”option-row”>
<button class=”option-btn” id=”weightYes”>Yes</button>
<button class=”option-btn” id=”weightNo”>No</button>
</div>
</div>
`;
document.getElementById(‘weightYes’).addEventListener(‘click’, () => {
underWeight = ‘yes’;
document.getElementById(‘weightYes’).classList.add(‘active’);
document.getElementById(‘weightNo’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
`;
});
document.getElementById(‘weightNo’).addEventListener(‘click’, () => {
underWeight = ‘no’;
document.getElementById(‘weightNo’).classList.add(‘active’);
document.getElementById(‘weightYes’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Exact weight (kg) per pallet</label>
<input type=”number” id=”weightInput” min=”1″ style=”color: #000;”>
</div>
`;
});
});

document.getElementById(‘withinNo’).addEventListener(‘click’, () => {
withinSize = ‘no’;
document.getElementById(‘withinNo’).classList.add(‘active’);
document.getElementById(‘withinYes’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Length (mm)</label>
<input type=”number” id=”lengthInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Width (mm)</label>
<input type=”number” id=”widthInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Height (mm)</label>
<input type=”number” id=”heightInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Weight (kg) per pallet</label>
<input type=”number” id=”weightInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
`;
document.getElementById(‘weightQuestion’).innerHTML = ”;
});

document.getElementById(‘addPalletBtn’).addEventListener(‘click’, () => {
const qty = document.getElementById(‘qtyInput’)?.value || ‘1’;
if (withinSize === ‘yes’ && underWeight === ‘yes’) {
addItem(‘Pallet’, ‘🟦’, qty, ‘under 1000kg ea’, ‘2400x1200x1800mm’, ”, (parseInt(qty) * 1000) + ‘kg’);
} else if (withinSize === ‘yes’ && underWeight === ‘no’) {
const w = document.getElementById(‘weightInput’)?.value || ‘?’;
addItem(‘Pallet’, ‘🟦’, qty, w + ‘kg ea’, ‘2400x1200x1800mm’, ”, (parseInt(qty) * parseInt(w || 0)) + ‘kg’);
} else if (withinSize === ‘no’) {
const l = document.getElementById(‘lengthInput’)?.value || ‘?’;
const w = document.getElementById(‘widthInput’)?.value || ‘?’;
const h = document.getElementById(‘heightInput’)?.value || ‘?’;
const wt = document.getElementById(‘weightInput’)?.value || ‘?’;
addItem(‘Pallet’, ‘🟦’, qty, wt + ‘kg ea’, l+’x’+w+’x’+h+’mm’, ”, (parseInt(qty) * parseInt(wt || 0)) + ‘kg’);
}
});
});
}

else if (type === ‘crate’) {
optionPanel.innerHTML += `
<div class=”section-title”>📦 Crate</div>
<div style=”display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;”>
<div class=”image-card” id=”singleCrateImg” style=”cursor: pointer;”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/crate.jpg” alt=”Single Crate”>
<div>Single crate</div>
</div>
<div class=”image-card” id=”doubleCrateImg” style=”cursor: pointer;”>
<img src=”http://axis-events.com.au/wp-content/uploads/2026/02/doublecrate.jpg” alt=”Double Crate”>
<div>Double crate</div>
</div>
</div>
<div id=”crateSubOptions”></div>
`;

document.getElementById(‘singleCrateImg’).addEventListener(‘click’, () => {
crateSize = ‘single’;
document.getElementById(‘singleCrateImg’).style.borderColor = ‘#10b981’;
document.getElementById(‘doubleCrateImg’).style.borderColor = ‘#dddddd’;
document.getElementById(‘crateSubOptions’).innerHTML = `
<div style=”margin-top: 1rem;”>
<div class=”form-group”>
<label>Within 1200x1200x1800mm?</label>
<div class=”option-row”>
<button class=”option-btn” id=”withinYes”>Yes</button>
<button class=”option-btn” id=”withinNo”>No</button>
</div>
</div>
<div id=”weightQuestion”></div>
<div id=”finalInputs”></div>
<button class=”btn-primary” id=”addCrateBtn”>Add crate</button>
</div>
`;

document.getElementById(‘withinYes’).addEventListener(‘click’, () => {
withinSize = ‘yes’;
document.getElementById(‘withinYes’).classList.add(‘active’);
document.getElementById(‘withinNo’).classList.remove(‘active’);
document.getElementById(‘weightQuestion’).innerHTML = `
<div class=”form-group”>
<label>Under 1000kg?</label>
<div class=”option-row”>
<button class=”option-btn” id=”weightYes”>Yes</button>
<button class=”option-btn” id=”weightNo”>No</button>
</div>
</div>
`;
document.getElementById(‘weightYes’).addEventListener(‘click’, () => {
underWeight = ‘yes’;
document.getElementById(‘weightYes’).classList.add(‘active’);
document.getElementById(‘weightNo’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
`;
});
document.getElementById(‘weightNo’).addEventListener(‘click’, () => {
underWeight = ‘no’;
document.getElementById(‘weightNo’).classList.add(‘active’);
document.getElementById(‘weightYes’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Exact weight (kg) per crate</label>
<input type=”number” id=”weightInput” min=”1″ style=”color: #000;”>
</div>
`;
});
});

document.getElementById(‘withinNo’).addEventListener(‘click’, () => {
withinSize = ‘no’;
document.getElementById(‘withinNo’).classList.add(‘active’);
document.getElementById(‘withinYes’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Length (mm)</label>
<input type=”number” id=”lengthInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Width (mm)</label>
<input type=”number” id=”widthInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Height (mm)</label>
<input type=”number” id=”heightInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Weight (kg) per crate</label>
<input type=”number” id=”weightInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
`;
document.getElementById(‘weightQuestion’).innerHTML = ”;
});

document.getElementById(‘addCrateBtn’).addEventListener(‘click’, () => {
const qty = document.getElementById(‘qtyInput’)?.value || ‘1’;
if (withinSize === ‘yes’ && underWeight === ‘yes’) {
addItem(‘Crate’, ‘📦’, qty, ‘under 1000kg ea’, ‘1200x1200x1800mm’, ”, (parseInt(qty) * 1000) + ‘kg’);
} else if (withinSize === ‘yes’ && underWeight === ‘no’) {
const w = document.getElementById(‘weightInput’)?.value || ‘?’;
addItem(‘Crate’, ‘📦’, qty, w + ‘kg ea’, ‘1200x1200x1800mm’, ”, (parseInt(qty) * parseInt(w || 0)) + ‘kg’);
} else if (withinSize === ‘no’) {
const l = document.getElementById(‘lengthInput’)?.value || ‘?’;
const w = document.getElementById(‘widthInput’)?.value || ‘?’;
const h = document.getElementById(‘heightInput’)?.value || ‘?’;
const wt = document.getElementById(‘weightInput’)?.value || ‘?’;
addItem(‘Crate’, ‘📦’, qty, wt + ‘kg ea’, l+’x’+w+’x’+h+’mm’, ”, (parseInt(qty) * parseInt(wt || 0)) + ‘kg’);
}
});
});

document.getElementById(‘doubleCrateImg’).addEventListener(‘click’, () => {
crateSize = ‘double’;
document.getElementById(‘doubleCrateImg’).style.borderColor = ‘#10b981’;
document.getElementById(‘singleCrateImg’).style.borderColor = ‘#dddddd’;
document.getElementById(‘crateSubOptions’).innerHTML = `
<div style=”margin-top: 1rem;”>
<div class=”form-group”>
<label>Within 2400x1200x1800mm?</label>
<div class=”option-row”>
<button class=”option-btn” id=”withinYes”>Yes</button>
<button class=”option-btn” id=”withinNo”>No</button>
</div>
</div>
<div id=”weightQuestion”></div>
<div id=”finalInputs”></div>
<button class=”btn-primary” id=”addCrateBtn”>Add crate</button>
</div>
`;

document.getElementById(‘withinYes’).addEventListener(‘click’, () => {
withinSize = ‘yes’;
document.getElementById(‘withinYes’).classList.add(‘active’);
document.getElementById(‘withinNo’).classList.remove(‘active’);
document.getElementById(‘weightQuestion’).innerHTML = `
<div class=”form-group”>
<label>Under 1000kg?</label>
<div class=”option-row”>
<button class=”option-btn” id=”weightYes”>Yes</button>
<button class=”option-btn” id=”weightNo”>No</button>
</div>
</div>
`;
document.getElementById(‘weightYes’).addEventListener(‘click’, () => {
underWeight = ‘yes’;
document.getElementById(‘weightYes’).classList.add(‘active’);
document.getElementById(‘weightNo’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
`;
});
document.getElementById(‘weightNo’).addEventListener(‘click’, () => {
underWeight = ‘no’;
document.getElementById(‘weightNo’).classList.add(‘active’);
document.getElementById(‘weightYes’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Exact weight (kg) per crate</label>
<input type=”number” id=”weightInput” min=”1″ style=”color: #000;”>
</div>
`;
});
});

document.getElementById(‘withinNo’).addEventListener(‘click’, () => {
withinSize = ‘no’;
document.getElementById(‘withinNo’).classList.add(‘active’);
document.getElementById(‘withinYes’).classList.remove(‘active’);
document.getElementById(‘finalInputs’).innerHTML = `
<div class=”form-group”>
<label>Length (mm)</label>
<input type=”number” id=”lengthInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Width (mm)</label>
<input type=”number” id=”widthInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Height (mm)</label>
<input type=”number” id=”heightInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Weight (kg) per crate</label>
<input type=”number” id=”weightInput” min=”1″ style=”color: #000;”>
</div>
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″ style=”color: #000;”>
</div>
`;
document.getElementById(‘weightQuestion’).innerHTML = ”;
});

document.getElementById(‘addCrateBtn’).addEventListener(‘click’, () => {
const qty = document.getElementById(‘qtyInput’)?.value || ‘1’;
if (withinSize === ‘yes’ && underWeight === ‘yes’) {
addItem(‘Crate’, ‘📦’, qty, ‘under 1000kg ea’, ‘2400x1200x1800mm’, ”, (parseInt(qty) * 1000) + ‘kg’);
} else if (withinSize === ‘yes’ && underWeight === ‘no’) {
const w = document.getElementById(‘weightInput’)?.value || ‘?’;
addItem(‘Crate’, ‘📦’, qty, w + ‘kg ea’, ‘2400x1200x1800mm’, ”, (parseInt(qty) * parseInt(w || 0)) + ‘kg’);
} else if (withinSize === ‘no’) {
const l = document.getElementById(‘lengthInput’)?.value || ‘?’;
const w = document.getElementById(‘widthInput’)?.value || ‘?’;
const h = document.getElementById(‘heightInput’)?.value || ‘?’;
const wt = document.getElementById(‘weightInput’)?.value || ‘?’;
addItem(‘Crate’, ‘📦’, qty, wt + ‘kg ea’, l+’x’+w+’x’+h+’mm’, ”, (parseInt(qty) * parseInt(wt || 0)) + ‘kg’);
}
});
});
}

else if (type === ‘machine’) {
optionPanel.innerHTML += `
<div class=”section-title”>⚙️ Machine</div>
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″>
</div>
<div class=”form-group”>
<label>Length (mm)</label>
<input type=”number” id=”lengthInput”>
</div>
<div class=”form-group”>
<label>Width (mm)</label>
<input type=”number” id=”widthInput”>
</div>
<div class=”form-group”>
<label>Height (mm)</label>
<input type=”number” id=”heightInput”>
</div>
<div class=”form-group”>
<label>Weight (kg) per unit</label>
<input type=”number” id=”weightInput”>
</div>
<div class=”form-group”>
<label>Description (optional)</label>
<textarea id=”descInput” placeholder=”e.g., printing press, industrial oven…”></textarea>
</div>
<button class=”btn-primary” id=”addItemBtn”>Add machine</button>
`;
document.getElementById(‘addItemBtn’).addEventListener(‘click’, () => {
const qty = document.getElementById(‘qtyInput’)?.value || ‘1’;
const l = document.getElementById(‘lengthInput’)?.value || ‘?’;
const w = document.getElementById(‘widthInput’)?.value || ‘?’;
const h = document.getElementById(‘heightInput’)?.value || ‘?’;
const wt = document.getElementById(‘weightInput’)?.value || ‘?’;
const desc = document.getElementById(‘descInput’)?.value || ”;
addItem(‘Machine’, ‘⚙️’, qty, wt + ‘kg ea’, l+’x’+w+’x’+h+’mm’, desc, (parseInt(qty) * parseInt(wt || 0)) + ‘kg’);
});
}

else if (type === ‘boxes’) {
optionPanel.innerHTML += `
<div class=”section-title”>📦 Boxes</div>
<div class=”form-group”>
<label>Number of boxes</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″>
</div>
<div class=”form-group”>
<label>Total approx weight (kg)</label>
<input type=”number” id=”weightInput”>
</div>
<div class=”form-group”>
<label>Description (optional)</label>
<textarea id=”descInput” placeholder=”e.g., cardboard boxes, mixed sizes…”></textarea>
</div>
<button class=”btn-primary” id=”addItemBtn”>Add boxes</button>
`;
document.getElementById(‘addItemBtn’).addEventListener(‘click’, () => {
const qty = document.getElementById(‘qtyInput’)?.value || ‘1’;
const weight = document.getElementById(‘weightInput’)?.value || ‘?’;
const desc = document.getElementById(‘descInput’)?.value || ”;
addItem(‘Boxes’, ‘📦’, qty, weight + ‘kg total’, ”, desc, weight + ‘kg’);
});
}

else if (type === ‘loose’) {
optionPanel.innerHTML += `
<div class=”section-title”>🧩 Loose items</div>
<div class=”form-group”>
<label>Number of items</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″>
</div>
<div class=”form-group”>
<label>Total approx weight (kg)</label>
<input type=”number” id=”weightInput”>
</div>
<div class=”form-group”>
<label>Description</label>
<textarea id=”descInput” placeholder=”e.g., furniture, artwork, poles…”></textarea>
</div>
<button class=”btn-primary” id=”addItemBtn”>Add items</button>
`;
document.getElementById(‘addItemBtn’).addEventListener(‘click’, () => {
const qty = document.getElementById(‘qtyInput’)?.value || ‘1’;
const weight = document.getElementById(‘weightInput’)?.value || ‘?’;
const desc = document.getElementById(‘descInput’)?.value || ”;
addItem(‘Loose items’, ‘🧩’, qty, weight + ‘kg total’, ”, desc, weight + ‘kg’);
});
}

else if (type === ‘custom’) {
optionPanel.innerHTML += `
<div class=”section-title”>🎯 Custom</div>
<div class=”form-group”>
<label>Quantity</label>
<input type=”number” id=”qtyInput” min=”1″ value=”1″>
</div>
<div class=”form-group”>
<label>Length (mm)</label>
<input type=”number” id=”lengthInput”>
</div>
<div class=”form-group”>
<label>Width (mm)</label>
<input type=”number” id=”widthInput”>
</div>
<div class=”form-group”>
<label>Height (mm)</label>
<input type=”number” id=”heightInput”>
</div>
<div class=”form-group”>
<label>Weight (kg) per unit</label>
<input type=”number” id=”weightInput”>
</div>
<div class=”form-group”>
<label>Description</label>
<textarea id=”descInput” placeholder=”Describe the item…”></textarea>
</div>
<button class=”btn-primary” id=”addItemBtn”>Add custom item</button>
`;
document.getElementById(‘addItemBtn’).addEventListener(‘click’, () => {
const qty = document.getElementById(‘qtyInput’)?.value || ‘1’;
const l = document.getElementById(‘lengthInput’)?.value || ‘?’;
const w = document.getElementById(‘widthInput’)?.value || ‘?’;
const h = document.getElementById(‘heightInput’)?.value || ‘?’;
const wt = document.getElementById(‘weightInput’)?.value || ‘?’;
const desc = document.getElementById(‘descInput’)?.value || ”;
addItem(‘Custom’, ‘🎯’, qty, wt + ‘kg ea’, l+’x’+w+’x’+h+’mm’, desc, (parseInt(qty) * parseInt(wt || 0)) + ‘kg’);
});
}
});
});

continueBtn.addEventListener(‘click’, () => {
alert(‘Continue to quote with ‘ + items.length + ‘ items’);
});

renderSummary();
</script>
</body>
</html>

Contact Us
Let's talk
Facebook
Pinterest
Behance
t: 929-242-6868
e: contact@info.com
a: 13 Fifth Avenue, NY 10160

Providing creative ideas for your business

Copyright © 2026 Axis Events
Powered by Axis Events
