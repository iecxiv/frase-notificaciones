var lastTimeBackPress=0;
var timePeriodToExit=2000;

function onBackKeyDown(e){
    e.preventDefault();
    e.stopPropagation();
    if(new Date().getTime() - lastTimeBackPress < timePeriodToExit){
        //navigator.app.exitApp();
        cordova.plugins.backgroundMode.overrideBackButton();
    }else{
        demo.notify("Pulsa atrás dos veces para salir.");
        lastTimeBackPress=new Date().getTime();
    }
};

document.addEventListener("backbutton", onBackKeyDown, false);