# The Buddy Project v2.0

A proper conversion of the Buddy Project using Ionic 1 framework.

## Testing the app on browser
To test app on either browser or phone, make sure the following components are installed:
```
npm install -g cordova ionic
```
Installing Cordova or Ionic requires [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine.
This app also utilizes ng-Cordova. Go here to download the zip file and unzip it:
http://ngcordova.com/docs/install/
To link the ng-cordova file to the app, copy and paste the following in the index.html file:
```
<script src="ng-cordova-master/dist/ng-cordova.js"></script>
```

To test this app on the browser, run the following commands:
```
git clone "https://github.com/cassandrale179/buddy-project2.git"
cd buddy-project2
$ionic serve
```

## Testing the app on Android

To test this app on Android, run the following command:
```
$ ionic cordova build android
$ ionic cordova run android
```


## Testing the app on Iphone
```
$ ionic cordova build ios
```
Once you have an account and you have set up Xcode with your certificates to enable device testing, you’ll want to open the Xcode project from platforms/ios/ and do your testing from Xcode

## Possible errors  
If encountered with this error:
```
(node:3962) UnhandledPromiseRejectionWarning: Error: spawn EACCES
    at _errnoException (util.js:1003:13)
```
That means the hook doesn't have execute permissions, so you get an EACCES error when Cordova executes it.
For Ionic 1, run the following command:
```
chmod +x hooks/after_prepare/010_add_platform_class.js
```

Installing Java on Mac using Homebrew, then set JAVA_HOME:
```
export JAVA_HOME=/Library/Java/Home
```
