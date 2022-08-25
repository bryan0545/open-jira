interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'pending Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto autem praesentium dolor',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'in-progress Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto autem praesentium dolor',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'finished Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto autem praesentium dolor',
      status: 'finished',
      createdAt: Date.now() - 200000,
    },
  ],
};
