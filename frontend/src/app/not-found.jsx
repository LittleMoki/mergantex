'use client'

import Link from 'next/link'

export default function NotFound() {
	return (
		<html>
			<body
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100vh',
					textAlign: 'center',
				}}
			>
				<h1>
					ERROR 404 <Link href='/'>enter home page</Link>
				</h1>
			</body>
		</html>
	)
}
