import { motion } from 'framer-motion'

const CardMotion = ({ index, children, className }) => {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: -10 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.1 }}
		>
			{children}
		</motion.div>
	)
}

export default CardMotion
