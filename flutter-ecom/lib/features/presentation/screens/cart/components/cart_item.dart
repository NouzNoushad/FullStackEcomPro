import 'package:ecom_pro/features/models/cart_product.dart';
import 'package:ecom_pro/features/presentation/bloc/cart_cubit/cart_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../../core/api/end_points.dart';
import '../../../../../core/utils/colors.dart';

class CartItem extends StatelessWidget {
  const CartItem({super.key, required this.cartProduct});
  final CartProduct? cartProduct;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              border: Border.all(),
            ),
            padding: EdgeInsets.all(8),
            child: Row(
              children: [
                SizedBox(
                  height: 100,
                  width: 100,
                  child: Image.network(
                    '${EndPoints.baseUrl}/uploads/${cartProduct?.product?.thumbnailName}',
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                SizedBox(
                  width: 8,
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        cartProduct?.product?.name ?? '',
                        style: TextStyle(
                          fontSize: 15.5,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      Text(
                        cartProduct?.product?.category ?? '',
                        style: TextStyle(
                          fontSize: 14,
                        ),
                      ),
                      SizedBox(
                        height: 5,
                      ),
                      Text(
                        '\$${cartProduct?.product?.price}',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            )),
        Positioned(
          right: 8,
          top: 8,
          child: GestureDetector(
              onTap: () {
                context.read<CartCubit>().deleteCart(
                    context: context, id: cartProduct?.cart?.id ?? '');
              },
              child: CircleAvatar(
                radius: 12,
                backgroundColor: AppColors.primaryColor,
                child: Icon(
                  Icons.close,
                  size: 20,
                  color: AppColors.whiteColor,
                ),
              )),
        ),
        Positioned(
          right: 0,
          bottom: 0,
          child: ClipRRect(
            borderRadius: BorderRadius.only(
              bottomRight: Radius.circular(8),
            ),
            child: Container(
              height: 28,
              decoration: BoxDecoration(
                  border: Border.all(color: AppColors.primaryColor),
                  borderRadius: BorderRadius.only(
                    bottomRight: Radius.circular(50),
                  )),
              child: Row(
                children: [
                  InkWell(
                    onTap: () {},
                    child: Container(
                      height: 28,
                      width: 28,
                      decoration: BoxDecoration(color: AppColors.primaryColor),
                      child: Icon(
                        Icons.add,
                        size: 22,
                        color: AppColors.whiteColor,
                      ),
                    ),
                  ),
                  Container(
                    width: 50,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(color: AppColors.whiteColor),
                    child: Text(
                      '1',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ),
                  InkWell(
                    onTap: () {},
                    child: Container(
                      height: 28,
                      width: 28,
                      decoration: BoxDecoration(color: AppColors.primaryColor),
                      child: Icon(
                        Icons.remove,
                        size: 22,
                        color: AppColors.whiteColor,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
