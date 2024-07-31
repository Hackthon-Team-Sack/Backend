import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const { projectUUID, ...rest } = createVendorDto;
    return this.prisma.vendor.create({
      data: {
        project: {
          connect: {
            uuid: projectUUID,
          },
        },
        ...rest,
      },
    });
  }

  async findAll(): Promise<Vendor[]> {
    return this.prisma.vendor.findMany();
  }

  async findOne(uuid: string): Promise<Vendor> {
    return this.prisma.vendor.findUnique({
      where: { uuid },
    });
  }

  async update(uuid: string, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
    return this.prisma.vendor.update({
      where: { uuid },
      data: updateVendorDto,
    });
  }

  async remove(uuid: string): Promise<Vendor> {
    return this.prisma.vendor.delete({
      where: { uuid },
    });
  }
}
