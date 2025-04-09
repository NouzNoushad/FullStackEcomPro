import 'package:bloc/bloc.dart';
import 'package:ecom_pro/core/api/end_points.dart';
import 'package:ecom_pro/core/helpers/image_picker.dart';
import 'package:ecom_pro/core/utils/extensions.dart';
import 'package:ecom_pro/features/models/response/create_account.dart';
import 'package:ecom_pro/features/models/user_model.dart';
import 'package:ecom_pro/features/presentation/screens/login/login.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../../../../core/api/base_client.dart';
import '../../../../core/helpers/validator_helper.dart';
import '../../../../core/utils/constants.dart';

part 'signup_state.dart';

class SignupCubit extends Cubit<SignupState> {
  SignupCubit() : super(SignupState(selectedImage: ''));

  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  TextEditingController get nameController => _nameController;
  TextEditingController get emailController => _emailController;
  TextEditingController get phoneController => _phoneController;
  TextEditingController get passwordController => _passwordController;

  String _selectedImage = '';

  final ValidatorHelper _validatorHelper = ValidatorHelper();

  String? nameValidator(String? value) {
    return _validatorHelper.nameValidator(_nameController.text);
  }

  String? emailValidator(String? value) {
    return _validatorHelper.emailValidator(_emailController.text);
  }

  String? phoneValidator(String? value) {
    return _validatorHelper.phoneValidator(_phoneController.text);
  }

  String? passwordValidator(String? value) {
    return _validatorHelper.passwordValidator(_passwordController.text);
  }

  // reset user
  void resetUser() {
    _nameController.text = "";
    _emailController.text = "";
    _phoneController.text = "";
    _passwordController.text = "";
    emit(state.copyWith(selectedImage: ''));
  }

  void onChangeSelectedImage({
    required BuildContext context,
    required ImageSource source,
  }) async {
    Navigator.pop(context);
    ImagePickerHelper imagePickerHelper = ImagePickerHelper();
    String path =
        await imagePickerHelper.imagePicker(context: context, source: source);
    logger('////////// camera path: $path');
    _selectedImage = path;
    emit(state.copyWith(selectedImage: _selectedImage));
  }

  // create account
  void createAccount({
    required BuildContext context,
  }) async {
    String url = '${EndPoints.baseUrl}/${EndPoints.account}';

    String imagePath = _selectedImage;
    String imageName = _selectedImage.split('/').last;

    UserImage image = UserImage(imagePath: imagePath, imageName: imageName);

    UserModel userModel = UserModel(
      name: _nameController.text.trim(),
      email: _emailController.text.trim(),
      phone: _phoneController.text.trim(),
      password: _passwordController.text.trim(),
      image: image,
    );

    logger(
        '//////////// user name: ${userModel.name}, email: ${userModel.email}, phone: ${userModel.phone}, pass: ${userModel.password}, imgPath: ${userModel.image?.imagePath}, imgName: ${userModel.image?.imageName},');

    CreateAccountResponse? response =
        await BaseClient.createAccount(url, userModel);
    if (response != null) {
      if (!context.mounted) return;
      context.showToast(response.message ?? "");
      context.pushReplacementNavigation(LoginScreen());
      Future.delayed(Duration(seconds: 1), () {
        resetUser();
      });
    }
  }
}
