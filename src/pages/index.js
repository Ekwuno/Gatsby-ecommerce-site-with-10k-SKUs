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
						gatsbyImageData(aspectRatio: 1, width: 640)
					}
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
					10k products and 25k variants. Shopify, Gatsby, Gatsby Cloud.
					Instantly preview content, build in seconds or hours? depending on the
					mood.
					<p className={em}>
						Gatsby E-Commerce Starter Kit —{" "}
						<span>
							{" "}
							PoC in a day,
							<strong>
								{" "}
								<u>with your own products </u>{" "}
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
									{formatPrice(
										product.priceRangeV2.maxVariantPrice.currencyCode,
										product.priceRangeV2.maxVariantPrice.amount
									)}
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
