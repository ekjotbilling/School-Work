




var emailCounter=1;
const emailLimit=3;

function addEmail(){
	
	console.log("here");

	if(emailCounter==emailLimit){
		alert("Cannot add more emails, The limit is 3")
	}

	else{

		let entry = document.getElementById('emailTag');
		let div=document.createElement('div');
		
		
		let br=document.createElement('br')
		div.appendChild(br);

		let inp= document.createElement("INPUT");
		inp.setAttribute("type","email");
		let temp="email"+emailCounter;
		inp.setAttribute("name",temp)
		inp.required=true;
		
		// <input type="button" name="addEmailButton" value="+" onclick="addEmail();" >

		div.appendChild(inp)
		entry.appendChild(div);


		emailCounter++;
	}
	

}