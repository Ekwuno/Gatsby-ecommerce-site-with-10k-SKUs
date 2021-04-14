import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../../../components/layout";
import {
	container,
	em,
	gridItemOne,
	productImageStyle,
	productCardStyle,
	productDetailsStyle,
	productHeadingStyle,
} from "../../index.module.css";

export const query = graphql`
	query($productType: String!) {
		products: allShopifyProduct(
			filter: { productType: { eq: $productType } }
			sort: { fields: publishedAt, order: ASC }
		) {
			nodes {
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
`;

const ProductTypeIndex = ({
	data: { products },
	pageContext: { productType },
}) => {
	return (
		<Layout>
			<h1>{productType}</h1>
			<div className={gridItemOne}>
				{products.nodes.map((p) => (
					<Link to={p.slug} className={productCardStyle}>
						<div className={productImageStyle}>
							<GatsbyImage image={p.images[0].gatsbyImageData} />
						</div>
						<div key={p.title}>
							<div className={productDetailsStyle}>
								<h2 className={productHeadingStyle}> {p.title}</h2>
								{
									(p.priceRangeV2.maxVariantPrice.currencyCode,
									p.priceRangeV2.maxVariantPrice.amount)
								}
							</div>
						</div>
					</Link>
				))}
			</div>
		</Layout>
	);
};

export default ProductTypeIndex;
