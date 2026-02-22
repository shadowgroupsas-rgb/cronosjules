import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final apiClientProvider = Provider<Dio>((ref) {
  final storage = const FlutterSecureStorage();

  final dio = Dio(BaseOptions(
    // Use IP address for emulator (10.0.2.2 for Android)
    // For iOS simulator use localhost
    // In production, use env variable
    baseUrl: 'http://10.0.2.2:4000/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
  ));

  dio.interceptors.add(InterceptorsWrapper(
    onRequest: (options, handler) async {
      final token = await storage.read(key: 'jwt_token');
      if (token != null) {
        options.headers['Authorization'] = 'Bearer $token';
      }
      return handler.next(options);
    },
    onError: (DioException e, handler) {
      // Handle global errors (e.g. 401 Unauthorized -> Logout)
      return handler.next(e);
    },
  ));

  return dio;
});
