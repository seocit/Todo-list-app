const lists = JSON.parse(localStorage.getItem("lists")) ?? [];
const taskComplete = JSON.parse(localStorage.getItem("taskComplete")) ?? [];
let task = {};
const taskInput = document.getElementById("inputList");
const priorityInput = document.getElementById("priorityOption");
const dateInput = document.getElementById("dateInput");
const checkInput = document.getElementById("checkInput");
// untuk listnya
const taskList = document.getElementById("taskList");
const doneList = document.getElementById("doneList");

function storeData() {
	localStorage.setItem("lists", JSON.stringify(lists));
	localStorage.setItem("taskComplete", JSON.stringify(taskComplete));
}

function submitInput() {
	if (taskInput.value === "") {
		alert("Please Input Your Task Friend...");
	} else {
		lists.push({
			task: taskInput.value,
			priority: priorityInput.value,
			deadLineDate: dateInput.value !== "" ? dateInput.value : "no DeadLine :)",
			isDone: false,
		});
	}
	taskInput.value = "";
	dateInput.value = "";

	storeData();
	render();
}
function checkTask(taskIndex) {
	taskComplete.push(lists.splice(taskIndex, 1)[0]);
	console.log(taskComplete);
	storeData();
	render();
	// lists.splice(taskIndex, 1);
}

function render() {
	taskList.innerHTML = lists
		.map((list, index) => {
			return `<li class="flex gap-4 mb-3"> 
							<input type="checkbox" id="checkInput" onclick="checkTask(${index})">
							<p>${list.task}</p>
							<span class="text-sm bg-blue-300 px-3 py-1 rounded-2xl">
             				 	${list.priority}
							</span>
							<span class="text-sm bg-amber-300 px-3 py-1 rounded-2xl">
              					due: ${list.deadLineDate}
							</span>
						</li>`;
		})
		.join("");

	doneList.innerHTML = taskComplete
		.map((list) => {
			return `<li class="flex gap-4 mb-3">
					<input  disabled checked type="checkbox" id="checkInput" >
					<p class="line-through">${list.task}</p>
					<span class="text-sm bg-blue-300 px-3 py-1 rounded-2xl">${list.priority}</span>
					<span class="text-sm bg-green-300 px-3 py-1 rounded-2xl">
						due: ${list.deadLineDate}
					</span>
				</li>`;
		})
		.join("");
}

render();
