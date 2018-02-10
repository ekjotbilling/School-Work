
const n=20;

const input_arr_rows=["6,2,2","12,1","12","12","13","14","17","15,2","1,9,1","12","13","12,1","14,2","8,4,2","9,3,1,2","10,2,1,2","10,4","10,4","8,2","6"];
const input_arr_cols=["2,5","2,6","7,8","19","19","20","20","20","13,6","13,5","14,1","16","8,7","12","4,2,2","2,1,5","1,3","2,5","1,1,1,4","2,2"];

const solutionArr=[[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,true,true,true,true,true,true,false,false,true,true,false,false,false,false,false,true,true],[false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true],[false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false],[false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false],[false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],[false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false],[false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false],[false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,true,true,false],[false,true,false,false,true,true,true,true,true,true,true,true,true,false,true,false,false,false,false,false,false],[false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],[false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false],[false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true],[false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false,true,true],[false,true,true,true,true,true,true,true,true,false,true,true,true,true,false,true,true,false,false,false,false],[false,true,true,true,true,true,true,true,true,true,false,true,true,true,false,false,true,false,true,true,false],[false,true,true,true,true,true,true,true,true,true,true,false,true,true,false,false,true,false,true,true,false],[false,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true,true,true,true,false],[false,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,true,true,true,true,false],[false,false,false,true,true,true,true,true,true,true,true,false,false,false,false,false,false,true,true,false,false],[false,false,false,false,false,false,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false]];

initializeTable();
initializeHeadings();
checkSolved();

let arr=new Array(n+1);
for(let i=0;i<=n;i++){
	arr[i]=new Array(n+1);
	arr[i].fill(false);

}


function initializeTable(){	
	let mainTable = document.getElementById('puzzle');	
	for(let i=0;i<=n;i++){
		let row = mainTable.insertRow(i);
		row.width='75';
		for(var j=0;j<=n;j++){
			let cell = row.insertCell(j);
		}
	}	
}

function initializeHeadings(){
	let mainTable = document.getElementById('puzzle');	
	for (let i = 1; i < mainTable.rows.length; i++) {
		mainTable.rows[i].cells[0].innerHTML=input_arr_rows[i-1];
		// this.classList.toggle("headings");
		// mainTable.rows[i].cells[0].add("headings");			
	}
	for (let j = 1; j < mainTable.rows[0].cells.length; j++){
		mainTable.rows[0].cells[j].innerHTML=input_arr_cols[j-1];
		// this.classList.toggle("headings");
	}
}



let t = document.getElementById('puzzle');	
if (t != null) {
	console.log(t.rows.length, t.rows[1].cells.length);
	for (let i = 1; i < t.rows.length; i++) {
		for (let j = 1; j < t.rows[i].cells.length; j++){
			t.rows[i].cells[j].onclick = function () {
				arr[i][j]=this.classList.toggle("grey");
				checkSolved();		
			};
		}	
	}
}


function checkSolved(){
	let solved=true;
	let mainTable = document.getElementById('puzzle');
	for (let i = 1; i < mainTable.rows.length; i++) {
		let rowVals=input_arr_rows[i-1].split(",").map(Number);
		let groups=[];
		let counter=1;
		let curr = mainTable.rows[i].cells[1].classList.contains("grey");
		for( let j=2;j<mainTable.rows.length;j++){
			if(curr != mainTable.rows[i].cells[j].classList.contains("grey")){
				if(curr) {
					groups.push(counter);
				}
				counter=1;
				curr = !curr;
				// j++;
			}
			else{
				counter++;
			}
		}
		if(curr) {
			groups.push(counter);
		}
		for(let j=0;j<rowVals.length;j++){
			let index=groups.indexOf(rowVals[j]);
			if(index==-1) return;
			groups.splice(index,1);
		}
		if(groups.length>0) return;
	}

	for (let i = 1; i < mainTable.rows.length; i++) {
		let colVals=input_arr_cols[i-1].split(",").map(Number);
		let groups=[];
		let counter=1;
		let curr = mainTable.rows[1].cells[i].classList.contains("grey");
		for( let j=2;j<mainTable.rows.length;j++){
			if(curr != mainTable.rows[j].cells[i].classList.contains("grey")){
				if(curr) {
					groups.push(counter);
				}
				counter=1;
				curr = !curr;
				// j++;
			}
			else{
				counter++;
			}
		}
		if(curr) {
			groups.push(counter);
		}
		for(let j=0;j<colVals.length;j++){
			let index=groups.indexOf(colVals[j]);
			if(index==-1) return;
			groups.splice(index,1);
		}
		if(groups.length>0) return;
	}
	

	alert("Congratulations!");
	// res
}



function solution(){
	let mainTable = document.getElementById('puzzle');
	for (let i = 1; i < mainTable.rows.length; i++) {
		for (let j = 1; j < mainTable.rows[i].cells.length; j++){
			arr[i][j]=solutionArr[i][j];
			if(arr[i][j]!=mainTable.rows[i].cells[j].classList.contains("grey")){
				mainTable.rows[i].cells[j].classList.toggle("grey");
			}
		}
	}

}

function reset(){
	let mainTable = document.getElementById('puzzle');
	for (let i = 1; i < mainTable.rows.length; i++) {
		arr[i].fill(false);
		for (let j = 1; j < mainTable.rows[i].cells.length; j++){
			mainTable.rows[i].cells[j].classList.remove("grey");
		}	
	}
}