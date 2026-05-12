document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const genderButtons = document.querySelectorAll('.toggle-group button');
    let selectedGender = 'male';

    // 1. Handle Gender Toggle UI
    genderButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            genderButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedGender = btn.innerText.toLowerCase();
        });
    });

    // 2. Calculation Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Input Values
        const age = parseFloat(document.querySelector('input[value="25"]').value);
        const weight = parseFloat(document.querySelector('input[value="70"]').value);
        const height = parseFloat(document.querySelector('input[value="175"]').value);
        
        // Activity Multipliers
        // (Simplified: assuming 'Moderately Active' based on screen.jpg)
        const activityMultiplier = 1.55; 

        if (!age || !weight || !height) {
            alert("Please fill in all fields");
            return;
        }

        // BMR Calculation (Mifflin-St Jeor)
        let bmr;
        if (selectedGender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        const maintenance = Math.round(bmr * activityMultiplier);
        updateUI(maintenance);
    });

    // 3. Update the UI with Results
    function updateUI(calories) {
        // Update Main Maintenance Card
        document.querySelector('.maintenance-card h2').innerHTML = 
            `${calories.toLocaleString()} <span>kcal/day</span>`;

        // Update Weight Loss (-500 kcal)
        const loss = calories - 500;
        document.querySelector('.weight-loss h3').innerHTML = 
            `${loss.toLocaleString()} <span>kcal</span>`;

        // Update Weight Gain (+300 kcal)
        const gain = calories + 300;
        document.querySelector('.weight-gain h3').innerHTML = 
            `${gain.toLocaleString()} <span>kcal</span>`;

        // Update Macros (40/30/30 Split)
        // Protein: 4 cal/g | Carbs: 4 cal/g | Fats: 9 cal/g
        const proteinGrams = Math.round((calories * 0.40) / 4);
        const carbsGrams = Math.round((calories * 0.30) / 4);
        const fatsGrams = Math.round((calories * 0.30) / 9);

        const macroLabels = document.querySelectorAll('.macro-row strong');
        macroLabels[0].innerText = `${proteinGrams}g (40%)`;
        macroLabels[1].innerText = `${carbsGrams}g (30%)`;
        macroLabels[2].innerText = `${fatsGrams}g (30%)`;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Filter Functionality
    const chips = document.querySelectorAll('.vp-filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelector('.vp-filter-chip.active').classList.remove('active');
            chip.classList.add('active');
            
            const filterValue = chip.getAttribute('data-filter');
            console.log(`Filtering for: ${filterValue}`);
            // Here you would hide/show cards based on the filter
        });
    });

    // 3. Simple Animation for the progress bar on Featured Card
    setTimeout(() => {
        const barFill = document.querySelector('.vp-progress-line .fill');
        if(barFill) barFill.style.transition = "width 1.5s ease-in-out";
    }, 500);

    // 4. Click effect on "Start Routine" buttons
    const startButtons = document.querySelectorAll('.vp-btn-start');
    startButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerText = "Resuming...";
            this.style.background = "#064e3b";
            this.style.color = "white";
        });
    });
});