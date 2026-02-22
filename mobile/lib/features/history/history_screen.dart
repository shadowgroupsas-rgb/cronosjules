import 'package:flutter/material.dart';
import 'package:cronos_mobile/shared/widgets/glassmorphism_card.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: const Text('Historial', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Stack(
        children: [
            // Background
            Container(
                decoration: const BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Color(0xFF0A0A0F), Color(0xFF1B3A6B)],
                ),
                ),
            ),
            SafeArea(
                child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: 5,
                    itemBuilder: (context, index) {
                        return Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: GlassmorphismCard(
                                child: ListTile(
                                    leading: const Icon(Icons.access_time, color: Colors.white),
                                    title: Text('Turno ${5 - index}', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                                    subtitle: Text('2${index}/05/2026 • 8.5 hrs', style: TextStyle(color: Colors.white.withOpacity(0.7))),
                                    trailing: const Icon(Icons.chevron_right, color: Colors.white),
                                ),
                            ),
                        );
                    },
                ),
            ),
        ],
      ),
    );
  }
}
