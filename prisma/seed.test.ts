import { Prisma, PrismaClient, Project } from '@prisma/client';
import * as _ from 'lodash';

const prisma = new PrismaClient();

const projects: Prisma.ProjectCreateInput[] = [
  {
    name: 'Project 1',
    budget: 1000,
    tokenName: 'Token1',
    tokenQuantity: 10000,
    tokenSymbol: 'TK1',
    rwaRepresentation: 'Cash',
    description: 'Description of Project 1',
    user: {
      connect: {
        id: 1,
      },
    },

    createdAt: new Date(),
    updatedAt: null,
    contractAddress: '0x1555',
  },
  {
    name: 'Project 2',
    budget: 2000,
    tokenName: 'Token2',
    tokenQuantity: 20000,
    tokenSymbol: 'TK2',
    rwaRepresentation: 'Asset',
    description: 'Description of Project 2',
    createdAt: new Date(),
    updatedAt: null,
    contractAddress: '0x1535',
    user: {
      connect: {
        id: 1,
      },
    },
  },
];

const vendors: Prisma.VendorCreateInput[] = [
  {
    name: 'Vendor 1',
    walletAddress: 'vendor1-wallet-address',
    location: { city: 'City1', country: 'Country1' },
    email: 'vendor1@mailinator.com',
    project: {
      connect: {
        id: 1,
      },
    },
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    name: 'Vendor 2',
    walletAddress: 'vendor2-wallet-address',
    location: { city: 'City2', country: 'Country2' },
    email: 'vendor2@mailinator.com',
    createdAt: new Date(),
    updatedAt: null,
    project: {
      connect: {
        id: 1,
      },
    },
  },
];

const beneficiaries: Prisma.BeneficiaryCreateInput[] = [
  {
    name: 'Beneficiary 1',
    walletAddress: '0x123',
    email: 'beneficiary1@mailinator.com',
    gender: 'Female',
    age: 30,
    latitude: 40.7128,
    longitude: -74.006,
    project: {
      connect: {
        id: 1,
      },
    },
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    name: 'Beneficiary 2',
    walletAddress: '0x456',
    email: 'beneficiary2@mailinator.com',
    gender: 'Male',
    age: 25,
    latitude: 34.0522,
    longitude: -118.2437,
    project: {
      connect: {
        id: 1,
      },
    },
    createdAt: new Date(),
    updatedAt: null,
  },
];

async function main() {
  for (const project of projects) {
    const projectAttrs = _.cloneDeep(project) as Project;
    await prisma.project.create({
      data: {
        ...projectAttrs,
      },
    });
  }

  for (const vendor of vendors) {
    const vendorAttrs = _.cloneDeep(vendor);
    await prisma.vendor.create({
      data: {
        ...vendorAttrs,
      },
    });
  }

  for (const beneficiary of beneficiaries) {
    const beneficiaryAttrs = _.cloneDeep(beneficiary);
    await prisma.beneficiary.create({
      data: {
        ...beneficiaryAttrs,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
