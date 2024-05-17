/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocioEntity } from './socio.entity/socio.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class SocioService {
    constructor(
        @InjectRepository(SocioEntity)
        private socioRepository: Repository<SocioEntity>,
    ){}

    async findAll(): Promise<SocioEntity[]> {
        return await this.socioRepository.find({relations: ["clubs"]});
    }

    async findOne(id: string): Promise<SocioEntity> {
        const Club: SocioEntity = await this.socioRepository.findOne({where: {id}, relations: ["clubs"] } );
        if (!Club)
          throw new BusinessLogicException("The Club with the given id was not found", BusinessError.NOT_FOUND);
    
        return Club;
    }
    
    async create(Club: SocioEntity): Promise<SocioEntity> {
        //valida que el correo contenga un @
        if (!Club.email.includes('@'))
          throw new BusinessLogicException("The email must contain an @", BusinessError.BAD_REQUEST);
         return await this.socioRepository.save(Club);
    }

    async update(id: string, Club: SocioEntity): Promise<SocioEntity> {
        const persistedClub: SocioEntity = await this.socioRepository.findOne({where:{id}});
        if (!persistedClub)
          throw new BusinessLogicException("The Club with the given id was not found", BusinessError.NOT_FOUND);
         //valida que el correo contenga un @
        if (!Club.email.includes('@'))
          throw new BusinessLogicException("The email must contain an @", BusinessError.BAD_REQUEST);
        return await this.socioRepository.save({...persistedClub, ...Club});
    }

    async delete(id: string) {
        const Club: SocioEntity = await this.socioRepository.findOne({where:{id}});
        if (!Club)
          throw new BusinessLogicException("The Club with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.socioRepository.remove(Club);
    }



}
