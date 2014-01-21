/*
* Single Window Application Template:
* A basic starting point for your application.  Mostly a blank canvas.
*
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/

//bootstrap and check dependencies
if (Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

//render appropriate components based on the platform and form factor
var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

/*===================================
 *
 *  Start Android Service
 *
 ===================================*/

if (Ti.Platform.osname == 'android') {
	//force portrait
	Ti.Android.currentActivity.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
}

Ti.App.Properties.setDouble('GLOBAL_SQRTPEAK', 0.0);
Ti.App.Properties.setInt('GLOBAL_SECPEAK', 0);

if (Ti.Platform.osname == 'android') {
	try {
		//create intent given at url
		var intent = Ti.Android.createServiceIntent({
			url : 'ans.js',
			startMode : Titanium.Android.START_NOT_STICKY
		});
		//restart intent according to interval (1 year)
		intent.putExtra('interval', 1000 * 31557600);
	} catch (e) {
		Ti.API.info('ERROR 0:' + e.message);
	}

	Titanium.API.info('RUNNING? ' + Titanium.Android.isServiceRunning(intent));

	//check if intent is running, if not, start intent
	if (Titanium.Android.isServiceRunning(intent) == true) {

	} else {
		//service.start();
		Ti.Android.startService(intent);
		Titanium.API.info('RUNNING NOW? ' + Titanium.Android.isServiceRunning(intent));
	}
}

/*===================================
*
*  End Android Service
*
===================================*/

/*===================================
*
*  Start iOS Service
*
===================================*/

// test for iOS 4+
function isiOS4Plus() {
	if (Titanium.Platform.name == 'iPhone OS') {
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0]);
		// can only test this support on a 3.2+ device
		if (major >= 4) {
			return true;
		}
	}
	return false;
}

if (isiOS4Plus()) {

	var service;
	/*
		service = Ti.App.iOS.registerBackgroundService({
			url : '/bService.js'
		});
		Ti.API.info("registered iOS background service = " + service);
		*/

	// Ti.App.iOS.addEventListener('notification',function(e){
	// You can use this event to pick up the info of the noticiation.
	// Also to collect the 'userInfo' property data if any was set
	// Ti.API.info("local notification received: "+JSON.stringify(e));
	// });

	// fired when an app resumes from suspension
	Ti.App.addEventListener('resume', function(e) {
		Ti.API.info("app is resuming from the background");
	});
	Ti.App.addEventListener('resumed', function(e) {
		Ti.API.info("app has resumed from the background");
		// this will unregister the service if the user just opened the app
		// ie: not via the notification 'OK' button..
		
		if (service != null) {
			//service.start();
			service.stop();
			service.unregister();
		}
		
		//Titanium.UI.iPhone.appBadge = null;
	});

	Ti.App.addEventListener('pause', function(e) {
		Ti.API.info("app was paused from the foreground");
		
		service = Ti.App.iOS.registerBackgroundService({
			url : 'windows/bService.js'
		});
		Ti.API.info("registered background service = " + service);
		
	});
}

/*===================================
*
*  End iOS Service
*
===================================*/

//considering tablets to have width over 720px and height over 600px - you can define your own
function checkTablet() {
	var platform = Ti.Platform.osname;

	switch (platform) {
		case 'ipad':
			return true;
		case 'android':
			var psc = Ti.Platform.Android.physicalSizeCategory;
			var tiAndroid = Ti.Platform.Android;
			return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
		default:
			return Math.min(Ti.Platform.displayCaps.platformHeight, Ti.Platform.displayCaps.platformWidth) >= 400;
	}
}

var isTablet = checkTablet();
console.log(isTablet);

var win_login = Titanium.UI.createWindow({
	url : 'windows/main.js',
	title : 'Pedometer',
	backgroundColor : '#CCC',
	navBarHidden : true,
	//layout : 'vertical',
	exitOnClose : true,
	//backgroundImage : 'images/dark_mosaic.png',
	//backgroundRepeat : true

});

var Window;
if (isTablet) {
	//Window = require('ui/tablet/ApplicationWindow');
	win_login.open();
} else {
	// Android uses platform-specific properties to create windows.
	// All other platforms follow a similar UI pattern.
	if (osname === 'android') {
		//Window = require('ui/handheld/android/ApplicationWindow');
		win_login.open();
	} else {
		//Window = require('ui/handheld/ApplicationWindow');
		win_login.open();
	}
}
