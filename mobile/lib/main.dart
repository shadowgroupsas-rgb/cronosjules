import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cronos_mobile/core/app_router.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const ProviderScope(child: CronosApp()));
}

class CronosApp extends ConsumerWidget {
  const CronosApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(appRouterProvider);

    return MaterialApp.router(
      title: 'CRONOS',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF0A0A0F),
        primaryColor: const Color(0xFFCC2229),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFCC2229),
          secondary: Color(0xFF1B3A6B),
          surface: Color(0xFF12121A),
          background: Color(0xFF0A0A0F),
          error: Color(0xFFCF6679),
        ),
        textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
        useMaterial3: true,
      ),
      routerConfig: router,
    );
  }
}
