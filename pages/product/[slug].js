import React, { useState, useEffect } from "react";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiFillStar,
	AiOutlineStar,
} from "react-icons/ai";
import { Container, Row, Col, Carousel, Card, Button } from "react-bootstrap";
import { client, urlFor } from "../../lib/client";
import Product from "@/components/Products";
import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";

const ProductDetails = ({ product, products }) => {
	const { image, name, details, price } = product;
	const [index, setIndex] = useState(0);
	const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
	const [showModal, setShowModal] = useState(false); // State for showing modal
	const [modalImage, setModalImage] = useState("");
	const [productsPerSlide, setProductsPerSlide] = useState(3);
	const updateProductsPerSlide = () => {
		if (window.innerWidth <= 768) {
			setProductsPerSlide(1);
		} else if (window.innerWidth <= 992) {
			setProductsPerSlide(2);
		} else {
			setProductsPerSlide(3);
		}
	};

	useEffect(() => {
		// Wywołaj funkcję na starcie i przy zmianie szerokości ekranu
		updateProductsPerSlide();
		window.addEventListener("resize", updateProductsPerSlide);
		return () => {
			window.removeEventListener("resize", updateProductsPerSlide);
		};
	}, []);

	// Funkcja do dzielenia produktów na slajdy
	const splitProductsIntoSlides = () => {
		const slides = [];
		for (let i = 0; i < products.length; i += productsPerSlide) {
			slides.push(products.slice(i, i + productsPerSlide));
		}
		return slides;
	};
	const handleBuyNow = () => {
		onAdd(product, qty);

		setShowCart(true);
	};

	const handleImageClick = (imageUrl) => {
		setModalImage(imageUrl);
		setShowModal(true);
	};

	return (
		<Container fluid className="bg-light">
			<Row className=" py-5  justify-content-center align-items-center text-dark">
				<Col md={6} className="text-center py-5">
					<img
						src={urlFor(image && image[index])}
						width={300}
						height={300}
						onClick={() => handleImageClick(urlFor(image && image[index]))}
						style={{ cursor: "pointer" }}
						className="shadow-sm"
					/>

					<div className=" text-center my-2 p-2">
						{image?.map((item, i) => (
							<img
								key={i}
								src={urlFor(item)}
								className={
									i === index
										? "small-image selected-image shadow-sm"
										: "small-image shadow-sm"
								}
								onMouseEnter={() => setIndex(i)}
								onClick={() => handleImageClick(urlFor(item))}
							/>
						))}
					</div>
				</Col>

				<Col md={6}>
					<h1>{name}</h1>

					<h4>Szczegóły: </h4>
					<h6>{details}</h6>
					<h4>{price} Zł</h4>
					<div>
						<h3>Ilość:</h3>
						<Col className="quantity-desc">
							<span className="minus" onClick={decQty}>
								<AiOutlineMinus />
							</span>
							<span className="num">{qty}</span>
							<span className="plus" onClick={incQty}>
								<AiOutlinePlus />
							</span>
						</Col>
					</div>
					<div className="buttons">
						<Button
							className="add-to-cart mx-auto"
							onClick={() => onAdd(product, qty)}
						>
							Dodaj
						</Button>
						<Button className="buy-now mx-auto" onClick={handleBuyNow}>
							Kup Teraz
						</Button>
					</div>
				</Col>
			</Row>
			<Row className="justify-content-center align-items-center text-center">
				<h2 className="text-dark">Mogą Ci się także spodobać</h2>

				<Carousel variant="dark" indicators={false}>
					{splitProductsIntoSlides().map((slideProducts, index) => (
						<Carousel.Item key={index} interval={3000}>
							<Container fluid>
								<Row>
									{slideProducts.map((product) => (
										<Col key={product._id} className="py-4">
											<Product product={product} />
										</Col>
									))}
								</Row>
							</Container>
						</Carousel.Item>
					))}
				</Carousel>
			</Row>
			<ImageModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				imageUrl={modalImage}
			/>
		</Container>
	);
};

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

	const products = await client.fetch(query);

	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productsQuery = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(productsQuery);

	console.log(product);

	return {
		props: { products, product },
	};
};

export default ProductDetails;
