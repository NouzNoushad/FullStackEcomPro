import 'package:shared_preferences/shared_preferences.dart';

abstract class SecureStorageHelper {
  Future<void> saveToStorage(String key, String value);
  Future<void> getFromStorage(String key);
  Future<void> removeStorage(String key);
  Future<void> removeAllFromStorage();
}

class SecureStorage extends SecureStorageHelper {
  Future<SharedPreferences> _initStorage() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs;
  }

  // save storage
  @override
  Future<void> saveToStorage(String key, String value) async {
    SharedPreferences sharedPreferences = await _initStorage();
    sharedPreferences.setString(key, value);
  }

  // get storage
  @override
  Future<String?> getFromStorage(String key) async {
    SharedPreferences sharedPreferences = await _initStorage();
    return sharedPreferences.getString(key);
  }

  // remove storage
  @override
  Future<void> removeStorage(String key) async {
    SharedPreferences sharedPreferences = await _initStorage();
    sharedPreferences.remove(key);
  }

  // remove all
  @override
  Future<void> removeAllFromStorage() async {
    SharedPreferences sharedPreferences = await _initStorage();
    sharedPreferences.clear();
  }
}
