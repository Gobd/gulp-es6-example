angular.module(`app`, [`ui.router`]).config( ($stateProvider, $urlRouterProvider) => {

        $urlRouterProvider.otherwise(`/`);

        $stateProvider
            .state(`state1`, {
                url: `/`,
                templateUrl: `../views/weather/weather.template.html`,
                controller: `weatherCon`
            });
    })