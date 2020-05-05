const date = document.getElementById('date');
const items = document.querySelectorAll('.item');
const trash = document.querySelectorAll('.fa-trash-alt');
const input = document.querySelector('#text-input');
const list = document.querySelector('#list');
const addButton = document.querySelector('#addButton');
const restore = document.querySelector('#restore');

let LIST = []; //object contain items
let id = 0;

	document.addEventListener('keyup', function(event){
		if(event.keyCode === 13){
			const toDo = input.value;
			if(toDo != ''){
				addToDo(toDo,id,false,false);
				LIST.push(
					{
						name : toDo,
						id   : id,
						done : false,
						trash: false 
					}
				);
				id++;
			}
			input.value = '';
		}
	});
	//set ENTER button of keyboard to add item to list
	addButton.addEventListener('click',function() {
		const toDo = input.value;
		if(toDo != ''){
			addToDo(toDo,id,false,false);
			LIST.push(
				{
					name : toDo,
					id   : id,
					done : false,
					trash: false 
				}
			);
			id++;
		}
		input.value = '';
	});
	//set button click to add item to list
	function getTime(){
		"use strict";
		let option = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
		try{
			date.innerHTML = new Date().toLocaleString('vn-VN',option);
		}catch(e){
			return e.name = 'Date not found'
		}
		return false;
	}
	//update time

	function addToDo(toDo,id,done,trash){
		if(trash){return;}

		const CHECK = done ? 'fa-check-circle' : 'fa-circle';
		const LINE = done ? 'complete' : '';
		const DONE = done ? 'done' : '';
		const item = `<li class="item ${DONE}">
						<i class="far ${CHECK}" id='${id}' act='check'></i>
						<p class="to-do-text ${LINE}" act='complete'>${toDo}</p>
						<i class="far fa-trash-alt" id='${id}' act='trash'></i>
						<div class="bar">
							<div class="bar-question" id='${id}'>
								<i class="fas fa-check" act='remove'></i>
								<i class="fas fa-times" act='back'></i>
							</div>
						</div>
					</li>`;
		const position = 'beforeend';
		list.insertAdjacentHTML(position,item);
	}
	//function add item
	function clickCheckIcon(item){
		item.classList.toggle('fa-check-circle');
		item.classList.toggle('fa-circle');
		item.parentNode.classList.toggle('done');
		item.nextElementSibling.classList.toggle('complete');
		LIST[item.id].done = LIST[item.id].done ? false : true;
	}

	function clickCheckParam(item){
		item.classList.toggle('complete');
		item.previousElementSibling.classList.toggle('fa-check-circle');
		item.previousElementSibling.classList.toggle('fa-circle');
		item.parentNode.classList.toggle('done');
		LIST[item.previousElementSibling.id].done = LIST[item.previousElementSibling.id].done ? false : true;
	}
	// function change status of items from list to do
	function showDeleteIcons(item){
		let i = -80;
		setInterval(() =>{
			if(i === 0){
				clearInterval();
			}else{
				i++;
				item.nextElementSibling.style.right = i + 'px';
			}
		}, 5);
	}
	//function call the option board (delete or not)
	function backToItems(item){
		let i = 0;
		setInterval(() =>{
			if(i === -80){
				clearInterval();
			}else{
				i--;
				item.parentNode.parentNode.style.right = i + 'px';
			}
		}, 5);
	}
	//function call the option board back
	function removeItem(item){
		item.parentNode.parentNode.parentNode.parentNode.removeChild(item.parentNode.parentNode.parentNode);
		LIST[item.parentNode.id].trash = true;
	}

	list.addEventListener('click',function(event){
		const item = event.target;
		const itemAct = item.attributes.act.value;
		if(itemAct === 'check'){
			//check 'act' attribute  value to call function
			clickCheckIcon(item);
		}else if(itemAct === 'complete'){
			clickCheckParam(item);
		}else if(itemAct === 'trash'){
			showDeleteIcons(item);
		}else if(itemAct === 'back'){
			backToItems(item);
		}else{
			// act = 'remove'
			removeItem(item);

		}
	});
	//add action to call functions above

	restore.addEventListener('click', function(){
		list.querySelectorAll('.item').forEach((item) => {
			LIST[item.firstElementChild.id].trash = true;
			item.remove();
		});
	})
	//add action to remove all items

	input.addEventListener('focus', function(){
		this.style.border = '2px solid #ffda93';
		this.style.boxShadow = '0px 0px 2px #ffda93';
		this.style.background = 'white';
		this.style.color = 'black';
		this.classList.add('placeholder');
	});
	//style when user click on input
	input.addEventListener('blur', function(){
		this.style.border = '1px solid #ffefd1';
		this.style.boxShadow = '0px 0px 1px #ffefd1';
		this.style.background = '#3f51b5';
		this.style.color = 'white';
		this.classList.remove('placeholder');
	});
	//style when user do not focus on input
	getTime();