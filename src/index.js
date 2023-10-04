const packageSelect = document.getElementById("package");
const numStudentsInput = document.getElementById("numStudents");
const registrationForm = document.getElementById("registrationForm");

let bill = null;

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
    bill = totalBill;
    billCaption.textContent = `Total Bill: $${totalBill}`;
}

function populateOptions() {
    // Check if options are already populated
    if (packageSelect.options.length === 0) {
        // Populate the options here
        const options = [
            { value: "Basic", text: "Basic" },
            { value: "Business", text: "Business" },
            { value: "Premium", text: "Premium" },
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
registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const schoolName = document.getElementById("schoolName").value;
    const numStudents = document.getElementById("numStudents").value;
    const schoolEmail = document.getElementById("schoolEmail").value;
    const schoolPhone = document.getElementById("schoolPhone").value;
    const package = document.getElementById("package").value;
    console.log(JSON.stringify({ schoolName, numStudents, schoolEmail, schoolPhone, package, bill }))
    fetch("http://localhost:3000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ schoolName, numStudents, schoolEmail, schoolPhone, package, bill }),
        })
        .then((response) => {
            alert("Form Submitted Successfully")
          })
        .catch((error) => {
            // Handle any errors that occur during the request
            console.error("Error submitting the form:", error);
        });
});

window.addEventListener("beforeunload", function() {
    const form = document.getElementById("registrationForm");
    form.reset();
});