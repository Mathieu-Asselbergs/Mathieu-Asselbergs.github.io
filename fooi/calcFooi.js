function formatNumber(n) {
  // format number 1000000 to 1.234.567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


function formatCurrency(input) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.value;
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.selectionStart;
    
  // check for decimal
  if (input_val.indexOf(",") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(",");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "€" + left_side + "," + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "€" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ",00";
    }
  }
  
  // send updated string to input
  input.value = input_val;

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input.selectionStart = caret_pos;
  input.selectionEnd = caret_pos;
}


class Colleague {
	constructor(id, name, hours) {
		this.name = name;
		this.hours = hours;
		this.domReference = makeColleagueDomNode(id, name, hours);
		console.log(this.domReference);
	}
}

class ColleagueList {
	totalTips = 0.0;
	totalHours = 0.0;
	tipsPerHour = 0.0;
	colleaguesMap = new Map();
	idGenerator = 1;

	updateColleagueTips() {
		this.colleaguesMap.forEach((colleague) => {
			const tipsString= `€${Math.round(colleague.hours * this.tipsPerHour * 2) / 2}`.replace('.', ',');
			colleague.domReference.getElementsByClassName("tips-field")[0].innerHTML = tipsString;
		});
	}

	setTotalTips(totalTipsString) {
		this.totalTips = parseFloat(totalTipsString.substring(1).replace(',', '.'));
		this.tipsPerHour = this.totalTips / this.totalHours;
		
		this.updateColleagueTips();
	}

	addColleague(form) {
		const id = this.idGenerator;
		const name = form.name.value;
		const hours = parseFloat(form.hours.value); console.log("Hours: " + hours);
		const newColleague = new Colleague(id, name, hours);
		this.idGenerator++;
		
		document.getElementById("colleagues").appendChild(newColleague.domReference);
		document.getElementById("inp-name").value = "";
		
		this.totalHours += hours;
		this.tipsPerHour = this.totalTips / this.totalHours;
		
		this.colleaguesMap.set(id, newColleague);
		this.updateColleagueTips();
	}

	removeColleague(colleagueDomNode) {
		const id = parseInt(colleagueDomNode.id);
		const colleague = this.colleaguesMap.get(id);
		this.totalHours -= colleague.hours;
		this.tipsPerHour = this.totalTips / this.totalHours;
		
		document.getElementById("inp-name").value = colleague.name;
		const hours_field = document.getElementById("hours");
		hours_field.value = colleague.hours;
		hours_field.focus();
		
		this.colleaguesMap.delete(parseInt(colleagueDomNode.id));
		colleagueDomNode.remove();
		
		this.updateColleagueTips();
	}

	clear() {
		this.totalHours = 0.0;
		this.tipsPerHour = 0.0;
		this.colleaguesMap.clear();
		this.idGenerator = 1;
		
		document.getElementById("colleagues").innerHTML = "";
	}
}



function makeColleagueDomNode(id, name, hours) {	
	var colleagueDomNode = document.createElement('div');
	
	colleagueDomNode.setAttribute("id", `${id}`);
	
	var line = document.createElement('hr');
	line.style.margin = "1.5em 0";
	colleagueDomNode.appendChild(line);
	
	var colleague = document.createElement('div');
	colleague.style.marginLeft = "1.5em";
	colleague.setAttribute("onclick", "colleagueList.removeColleague(this.parentNode)");
	
	var tips = document.createElement('h1');
	tips.setAttribute("class", "tips-field");
	tips.innerHTML = "€4,15";
	colleague.appendChild(tips);
	
	var nameAndHours = document.createElement('p');
	nameAndHours.innerHTML = `${name}, ${hours} uur`;
	nameAndHours.setAttribute("class", "name-hours");
	colleague.appendChild(nameAndHours);
	colleagueDomNode.appendChild(colleague);
	
	return colleagueDomNode;
}