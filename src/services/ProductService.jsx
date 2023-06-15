import { appwriteClient } from "clients";

export class ProductService {
  async getAllProducts() {
    const { documents: products } = await appwriteClient.products();

    return products;
  }
}
