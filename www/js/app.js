/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackKeyDown, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        cordova.plugins.backgroundMode.setEnabled(true);
        cordova.plugins.backgroundMode.setDefaults({ silent: true });
        cordova.plugins.backgroundMode.excludeFromTaskList();
        /* Invoke sync with the custom options, which enables user interaction.
           For customizing the sync behavior, see SyncOptions in the CodePush documentation. */
        window.codePush.sync(
            function (syncStatus) {
                switch (syncStatus) {
                    // Result (final) statuses
                    case SyncStatus.UPDATE_INSTALLED:
                        app.displayMessage("La aplicación ha sido actualizada. Disfruta de los nuevos contenidos.");
                        app.restart();
                        break;
                    case SyncStatus.UP_TO_DATE:
                        //app.displayMessage("La aplicación esta actualizada.");
                        break;
                    case SyncStatus.UPDATE_IGNORED:
                        //app.displayMessage("El usuario ha decidido no instalar la actualización.");
                        break;
                    case SyncStatus.ERROR:
                        //app.displayMessage("Un error ocurrió al comprobar actualizaciones.");
                        break;
                    
                    // Intermediate (non final) statuses
                    case SyncStatus.CHECKING_FOR_UPDATE:
                        console.log("Checking for update.");
                        break;
                    case SyncStatus.AWAITING_USER_ACTION:
                        console.log("Alerting user.");
                        break;
                    case SyncStatus.DOWNLOADING_PACKAGE:
                        console.log("Downloading package.");
                        break;
                    case SyncStatus.INSTALLING_UPDATE:
                        console.log("Installing update");
                        break;
                }
            },
            {
                installMode: InstallMode.ON_NEXT_RESTART, updateDialog: false
            },
            function (downloadProgress) {
                console.log("Descargando " + downloadProgress.receivedBytes + " de " + downloadProgress.totalBytes + " bytes.");
            });
            app.onOpenApp();
            app.addListeners();
            app.randomGenerate();
        // continue application initialization
        app.receivedEvent('deviceready');
    },
    onOpenApp: function (){
        var randomQuote;
        $.getJSON('data.json',function(quotes){
            randomQuote = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
            $('.quote').empty().append(randomQuote.quote);
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Displays an alert dialog containing a message.
    displayMessage: function (message) {
        navigator.notification.alert(
            message,
            null,
            'Frases Positivas actualizada',
            'OK');
    },
    restart: function () {
        codePush.restartApplication();
    },    
    onBackKeyDown: function (e) {
        //if (confirm("¿Desea salir de la aplicación?") == true){
        //    navigator.app.exitApp();
        //}
        var lastTimeBackPress=0;
        var timePeriodToExit=2000;
        e.preventDefault();
        e.stopPropagation();
        if(new Date().getTime() - lastTimeBackPress < timePeriodToExit){
            //navigator.app.exitApp();
            cordova.plugins.backgroundMode.overrideBackButton();
        }else{
            demo.notify("Pulsa atrás dos veces para salir.");
            lastTimeBackPress=new Date().getTime();
        }
    },
    addListeners: function () {
        //document.querySelector("#add-btn").addEventListener("click", app.addNote);
        checkbox = document.getElementById('customCheck1');
        checkbox.addEventListener('change', e => {
            if(e.target.checked){
                //app.randomGenerate();
                //localStorage.setItem('note', ramQuoteNoty);
                notesaved = localStorage.getItem('note');
                app.addNote();
                //cordova.plugins.notification.local.core.fireEvent("trigger", {});
                //navigator.notification.alert("scheduled");
            }else{
                cordova.plugins.notification.local.cancelAll();
                navigator.app.exitApp();        
                //window.localStorage.clear();              
                //cordova.plugins.notification.local.cancelAll();
                //app.randomGenerate();
                //localStorage.setItem('note', ramQuoteNoty);
                //codePush.restartApplication();
                //localStorage.setItem('note', ramQuoteNoty);
                //cordova.plugins.notification.local.un("trigger");
                //app.addListeners();
                //app.randomGenerate();
                //cordova.plugins.notification.local.un("click");
                /*localstorage.removeItem('note');
                var randomQuoteNoty;
                $.getJSON('data.json',function(quotes){
                    randomQuoteNoty = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];      
                    ramQuoteNoty = randomQuoteNoty.quote;  
                });
                localStorage.setItem('note', ramQuoteNoty);
                location.reload();*/
                //app.randomGenerate();
                //location.reload();
                //localStorage.setItem('note', ramQuoteNoty);
                //navigator.notification.alert("canceled");
            }
        });
        cordova.plugins.notification.local.on("click", function (notification) {
            //navigator.notification.alert("clicked: " + notification.id);
            console.log(notification.data);
            //$('.quote').empty().append(ramQuoteNoty);
            //var notesaved = localStorage.getItem('note');
            $('.quote').empty().append(notesaved);
            //if (notification.id == 11) {
            //    $('.quote').empty().append(ramQuoteNoty);
                //navigator.notification.alert("clicked: " + notification.id);
            //}
        });
        cordova.plugins.notification.local.on("trigger", function (notification) {
            console.log(notification.data);
            notesaved = localStorage.getItem('note');
            id = localStorage.getItem('id');
            //navigator.notification.alert("triggered: " + notification.id);    
            let noteOptions = {
                id: id,
                title: "Buenos días",
                text: ramQuoteNoty,
                //at: inOneMin,
                trigger: { every: { hour: 4, minute: 00 } },
                badge: 1,
                icon: 'file://img/icon.png',
                data: {
                    prop: "prop value",
                    num: 42
                }
            };
            //localStorage.setItem('note', ramQuoteNoty);
            cordova.plugins.notification.local.schedule(noteOptions, function(note){
                var randomQuoteNoty;
                $.getJSON('data.json',function(quotes){
                    randomQuoteNoty = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];      
                    ramQuoteNoty = randomQuoteNoty.quote;  
                });
                localStorage.setItem('note', ramQuoteNoty);
                //$('.quote').empty().append(ramQuoteNoty);
            });        
        });
    },
    randomGenerate: function (){
        var randomQuoteNoty;
        $.getJSON('data.json',function(quotes){
            randomQuoteNoty = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];      
            ramQuoteNoty = randomQuoteNoty.quote;  
        });
        localStorage.setItem('note', ramQuoteNoty);
        //$('.quote').empty().append(ramQuoteNoty);
    },
    addNote: function (ev) {
        let props = cordova.plugins.notification.local.getDefaults();
        //let inOneMin = new Date();
        //inOneMin.setMinutes(inOneMin.getMinutes() + 1);
        let id = new Date().getMilliseconds();
        localStorage.setItem('id', id);
        let noteOptions = {
            id: id,
            title: "Buenos días",
            text: "Ábreme! Para activar notificaciones silenciosas en la mañana.",
            //at: inOneMin,
            //trigger: { every: 6, unit: 'second' },
            badge: 1,
            icon: 'file://img/icon.png',
            data: {
                prop: "prop value",
                num: 42
            }
        };
        //localStorage.setItem('note', ramQuoteNoty);
        cordova.plugins.notification.local.schedule(noteOptions, function(note){
            var randomQuoteNoty;
            $.getJSON('data.json',function(quotes){
                randomQuoteNoty = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];      
                ramQuoteNoty = randomQuoteNoty.quote; 
            });
            localStorage.setItem('note', ramQuoteNoty);
            //$('.quote').empty().append(ramQuoteNoty);
            //cordova.plugins.notification.local.fireEvent('trigger', {});
        });
        
        //navigator.notification.alert("Added notification id " + id);
        //navigator.notification.alert("ram " + ramQuote);
    
        cordova.plugins.notification.local.cancel(id, function () {
        });
        cordova.plugins.notification.local.clear(id, function () {
        });
        cordova.plugins.notification.local.isPresent(id, function (present) {
        });
        
      }
};

app.initialize();