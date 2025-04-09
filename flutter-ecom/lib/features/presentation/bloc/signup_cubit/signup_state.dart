part of 'signup_cubit.dart';

class SignupState extends Equatable {
  const SignupState({required this.selectedImage});

  final String selectedImage;

  SignupState copyWith({
    String? selectedImage,
  }) {
    return SignupState(selectedImage: selectedImage ?? this.selectedImage);
  }

  @override
  List<Object?> get props => [];
}
