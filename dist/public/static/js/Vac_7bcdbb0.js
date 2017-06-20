var Vac = {};
Vac.isHasClass = function(element,className){
	var elementClassName = element.className;
	var pattern = new RegExp('\\b'+className+'\\b','g');
	// String.search() 方法返回的是第一个匹配项的index，没有匹配项时返回-1
	return pattern.test(elementClassName);
};
Vac.addClass = function(element,className){
	if(!this.isHasClass(element,className)){
		element.className = element.className.trim() + " " + className;
	}
};
Vac.removeClass = function(element,className){
	if(this.isHasClass(element,className)){
		var pattern = new RegExp('\\b'+className+'\\b','g');
		element.className = element.className.replace(pattern,"");
	}
};
