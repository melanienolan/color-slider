var body = document.body;
var sliders = document.getElementsByClassName('slider');
var startingPoint = sliders[0].getBoundingClientRect().left;
var finishingPoint = document.querySelector(".bar").offsetWidth;
var output = document.querySelector(".output");
var isDown = false;

var EVENTS = {
    "END"   : "ontouchstart" in document.documentElement ? "touchend" : "mouseup",
    "MOVE"  : "ontouchstart" in document.documentElement ? "touchmove" : "mousemove"
};

body.style.background = "rgb(0,0,0)";

function start(){

    isDown = true;
    var self = this;

  	self.parentNode.addEventListener(EVENTS.MOVE, move, true);
  	self.parentNode.addEventListener(EVENTS.END, stop, true);

	function move(e){
	    var x = e.pageX - startingPoint;
	    var y = e.pageY;
	    if (x <= 0) {
	    	x = 0;
	  	}
	  	if (x >= finishingPoint - self.offsetWidth) {
	    	x = finishingPoint - self.offsetWidth + 1;
	  	}
	  	if (isDown){
	    	self.style.left = x + "px";
	    	self.nextElementSibling.textContent = Math.round(x / 2);
	    	var bodyColorSplit = body.style.background.split(",");
	    
		    if (self.nextElementSibling.classList[1] === "red"){
		    	bodyColorSplit[0] = "rgb("+self.nextElementSibling.textContent;
			}
			else if (self.nextElementSibling.classList[1] === "green"){
		    	bodyColorSplit[1] = self.nextElementSibling.textContent;
			}
			else if (self.nextElementSibling.classList[1] === "blue"){
		    	bodyColorSplit[2] = self.nextElementSibling.textContent;
			}
			body.style.background = bodyColorSplit.join();
		}
	}

	function stop(){
	  isDown = false;
	}
}

for (var i = 0; i < sliders.length; i++){
	sliders[i].addEventListener("mousedown", start, true);
}

