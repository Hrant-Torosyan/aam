import React from "react";

const Search = ({ searchInp, setSearchInp }) => {
	return (
		<div className="search">
			<div className="inputStyle">
				<input
					onChange={(e) => {
						setSearchInp(e.target.value);
					}}
					value={searchInp}
					placeholder="Поиск по сайту"
					type="text"
				/>
			</div>

			<div className="icon">
				<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6.21859 0C2.78447 0 0 2.78447 0 6.21861C0 9.65275 2.78447 12.4372 6.21861 12.4372C7.53917 12.4372 8.76385 12.0253 9.77054 11.3237L9.77127 11.323L14.3833 15.935C14.4689 16.0206 14.6049 16.0228 14.6927 15.935L15.9357 14.692C16.0213 14.6064 16.0169 14.4645 15.935 14.3826L11.3237 9.77127C12.0253 8.76385 12.4372 7.53914 12.4372 6.21861C12.4372 2.78447 9.65272 0 6.21859 0ZM6.21859 10.974C3.59213 10.974 1.46318 8.84507 1.46318 6.21861C1.46318 3.59216 3.59216 1.46321 6.21859 1.46321C8.84501 1.46321 10.974 3.59216 10.974 6.21861C10.974 8.84507 8.84504 10.974 6.21859 10.974Z" fill="url(#paint0_linear_564_47281)" />
					<defs>
						<linearGradient id="paint0_linear_564_47281" x1="-3.76817" y1="-22" x2="20.6371" y2="-19.5961" gradientUnits="userSpaceOnUse">
							<stop offset="0.00394059" stopColor="#2C73F3" />
							<stop offset="1" stopColor="#30CDE7" />
						</linearGradient>
					</defs>
				</svg>
			</div>
		</div>
	);
};

export default Search;
