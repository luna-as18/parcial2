/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from './club.entity/club.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class ClubService {
    constructor(
        @InjectRepository(ClubEntity)
        private clubRepository: Repository<ClubEntity>,
    ){}

    async findAll(): Promise<ClubEntity[]> {
        return await this.clubRepository.find({relations: ["socios"]});
    }

    async findOne(id: string): Promise<ClubEntity> {
        const Club: ClubEntity = await this.clubRepository.findOne({where: {id}, relations: ["socios"] } );
        if (!Club)
          throw new BusinessLogicException("The Club with the given id was not found", BusinessError.NOT_FOUND);
    
        return Club;
    }
    
    async create(Club: ClubEntity): Promise<ClubEntity> {
        //valida descripcion no tenga length mayor a 100
        if (Club.description.length > 100)
          throw new BusinessLogicException("The description length must be less than 100 characters", BusinessError.BAD_REQUEST);
        return await this.clubRepository.save(Club);
    }

    async update(id: string, Club: ClubEntity): Promise<ClubEntity> {
        const persistedClub: ClubEntity = await this.clubRepository.findOne({where:{id}});
        if (!persistedClub)
          throw new BusinessLogicException("The Club with the given id was not found", BusinessError.NOT_FOUND);
        //valida descripcion no tenga length mayor a 100
        if (Club.description.length > 100)
          throw new BusinessLogicException("The description length must be less than 100 characters", BusinessError.BAD_REQUEST);
        
        return await this.clubRepository.save({...persistedClub, ...Club});
    }

    async delete(id: string) {
        const Club: ClubEntity = await this.clubRepository.findOne({where:{id}});
        if (!Club)
          throw new BusinessLogicException("The Club with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.clubRepository.remove(Club);
    }



}


