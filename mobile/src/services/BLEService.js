import { BleManager } from 'react-native-ble-plx';

class BLEService {
  constructor() {
    this.manager = new BleManager();
  }

  startScan(onDeviceFound) {
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
    this.manager.stopDeviceScan();
  }
}

export const bleService = new BLEService();
