import React from "react";
import Head from "next/head";
import { client } from "../lib/client";
import Product from "@/components/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import Produkty1 from "@/components/Produkty1";
import Produkty2 from "@/components/Produkty2";
import Produkty3Faq from "@/components/Produkty3Faq";

const Products = () => {
	return (
		<>
			<Head>
				<title>Sklep</title>
			</Head>
			<Produkty1 />
			<Produkty2 />
			<Produkty3Faq />
		</>
	);
};

export default Products;
