import 'package:ecom_pro/core/utils/colors.dart';
import 'package:ecom_pro/core/utils/extensions.dart';
import 'package:ecom_pro/features/presentation/bloc/login_cubit/login_cubit.dart';
import 'package:ecom_pro/features/presentation/screens/signup/signup.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../widgets/input_button.dart';
import '../../widgets/input_textfield.dart';
import '../../widgets/redirect_to.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  late GlobalKey<FormState> _formKey;
  late LoginCubit _loginCubit;

  @override
  void initState() {
    _formKey = GlobalKey<FormState>();
    _loginCubit = context.read<LoginCubit>();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgColor,
      body: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: 15,
          vertical: 15,
        ),
        child: Center(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                InputTextFormField(
                  controller: _loginCubit.emailController,
                  hintText: 'Email',
                  icon: Icons.email,
                  validator: _loginCubit.emailValidator,
                ),
                SizedBox(
                  height: 10,
                ),
                InputTextFormField(
                  controller: _loginCubit.passwordController,
                  hintText: 'Password',
                  icon: Icons.lock,
                  validator: _loginCubit.passwordValidator,
                ),
                SizedBox(
                  height: 10,
                ),
                RedirectTo(
                  message: 'Not a member yet',
                  label: 'Sign up',
                  onTap: () {
                    context.pushNavigation(SignupScreen());
                  },
                ),
                SizedBox(
                  height: 30,
                ),
                InputButton(
                  label: 'Login',
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      _loginCubit.loginAccount(context: context);
                    }
                  },
                ),
                SizedBox(
                  height: 10,
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
