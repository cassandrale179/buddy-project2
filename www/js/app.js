angular.module('starter', ['ionic', 'ionic.native', 'starter.controllers', 'starter.services', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// state for non-tabs templates

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('interest', {
    url: '/interest',
    templateUrl: 'templates/tab-interest.html',
    controller: 'InterestCtrl'
  })
  .state('match', {
    url: '/match',
    templateUrl: 'templates/tab-match.html',
    controller: 'MatchCtrl'
  })
  .state('chat-detail', {
    url: '/chats',
    params: {
      chatId: "",
      chatPictureUrl: "",
      chatName: "",
      chatBuddy: ""
    },
    templateUrl: 'templates/chat-detail.html',
    controller: 'ChatDetailCtrl'
  })



  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('tab.other', {
    url: '/other/:otherId',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-other.html',
        controller: 'OtherCtrl'
      }
    }

  })
  .state('tab.buddies', {
    url: '/buddies',
    views: {
      'tab-buddies': {
        templateUrl: 'templates/tab-buddies.html',
        controller: 'BuddiesCtrl'
      }
    }
  })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    // .state('tab.chat-detail', {
    //   url: '/chats',
    //   params: {
    //     chatId: "",
    //     chatPictureUrl: "",
    //     chatName: ""
    //   },
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'templates/chat-detail.html',
    //       controller: 'ChatDetailCtrl'
    //     }
    //   }
    // })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/profile');

})

.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}]);
