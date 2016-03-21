function surligne(champ, erreur)
{
   if(erreur)
      champ.style.backgroundColor = "#fba";
   else
      champ.style.backgroundColor = "";
}
function verifPseudo(champ)
{
   if(champ.value.length < 2 || champ.value.length > 25)
   {
	 if(champ.style.backgroundColor !="rgb(255, 187, 170)"){
		err++;
		console.log(err);
	  }
      surligne(champ, true);
      document.getElementById("PseudoMess").innerHTML ='Your pseudo must contain between 2 and 25 characters!'

      return false;
   }
   else
   {
	  if(champ.style.backgroundColor !=""){
		err--;
		console.log(err);
	  }
      surligne(champ, false);
      document.getElementById("PseudoMess").innerHTML =''
      return true;
   }
}

function verifMail(champ)
{
   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
   if(!regex.test(champ.value))
   {
	   
	 if(champ.style.backgroundColor !="rgb(255, 187, 170)"){
		err++;
		console.log(champ.style.backgroundColor);
		console.log(err);
	  }
      surligne(champ, true);
      document.getElementById("MailMess").innerHTML =' This is not a valid e-mail! '
      return false;
   }
   else
   {
	  if(champ.style.backgroundColor !=""){
	  err--;
	  		console.log(err);
	  }
      surligne(champ, false);

      document.getElementById("MailMess").innerHTML =''
      return true;
   }
}

function verifYear(champ)
{
   var age = parseInt(champ.value);
   if(isNaN(age) || age < 1918|| age > 1997)
   {
	  if(champ.style.backgroundColor !="rgb(255, 187, 170)"){
		err++;
				console.log(err);
	  }
      surligne(champ, true);
      document.getElementById("AgeMess").innerHTML ='ShowBook is only for people between 18 and 97 years old :/'
      return false;
   }
   else
   {
	  if(champ.style.backgroundColor !=""){
		err--;
				console.log(err);
	  }
      surligne(champ, false);
      document.getElementById("AgeMess").innerHTML =''

      return true;
   }
}

function verifNum(champ){
	var phoneno = /^\d{10}$/;  
    if(champ.value.match(phoneno)) {
	  if(champ.style.backgroundColor !=""){
		err--;
				console.log(err);
	  }
      surligne(champ, false);
      document.getElementById("TelMess").innerHTML =''
      return true;
	}else{
	  if(champ.style.backgroundColor !="rgb(255, 187, 170)"){
		err++;
				console.log(err);
	  }
	  surligne(champ, true);
      document.getElementById("TelMess").innerHTML ='Phone number is not valid'
      return false;
  }
}


