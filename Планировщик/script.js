/*
Функции{
    weekStart() - возвращает первый день текущей недели ( т.е. понедельник )
    getDaysWeek() - процедура, которая расставляет дни текущей недели в ячейки th таблицы
    formatDayAndMonth() - преобразует формат даты ISO 8601 (YYYY-MM-DD) в строку DD.MM и возвращает ее
    getCountDays() - возвращает количество дней в промежутке дат
    getUsers() - процедура заполнения пользователей в таблицу
    assignTasks() - процедура назначения задач пользователям. Если пользователь не указан, задача отправляется в backlog
    clearGridTasks() - процедура очистки таблицы от задач
}
*/
function weekStart(day){
    switch(day){
        case 1:
            firstDayWeek = new Date();
            break;
        case 2:
            firstDayWeek = new Date();
            firstDayWeek.setDate(firstDayWeek.getDate() - 1);
            break;
        case 3:
            firstDayWeek = new Date();
            firstDayWeek.setDate(firstDayWeek.getDate() - 2);
            break;
        case 4:
            firstDayWeek = new Date();
            firstDayWeek.setDate(firstDayWeek.getDate() - 3);
            break;
        case 5:
            firstDayWeek = new Date();
            firstDayWeek.setDate(firstDayWeek.getDate() - 4);
            break;
        case 6:
            firstDayWeek = new Date();
            firstDayWeek.setDate(firstDayWeek.getDate() - 5);
            break;
        case 0:
            firstDayWeek = new Date();
            firstDayWeek.setDate(firstDayWeek.getDate() - 6);
            break;
    }
    return firstDayWeek;
}
function getDaysWeek(firstDay){
    const first = new Date(firstDay);
    week[0] = first.getDate().toString().padStart(2, '0') + '.' + (first.getMonth() + 1).toString().padStart(2, '0');
    days = document.querySelectorAll('th');
    days[0].innerHTML = first.getDate().toString().padStart(2, '0') + '.' + (first.getMonth() + 1).toString().padStart(2, '0');
    for(let i = 1; i < 7; i++){
        first.setDate(first.getDate() + 1);
        days[i].innerHTML = first.getDate().toString().padStart(2, '0') + '.' + (first.getMonth() + 1).toString().padStart(2, '0');
        week[i] = first.getDate().toString().padStart(2, '0') + '.' + (first.getMonth() + 1).toString().padStart(2, '0');
    }
}
function formatDayAndMonth(str){
    result = str.split('-');
    return result[2] + '.' + result[1];
}
function getCountDays(beginDate, endDate){
    let count = (Date.parse(endDate) - Date.parse(beginDate)) / (1000 * 3600 * 24);
    return count;
}
function getUsers(){
    for(let i = users.length - 1; i >= 0; i--){
        tr = `<tr id="${users[i].id}">
    <td class="executor">${users[i].surname + ' ' + users[i].firstName}</td>
    <td><div class="tasks" name="${users[i].id}"></div></td>
    <td><div class="tasks" name="${users[i].id}"></div></td>
    <td><div class="tasks" name="${users[i].id}"></div></td>
    <td><div class="tasks" name="${users[i].id}"></div></td>
    <td><div class="tasks" name="${users[i].id}"></div></td>
    <td><div class="tasks" name="${users[i].id}"></div></td>
    <td><div class="tasks" name="${users[i].id}"></div></td>
    <td></td>
</tr>`;
        document.getElementById('dates_array').insertAdjacentHTML('afterend', tr);
    }
}
function assignTasks(){
    clearGridTasks();
    let backlog_list = document.getElementById('backlog').querySelectorAll('div');
    backlog_list.forEach(function(item){
        item.remove();
    });
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].executor != null){
            cells = document.getElementById(tasks[i].executor).querySelectorAll('.tasks');
            
            let date = new Date(Date.parse(tasks[i].planStartDate));

            for(let j = 0; j <= getCountDays(tasks[i].planStartDate, tasks[i].planEndDate); j++){
                date.setDate(date.getDate() + j)
                let strDDMM = date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0');
                let index = week.indexOf(strDDMM);
                if(index != -1){
                    cells[index].innerHTML = cells[index].innerHTML + `<div id="${tasks[i].id}" class="task-checked">
                <h1>Задача ${i+1}</h1>
            </div><div class="description-block">
            <h1>Задача ${i+1}</h1>
            <p>Предмет: ${tasks[i].subject}<br>
                Описание: ${tasks[i].description}<br>
                Дата создания: ${tasks[i].creationDate}<br>
                Начало работы: ${tasks[i].planStartDate}<br>
                Срок сдачи: ${tasks[i].planEndDate}<br>
                Статус: ${tasks[i].status}
            </p>
        </div>`;
                }
                date.setDate(date.getDate() - j) 
            } 
        }else{
            document.getElementById('backlog').innerHTML = document.getElementById('backlog').innerHTML + `<div id="${tasks[i].id}" class="task">
            <h1>Задача ${i+1}</h1>
            <p>Предмет: ${tasks[i].subject}<br>
            Описание: ${tasks[i].description}<br>
            Дата создания: ${tasks[i].creationDate}<br>
            Начало работы: ${tasks[i].planStartDate}<br>
            Срок сдачи: ${tasks[i].planEndDate}<br>
            Статус: ${tasks[i].status}
        </p>
        </div>`;
        }
    }
}
function clearGridTasks(){
    let grid_tasks = document.querySelectorAll('.tasks');
    grid_tasks.forEach(function(item){
        item.innerHTML = "";
    });
}

const date = new Date();
const day = date.getDay();
let week = [];
let users = [];
let tasks = [];

let monday = weekStart(day);
getDaysWeek(monday);

document.getElementById('left_button').onclick = function(){
    monday.setDate(monday.getDate() - 7);
    getDaysWeek(monday);
    clearGridTasks();
    assignTasks();
};
document.getElementById('right_button').onclick = function(){
    monday.setDate(monday.getDate() + 7);
    getDaysWeek(monday);
    clearGridTasks();
    assignTasks();
};

url_user = 'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users';
fetch(url_user)
    .then((response) => {
        response.json()
    .then((user) => {
        users = user;
        getUsers();
    });
  });

url_tasks = 'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks';
fetch(url_tasks)
    .then((response) => {
        response.json()
    .then((task) => {
        tasks = task;
        assignTasks();
    });
});

/* Алгоритм перетаскивания задачи из backlog конкретному пользователю */

current_task = document.getElementById('main');

current_task.onmousedown = function(event) {
    elem = event.target;
    if (elem.className != 'task') return;
    let temp_p = elem.querySelector('p');
    elem.querySelector('p').remove();

    elem.style.left = elem.pageX - elem.offsetWidth / 2 + 'px';
    elem.style.top = elem.pageY - elem.offsetHeight / 2 + 'px';
    
    elem.style.position = 'absolute';
    elem.style.zIndex = 1000;
    elem.style.width = '100px';
    elem.style.height = '100px';
    elem.style.padding = '1%';
    elem.style.opacity = .5;
    elem.style.cursor = 'grabbing';
    let h1 = elem.querySelector('h1');
    h1.style.fontSize = '12px';
    h1.style.width = '100%';
    h1.style.fontWeight = 'normal';
    h1.style.textAlign = 'center';
    
    moveAt(elem.pageX, elem.pageY);
  
    function moveAt(pageX, pageY){
        elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
        elem.style.top = pageY - elem.offsetHeight / 2 + 'px';
    }
    let currentDroppable = null;

    function onMouseMove(event){
        moveAt(event.pageX, event.pageY);

        elem.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        elem.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.tasks');

        if (currentDroppable != droppableBelow){
            if (currentDroppable){
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable){
              enterDroppable(currentDroppable);
            }
        }

    }
    document.addEventListener('mousemove', onMouseMove);

    current_task.onmouseup = function(e) {
        document.removeEventListener('mousemove', onMouseMove);
        
        elem.hidden = true;
        let target = document.elementFromPoint(e.clientX, e.clientY).closest('.tasks');
        elem.hidden = false;
        
        if (target != null){
            elem.removeAttribute('style');
            elem.querySelector('h1').removeAttribute('style');
            elem.className = "task-checked";
            for(let i=0; i < tasks.length; i++){
                if (tasks[i].id == elem.id){
                    tasks[i].executor = parseInt(target.attributes["name"].value);
                }
            }
            target.style.background = '';
            target.style.border = '';
            assignTasks();
        }else{
            elem.appendChild(temp_p); 
            elem.removeAttribute('style');
            elem.querySelector('h1').removeAttribute('style');
            elem.className = "task";
            document.getElementById('backlog').appendChild(elem);
        }
        current_task.onmouseup = null;
    };
  };
  current_task.ondragstart = function(){
    return false;
};
function enterDroppable(elem){
    elem.style.background = 'aliceblue';
    elem.style.border = '5px solid rgb(15, 175, 0)';
}
function leaveDroppable(elem){
    elem.style.background = '';
    elem.style.border = '';
}