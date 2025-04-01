const GA_ID = {
  development: "G-RCFCQCS7J4",
  production: "G-WV2039GK7B",
}

// 개발 환경에서는 3443 포트로 실행되므로 개발 환경에서는 개발 ID를 반환
export const getGaId = () => {
  const location = window.location.port

  if (location === "3443") {
    return GA_ID.development
  }

  return GA_ID.production
}

export const getGaScript = () => {
  const gaId = getGaId()

  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  script.async = true

  return script
}

export const getGaDataLayerScript = () => {
  const gaId = getGaId()
  const script = document.createElement("script")

  script.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${gaId}');
  `

  return script
}
