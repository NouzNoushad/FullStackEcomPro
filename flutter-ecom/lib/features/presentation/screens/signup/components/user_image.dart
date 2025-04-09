import 'dart:io';

import 'package:ecom_pro/core/utils/extensions.dart';
import 'package:ecom_pro/features/presentation/bloc/signup_cubit/signup_cubit.dart';
import 'package:ecom_pro/features/presentation/screens/signup/components/image_bottom_sheet.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../../core/utils/colors.dart';

class UserImage extends StatelessWidget {
  const UserImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Stack(
        children: [
          BlocBuilder<SignupCubit, SignupState>(
            builder: (context, state) {
              return state.selectedImage != ''
                  ? ClipOval(
                      child: CircleAvatar(
                        radius: context.height * 0.1,
                        child: Image.file(File(state.selectedImage)),
                      ),
                    )
                  : CircleAvatar(
                      radius: context.height * 0.1,
                      backgroundColor: AppColors.primaryLightDarkColor,
                      child: Icon(
                        Icons.person_rounded,
                        size: context.height * 0.15,
                        color: AppColors.whiteColor,
                      ),
                    );
            },
          ),
          Positioned(
            right: 0,
            bottom: 0,
            child: GestureDetector(
              onTap: () {
                imageBottomSheet(context);
              },
              child: CircleAvatar(
                backgroundColor: AppColors.primaryColor,
                radius: context.height * 0.03,
                child: const Icon(
                  Icons.photo_camera,
                  color: AppColors.whiteColor,
                  size: 25,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
