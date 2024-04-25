
//Store the values input values into variables
const birthDay =document.getElementById("day")
const birthMonth =document.getElementById("month")
const birthYear =document.getElementById("year")

//Capture button in variable
const calcBtn = document.querySelector('.calc-btn');


//Add eventlistener to button to trigger validations and age calculation
calcBtn.addEventListener('click', (event) => {
  let isValid = true;
  
  // Clear any previous inline error messages
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());

  //Begin inputs Validation
  
  if (true) {
        //1.  Check for empty fields
        if (birthDay.value === '') {
            showError(birthDay, 'This field is required.');
            isValid = false; 
        } 
        
        if (birthMonth.value === '') {
            showError(birthMonth, 'This field is required.');
            isValid = false;
        }
        
        if (birthYear.value === '') {
            showError(birthYear, 'This field is required.');
            isValid = false;
        } 

        //2. Day input Validation. The date entered should be from 1 -31
        if (parseInt(birthDay.value)< 1 || parseInt(birthDay.value) > 31) {
        isValid = false;
        showError(birthDay, 'Please enter a valid day (1-31).');
        }

        //3. Month input  Validation. Month vaue should be 1-12, rperesenting the months
        if (parseInt(birthMonth.value) < 1 || parseInt(birthMonth.value) > 12) {
        isValid = false;
        showError(birthMonth, 'Please enter a valid month (1-12).');
        }

        // Year input Validation. Lenght of year entered should be 4 characters
        if (birthYear.value !=='' && birthYear.value.length !== 4) {
        isValid = false;
        showError(birthYear, 'Please enter a valid year (YYYY).');
        }
        if (isValid) { // Only call calculateAge if validation is successful
        calculateAge();
        }else{
            let ageDisplay= document.getElementById("age-display")
            ageDisplay.innerHTML=`
            <div>-- years</div>
            <div>-- months</div>
            <div> -- days</div>
            `
        }
    } 
});

   
function showError(inputElement, errorMessage) {
    const errorSpan = document.createElement('span'); //create new span element
    errorSpan.classList.add('error-message'); //give it a class
    errorSpan.textContent = errorMessage; //insert the error message in the span
  
    // Insert the new span element after the input element
    inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
  }

function calculateAge(){
    //Establish what the current date is use the new Date() menthod.
    const currentDate = new Date()

    //Uisng date of birth inputs from form as erguments,establish the users date of birth
    // birthmonth is -1 because in javascript, the months are 0 indexed. January is index 0 and December is index 11
    const birthDate = new Date(birthYear.value, birthMonth.value -1, birthDay.value)


    //Get user's age as the number of years since the users birth year
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    //Get the month difference between users birth month and current month
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    // check If the current month comes before(is less than) the birth month or if 
    // it's the same month but the current day comes before(is less than) the birth day, 
    //subtract 1 from the age since the birthday in the current year hasnt yet passed
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
    }

    // Calculate the total number of months since the userslast birthmonth
    let months = (currentDate.getMonth() + 12 - birthDate.getMonth()) % 12;
    let lastMonth

    // Calculate the number of days
    let days = currentDate.getDate() - birthDate.getDate();
    if (days < 0) {
        // If the day difference is negative, it means the birth day hasn't occurred yet in the current month
        // Subtract 1 month from the months
        months--;

        // Get the number of days in the previous month
        lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days = lastMonth.getDate() - birthDate.getDate() + currentDate.getDate();
    }

    //Display the calculated Age(Years,Months,Days)
    let ageDisplay= document.getElementById("age-display")
    ageDisplay.innerHTML=`
        <div>${age} years</div>
        <div>${months} months</div>
        <div>${days} days</div>
    `
    
}

