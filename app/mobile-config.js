App.setPreference('android-targetSdkVersion', '19');
App.setPreference('android-minSdkVersion', '19');
App.setPreference('android-versionCode', '3');
App.info({
  id: 'com.brmk.PizzAR',
  name: 'PizzAR',
  description: 'Pizza in AR',
  author: 'Ihor Barmak',
  email: 'ihor.barmak@gmail.com',
  version: '0.0.1',
  buildNumber: '1',
});
App.appendToConfig(`<platform name="ios">
    
    <config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription">
      <string>We would like to use your camera for AR experience</string>
    </config-file>
  </platform>`);
