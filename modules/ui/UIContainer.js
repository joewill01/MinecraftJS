function makeUIContainer(parentElement, name, ui_container=true, classname='') {
	container = document.createElement("div");
    container.id = name;

    if (ui_container) {
        container.classList.add('ui_container')
    }

    if (!classname) {
    	container.classList.add(name);
    } else {
    	container.classList.add(classname);
    }
    
    parentElement.appendChild(container);
    return container
}