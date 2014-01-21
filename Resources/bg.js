Ti.API.debug("Hi from bg.js, about to loop forever");
function bgfunc() {
        setTimeout(bgfunc, 5000);
        Ti.API.debug("Hi from bgfunc");
}
bgfunc();