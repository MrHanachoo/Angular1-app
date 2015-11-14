(function(){

	var app = angular.module("githubViewer", []);

	var MainController = function(s, w, i, l, a, lc){
		
		var onUserComplete = function(response){
			s.user = response.data;
			w.get(s.user.repos_url)
			.then(onRepos, onError);
		};

		var onRepos = function(response){
			s.repos = response.data;
			lc.hash("userDetails");
			a();
		}

		var onError = function(reason){
			s.error = "could not fetch the user";
		};

		var decrementCountdown = function(){
			s.countdown -= 1;
			if(s.countdown <1){
				s.search(s.username);
			}
		};

		var countdownInterval = null;
		var startCountdown = function () {
			countdownInterval = i(decrementCountdown, 1000, s.countdown);
		}

		s.search = function(username){
			l.info("Searching for "+ username);
			w.get("https://api.github.com/users/" + username)
		.then(onUserComplete, onError);
			if(countdownInterval){
				i.cancel(countdownInterval);
				s.countdown = null;
			}
		};
		
		s.username = "angular";
		s.message = "GitHub Viewer";
		s.repoSortOrder = "-stargazers_count";
		s.countdown = 5;
		startCountdown();
	};

	app.controller("MainController", ["$scope", "$http", "$interval", "$log",
		"$anchorScroll", "$location", MainController]);

}());
