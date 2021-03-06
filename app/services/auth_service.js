module.exports = function(app) {
  app.factory('AuthService', ['$http', '$window',function($http, $window) {
    var token;
    var userId;
    var url = 'http://localhost:3000'
    var auth = {
      createUser(user, cb) {
        cb || function() {};
        // $http.post(url + '/signup', user)
        //   .then((res) => {
        //     token = $window.localStorage.token = res.data.token;
        //     console.log("creat user token " + token)
        //     cb(null, res)
        //   }, (err) => {
        //     cb(err)
        //   })
      },
      getToken() {
        console.log('Get Token = ' + $window.localStorage.token);
        return token || $window.localStorage.token;
      },
      getId(){
        return userId || $window.localStorage.user;
      },
      signOut(cb) {
        token = null;
        // userId = null;
        $window.localStorage.token = null;
        $window.localStorage.user = null;
        if (cb) cb();
      },
      signIn(user, cb) {
        // token = null;
        // $window.localStorage.token = null;
        console.log('signIn from auth serv ', user)
        cb || function() {};
        $http.post(url + '/login', {}, {
          headers: {
            authorization: 'Basic ' + btoa(user.username + ':' + user.password)
          }
        }).then((res) => {
          console.log(res)
          token = $window.localStorage.token = res.data.token;
          // userId = res.data.data._id;
          userId = $window.localStorage.user = res.data.data._id;
          console.log('This is token ', token)
          console.log('this is userId aut', userId)
          cb(null, res);
        }, (err) => {
          cb(err);
        })
      }
    }
    return auth;
  }])
};
