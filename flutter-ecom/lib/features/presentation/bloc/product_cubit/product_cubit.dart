import 'package:bloc/bloc.dart';
import 'package:ecom_pro/features/models/response/get_products.dart';
import '../../../../core/api/base_client.dart';
import '../../../../core/api/end_points.dart';

part 'product_state.dart';

class ProductCubit extends Cubit<ProductState> {
  ProductCubit()
      : super(ProductState(
          isStorageLoading: false,
          products: [],
        ));

  List<Product>? _products = [];

  // get products
  void getProducts() async {
    emit(state.copyWith(isStorageLoading: true));
    String url = "${EndPoints.baseUrl}/${EndPoints.product}";
    var productResponse = await BaseClient.getProducts(url);
    if (productResponse != null) {
      _products = productResponse.data;

      emit(state.copyWith(isStorageLoading: false, products: _products));
    } else {
      emit(state.copyWith(isStorageLoading: false));
    }
  }
}
