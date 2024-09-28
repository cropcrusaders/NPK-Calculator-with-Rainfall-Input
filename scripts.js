function calculateNPK() {
    // Get user input values
    const cropTypeElement = document.getElementById('cropType');
    const cropType = cropTypeElement.value;
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
    if (isNaN(soilN) || isNaN(soilP) || isNaN(soilK) || soilN < 0 || soilP < 0 || soilK < 0) {
        alert("Please enter valid soil nutrient values.");
        return;
    }

    // Define default NPK requirements for specific crops
    const npkRequirements = {
        "corn": { N: 180, P: 60, K: 40 },
        "wheat": { N: 150, P: 50, K: 30 },
        // Add more crops as needed
    };

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
        <h2>NPK Recommendation for ${cropType.charAt(0).toUpperCase() + cropType.slice(1)}</h2>
        <p>Based on your inputs, the following additional amounts of nutrients are recommended:</p>
        <ul>
            <li><strong>Nitrogen (N):</strong> ${requiredN.toFixed(2)} kg/ha</li>
            <li><strong>Phosphorus (P):</strong> ${requiredP.toFixed(2)} kg/ha</li>
            <li><strong>Potassium (K):</strong> ${requiredK.toFixed(2)} kg/ha</li>
        </ul>
    `;
}
