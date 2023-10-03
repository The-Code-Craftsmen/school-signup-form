const packageSelect = document.getElementById("package");
const numStudentsInput = document.getElementById("numStudents");

function calculateBill() {
    const selectedPackage = packageSelect.value;
    const billCaption = document.getElementById("billCaption");
    const numStudents = parseFloat(numStudentsInput.value);
    let planCost = 0;

    switch (selectedPackage) {
        case "basic":
            planCost = 500;
            break;
        case "business":
            planCost = 1000;
            break;
        case "premium":
            planCost = 1500;
            break;
    }

    const totalBill = numStudents * planCost;
    billCaption.textContent = `Total Bill: $${totalBill}`;
}

function populateOptions() {
    // Check if options are already populated
    if (packageSelect.options.length === 0) {
        // Populate the options here
        const options = [
            { value: "basic", text: "Basic" },
            { value: "business", text: "Business" },
            { value: "premium", text: "Premium" },
        ];

        options.forEach((option) => {
            const newOption = document.createElement("option");
            newOption.value = option.value;
            newOption.text = option.text;
            packageSelect.appendChild(newOption);
        });
    }
}

function handleNumStudentsInput() {
    const selectedPackage = packageSelect.value;

    if (selectedPackage !== "") {
        calculateBill();
    }
}

packageSelect.addEventListener("click", populateOptions);
packageSelect.addEventListener("change", calculateBill);
numStudentsInput.addEventListener("input", handleNumStudentsInput);

window.addEventListener("beforeunload", function() {
    const form = document.getElementById("registrationForm");
    form.reset();
});