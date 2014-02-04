//do not allow change to landscape
if (Ti.Platform.osname == 'android') {
    Ti.Gesture.addEventListener('orientationchange', function(e) {
        Ti.Android.currentActivity.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
    });
}

var win = Titanium.UI.currentWindow;
Ti.include('/includes/frames.js');

//var steps = 0;

if (Ti.App.Properties.getBool('GLOBAL_FIRST_START') == null) {
    var startuptime = new Date().getTime();
    Ti.App.Properties.setInt('GLOBAL_GOAL', 10000);
    Ti.App.Properties.setInt('GLOBAL_STEPS', 0);
    Ti.App.Properties.setBool('GLOBAL_FIRST_START', false);
    Ti.App.Properties.setBool('GLOBAL_AUTO_RESET', false);
    Ti.App.Properties.setDouble('GLOBAL_SQRT', 17.6);
    Ti.App.Properties.setDouble('GLOBAL_SLIDER_VALUE', 17.6);
    Ti.App.Properties.setInt('GLOBAL_TEN_K_STEPS', 0);
    Ti.App.Properties.setInt('GLOBAL_TEN_K_TIME', 0);
    Ti.App.Properties.setDouble('GLOBAL_TEN_K_TIME_START', startuptime);
    Ti.App.Properties.setBool('GLOBAL_SCREEN_ON', true);
    Ti.App.Properties.setBool('GLOBAL_NOTIFICATIONS', true);

} else if (Ti.App.Properties.getBool('GLOBAL_FIRST_START') == false) {
    //Ti.App.Properties.setBool('GLOBAL_RESTART', true);
}

if (Ti.App.Properties.getInt('GLOBAL_PHONE_NUM') == null) {

    //First start enter phone number
    var PhoneDialog = Ti.UI.createView({
        //androidView : textfield,
        title : "Enter LAST 5 of phone #",
        //style : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
        //buttonNames : ['Save']
        //message : 'row ' + row + ' index ' + index + ' section ' + section + ' row data ' + rowdata + ' phoneID ' + rowPhoneID,
        //storePhoneID : rowPhoneID,
        //cancel : 2,
        //send : 0
        //view : 1
        width : "90%",
        height : "50%",
        zIndex : 15,
        backgroundColor : 'black'
    });
    win.add(PhoneDialog);
    PhoneDialog.show();

    var Phonetxt = Ti.UI.createTextField({
        height : 35,
        top : 10,
        left : 40,
        width : "80%",
        hintText : 'Enter LAST 5 of phone #',
        softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
        keyboardType : Ti.UI.KEYBOARD_PHONE_PAD,
        returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color : 'white'
    });
    PhoneDialog.add(Phonetxt);

    var PhoneSave = Ti.UI.createButton({
        title : "Save",
        bottom : 0

    });
    PhoneDialog.add(PhoneSave);

    PhoneSave.addEventListener('click', function(e) {
        if (Phonetxt.value.length > 0) {
            Ti.App.Properties.setString('GLOBAL_PHONE_NUM', Phonetxt.value);
            PhoneDialog.hide();
        }
    });
}

Titanium.UI.Window.keepScreenOn = Ti.App.Properties.getBool('GLOBAL_SCREEN_ON');

/*===================================
 *
 *  Start Header
 *
 ===================================*/

var headerView = Ti.UI.createView({
    //top : 60,
    width : 'auto',
    height : 50,
    backgroundColor : '#3D3D3D',
    //right : 10,
    top : 0,
    zIndex : 2
});
win.add(headerView);

/*===================================
 *
 *  End Header
 *
 ===================================*/

/*===================================
 *
 *  Start Steps Goal
 *
 ===================================*/
var goalView = Ti.UI.createView({
    //top : 60,
    width : per40,
    height : 50,
    //backgroundColor : '#BFFF39',
    right : 10,
    //top : 5
});
headerView.add(goalView);

var lblGoal = Ti.UI.createLabel({
    color : '#fff',
    font : {
        fontSize : "20sp"
    },
    text : 'Goal:',
    //top : 0,
    left : 0,
    //width : 300
});
//goalView.add(lblGoal);

var txtGoal = Ti.UI.createTextField({
    hintText : 'Steps Goal',
    width : 150,
    right : 0,
    //top : 5,
    enabled : false,
    backgroundDisabledColor : '#000',
    value : Ti.App.Properties.getInt('GLOBAL_GOAL'),
    zIndex : 1,
    keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD
});
goalView.add(txtGoal);

//hide
txtGoal.hide();

txtGoal.addEventListener('change', function(e) {
    try {
        if (e.value.length > 7) {
            //no longer than 9 characters
            txtGoal.value = e.value.substr(1, 9);
        }
    } catch (e) {
        txtGoal.value = '1';
        alert('Invalid Input');
    }
    //only numbers
    //txtGoal.value = txtGoal.value.replace(/[^0-9]+/, "");
});

var lblGoalSteps = Ti.UI.createLabel({
    width : 'auto',
    right : 50,
    font : {
        fontSize : "18sp"
    },
    //top : 5,
    text : 'Goal: ' + Ti.App.Properties.getInt('GLOBAL_GOAL') + ' steps',
});
goalView.add(lblGoalSteps);

if (Ti.Platform.osname == 'android') {
    var chkGoal = Ti.UI.createSwitch({
        style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        //title : chkArray[i],
        value : true,
        right : '0dp',
        zIndex : 3
        //height : 25,
        //width : 'auto'

    });
} else {
    var chkGoal = Ti.UI.createSwitch({
        //title : chkArray[i],
        value : true,
        right : '0dp',
        zIndex : 3
        //height : 25,
        //width : 'auto'

    });
}

goalView.add(chkGoal);
chkGoal.addEventListener('change', function(e) {
    Ti.API.info("The checkbox has been set to " + e.value);
    try {
        if (e.value == true) {
            txtGoal.setEnabled(false);

            Ti.App.Properties.setInt('GLOBAL_GOAL', txtGoal.value);

            Ti.App.fireEvent('updateGoal', {
                goal : Ti.App.Properties.getInt('GLOBAL_GOAL'),
            });
            lblGoalSteps.text = 'Goal: ' + Ti.App.Properties.getInt('GLOBAL_GOAL') + ' steps';
            txtGoal.hide();
            lblGoalSteps.show();
        } else if (e.value == false) {
            txtGoal.setEnabled(true);
            lblGoalSteps.hide();
            txtGoal.show();
        }
    } catch (e) {
        txtGoal.value = Ti.App.Properties.getInt('GLOBAL_GOAL');
        txtGoal.hide();
        alert('Invalid Input');
    }
});

txtGoal.addEventListener('return', function(e) {
    chkGoal.value = true;
});

/*===================================
 *
 *  End Steps Goal
 *
 ===================================*/

/*===================================
 *
 *  Start Debug data
 *
 ===================================*/

var debugButton = Ti.UI.createButton({
    left : '0dp',
    title : 'Debug',
    //top : 0
});
headerView.add(debugButton);

debugButton.addEventListener('click', function(e) {
    debugView.visible = !debugView.visible;
});

var btnCheat10k = Ti.UI.createButton({
    left : '60dp',
    title : 'Cheat10k',
    //top : 0
});
headerView.add(btnCheat10k);

btnCheat10k.addEventListener('click', function(e) {
    Ti.App.Properties.setInt('GLOBAL_STEPS', 9998);
    Ti.App.Properties.setInt('GLOBAL_TEN_K_STEPS', 9998);
});

var btnCheat5k = Ti.UI.createButton({
    left : '120dp',
    title : 'Cheat5k',
    //top : 0
});
headerView.add(btnCheat5k);

btnCheat5k.addEventListener('click', function(e) {
    Ti.App.Properties.setInt('GLOBAL_STEPS', 4998);
    Ti.App.Properties.setInt('GLOBAL_TEN_K_STEPS', 4998);
});

var debugView = Ti.UI.createView({
    //top : 60,
    width : 300,
    height : 300,
    //backgroundColor : '#BFFF39',
    left : 10,
    top : 45,
    visible : false,
    zIndex : 3

});
win.add(debugView);

var lblX = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 0,
    left : 10,
    width : 300
});
debugView.add(lblX);
var lblY = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 15,
    left : 10,
    width : 300
});
debugView.add(lblY);
var lblZ = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 30,
    left : 10,
    width : 300
});
debugView.add(lblZ);
var lblSQRT = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 45,
    left : 10,
    width : 300
});
debugView.add(lblSQRT);
var lblATime = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 60,
    left : 10,
    width : 300
});
debugView.add(lblATime);

var lblInitial = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 75,
    left : 10,
    width : 300
});
debugView.add(lblInitial);

var lblGoal = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 90,
    left : 10,
    width : 300
});
debugView.add(lblGoal);

var lblSense = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 105,
    left : 10,
    width : 300
});
debugView.add(lblSense);

var lblSqrtPeak = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 120,
    left : 10,
    width : 300
});
debugView.add(lblSqrtPeak);

var lblSecPeak = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 135,
    left : 10,
    width : 300
});
debugView.add(lblSecPeak);

var lblTenKSteps = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 150,
    left : 10,
    width : 300
});
debugView.add(lblTenKSteps);

var lblTenKTime = Ti.UI.createLabel({
    color : 'black',
    font : {
        fontSize : 20
    },
    text : '-',
    top : 165,
    left : 10,
    width : 300
});
debugView.add(lblTenKTime);

/*===================================
 *
 *  End Debug data
 *
 ===================================*/

function timerMilliseconds(ms) {
    var total_seconds = ms / 1000;
    //var seconds = total_seconds - (minutes * 60) - 0.499;
    //499miliseconds subtracted before rounding up in the interest of accuracy
    return Math.round(total_seconds);
}

var start = new Date().getTime();
var newTime;
var finalSeconds;

var timer = setInterval(function() {
    newTime = new Date().getTime();
    finalSeconds = timerMilliseconds(newTime - start);

    Ti.App.fireEvent('updateTimer', {
        goalTime : finalSeconds
    });
}, 1000);

if (Ti.Platform.osname == 'android') {
    var stepsBackViewBorder = Ti.UI.createImageView({
        width : per60,
        height : per60,
        borderRadius : per60 * 2,
        borderColor : '#F45D0E',
        top : 0,
        borderWidth : "25dp",
        zIndex : 1,
        //backgroundColor : '#CCC',
    });
    win.add(stepsBackViewBorder);

    var stepsBackView = Ti.UI.createView({
        width : per60,
        height : per60,
        borderRadius : per60 * 2,
        borderColor : '#3D3D3D',
        top : 0,
        borderWidth : "1dp",
        backgroundImage : '../images/hexellence.png',
        backgroundRepeat : true,
        //backgroundColor : "#D5FFF8"

    });
    win.add(stepsBackView);
} else {
    var stepsBackViewBorder = Ti.UI.createImageView({
        width : per60,
        height : per60,
        borderRadius : per60 / 2,
        borderColor : '#F45D0E',
        top : 0,
        borderWidth : "25dp",
        zIndex : 1,
        //backgroundColor : '#CCC',
    });
    win.add(stepsBackViewBorder);

    var stepsBackView = Ti.UI.createView({
        width : per60,
        height : per60,
        borderRadius : per60 / 2,
        borderColor : '#3D3D3D',
        top : 0,
        borderWidth : "1dp",
        backgroundImage : '../images/hexellence.png',
        backgroundRepeat : true,
        //backgroundColor : "#D5FFF8"

    });
    win.add(stepsBackView);
}

var lblSteps = Titanium.UI.createLabel({
    //width : 250,
    //bottom : per30,
    text : Ti.App.Properties.getInt('GLOBAL_STEPS'),
    font : {
        fontSize : "80sp"
    },
    color : 'black',
    //left : 10
    zIndex : 2
});
//win.add(lblSteps);
stepsBackView.add(lblSteps);

var lblStepsTitle = Titanium.UI.createLabel({
    //width : 250,
    top : 45,
    text : 'steps',
    font : {
        fontSize : "40sp"
    },
    color : 'black',
    //left : 10
    zIndex : 2
});
win.add(lblStepsTitle);

if (Ti.Platform.osname == 'android') {
    var btnResetBorder = Ti.UI.createImageView({
        //title : 'Reset',
        bottom : per42,
        zIndex : 2,
        width : per15,
        height : per15,
        borderRadius : per15 * 2,
        //backgroundColor : '#F45D0E',
        borderColor : '#F45D0E',
        //top : 0,
        borderWidth : "5dp",
    });
    win.add(btnResetBorder);

    var btnReset = Ti.UI.createButton({
        title : 'RESET',
        font : {
            fontSize : "17sp"
        },
        bottom : per42,
        zIndex : 3,
        width : per15,
        height : per15,
        borderRadius : per15 * 2,
        backgroundColor : '#F45D0E',
        borderColor : '#F45D0E',
        //top : 0,
        borderWidth : "1dp",
        //text : 'RESET'
    });
    win.add(btnReset);
} else {
    var btnResetBorder = Ti.UI.createImageView({
        //title : 'Reset',
        bottom : per42,
        zIndex : 2,
        width : per15,
        height : per15,
        borderRadius : per15 / 2,
        //backgroundColor : '#F45D0E',
        borderColor : '#F45D0E',
        //top : 0,
        borderWidth : "5dp",
    });
    win.add(btnResetBorder);

    var btnReset = Ti.UI.createButton({
        title : 'RESET',
        font : {
            fontSize : "17sp"
        },
        bottom : per42,
        zIndex : 3,
        width : per15,
        height : per15,
        borderRadius : per15 / 2,
        backgroundColor : '#F45D0E',
        borderColor : '#F45D0E',
        //top : 0,
        borderWidth : "1dp",
        //text : 'RESET'
    });
    win.add(btnReset);
}

//fire event to reset global steps to zero
btnReset.addEventListener('click', function(e) {

    var btnResetDialog = Titanium.UI.createAlertDialog({
        title : 'This will only reset displayed steps, not the 10k goal. Are you sure?',
        //style : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
        buttonNames : ['Yes', 'Cancel'],
        //androidView : rowDialogTextField,
        //message : 'row ' + row + ' index ' + index + ' section ' + section + ' row data ' + rowdata + ' phoneID ' + rowPhoneID,
        //storePhoneID : rowPhoneID,
        cancel : 1,
        send : 0,
    });
    btnResetDialog.show();

    btnResetDialog.addEventListener('click', function(e) {
        if (e.index == 0) {
            Ti.App.fireEvent('zeroStep');
            newTime = new Date().getTime();
            start = new Date().getTime();
        } else if (e.index == 1) {
            btnResetDialog.hide();
        }
    });
});

var secretCountReset = 0;
var secretCountSettings = 0;
btnReset.addEventListener('click', function() {
    secretCountReset++;
    if (secretCountReset == 3 & secretCountSettings == 2) {
        notifySwitch.show();
        secretCountReset = 0;
        secretCountSettings = 0;

        headerView.show();
    }
    Ti.API.info('secretCountSettings = ' + secretCountSettings + '; secretCountReset = ' + secretCountReset);
});

// Create a Switch.
var notifySwitch = Ti.UI.createSwitch({
    value : Ti.App.Properties.getBool('GLOBAL_NOTIFICATIONS'),
    zIndex : 10,
    left : 0
});

// Listen for change events.
notifySwitch.addEventListener('change', function(e) {
    Ti.API.info('Event value: ' + e.value + ', switch value: ' + notifySwitch.value);
    Ti.App.Properties.setBool('GLOBAL_NOTIFICATIONS', e.value);
});

// Add to the parent view.
win.add(notifySwitch);
notifySwitch.hide();

//update statistics
Ti.App.addEventListener('updateStep', function(event) {
    //steps = event.steps;
    lblSteps.text = Ti.App.Properties.getInt('GLOBAL_STEPS');
    //lblX.text = 'x: ' + event.x;
    //lblY.text = 'y: ' + event.y;
    //lblZ.text = 'z: ' + event.z;
    lblSQRT.text = 'sqrt: ' + event.sqrtXYZ;
    lblATime.text = 'aTime: ' + event.accumulatedTime;
    lblInitial.text = 'initial start: ' + Ti.App.Properties.getBool('GLOBAL_FIRST_START');
    lblGoal.text = 'goal: ' + Ti.App.Properties.getInt('GLOBAL_GOAL');
    lblSqrtPeak.text = 'sqrt peak: ' + Ti.App.Properties.getDouble('GLOBAL_SQRTPEAK');
    lblSecPeak.text = 'seconds peak: ' + Ti.App.Properties.getInt('GLOBAL_SECPEAK');
    lblTenKSteps.text = '10k steps: ' + Ti.App.Properties.getInt('GLOBAL_TEN_K_STEPS');
    lblTenKTime.text = '10k time: ' + Ti.App.Properties.getInt('GLOBAL_TEN_K_TIME');

    if (basicSwitch.value == true && (Ti.App.Properties.getInt('GLOBAL_STEPS') == Ti.App.Properties.getInt('GLOBAL_GOAL'))) {
        Ti.App.fireEvent('zeroStep');
    }

    lblSteps.keepScreenOn = Ti.App.Properties.getBool('GLOBAL_SCREEN_ON');
});

if (Ti.Platform.osname == 'android') {
    //capture back button event
    win.addEventListener('android:back', function(e) {

        //nullify back button event
        e.cancelBubble = true;

        //simulate home button "minimizing" with back button
        var intent = Ti.Android.createIntent({
            action : Ti.Android.ACTION_MAIN
        });
        intent.addCategory(Ti.Android.CATEGORY_HOME);
        Ti.Android.currentActivity.startActivity(intent);

        //hide txtGoal on minimize to avoid keyboard on resume
        txtGoal.hide();
        Ti.API.info('back button pressed');
    });
}

/*===================================
 *
 *  Start Sensetivity Slider
 *
 ===================================*/

var sliderView = Ti.UI.createView({
    width : 'auto',
    height : per15,
    backgroundColor : '#3D3D3D',
    //right : 10,
    bottom : 0,
    zIndex : 1
});
win.add(sliderView);

var lblAuto = Ti.UI.createLabel({
    color : '#fff',
    font : {
        fontSize : "15sp"
    },
    text : 'Auto Reset',
    bottom : 40,
    left : 5,
    zIndex : 2
});
sliderView.add(lblAuto);

var basicSwitch = Ti.UI.createSwitch({
    value : Ti.App.Properties.getBool('GLOBAL_AUTO_RESET'), // mandatory property for iOS
    bottom : 0,
    zIndex : 2,
    left : 0
});
sliderView.add(basicSwitch);

basicSwitch.addEventListener('change', function(e) {
    Ti.API.info('Switch value: ' + basicSwitch.value);
    if (e.value == true) {
        Ti.App.Properties.setBool('GLOBAL_AUTO_RESET', true);
    } else if (e.value == false) {
        Ti.App.Properties.setBool('GLOBAL_AUTO_RESET', false);
    }
});

var lblOn = Ti.UI.createLabel({
    color : '#fff',
    font : {
        fontSize : "15sp"
    },
    text : 'Stay On',
    bottom : 40,
    left : "50%",
    zIndex : 2
});
sliderView.add(lblOn);

var sw2 = Ti.UI.createSwitch({
    color : '#fff',
    font : {
        fontSize : "15sp"
    },
    text : 'Keep On',
    bottom : 0,
    left : "50%",
    zIndex : 2,
    value : Ti.App.Properties.getBool('GLOBAL_SCREEN_ON'),
    exitOnClose : true
    //style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX
});
sliderView.add(sw2);

sw2.addEventListener('click', function(e) {
    if (e.source.value) {
        Ti.App.Properties.setBool('GLOBAL_SCREEN_ON', true);
        sw2.keepScreenOn = Ti.App.Properties.getBool('GLOBAL_SCREEN_ON');
    } else {
        Ti.App.Properties.setBool('GLOBAL_SCREEN_ON', false);
        //sw2.setKeepScreenOn(false);
        sw2.keepScreenOn = Ti.App.Properties.getBool('GLOBAL_SCREEN_ON');
    }
});

// Create a Slider.

if (Ti.Platform.osname == 'android') {
    var senseSlider = Titanium.UI.createSlider({
        min : 9,
        max : 28,
        value : Ti.App.Properties.getDouble('GLOBAL_SLIDER_VALUE'),
        width : "85%",
        height : 'auto',
        top : 5,
        right : 10,
        zIndex : 4
    });
} else {
    var senseSlider = Titanium.UI.createSlider({
        min : 1,
        max : 8,
        value : Ti.App.Properties.getDouble('GLOBAL_SLIDER_VALUE') / 10.5,
        width : "80%",
        height : 'auto',
        top : 5,
        right : 10,
        zIndex : 4
    });
}

if (Ti.Platform.osname == 'android') {
    // Listen for change events.
    senseSlider.addEventListener('change', function(e) {
        Ti.API.info('Slider value: ' + Math.round(e.value) + ' (actual: ' + Math.round(senseSlider.value) + ')');
        var temp = e.value * 100;
        temp = Math.round(temp);
        temp = temp / 100;
        temp = 28 - temp + 9;
        Ti.API.info('REAL: ' + temp);
        Ti.App.Properties.setDouble('GLOBAL_SQRT', temp);
        Ti.App.Properties.setDouble('GLOBAL_SLIDER_VALUE', e.value);
        lblSlider.text = temp;
        lblSense.text = 'Sensitivity: ' + temp;
    });
} else {
    // Listen for change events.
    senseSlider.addEventListener('change', function(e) {
        Ti.API.info('Slider value: ' + Math.round(e.value) + ' (actual: ' + Math.round(senseSlider.value) + ')');
        var temp = e.value * 100;
        temp = Math.round(temp);
        temp = temp / 100;
        temp = 8 - temp + 1;
        Ti.API.info('REAL: ' + temp);
        Ti.App.Properties.setDouble('GLOBAL_SQRT', e.value);
        Ti.App.Properties.setDouble('GLOBAL_SLIDER_VALUE', e.value);
        lblSlider.text = e.value;
        lblSense.text = 'Sensitivity: ' + e.value;
    });
}

// Add to the parent view.
sliderView.add(senseSlider);
//senseSlider.show();

var lblSliderTitle = Ti.UI.createLabel({
    color : '#fff',
    font : {
        fontSize : "15sp"
    },
    text : 'Sensitivity',
    top : 5,
    left : 5,
    //width : 300
});
sliderView.add(lblSliderTitle);

if (Ti.Platform.osname == 'android') {
    var lblSlider = Ti.UI.createLabel({
        color : '#fff',
        font : {
            fontSize : "15sp"
        },
        text : Ti.App.Properties.getDouble('GLOBAL_SQRT'),
        top : 23,
        left : 5,
        //width : 300
    });
    //uncomment to show sensitivity value to user
    //sliderView.add(lblSlider);
} else {
    var lblSlider = Ti.UI.createLabel({
        color : '#fff',
        font : {
            fontSize : "15sp"
        },
        text : Ti.App.Properties.getDouble('GLOBAL_SQRT') / 10.5,
        top : 23,
        left : 5,
        //width : 300
    });
    //uncomment to show sensitivity value to user
    //sliderView.add(lblSlider);
}

if (Ti.Platform.osname == 'android') {
    var btnSettings = Ti.UI.createSwitch({
        bottom : 6,
        right : 6,
        value : false, // mandatory property for iOS
        zIndex : 3,
        width : 30,
        height : 30,
        backgroundImage : '../images/gear.png',
        titleOn : "",
        titleOff : ""
    });
    win.add(btnSettings);
} else {
    var btnSettings = Ti.UI.createSwitch({
        bottom : 6,
        right : 6,
        value : false, // mandatory property for iOS
        zIndex : 3,
        width : 30,
        height : 30,
        //backgroundImage : '../images/gear.png',
        titleOn : "",
        titleOff : ""
    });
    win.add(btnSettings);
}

headerView.hide();
sliderView.hide();

btnSettings.addEventListener('change', function(e) {
    secretCountSettings++;
    if (e.value == true) {
        //headerView.show();
        sliderView.show();
    } else if (e.value == false) {
        headerView.hide();
        sliderView.hide();
    }
});

/*===================================
 *
 *  End Sensetivity Slider
 *
 ===================================*/

if (Ti.Platform.osname != 'android') {

    Ti.include("bService.js");

}