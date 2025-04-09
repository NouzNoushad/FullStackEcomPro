import 'package:ecom_pro/core/helpers/secure_storage.dart';
import 'package:ecom_pro/core/utils/colors.dart';
import 'package:ecom_pro/core/utils/extensions.dart';
import 'package:ecom_pro/features/presentation/screens/home/home_screen.dart';
import 'package:ecom_pro/features/presentation/screens/login/login.dart';
import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  void _checkToken() async {
    SecureStorage storage = SecureStorage();
    String? token = await storage.getFromStorage('token');
    Future.delayed(Duration(seconds: 1), () {
      if (!mounted) return;
      if (token != null && token != "") {
        context.pushReplacementNavigation(HomeScreen());
      } else {
        context.pushReplacementNavigation(LoginScreen());
      }
    });
  }

  @override
  void initState() {
    super.initState();

    _checkToken();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryColor,
      body: Center(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircleAvatar(
              radius: 30,
              backgroundColor: AppColors.primaryLightColor,
              child: Text(
                "EP",
                style: TextStyle(
                  fontSize: 25,
                  color: AppColors.whiteColor,
                ),
              ),
            ),
            SizedBox(
              width: 15,
            ),
            Text(
              "Ecom Products",
              style: TextStyle(
                fontSize: 25,
                color: AppColors.whiteColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
