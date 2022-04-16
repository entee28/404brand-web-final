import { Product } from "../entities/Product";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class ProductInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  price: number;
  @Field(() => Int)
  countInStock: number;
  @Field()
  imageUrl: string;
}

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return Product.find();
  }

  @Query(() => Product, { nullable: true })
  product(@Arg("id", () => Int) id: number): Promise<Product | null> {
    return Product.findOne({ where: { id } });
  }

  @Mutation(() => Product)
  // @UseMiddleware(isAuth)
  async createProduct(
    @Arg("input") input: ProductInput
  ): Promise<Product | null> {
    return Product.create({
      ...input,
    }).save();
  }

  // @Mutation(() => Post, { nullable: true })
  // @UseMiddleware(isAuth)
  // async updatePost(
  //   @Arg("id", () => Int) _id: number,
  //   @Arg("title") title: string,
  //   @Arg("text") text: string,
  //   @Ctx() { req }: MyContext
  // ): Promise<Post | null> {
  //   const result = await myDataSource
  //     .createQueryBuilder()
  //     .update(Post)
  //     .set({ title, text })
  //     .where('_id = :_id and "creatorId" = :creatorId', {
  //       _id,
  //       creatorId: req.session.userId,
  //     })
  //     .returning("*")
  //     .execute();

  //   return result.raw[0];
  // }

  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  // async deletePost(
  //   @Arg("id", () => Int) _id: number,
  //   @Ctx() { req }: MyContext
  // ): Promise<boolean> {
  //   await Post.delete({ _id, creatorId: req.session.userId });
  //   return true;
  // }
}
