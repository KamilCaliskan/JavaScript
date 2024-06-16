//In a small town the population is p0 = 1000 at the beginning of a year. 
The population regularly increases by 2 percent per year and moreover 50 new inhabitants 
per year come to live in the town. How many years does the town need to see 
its population greater or equal to p = 1200 inhabitants?//




    // Define a function called nbYear with parameters p0 (initial population),
// percent (percentage increase per year), aug (additional inhabitants arriving per year),
// and p (target population).
function nbYear(p0, percent, aug, p) {
    // Initialize the variable population incorrectly as percent instead of p0.
    // Also, initialize the variable years to 0.
    let population = p0;
    let years = 0;

    // Use a while loop to continue iterating until the population is greater than or equal to the target population.
    while (population < p) {
        // Update the population using the correct formula for compound interest,
        // where percent is converted to a decimal and aug is added.
        population = population * (1 + percent / 100) + aug;

        // Increment the years variable to keep track of the number of years.
        years++;
    }

    // Return the final number of years needed to reach or exceed the target population.
    return years;
}

// Define constants for the initial population (p0), percentage increase (percent),
// additional inhabitants arriving per year (aug), and target population (p).
const p0 = 1000;
const percent = 2;
const aug = 50;
const p = 1200;

// Call the nbYear function with the provided constants and store the result in yearsNeeded.
const yearsNeeded = nbYear(p0, percent, aug, p);

// Use console.log to display the result. Also, use backticks (`) for template literals.
console.log(`It takes ${yearsNeeded} years for the population to reach ${p} or more.`);
