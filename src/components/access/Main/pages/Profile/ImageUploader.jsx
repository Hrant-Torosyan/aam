import React, { useState } from "react";

function ImageUploader({ setImage, image, imageUrl }) {
	const [imageShow, setImageShow] = useState(null);
	const [error, setError] = useState(false);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 10 * 1024 * 1024) {
				// 10 MB
				setError(true);
			} else {
				setError(null);
				const reader = new FileReader();
				reader.onloadend = () => {
					setImageShow(reader.result);
					setImage(e.target.files);
				};
				reader.readAsDataURL(file);
			}

			// const reader = new FileReader();
			// reader.onload = () => {
			// 	setImageShow(reader.result);
			// 	setImage(e.target.files);
			// };
			// reader.readAsDataURL(file);
		}
	};

	return (
		<div className="imageUploadBlock">
			<div className="imageUpload">
				<img
					src={imageShow ? imageShow : imageUrl}
					alt="Preview"
					style={{ maxWidth: "100%", maxHeight: "400px" }}
				/>

				<label>
					<div className="fon">
						<img src="./images/upload.png" alt="upload" />
					</div>
					<input type="file" accept="image/*" onChange={handleImageChange} />
				</label>
			</div>
			{error && <p className="errorText">Размер файла не должен превышать 10 МБ.</p>}
		</div>
	);
}

export default ImageUploader;
