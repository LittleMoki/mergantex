import HeaderAdmin from '@/components/headerAdmin'

const Layout = ({ children }) => {
	return (
		<div className='w-full bg-gray-600 min-h-screen'>
			<HeaderAdmin />
			{children}
		</div>
	)
}

export default Layout
