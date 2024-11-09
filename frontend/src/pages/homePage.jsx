import About from '@/module/about'
import Contact from '@/module/contact'
import Hero from '@/module/hero'
import Partners from '@/module/partners'
import Place from '@/module/place'
import Products from '@/module/products'
import Statistic from '@/module/statistic'
import Technique from '@/module/technique'

const HomePage = () => {
	return (
		<>
			<Hero />
			<About/>
			<Products />
			<Place />
			<Statistic />
			<Technique />
			<Partners />
			<Contact />
		</>
	)
}

export default HomePage
