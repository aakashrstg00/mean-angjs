app.controller("TaskController", function ($scope, $timeout, TaskService) {
    $scope.taskAdded = false;
    $scope.taskDeleted = false;
    $scope.loadTasks = function () {
        var promise = TaskService.getTasks();
        promise.then(function (data) {
            $scope.tasks = data.data;
        }, function (error) {
            $scope.error = error;
        });
    };
    $scope.addTask = function (event) {
        event.preventDefault();
        var newTask = {
            title: $scope.title,
            isDone: false
        };
        var promise = TaskService.addTask(newTask);
        promise.then(function (data) {
            $scope.taskAdded = true;
            console.log($scope.tasks);
            $scope.loadTasks();
            $timeout(function () {
                $scope.taskAdded = false;
            }, 3000);
        }, function (error) {
            $scope.error = error;
        });
    };
    $scope.deleteTask = function(id){
        var task = $scope.tasks;
        var promise = TaskService.deleteTask(id);
        promise.then(function (data) {
            $scope.taskDeleted = true;
            console.log($scope.tasks);
            $scope.loadTasks();
            $timeout(function () {
                $scope.taskDeleted = false;
            }, 3000);
        }, function (error) {
            $scope.error = error;
        });
    };
    $scope.updateStatus = function(task){
        var t = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        var promise = TaskService.updateStatus(t);
        promise.then(function (data) {
            $scope.loadTasks();
        }, function (error) {
            $scope.error = error;
        });
    };
    $scope.loadTasks();
});