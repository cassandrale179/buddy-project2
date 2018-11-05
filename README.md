# The Buddy Project v2.0

A proper conversion of the Buddy Project using Ionic 1 framework. Avaiable at [Play Store.](https://play.google.com/store/apps/details?id=buddy.project.com) 

## Testing the app on browser
To test app on either browser or phone, make sure the following components are installed:
```
npm install -g cordova ionic
bower install ionic-native --save
ionic cordova plugin add cordova-plugin-camera
```
Installing Cordova or Ionic requires [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine.


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
For Chrome remote debugging:
chrome://inspect/RNV0217209001091#devices



## Possible errors  

* If encountered with this error:
```
(node:3962) UnhandledPromiseRejectionWarning: Error: spawn EACCES
    at _errnoException (util.js:1003:13)
```
That means the hook doesn't have execute permissions, so you get an EACCES error when Cordova executes it.
For Ionic 1, run the following command:
```
chmod +x hooks/after_prepare/010_add_platform_class.js
```

* If encountered with this error: build failed with android 7.0.0 Error: ENOENT: no such file platforms\android\res\values\strings.xml

Then for Cordova 7 installations, MY_APP\plugins\cordova-plugin-firebase\scripts\after_prepare.js should be set to
```
stringsXml: ANDROID_DIR + '/app/src/main/res/values/strings.xml' on line 51
```


* If encountered with this error:
```
(node:18377) UnhandledPromiseRejectionWarning: CordovaError: Requirements check failed for JDK 1.8 or greater
```
First run /usr/libexec/java_home -V which will output something like the following:
```
Matching Java Virtual Machines (3):
1.8.0_05, x86_64:   "Java SE 8" /Library/Java/JavaVirtualMachines/jdk1.8.0_05.jdk/Contents/Home
1.6.0_65-b14-462, x86_64:   "Java SE 6" /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
1.6.0_65-b14-462, i386: "Java SE 6" /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home

/Library/Java/JavaVirtualMachines/jdk1.8.0_05.jdk/Contents/Home
```

Specify the version to be 1.8:
```
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
```


## Resources
* Documentation on Ionic Native: https://www.npmjs.com/package/ionic-native
* Updated Cordova CLI: https://ionicframework.com/docs/cli/cordova/plugin/
* How to Use Ionic Native in Ionic 1: https://www.techiediaries.com/mobiledev/getting-started-with-ionic-native-for-ionic-1-2/
* Build Fail for Android 7.0.0: https://github.com/ionic-team/ionic/issues/13702
* Manage Java Version : https://stackoverflow.com/questions/21964709/how-to-set-or-change-the-default-java-jdk-version-on-os-x
* Realtime Database Trigger with Cloud Functions: https://www.youtube.com/watch?v=7E13ZBCyKT0
* ES6 Anti-Promises Pattern: http://www.datchley.name/promise-patterns-anti-patterns/  
