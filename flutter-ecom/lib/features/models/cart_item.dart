class CartModel {
  final String productID;
  final double price;
  final int quantity;

  CartModel({
    required this.productID,
    required this.price,
    required this.quantity,
  });

  Map<String, dynamic> toJson() {
    return {
      'product_id': productID,
      'price': price,
      'quantity': quantity,
    };
  }

  CartModel copyWith({
    String? productID,
    double? price,
    int? quantity,
  }) {
    return CartModel(
        productID: productID ?? this.productID,
        price: price ?? this.price,
        quantity: quantity ?? this.quantity);
  }
}
