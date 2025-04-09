part of 'cart_cubit.dart';

class CartState {
  CartState({
    required this.isStorageLoading,
    required this.cartProducts,
    required this.total,
  });

   final bool isStorageLoading;
  final List<CartProduct?>? cartProducts;
  final double total;

  CartState copyWith({
    bool? isStorageLoading,
    List<CartProduct?>? cartProducts,
    double? total,
  }) {
    return CartState(
      isStorageLoading: isStorageLoading ?? this.isStorageLoading,
      cartProducts: cartProducts ?? this.cartProducts,
      total: total ?? this.total,
    );
  }
}
