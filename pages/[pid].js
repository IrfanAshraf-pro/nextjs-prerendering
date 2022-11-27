import React from "react";
import fs from "fs/promises";
import path from "path";

const ProductDetail = (props) => {
	const { productSearched } = props;
	if (!productSearched) {
		return <p>Loading ...</p>;
	}
	return (
		<>
			<h1>Title : {productSearched.name}</h1>
			<p>Description : {productSearched.description}</p>
		</>
	);
};
async function getData() {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	return data;
}

export async function getStaticProps(context) {
	const { params } = context;
	const productId = params.pid;
	console.log(productId);
	const data = await getData();
	const product = data.products.find((product) => product.id === productId);
    if (!product) {
        return {
					notFound: true,
				};
    }
	return {
		props: {
			productSearched: product,
		},
	};
}
export async function getStaticPaths() {
	const data = await getData();
	const ids = data.products.map((product) => product.id);
	const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));
	return {
		paths: pathsWithParams,
		fallback: true,
	};
	// return {
	// 		paths: [{ params: { pid: "p1" } }],
	// 		fallback: 'blocking',
	// 	};
	// return {
	// 	paths: [
	// 		{ params: { pid: "p1" } },
	// 	],
	// 	fallback: true,
	// };
}
export default ProductDetail;
