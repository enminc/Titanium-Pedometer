var win = Ti.UI.createWindow({
    backgroundColor : 'white',
    exitOnClose : true,
    layout : 'vertical'
});

function timeMilliseconds(ms) {
    var total_seconds = ms;
    //var seconds = total_seconds - (minutes * 60) - 0.499;
    //499miliseconds subtracted before rounding up in the interest of accuracy
    return Math.round(total_seconds);
}

var start = new Date().getTime();
var newTime;
var finalSeconds;
var timer = setInterval(function() {
    newTime = new Date().getTime();
    finalSeconds = timeMilliseconds(newTime - start);
}, 1);

// Copy resource file to SD card, and return a native path.
// Return undefined if we can't copy the file.
/**function getOrCopyAudioFile(resourceFilename) {
 var outFile = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'sound', 'fanfare10.wav');
 var outPath = outFile.nativePath;

 if (! outFile.exists()) {
 var outDir = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'sound');
 if (! outDir.isDirectory()) {
 if (! outDir.createDirectory()) {
 Ti.API.debug("Failed to create directory.");
 outDir = null;
 return undefined;
 }
 }
 outDir = null;

 var inFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'fanfare10.wav');
 try {
 inFile.copy(outPath);
 } catch (ex) {
 Ti.API.debug("Failed to copy file.");
 inFile = null;
 return undefined;
 }
 inFile = null;
 }
 outFile = null;
 return outPath;
 }

 var sound = getOrCopyAudioFile();**/
var soundPlayed = false;
//var goal = 10000;

//var steps = Ti.App.Properties.getInt('GLOBAL_STEPS');

//reset global steps to zero if fired
Ti.App.addEventListener('zeroStep', function(event) {
    //steps = 0;
    //Ti.App.Properties.removeProperty('GLOBAL_STEPS');
    Ti.App.Properties.setInt('GLOBAL_STEPS', 0);
    soundPlayed = false;
    start = new Date().getTime();
    //newTime = new Date().getTime();
});

Ti.App.addEventListener('updateGoal', function(event) {
    //goal = event.goal;
    soundPlayed = false;
});

//var oldStepTime;
//var newStepTime;
//var accumulatedTime = 0;
var sqrtDelay = 0;
var sqrtDelayPush = 0;

//delayed update to prevent "glitch" steps
var sqrtDelayTimer = setInterval(function() {
    sqrtDelayPush = sqrtDelay;
}, 10);

var temptenktime;
var sqrtXYZ;
var midNotificationLag = false;
var midNotification = false;

var accelerometerCallback = function(e) {
    //newStepTime = e.timestamp;
    //accumulatedTime = accumulatedTime + e.timestamp;

    sqrtXYZ = Math.sqrt((e.x * e.x) + (e.y * e.y) + (e.z * e.z));

    sqrtDelay = sqrtXYZ;

    if (sqrtDelayPush > Ti.App.Properties.getDouble('GLOBAL_SQRTPEAK')) {
        Ti.App.Properties.setDouble('GLOBAL_SQRTPEAK', sqrtDelayPush);
    }

    temptenktime = new Date().getTime();
    //Titanium.API.info('NEW TIME: ' + temptenktime);
    //Titanium.API.info('OLD TIME: ' + Ti.App.Properties.getDouble('GLOBAL_TEN_K_TIME_START'));

    Ti.App.Properties.setInt('GLOBAL_TEN_K_TIME', Math.round((temptenktime - Ti.App.Properties.getDouble('GLOBAL_TEN_K_TIME_START')) / 1000));

    if (Ti.App.Properties.getBool('GLOBAL_NOTIFICATIONS') == true) {
        //If they reached 5k steps, notify
        if (Ti.App.Properties.getInt('GLOBAL_TEN_K_STEPS') == 5000 && midNotification == false && midNotificationLag == false) {
            midNotification = true;
            var notificationOptions = {
                //contentIntent : pending,
                contentTitle : 'Half Way!',
                contentText : Ti.App.Properties.getInt('GLOBAL_STEPS') + ' steps! Half way to 10k goal!',
                tickerText : Ti.App.Properties.getInt('GLOBAL_STEPS') + ' STEPS',
                when : new Date().getTime(),
                icon : Ti.App.Android.R.drawable.appicon,
                flags : Titanium.Android.ACTION_DEFAULT | Titanium.Android.FLAG_AUTO_CANCEL | Titanium.Android.FLAG_INSISTENT,
            };

            var notification = Ti.Android.createNotification(notificationOptions);
            Ti.Android.NotificationManager.notify(1, notification);
        }

        //If they did less than 5k steps in 24 hours, notify
        if (Ti.App.Properties.getInt('GLOBAL_TEN_K_TIME') > 86400 && Ti.App.Properties.getInt('GLOBAL_TEN_K_STEPS') <= 5000 && midNotificationLag == false) {
            midNotificationLag = true;
            var notificationOptions = {
                //contentIntent : pending,
                contentTitle : 'Keep Pushing!',
                contentText : Ti.App.Properties.getInt('GLOBAL_STEPS') + ' so far.',
                tickerText : Ti.App.Properties.getInt('GLOBAL_STEPS') + ' STEPS',
                when : new Date().getTime(),
                icon : Ti.App.Android.R.drawable.appicon,
                flags : Titanium.Android.ACTION_DEFAULT | Titanium.Android.FLAG_AUTO_CANCEL | Titanium.Android.FLAG_INSISTENT,
            };

            var notification = Ti.Android.createNotification(notificationOptions);
            Ti.Android.NotificationManager.notify(1, notification);
        }
    }
    //adjust step sensitivity
    if (sqrtDelayPush >= Ti.App.Properties.getDouble('GLOBAL_SQRT') && finalSeconds > 300) {
        //steps++;
        Ti.App.Properties.setInt('GLOBAL_STEPS', Ti.App.Properties.getInt('GLOBAL_STEPS') + 1);
        Ti.App.Properties.setInt('GLOBAL_TEN_K_STEPS', Ti.App.Properties.getInt('GLOBAL_TEN_K_STEPS') + 1);
        //accumulatedTime = 0;
        start = new Date().getTime();

        //when user reaches 10k steps, log in db
        if (Ti.App.Properties.getInt('GLOBAL_TEN_K_STEPS') == 10000) {
            Ti.App.fireEvent('updateDB');
            Titanium.API.info('FIRED DB UPDATE EVENT');
        }
    }

    if (finalSeconds > Ti.App.Properties.getInt('GLOBAL_SECPEAK')) {
        Ti.App.Properties.setInt('GLOBAL_SECPEAK', finalSeconds);
    }

    Titanium.API.info('steps: ' + Ti.App.Properties.getInt('GLOBAL_STEPS'));

    if (Ti.App.Properties.getBool('GLOBAL_NOTIFICATIONS') == true) {
        if (Ti.App.Properties.getInt('GLOBAL_STEPS') == Ti.App.Properties.getInt('GLOBAL_GOAL') && soundPlayed == false) {
            soundPlayed = true;
            var notificationOptions = {
                //contentIntent : pending,
                contentTitle : 'CONGRATULATIONS!',
                contentText : 'You reached your goal of ' + Ti.App.Properties.getInt('GLOBAL_STEPS') + ' steps!',
                tickerText : Ti.App.Properties.getInt('GLOBAL_STEPS') + ' STEPS!',
                when : new Date().getTime(),
                icon : Ti.App.Android.R.drawable.appicon,
                flags : Titanium.Android.ACTION_DEFAULT | Titanium.Android.FLAG_AUTO_CANCEL | Titanium.Android.FLAG_SHOW_LIGHTS | Titanium.Android.FLAG_INSISTENT,
                sound : Titanium.Android.NotificationManager.DEFAULT_SOUND
            };

            /**if (sound) {
             notificationOptions.sound = sound;
             }**/

            var notification = Ti.Android.createNotification(notificationOptions);
            Ti.Android.NotificationManager.notify(1, notification);

            //delay, length, pause, length, pause, length
            Ti.Media.vibrate([0, 100, 100, 200, 100, 100]);
        }
    }

    //fire event to update statistics in another window
    Ti.App.fireEvent('updateStep', {
        //steps : Ti.App.Properties.getInt('GLOBAL_STEPS'),
        sqrtXYZ : sqrtDelayPush,
        //x : e.x,
        //y : e.y,
        //z : e.z,
        accumulatedTime : finalSeconds
    });

    //Ti.App.Properties.setInt('GLOBAL_STEPS', steps);
};

if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') !== -1) {
    alert('Accelerometer does not work on a virtual device');
} else {
    try {
        Ti.Accelerometer.addEventListener('update', accelerometerCallback);
    } catch (e) {
        Ti.API.info('ERROR 1:' + e.message);
    }

    //commented this so that another accelerometer isn't added on resume
    /**if (Ti.Platform.name === 'android') {
     try {
     Ti.Android.currentActivity.addEventListener('pause', function(e) {
     Ti.API.info("removing accelerometer callback on pause");
     Ti.Accelerometer.removeEventListener('update', accelerometerCallback);
     });
     Ti.Android.currentActivity.addEventListener('resume', function(e) {
     Ti.API.info("adding accelerometer callback on resume");
     Ti.API.info('ERROR3:' + e.message);
     Ti.Accelerometer.addEventListener('update', accelerometerCallback);
     });
     } catch (e) {
     Ti.API.info('ERROR2:' + e.message);
     }
     }**/

    //oldStepTime = newStepTime;
}

Titanium.API.info('Hello World, I am a Service');

/*===================================
 *
 *  Start Database Update
 *
 ===================================*/
var createReq = Titanium.Network.createHTTPClient();
var phoneID = Titanium.Platform.id;

createReq.onload = function() {
    var json = this.responseText;
    var response = JSON.parse(json);
    if (response.logged == false) {
        //createBtn.enabled = true;
        //createBtn.opacity = 1;
        alert(response.message);
        //if failed reset steps to 10000
        Ti.App.Properties.setInt('GLOBAL_TEN_K_STEPS', 9998);
    } else {
        var alertDialog = Titanium.UI.createAlertDialog({
            title : 'Alert',
            message : response.message,
            buttonNames : ['OK']
        });
        alertDialog.show();
        alertDialog.addEventListener('click', function(e) {
            //win.tabGroup.setActiveTab(0);
        });
        //if successful, reset time and steps
        Ti.App.Properties.setInt('GLOBAL_TEN_K_TIME', 0);
        Ti.App.Properties.setInt('GLOBAL_TEN_K_STEPS', 0);
        midNotificationLag = false;
        midNotification = false;
        soundPlayed = false;
        var startuptime = new Date().getTime();
        Ti.App.Properties.setDouble('GLOBAL_TEN_K_TIME_START', startuptime);
    }
};

Ti.App.addEventListener('updateDB', function(e) {
    createReq.open("POST", "http://www.designbyjosiah.com/HealthEffect/php/updateGoals.php");
    var params = {
        user : phoneID,
        tenKStepsTime : Ti.App.Properties.getInt('GLOBAL_TEN_K_TIME'),
        reminded : 1
    };
    createReq.send(params);

    Titanium.API.info('UPDATING DB');
});
/*===================================
 *
 *  End Database Update
 *
 ===================================*/
