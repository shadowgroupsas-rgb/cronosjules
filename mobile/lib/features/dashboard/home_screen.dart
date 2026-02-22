import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:cronos_mobile/core/auth_provider.dart';
import 'package:cronos_mobile/features/dashboard/map_widget.dart';
import 'package:cronos_mobile/features/dashboard/services/clock_service.dart';
import 'package:cronos_mobile/shared/widgets/glassmorphism_card.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:intl/intl.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  bool isClockedIn = false;
  bool isLoading = false;
  DateTime? clockInTime;

  void _toggleClock() async {
    final clockService = ref.read(clockServiceProvider);

    setState(() => isLoading = true);

    try {
        if (isClockedIn) {
            // Clock Out
            // In a real app, show dialog to get description
            await clockService.clockOut("Fin de turno");
            setState(() {
                isClockedIn = false;
                clockInTime = null;
            });
             ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Turno finalizado exitosamente')),
            );
        } else {
            // Clock In
            await clockService.clockIn();
            setState(() {
                isClockedIn = true;
                clockInTime = DateTime.now();
            });
            ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Turno iniciado. Rastreo activado.')),
            );
        }
    } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: $e'), backgroundColor: Colors.red),
        );
    } finally {
        setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authProvider).user;
    final theme = Theme.of(context);

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text('CRONOS', style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.5)),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
                ref.read(authProvider.notifier).logout();
                context.go('/login');
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          // Map Background
          const SizedBox.expand(
            child: MapWidget(),
          ),

          // Gradient Overlay
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.black.withOpacity(0.6),
                  Colors.transparent,
                  Colors.black.withOpacity(0.8),
                ],
                stops: const [0.0, 0.5, 1.0],
              ),
            ),
          ),

          // Main Content
          SafeArea(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Top Info
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: GlassmorphismCard(
                    padding: const EdgeInsets.all(12),
                    child: Row(
                      children: [
                        CircleAvatar(
                          backgroundColor: theme.colorScheme.primary,
                          child: Text(user?['firstName']?.substring(0, 1) ?? "U", style: const TextStyle(color: Colors.white)),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Hola, ${user?['firstName'] ?? 'Usuario'}",
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
                              ),
                              Text(
                                DateFormat('EEEE, d MMMM').format(DateTime.now()),
                                style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 12),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: isClockedIn ? Colors.green.withOpacity(0.2) : Colors.grey.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: isClockedIn ? Colors.green : Colors.grey),
                          ),
                          child: Text(
                            isClockedIn ? "ACTIVO" : "INACTIVO",
                            style: TextStyle(
                              color: isClockedIn ? Colors.green : Colors.grey,
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // Center Clock Button
                Center(
                  child: GestureDetector(
                    onTap: isLoading ? null : _toggleClock,
                    child: Animate(
                      onPlay: (controller) => isClockedIn ? controller.repeat() : controller.stop(),
                      child: Container(
                        width: 200,
                        height: 200,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: theme.colorScheme.surface.withOpacity(0.2),
                          border: Border.all(
                            color: isClockedIn ? Colors.green : theme.colorScheme.primary,
                            width: 2,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: (isClockedIn ? Colors.green : theme.colorScheme.primary).withOpacity(0.3),
                              blurRadius: 30,
                              spreadRadius: 5,
                            ),
                          ],
                        ),
                        child: Center(
                          child: isLoading
                           ? const CircularProgressIndicator(color: Colors.white)
                           : Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                isClockedIn ? Icons.stop : Icons.play_arrow,
                                size: 50,
                                color: Colors.white,
                              ),
                              const SizedBox(height: 8),
                              Text(
                                isClockedIn ? "FINALIZAR" : "INICIAR",
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 1.2,
                                  color: Colors.white,
                                ),
                              ),
                              if (isClockedIn) ...[
                                  const SizedBox(height: 4),
                                  const Text("00:00:00", style: TextStyle(fontFamily: 'monospace', color: Colors.white)),
                              ]
                            ],
                          ),
                        ),
                      ),
                    ).shimmer(
                        duration: 2000.ms,
                        color: (isClockedIn ? Colors.green : theme.colorScheme.primary).withOpacity(0.5)
                    ),
                  ),
                ),

                // Bottom Stats
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    children: [
                      Expanded(
                        child: GestureDetector(
                          onTap: () => context.push('/history'),
                          child: const GlassmorphismCard(
                            child: Column(
                              children: [
                                Icon(Icons.history, color: Colors.blue),
                                SizedBox(height: 4),
                                Text("Historial", style: TextStyle(fontSize: 12, color: Colors.white)),
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      const Expanded(
                        child: GlassmorphismCard(
                          child: Column(
                            children: [
                              Icon(Icons.bar_chart, color: Colors.purple),
                              SizedBox(height: 4),
                              Text("Reportes", style: TextStyle(fontSize: 12, color: Colors.white)),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
