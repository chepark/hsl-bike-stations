import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Journey } from "./Journey";
import { Station } from "./Station";

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  distance_meter: number;

  @ManyToOne(() => Station, (station) => station.startingRoutes, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "starting_station" })
  startingStation: Station; // Many-to-one relationship with Station entity

  @ManyToOne(() => Station, (station) => station.endingRoutes, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "ending_station" })
  endingStation: Station; // Many-to-one relationship with Station entity

  @OneToOne(() => Journey, (journey) => journey.route)
  @JoinColumn({ name: "journey_id" })
  journey: Journey; // One-to-one relationship with Journey entity
}
