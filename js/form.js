// Get the Topic select element
const topicSelect = document.getElementById('topic');
const typeSelect = document.getElementById('type');
// Get the New Topic input element
const newTopicInput = document.getElementById('newtopic');

// Get the Content select element
const contentSelect = document.getElementById('content');

// Get the Note input element
const noteInput = document.getElementById('note-input');

// Get the Link Name input element
const linkNameInput = document.getElementById('link-name');

// Get the Link Address input element
const linkAddressInput = document.getElementById('link-address');

var firebaseConfig = {
    apiKey: "AIzaSyBL2WY1nUZZoiiXZfhp70v1ls7ynSQL-30",
    authDomain: "learn-coding-prakhar.firebaseapp.com",
    projectId: "learn-coding-prakhar",
    storageBucket: "learn-coding-prakhar.appspot.com",
    messagingSenderId: "395317084623",
    appId: "1:395317084623:web:09b9ccb2067980ab8992ba",
    measurementId: "G-1S1XH9D4P1",
    databaseURL: "https://learn-coding-prakhar-default-rtdb.firebaseio.com",
  };
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();

  function updateTopicOptions(path) {
    // Clear the existing options
    while (topicSelect.firstChild) {
      topicSelect.removeChild(topicSelect.firstChild);
    }
  
    // Add the default "Add a new topic" option
    var defaultOption = document.createElement("option");
    defaultOption.value = "addnew";
    defaultOption.text = "Add a new topic";
    topicSelect.add(defaultOption);
  
    // Get the topics for the selected type
    var topicsRef;
    topicsRef = path=='math'? database.ref('math/'): database.ref(path+'/' + typeSelect.value);
    topicsRef.on('value', snapshot => {
      snapshot.forEach(child => {
        // Create the option element
        var option = document.createElement("option");
        option.value = child.key;
        option.text = child.key;
  
        // Add the option to the select element
        topicSelect.add(option);
      });
      $('.topic').niceSelect('update');
      // Call the selectTopic() function to show or hide the New Topic input element
      //selectTopic();
    });
  }
  

// Show or hide the New Topic input element depending on the Topic selection
function selectTopic() {
  if (topicSelect.value === 'addnew') {
    newTopicInput.style.display = 'block';
  } else {
    newTopicInput.style.display = 'none';
  }
}


// Show or hide the Note or Link input elements depending on the Content selection
function selectContent() {
  if (contentSelect.value === 'Notes') {
    document.getElementById('note').style.display = 'block';
    document.getElementById('link').style.display = 'none';
  } else if (contentSelect.value === 'Links') {
    document.getElementById('note').style.display = 'none';
    document.getElementById('link').style.display = 'block';
  }
}

  

// Submit the form
const form = document.querySelector('form');

function submitForm(event, path){
  event.preventDefault();
  const topicValue = topicSelect.value === 'addnew' ? newTopicInput.value : topicSelect.value;
  const contentValue = contentSelect.value;
  let inputValues;
  if (contentValue === 'Notes') {
    inputValues = noteInput.value;
  } else if (contentValue === 'Links') {
    inputValues = {'Name': linkNameInput.value, 'Link': linkAddressInput.value};
  }
  if(inputValues!='') {
  var db_ref = path=='math'? database.ref('math/'+topicValue+'/'+contentValue) : database.ref(path+'/'+typeSelect.value+'/'+topicValue+'/'+contentValue);
  var newKey = db_ref.push().key;
  var updates = {};
  updates['/' + newKey] = inputValues;
  db_ref.update(updates);
  location.reload();
  } else {
    alert('Please enter a note/link');
  }
  console.log(`Topic: ${topicValue}`);
  console.log(`Content: ${contentValue}`);
  console.log(`Input values: ${JSON.stringify(inputValues)}`);
}   