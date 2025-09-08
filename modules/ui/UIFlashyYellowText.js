class UIFlashyYellowText extends UIText {
	constructor(parentElement, x=0, y=0, id="", text="", flipX=false, flipY=false) {
		super(parentElement, x, y, id, text, flipX, flipY);
		this.element.classList.add('flashy-yellow-text')
	}
}