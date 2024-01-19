"use client";

import React, { useState } from "react";
import quotes from "../../lib/quotes";

const Quote = () => {
	const [quote, setQuote] = useState(quotes[0]);

	const changeQuote = () => {
		let newQuote;
		do {
			newQuote = quotes[Math.floor(Math.random() * quotes.length)];
		} while (newQuote === quote);

		setQuote(newQuote);
	};

	return (
		<div
			className="text-sm font-semibold hover:underline underline-offset-from-font decoration-[#8F8F8F] cursor-pointer select-none flex flex-col justify-end items-end"
			onClick={changeQuote}
		>
			<p className="italic text-xs font-extralight">
				&quot;{quote.quote}&quot;
			</p>
			<p className="text-xs">{quote.author}</p>
		</div>
	);
};

export default Quote;
