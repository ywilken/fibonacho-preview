function solutionToggle() {
    //alert("Hello!");
    var element = document.getElementsByClassName("solution");
    element.classList.toggle("practice-solution-yes");
}

function pageLoaded(){
	
	$('.clickButton').on('click',function(){
		// Section 1
        $('.solution').toggleClass('practice-solution-yes');
        $('.clickButton').toggleClass('test-button-clicked');
        //alert("Hello!");
    })
    
}