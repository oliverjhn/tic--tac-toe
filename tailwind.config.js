/** @type {import(tailwindcss).Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
            fontWeight: {
                regular: 400,
                medium: 500,
                bold: 700,
            },
        },
    },
    plugins: [require("@tailwindcss/container-queries"), require("daisyui")],
};
