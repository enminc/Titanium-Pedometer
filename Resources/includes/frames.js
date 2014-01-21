/*
 * Frames
 * @ We uses this framework to allow mobility for responsive design
 * @ Each variable is used and this is the width based on the device
 */

var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

// if width is greater than height
if (pWidth > pHeight) {
    //assign landscape to current orientation
    // 100%
    var per100 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 1.0);
    // 90%
    var per90 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.9);
    // 80%
    var per80 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.8);
    // 60%
    var per60 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.6);
    // 50%
    var per50 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.5);
    // 42%
    var per42 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.42);
    // 40%
    var per40 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.4);
    // 35%
    var per35 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.35);
    // 30%
    var per30 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.3);
    // 25%
    var per25 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.25);
    // 20%
    var per20 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.20);
    // 19%
    var per19 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.19);
    // 15%
    var per15 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.15);
    // 10%
    var per10 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.10);
    // 9%
    var per9 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.09);
    // 7%
    var per7 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.07);
    // 5%
    var per5 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.05);
    // 2%
    var per2 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.02);
    // 1%
    var per1 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.01);
} else {
    //assign portrait to current orientation
    // 100%
    var per100 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 1.0);
    // 90%
    var per90 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.9);
    // 80%
    var per80 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.8);
    // 60%
    var per60 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.6);
    // 50%
    var per50 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.5);
    // 42%
    var per42 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.42);
    // 40%
    var per40 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.4);
    // 35%
    var per35 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.35);
    // 30%
    var per30 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.3);
    // 25%
    var per25 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.25);
    // 20%
    var per20 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.20);
    // 19%
    var per19 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.19);
    // 15%
    var per15 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.15);
    // 10%
    var per10 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.10);
    // 9%
    var per9 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.09);
    // 7%
    var per7 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.07);
    // 5%
    var per5 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.05);
    // 2%
    var per2 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.02);
    // 1%
    var per1 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.01);
}

//listen for when orientation changed
Ti.Gesture.addEventListener('orientationchange', function(e) {
    //if orientation changed to landscape
    if (e.orientation == Titanium.UI.LANDSCAPE_RIGHT || e.orientation == Titanium.UI.LANDSCAPE_LEFT) {
        // 100%
        var per100 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 1.0);
        // 90%
        var per90 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.9);
        // 80%
        var per80 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.8);
        // 60%
        var per60 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.6);
        // 50%
        var per50 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.5);
        // 42%
        var per42 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.42);
        // 40%
        var per40 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.4);
        // 35%
        var per35 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.35);
        // 30%
        var per30 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.3);
        // 25%
        var per25 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.25);
        // 20%
        var per20 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.20);
        // 19%
        var per19 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.19);
        // 15%
        var per15 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.15);
        // 10%
        var per10 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.10);
        // 9%
        var per9 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.09);
        // 7%
        var per7 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.07);
        // 5%
        var per5 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.05);
        // 2%
        var per2 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.02);
        // 1%
        var per1 = Math.floor(Titanium.Platform.displayCaps.platformWidth * 0.01);

    } else//if orienation changed to portrait
    if (e.orientation == Titanium.UI.PORTRAIT || e.orientation == Titanium.UI.UPSIDE_PORTRAIT) {
        var per100 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 1.0);
        // 90%
        var per90 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.9);
        // 80%
        var per80 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.8);
        // 60%
        var per60 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.6);
        // 50%
        var per50 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.5);
        // 42%
        var per42 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.42);
        // 40%
        var per40 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.4);
        // 35%
        var per35 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.35);
        // 30%
        var per30 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.3);
        // 25%
        var per25 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.25);
        // 20%
        var per20 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.20);
        // 19%
        var per19 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.19);
        // 15%
        var per15 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.15);
        // 10%
        var per10 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.10);
        // 9%
        var per9 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.09);
        // 7%
        var per7 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.07);
        // 5%
        var per5 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.05);
        // 2%
        var per2 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.02);
        // 1%
        var per1 = Math.floor(Titanium.Platform.displayCaps.platformHeight * 0.01);

    }
});
