(function(){

	var app = angular.module("githubViewer", []);

	var MainController = function(s, w){
		
		var onUserComplete = function(response){
			s.user = response.data;
			w.get(s.user.repos_url)
			.then(onRepos, onError);
		};

		var onRepos = function(response){
			s.repos = response.data;
		}

		var onError = function(reason){
			s.error = "could not fetch the user";
		};

		s.search = function(username){
			w.get("https://api.github.com/users/" + username)
		.then(onUserComplete, onError);
		};
		
		s.username = "angular";
		s.message = "GitHub Viewer";
		s.repoSortOrder = "-stargazers_count";

	};

	app.controller("MainController", ["$scope", "$http", MainController]);

}());
