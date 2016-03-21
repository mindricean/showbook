
function LogOut(){
	localStorage.removeItem("token");
	document.location.href = "index.html";
}
