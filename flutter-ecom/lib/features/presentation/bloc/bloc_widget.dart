import 'package:ecom_pro/features/presentation/bloc/cart_cubit/cart_cubit.dart';
import 'package:ecom_pro/features/presentation/bloc/login_cubit/login_cubit.dart';
import 'package:ecom_pro/features/presentation/bloc/product_cubit/product_cubit.dart';
import 'package:ecom_pro/features/presentation/bloc/signup_cubit/signup_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class BlocWidget extends StatelessWidget {
  const BlocWidget({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (context) => ProductCubit(),
        ),
        BlocProvider(
          create: (context) => SignupCubit(),
        ),
        BlocProvider(
          create: (context) => LoginCubit(),
        ),
        BlocProvider(
          create: (context) => CartCubit(),
        ),
      ],
      child: child,
    );
  }
}
