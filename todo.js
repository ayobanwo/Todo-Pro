  // Define Ui vars

  const
  	 form = document.querySelector('#task-form'),
 	 taskList = document.querySelector('.collection'),
 	 clearBtn = document.querySelector('.clear-tasks'),
 	 filter = document.querySelector('#filter'),
 	 tasksInput = document.querySelector('#task');

// load all event listeners  



	// DOM Load Event
	document.addEventListener('DOMContentLoaded', getTasks);
	//Add tasks event
	form.addEventListener('submit' , addTask );
	//Remove Tasks event
	taskList.addEventListener('click', removeTask);
	//Clear Tasks
	clearBtn.addEventListener('click', clearTasks);
	//Filter Tasks
	filter.addEventListener('keyup', filterTasks);


// Get Tasks from Local Storage
function getTasks(){
	//declare a variable to store the tasks
	let tasks;
	//check if 'tasks' exist already in the local storage
	if(localStorage.getItem("tasks") === null){
		//declare tasks as an array in order to hold the individual task
		tasks = [] ;
	}
	//if 'tasks' exist in local storage
	//parse it and equal it to 'tasks'
	else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function(task){
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		//Create text node and append to li
		li.appendChild(document.createTextNode(task));
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
	})
}

// Add Tasks
function addTask(e){
	if (tasksInput.value === '') {
	 	alert('Add a task') ;
	}
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
	 // Store in Local Storage
	 storeTaskInLocalStorage(tasksInput.value);

	 //Clear Input
	tasksInput.value = '';
	e.preventDefault();
}


/// Store Task 
function storeTaskInLocalStorage(task){
	//declare a variable to store the tasks
	let tasks;
	//check if 'tasks' exist already in the local storage
	if(localStorage.getItem("tasks") === null){
		//declare tasks as an array in order to hold the individual task
		tasks = [] ;
	}
	//if 'tasks' exist in local storage
	//parse it and equal it to 'tasks'
	else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}
	// add each task into the task array
	tasks.push(task);
	//set the tasks array into the the local storage as "tasks"
	localStorage.setItem( "tasks", JSON.stringify(tasks));

}


//Remove Task
function removeTask(e){
	//check if parent element has a child with the class 'delete-item'
	//i.e li has a child "a" which has the class "delete-item"
	if(e.target.parentElement.classList.contains('delete-item')){
		//remove parent element of the parent element of the "i" tag
		// i > a > li ... li is the parent of the parent of the "i" tag
		//therefore clicking the "i" tag removes the li
		e.target.parentElement.parentElement.remove();		
		// Remove from Local Storage
		removeTaskFromLocalStorage(e.target.parentElement.parentElement);
	}
};

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
	//declare a variable to store the tasks
	let tasks;
	//check if 'tasks' exist already in the local storage
	if(localStorage.getItem("tasks") === null){
		//declare tasks as an array in order to hold the individual task
		tasks = [] ;
	}
	//if 'tasks' exist in local storage
	//parse it and equal it to 'tasks'
	else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function(task, index){
		if(taskItem.textContent === task){
			tasks.splice(index, 1)
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Clear Tasks Function
function clearTasks(){
	if(confirm("Are you sure you want to clear all tasks?")){
		taskList.innerHTML  = '';

		clearTasksFromLocalStorage();
	}
};

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage(){
	localStorage.clear();
}

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