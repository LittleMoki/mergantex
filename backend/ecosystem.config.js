module.exports = {
	apps: [
		{
			name: 'prisma-migrate', // Для выполнения миграций при запуске
			script: 'npx',
			args: 'prisma migrate deploy && prisma db push && prisma migrate dev',
			exec_mode: 'fork',
			autorestart: false, // Миграции выполняются один раз
		},
		{
			name: 'backend',
			script: 'npm',
			args: 'run start',
			exec_mode: 'fork',
		},
	],
}
