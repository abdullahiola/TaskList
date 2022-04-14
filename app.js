const form= document.getElementById('taskform');
const taskInput = document.getElementById('task');
const list= document.querySelector('.collection');
const clear = document.querySelector('.clear-tasks')
const filter = document.getElementById('filter')

loadEventListeners();

function loadEventListeners(){
  document.addEventListener('DOMContentLoaded',getTasks);
  form.addEventListener('submit',addTask);
  list.addEventListener('click',removeTasks);
  clear.addEventListener('click',clearAll)
  filter.addEventListener('keyup',filterTask)

}

function getTasks(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks=[];
  } else{
    tasks=JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
          
    const li = document.createElement('li')
    li.className ='collection-item'
    li.appendChild(document.createTextNode(task))
    
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML= '<i class="fa fa-remove"></i>'

    li.append(link)

    list.appendChild(li)
  
  })

}


function addTask(e){

  if(taskInput.value === ''){
    alert('add a task')
  }

 const li = document.createElement('li')
 li.className ='collection-item'
 li.appendChild(document.createTextNode(task.value))
 
 const link = document.createElement('a')
 link.className = 'delete-item secondary-content'
 link.innerHTML= '<i class="fa fa-remove"></i>'

 li.append(link)

 list.appendChild(li)

 //Store in LS
 storeTask(taskInput.value);


 taskInput.value =''

 e.preventDefault();




};


function storeTask(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
   tasks=[];
 } else{
   tasks=JSON.parse(localStorage.getItem('tasks'))
 }
  
 tasks.push(task)

 localStorage.setItem('tasks',JSON.stringify(tasks))
}


function removeTasks(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove()

      // remove from Local Storage
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  
  }
  
}

function removeFromLocalStorage(taskItem){
 let tasks; 
 if(localStorage.getItem('tasks')===null){
   tasks= []
 } else{
   tasks = JSON.parse(localStorage.getItem('tasks'))
 }
 tasks.forEach(function(task,index){
  if(taskItem.textContent === task ){
    tasks.splice(index,1)
  }
  
  })
 
  localStorage.setItem('tasks',JSON.stringify(tasks))



}


function clearAll(){
  // list.style.display= 'none';
  // list.innerHTML = ''; 

  //faster
  while(list.firstChild){
    list.removeChild(list.firstChild);
  }

  // clear from localStorage
  clearfromls();

}

function clearfromls(){
  localStorage.clear()
}

function filterTask(e){
  const text = e.target.value.toLowerCase(); 


  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!= -1){
      task.style.display = 'block';

    } else{
      task.style.display = 'none';
    }
    
 
  
  })

}

