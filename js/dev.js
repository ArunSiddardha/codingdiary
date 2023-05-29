
const navLinks = document.querySelectorAll('nav a');
		const sections = document.querySelectorAll('section');

		// Set up click event listeners for nav links
		navLinks.forEach(link => {
			link.addEventListener('click', () => {
				// Remove active class from all nav links
				navLinks.forEach(link => link.classList.remove('active'));

				// Add active class to clicked nav link
				link.classList.add('active');

				// Hide all sections
				sections.forEach(section => section.style.display = 'none');

				// Show section with corresponding id
				const targetId = link.getAttribute('href').slice(1);
				const targetSection = document.getElementById(targetId);
				targetSection.style.display = 'block';
			});
		});

        function showSection(sectionId) {
           for(var i=1; i<=3; i++) {
            document.getElementById("section"+i).style.display = "none";
           }
           document.getElementById(sectionId).style.display = "block";
          }


// Create a function to generate the HTML for a section
function generateSectionHTML(sectionName, sectionData) {
    var sectionHTML = `
      <div class="section-header">${sectionName}</div>
      <div class="section-content">
      `;
      if(sectionData.Notes!=null)
        sectionHTML+= generateSubsectionHTML("Notes", sectionData.Notes);
      if(sectionData.Links!=null)
        sectionHTML+= generateSubsectionHTML("Links", sectionData.Links);
    sectionHTML+= ` 
      </div>
    `;
    return sectionHTML;
  }
  
  // Create a function to generate the HTML for a subsection
  function generateSubsectionHTML(subsectionName, subsectionData) {
    let subsectionHTML = "";
    if (Object.keys(subsectionData).length > 0) {
      subsectionHTML = `
        <div class="subsection-header">${subsectionName}</div>
        <div class="subsection-content">
      `;
      if(subsectionName=='Notes') {
      Object.keys(subsectionData).forEach(key => {
        subsectionHTML += `
          <p class="bullet">${subsectionData[key]}</p>
        `;
      });
      }
      if(subsectionName=='Links') {
        Object.keys(subsectionData).forEach(key => {
            subsectionHTML += `
          <a class="link" href="${subsectionData[key].Link}">${subsectionData[key].Name}</a>
        `;
        });  
      }
      subsectionHTML += `
        </div>
      `;
    }
    return subsectionHTML;
  }
  

/*Database Reading */
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
  var dsa_ref = database.ref('dev');

  dsa_ref.once('value', snapshot => {

    //directory containers for all 3 supersections
    const PythonDirectoryContainer = document.querySelector("#Python-directory-container");
    const MLDirectoryContainer = document.querySelector("#ML-directory-container");
    const WebDevDirectoryContainer = document.querySelector("#WebDev-directory-container");

    //DB Data
    var jsonData = snapshot.val();

 // Generate the HTML for the directory
 let PythondirectoryHTML = `
 <div class="directory">
`;
Object.keys(jsonData.Python).forEach(sectionName => {
 PythondirectoryHTML += generateSectionHTML(sectionName, jsonData.Python[sectionName]);
});

PythondirectoryHTML += `
 </div>
`;
// Add the HTML to the container element
PythonDirectoryContainer.innerHTML = PythondirectoryHTML;

// Generate the HTML for the directory
let MLdirectoryHTML = `
<div class="directory">
`;
Object.keys(jsonData.ML).forEach(sectionName => {
MLdirectoryHTML += generateSectionHTML(sectionName, jsonData.ML[sectionName]);
});

MLdirectoryHTML += `
</div>
`;
// Add the HTML to the container element
MLDirectoryContainer.innerHTML = MLdirectoryHTML

// Generate the HTML for the directory
let WebDevdirectoryHTML = `
<div class="directory">
`;
Object.keys(jsonData.WebDev).forEach(sectionName => {
WebDevdirectoryHTML += generateSectionHTML(sectionName, jsonData.WebDev[sectionName]);
});

WebDevdirectoryHTML += `
</div>
`;
// Add the HTML to the container element
WebDevDirectoryContainer.innerHTML = WebDevdirectoryHTML;

var sectionHeaders = document.querySelectorAll('.section-header');
// Add event listeners to each section header
sectionHeaders.forEach(function(sectionHeader) {
    // Toggle the section content when the section header is clicked
    sectionHeader.addEventListener('click', function() {
        this.classList.toggle('active');
        var sectionContent = this.nextElementSibling;
        if (sectionContent.style.display === 'block') {
            sectionContent.style.display = 'none';
        } else {
            sectionContent.style.display = 'block';
        }
    });

    // Get all the subsection headers inside this section
    var subsectionHeaders = sectionHeader.nextElementSibling.querySelectorAll('.subsection-header');

    // Add event listeners to each subsection header
    subsectionHeaders.forEach(function(subsectionHeader) {
        // Toggle the subsection content when the subsection header is clicked
        subsectionHeader.addEventListener('click', function() {
            this.classList.toggle('active');
            var subsectionContent = this.nextElementSibling;
            if (subsectionContent.style.display === 'block') {
                subsectionContent.style.display = 'none';
            } else {
                subsectionContent.style.display = 'block';
            }
        });
    });
});


  });