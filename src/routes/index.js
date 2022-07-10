const { Router } = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = Router();

const MY_DOMAIN = process.env.MY_DOMAIN;

const products = [
	{
		price: 1,
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia facere deserunt",
		img: "img/ubuntu.jpeg",
		price_id: "price_1LK59LIDRm4yTyK76TzNAMyi",
	},
];

router.get("/", (req, res) => {
	res.render("index", { products });
});

router.post("/checkout", async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				// hard-coding is done for testing
				price: req.body.price_id,
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${MY_DOMAIN}/success`,
		cancel_url: `${MY_DOMAIN}/cancel`,
	});

	res.redirect(303, session.url);
});

router.get("/success", (req, res) => {
	res.render("success");
});

router.get("/cancel", (req, res) => {
	res.render("cancel");
});

module.exports = router;
