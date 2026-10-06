const lists = JSON.parse(localStorage.getItem("lists")) ?? [];
const taskComplete = JSON.parse(localStorage.getItem("taskComplete")) ?? [];
const taskInput = document.getElementById("inputList");
const priorityInput = document.getElementById("priorityOption");
const dateInput = document.getElementById("dateInput");

const taskList = document.getElementById("taskList");
const doneList = document.getElementById("doneList");

function storeData() {
	localStorage.setItem("lists", JSON.stringify(lists));
	localStorage.setItem("taskComplete", JSON.stringify(taskComplete));
}

function submitInput() {
	const taskName = taskInput.value.trim();
	if (!taskName) {
		alert("Please Input Your Task Friend...");
		return;
	}

	lists.push({
		task: taskName,
		priority: priorityInput.value,
		deadLineDate: dateInput.value || "No deadline",
		isDone: false,
	});

	taskInput.value = "";
	dateInput.value = "";
	
	storeData();
	render();
}

function checkTask(taskIndex) {
	taskComplete.push(lists.splice(taskIndex, 1)[0]);
	storeData();
	render();
}

function uncheckTask(taskIndex) {
	lists.push(taskComplete.splice(taskIndex, 1)[0]);
	storeData();
	render();
}

function deleteTask(taskIndex) {
	lists.splice(taskIndex, 1);
	storeData();
	render();
}

function deleteCompleteTask(taskIndex) {
	taskComplete.splice(taskIndex, 1);
	storeData();
	render();
}

function deleteAllTask() {
	lists.splice(0, lists.length);
	storeData();
	render();
}

function deleteAllCompleteTask() {
	taskComplete.splice(0, taskComplete.length);
	storeData();
	render();
}

function render() {
	taskList.innerHTML = lists.length
		? lists.map((list, index) => `
			<tr class="mb-3 block rounded-lg border border-gray-200 p-3 md:table-row md:border-0 md:p-0">
				<td class="block warp-break-words py-1 md:table-cell md:px-2 md:py-3">
					<label class="flex items-start gap-2"><input onclick="checkTask(${index})" type="checkbox" aria-label="Mark task as done">
						<span class="warp-break-words">${list.task}</span>
					</label>
				</td>
				<td class="block py-1 text-center md:table-cell md:px-2 md:py-3">Priority: ${list.priority}</td>
				<td class="block text-center warp-break-words py-1 md:table-cell md:px-2 md:py-3">Due: ${list.deadLineDate}</td>
				<td class="block text-center py-1 md:table-cell md:px-2 md:py-3"><button onclick="deleteTask(${index})" class="rounded-xl bg-red-500 px-4 py-1 text-white">Delete</button></td>
			</tr>`).join("")
		: '<tr><td colspan="4" class="p-4 text-center text-gray-400">No tasks yet</td></tr>';

	doneList.innerHTML = taskComplete.length
		? taskComplete.map((list, index) => `
			<tr class="mb-3 block rounded-lg border border-gray-200 p-3 md:table-row md:border-0 md:p-0">
				<td class="block warp-break-words py-1 md:table-cell md:px-2 md:py-3">\
					<label class="flex items-start gap-2"><input onclick="uncheckTask(${index})" checked type="checkbox" aria-label="Move task back to to-do">
						<span class="warp-break-words line-through">${list.task}</span>
					</label>
				</td>
				<td class="block py-1 text-center md:table-cell md:px-2 md:py-3">Priority: ${list.priority}</td>
				<td class="block text-center warp-break-words py-1 md:table-cell md:px-2 md:py-3">Due: ${list.deadLineDate}</td>
				<td class="block text-center py-1 md:table-cell md:px-2 md:py-3"><button onclick="deleteCompleteTask(${index})" class="rounded-xl bg-red-500 px-4 py-1 text-white">Delete</button></td>
			</tr>`).join("")
		: '<tr><td colspan="4" class="p-4 text-center text-gray-400">No completed tasks yet</td></tr>';
}

render();
