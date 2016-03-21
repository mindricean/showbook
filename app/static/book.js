function showDetails() {
	var a=localStorage.getItem("numShow");
	$.getJSON('/eventInfo/',{n: a}, function(data){
		console.log(data.name);
		console.log(data.c1);
		name=data.name;
		var pic=data.img;
		var date=data.date;
		var html3 ='<h2>'+name+'</h2><img src="'+pic+'" alt="Show" height="190" width="135"> <br><br><p>'+date +'- 22h</p>';
		var results3 = document.getElementById('evinfos');
		var desc='<p>'+data.desc+'</p>';
		var res3=document.getElementById('description');
		results3.innerHTML = html3;
		res3.innerHTML=desc;
		var nameSalle=data.nomSalle;
		var lien=data.link;
		var plan=data.plan;
		var idVen= '<p>Venue: <a href="'+lien+'">'+nameSalle+' </a> </p>'
		var res1=document.getElementById('idVenue');
		res1.innerHTML = idVen;
		var txtPlan='<img src="'+data.plan+'" class="img-responsive">';
		var res2=document.getElementById('plan');
		res2.innerHTML=txtPlan;
		console.log(data.c1);
		console.log(data.c2);
		console.log(data.nb2);
		var cat= '<select name="Category" id="catChoose"> <option value="'+data.c1+'">'+data.c1 +'</option>';
		if(data.c2!=null) {
			cat += '<option value="'+data.c2+'">'+data.c2+'</option>';
			if(data.c3!=null) {
				cat += '<option value="'+data.c3+'">'+data.c3+'</option>';
			}
		}
		cat+='</select>';
		var rescat=document.getElementById('cat');
		rescat.innerHTML =cat;
			
		console.log(data.nb2);
		var places = '<table class="table table-striped"><thead><tr><th>Category</th><th>Number of remaning places</th></tr></thead>';
		places += '<tbody>';
		console.log(data.c1);
		console.log(data.nb1);
		places += '<tr><td>'+data.c1+'</td><td align="center">'+data.nb1+'</td><tr>';
		if(data.c2!=null) {
			places += '<tr><td>'+data.c2+'</td><td align="center">'+data.nb2+'</td><tr>';
			if(data.c3!=null){
				places += '<tr><td>'+data.c3+'</td><td align="center">'+data.nb3+'</td><tr>';
			}
		}
		places += ' </tbody>'	
			
		var resplace=document.getElementById('place');
		resplace.innerHTML = places;
	});
}

function book() {
	var catChosen=$('#catChoose').val();
	var nbPlaces=$('#nbpl').val();
	var social=$('#soc').val();	  
	document.getElementById("result").innerHTML = 'Booking... Please Wait...';	  
	  $.ajax({
		type:"POST",
		url: "/book",        
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			Token: localStorage.getItem("token"),
			Pseudo: pseudo,
			Show:localStorage.getItem("numShow"),
			nbPlaces:nbPlaces,
			cat:catChosen, 
			social:social
		}),
		success: function(data){
			document.getElementById("result").innerHTML = data['result'];
			if (data['success']) { 
				console.log(data['token']);
				// Check browser support
				if (typeof(Storage) != "undefined") {
					// Store
					localStorage.setItem("token", data['token']);
					
				} else {
					document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
				}
				showDetails();
			} else {
				document.getElementById("result").innerHTML = data['result'];
			}	
		},
		error:function(){
			alert("une erreur est survenue");
		},
		default: function(){
			alert("défaut");
		}             
	});
} 
