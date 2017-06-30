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
    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().time);
    console.log(snapshot.val().freq);

    var trainName = snapshot.val().name;
    var destination = snapshot.val().dest;
    var frequency = snapshot.val().freq;
    var trainTime = snapshot.val().time;


    console.log('train time: '+trainTime);



//=========================Minute Conversion===============================

//Accounts for weird time overlap, sends date back one year
var timeConvert = moment(trainTime, "hh:mm").subtract(1, "years");
  // console.log(timeConvert);

var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//Turns converted first train time into minutes
var minTime = moment().diff(moment(timeConvert), "minutes");

//Gets minute remainder to distinguish mins until next train
var tRemainder = minTime%frequency;
  // console.log(tRemainder);


    var minutesAway = frequency - tRemainder;
    // console.log("mins away: "+minutesAway);
    var nextArrivalMins = moment().add(minutesAway, 'minutes');
      console.log("ARRIVAL TIME: " + moment(nextArrivalMins).format("hh:mm"));

    var nextArrival = moment(nextArrivalMins).format("hh:mm");


      //append a tr, th, and td for each snapshot.val
      $('#table > tbody').append('<tr><td>'+trainName+'</td><td>'+destination+'</td><td>'
        +frequency+'</td><td>'+nextArrival+'</td><td>'+minutesAway+'</td></tr>');
});

