import 'package:ecom_pro/core/utils/colors.dart';
import 'package:ecom_pro/core/utils/extensions.dart';
import 'package:ecom_pro/features/presentation/screens/login/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../bloc/signup_cubit/signup_cubit.dart';
import '../../widgets/input_button.dart';
import '../../widgets/input_textfield.dart';
import '../../widgets/redirect_to.dart';
import 'components/user_image.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  late GlobalKey<FormState> _formKey;
  late SignupCubit _signupCubit;

  @override
  void initState() {
    _formKey = GlobalKey<FormState>();
    _signupCubit = context.read<SignupCubit>();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgColor,
      extendBody: true,
      resizeToAvoidBottomInset: true,
      body: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: 15,
          vertical: 15,
        ),
        child: Form(
          key: _formKey,
          child: ListView(
            physics: BouncingScrollPhysics(),
            children: [
              Container(
                height: context.height * 0.8,
                color: Colors.transparent,
                child: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      UserImage(),
                      SizedBox(
                        height: 20,
                      ),
                      InputTextFormField(
                        controller: _signupCubit.nameController,
                        hintText: 'Name',
                        icon: Icons.person,
                        validator: _signupCubit.nameValidator,
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      InputTextFormField(
                        controller: _signupCubit.emailController,
                        hintText: 'Email',
                        icon: Icons.email,
                        validator: _signupCubit.emailValidator,
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      InputTextFormField(
                        controller: _signupCubit.phoneController,
                        hintText: 'Phone',
                        icon: Icons.phone,
                        validator: _signupCubit.phoneValidator,
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      InputTextFormField(
                        controller: _signupCubit.passwordController,
                        hintText: 'Password',
                        icon: Icons.lock,
                        validator: _signupCubit.passwordValidator,
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      RedirectTo(
                        message: 'Already have an account',
                        label: 'Login',
                        onTap: () {
                          context.pushNavigation(LoginScreen());
                        },
                      ),
                    ],
                  ),
                ),
              ),
              InputButton(
                label: 'Sign up',
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _signupCubit.createAccount(context: context);
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
    );
  }
}
