// bugSolution.js
import * as Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

async function getDeviceId() {
  let deviceId = Constants.deviceId;
  if (!deviceId || deviceId === '') {
    // Try retrieving from secure storage (optional, more secure than AsyncStorage)
    deviceId = await SecureStore.getItemAsync('deviceId');
    if (deviceId) {
      return deviceId;
    }

    // fallback to generating a UUID if still no id
    deviceId = generateUUID();
    await SecureStore.setItemAsync('deviceId', deviceId);
  }
  return deviceId;
}

function generateUUID() {
  //Simple UUID generation, replace with a more robust solution as needed.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default getDeviceId;