import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";


//! INJETA AUTOMATICAMENTE O REPOSITÓRIO DA ENTIDADE POSTAGEM PARA ACESSAAR O BANCO DE DADOS.

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
    ) { }

    async findAll(): Promise<Postagem[]> {

        //? SELECT * FROM tb_postagem
        return this.postagemRepository.find();
    }

    //! CONSULTA POR ID

    async findById(id: number): Promise<Postagem> {
        //? SELEC * FROM TB_POSTAGENS WHERE ID = ? 
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            }
        })

        if(!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        return postagem;
    }

    //! CONSULTA POR TITULO

    async findAllByTitulo(titulo: string): Promise<Postagem[]>{
        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem>{
        //? INSERT INTO TB_POSTAGEM (TITULO, TEXTO) VALUES (?, ?) -> VALORES INFORMADO PELO USUARIO

        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem>{
        //? UPDATE  TB_POSTAGEM SET TITULO = ?-> VALORES INFORMADO PELO USUARIO

        if(!postagem.id || postagem.id <= 0)
            throw new HttpException("O ID da postagem é inválidp", HttpStatus.BAD_REQUEST);
        await this.findById(postagem.id);

        return this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise <DeleteResult>{
        await this.findById(id);

        //? DELETE TB_POSTAGEM FROM id = ?
        return this.postagemRepository.delete(id);
    }
    
}