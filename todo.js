  // Define Ui vars

  const
  	 form = document.querySelector('#task-form'),
 	 taskList = document.querySelector('.collection'),
 	 clearBtn = document.querySelector('.clear-tasks'),
 	 filter = document.querySelector('#filter'),
 	 tasksInput = document.querySelector('#task');

// load all event listeners  
loadEventListeners();

function loadEventListeners() {
	//Add tasks event
	form.addEventListener('submit' , addTask );
	//Remove Tasks event
	taskList.addEventListener('click', removeTask);
	//Clear Tasks
	clearBtn.addEventListener('click', clearTasks);
	//Filter Tasks
	filter.addEventListener('keyup', filterTasks);
}

// Add Tasks
function addTask(e){
	if (tasksInput.value === '') {
	 	alert('Add a task') ;
	}
	else{
		 // Create li element
		 const li = document.createElement('li');
		 // Add class
		 li.className = 'collection-item';
		 //Create text node and append to li
		 li.appendChild(document.createTextNode(tasksInput.value));
		 // Create link element
		 const link = document.createElement('a');
		 //Add class
		 link.className = 'delete-item secondary-content' ;
		 // Add icon html
		 link.innerHTML =   '<i class ="fa fa-remove"></i>'
		 //append the link to li
		 li.appendChild(link);
		 // Append li to ul
		 taskList.appendChild(li);
		 //Clear Input
	}
	tasksInput.value = '';
	e.preventDefault();
}

//Remove
function removeTask(e){
	//check if parent element has a child with the class 'delete-item'
	//i.e li has a child "a" which has the class "delete-item"
	if(e.target.parentElement.classList.contains('delete-item')){
		//remove parent element i.e "li"
		e.target.parentElement.parentElement.remove();		
	}
};
//Clear Tasks Function
function clearTasks(){
	taskList.innerHTML  = '';
};
//Filter Tasks
function filterTasks(e){
	//Grab the content of filter input
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;

		//Check if typed text is contained in the item
		if (item.toLowerCase().indexOf(text) != -1 ) {
			//display item if typed text is contained in the item text
			task.style.display = 'block';
		}
		else{
			//do not display item if typed text is not contained in the item text
			task.style.display = 'none';
		}
	})	;
}