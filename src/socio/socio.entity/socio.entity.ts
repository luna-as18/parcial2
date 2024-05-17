/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClubEntity } from '../../club/club.entity/club.entity';

@Entity('socio')
export class SocioEntity {
    @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 username: string;
 
 @Column()
 email: string;
 
 @Column()
 birthDate: string;

 @ManyToMany(() => ClubEntity, club => club.socios)
 clubs: ClubEntity[];
   
 

}

