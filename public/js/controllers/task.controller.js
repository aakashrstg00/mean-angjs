app.controller("TaskController", function ($scope, $timeout, $interval, TaskService) {
    $scope.taskAdded = false;
    $scope.taskDeleted = false;
    $scope.undoDelete = false;
    $scope.undoDeletePressed = false;
    $scope.hideAllDeleteButtons = false;
    var undoTimer;
    var undoTimerInterval

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
            $scope.title="";
            $timeout(function () {
                $scope.taskAdded = false;
            }, 3000);
        }, function (error) {
            $scope.error = error;
        });
    };

    $scope.deleteTask = function(id){
        $scope.deleteTimerTime = 3; //seconds

        $scope.hideAllDeleteButtons = true;
        $scope.undoDelete = true;
        undoTimer = $timeout(()=>{
            $scope.undoDelete = false;
            $scope.undoDeletePressed = false;
            $scope.actuallyDeleteTask(id);
        }, $scope.deleteTimerTime * 1000 - 200);
        undoTimerInterval = $interval(()=>{
            $scope.deleteTimerTime--;
            if($scope.deleteTimerTime == 0) $interval.cancel(undoTimerInterval);
        },1000)
    };
    $scope.taskDeleted = false;
    $scope.undoDelete = false;
    $scope.undoDeletePressed = false;
    $scope.hideAllDeleteButtons = false;
    $scope.actuallyDeleteTask = (id)=>{
        var promise = TaskService.deleteTask(id);
        promise.then(function (data) {
            $scope.taskDeleted = true;
            $scope.hideAllDeleteButtons = false;
            console.log($scope.tasks);
            $scope.loadTasks();
            $timeout(function () {
                $scope.taskDeleted = false;
            }, 3000);
        }, function (error) {
            $scope.error = error;
        });
    }
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
    $scope.undoDeleteTask = ()=>{
        $scope.undoDeletePressed = true;
        
        $timeout.cancel(undoTimer);
        $interval.cancel(undoTimerInterval);
        
        $scope.undoDelete = false;
        $scope.undoDeletePressed = false;
        $scope.hideAllDeleteButtons = false;
    }
    $scope.loadTasks();
});