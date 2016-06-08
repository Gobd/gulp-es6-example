angular.module('app').service('service', function($http, $q){
    this.getData = () => {
        let promiseArr = [];
        for (let i = 1; i < 7; i++) {
            let url = `https://swapi.co/api/people/${i}/`;
            let temp = $http({
                method: 'GET',
                url
            });
            // console.log({url}); // automatic doubling of properties
            promiseArr.push(temp);
        }
        return $q.all(promiseArr).then(response => {
          let [one, two, three, four, five, six] = response.map(e => e.data);
          console.log(one);
          return response.map(e => e.data);
        });
    };

});