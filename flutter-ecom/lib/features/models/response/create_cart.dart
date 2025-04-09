class CreateCartResponse {
  Data? data;
  String? message;

  CreateCartResponse({this.data, this.message});

  CreateCartResponse.fromJson(Map<String, dynamic> json) {
    data = json['data'] != null ? Data.fromJson(json['data']) : null;
    message = json['message'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (this.data != null) {
      data['data'] = this.data!.toJson();
    }
    data['message'] = message;
    return data;
  }
}

class Data {
  String? id;
  String? productId;
  double? price;
  int? quantity;
  double? totalPrice;
  String? createdAt;
  String? updatedAt;

  Data(
      {this.id,
      this.productId,
      this.price,
      this.quantity,
      this.totalPrice,
      this.createdAt,
      this.updatedAt});

  Data.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    productId = json['product_id'];
    price = json['price'].toDouble();
    quantity = json['quantity'];
    totalPrice = json['total_price'].toDouble();
    createdAt = json['created_at'];
    updatedAt = json['updated_at'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['product_id'] = productId;
    data['price'] = price;
    data['quantity'] = quantity;
    data['total_price'] = totalPrice;
    data['created_at'] = createdAt;
    data['updated_at'] = updatedAt;
    return data;
  }
}
