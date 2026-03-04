import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_temas" })
export class Tema {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //! REMOVER ESPAÇOS EM BRANCO (INICIO / FIM)
    @IsNotEmpty() //! ELE FORÇA A DIGITAÇÃO
    @Length(50, 255, { message: "O Texto deve ter entre 50 e 255 caracteres" }) //! FORÇA A DIGITAÇÃO COM LIMITE DE 50 E MAXIMA DE 255 CARACTERES
    @Column({ length: 255, nullable: false }) //! VARCHAR (255) NOT NULL
    descricao: string;

}
