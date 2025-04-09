import 'package:flutter/material.dart';

import 'config/routes/app_constants.dart';
import 'config/routes/app_routes.dart';
import 'config/theme/app_theme.dart';
import 'core/utils/strings.dart';
import 'features/presentation/bloc/bloc_widget.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocWidget(
      child: MaterialApp(
        title: AppStrings.appName,
        theme: AppTheme.theme,
        debugShowCheckedModeBanner: false,
        initialRoute: RouteConstants.splashScreen,
        onGenerateRoute: AppRoutes.onGenerateRoute,
      ),
    );
  }
}
