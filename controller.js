//Declaring an empty array
var users = [];
//Setting id for each users
var idInput = makeCounter();
//Fetching data from textboxes in register.html
var firstnameInput	= document.getElementById("firstname");
var lastnameInput 	= document.getElementById("lastname");
var emailInput 		= document.getElementById("email");
var usernameInput   = document.getElementById("username");
var passwordInput 	= document.getElementById("password");
var messageBox 		= document.getElementById("editeddata");

//Declaring custom constructor function
function userdetails(id, firstname, lastname, email, username, password){
	this.id			= id;
	this.firstname	= firstname;
	this.lastname	= lastname;
	this.email		= email;
	this.username	= username;
	this.password	=password;
	this.FullName	=this.firstname +' ' + this.lastname;
}

//counter funtion, to fetch user id
function makeCounter() {
	var arraylength=users.length;
	return function(){
		return arraylength+1;
	}
}

//insert data while registration
function insert()
{
	//Email validation
	var emailinput = document.forms["myform"]["email"].value;
    var atpos = emailinput.indexOf("@");
    var dotpos = emailinput.lastIndexOf(".");
    if(atpos<1 || dotpos<atpos+2 || dotpos+2>=emailinput.length)
	{
        alert("Not a valid e-mail address");
        
    }
	var usernameinput = document.forms["myform"]["username"].value;
	var passwordinput = document.forms["myform"]["password"].value;
	var ulen= users.length;
	for(i=0; i < ulen; i++)
	{
		if ( usernameinput == users[i].username && passwordinput == users[i].password)
		{
			alert("User already exists");
			return false;
		}
	}
	var user=new userdetails(idInput(),firstnameInput.value, lastnameInput.value, emailInput.value, usernameInput.value, passwordInput.value);
	users.push(user);
	alert("Registered successfully");
	localStorage.setItem("key_users", JSON.stringify(users));
	
	// Clear the fields after registration
	firstnameInput.value	= "";
	lastnameInput.value 	= "";
	emailInput.value 		= "";
	usernameInput.value 	= "";
	passwordInput.value 	= "";
}

//Storing data from local storage into an array of objects
var usersdata = JSON.parse( localStorage.getItem('key_users' ) );

//validation for login
function validate()
{
	usersdata = JSON.parse( localStorage.getItem('key_users' ) );
	var usernameinput   = document.getElementById("username");
	var passwordinput 	= document.getElementById("password");
	for(var p in usersdata)
	{
	  //console.log(p+':'+usersdata[p].username+'|'+usersdata[p].email);
	  if(usernameinput.value==usersdata[p].username && passwordinput.value==usersdata[p].password)
	  {
		//setting flag for user, once logged in
		localStorage.setItem('flag','loggedIn');
		alert("Logged in successfully");
	  }
	}
}

//Resets the flag, once user is logged out
function logout()
{
	localStorage.removeItem('flag');
}


//To authenticate user, for editing
function authenticateuser(){
usersdata = JSON.parse( localStorage.getItem('key_users' ) );
var usernameinput = document.forms["authenticate"]["username"].value;
var userlen= usersdata.length;
var i;
for(i=0; i < userlen; i++)
{
		if ( usernameinput == usersdata[i].username){
			alert("User authenticated");
			
			document.getElementById("firstname").value=usersdata[i].firstname;
			document.getElementById("lastname").value=usersdata[i].lastname;
			document.getElementById("email").value=usersdata[i].email;
			document.getElementById("password").value=usersdata[i].password; 
			return;
		}
	}
}

//For updating/editing user details
function updateuser()
{
usersdata = JSON.parse( localStorage.getItem('key_users' ) );
var usernameinput = document.forms["authenticate"]["username"].value;
var firstnameinput = document.getElementById("firstname").value;
var lastnameinput = document.getElementById("lastname").value;
var emailinput = document.getElementById("email").value;
var passwordinput = document.getElementById("password").value;
var userlen= usersdata.length;
var i;
for(i=0; i < userlen; i++)
{
	if ( usernameinput == usersdata[i].username)
	{
		if(firstnameinput=="" || lastnameinput=="" || emailinput=="" || passwordinput=="")
		{
			alert("Fields cannot be empty");
			return;
		}
		usersdata[i].firstname	=document.getElementById("firstname").value;
		usersdata[i].lastname	=document.getElementById("lastname").value;
		usersdata[i].email		=document.getElementById("email").value;
		usersdata[i].password	=document.getElementById("password").value;
		localStorage.setItem("key_users", JSON.stringify(usersdata));
	}
	//To clear the text fields in edit form
	document.getElementById("firstname").value	="";
	document.getElementById("lastname").value	="";
	document.getElementById("email").value		="";
	document.getElementById("password").value	=""; 
	
	//To display the updated details once data has been edited
	messageBox.innerHTML  = "<b>Hello, ' " +usersdata[i].username+ "'  here are your updated details: <b>" + "</br>";
	messageBox.innerHTML += "<b>FirstName:</b> " + usersdata[i].firstname + "<br/>";
	messageBox.innerHTML += "<b>Last Name:</b> " + usersdata[i].lastname + "<br/>";
	messageBox.innerHTML += "<b>EmailId:</b> " + usersdata[i].email + "<br/>";
}
}


