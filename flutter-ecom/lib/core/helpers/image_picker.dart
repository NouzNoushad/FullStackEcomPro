import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ImagePickerHelper {
  // image picker
  Future<String> imagePicker(
      {required BuildContext context, required ImageSource source}) async {
    ImagePicker picker = ImagePicker();
    final XFile? image = await picker.pickImage(source: source);

    if (image != null) {
      return image.path;
    }
    return '';
  }
}
