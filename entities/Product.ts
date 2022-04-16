import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column({ type: "float" })
  price!: number;

  @Field(() => Int)
  @Column()
  countInStock: number;

  @Field()
  @Column()
  imageUrl: string;
}
