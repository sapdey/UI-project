(function(){
'use strict';

angular.module('myApp', ['ui.bootstrap'])
.controller('newCon', function(Service) {
    var vm = this;
    vm.myInterval = 3000;
    vm.ofset = 0;
    vm.submit = function(){
        var promise = Service.stories();

            promise.then(function(response){
                console.log(response.data);
                vm.story = response.data.stories;
                vm.mostRecent = response.data.stories;
            })
            .catch(function(error){
                console.log(error);
            });
    }

    vm.load = function() {
        vm.ofset = vm.ofset+3;
        var promise = Service.history(vm.ofset);

            promise.then(function(response){
                console.log(response.data);
                vm.newstory = response.data.stories;
                vm.story.push.apply(vm.story,vm.newstory);
            }).catch(function(error){
                console.log(error);
            })
    }
})
.service('Service', function($http){
    var service = this;

    service.stories = function(){
        var response = $http({
            method: "GET",
            url: "https://rio.quintype.io/api/v1/stories?limit=3&offset=0"
        });
        return response;
    }

    service.history = function(o){
        var response = $http({
            method: 'GET',
            url: `https://rio.quintype.io/api/v1/stories?limit=3&offset=${o}`
        });
        return response;
    }
})
.directive('onScrollToBottom', function ($document) {
    //This function will fire an event when the container/document is scrolled to the bottom of the page
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //angular.element($document)[0].body or element[0]
            var doc = angular.element($document)[0].body;
            var clientHeight = window.innerHeight;
            //document or element
            $document.bind("scroll", function () {
                // console.log(doc.scrollTop, clientHeight, doc.scrollHeight)
                if (doc.scrollTop + clientHeight >= doc.scrollHeight - 5) {
                    scope.$apply(attrs.onScrollToBottom);
                }
            });
        }
    };
});

})()