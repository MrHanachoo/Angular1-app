(function(){

	var app = angular.module("githubViewer", []);

	var MainController = function(s, w){
		
		var onUserComplete = function(response){
			s.user = response.data;
		};

		var onError = function(reason){
			s.error = "could not fetch the user";
		};

		w.get("https://api.github.com/users/MrHanachoo")
		.then(onUserComplete, onError);
		/*
		var person = {
			firstName: "Mohammed",
			lastName: "Hannechi",
			imageSrc: "file:///home/med/Desktop/me.jpg"
		};
		*/
		s.message = "Hello Angular !";
		//$scope.person =person;
	};

	app.controller("MainController", ["$scope", "$http", MainController]);

}());
