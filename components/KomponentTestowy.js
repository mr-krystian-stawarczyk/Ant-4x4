import React, { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";

import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "../lib/client";

const KomponentTestowy = () => {
	const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Default background color
	const [textColor, setTextColor] = useState("black"); // Default text color

	useEffect(() => {
		// Fetch background color and text color from Sanity
		const fetchColors = async () => {
			try {
				const result = await client.fetch(`*[_type == "sekcja1"][0]{
          backgroundColor,
          textColor
        }`);
				if (result && result.backgroundColor) {
					setBackgroundColor(result.backgroundColor);
				}
				if (result && result.textColor) {
					setTextColor(result.textColor);
				}
			} catch (error) {
				console.error("Error fetching colors from Sanity:", error);
			}
		};

		fetchColors();
	}, []);

	return (
		<div
			style={{
				backgroundColor,
				color: textColor,
			}}
		>
			<Container className="py-5 vh-100">
				<Row className=" py-5 mt-5 align-items-center justify-content-center text-center">
					<Col md={8} className=" pt-5 mt-5">
						<Card className="bg-transparent border-0 blur mt-5">
							<Card.Body className="text-start  ">
								<h1 className="text-bold">
									Sekcja 1 - ustawic texty i przyciski w sanity
								</h1>
								<h5 className="text-bold">
									Przyciski cos musisz pokombinowac moze zeby nizej zsylaly ?
								</h5>
								<Button as={Link} href="web" className="m-2 btn-lg btn-nav">
									{t("h3")}
								</Button>
								<Button as={Link} href="seo" className="m-2 btn-lg btn-nav">
									{t("h4")}
								</Button>
								<Button
									as={Link}
									href="socialmedia"
									className="m-2 btn-lg btn-nav"
								>
									{t("h5")}
								</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default KomponentTestowy;
