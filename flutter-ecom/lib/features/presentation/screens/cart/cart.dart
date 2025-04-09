import 'package:ecom_pro/features/presentation/bloc/cart_cubit/cart_cubit.dart';
import 'package:ecom_pro/features/presentation/screens/cart/components/cart_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../core/utils/colors.dart';
import 'components/cart_total.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({super.key});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  @override
  void initState() {
    super.initState();
    context.read<CartCubit>().getCarts(context: context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.whiteColor,
      appBar: AppBar(
        backgroundColor: AppColors.primaryColor,
        foregroundColor: AppColors.whiteColor,
        title: Text('Cart'),
      ),
      body: SafeArea(child: BlocBuilder<CartCubit, CartState>(
        builder: (context, state) {
          return Column(
            children: [
              Expanded(
                  child: state.isStorageLoading
                      ? Center(
                          child: CircularProgressIndicator(
                            color: Colors.green,
                          ),
                        )
                      : ListView.separated(
                          padding: EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 10,
                          ),
                          itemBuilder: (context, index) {
                            final cartProduct = state.cartProducts?[index];

                            return CartItem(
                              cartProduct: cartProduct,
                            );
                          },
                          separatorBuilder: (context, index) => SizedBox(
                                height: 8,
                              ),
                          itemCount: state.cartProducts?.length ?? 0)),
              CartTotal(
                carts: state.cartProducts ?? [],
              ),
            ],
          );
        },
      )),
    );
  }
}
