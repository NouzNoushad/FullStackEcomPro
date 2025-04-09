class GetProductResponse {
  List<Product>? data;
  String? items;

  GetProductResponse({this.data, this.items});

  GetProductResponse.fromJson(Map<String, dynamic> json) {
    if (json['data'] != null) {
      data = <Product>[];
      json['data'].forEach((v) {
        data!.add(Product.fromJson(v));
      });
    }
    items = json['items'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (this.data != null) {
      data['data'] = this.data!.map((v) => v.toJson()).toList();
    }
    data['items'] = items;
    return data;
  }
}

class Product {
  String? id;
  String? thumbnailName;
  String? thumbnailPath;
  String? status;
  String? category;
  String? tag;
  String? template;
  String? name;
  String? description;
  num? price;
  String? discountType;
  String? taxClass;
  int? vatAmount;
  String? skuNumber;
  String? barcodeNumber;
  int? onShelf;
  int? onWarehouse;
  bool? allowBackorder;
  bool? inPhysical;
  String? metaTitle;
  String? metaDescription;
  String? metaKeywords;
  Variations? variations;
  List<Media>? media;
  String? createdAt;

  Product(
      {this.id,
      this.thumbnailName,
      this.thumbnailPath,
      this.status,
      this.category,
      this.tag,
      this.template,
      this.name,
      this.description,
      this.price,
      this.discountType,
      this.taxClass,
      this.vatAmount,
      this.skuNumber,
      this.barcodeNumber,
      this.onShelf,
      this.onWarehouse,
      this.allowBackorder,
      this.inPhysical,
      this.metaTitle,
      this.metaDescription,
      this.metaKeywords,
      this.variations,
      this.media,
      this.createdAt});

  Product.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    thumbnailName = json['thumbnail_name'];
    thumbnailPath = json['thumbnail_path'];
    status = json['status'];
    category = json['category'];
    tag = json['tag'];
    template = json['template'];
    name = json['name'];
    description = json['description'];
    price = json['price'];
    discountType = json['discount_type'];
    taxClass = json['tax_class'];
    vatAmount = json['vat_amount'];
    skuNumber = json['sku_number'];
    barcodeNumber = json['barcode_number'];
    onShelf = json['on_shelf'];
    onWarehouse = json['on_warehouse'];
    allowBackorder = json['allow_backorder'];
    inPhysical = json['in_physical'];
    metaTitle = json['meta_title'];
    metaDescription = json['meta_description'];
    metaKeywords = json['meta_keywords'];
    variations = json['variations'] != null
        ? Variations.fromJson(json['variations'])
        : null;
    if (json['media'] != null) {
      media = <Media>[];
      json['media'].forEach((v) {
        media!.add(Media.fromJson(v));
      });
    }
    createdAt = json['created_at'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['thumbnail_name'] = thumbnailName;
    data['thumbnail_path'] = thumbnailPath;
    data['status'] = status;
    data['category'] = category;
    data['tag'] = tag;
    data['template'] = template;
    data['name'] = name;
    data['description'] = description;
    data['price'] = price;
    data['discount_type'] = discountType;
    data['tax_class'] = taxClass;
    data['vat_amount'] = vatAmount;
    data['sku_number'] = skuNumber;
    data['barcode_number'] = barcodeNumber;
    data['on_shelf'] = onShelf;
    data['on_warehouse'] = onWarehouse;
    data['allow_backorder'] = allowBackorder;
    data['in_physical'] = inPhysical;
    data['meta_title'] = metaTitle;
    data['meta_description'] = metaDescription;
    data['meta_keywords'] = metaKeywords;
    if (variations != null) {
      data['variations'] = variations!.toJson();
    }
    if (media != null) {
      data['media'] = media!.map((v) => v.toJson()).toList();
    }
    data['created_at'] = createdAt;
    return data;
  }
}

class Variations {
  List<String>? color;
  List<String>? material;
  List<String>? size;
  List<String>? style;

  Variations({this.color, this.material, this.size, this.style});

  Variations.fromJson(Map<String, dynamic> json) {
    color = json['color'].cast<String>();
    material = json['material'].cast<String>();
    size = json['size'].cast<String>();
    style = json['style'].cast<String>();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['color'] = color;
    data['material'] = material;
    data['size'] = size;
    data['style'] = style;
    return data;
  }
}

class Media {
  String? id;
  String? productId;
  String? mediaFilename;
  String? mediaFilePath;
  String? createdAt;

  Media(
      {this.id,
      this.productId,
      this.mediaFilename,
      this.mediaFilePath,
      this.createdAt});

  Media.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    productId = json['product_id'];
    mediaFilename = json['media_filename'];
    mediaFilePath = json['media_file_path'];
    createdAt = json['created_at'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['product_id'] = productId;
    data['media_filename'] = mediaFilename;
    data['media_file_path'] = mediaFilePath;
    data['created_at'] = createdAt;
    return data;
  }
}
