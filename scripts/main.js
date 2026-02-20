document.getElementById("consultIp").addEventListener("click", async (event) => {
    event.preventDefault();
    const htmlButtonSearch = consultIp.innerHTML
    const ipLocalization = document.getElementById("ipLocalization").value

    if (ipLocalization === "") {
        document.getElementById("displayAlert").style.display = "block"
        return
    } else {
        document.getElementById("displayAlert").style.display = "none"
    }

    consultIp.innerHTML = `<span class="texto">Await</span> <i class="fas fa-spinner fa-spin"></i>`
    setTimeout(() => {
        consultIp.innerHTML = htmlButtonSearch
    }, 2000)

    consultIp.disabled = true

    try {
        const response = await fetch(`https://ipapi.co/${ipLocalization}/json/`)
        const data = await response.json()

        document.getElementById("displayAlertInvalidIp").style.display = "none";
        
        const populationNumber = data.country_population
        const numberFormatPopulation = new Intl.NumberFormat("pt-BR").format(populationNumber)

        await new Promise(resolve => setTimeout(resolve, 2000))

        if (data.error) {
            throw new Error()
        }

        if (!data.error) {
            document.getElementById("utc_offset").value = data.utc_offset || "No data found"
            document.getElementById("country").value = data.country || "No data found"
            document.getElementById("ipaddress").value = data.ip || "No data found"
            document.getElementById("region").value = data.region || "No data found"
            document.getElementById("city").value = data.city || "No data found"
            document.getElementById("latitude").value = data.latitude || "No data found"
            document.getElementById("longitude").value = data.longitude || "No data found"
            document.getElementById("country_population").value = numberFormatPopulation || "No data found"
            document.getElementById("flag").src = `https://flagcdn.com/64x48/${data.country.toLowerCase()}.png`
        }

    } catch (error) {
        if (error) {
            document.getElementById("displayAlertInvalidIp").style.display = "block"
        }

        document.getElementById("flag").src = ""
        document.getElementById("country_population").value = "No data found"
        document.getElementById("ipaddress").value = "No data found"

    } finally {
        consultIp.disabled = false
    }
})
