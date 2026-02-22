import 'package:cronos_mobile/core/api_client.dart';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter_background_geolocation/flutter_background_geolocation.dart' as bg;

class ClockService {
  final Dio _dio;

  ClockService(this._dio);

  Future<void> clockIn() async {
    // 1. Get current position for clock-in
    final position = await _determinePosition();

    // 2. Send to API
    final response = await _dio.post('/overtime/clock-in', data: {
      'latitude': position.latitude,
      'longitude': position.longitude,
    });

    final recordId = response.data['id'];

    // 3. Start background tracking
    await _startTracking(recordId);
  }

  Future<void> clockOut(String description) async {
    // 1. Get position
    final position = await _determinePosition();

    // 2. Send to API
    await _dio.post('/overtime/clock-out', data: {
      'latitude': position.latitude,
      'longitude': position.longitude,
      'description': description,
    });

    // 3. Stop background tracking
    await bg.BackgroundGeolocation.stop();
  }

  Future<Position> _determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error('Location permissions are permanently denied.');
    }

    return await Geolocator.getCurrentPosition();
  }

  Future<void> _startTracking(String recordId) async {
    // Configure Background Geolocation
    await bg.BackgroundGeolocation.ready(bg.Config(
        desiredAccuracy: bg.Config.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10.0,
        stopOnTerminate: false,
        startOnBoot: true,
        debug: true, // Set to false in production
        logLevel: bg.Config.LOG_LEVEL_VERBOSE
    ));

    // Listen to location events and send manually via Dio to use interceptors
    bg.BackgroundGeolocation.onLocation((bg.Location location) async {
      try {
        await _dio.post('/tracking/log', data: {
            'overtimeRecordId': recordId,
            'latitude': location.coords.latitude,
            'longitude': location.coords.longitude,
            'accuracy': location.coords.accuracy,
        });
      } catch (e) {
        // print('Error sending location: $e');
      }
    });

    await bg.BackgroundGeolocation.start();
  }
}

final clockServiceProvider = Provider<ClockService>((ref) {
  final dio = ref.watch(apiClientProvider);
  return ClockService(dio);
});
