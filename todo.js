  // Define Ui vars

  const form = document.querySelector('#task-form');
  const taskList = document.querySelector('.collection');
  const clearBtn = document.querySelector('.clear-tasks');
  const filter = document.querySelector('#filter');
  const tasksInput = document.querySelector('#task');

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
	if(e.target.parentElement.classList.contains('delete-item')){
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

		if (item.toLowerCase().indexOf(text) != -1 ) {
			task.style.display = 'block';
		}
		else{
			task.style.display = 'none';
		}
	})	;
}