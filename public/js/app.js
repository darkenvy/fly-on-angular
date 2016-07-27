var app = angular.module('UserApp', []);

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
    $http.delete(route).then(function success(res) {
      $scope.planes.splice(idx, 1)
      console.log(res);
    }, function error(res) {
      console.log(res);
    })
  }

  $scope.formSubmit = function() {

  }

}]);
