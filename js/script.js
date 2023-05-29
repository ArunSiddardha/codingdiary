var currentdate = new Date();
var day=currentdate.getDay();

window.onload = function() {
    if(day==0) {
        document.getElementById("math_label").style.color = "black";
    } else {
       document.getElementById("dsa_label").style.color = "black";
       document.getElementById("dev_label").style.color = "black";
    }


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
    var progress_ref = database.ref('progress');

}

function track() {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var dateString = currentdate.toLocaleDateString('en-US', options);
    var taskDone = '';
    if(document.getElementById("dsa").checked) taskDone+="DSA "
    if(document.getElementById("dev").checked) taskDone+="Dev "
    if(document.getElementById("math").checked) taskDone+="Math "
    console.log(dateString, taskDone);
    progress_ref.child(dateString).set(taskDone);
    location.reload();
}
