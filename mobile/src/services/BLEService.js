import { Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { permissionService } from './PermissionService';

class BLEService {
  constructor() {
    this.isSupported = Platform.OS !== 'web';
    this.manager = null;
    
    if (this.isSupported) {
      try {
        this.manager = new BleManager();
      } catch (error) {
        console.warn('BLE Manager initialization failed (running in Expo Go?):', error);
        this.isSupported = false;
      }
    }
  }

  async startScan(onDeviceFound) {
    if (!this.isSupported || !this.manager) {
      console.log('[BLE] Mock scan started (Web/Expo Go mode)');
      this.mockInterval = setInterval(() => {
        const mockDevice = {
          id: `MOCK-${Math.floor(Math.random() * 9000) + 1000}`,
          name: 'Sentinel Tag',
          rssi: -Math.floor(Math.random() * 60) - 40
        };
        onDeviceFound(mockDevice);
      }, 3000);
      return;
    }

    const hasPermissions = await permissionService.requestBluetoothPermissions();
    if (!hasPermissions) {
        console.warn('[BLE] Permissions denied. Cannot start scan.');
        return;
    }

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
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }

    if (this.manager) {
      this.manager.stopDeviceScan();
    }
  }
}

export const bleService = new BLEService();
