import {Meteor} from 'meteor/meteor';

var app = {

    // Url/Path to the augmented reality experience you would like to load
    arExperienceUrl: "http://192.168.101.140:3000/world/index.html",
    // The features your augmented reality experience requires, only define the ones you really need
    requiredFeatures: [ "image_tracking" ],
    // Represents the device capability of launching augmented reality experiences with specific features
    isDeviceSupported: false,
    // Additional startup settings, for now the only setting available is camera_position (back|front)
    startupConfiguration:
    {
        "camera_position": "back"
    },
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);
        app.wikitudePlugin.setJSONObjectReceivedCallback(app.onJSONObjectReceived);
    },
    onJSONObjectReceived: function(payload) {
        console.log(payload)
        alert(JSON.stringify(payload))
    },
    // Callback if the device supports all required features
    onDeviceSupported: function() {

        app.wikitudePlugin.loadARchitectWorld(
            app.onARExperienceLoadedSuccessful,
            app.onARExperienceLoadError,
            app.arExperienceUrl,
            app.requiredFeatures,
            app.startupConfiguration
        );


    },
    attachJS(callback){
        
    },
    onURLInvoked: function(url) {

    // TODO: impl. url parsing to know what to do with the given url.

        app.wikitudePlugin.close();
    },
    // Callback if the device does not support all required features
    onDeviceNotSupported: function(errorMessage) {
        alert(errorMessage);
    },
    // Callback if your AR experience loaded successful
    onARExperienceLoadedSuccessful: function(loadedURL)  {
        app.wikitudePlugin.callJavaScript('window.World.init([\'sausage\'])');

    },
    // Callback if your AR experience did not load successful
    onARExperienceLoadError: function(errorMessage) {
        alert('Loading AR web view failed: ' + errorMessage);
    }

};

// app.initialize();

export default app;
