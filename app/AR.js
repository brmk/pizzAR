import React, { Component } from 'react';
import { View } from 'react-native';

import { ARKit } from 'react-native-arkit';

const diffuse = '#88ff88cc';

export default class ReactNativeARKit extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ARKit
          style={{ flex: 1 }}
          debug
          planeDetection
          lightEstimation
          onPlaneDetected={console.log} // event listener for plane detection
          onPlaneUpdate={console.log} // event listener for plane update
        >
          <ARKit.Model
            position={{ x: -0.2, y: 0, z: 0 }}
            model={{ file: 'art.scnassets/ship.scn', scale: 0.03 }}
          />
        </ARKit>
      </View>
    );
  }
}
