class DeleteCartResponse {
  String? id;
  String? message;

  DeleteCartResponse({this.id, this.message});

  DeleteCartResponse.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    message = json['message'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['message'] = message;
    return data;
  }
}
