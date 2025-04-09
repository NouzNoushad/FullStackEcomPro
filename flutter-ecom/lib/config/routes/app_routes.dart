import 'package:ecom_pro/features/presentation/screens/cart/cart.dart';
import 'package:ecom_pro/features/presentation/screens/login/login.dart';
import 'package:ecom_pro/features/presentation/screens/signup/signup.dart';
import 'package:ecom_pro/features/presentation/screens/splash/splash_screen.dart';
import 'package:flutter/material.dart';

import '../../core/utils/strings.dart';
import '../../features/presentation/screens/home/home_screen.dart';
import 'app_constants.dart';

class AppRoutes {
  static Route onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case RouteConstants.splashScreen:
        return MaterialPageRoute(
            settings: const RouteSettings(name: RouteConstants.splashScreen),
            builder: (context) => const SplashScreen());
      case RouteConstants.homeScreen:
        return MaterialPageRoute(
            settings: const RouteSettings(name: RouteConstants.homeScreen),
            builder: (context) => const HomeScreen());
      case RouteConstants.signupScreen:
        return MaterialPageRoute(
            settings: const RouteSettings(name: RouteConstants.signupScreen),
            builder: (context) => const SignupScreen());
      case RouteConstants.loginScreen:
        return MaterialPageRoute(
            settings: const RouteSettings(name: RouteConstants.loginScreen),
            builder: (context) => const LoginScreen());
      case RouteConstants.cartScreen:
        return MaterialPageRoute(
            settings: const RouteSettings(name: RouteConstants.cartScreen),
            builder: (context) => const CartScreen());
      default:
        return MaterialPageRoute(
            builder: (context) => const Scaffold(
                  body: Center(
                    child: Text(AppStrings.pageNotFound),
                  ),
                ));
    }
  }
}
