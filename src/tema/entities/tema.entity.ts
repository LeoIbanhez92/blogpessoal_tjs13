import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({ name: "tb_temas" })
export class Tema {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //! REMOVER ESPAÇOS EM BRANCO (INICIO / FIM)
    @IsNotEmpty() //! ELE FORÇA A DIGITAÇÃO
    @Length(5, 255, { message: "O Texto deve ter entre 5 e 255 caracteres" }) //! FORÇA A DIGITAÇÃO COM LIMITE DE 50 E MAXIMA DE 255 CARACTERES
    @Column({ length: 255, nullable: false }) //! VARCHAR (255) NOT NULL
    descricao: string;

    @OneToMany(() => Postagem, (postagem) => postagem.tema)

    postagem: Postagem[]; //! ARRAY DE RETORNO
}
