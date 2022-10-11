import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id: number;

    @ManyToOne(() => Customer, {eager: true, nullable: false})
    customer: Customer;

    @Column({nullable: false})
    orderDate: Date;

    @Column({nullable: true})
    invoicedDate: Date;

    @Column({nullable: true})
    canceledDate: Date;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}