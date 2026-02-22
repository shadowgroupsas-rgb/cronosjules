import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapWidget extends StatelessWidget {
  const MapWidget({super.key});

  @override
  Widget build(BuildContext context) {
    // Stub for now. In real app, get current location.
    const initialPosition = LatLng(4.7110, -74.0721); // Bogota

    return GoogleMap(
      initialCameraPosition: const CameraPosition(
        target: initialPosition,
        zoom: 14.4746,
      ),
      myLocationEnabled: true,
      zoomControlsEnabled: false,
      mapType: MapType.dark, // Futuristic dark map
      onMapCreated: (GoogleMapController controller) {
        // controller.setMapStyle(...) // Apply custom dark JSON style
      },
    );
  }
}
