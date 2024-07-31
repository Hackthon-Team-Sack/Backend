import { Injectable } from '@nestjs/common';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { Beneficiary } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BeneficiariesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBeneficiaryDto: CreateBeneficiaryDto): Promise<Beneficiary> {
    return this.prisma.beneficiary.create({
      data: createBeneficiaryDto,
    });
  }

  async findAll(): Promise<Beneficiary[]> {
    return this.prisma.beneficiary.findMany();
  }

  async findOne(uuid: string): Promise<Beneficiary> {
    return this.prisma.beneficiary.findUnique({
      where: { uuid },
    });
  }

  async update(uuid: string, updateBeneficiaryDto: UpdateBeneficiaryDto): Promise<Beneficiary> {
    return this.prisma.beneficiary.update({
      where: { uuid },
      data: updateBeneficiaryDto,
    });
  }

  async remove(uuid: string): Promise<Beneficiary> {
    return this.prisma.beneficiary.delete({
      where: { uuid },
    });
  }
}
