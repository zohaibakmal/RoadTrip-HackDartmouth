/**
 * Created by Zohaib on 4/11/2015.
 */



function doIt(lat_a, lng_a) { 
    var output = $.ajax({
    url: 'https://zilyo.p.mashape.com/search', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {latitude: lat_a,
           longitude: lng_a}, // Additional parameters here
    datatype: 'json',
    complete: function(data) {
      //
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        //console.log(JSON.stringify(data));
        response = JSON.parse(data.responseText);
       
        for (var i = 0; i < response.result.length; i++) 
        { 
        console.log(JSON.stringify(response.result[i].price.nightly));
        console.log(JSON.stringify(response.result[i].photos[0].small));
        console.log(JSON.stringify(response.result[i].latLng));
        console.log("JSON Parsing done");
        }
        //document.getElementById("output").innerHTML = data.location;
        setAirBnbMarkers(response); 
    },
    error: function(err) {  },//console.log(JSON.stringify(err)); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "Qg4NTnQp6dmshgYVIsWqQU3yx1P9p1UjItpjsnqaW6OwlU0auu"); // Enter here your Mashape key
    }
}); 

}


    function switchCSS(){
      var background_div = document.getElementById("background-div");
      background_div.className += " blur-class";
      var content_div = document.getElementById("content");
      content_div.style.display = "";
      content_div.className += " content";
    }

    function fadeBackground(){
     setTimeout(function () {switchCSS()}, 1000);
    }

  

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '800406326695421',
      xfbml      : true,
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "http://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        console.log("FB login successful");
        testAPI();
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }


    window.fbAsyncInit = function() {
    FB.init({
      appId      : '800406326695421',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.2' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

    };

    function login(){
       FB.login(function(response) {
        if (response.status === 'connected') {
          console.log("Logged In!")
          statusChangeCallback(response);
        } else if (response.status === 'not_authorized') {
          console.log("Not Authorized")
        } else {
          console.log("Not logged into FB");
        }
      }, {scope: 'public_profile,email,user_friends'});
    }

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
          startApp();
      });
    }


    var results = [];
    console.log("hello world 0");

    function getIcon(id, user_obj){        
        FB.api(id+"/picture?redirect=false", function(response, user_obj){
          console.log("/" + id + "/picture: " + JSON.stringify(user_obj));
          if (response && !response.error && ('url' in response)) { 
             console.log(response.url);
             user_obj.icon = response.url;
          } else {
            console.log("couldnt get icon");
          }
        });
    }

    function getInfo(id){
      var graph_call = "/" + id + "/";
      FB.api(graph_call, function(response) {
        if (response && !response.error) { 
          if (('location' in response) && ('name' in response)){
            var temp = {
              id: id,
              name:response.name,
              location: response.location.name,
              // icon: "http://ayan-test.com:2020/images/default.gif"
              icon: "http://graph.facebook.com/" + id + "/picture?type=normal"
            }
            // getIcon(id, temp);
            results.push(temp);
          } else {
            console.log("No Location found for " + response.name);
          }
        } else {
          console.log("Error in response");
        }   
      });
    }

    function startApp(){
      var fb_login_button = document.getElementById("fb-login-button");
      //fb_login_button.onclick = null;
      //fb_login_button.className += " fade-class";

      FB.api("/me/permissions", function (response) {
            if (response && !response.error && response.hasOwnProperty('location')) {
              console.log("permissions: " + JSON.stringify(response)); 
            } else {
              console.log("error getting permissions");
            }
          }
      );

      FB.api("/me/friends", function (response) {
            if (response && !response.error) {
              var results = response.data.length;
              for (var i = 0; i < results; i++){
                getInfo(response.data[i].id);
              }
            } else {
              console.log("error getting friends");
            }
          }
      );

      setTimeout(function () {printResults()}, 2000);
    }

    function printResults() {
       for (var i = 0; i < results.length; i++){
          console.log(results[i].name + " -- " + results[i].location + " " + results[i].icon);
       }
    }


//Map Code

    fadeBackground();
    var geocoder;
    var directionsService;
    var directionsDisplay;

    var latitude_1;  //Source lat
    var longitude_1; //Source long
    var latitude;   //Dest lat
    var longitude;  //Dest long

    var pin_lat;    //fb friend pins lat
    var pin_lng;    //fb friend pins long

    var place_other; //source
    var place;      //dest

    var counter = 0;

    function closeMap(){
    //change input fields css
    document.getElementById("map-container").style.display="block"
    document.getElementById("map-container").className = "map-container";
    document.getElementById("input-container-id").className = "input-containter";
    document.getElementById("saveForm").className = "submit-button";
    var input_box_1 = document.getElementById("pac-input").className = "input-box";
    var input_box_2 = document.getElementById("pac-input-1").className = "input-box";
    var main_container = document.getElementById("main-id").className = "main";
    /*var fb_login_button = document.getElementById("fb-login-button");
     if (fb_login_button != null) fb_login_button.remove();
     plotMarker(place, map, marker, infowindow, 0);
     plotMarker(place_other, map, marker, infowindow, 1);
     calcRoute(latitude, longitude);*/
}


function submitAndSearch(){
    var from = document.getElementById("pac-input").value;
    var to = document.getElementById("pac-input-1").value;
    if (from == "" || to == ""){
      return;
    }

    if (place && place_other)
    {
      //change input fields css
      document.getElementById("map-container").className = "map-container-2";
      document.getElementById("input-container-id").className = "input-containter-2";
      var input_box_1 = document.getElementById("pac-input").className = "input-box-2";
      var input_box_2 = document.getElementById("pac-input-1").className = "input-box-2";
      var main_container = document.getElementById("main-id").className = "main-2";
      var fb_login_button = document.getElementById("fb-login-button");
      if (fb_login_button != null) fb_login_button.remove();
      

      plotMarker(place, map, marker, infowindow, 0);
      plotMarker(place_other, map, marker, infowindow, 1);
      calcRoute(latitude, longitude);
      setFriendMarkers(map, results);
      doIt(31.968599, -99.901813);
      
      
    }
}

function initialize() {

  var rendererOptions = {
  draggable: true
  };

  geocoder = new google.maps.Geocoder();
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

  //CustomMarker.prototype = new google.maps.OverlayView();


  var mapOptions = {
    center: new google.maps.LatLng(37.7833, 122.4167),
    zoom: 13
  };
  
  
  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  directionsDisplay.setMap(map);

  


  //Google places auto complete search box starts here
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

  var other = document.getElementById('pac-input-1');
  var other_autocomplete = new google.maps.places.Autocomplete(other);

  var types = document.getElementById('type-selector');
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  infowindow = new google.maps.InfoWindow();
  marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });


///////

google.maps.event.addListener(other_autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    place_other = other_autocomplete.getPlace();
    if (!place_other.geometry) {
      return;
    }
});


/////
  google.maps.event.addListener(autocomplete, 'place_changed', function() {

    if (place_other)
      plotMarker(place_other, map, marker, infowindow);

    infowindow.close();
    marker.setVisible(false);
    place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    // If the place has a geometry, then present it on a map.
   //  if (place.geometry.viewport) {
   //    map.fitBounds(place.geometry.viewport);
   //  } else {
   //    map.setCenter(place.geometry.location);
   //    map.setZoom(17);  // Why 17? Because it looks good.
   //  }
   //  marker.setIcon(/** @type {google.maps.Icon} */({
   //    url: place.icon,
   //    size: new google.maps.Size(71, 71),
   //    origin: new google.maps.Point(0, 0),
   //    anchor: new google.maps.Point(17, 34),
   //    scaledSize: new google.maps.Size(35, 35)
   //  }));
   //  marker.setPosition(place.geometry.location);
   // console.log(place.geometry.location);
   //  marker.setVisible(true);
   //  latitude = place.geometry.location.lat();
   //  longitude = place.geometry.location.lng(); 

   //  var address = '';
   //  if (place.address_components) {
   //    address = [
   //      (place.address_components[0] && place.address_components[0].short_name || ''),
   //      (place.address_components[1] && place.address_components[1].short_name || ''),
   //      (place.address_components[2] && place.address_components[2].short_name || '')
   //    ].join(' ');
   //  }

   //  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
   //  infowindow.open(map, marker);

  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    if (radioButton){
    google.maps.event.addDomListener(radioButton, 'click', function() {
      autocomplete.setTypes(types);
    });
  }
}

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);


  
  google.maps.event.addDomListener(window, 'load', initialize);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCYbaBKD5Bd7lzzyzHVCd-nhM02I45uy8o&signed_in=true&libraries=places' +
      '&callback=initialize';
  document.body.appendChild(script);
}

// Adding marker code here



//Calculating route
function calcRoute(pos1, pos2) {

  var flightPlanCoordinates = [
    new google.maps.LatLng(pos1, pos2),
    new google.maps.LatLng(latitude_1, longitude_1)
  ];

  flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  //flightPath.setMap(map);

  var start = pos1;
  var request = {
      origin: new google.maps.LatLng(pos1, pos2),
      destination:new google.maps.LatLng(latitude_1, longitude_1),
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  console.log(request);
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
       console.log("here");
    }
  });
}

//GeoCoding
function codeAddress(address) {
    console.log("Entered geocode addressing")
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         loc = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
        pin_lat = results[0].geometry.location.lat();
        pin_lng = results[0].geometry.location.lat();
        console.log(JSON.stringify(loc));
        return loc;
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

function plotMarker(place, map, marker, infowindow, flag)
{
  if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
   //console.log(place.geometry.location);
    marker.setVisible(true);
    if (flag) {
    latitude_1 = place.geometry.location.lat();
    longitude_1 = place.geometry.location.lng(); 
    }
    else
    {
       latitude = place.geometry.location.lat();
       longitude = place.geometry.location.lng(); 
    }

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
}


function setFriendMarkers(map, results) {
  for (var index = 0; index < results.length; index++){
    pin_lat = 0;
    pin_lng = 0;
    address = 'Hanover, NH'
      
    var image = {
      url: results[index].icon,
      // This marker is 20 pixels wide by 32 pixels tall.
      size: new google.maps.Size(50, 37),
      // The origin for this image is 0,0.
      origin: new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon.
    // The type defines an HTML &lt;area&gt; element 'poly' which
    // traces out a polygon as a series of X,Y points. The final
    // coordinate closes the poly by connecting to the first
    // coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18 , 1],
        type: 'poly'
    };
    plotPerson(results[index], image, shape);

  }
} 

function plotPerson(person, image, shape){
      var name = person.name;
      geocoder.geocode( { 'address': person.location}, function(res, status) {
      
      if (status == google.maps.GeocoderStatus.OK) {
        pin_lat = 0;
        pin_lng = 0;

        pin_lat = res[0].geometry.location.lat();
        pin_lng = res[0].geometry.location.lng();
        
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
        console.log('name: '+name);
        var myLatLng = new google.maps.LatLng(pin_lat, pin_lng);
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: image,
          shape: shape,
          title: name //,
          //zIndex: beach[3]
        });

          // Marker description
        var contentString = '';
        console.log("check blocking");
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        }); //end of mark description

    
        google.maps.event.addListener(marker, 'click', function() 
        {
          infowindow.open(map,marker);
        });

    }); //end of geoCode
}

var seq_id = 0;

function setAirBnbMarkers(airloc) {
  for (var index = 0; index < airloc.result.length; index++){

        console.log("We are in AirBNB")
        path = flightPath.getPath();
        console.log(path.getArray().toString());
        var name = JSON.stringify(airloc.result[index].price.nightly);
        var picture = JSON.stringify(airloc.result[index].photos[0].small);
        var alat = airloc.result[index].latLng[0];
        var alng = airloc.result[index].latLng[1];

        pic = picture.substring(1, picture.length - 1);
        console.log(pic);

    var image = {
      url: pic,
      // This marker is 20 pixels wide by 32 pixels tall.
      size: new google.maps.Size(35, 35),
      // The origin for this image is 0,0.
      origin: new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      anchor: new google.maps.Point(0, 32)
    };

    console.log(image.url);
    // Shapes define the clickable region of the icon.
    // The type defines an HTML &lt;area&gt; element 'poly' which
    // traces out a polygon as a series of X,Y points. The final
    // coordinate closes the poly by connecting to the first
    // coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18 , 1],
        type: 'poly'
    };
    seq_id++;
    plotAirBnbMarkers(name, alat, alng, image, shape);

  }
} 

function plotAirBnbMarkers(name, lat_1, lng_1, image, shape)
{
        console.log("We are in AirBNB plotter")
        console.log(name);
        console.log(lat_1);
        console.log(lng_1);

    var myLatLng = new google.maps.LatLng(lat_1, lng_1);

    // overlay = new CustomMarker(
    //   myLatLng,
    //   map,
    //   {
    //     marker_id: seq_id
    //   },
    //   image.url,
    //   Math.floor(Math.random()*(6)) +0
    //   );

    var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: image,
          shape: shape,
          title: name //,
          //zIndex: beach[3]
        });

          // Marker description
        var contentString = '<b>AirBnb</b>';
        console.log("check blocking");
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        }); //end of mark description

    
        google.maps.event.addListener(marker, 'click', function() 
        {
          infowindow.open(map,marker);
        });
    
}

window.onload = loadScript;