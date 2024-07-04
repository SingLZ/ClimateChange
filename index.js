
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsRHoZeDZPz3RH7HltlrpEpzibL2XDkjM",
  authDomain: "climate-change-828c5.firebaseapp.com",
  databaseURL: "https://climate-change-828c5-default-rtdb.firebaseio.com",
  projectId: "climate-change-828c5",
  storageBucket: "climate-change-828c5.appspot.com",
  messagingSenderId: "386635839947",
  appId: "1:386635839947:web:16a23ec083fbce98ac5e4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const themeButton = document.getElementById("theme-button");
const signNowButton = document.getElementById('sign-now-button');
var signatures = [];

let scaleFactor = 1;
const modalImage = document.querySelector('#thanks-modal img');

 function generateUUID() {
  let uuid = '', randomValue;
  for (let i = 0; i < 32; i++) {
      randomValue = Math.random() * 16 | 0;

      // Insert hyphens according to UUID format (8-4-4-4-12)
      if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
  }
  return uuid;
};
 
function insertData(person) {
  var id = generateUUID();
  set(ref(db, "Users/" + id), {
    Name: person.name,
    ID: id,
    Hometown: person.hometown,
    Email: person.email,
    Signature: person.signature,
    Timestamp: Date.now()

  } )
  .then(()=>{
    alert("Data added successfully!")
  })
  .catch((error)=>{
    alert(error)
  });
};


const getData = async () => {
  const databaseRef = ref(getDatabase());
  try {
    const snapshot = await get(child(databaseRef, 'Users/')) 
    if (snapshot.exists()) {
      const users = snapshot.val();
      const sortedKeys = Object.keys(users).sort((a, b) => users[b].Timestamp - users[a].Timestamp); // Sort keys by timestamp in descending order
      signatures = [];
      // Iterate over the first 3 keys (most recent entries)
      for (let i = 0; i < 3 && i < sortedKeys.length; i++) {
        const key = sortedKeys[i];
        signatures.push(users[key].Signature);
      }
      console.log("Updated signatures array:", signatures);
      return signatures
    } else {
      console.log("No data available");
      return []
    }
  } catch(error) {
    console.error(error);
    return [];
  };
};


const getTotalUsers = async () => {
  const databaseRef = ref(getDatabase());
  try {
    const snapshot = await get(child(databaseRef, 'Users/'));
    if (snapshot.exists()) {
      const users = snapshot.val();
      const userCount = Object.keys(users).length;
      console.log("Total number of users:", userCount);
      return userCount;
    } else {
      console.log("No data available");
      return 0;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
};



//Function to change to dark mode
const toggleDarkMode = () => {
  // Write your code to manipulate the DOM here
  document.body.classList.toggle("dark-mode");
};

// Animation configuration for revealing when scrolling
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

// Function to scale the image for modal
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

const validateForm = () => {
  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;

  if(petitionInputs[0].value && petitionInputs[1].value && petitionInputs[2].value ){
    let person = {
      name: petitionInputs[0].value,
      hometown: petitionInputs[1].value,
      email: petitionInputs[2].value,
      signature: "🖊️ " + petitionInputs[0].value + " from " + petitionInputs[1].value + " supports this!"
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
      insertData(person);
      toggleModal(person);
      //Update Peptition Data
      (async () => {
        const signatures = await getData();
        displaySignature(signatures);
        displayTotalCount();
    })();
    }
  } else {
    alert("Please Fill All Input Fields!")
  }
};

// Function to display signature on site
const displaySignature = (signatures) => {
  console.log("Signatures array in displaySignatures:", signatures);
  const signaturesSection = document.querySelector('.signatures');
  signaturesSection.innerHTML = ''; // Clear previous content
  signatures.forEach((signatureText) => {
    const signatureParagraph = document.createElement('p');
    signatureParagraph.textContent = signatureText;
    signaturesSection.appendChild(signatureParagraph);
  });




  // // Remove the old counter
  // const oldCounter = document.getElementById('counter');
  // oldCounter.remove();

  // // Increase the count variable
  // count = count + 1;

  // // Create a new counter HTML p tag
  // const counterElement = document.createElement('p');
  // // Set the id to "counter" for future reference
  // counterElement.id = 'counter';
  // // Set the text content for the new counter
  // counterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  // // Append the new counter to the signatures div
  // signaturesSection.appendChild(counterElement);

  // // Call toggleModal function after adding the signature
};


const displayTotalCount = () => {
  const counter = document.getElementById('counter');
  (async () => {
    try{
      const totalUsers = await getTotalUsers();
      counter.innerText = 'There are ' + totalUsers +  ' total signatures recorded!'
  } catch (error) {
      console.error("Error fetching total users:", error);
      counter.innerText = "Failed to fetch user count.";
  }
  })();
};




//Loading Initial Peptition Data
(async () => {
    const signatures = await getData();
    displaySignature(signatures);
    displayTotalCount();
})();



// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);

signNowButton.addEventListener('click', validateForm);

window.addEventListener('scroll', reveal);


