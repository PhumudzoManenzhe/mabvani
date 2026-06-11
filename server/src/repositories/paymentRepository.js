/**
 * Contains PostgreSQL queries related to payments.
 * SQL for payments must remain inside this repository or migrations.
 */
class PaymentRepository {
  async findPlaceholder() {
    throw new Error("PaymentRepository.findPlaceholder is not implemented.");
  }
}

module.exports = new PaymentRepository();
