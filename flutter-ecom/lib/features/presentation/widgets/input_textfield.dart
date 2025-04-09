import 'package:ecom_pro/core/utils/colors.dart';
import 'package:flutter/material.dart';

class InputTextFormField extends StatelessWidget {
  final String? hintText;
  final IconData? icon;
  final IconData? suffixIcon;
  final FocusNode? focusNode;
  final TextEditingController? controller;
  final void Function()? onSuffixIconTap;
  final String? Function(String?)? validator;
  final void Function(String?)? onSaved;
  final void Function(PointerDownEvent)? onTapOutside;
  final TextInputType? keyboardType;
  const InputTextFormField(
      {super.key,
      this.hintText,
      this.icon,
      this.suffixIcon,
      this.onSuffixIconTap,
      this.focusNode,
      this.controller,
      this.validator,
      this.onSaved,
      this.onTapOutside,
      this.keyboardType});

  @override
  Widget build(BuildContext context) {
    OutlineInputBorder kOutlineInputBorder(Color color) => OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(
            width: 1,
            color: color,
          ),
        );
    return TextFormField(
      style: const TextStyle(
        color: AppColors.blackColor,
      ),
      controller: controller,
      validator: validator,
      onSaved: onSaved,
      focusNode: focusNode,
      onTapOutside: onTapOutside,
      keyboardType: keyboardType,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      cursorColor: AppColors.blackColor,
      decoration: InputDecoration(
        prefixIcon: Icon(
          icon,
          size: 22,
          color: AppColors.primaryColor,
        ),
        suffixIcon: InkWell(
          onTap: onSuffixIconTap,
          child: Icon(
            suffixIcon,
            size: 22,
            color: AppColors.blackColor,
          ),
        ),
        hintText: hintText,
        hintStyle: const TextStyle(
          color: AppColors.blackColor,
        ),
        errorStyle: const TextStyle(
          color: Colors.red,
        ),
        enabledBorder: kOutlineInputBorder(Colors.grey),
        focusedBorder: kOutlineInputBorder(Colors.grey),
        errorBorder: kOutlineInputBorder(Colors.red),
        focusedErrorBorder: kOutlineInputBorder(Colors.red),
      ),
    );
  }
}
