import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn, JoinTable, DeleteDateColumn  } from "typeorm";
import { Client } from "./Client";
import { Task } from "./Task";
import { User_project } from "./User_project";
@Entity()
export class Project{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column({
        type:"date"
    })
    start_date:Date;
    @Column({
        type:"date"
    })
    end_date:Date;
    @Column()
    description:string;
    @Column({
        type:"enum",
        enum:["Training","Company Activities","Production"],
    })
    type:string;
    @Column({
        type:"enum",
        enum:["Inactive","Active"],
        default:"Active"
    })
    status:string;
    @ManyToOne(() => Client, (client) => client.projects)
    client: Client;
    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];
    @OneToMany(() => User_project, user_project => user_project.project)
    ProjectToUser: User_project[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deleted_at: Date;
}