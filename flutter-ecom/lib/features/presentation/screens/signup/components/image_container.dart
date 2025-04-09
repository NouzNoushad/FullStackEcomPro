import 'package:ecom_pro/core/utils/colors.dart';
import 'package:flutter/material.dart';

class ImageContainer extends StatelessWidget {
  final String title;
  final IconData icon;
  final double radius;
  final void Function()? onTap;
  const ImageContainer(
      {super.key,
      required this.title,
      required this.icon,
      required this.onTap,
      required this.radius});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          CircleAvatar(
            backgroundColor: AppColors.primaryColor,
            radius: radius,
            child: Icon(
              icon,
              color: AppColors.whiteColor,
              size: 25,
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          Text(
            title,
            style: const TextStyle(
              color: AppColors.blackColor,
            ),
          )
        ],
      ),
    );
  }
}
