import React from "react";
import fs from "fs/promises";
import path from "path";

const HomePage = (props) => {
	const { products } = props;
	return (
		<ul>
			{products.map((item) => (
				<li key={item.id}>{item.name}</li>
			))}
		</ul>
	);
};

export async function getStaticProps(context) {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	return {
		props: {
			products: data.products,
		},
	};
}

export default HomePage;
