import { motion } from 'framer-motion'

const TextMotion = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: '-100%' }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	)
}

export default TextMotion
