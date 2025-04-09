import 'response/get_carts.dart';
import 'response/product_by_id.dart';

class CartProduct {
  final ProductData? product;
  final Cart? cart;

  CartProduct({
    required this.product,
    required this.cart,
  });
}
