import 'package:flutter/material.dart';

import '../../../core/utils/colors.dart';

class RedirectTo extends StatelessWidget {
  const RedirectTo(
      {super.key, required this.message, required this.label, this.onTap});
  final String message;
  final String label;
  final void Function()? onTap;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerRight,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 15,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('$message?'),
            SizedBox(
              width: 5,
            ),
            InkWell(
                onTap: onTap,
                child: Text(
                  label,
                  style: TextStyle(
                    color: AppColors.primaryLightDarkColor,
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ))
          ],
        ),
      ),
    );
  }
}
