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

		</header>
	);
}