var plans = [
	{
		"product_id":1003,
		"product_name":"WordPress.com Premium",
		"prices":{
			"USD":99,
			"NZD":139,
			"AUD":99,
			"CAD":99,
			"JPY":9800,
			"EUR":80,
			"GBP":70
		},
		"product_slug":"value_bundle",
		"tagline":"Blog, supercharged",
		"description":"Save up to 40% on our most popular upgrades. Get all of these great features to super-charge your blog in one simple purchase.",
		"capability":"manage_options",
		"cost":99,
		"bill_period":365,
		"product_type":"bundle",
		"available":"yes",
		"store":0,
		"width":500,
		"height":250,
		"multi":0,
		"support_document":"bundles",
		"bundle_product_ids":[
			9,
			12,
			45,
			15,
			5,
			16,
			6,
			46,
			54
		],
		"bill_period_label":"per year",
		"price":"$99"
	},
	{
	"product_id":1008,
	"product_name":"WordPress.com Business",
	"prices":{
		"USD":299,
		"NZD":399,
		"AUD":299,
		"CAD":299,
		"JPY":28800,
		"EUR":240,
		"GBP":210
	},
	"product_slug":"business-bundle",
	"tagline":"Build a great website",
	"description":"All you need to build a great website: live chat support, unlimited premium themes, easy ecommerce, unlimited storage, and a custom domain name.",
	"capability":"manage_options",
	"cost":299,
	"bill_period":365,
	"width":500,
	"height":435,
	"product_type":"bundle",
	"available":"yes",
	"bundle_product_ids":[
		12,
		45,
		15,
		5,
		48,
		50,
		49,
		16,
		6,
		46,
		54
	],
	"bill_period_label":"per year",
	"price":"$299"
	},
	{
	"product_id":1,
	"product_name":"Beginner",
	"prices":{
		"USD":0,
		"AUD":0,
		"CAD":0,
		"EUR":0,
		"GBP":0,
		"JPY":0
	},
	"product_slug":"free_plan",
	"tagline":"Get started",
	"description":"Get a free blog and be on your way to publishing your first post in less than five minutes.",
	"capability":"manage_options",
	"cost":0,
	"bill_period":-1,
	"product_type":"bundle",
	"available":"yes",
	"store":0,
	"bill_period_label":"for life",
	"price":"$0"
	}
];

exports.plans = plans;
