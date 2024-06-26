import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn  } from "typeorm";
import { Task } from "./Task";
import { User_project } from "./User_project";
@Entity()
export class Timesheet{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    note:string;
    @Column({
        type:"date"
    })
    day:Date;
    @Column()
    work_time:number;
    @Column({
        type:"enum",
        enum:["Normal Working Hours","Overtime"],
    })
    work_type:string;
    @Column({
        type:"enum",
        enum:["New","Pending","Approved","Rejected"],
    })
    status:string;
    @ManyToOne(() => User_project, (user_project) => user_project.timesheets)
    user_project: User_project;
    @ManyToOne(() => Task, (task) => task.timesheets)
    task: Task;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}