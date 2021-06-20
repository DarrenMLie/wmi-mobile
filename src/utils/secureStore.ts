import * as SecureStore from 'expo-secure-store';

async function setItem(key: string, value: string): Promise<void> {
  const isAvailable = await SecureStore.isAvailableAsync();

  if (isAvailable) {
    await SecureStore.setItemAsync(key, value);
  } else {
    throw 'SecureStore incompatible';
  }
}

async function getItem(key: string): Promise<string | null> {
  const isAvailable = await SecureStore.isAvailableAsync();

  if (isAvailable) {
    return await SecureStore.getItemAsync(key);
  } else {
    throw 'SecureStore incompatible';
  }
}

async function deleteItem(key: string): Promise<void> {
  const isAvailable = await SecureStore.isAvailableAsync();

  if (isAvailable) {
    await SecureStore.deleteItemAsync(key);
  } else {
    throw 'SecureStore incompatible';
  }
}

export default {
  getItem,
  setItem,
  deleteItem,
};