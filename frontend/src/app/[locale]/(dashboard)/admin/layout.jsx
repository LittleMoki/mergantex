import HeaderAdmin from '@/components/headerAdmin'

const Layout = ({ children }) => {
	return (
		<div className='w-full min-h-screen bg-gray-600'>
			<HeaderAdmin />
			{children}
		</div>
	)
}

export default Layout
