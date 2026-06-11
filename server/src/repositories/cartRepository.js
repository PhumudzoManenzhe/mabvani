/**
 * Contains PostgreSQL queries related to selection carts.
 * SQL for selection carts must remain inside this repository or migrations.
 */
class CartRepository {
  async findPlaceholder() {
    throw new Error("CartRepository.findPlaceholder is not implemented.");
  }
}

module.exports = new CartRepository();
