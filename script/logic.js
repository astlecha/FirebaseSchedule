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

  database.ref().on('value', function(snapshot){


  	$('#submit-button').on('click', function(event){
  		event.preventDefault();

  		trainName = $('#form-train-name').val().trim();
  		destination = $('#form-destination').val().trim();
  		trainTime = $('#form-train-time').val().trim();
  		frequency = $('#form-frequency').val().trim();

  		database.ref().push({
  			trainName: trainName,
  			destination: destination,
  			trainTime: trainTime,
  			frequency: frequency
  		});



  	});
  })

