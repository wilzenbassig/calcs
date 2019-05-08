$(document).ready(function() {
		$("#zaccordion").zAccordion({
			width: 970,
			speed: 1200,
			slideClass: "slider",
			slideWidth: 500,
			height: 300,	
			afterBuild: function () {
				$("#inner").fadeIn(3000);
				}		
		});
	});