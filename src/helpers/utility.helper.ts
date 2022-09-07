export class UtilityHelper {
  static response(message, data) {
    return {
      success: true,
      message,
      data,
    };
  }
}
