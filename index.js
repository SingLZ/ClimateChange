// TODO: Query for button with an id "theme-button"
const themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
  // Write your code to manipulate the DOM here
  document.body.classList.toggle("dark-mode");
};

// TODO: Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);






// TODO: Add your query for the sign now button here
const signNowButton = document.getElementById('sign-now-button');

let count = 3;

// Function to add a signature
const addSignature = (person) => {
  // Create a new paragraph element for the signature
  const signatureParagraph = document.createElement('p');

  // Format the signature using the collected name and hometown from the person parameter
  const signatureText = `🖊️ ${person.name} from ${person.hometown} supports this.`;

  // Set the text content of the paragraph to the signature
  signatureParagraph.textContent = signatureText;

  // Find where the signatures section is (by class)
  const signaturesSection = document.querySelector('.signatures');

  // Add the new signature to the signatures section
  signaturesSection.appendChild(signatureParagraph);

  // Remove the old counter
  const oldCounter = document.getElementById('counter');
  oldCounter.remove();

  // Increase the count variable
  count = count + 1;

  // Create a new counter HTML p tag
  const counterElement = document.createElement('p');
  // Set the id to "counter" for future reference
  counterElement.id = 'counter';
  // Set the text content for the new counter
  counterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  // Append the new counter to the signatures div
  signaturesSection.appendChild(counterElement);

  // Call toggleModal function after adding the signature
  toggleModal(person);
};






// TODO: Remove the click event listener that calls addSignature()

const validateForm = () => {
  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value
    // Add more properties as needed based on your form structure
  };

  for (let i = 0; i < petitionInputs.length; i++) {
    if (person[petitionInputs[i].name] && person[petitionInputs[i].name].length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (!containsErrors) {
    addSignature(person);
  }
};


signNowButton.addEventListener('click', validateForm);



// Animation configuration
const animation = {
  revealDistance: 150,
  initialsOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

// Function to reveal elements on scroll
const reveal = () => {
  const windowHeight = window.innerHeight;
  const revealableContainers = document.querySelectorAll(".revealable");

  for (let i = 0; i < revealableContainers.length; i++) {
    const topOfRevealableContainers = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainers < windowHeight - animation.revealDistance) {
      // Add the active class to the revealableContainer's classlist
      revealableContainers[i].classList.add('active');
    } else {
      // Remove the active class to the revealableContainer's classlist
      revealableContainers[i].classList.remove('active');
    }
  }
};

window.addEventListener('scroll', reveal);





// Function to scale the image
// Variables for image animation
let scaleFactor = 1;
const modalImage = document.querySelector('#thanks-modal img');

// Function to scale the image
// Function to scale the image
const scaleImage = () => {
  console.log('Scaling image...');

  // Toggle the image size between a factor of 1 and 0.8
  scaleFactor = (scaleFactor === 1) ? 0.8 : 1;

  // Apply the scale transformation to the image
  modalImage.style.transform = `scale(${scaleFactor})`;

  // You can add additional animation properties or styles as needed
};


// Function to toggle the modal
const toggleModal = (person) => {
  console.log('scaleImage function called...');
  // Select the modal and modal content
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('thanks-modal-content');

  // Set the display style property of the entire modal to flex
  modal.style.display = 'flex';
  // Set the position of the modal to fixed, and center it using top and left properties
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  // Center the modal using transform and translate
  modal.style.transform = 'translate(-50%, -50%)';
  // Display the person's information in the modal content
  modalContent.textContent = `Thank you, ${person.name}, for supporting the cause!`;

  // Start the scaling animation
  const intervalId = setInterval(scaleImage, 500);  // Call scaleImage every half a second

  // Hide the modal after 4 seconds (4000 milliseconds)
  setTimeout(() => {
    modal.style.display = 'none';
    // Reset the modal size and position
    
    modal.style.position = 'initial'; // Reset the position property

    // Stop the scaling animation
    clearInterval(intervalId);
  }, 4000); // Adjust the delay as needed
};
