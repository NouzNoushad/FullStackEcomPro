import 'package:bloc/bloc.dart';
import 'package:ecom_pro/core/utils/extensions.dart';
import 'package:ecom_pro/features/models/cart_item.dart';
import 'package:ecom_pro/features/models/cart_product.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../core/api/base_client.dart';
import '../../../../core/api/end_points.dart';
import '../../../../core/utils/constants.dart';
import '../../../models/response/create_cart.dart';
import '../../../models/response/get_carts.dart';
import '../../../models/response/product_by_id.dart';

part 'cart_state.dart';

class CartCubit extends Cubit<CartState> {
  CartCubit()
      : super(CartState(isStorageLoading: false, cartProducts: [], total: 0.0));

  List<Cart>? _carts = [];

  // add to cart
  void addToCart({
    required BuildContext context,
    required String productID,
    required double price,
    required int quantity,
  }) async {
    String url = '${EndPoints.baseUrl}/${EndPoints.cart}';

    CartModel cartModel =
        CartModel(productID: productID, price: price, quantity: quantity);

    logger(
        '//////////// cart product id: ${cartModel.productID}, price: ${cartModel.price}, quantity: ${cartModel.quantity},,');

    CreateCartResponse? response =
        await BaseClient.addToCart(context, url, cartModel);
    if (response != null) {
      if (!context.mounted) return;
      context.showToast(response.message ?? "");
    }
  }

  // product by id
  Future<ProductData?> getProductByID(String id) async {
    String url = "${EndPoints.baseUrl}/${EndPoints.product}/$id";
    var productResponse = await BaseClient.getProductByID(url);
    if (productResponse != null) {
      return productResponse.data;
    }
    return null;
  }

  // delete cart
  Future<void> deleteCart(
      {required BuildContext context, required String id}) async {
    String url = "${EndPoints.baseUrl}/${EndPoints.cart}/$id";
    var cartResponse = await BaseClient.deleteCart(url);
    logger('//////////////// delete cart: ${cartResponse?.message}');
    if (cartResponse != null) {
      if (!context.mounted) return;
      context.showToast("Cart deleted successfully");
      getCarts(context: context);
    }
  }

  // total cart
  void calculateCartTotal({required List<CartProduct?>? carts}) {
    double total = carts?.fold(0, (acc, prev) {
          double cartAcc = acc ?? 0.0;
          double cartPrev = prev?.cart?.totalPrice?.toDouble() ?? 0.0;
          logger('///////// total ${cartAcc + cartPrev}');
          return cartAcc + cartPrev;
        }) ??
        0.0;

    emit(state.copyWith(total: total));
  }

  // get carts
  void getCarts({
    required BuildContext context,
  }) async {
    emit(state.copyWith(isStorageLoading: true));
    List<CartProduct?> cartProducts = [];
    String url = "${EndPoints.baseUrl}/${EndPoints.cart}";
    var cartResponse = await BaseClient.getCarts(url);
    if (cartResponse != null) {
      _carts = cartResponse.data;

      for (Cart cart in _carts ?? []) {
        ProductData? product = await getProductByID(cart.productId ?? '');
        CartProduct cartProduct = CartProduct(product: product, cart: cart);
        cartProducts.add(cartProduct);
      }
      logger(
          '////////////==============]]]]]]]]]]]]]]]]]]>>>>>>>> cartproducts: ${cartProducts.length}');
      calculateCartTotal(carts: cartProducts);

      emit(state.copyWith(isStorageLoading: false, cartProducts: cartProducts));
    } else {
      emit(state.copyWith(isStorageLoading: false));
    }
  }
}
