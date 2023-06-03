export default function Header() {
	return (
		<header >
			<div className='md:flex justify-around items-center'>
				<div className="logo-container">
					<img
						className='m-5 mx-auto'
						src='https://facop.edu.br/wp-content/uploads/2023/05/logo-positivo-registrado-scaled.webp'
						width='220'
						height='92'
					></img>
				</div>
				<div className="title-container">
					<h1 className='my-10 mx-auto text-center text-xl md:text-4xl md:m-5'>
						Curso de Harmonização Facial
					</h1>
				</div>
			</div>
			<div >
				<h2 className="absolute z-10 ml-5 translate-y-16  text-2xl text-white md:translate-y-56 md:ml-24 md:text-4xl">Orçamento</h2>
				<img className="md:relative "
					src="https://facop.edu.br/wp-content/themes/naitech_facop/img/bg-cursos-default.jpg"
					alt="students walking together" />
			</div>
		</header>
	);
}