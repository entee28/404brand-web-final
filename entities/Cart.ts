import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@ObjectType()
@Entity()
export class Cart extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Field()
  @PrimaryColumn()
  productId!: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.cart)
  product: Product;

  @Field(() => Int)
  @Column()
  qty!: number;
}
