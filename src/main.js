const lists = [];
let task = {};
const taskInput = document.getElementById("inputList");
const priorityInput = document.getElementById("priorityOption");
// untuk listnya
const taskList = document.getElementById("taskList");

function submitInput() {
	lists.push({ task: taskInput.value, priority: priorityInput.value });
	render();
}

function render() {
	taskList.innerHTML = lists
		.map((list) => {
			return `<li class="flex gap-4 mb-3">
							<p>${list.task}</p>
							<span class="text-sm bg-blue-300 px-3 py-1 rounded-2xl">
              ${list.priority}</span>
						</li>`;
		})
		.join("");
}
