'use strict';

require('angular')
require('angular-route')

var app = angular.module('app',['ngRoute'])

require('./services/car_service')(app);
require('./services/auth_service')(app);
require('./services/error_service')(app);
require('./controllers/car-controller.js')(app)
require('./controllers/user-controller.js')(app)

app.config(['$routeProvider', function(router) {
  router
    .when('/', {
      templateUrl: 'templates/home.html'
    })
    // .when('/home', {
    //   // controller: 'UserController',
    //   // controllerAs: 'userctrl',
    //   templateUrl: 'templates/home.html'
    // })
    .when('/login', {
      controller: 'UserController',
      controllerAs: 'userctrl',
      templateUrl: 'templates/login.html'
    })
    .when('/submit', {
      // controller: 'CarController',
      // controllerAs: 'carCtrl',
      templateUrl: 'templates/submit.html'
    })
    .when('/inventory', {
      // controller: 'QuestionController',
      // controllerAs: 'questionCtrl',
      templateUrl: 'templates/inventory.html'
    })
    .when('/new-admin', {
      templateUrl: 'templates/new-admin.html'
    })
    .when('/admin-view', {
      controller: 'UserController',
      controllerAs: 'userctrl',
      templateUrl: 'templates/admin-view.html'
    })
}])
