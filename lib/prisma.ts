// Mock Prisma Client for Demo Mode
// This allows the app to run without a database

const mockPrismaClient = {
    user: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async (data: any) => data,
        update: async (data: any) => data,
    },
    session: {
        findUnique: async () => null,
        create: async (data: any) => data,
        delete: async () => ({}),
    },
    fanProfile: {
        findUnique: async () => null,
        create: async (data: any) => data,
    },
    creatorProfile: {
        findUnique: async () => null,
        create: async (data: any) => data,
    },
    brandProfile: {
        findUnique: async () => null,
        create: async (data: any) => data,
    },
    adminProfile: {
        findUnique: async () => null,
        create: async (data: any) => data,
    },
    wallet: {
        findUnique: async () => ({ tokenBalance: 500, usdBalance: 100 }),
        update: async (data: any) => data,
    },
    transaction: {
        findMany: async () => [],
        create: async (data: any) => data,
        createMany: async (data: any) => data,
    },
    subscription: {
        findMany: async () => [],
        findUnique: async () => null,
    },
    content: {
        findUnique: async () => null,
        findMany: async () => [],
        update: async (data: any) => data,
    },
    message: {
        findMany: async () => [],
        create: async (data: any) => data,
    },
    conversation: {
        findMany: async () => [],
        findUnique: async () => null,
    },
    liveStream: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async (data: any) => data,
        update: async (data: any) => data,
    },
    notification: {
        create: async (data: any) => data,
        createMany: async (data: any) => data,
    },
    kYCDocument: {
        create: async (data: any) => data,
    },
    dMCATakedown: {
        create: async (data: any) => data,
    },
    $disconnect: async () => { },
};

export const prisma = mockPrismaClient as any;
