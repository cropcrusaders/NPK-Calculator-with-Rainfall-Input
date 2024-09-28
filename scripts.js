"use strict";

// Define fertilizer data
const fertilizers = [
    { name: "Urea", N: 46, P2O5: 0, K2O: 0, description: "High nitrogen source, highly soluble" },
    { name: "Ammonium Sulfate", N: 21, P2O5: 0, K2O: 0, description: "Provides nitrogen and sulfur" },
    { name: "Diammonium Phosphate (DAP)", N: 18, P2O5: 46, K2O: 0, description: "Supplies nitrogen and phosphorus" },
    { name: "Single Superphosphate", N: 0, P2O5: 16, K2O: 0, description: "Phosphorus source" },
    { name: "Triple Superphosphate", N: 0, P2O5: 46, K2O: 0, description: "High phosphorus source" },
    { name: "Potash (Muriate of Potash)", N: 0, P2O5: 0, K2O: 60, description: "High potassium source" },
    { name: "Sulfate of Potash", N: 0, P2O5: 0, K2O: 50, description: "Potassium and sulfur source" },
    { name: "Calcium Nitrate", N: 15.5, P2O5: 0, K2O: 0, description: "Nitrogen and calcium source" },
    { name: "Potassium Nitrate", N: 13, P2O5: 0, K2O: 46, description: "Nitrogen and potassium source" },
    { name: "Monoammonium Phosphate (MAP)", N: 11.5, P2O5: 48, K2O: 0, description: "Nitrogen and phosphorus source" },
    { name: "Potassium Sulfate", N: 0, P2O5: 0, K2O: 50, description: "Potassium and sulfur source" },
    { name: "Sodium Nitrate", N: 16, P2O5: 0, K2O: 0, description: "Nitrogen source" },
    { name: "Blood Meal", N: 12, P2O5: 0, K2O: 0, description: "Organic nitrogen source" },
    { name: "Bone Meal", N: 3, P2O5: 15, K2O: 0, description: "Organic phosphorus source" },
    { name: "Kelp Meal", N: 1, P2O5: 0, K2O: 1, description: "Organic micronutrients and trace elements" },
    { name: "Fish Emulsion", N: 5, P2O5: 2, K2O: 1, description: "Organic fertilizer with micronutrients" },
    { name: "Wood Ash", N: 0, P2O5: 0, K2O: 2, description: "Provides potassium and raises soil pH" },
    { name: "Lime (Calcium Carbonate)", N: 0, P2O5: 0, K2O: 0, description: "Adjusts soil pH, provides calcium" }
    // Add more fertilizers as needed
];

// Function to populate the fertilizer information table
function populateFertilizerTable() {
    const tableBody = document.querySelector('#fertilizerInfo tbody');
    fertilizers.forEach(fertilizer => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = fertilizer.name;
        row.appendChild(nameCell);
        
        const nCell = document.createElement('td');
        nCell.textContent = fertilizer.N;
        row.appendChild(nCell);
        
        const pCell = document.createElement('td');
        pCell.textContent = fertilizer.P2O5;
        row.appendChild(pCell);
        
        const kCell = document.createElement('td');
        kCell.textContent = fertilizer.K2O;
        row.appendChild(kCell);
        
        const descCell = document.createElement('td');
        descCell.textContent = fertilizer.description;
        row.appendChild(descCell);
        
        tableBody.appendChild(row);
    });
}

// Function to recommend fertilizers based on required NPK
function recommendFertilizers(requiredN, requiredP, requiredK) {
    const fertilizerSelect = document.getElementById('fertilizer');
    fertilizerSelect.innerHTML = '<option value="" disabled selected>Select a fertilizer</option>'; // Reset options

    // Find fertilizers that can supply any of the required nutrients
    fertilizers.forEach(fertilizer => {
        let canSupplyN = fertilizer.N > 0 && requiredN > 0;
        let canSupplyP = fertilizer.P2O5 > 0 && requiredP > 0;
        let canSupplyK = fertilizer.K2O > 0 && requiredK > 0;

        if (canSupplyN || canSupplyP || canSupplyK) {
            fertilizerSelect.innerHTML += `<option value="${fertilizer.name}">${fertilizer.name}</option>`;
        }
    });

    // Enable the fertilizer dropdown if there are recommendations
    if (fertilizerSelect.options.length > 1) {
        fertilizerSelect.disabled = false;
    } else {
        fertilizerSelect.disabled = true;
    }
}

// Function to calculate NPK requirements
function calculateNPK() {
    // Get user input values
    const cropTypeElement = document.getElementById('cropType');
    const cropType = cropTypeElement.value.toLowerCase();
    const soilN = parseFloat(document.getElementById('soilN').value);
    const soilP = parseFloat(document.getElementById('soilP').value);
    const soilK = parseFloat(document.getElementById('soilK').value);
    const rainfall = parseFloat(document.getElementById('rainfall').value || 0);
    const irrigation = parseFloat(document.getElementById('irrigation').value || 0);

    // Input validation
    if (!cropType) {
        alert("Please select a crop type.");
        return;
    }
    if (
        isNaN(soilN) || isNaN(soilP) || isNaN(soilK) ||
        soilN < 0 || soilP < 0 || soilK < 0
    ) {
        alert("Please enter valid soil nutrient values.");
        return;
    }

    // Define default NPK requirements for specific crops
    const npkRequirements = {
        "mung beans": { N: 25, P: 50, K: 50 },
        "chickpeas": { N: 20, P: 60, K: 40 },
        "lentils": { N: 20, P: 40, K: 30 },
        "peas": { N: 25, P: 50, K: 50 },
        "soybeans": { N: 30, P: 60, K: 80 },
        "common beans": { N: 30, P: 50, K: 50 },
        "peanuts": { N: 25, P: 40, K: 60 },
        "wheat": { N: 150, P: 50, K: 30 },
        "barley": { N: 120, P: 40, K: 30 },
        "corn": { N: 180, P: 60, K: 40 },
        "rice": { N: 100, P: 40, K: 40 },
        "oats": { N: 80, P: 30, K: 20 },
        "sorghum": { N: 100, P: 40, K: 40 },
        "canola": { N: 150, P: 60, K: 60 },
        "sunflower": { N: 100, P: 60, K: 80 },
        "sesame": { N: 50, P: 30, K: 40 },
        "safflower": { N: 80, P: 40, K: 40 },
        "cotton": { N: 200, P: 60, K: 100 },
        "flax": { N: 80, P: 40, K: 40 },
        "potatoes": { N: 150, P: 60, K: 200 },
        "cassava": { N: 100, P: 50, K: 150 },
        "sugar beet": { N: 120, P: 60, K: 180 },
        "sugarcane": { N: 160, P: 80, K: 200 },
        "forage sorghum": { N: 80, P: 30, K: 60 },
        "lucerne": { N: 0, P: 30, K: 150 },
        "ryegrass": { N: 150, P: 40, K: 80 },
        "clover": { N: 0, P: 30, K: 100 },
        "barley (forage)": { N: 100, P: 40, K: 60 },
        "oat hay": { N: 80, P: 30, K: 50 },
        "sorghum (forage)": { N: 80, P: 30, K: 60 },
    };
    // Add more crops as needed

    // Lookup crop NPK requirements
    const cropNPK = npkRequirements[cropType];
    if (!cropNPK) {
        alert("Crop type not found in the database.");
        return;
    }

    // Adjust NPK requirements based on water availability
    const waterAvailability = rainfall + (irrigation * 100); // Assuming 1 megaliter/ha = 100 mm
    const optimalWater = 500; // Optimal water in mm (this can be adjusted per crop)
    const waterFactor = waterAvailability / optimalWater;

    // Ensure the water factor does not unrealistically inflate requirements
    const adjustedWaterFactor = Math.min(waterFactor, 1.5); // Cap at 1.5 for safety

    // Adjust NPK based on water factor
    const adjustedN = cropNPK.N * adjustedWaterFactor;
    const adjustedP = cropNPK.P * adjustedWaterFactor;
    const adjustedK = cropNPK.K * adjustedWaterFactor;

    // Calculate additional NPK needed after accounting for soil nutrients
    const requiredN = Math.max(0, adjustedN - soilN);
    const requiredP = Math.max(0, adjustedP - soilP);
    const requiredK = Math.max(0, adjustedK - soilK);

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>NPK Recommendation for ${cropTypeElement.options[cropTypeElement.selectedIndex].text}</h2>
        <p>Based on your inputs, the following additional amounts of nutrients are recommended:</p>
        <ul>
            <li><strong>Nitrogen (N):</strong> ${requiredN.toFixed(2)} kg/ha</li>
            <li><strong>Phosphorus (P):</strong> ${requiredP.toFixed(2)} kg/ha</li>
            <li><strong>Potassium (K):</strong> ${requiredK.toFixed(2)} kg/ha</li>
        </ul>
    `;

    // Recommend fertilizers based on required NPK
    recommendFertilizers(requiredN, requiredP, requiredK);
}

// Function to recommend fertilizers based on required NPK
function recommendFertilizers(requiredN, requiredP, requiredK) {
    const fertilizerSelect = document.getElementById('fertilizer');
    fertilizerSelect.innerHTML = '<option value="" disabled selected>Select a fertilizer</option>'; // Reset options

    // Find fertilizers that can supply any of the required nutrients
    fertilizers.forEach(fertilizer => {
        let canSupplyN = fertilizer.N > 0 && requiredN > 0;
        let canSupplyP = fertilizer.P2O5 > 0 && requiredP > 0;
        let canSupplyK = fertilizer.K2O > 0 && requiredK > 0;

        if (canSupplyN || canSupplyP || canSupplyK) {
            fertilizerSelect.innerHTML += `<option value="${fertilizer.name}">${fertilizer.name}</option>`;
        }
    });

    // Enable the fertilizer dropdown if there are recommendations
    if (fertilizerSelect.options.length > 1) {
        fertilizerSelect.disabled = false;
    } else {
        fertilizerSelect.disabled = true;
    }
}

// Event listener for fertilizer selection to display details
document.getElementById('fertilizer').addEventListener('change', function() {
    const selectedFertilizer = this.value;
    const fertilizer = fertilizers.find(f => f.name === selectedFertilizer);

    if (fertilizer) {
        displayFertilizerDetails(fertilizer);
    }
});

// Function to display fertilizer details
function displayFertilizerDetails(fertilizer) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML += `
        <h3>Fertilizer Details</h3>
        <p><strong>${fertilizer.name}</strong></p>
        <ul>
            <li><strong>Nitrogen (N):</strong> ${fertilizer.N}%</li>
            <li><strong>Phosphorus (P₂O₅):</strong> ${fertilizer.P2O5}%</li>
            <li><strong>Potassium (K₂O):</strong> ${fertilizer.K2O}%</li>
            <li><strong>Description:</strong> ${fertilizer.description}</li>
        </ul>
    `;
}

// Function to populate the fertilizer information table
function populateFertilizerTable() {
    const tableBody = document.querySelector('#fertilizerInfo tbody');
    fertilizers.forEach(fertilizer => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = fertilizer.name;
        row.appendChild(nameCell);
        
        const nCell = document.createElement('td');
        nCell.textContent = fertilizer.N;
        row.appendChild(nCell);
        
        const pCell = document.createElement('td');
        pCell.textContent = fertilizer.P2O5;
        row.appendChild(pCell);
        
        const kCell = document.createElement('td');
        kCell.textContent = fertilizer.K2O;
        row.appendChild(kCell);
        
        const descCell = document.createElement('td');
        descCell.textContent = fertilizer.description;
        row.appendChild(descCell);
        
        tableBody.appendChild(row);
    });
}

// Function to save user preferences (optional)
function savePreferences() {
    const preferences = {
        cropType: document.getElementById('cropType').value,
        soilN: document.getElementById('soilN').value,
        soilP: document.getElementById('soilP').value,
        soilK: document.getElementById('soilK').value,
        rainfall: document.getElementById('rainfall').value,
        irrigation: document.getElementById('irrigation').value
    };
    localStorage.setItem('npkPreferences', JSON.stringify(preferences));
}

// Function to load user preferences (optional)
function loadPreferences() {
    const savedPrefs = JSON.parse(localStorage.getItem('npkPreferences'));
    if (savedPrefs) {
        document.getElementById('cropType').value = savedPrefs.cropType;
        document.getElementById('soilN').value = savedPrefs.soilN;
        document.getElementById('soilP').value = savedPrefs.soilP;
        document.getElementById('soilK').value = savedPrefs.soilK;
        document.getElementById('rainfall').value = savedPrefs.rainfall;
        document.getElementById('irrigation').value = savedPrefs.irrigation;
    }
}

// Call the function when the page loads
window.onload = function() {
    populateFertilizerTable();
    loadPreferences(); // If you have other functions to call on load
};
