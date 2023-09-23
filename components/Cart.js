import React, { useRef, useEffect } from "react";
import Link from "next/link";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import getStripe from "@/lib/getStripe";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { Button, Row, Container, Col, Card } from "react-bootstrap";

const Cart = () => {
	const cartRef = useRef();
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuanitity,
		onRemove,
	} = useStateContext();

	const handleCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartItems),
		});

		if (response.statusCode === 500) return;

		const data = await response.json();

		stripe.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<Container fluid className="cart-wrapper scrolling-cart" ref={cartRef}>
			<div className="cart-container">
				<button
					type="button"
					className="cart-heading"
					onClick={() => setShowCart(false)}
				>
					<AiOutlineLeft style={{ color: "black", fontSize: "2rem" }} />
					<span className="heading">Your Cart</span>
					<span className="cart-num-items">({totalQuantities} produktów)</span>
				</button>

				{cartItems.length < 1 && (
					<div className="empty-cart">
						<AiOutlineShopping size={150} />
						<h3>Koszyk pusty</h3>
						<Link href="/products">
							<Button
								type="button"
								onClick={() => setShowCart(false)}
								variant="dark"
							>
								Kontynuj Zakupy
							</Button>
						</Link>
					</div>
				)}
				<Row className="align-items-center justify-content-center text-center">
					{cartItems.length >= 1 &&
						cartItems.map((item) => (
							<Col
								md={4}
								sm={12}
								xs={12}
								key={item._id}
								className="mx-auto my-1 "
							>
								<Card className="product-card border-0 shadow-lg">
									<Card.Body>
										<img
											src={urlFor(item?.image[0])}
											className="cart-product-image"
										/>
										<div>
											<div>
												<Card.Title>{item.name}</Card.Title>
												<Card.Text>{item.price} Zł</Card.Text>
												<Card.Text className="justify-content-center align-items-center text-center">
													<span
														className=" text-danger m-1"
														onClick={() =>
															toggleCartItemQuanitity(item._id, "dec")
														}
														style={{ border: "1px solid black" }}
													>
														<AiOutlineMinus />
													</span>
													<span className="m-1 p-1">{item.quantity}</span>
													<span
														className="text-success m-1"
														onClick={() =>
															toggleCartItemQuanitity(item._id, "inc")
														}
														style={{ border: "1px solid black" }}
													>
														<AiOutlinePlus />
													</span>
												</Card.Text>
											</div>
											<div>
												<div>
													<button
														type="button"
														className="remove-item"
														onClick={() => onRemove(item)}
													>
														<TiDeleteOutline />
													</button>
												</div>
											</div>
										</div>
									</Card.Body>
								</Card>
							</Col>
						))}
				</Row>
				<Row className="align-items-center justify-content-center text-center">
					{cartItems.length >= 1 && (
						<Col md={6} sm={12} xs={12} className="my-2 shadow-lg">
							<Card className="border-0">
								<Card.Body>
									<Card.Title>Razem: {totalPrice}Zł </Card.Title>

									<Button
										variant="dark"
										type="button"
										className="m-1"
										onClick={handleCheckout}
									>
										Zapłać
									</Button>
								</Card.Body>
							</Card>
						</Col>
					)}
				</Row>
			</div>
		</Container>
	);
};

export default Cart;
