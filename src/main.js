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
			<tr class="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 p-3 sm:table-row sm:border-0 sm:p-0">
				<td data-label="Task" class="flex min-w-0 flex-col break-words p-1 before:mb-1 before:text-xs before:font-semibold before:text-gray-500 before:content-[attr(data-label)] sm:table-cell sm:before:hidden"><label class="flex min-w-0 items-start gap-2"><input onclick="checkTask(${index})" type="checkbox" aria-label="Mark task as done"> <span class="min-w-0 break-words">${list.task}</span></label></td>
				<td data-label="Priority" class="flex flex-col p-1 before:mb-1 before:text-xs before:font-semibold before:text-gray-500 before:content-[attr(data-label)] sm:table-cell sm:before:hidden">${list.priority}</td>
				<td data-label="Due date" class="flex flex-col break-words p-1 before:mb-1 before:text-xs before:font-semibold before:text-gray-500 before:content-[attr(data-label)] sm:table-cell sm:before:hidden">${list.deadLineDate}</td>
				<td data-label="Action" class="col-span-2 flex flex-col items-start p-1 before:mb-1 before:text-xs before:font-semibold before:text-gray-500 before:content-[attr(data-label)] sm:table-cell sm:before:hidden"><button onclick="deleteTask(${index})" class="text-white bg-red-500 py-1 px-4 rounded-xl">Delete</button></td>
			</tr>`).join("")
		: '<tr><td colspan="4" class="p-4 text-center text-gray-400">No tasks yet</td></tr>';

	doneList.innerHTML = taskComplete.length
		? taskComplete.map((list, index) => `
			<tr class="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 p-3 sm:table-row sm:border-0 sm:p-0">
				<td data-label="Task" class="flex min-w-0 flex-col break-words p-1 before:mb-1 before:text-xs before:font-semibold before:text-gray-500 before:content-[attr(data-label)] sm:table-cell sm:before:hidden"><label class="flex min-w-0 items-start gap-2"><input onclick="uncheckTask(${index})" checked type="checkbox" aria-label="Move task back to to-do"> <span class="min-w-0 break-words line-through">${list.task}</span></label></td>
				<td data-label="Priority" class="flex flex-col p-1 before:mb-1 before:text-xs before:font-semibold before:text-gray-500 before:content-[attr(data-label)] sm:table-cell sm:before:hidden">${list.priority}</td>
				<td data-label="Due date" class="flex flex-col break-words p-1 before:mb-1 before:text-xs before:font-semibold before:text-gray-500 before:content-[attr(data-label)] sm:table-cell sm:before:hidden">${list.deadLineDate}</td>
				<td data-label="Action" class="col-span-2 flex flex-col items-start p-1 before:mb-1 before:text-xs before:font-semibold before:text-gray-500 before:content-[attr(data-label)] sm:table-cell sm:before:hidden"><button onclick="deleteCompleteTask(${index})" class="text-white bg-red-500 py-1 px-4 rounded-xl">Delete</button></td>
			</tr>`).join("")
		: '<tr><td colspan="4" class="p-4 text-center text-gray-400">No completed tasks yet</td></tr>';
}

render();
