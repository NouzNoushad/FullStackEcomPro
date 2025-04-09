class GetCartsResponse {
  List<Cart>? data;
  String? items;

  GetCartsResponse({this.data, this.items});

  GetCartsResponse.fromJson(Map<String, dynamic> json) {
    if (json['data'] != null) {
      data = <Cart>[];
      json['data'].forEach((v) {
        data!.add(Cart.fromJson(v));
      });
    }
    items = json['items'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (this.data != null) {
      data['data'] = this.data!.map((v) => v.toJson()).toList();
    }
    data['items'] = items;
    return data;
  }
}

class Cart {
  String? id;
  String? productId;
  double? price;
  int? quantity;
  double? totalPrice;
  String? createdAt;
  String? updatedAt;

  Cart(
      {this.id,
      this.productId,
      this.price,
      this.quantity,
      this.totalPrice,
      this.createdAt,
      this.updatedAt});

  Cart.fromJson(Map<String, dynamic> json) {
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
