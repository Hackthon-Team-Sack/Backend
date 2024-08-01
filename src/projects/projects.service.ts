import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestContextService } from 'src/request-context/request-context.service';
import { UUID } from 'crypto';
import { executeMetaTxRequest } from 'src/utils/web3';
import { MetaTransactionDto } from './dto/meta-transaction.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private requestContextService: RequestContextService,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const user = this.requestContextService.getUser();
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        user: {
          connect: {
            id: user.id as number,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  findOne(uuid: UUID) {
    return this.prisma.project.findFirstOrThrow({
      where: {
        uuid,
      },
    });
  }

  update(uuid: UUID, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: {
        uuid,
      },
      data: updateProjectDto,
    });
  }

  remove(uuid: UUID) {
    return this.prisma.project.delete({
      where: {
        uuid,
      },
    });
  }

  executeMetaTransaction(payload: MetaTransactionDto) {
    return executeMetaTxRequest(payload);
  }
}
