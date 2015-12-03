console.log("HELLO FROM THE JAVASCRIPT CONSOLE!");

$.ajax({
  type: 'GET',
  url: "http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=2de143494c0b295cca9337e1e96b00e0",
  success: function(data) {
    console.log("We have your weather!");
    console.log(data.weather);
  },
  error: function() {
    console.error("An error occured.");
  },
});

console.log("this is after the ajax request");
