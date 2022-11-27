import React from "react";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

const HomePage = (props) => {
	const { products } = props;
	return (
		<ul>
			{products.map((item) => (
				<li key={item.id}>
					<Link href={`/${item.id}`}>{item.name}</Link>
				</li>
			))}
		</ul>
	);
};

export async function getStaticProps(context) {
	console.log("Regenerating");
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	if (!data) {
		return {
			redirect: {
				destination: "/",
			},
		};
	}
	if (data.products.length === 0) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			products: data.products,
		},
		revalidate: 10,
	};
}

export default HomePage;
