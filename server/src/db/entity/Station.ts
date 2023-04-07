import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Route } from "./Route";

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  @OneToMany(() => Route, (route) => route.startingStation)
  startingRoutes: Route[]; // One-to-many relationship with Route entity

  @OneToMany(() => Route, (route) => route.endingStation)
  endingRoutes: Route[]; // One-to-many relationship with Route entity
}
