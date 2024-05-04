// import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
// import { Entity, PrimaryKey, Property } from "@mikro-orm/postgresql";
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
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @UpdateDateColumn()
  updateAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
