//Criando Módulo principal do App

var app = angular.module('GetTask', ['ionic', 'ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html'
  });

  $urlRouterProvider.otherwise("/");

});

app.controller('mainController', function($scope, $ionicPopup, $ionicListDelegate){
  var tasks = new getTasks();

  $scope.lista = tasks.itens;
  $scope.showMarked = false;
  $scope.removeStatus = false;

  $scope.onMarkTask = function(item){
      item.finalizada = !item.finalizada;
  };

  $scope.onHideItem = function(item){
    return item.finalizada && !$scope.showMarked;
  };

  $scope.onItemRemove = function(item){
    tasks.remove(item);
  };

  $scope.onClickRemove = function(){
    $scope.removeStatus = !$scope.removeStatus;
  };

  $scope.onClickAdd = function(pos){
    $ionicPopup.prompt({
      title: "Nova tarefa",
      template: "Digite a tarefa:",
      inputPlaceholder: "O que você precisa fazer?",
      okText: "Criar tarefa"
    }).then(function(pos){ //promise
      if (pos) tasks.add({nome: pos, finalizada: false});
    })
  };

  $scope.onItemEdit = function(pos){
    $ionicPopup.prompt({
      title: "Editar Tarefa",
      scope: $scope
    }).then(function(pos) {
      if (pos !== undefined) tasks.nome = $scope.data.response;
      //$ionicListDelegate.closeOptionButtons();
      //if (pos) tasks.edit({nome:pos, finalizada: false});
    })
  };

});
