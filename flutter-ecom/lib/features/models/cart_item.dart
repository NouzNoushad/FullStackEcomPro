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
}
