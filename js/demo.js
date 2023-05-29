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
var settings = {};
var element = document.getElementById('caleandar');

progress_ref.on('value', snapshot => {
  var events=[];
  var taskArray = []
  snapshot.forEach(child => { 

    var new_event = {'Date': new Date(child.key), 'Title': child.val()};
    events.push(new_event);
    var tasks = child.val().split(" "); 
    tasks.forEach( function(task) {
        if(task=='') return;
        taskArray.push(task);
    });

  });
  caleandar(element, events, settings);
  var dsa=0, dev=0, math=0;
  taskArray.forEach( function(task) {
    if(task=='DSA') dsa++;
    if(task=='Dev') dev++;
    if(task=='Math') math++;
  });
  document.getElementById('dsa_days').innerHTML=dsa+' ';
  document.getElementById('dev_days').innerHTML=dev+' ';
  document.getElementById('math_days').innerHTML=math+' ';
});
/*
var events = [
  {'Date': new Date(2023, 4, 5), 'Title': 'Doctor appointment at 3:25pm.'},
  {'Date': new Date(2023, 4, 6), 'Title': 'New Garfield movie comes out!'},
  {'Date': new Date(2023, 4, 7), 'Title': '25 year anniversary'},
];*/

