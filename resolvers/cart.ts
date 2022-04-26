import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Cart } from "../entities/Cart";
import { Product } from "../entities/Product";
import { MyContext } from "../types";

@Resolver(Cart)
export class CartResolver {
  @FieldResolver(() => Product)
  product(@Root() cart: Cart, @Ctx() { productLoader }: MyContext) {
    return productLoader.load(cart.productId);
  }

  @Mutation(() => Cart)
  async addCart(
    @Arg("productId", () => Int) productId: number,
    @Arg("qty", () => Int) qty: number,
    @Ctx() { req }: MyContext
  ): Promise<Cart | null> {
    const userId = req.session.userId;

    if (!userId) {
      return null;
    }

    const cart = await Cart.findOne({ where: { userId, productId } });

    if (cart) {
      qty += cart.qty;
      await Cart.update({ userId, productId }, { qty });
      return cart;
    } else {
      return Cart.create({
        userId,
        productId,
        qty,
      }).save();
    }
  }

  @Mutation(() => Cart)
  async qtyCart(
    @Arg("productId", () => Int) productId: number,
    @Arg("type") type: "inc" | "dec",
    @Ctx() { req }: MyContext
  ): Promise<Cart | null> {
    const userId = req.session.userId;

    if (!userId) {
      return null;
    }

    const cart = await Cart.findOne({ where: { userId, productId } });

    if (!cart) {
      return null;
    }

    const product = await Product.findOne({ where: { id: productId } });
    const stock = product!.countInStock;

    if (type === "inc" && cart.qty < stock) {
      await Cart.update({ userId, productId }, { qty: cart.qty + 1 });
    } else if (type === "dec" && cart.qty > 1) {
      await Cart.update({ userId, productId }, { qty: cart.qty - 1 });
    }

    return cart;
  }

  @Query(() => [Cart])
  async getCart(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const items = await Cart.find({ where: { userId: req.session.userId } });

    if (!items) {
      return null;
    }

    return items;
  }
}
