import 'package:ecom_pro/core/helpers/secure_storage.dart';
import 'package:ecom_pro/core/utils/colors.dart';
import 'package:ecom_pro/core/utils/extensions.dart';
import 'package:ecom_pro/core/utils/strings.dart';
import 'package:ecom_pro/features/presentation/screens/cart/cart.dart';
import 'package:ecom_pro/features/presentation/screens/login/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../models/response/get_products.dart';
import '../../bloc/product_cubit/product_cubit.dart';
import 'components/product_item.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late ProductCubit _productCubit;

  @override
  void initState() {
    _productCubit = context.read<ProductCubit>();
    _productCubit.getProducts();
    super.initState();
  }

  Future<void> refreshProducts() async {
    _productCubit.getProducts();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgColor,
      appBar: _homeAppBar(),
      body: SafeArea(child: BlocBuilder<ProductCubit, ProductState>(
        builder: (context, state) {
          return state.isStorageLoading
              ? Center(
                  child: CircularProgressIndicator(
                    color: Colors.green,
                  ),
                )
              : state.products != null && state.products!.isNotEmpty
                  ? _buildProducts(products: state.products!)
                  : Center(
                      child: Text('Record no found'),
                    );
        },
      )),
    );
  }

  Widget _buildProducts({
    required List<Product> products,
  }) =>
      RefreshIndicator(
        onRefresh: refreshProducts,
        child: GridView.builder(
            padding: EdgeInsets.symmetric(
              horizontal: 10,
              vertical: 15,
            ),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 8,
                crossAxisSpacing: 8,
                childAspectRatio: 0.7),
            itemCount: products.length,
            itemBuilder: (context, index) {
              final product = products[index];
              return ProductItem(product: product);
            }),
      );

  AppBar _homeAppBar() => AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: AppColors.primaryColor,
        foregroundColor: AppColors.whiteColor,
        title: Text(AppStrings.appName),
        actions: [
          IconButton(
              onPressed: () {
                context.pushNavigation(CartScreen());
              },
              icon: Icon(Icons.shopping_cart)),
          IconButton(
              onPressed: () {
                SecureStorage storage = SecureStorage();
                storage.removeStorage('token');
                context.showToast('Logout');
                context.pushReplacementNavigation(LoginScreen());
              },
              icon: Icon(Icons.power_settings_new)),
        ],
      );
}
