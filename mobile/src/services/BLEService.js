import { Platform } from 'react-native';

let BleManager;
if (Platform.OS !== 'web') {
  try {
    BleManager = require('react-native-ble-plx').BleManager;
  } catch (e) {
    console.warn('Failed to load react-native-ble-plx', e);
  }
}

class BLEService {
  constructor() {
    if (Platform.OS !== 'web' && BleManager) {
      this.manager = new BleManager();
    } else {
      this.manager = null;
    }
  }

  startScan(onDeviceFound) {
    if (!this.manager) {
      console.warn('BLE not supported on this platform');
      return;
    }
    // Note: In a real app, you should check for permissions first
    this.manager.startDeviceScan(null, { allowDuplicates: true }, (error, device) => {
      if (error) {
        console.error('BLE Scan Error:', error);
        return;
      }
      if (device) {
        onDeviceFound(device);
      }
    });
  }

  stopScan() {
    if (!this.manager) return;
    this.manager.stopDeviceScan();
  }
}

export const bleService = new BLEService();
