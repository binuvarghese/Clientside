//form validation code taken from http://webcheatsheet.com/javascript/form_validation.php -- retrieved: 5/12/2012

function validateFormOnSubmit(theForm) {
var reason = "";

  reason += validateUsername(theForm.username);
  reason += validateEmail(theForm.email);
  reason += validatePhone(theForm.phone);
       
  if (reason != "") {
    alert("Some fields need correction:\n" + reason);
    return false;
  }

  return true;
  
}

function validateEmpty(fld) {
    var error = "";
  
    if (fld.value.length == 0) {
        fld.style.background = 'Yellow'; 
        error = "The required field has not been filled in.\n"
    } 
    else {
        fld.style.background = 'White';
    }
    return error;   
}

function validateUsername(fld) {
    var error = "";
    var illegalChars = /^[a-zA-Z]+$/; // allow letters, numbers, and underscores
 
    if (fld.value == "") {
        fld.style.background = 'red'; 
        error = "You didn't enter a Full Name.\n";
    } 
    else if ((fld.value.length < 5) || (fld.value.length > 25)) {
        fld.style.background = 'Yellow'; 
        error = "The Full name is the wrong length.\n";
    } 
    else if (illegalChars.test(fld.value)) {
        fld.style.background = 'Yellow'; 
        error = "The Full name contains illegal characters.\n";
    } 
    else {
        fld.style.background = 'White';
    } 
    return error;
}

function trim(s)
{
  return s.replace(/^\s+|\s+$/, '');
} 

function validateEmail(fld) {
    var error="";
    var tfld = trim(fld.value);                        // value of field with whitespace trimmed off
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/ ;
    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
    
    if (fld.value == "") {
        fld.style.background = 'Yellow';
        error = "You didn't enter an email address.\n";
    } 
    else if (!emailFilter.test(tfld)) {              //test email for illegal characters
        fld.style.background = 'Yellow';
        error = "Please enter a valid email address.\n";
    } 
    else if (fld.value.match(illegalChars)) {
        fld.style.background = 'Yellow';
        error = "The email address contains illegal characters.\n";
    } 
    else {
        fld.style.background = 'White';
    }
    return error;
}

function validatePhone(fld) {
    var error = "";
    var stripped = fld.value.replace(/[\(\)\.\-\ ]/g, '');     

   if (fld.value == "") {
        error = "You didn't enter a phone number.\n";
        fld.style.background = 'Yellow';
    } 
    else if (isNaN(parseInt(stripped))) {
        error = "The phone number must be entered or numeric value.\n";
        fld.style.background = 'Yellow';
    } 
    else if (!(stripped.length == 10)) {
        error = "The phone number is the wrong length. Make sure have entered all digit.\n";
        fld.style.background = 'Yellow';
    } 
    else {
        fld.style.background = 'White';
    }
    return error;
}




/* Reference: http://www.alistapart.com/articles/alternate/
   Retrieved: December 18th, 2010. Frank class */
   
var defaultStyleLink, alterStyleLink;

defaultStyleLink = document.getElementById("default");
alterStyleLink = document.getElementById("alter");

function setActiveStyleSheet ( styleId ) {

  var i = 0;
  var linkItem, linkArray;
  
  linkArray = document.getElementsByTagName( "link" );
  
  for ( i = 0; i < linkArray.length; i++ ) {
    
    linkItem = linkArray[i];
      
    if ( linkItem.getAttribute( "rel" ).indexOf( "style" ) != -1 && 
        linkItem.getAttribute( "title" ) ) {
        linkItem.disabled = true;
        
      if ( linkItem.getAttribute( "title" ) === styleId ) {
        linkItem.disabled = false;
      }
    }
  }
}

function getActiveStyleSheet () {

  var i = 0;
  var linkItem, linkArray;

  linkArray = document.getElementsByTagName( "link" );

  for ( i = 0; i < linkArray.length; i++ ){
    linkItem = linkArray[i];

    if ( linkItem.getAttribute( "rel" ).indexOf( "style" ) != -1 && 
      linkItem.getAttribute( "title" ) && !linkItem.disabled ) {
      return linkItem.getAttribute( "title" );
    }
  }
  return null;

}
  
  function createCookie( name,value,days){

    if(days) {
      var date = new Date();
      date.setTime ( date.getTime() + ( days*24*60*60*1000 ) );
      var expires = "; expires=" + date.toGMTString();
    }
    else{
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";   
  }  
  
  function readCookie ( name ){

    var nameEquals = name + "=";
    var cookieArray = document.cookie.split ( ';' );

    for ( var i=0; i < cookieArray.length; i++ ){
      var c = cookieArray[i];
      while ( c.charAt ( 0 ) == ' ' ){
        c = c.substring ( 1, c.length );
      }
      if ( c.indexOf ( nameEquals ) == 0 ){
        return c.substring ( nameEquals.length, c.length );
      }
    }
    return null;
  }

defaultStyleLink.onclick = function() {
  setActiveStyleSheet( this.id );
};

alterStyleLink.onclick = function() {
  setActiveStyleSheet( this.id );
};

window.onload = function() {
  var cookie = readCookie ( "style" );
  var title;
 
  if ( cookie ) {
      title = cookie;
      setActiveStyleSheet ( title );
  }
};

window.onunload = function() {
  var title = getActiveStyleSheet();
  createCookie( "style", title, 30 );
};

//http://www.javascriptsource.com/cookies/cookie-enabled.html
if (navigator.cookieEnabled == 0) {
  alert("You need to enable cookies for this site to load properly!");
}
