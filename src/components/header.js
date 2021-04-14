import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import slugify from "@sindresorhus/slugify";
import { navStyle, styleLink } from "./header.module.css";

const Header = () => {
	const {
		allShopifyProduct: { productTypes },
	} = useStaticQuery(graphql`
		query {
			allShopifyProduct {
				productTypes: distinct(field: productType)
			}
		}
	`);
	return (
		<nav className={navStyle}>
			<Link className={styleLink} to="/">
				{" "}
				All products{" "}
			</Link>
			{productTypes.map((name) => (
				<Link
					className={styleLink}
					key={name}
					to={`/products/${slugify(name)}`}
				>
					{name}
				</Link>
			))}
		</nav>
	);
};

export default Header;
