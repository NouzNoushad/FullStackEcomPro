import 'package:flutter/material.dart';

class NavigationHelpers {
  // route builder
  static pageRouteBuilder(Widget screen) => PageRouteBuilder(
        pageBuilder: (_, __, ___) => screen,
        transitionDuration: const Duration(milliseconds: 100),
        transitionsBuilder: (_, opacity, __, child) =>
            FadeTransition(opacity: opacity, child: child),
      );
}
