// import { Entity, PrimaryKey, Column } from "@mikro-orm/core";
// import { Entity, PrimaryKey, Column } from "@mikro-orm/postgresql";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => String)
  @UpdateDateColumn()
  updateAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
