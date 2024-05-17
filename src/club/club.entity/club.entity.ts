/* eslint-disable prettier/prettier */
import { SocioEntity } from '../../socio/socio.entity/socio.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('club')
export class ClubEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;

    @Column()
    foundationDate: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @ManyToMany(() => SocioEntity, socio => socio.clubs)
    @JoinTable()
    socios: SocioEntity[];




}
