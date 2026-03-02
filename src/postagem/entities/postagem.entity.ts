import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "tb_postagens" }) //! CREATE TABLE tb_postagens
export class Postagem {

    @PrimaryGeneratedColumn() //! PRIMARY KEY(ID) AUTO INCREMENT
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //! REMOVER ESPAÇOS EM BRANCO (INICIO / FIM)
    @IsNotEmpty() //! ELE FORÇA A DIGITAÇÃO
    @Column({ length: 100, nullable: false }) //! VARCHAR (100) NOT NULL
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //! REMOVER ESPAÇOS EM BRANCO (INICIO / FIM)
    @IsNotEmpty() //! ELE FORÇA A DIGITAÇÃO
    @Column({ length: 1000, nullable: false }) //! VARCHAR (1000) NOT NULL
    texto: string;

    @UpdateDateColumn() //! ATUALIZA A DATA NA CRIAÇÃO E NA ATUALIZAÇÃO
    data: Date;
}