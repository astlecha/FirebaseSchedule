// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD9dbd-m0gfy3Eyi5v0MtyYB7zsihXlox8",
    authDomain: "train-schedule-6f8e4.firebaseapp.com",
    databaseURL: "https://train-schedule-6f8e4.firebaseio.com",
    projectId: "train-schedule-6f8e4",
    storageBucket: "train-schedule-6f8e4.appspot.com",
    messagingSenderId: "936118382220"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = '';
  var destination = '';
  var trainTime = '';
  var frequency = '';


$('#submit-button').on('click', function(event){
  	event.preventDefault();

  	trainName = $('#form-train-name').val().trim();
  	destination = $('#form-destination').val().trim();
  	trainTime = $('#form-train-time').val().trim();
  	frequency = $('#form-frequency').val().trim();

    var newTrainData = {
      name: trainName,
      dest: destination,
      time: trainTime,
      freq: frequency
    };
  	
    //Pushes new data to firebase
    database.ref().push(newTrainData);

    //Log new data
    console.log(newTrainData.name);
    console.log(newTrainData.dest);
    console.log(newTrainData.time);
    console.log(newTrainData.freq);

    //Clear text entry boxes
    $('#form-train-name').val("");
    $('#form-destination').val("");
    $('#form-train-time').val("");
    $('#form-frequency').val("");

  });


database.ref().on('child_added', function(snapshot, prevChildKey) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().time);
    console.log(snapshot.val().freq);

    var trainName = snapshot.val().name;
    var destination = snapshot.val().dest;
    var frequency = snapshot.val().freq;


//=========================Minute Conversion===============================

//Accounts for weird time overlap, sends date back one year
var timeConvert = moment(time, 'hh:mm').subtract(1, year);
  console.log(timeConvert);

var currentTime = moment();

//Turns converted first train time into minutes
var minTime = moment().diff(moment(timeConvert), 'minutes');
  console.log(minTime);

//Gets minute remainder to distinguish mins until next train
var tRemainder = minTime%freq;
  console.log(tRemainder);


    var minutesAway = freq - tRemainder;
    var nextArrival = moment().add(minutesAway, 'minutes');


      //append a tr, th, and td for each snapshot.val
      $('#table > tbody').append('<tr><td>'+trainName+'</td><td>'+destination+'</td><td>'
        +frequency+'</td><td>'+nextArrival+'</td><td>'+minutesAway+'</td></tr>');
});

