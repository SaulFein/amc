'use stict';
module.exports = function(app){
  app.controller('CarController',['$http','$window','$location','AuthService','CarService', function($http, $window, $location, AuthService, CarService){

    let url = 'http://localhost:3000/api/users/';
    let carId;

    let vm = this;
    vm.cars = [];
    vm.user = $window.localStorage.user
    vm.showNextButton;
    vm.curCar = 0;

    vm.getCars = function(){
      cUser = $window.localStorage.user
      console.log('This is getCars Data from carController')
      // console.log('This is current Car ' + vm.curCar);
      CarService.getCars()
        .then(function(res) {
        // console.log("this is res.data from getCars User Control ", res.data)
          vm.cars = res.data.data;
          console.log('this is carContrler getCars all cars ', vm.cars);
      // vm.curCar = vm.allCars[vm.curCar];
      // console.log('This is current Car ' + vm.curCar);
      });
    }

    //used to populate db
    vm.submit = function(c){
      cUser = $window.localStorage.user
      console.log('this is ', c);
      console.log('this is userID ' + cUser);
      // CarService.createCar(c);
      $http.post('http://localhost:3000/api/inventory',  c, {
        headers: {
          token: AuthService.getToken()
        }
      })
      .then((res) => {
        carId = $window.localStorage.carId = res.data.data._id;
        console.log(res);
        console.log('this is userId submint' + cUser);
        console.log('this is token submint' + $window.localStorage.token);
      })
    }

    vm.addCar = function(user) {
      console.log(user);
      AuthService.signIn(user, (err, res) => {
        if (err) {
          vm.ip = true;
          return console.log('Problem Signing In ', err);
        } else {
          vm.error = ErrorService(null);
          $location.path('/inventory');
        }
      })
    }
  }])
}
