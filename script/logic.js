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
  // routeNumber = 2;


  	$('#submit-button').on('click', function(event){
  		event.preventDefault();

      // routeNumber++;

  		trainName = $('#form-train-name').val().trim();
  		destination = $('#form-destination').val().trim();
  		trainTime = $('#form-train-time').val().trim();
  		frequency = $('#form-frequency').val().trim();

      var newTrainData = {
        trainName: trainName,
          destination: destination,
          trainTime: trainTime,
          frequency: frequency
        };
    	
      //Pushes new data to firebase
      database.ref().push(newTrainData);

      //Clear text entry boxes
      $('#form-train-name').val('');
      $('#form-destination').val('');
      $('#form-train-time').val('');
      $('#form-frequency').val('');

      //Account for errors
    }, function(errorObject) {

      console.log('Errors handled: ' + errorObject.code);

      });


database.ref().on('child_added', function(snapshot, prevChildKey) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().frequency);

    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var trainTime = snapshot.val().trainTime;
    var frequency = snapshot.val().frequency;


      //append a tr, th, and td for each snapshot.val

      $('#table > tbody').append('<tr><td>'+routeNumber+'</td><td>'+trainName+'</td><td>'
        +destination+'</td><td>'+trainTime+'</td><td>'+frequency+'</td></tr>');
});