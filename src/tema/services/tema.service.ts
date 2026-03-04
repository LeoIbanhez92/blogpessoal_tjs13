import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Tema } from "../entities/tema.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>,
    ) { }

    async findAll(): Promise<Tema[]> {

        //? SELECT * FROM tb_tema
        return this.temaRepository.find();
    }

    //! CONSULTA POR ID

    async findById(id: number): Promise<Tema> {
        //? SELEC * FROM TB_POSTAGENS WHERE ID = ? 
        const tema = await this.temaRepository.findOne({
            where: {
                id
            }
        })

        if (!tema)
            throw new HttpException('Tema não encontrada!', HttpStatus.NOT_FOUND);

        return tema;
    }

    //! CONSULTA POR DESCRIÇÃO

    async findAllByDescricao (descricao: string): Promise<Tema[]> {
        return this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            }
        })
    }

    async create(tema: Tema): Promise<Tema> {
        //? INSERT INTO TB_POSTAGEM (TITULO, TEXTO) VALUES (?, ?) -> VALORES INFORMADO PELO USUARIO

        return await this.temaRepository.save(tema);
    }


    async update(tema: Tema): Promise<Tema> {
        //? UPDATE  TB_POSTAGEM SET TITULO = ?-> VALORES INFORMADO PELO USUARIO

        if (!tema.id || tema.id <= 0)
            throw new HttpException("O ID do tema é inválido", HttpStatus.BAD_REQUEST);
        await this.findById(tema.id);

        return this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        //? DELETE TB_POSTAGEM FROM id = ?
        return this.temaRepository.delete(id);
    }


}