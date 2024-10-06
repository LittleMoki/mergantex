import Hero from '@/module/hero'
import Place from '@/module/place'
import Products from '@/module/products'
import Statistic from '@/module/statistic'
import Technique from '@/module/technique'

const HomePage = () => {
	return (
		<>
			<Hero />
			<Products />
			<Place />
			<Statistic/> 
			<Technique/>
		</>
	)
}

export default HomePage
