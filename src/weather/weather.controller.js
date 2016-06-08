angular.module(`app`).controller(`weatherCon`, ($scope, service) => {
    $scope.test = `hello from weather`;
    service.getData().then((e) => $scope.data = e)

    // arrow functions without mustache brackets have implicit return

    // computed property names
    var prop = 'hey';
    var user = {
      name: "Brian",
      email: "bk@bk.com"
    }
    // es5
    var obj = {};
    obj[prop] = 'some value';
    // es6
    var obj = {
        [prop]: 'some value'
    };

    // default parameters
    // function hello(name) {
    // if (!name) {
    //   name = 'Anonymous';
    // }
    //     console.log('Hi ' + name);
    // }

    function hello(name = 'Anonymous') {
        console.log('Hi ' + name);
    }

    // destructuring
    var name = user.name;
    var email = user.email;
    var { name, email } = user;
})