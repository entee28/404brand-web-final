import DataLoader from "dataloader";
import { In } from "typeorm";
import { Product } from "../entities/Product";

export const createProductLoader = () =>
  new DataLoader<number, Product>(async (productIds) => {
    const products = await Product.findBy({ id: In(productIds as number[]) });
    const productIdToProduct: Record<number, Product> = {};
    products.forEach((p) => {
      productIdToProduct[p.id] = p;
    });

    return productIds.map((productId) => productIdToProduct[productId]);
  });
