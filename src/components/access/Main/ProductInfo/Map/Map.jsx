import React from "react";
import "./Map.scss";
import "./MapResponsive.scss";

const Map = () => {
    return (
        <div className="map">
            <h1>Расположение</h1>
            <div className="mapContainer prodInfoCard">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d577332.5668041334!2d36.72620128208206!3d55.581033488481154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3d44d6cc5757cf4c!2sMoscow%2C%20Russia!5e0!3m2!1sen!2sam!4v1738462452108!5m2!1sen!2sam"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of Moscow"
                ></iframe>
            </div>
        </div>
    );
};

export default Map;