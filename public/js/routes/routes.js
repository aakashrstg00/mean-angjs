app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
        templateUrl: '/views/home.html'
    }).when('/about', {
        templateUrl: '/views/about.html'
    }).otherwise({
        template: "<h1 class='text-center display-1'>No Such Page Exists!</h1>"
    })
});