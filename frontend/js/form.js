$('#submit').on("click", async (e) => {
    e.preventDefault()

    let nama = document.querySelector('#nama').value
    let kota = document.querySelector('#kota').value
    let handphone = document.querySelector('#handphone').value
    let tamu = document.querySelector('#tamu').value
    let hubungan = document.querySelector('#hubungan').value

    try {
        const response = await fetch('http://localhost:3000/generate-pdf', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nama,
                kota,
                handphone,
                tamu,
                hubungan
            })
        })

        if(!response.ok) throw new Error("Gagal membuat PDF")

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "undangan.pdf"
        document.body.appendChild(a)
        a.click()

        window.URL.revokeObjectURL(url)
    } catch(e) {
        console.error("Error:", error)
    }
})