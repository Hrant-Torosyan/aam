const BASE_URL = "http://145.223.99.13:8080/api/rest/";

export const CareerLevels = async () => {
    try {
        const res = await fetch(`${BASE_URL}users/profiles/career`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
            },
        });
        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error fetching products:", "error");
    }
};