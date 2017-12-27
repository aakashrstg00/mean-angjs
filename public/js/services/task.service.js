app.service("TaskService", function ($http, $q) {
    this.getTasks = () => {
        let url = '/api/tasks';
        var pr = $q.defer();
        $http.get(url).then(function (data) {
            pr.resolve(data)
        }, function (err) {
            pr.reject(err)
        }).catch(function(err){
            console.log("ERROR");
        });
        return pr.promise;
    };

    this.addTask = function(task){
        let url = '/api/task';
        var pr = $q.defer();
        $http.post(url,task,{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function (data) {
            pr.resolve(data)
        }, function (err) {
            pr.reject(err)
        }).catch(function(err){
            console.log("ERROR");
        });
        return pr.promise;
    };

    this.deleteTask = function(id){
        let url = '/api/task/'+id;
        var pr = $q.defer();
        $http.delete(url).then(function (data) {
            pr.resolve(data)
        }, function (err) {
            pr.reject(err)
        }).catch(function(err){
            console.log("ERROR");
        });
        return pr.promise;
    };

    this.updateStatus = function(task){
        let url = '/api/task/'+task._id;
        var pr = $q.defer();
        $http.put(url,task,{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function (data) {
            pr.resolve(data);
        }, function (err) {
            pr.reject(err);
        }).catch(function(err){
            console.log("ERROR");
        });
        return pr.promise;
    }

});