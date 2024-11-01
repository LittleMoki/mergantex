module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'run start',  // Or use other Prisma commands
      exec_mode: 'fork',
    },
  ],
};
