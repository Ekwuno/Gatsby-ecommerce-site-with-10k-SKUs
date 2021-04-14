import React from "react";
import {
	container,
	em,
	gridItemOne,
	productImageStyle,
	productCardStyle,
	productDetailsStyle,
	productHeadingStyle,
} from "./index.module.css";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import formatPrice from "../utils/format-price";

export const query = graphql`
	query {
		allShopifyProduct {
			edges {
				node {
					title
					description
					priceRangeV2 {
						maxVariantPrice {
							amount
							currencyCode
						}
					}
					images {
						gatsbyImageData(aspectRatio: 1, width: 640, placeholder: "BLURRED")
					}
					slug: gatsbyPath(
						filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
					)
				}
			}
		}
	}
`;

const IndexPage = ({ data }) => {
	return (
		<Layout>
			<main>
				<div className={container}>
					{/* Face off on Colbyashi Maru */}
					<p className={em}>
						Ecommerce with Gatsby and Shopify{" "}
						<span>
							{" "}
							With unsplash photos
							<strong>
								{" "}
								<u> Ft. Obinna</u>{" "}
							</strong>
						</span>{" "}
					</p>
				</div>

				<div className={gridItemOne}>
					{data.allShopifyProduct.edges.map(({ node: product }) => (
						<Link to={product.slug} className={productCardStyle}>
							<div className={productImageStyle} data-name="product-image-box">
								<GatsbyImage image={product.images[0].gatsbyImageData} />
							</div>
							<div key={product.title}>
								<div className={productDetailsStyle}>
									<h2 className={productHeadingStyle}> {product.title}</h2>
									{
										(product.priceRangeV2.maxVariantPrice.currencyCode,
										product.priceRangeV2.maxVariantPrice.amount)
									}
								</div>
							</div>
						</Link>
					))}
				</div>
			</main>
		</Layout>
	);
};

export default IndexPage;
