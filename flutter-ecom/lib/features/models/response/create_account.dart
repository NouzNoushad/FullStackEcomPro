class CreateAccountResponse {
  final User? data;
  final String? message;

  CreateAccountResponse({this.data, this.message});

  factory CreateAccountResponse.fromJson(Map<String, dynamic> json) {
    return CreateAccountResponse(
      data: json['data'] != null ? User.fromJson(json['data']) : null,
      message: json['message'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'data': data?.toJson(),
      'message': message,
    };
  }
}

class User {
  final String? id;
  final String? fullName;
  final String? email;
  final String? phone;
  final String? passwordHash;
  final String? role;
  final String? imageName;
  final String? imagePath;
  final List<Address>? addresses;
  final String? createdAt;
  final String? updatedAt;

  User({
    this.id,
    this.fullName,
    this.email,
    this.phone,
    this.passwordHash,
    this.role,
    this.imageName,
    this.imagePath,
    this.addresses,
    this.createdAt,
    this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      fullName: json['full_name'],
      email: json['email'],
      phone: json['phone'],
      passwordHash: json['password_hash'],
      role: json['role'],
      imageName: json['image_name'],
      imagePath: json['image_path'],
      addresses: json['addresses'] != null
          ? (json['addresses'] as List).map((v) => Address.fromJson(v)).toList()
          : [],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'full_name': fullName,
      'email': email,
      'phone': phone,
      'password_hash': passwordHash,
      'role': role,
      'image_name': imageName,
      'image_path': imagePath,
      'addresses': addresses?.map((v) => v.toJson()).toList(),
      'created_at': createdAt,
      'updated_at': updatedAt,
    };
  }
}

class Address {
  String? id;
  String? userId;
  String? fullName;
  String? phone;
  String? street;
  String? city;
  String? state;
  String? country;
  String? zipCode;
  bool? isDefault;
  String? updatedAt;
  String? createdAt;

  Address(
      {this.id,
      this.userId,
      this.fullName,
      this.phone,
      this.street,
      this.city,
      this.state,
      this.country,
      this.zipCode,
      this.isDefault,
      this.updatedAt,
      this.createdAt});

  Address.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    userId = json['user_id'];
    fullName = json['full_name'];
    phone = json['phone'];
    street = json['street'];
    city = json['city'];
    state = json['state'];
    country = json['country'];
    zipCode = json['zip_code'];
    isDefault = json['is_default'];
    updatedAt = json['updated_at'];
    createdAt = json['created_at'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['user_id'] = userId;
    data['full_name'] = fullName;
    data['phone'] = phone;
    data['street'] = street;
    data['city'] = city;
    data['state'] = state;
    data['country'] = country;
    data['zip_code'] = zipCode;
    data['is_default'] = isDefault;
    data['updated_at'] = updatedAt;
    data['created_at'] = createdAt;
    return data;
  }
}
