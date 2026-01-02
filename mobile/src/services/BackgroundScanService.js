import { bleService } from './BLEService';
import { stolenVehicleFilter } from './BloomFilter';

/**
 * Service to handle background scanning logic for the Taxi Driver flow.
 * Implements "The Loop": Scan -> Bloom Filter Check -> Ping Server.
 */
class BackgroundScanService {
  constructor() {
    this.isScanning = false;
    this.earnings = { base: 49.00, bonus: 40.00 };
    this.scannedCount = 0;
    this.listeners = [];
    
    // Simulate loading a hot list
    stolenVehicleFilter.loadFromHotList(['STOLEN-123', 'STOLEN-456', 'STOLEN-789']);
  }

  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners(data) {
    this.listeners.forEach(cb => cb(data));
  }

  async startGuarding() {
    if (this.isScanning) return;
    
    this.isScanning = true;
    console.log('[BackgroundScan] Starting Guard Duty...');
    
    // In a real app, we would use a Background Task here (expo-task-manager)
    // For this demo, we use the foreground BLE scanner
    bleService.startScan(this.handleDeviceFound.bind(this));
    
    this.notifyListeners({ status: 'active' });
  }

  stopGuarding() {
    if (!this.isScanning) return;
    
    this.isScanning = false;
    bleService.stopScan();
    console.log('[BackgroundScan] Guard Duty Ended.');
    
    this.notifyListeners({ status: 'inactive' });
  }

  handleDeviceFound(device) {
    // In reality, we'd use device.id or serviceUUIDs
    // For demo, we simulate finding devices with random IDs
    // device.id is usually the MAC address on Android
    
    const deviceId = device.id; 
    
    // 1. Bloom Filter Check
    const maybeStolen = stolenVehicleFilter.test(deviceId);
    
    if (maybeStolen) {
      console.log(`[BackgroundScan] POTENTIAL HIT: ${deviceId}`);
      // 2. Ping Server (Simulated)
      this.verifyWithServer(deviceId);
    } else {
      // Passive earning for scanning coverage
      // We throttle this updates in a real app
      this.scannedCount++;
      if (this.scannedCount % 5 === 0) { // Every 5 scans (faster for demo)
         // Cap bonus at R150
         const newBonus = this.earnings.bonus + 0.50;
         this.earnings.bonus = newBonus > 150 ? 150 : newBonus;
         
         this.notifyListeners({ earnings: this.earnings, scanCount: this.scannedCount });
      }
    }
  }

  async verifyWithServer(deviceId) {
    // Simulate server delay
    setTimeout(() => {
      // Mock server response: 50% chance it's actually stolen
      const isConfirmed = Math.random() > 0.5;
      
      if (isConfirmed) {
        console.log(`[BackgroundScan] CONFIRMED STOLEN: ${deviceId}`);
        // Trigger "Detection" Alert
        this.notifyListeners({ 
          alert: {
            type: 'stolen_spotted',
            deviceId: deviceId,
            location: 'Loftus Versfeld Parking', // Mock location
            timestamp: new Date().toISOString()
          }
        });
        
        // Bonus for finding a car (Mock: Instant payout for demo)
        this.earnings.bonus += 50.00; 
        if (this.earnings.bonus > 150) this.earnings.bonus = 150; // Still capped
        
        this.notifyListeners({ earnings: this.earnings });
      } else {
         console.log(`[BackgroundScan] False Positive: ${deviceId}`);
      }
    }, 1000);
  }
}

export const backgroundScanService = new BackgroundScanService();
