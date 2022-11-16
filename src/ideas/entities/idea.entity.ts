import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Idea {
    @PrimaryGeneratedColumn()
    id_idea: number;

    @Column({unique: true})
    nombre_idea: string;

    @Column()
    azure_docente_correo: string;

    @Column()
    id_tipo_idea: number;

    @Column()
    aprovado: boolean;
    
    @Column({default: () => "CURRENT_TIMESTAMP"})
    fecha_creacion: Date;
}
