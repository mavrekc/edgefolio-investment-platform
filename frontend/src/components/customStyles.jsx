export const customLoginButton = (theme) => ({
  ["--bs-btn-color"]: "rgba(255,255,255,0.8)",
  ["--bs-btn-bg"]: theme === 'dark' ? "rgb(96, 77, 178)" : "rgb(58, 179, 76)",
  ["--bs-btn-border-color"]: theme === 'dark' ? "rgb(129, 93, 200)" : "rgb(97, 205, 113)",
  ["--bs-btn-hover-color"]: "rgba(255,255,255,0.8)",
  ["--bs-btn-hover-bg"]: theme === 'dark' ? "rgb(50, 40, 93)" : "rgb(52, 160, 68)",
  ["--bs-btn-hover-border-color"]: theme === 'dark' ? "rgba(80, 64, 150, 1)" : "rgb(58, 179, 76)",
  ["--bs-btn-focus-shadow-rgb"]: "32, 111, 206",
  ["--bs-btn-active-color"]: "rgba(255,255,255,0.8)",
  ["--bs-btn-active-bg"]: theme === 'dark' ? "rgb(96, 77, 178)" : "rgb(58, 179, 76)",
  ["--bs-btn-active-border-color"]: theme === 'dark' ? "rgb(129, 93, 200)" : "rgb(97, 205, 113)",
  ["--bs-btn-active-shadow"]: "inset 0 3px 5px rgba(0, 0, 0, 0.125)",
  ["--bs-btn-disabled-color"]: "rgba(255,255,255,0.7)",
  ["--bs-btn-disabled-bg"]: "rgb(86, 86, 86)",
  ["--bs-btn-disabled-border-color"]: "rgb(73, 73, 73)",
});

export const customLoginInput = (theme) => ({
  ["--bs-body-color"]: theme === 'dark' ? "rgb(217, 223, 230)" : "rgb(217, 223, 230)",
  ["--bs-body-bg"]: theme === 'dark' ? "rgba(92, 55, 39, 0.45)" : "rgba(90, 109, 167, 1)",
  ["--bs-border-color"]: theme === 'dark' ? "rgba(192, 114, 88, 0.55)" : "rgb(35, 62, 146)",
})