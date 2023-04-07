import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Route } from "./Route";

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  started_at: Date;

  @Column()
  ended_at: Date;

  @Column()
  duration_sec: number;

  @OneToOne((type) => Route, (route) => route.journey, { cascade: true })
  @JoinColumn({ name: "route_id" })
  route: Route;
}
