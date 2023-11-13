import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Route } from "./Route";

@Entity()
export class Station {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 6 })
  latitude: number;

  @Column({ nullable: true, type: "decimal", precision: 10, scale: 6 })
  longitude: number;

  @OneToMany(() => Route, (route) => route.startingStation)
  startingRoutes: Route[]; // One-to-many relationship with Route entity

  @OneToMany(() => Route, (route) => route.endingStation)
  endingRoutes: Route[]; // One-to-many relationship with Route entity
}
