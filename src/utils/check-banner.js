export function checkOpenBanner(movieNominationsLength) {
  const successBanner = document.getElementById("success-banner");
  if (movieNominationsLength >= 5) {
    successBanner.classList.remove("close")
    successBanner.classList.add("open");
  }
}

export function checkCloseBanner(movieNominationsLength) {
  const successBanner = document.getElementById("success-banner");
  if (movieNominationsLength === 4) {
    successBanner.classList.remove("open");
    successBanner.classList.add("close")
  }
}