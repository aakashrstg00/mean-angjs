app.directive("tasks",function(){
    return {
        templateUrl: '/js/directives/tasks/tasks.html',
        restrict: 'E',
        controller: 'TaskController'
    };
});

app.directive("navbar",function(){
    return {
        templateUrl: '/js/directives/navbar/navbar.html',
        restrict: 'E'
    };
});