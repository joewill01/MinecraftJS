function makeUIContainer(parentElement, name) {
	container = document.createElement("div");
    container.id = name;
    container.classList.add("ui_container");
    container.classList.add(name);
    parentElement.appendChild(container);
    return container
}