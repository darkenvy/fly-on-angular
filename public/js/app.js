var app = angular.module('UserApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('plane', {
        url: '/',
        controller: 'PlaneCtrl',
        templateUrl: 'app/planes.html'
      })
      .state('404', {
        url: '/404',
        controller: '',
        template: '<h1>404</h1>'
      })

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/404');
}])

app.controller('PlaneCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.plane = {
    manufacturer: '',
    model: '',
    engines: 0
  }

  $http.get('/api/airplanes').then(function success(res) {
    $scope.planes = res.data
  }, function error(res) {
    console.log(res);
  })

  $scope.delete = function(id, idx) {
    var route = '/api/airplanes/' + id
    $http.delete(route)
         .then(function success(res) {
            $scope.planes.splice(idx, 1)
            console.log(res);
          }, function error(res) {
            console.log(res);
          })
  }

  $scope.formSubmit = function() {
    $http.post('/api/airplanes', $scope.plane)
         .then(function success(res) {
            $scope.planes.push(res.data)
         }, function error(err) {
          console.log(err);
         });
  }

}]);
