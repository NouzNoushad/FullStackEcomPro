import 'dart:io';

import 'package:dio/dio.dart';
import 'package:ecom_pro/core/utils/extensions.dart';
import 'package:ecom_pro/features/models/response/delete_cart.dart';
import 'package:ecom_pro/features/models/response/get_products.dart';
import 'package:ecom_pro/features/models/response/login_response.dart';
import 'package:ecom_pro/features/models/user_model.dart';
import 'package:flutter/material.dart';
import 'package:http_parser/http_parser.dart';

import '../../features/models/cart_item.dart';
import '../../features/models/response/create_account.dart';
import '../../features/models/response/create_cart.dart';
import '../../features/models/response/get_carts.dart';
import '../../features/models/response/get_user.dart';
import '../../features/models/response/product_by_id.dart';
import '../utils/constants.dart';
import 'status_code.dart';

class BaseClient {
  static final dio = Dio()
    ..options = BaseOptions(
      connectTimeout: Duration(seconds: 30),
      receiveTimeout: Duration(seconds: 30),
    )
    ..interceptors.add(LogInterceptor(
        request: true,
        requestHeader: true,
        responseBody: true,
        requestBody: true));

  // get products
  static Future<GetProductResponse?> getProducts(String url) async {
    var response = await dio.get(url);
    if (response.statusCode == StatusCode.ok) {
      return GetProductResponse.fromJson(response.data);
    } else {
      Handler.handleResponse(response);
    }
    return null;
  }

  // get product by id
  static Future<GetProductByIDResponse?> getProductByID(String url) async {
    var response = await dio.get(url);
    if (response.statusCode == StatusCode.ok) {
      return GetProductByIDResponse.fromJson(response.data);
    } else {
      Handler.handleResponse(response);
    }
    return null;
  }

  // set account
  static Future<FormData> setUserAccount(UserModel userModel) async {
    var formData = FormData.fromMap({
      'full_name': userModel.name,
      'email': userModel.email,
      'phone': userModel.phone,
      'password': userModel.password,
      'role': 'customer',
    });

    if (userModel.image != null) {
      final filePath = userModel.image?.imagePath ?? '';
      final file = File(filePath);

      if (await file.exists()) {
        formData.files.add(MapEntry(
            'image',
            await MultipartFile.fromFile(filePath,
                contentType: MediaType('image', 'jpg'))));
        logger('////////// file exists: $filePath');
      } else {
        logger('////////// file doesnot exists: $filePath');
      }
    }
    return formData;
  }

  // create account
  static Future<CreateAccountResponse?> createAccount(
      String url, UserModel userModel) async {
    try {
      var formData = await setUserAccount(userModel);
      var response = await dio.post(url,
          data: formData, options: Options(contentType: 'multipart/form-data'));
      if (response.statusCode == StatusCode.ok ||
          response.statusCode == StatusCode.created) {
        logger('////////////// response: ${response.data}');
        return CreateAccountResponse.fromJson(response.data);
      }
    } on DioException catch (e) {
      if (e.type == DioExceptionType.connectionError) {
        throw Exception('Network error');
      } else {
        throw Exception('Error: ${e.message}');
      }
    }
    return null;
  }

  // login account
  static Future<LoginResponse?> loginAccount(
      BuildContext context, String url, LoginModel loginModel) async {
    try {
      var formData = FormData.fromMap({
        'email': loginModel.email,
        'password': loginModel.password,
      });
      var response = await dio.post(url,
          data: formData, options: Options(contentType: 'multipart/form-data'));
      if (response.statusCode == StatusCode.ok ||
          response.statusCode == StatusCode.created) {
        return LoginResponse.fromJson(response.data);
      }
    } on DioException catch (e) {
      if (e.type == DioExceptionType.connectionError) {
        throw Exception('Network error');
      } else {
        // throw Exception('Error: ${e.message}');
        if (!context.mounted) return null;
        context.showToast(e.response?.data['error']);
      }
    }
    return null;
  }

  // get user by email
  static Future<GetAccountResponse?> getUserByEmailID(
      BuildContext context, String url, String token) async {
    try {
      var response = await dio.get(url,
          options: Options(
              contentType: 'multipart/form-data',
              headers: {'x-jwt-token': token}));
      if (response.statusCode == StatusCode.ok ||
          response.statusCode == StatusCode.created) {
        return GetAccountResponse.fromJson(response.data);
      }
    } on DioException catch (e) {
      if (e.type == DioExceptionType.connectionError) {
        throw Exception('Network error');
      } else {
        // throw Exception('Error: ${e.message}');
        if (!context.mounted) return null;
        context.showToast(e.response?.data['error']);
      }
    }
    return null;
  }

  // add to cart
  static Future<CreateCartResponse?> addToCart(
      BuildContext context, String url, CartModel cartModel) async {
    try {
      var formData = FormData.fromMap({
        'product_id': cartModel.productID,
        'price': cartModel.price,
        'quantity': cartModel.quantity,
      });
      var response = await dio.post(url,
          data: formData, options: Options(contentType: 'multipart/form-data'));
      if (response.statusCode == StatusCode.ok ||
          response.statusCode == StatusCode.created) {
        logger('//// response: $response');
        return CreateCartResponse.fromJson(response.data);
      }
    } on DioException catch (e) {
      if (e.type == DioExceptionType.connectionError) {
        throw Exception('Network error');
      } else {
        // throw Exception('Error: ${e.message}');
        if (!context.mounted) return null;
        context.showToast(e.response?.data['error']);
      }
    }
    return null;
  }

  // get carts
  static Future<GetCartsResponse?> getCarts(String url) async {
    var response = await dio.get(url);
    if (response.statusCode == StatusCode.ok) {
      return GetCartsResponse.fromJson(response.data);
    } else {
      Handler.handleResponse(response);
    }
    return null;
  }

  // delete cart
  static Future<DeleteCartResponse?> deleteCart(String url) async {
    var response = await dio.delete(url);
    if (response.statusCode == StatusCode.ok) {
      return DeleteCartResponse.fromJson(response.data);
    } else {
      Handler.handleResponse(response);
    }
    return null;
  }
}

class Handler {
  static void handleResponse(Response response) {
    switch (response.statusCode) {
      case StatusCode.badRequest:
        throw Exception("Bad request");
      case StatusCode.notFound:
        throw Exception("Not found");
      case StatusCode.invalidRequest:
        throw Exception("Invalid request");
      case StatusCode.internalServerError:
        throw Exception("Internal server error");
      default:
        throw Exception("Unable to fetch data");
    }
  }
}
