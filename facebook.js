function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //testAPI();
      var accessToken = response.authResponse.accessToken;
      alert("LOGIN SUCESSFUL")
      $('#fbook_button').hide()
      FB.api('/me/?fields=friends', function(response) {
        console.log(response + " "+ response.friends + " " + response.friends.summary.total_count);
        for(key in response) {
            console.log(key)
            if(response.hasOwnProperty(key)) {
                var value = response[key];
                //do something with value;
            }
        }
        });
      //window.location="http://localhost:8080/test.html"
    } else {
        console.log("not logged in")
      FB.login()
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
        appId            : '146663292812154',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.12'
      });

      FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
      });
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

     function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }


     function logout()
    {
    FB.logout(function(response) {
      $('#fbook_button').show()
     });
    }