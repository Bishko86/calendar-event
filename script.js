'use strict'
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let day;

const impurity = {
	allElemsTd() {
		return  document.querySelectorAll('td');
	},
	assignValTable() {
		let amountDaysOfMonth = new Date(year, month+1 , 0).getDate();
		calendar.initialValue()
		let caption = document.querySelector('caption');
		caption.innerHTML = new Date(year, month).toString().slice(3, 7) + ' ' + year;
			for(let key of this.allElemsTd()) {
				if(key.classList.contains('cyrcle')) {
					key.classList.remove('cyrcle');
				}
				if(key.hasAttribute('style')) {key.style.color = '';}
				let number = this.currentDate(amountDaysOfMonth);
				key.innerHTML = number.getDate();
				key.setAttribute('data-date', number.toString().slice(0, 15));	
			}
			this.marcToday();
			this.stylePrevNextMonth();
			this.highlightEvents();
	},
    // returns date for each day 
	currentDate(days) {	
		let dateCur = new Date(year, month , day);
		day++;
		return dateCur;
	},
    // assign initial count value 
	initialValue() {
        let date = new Date(year, month, 1)
    	let dayOfWeek = date.getDay();
    	let arr = [-5, 1, 0, -1, -2, -3, -4];
        day = arr[dayOfWeek];
	},

	prevMonth() {
		month--;
		if(month < 0) {
			month = 11;
			year--;
		}
		this.assignValTable();
	},

	nextMonth() {
		month++;
		if(month > 11) {
			month = 0;
			year++;
		}
		this.assignValTable();
	},

	optionSelectYear() {
		let selectMonth = document.forms.monthes.month.options;
		for(let key of selectMonth) {
			if(key.value == new Date().getMonth()) {
				key.selected = true; 
			}	
		}
		let selectYear = document.forms.monthes.year
		for(let i = 1901;i <= 2099; i++){
			let option = new Option(i, i, false, false);
			if(i == new Date().getFullYear()){
				option = new Option(i, i, true, true);
			}
		    selectYear.append(option);
		}
	},
	
	stylePrevNextMonth() {
		let currentMonth = new Date(year, month).toString().slice(4, 7);
			Calendar.prototype.classListRemove('active-style');
			for(let elem of this.allElemsTd()){
			if(elem.dataset.date.slice(4, 7) !== currentMonth) {
				elem.classList.add('active-style');
			}	
		}
	},

	// save event in localStorage
	save(key, value) {
		localStorage.setItem(key, value);
	},
	classListRemove(cLass) {
		for(let elem of this.allElemsTd()) {
			if(elem.classList.contains(cLass)) {
				elem.classList.remove(cLass);
			}
		}
	}
}

class Calendar {
	constructor() {
		this.editValue = '';
	}
	// returns the current item for further operation
	currentIcon() {
		   for(let elem of this.allElemsTd()) {
		   	 	if(elem.classList.contains('cyrcle')) {
		   	  		return elem;
		   	    }
		   	}
	}

	// marc current icon of calendar
	// save target element to prototype
	// assign value for calendar title
	selectIcon(event) {
		Calendar.prototype.classListRemove('cyrcle');
		let target = event.target;
		Calendar.prototype.currentElem = target;
		let caption = document.querySelector('caption');
		if(target.tagName != "TD") return;
		if(target.tagName == "TD"&&
		   target.classList.contains('selectEvent')){
		   target.classList.add('cyrcle');
			Calendar.prototype.showEvent(target);
		}
		else {
			caption.innerHTML = target.dataset.date;
			target.classList.add('cyrcle');
		}
	}

	// shows event's window and current date
	
	showEvent(key) {
		let showEvent = document.querySelector('.show-event');
		let titleEvent = document.querySelector('.title-event');
		let event = document.querySelector('.event');
		let caption = document.querySelector('caption');
		showEvent.style.display = 'block';
		titleEvent.innerHTML = key.dataset.date;
		caption.innerHTML = key.dataset.date;
		event.innerHTML = localStorage.getItem(key.dataset.date);
		Calendar.prototype.editValue = localStorage.getItem(key.dataset.date);
	}

    // manage event's window:
      // - close event's window
      // - add event
      // - delete event

	closeEventInfo(event) {
		const target = event.target;
		let currentElem = Calendar.prototype.currentElem;
		if(target.tagName =='I') {
			 closeEvent.style.display = 'none';
		}
		if(target.tagName == 'DIV'&&
	    	target.classList.contains('show-event')) {
	    	target.style.display = 'none';
	    }
		if(target.tagName =='INPUT'&&
			target.value == 'Delete') {
			Calendar.prototype.removeEvent(currentElem);
			 closeEvent.style.display = 'none';
		}
		if(target.tagName =='INPUT'&&
			target.value == 'Edit') {
			closeEvent.style.display = 'none';
			calendar.addEvent();
			console.log(Calendar.prototype.editValue);
		}
		Calendar.prototype.editValue = '';
	}
	
	// delete event

	removeEvent(key) {
		localStorage.removeItem(key.dataset.date);
		key.classList.remove('selectEvent');
		key.classList.remove('cyrcle');
		if(key.classList.contains('active-style')) {
			 key.style.color = '';
		}
		Calendar.prototype.marcToday();
	}

	marcToday() {
		let today = new Date().toString().slice(0, 15);
			for(let elem of  Calendar.prototype.allElemsTd()) {
				if(elem.dataset.date == today) {
					elem.classList.add('cyrcle');
					elem.style.color = 'blue';
				}
				
			}
	}
    // show modal window for add event
	addEvent() {
		let modalWindow = document.querySelector('.parent-mod');
		let input = document.querySelector('.enter')
			for(let elem of Calendar.prototype.allElemsTd()) {
				if(elem.classList.contains('cyrcle')) {
					modalWindow.style.display = 'block';
				    (Calendar.prototype.editValue) ? input.value = Calendar.prototype.editValue : input.value = '';
			}
		}
	}

    // manage modal window:
    // -close window
    // -save event

	manageModal(event) {
		let eventDate = Calendar.prototype.currentIcon();
		let modalWindow = document.querySelector('.parent-mod');
		let input = document.querySelector('.enter');
		let target = event.target;
		if(target.tagName == 'I') {
			modalWindow.style.display = 'none';
	    }
	    if(target.tagName == 'DIV'&&
	    	target.classList.contains('parent-mod')) {
	    	modalWindow.style.display = 'none';
	    }
	    if(input.value == '') return false;
	    if(target.tagName=='INPUT'&&
	    target.classList.contains('send')){
		Calendar.prototype.save(eventDate.dataset.date, input.value);
		eventDate.classList.add('selectEvent');
		if(eventDate.classList.contains('active-style')) {
			eventDate.style.color = '#ffffff';
		}
		modalWindow.style.display = 'none';
		}
		Calendar.prototype.editValue = '';
	}
    
    // marc events
	highlightEvents() {
		let reboot = document.querySelectorAll('.selectEvent');
		reboot.forEach(item => item.classList.remove('selectEvent'));
		for(let key in localStorage){
	    	for(let elem of Calendar.prototype.allElemsTd()){
	    		if(elem.hasAttribute('style')&&
	    			elem.classList.contains('active-style')) {
	    			elem.style.color = '';
	    		}
	    		if(elem.dataset.date == key){
	    			elem.classList.add('selectEvent');
	    		}
	    		if(elem.classList.contains('active-style')&&
	    			elem.classList.contains('selectEvent')) {
	    			elem.style.color = '#ffffff';
	    		}
	    	}
		}
	} 
    // shows form for date choose
	goToDate(event) {
		const goToDate = document.querySelector('.go-to-date');
		let target = event.target;
		if (target.tagName == 'I'&&
		    target.classList.contains('fa')) {
				goToDate.style.display = 'block';	    
		}

		if (target.tagName == 'DIV'&&
			target.classList.contains('go-to-date')){
				goToDate.style.display = 'none';
		}
	}

	// shows calendar for selected date:
	// -closes form for date choose, 
	chooseDate(event) {
		let target = event.target;
		if (target.tagName == 'DIV'&&
			target.classList.contains('go-to-date')){
				goToDate.style.display = 'none';
		}
		if(target.tagName == 'I') {
				goToDate.style.display = 'none';
		}
		if(target.tagName == 'INPUT'&&
		   target.classList.contains('button')) {
		   	month =  document.forms.monthes.month.value;
		    year =  document.forms.monthes.year.value;
			calendar.assignValTable();
			goToDate.style.display = 'none';
		}
	}
}

let calendar = new Calendar();
Object.assign(Calendar.prototype, impurity);
calendar.assignValTable();
calendar.optionSelectYear();

let table = document.querySelector('#table');
table.addEventListener('click', calendar.selectIcon);

let addEvent = document.querySelector('.add-event');
addEvent.addEventListener('click', calendar.addEvent);

let modalWindow = document.querySelector('.parent-mod');
modalWindow.addEventListener('click', calendar.manageModal);

const closeEvent = document.querySelector('.show-event');
closeEvent.addEventListener('click', calendar.closeEventInfo);

const goTo = document.querySelector('.add-func');
goTo.addEventListener('click', calendar.goToDate);

const goToDate = document.querySelector('.go-to-date');
goToDate.addEventListener('click', calendar.chooseDate);

document.body.addEventListener('click', prevMonthNext);

document.onkeydown = function(e) {
	if(document.querySelector('.parent-mod').style.display == 'block') {
		return;
	}
	else {
    switch (e.keyCode) {
        case 37:
           calendar.prevMonth();
            break;
        case 39:
            calendar.nextMonth();
            break;
    }
}
}

function prevMonthNext(event) {
	let target = event.target;
	if(target.tagName != 'I') return;
	if(target.tagName == 'I'&&
	   target.parentNode.classList.contains('prev')) {
		calendar.prevMonth();
	// calendar.highlightEvents()
	}
	if(target.tagName == 'I'&&
	   target.parentNode.classList.contains ('next')) {
		calendar.nextMonth();
	// calendar.highlightEvents()
}
}