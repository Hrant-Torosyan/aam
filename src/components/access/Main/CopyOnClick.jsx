import React, { useRef, useEffect } from "react";
import ClipboardJS from "clipboard";

const CopyOnClick = ({ text, children }) => {
	const textToCopyRef = useRef(null);

	useEffect(() => {
		const clipboard = new ClipboardJS(textToCopyRef.current);

		return () => {
			clipboard.destroy();
		};
	}, []);

	return (
		<span ref={textToCopyRef} data-clipboard-text={text}>
			{children}
		</span>
	);
};

export default CopyOnClick;
