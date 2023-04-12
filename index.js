const input = document.getElementById("formInput");
const button = document.getElementById("formBtn");
const list = document.getElementById("listContainer");

let todoItems = [];

button.addEventListener("click", () => {
	if (input.value) {
		addTodo(input.value);
		input.value = "";
	}
});

list.addEventListener("click", (event) => {
	if (event.target.classList.contains("task-status")) {
		const itemKey = event.target.parentElement.dataset.key;
		toggleDone(itemKey);
	}

	if (event.target.classList.contains("task-delete")) {
		const itemKey = event.target.parentElement.dataset.key;
		deleteTodo(itemKey);
	}
});

function addTodo(text) {
	const todo = {
		text,
		checked: false,
		id: todoItems.length + 1,
	};

	todoItems.push(todo);
	renderTodo(todo);
}

function renderTodo(todo) {
	const item = document.querySelector(`[data-key='${todo.id}']`);

	if (todo.deleted) {
		// remove the item from the DOM
		item.remove();
		return;
	}

	const isChecked = todo.checked ? "done" : "";
	let node = document.createElement("div");
	node.setAttribute("class", `task-item ${isChecked}`);
	node.setAttribute("data-key", todo.id);

	node.innerHTML = `
		<div class="task-status">
			${todo.checked ? "<span></span>" : ""}
		</div>
		<p class="task-title">${todo.text}</p>
		<img class="task-delete" src="assets/trash.svg" />
	`;

	if (item) {
		list.replaceChild(node, item);
	} else {
		list.append(node);
	}
}

function toggleDone(key) {
	const index = todoItems.findIndex((item) => item.id === Number(key));
	todoItems[index].checked = !todoItems[index].checked;
	renderTodo(todoItems[index]);
}

function deleteTodo(key) {
	const index = todoItems.findIndex((item) => item.id === Number(key));
	const todo = {
		deleted: true,
		...todoItems[index],
	};

	todoItems = todoItems.filter((item) => item.id !== Number(key));

	renderTodo(todo);
}
