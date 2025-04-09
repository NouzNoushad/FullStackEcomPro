class UserModel {
  final String name;
  final String email;
  final String phone;
  final String password;
  final UserImage? image;

  UserModel({
    required this.name,
    required this.email,
    required this.password,
    required this.phone,
    required this.image,
  });
}

class UserImage {
  final String imageName;
  final String imagePath;

  UserImage({
    required this.imageName,
    required this.imagePath,
  });
}

class LoginModel {
  final String email;
  final String password;

  LoginModel({
    required this.email,
    required this.password,
  });
}
