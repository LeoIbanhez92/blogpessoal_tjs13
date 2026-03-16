import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_postagens" }) //! CREATE TABLE tb_postagens
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn() //! PRIMARY KEY(ID) AUTO INCREMENT
    id: number;

    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim()) //! REMOVER ESPAÇOS EM BRANCO (INICIO / FIM)
    @IsNotEmpty() //! ELE FORÇA A DIGITAÇÃO
    @Length(5, 100, { message: "O Texto deve ter entre 5 e 100 caracteres" })
    @Column({ length: 100, nullable: false }) //! VARCHAR (100) NOT NULL
    titulo: string;

    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim()) //! REMOVER ESPAÇOS EM BRANCO (INICIO / FIM)
    @IsNotEmpty() //! ELE FORÇA A DIGITAÇÃO
    @Length(10, 1000, { message: "O Texto deve ter entre 10 e 1000 caracteres" })
    @Column({ length: 1000, nullable: false }) //! VARCHAR (1000) NOT NULL
    texto: string;

    @ApiProperty()
    @UpdateDateColumn() //! ATUALIZA A DATA NA CRIAÇÃO E NA ATUALIZAÇÃO
    data: Date;

    @ApiProperty({ type: () => Tema })
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema; 

    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
}