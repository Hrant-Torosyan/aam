import React, { useRef, useContext } from "react";
import "swiper/swiper-bundle.css";
import "./SimilarSlider.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import leftArrow from "../../../../svg/leftArrow.svg";
import rightArrow from "../../../../svg/rightArrow.svg";
import Product from "../../Product/Product";
import { MainContext } from "../../../../../app/App";

const SimilarSlider = ({ products = [], prodId, setProdId, handleImageError }) => {
	const mainCntx = useContext(MainContext);
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	const handleClick = (id) => {
		setProdId(id);
		window.scrollTo({ top: 0 });
	};

	const filteredProducts = [
		{
			projectId: 24,
			title: "Офис 1 / Этаж 1 / Кампус 2",
			description: "-",
			price: 116760.0,
			minPrice: 116760.0,
			country: "Армения",
			tags: ["Bali", "Недвижимость", "Коммерческая_недвижимость"],
			image: {
				name: "1739448058100.png",
				url: "http://aams.life//aam-media/projects/1739448058100.png",
			},
			logo: {
				name: "1739448218858.png",
				url: "http://aams.life//aam-media/projects/1739448218858.png",
			},
			active: true,
		},
		{
			projectId: 24,
			title: "Офис 1 / Этаж 1 / Кампус 2",
			description: "-",
			price: 116760.0,
			minPrice: 116760.0,
			country: "Армения",
			tags: ["Bali", "Недвижимость", "Коммерческая_недвижимость"],
			image: {
				name: "1739448058100.png",
				url: "http://aams.life//aam-media/projects/1739448058100.png",
			},
			logo: {
				name: "1739448218858.png",
				url: "http://aams.life//aam-media/projects/1739448218858.png",
			},
			active: true,
		},

		{
			projectId: 24,
			title: "Офис 1 / Этаж 1 / Кампус 2",
			description: "-",
			price: 116760.0,
			minPrice: 116760.0,
			country: "Армения",
			tags: ["Bali", "Недвижимость", "Коммерческая_недвижимость"],
			image: {
				name: "1739448058100.png",
				url: "http://aams.life//aam-media/projects/1739448058100.png",
			},
			logo: {
				name: "1739448218858.png",
				url: "http://aams.life//aam-media/projects/1739448218858.png",
			},
			active: true,
		},
		{
			projectId: 24,
			title: "Офис 1 / Этаж 1 / Кампус 2",
			description: "-",
			price: 116760.0,
			minPrice: 116760.0,
			country: "Армения",
			tags: ["Bali", "Недвижимость", "Коммерческая_недвижимость"],
			image: {
				name: "1739448058100.png",
				url: "http://aams.life//aam-media/projects/1739448058100.png",
			},
			logo: {
				name: "1739448218858.png",
				url: "http://aams.life//aam-media/projects/1739448218858.png",
			},
			active: true,
		},
		{
			projectId: 24,
			title: "Офис 1 / Этаж 1 / Кампус 2",
			description: "-",
			price: 116760.0,
			minPrice: 116760.0,
			country: "Армения",
			tags: ["Bali", "Недвижимость", "Коммерческая_недвижимость"],
			image: {
				name: "1739448058100.png",
				url: "http://aams.life//aam-media/projects/1739448058100.png",
			},
			logo: {
				name: "1739448218858.png",
				url: "http://aams.life//aam-media/projects/1739448218858.png",
			},
			active: true,
		},
	];

	if (!filteredProducts.length) return null;

	return (
		<div className="similarSliderWrapper">
			<div className="profileSlider">
				<h1 className="sliderTitle">Похожие проекты</h1>
				<Swiper
					modules={[Navigation]}
					spaceBetween={16}
					slidesPerView='auto'
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
						1280: { slidesPerView: 4 },
					}}
					navigation={{
						prevEl: prevRef.current,
						nextEl: nextRef.current,
					}}
					onBeforeInit={(swiper) => {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
					}}
					loop={false}
				>
					{filteredProducts.map((prod, index) => (
						<SwiperSlide key={prod.projectId || index} style={{ width: "280px" }}>
							<Product
								fullWidth={true}
								prod={prod}
								handleImageError={handleImageError}
								setHiddenHeader={mainCntx.setHiddenHeader}
								setProdId={handleClick}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<button ref={prevRef} className="customArrow prevArrow">
					<img src={leftArrow} alt="Previous" />
				</button>
				<button ref={nextRef} className="customArrow nextArrow">
					<img src={rightArrow} alt="Next" />
				</button>
			</div>
		</div>
	);
};

export default SimilarSlider;