import 'package:ecom_pro/core/utils/colors.dart';
import 'package:ecom_pro/core/utils/extensions.dart';
import 'package:ecom_pro/features/presentation/bloc/signup_cubit/signup_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:image_picker/image_picker.dart';

import 'image_container.dart';

imageBottomSheet(context) {
  showModalBottomSheet(
      context: context,
      builder: (context) {
        SignupCubit signupCubit = context.read<SignupCubit>();
        return Container(
          height: context.height * 0.2,
          padding: const EdgeInsets.all(15.0),
          color: AppColors.bgColor,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Text(
                'Profile Image',
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                    color: AppColors.blackColor),
              ),
              const SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ImageContainer(
                    title: 'Camera',
                    icon: Icons.photo_camera,
                    radius: context.height * 0.030,
                    onTap: () async {
                      signupCubit.onChangeSelectedImage(context: context, source: ImageSource.camera);
                    },
                  ),
                  ImageContainer(
                    title: 'Gallery',
                    icon: Icons.image,
                    radius: context.height * 0.030,
                    onTap: () async {
                      signupCubit.onChangeSelectedImage(
                          context: context, source: ImageSource.gallery);
                    },
                  ),
                ],
              ),
            ],
          ),
        );
      });
}
