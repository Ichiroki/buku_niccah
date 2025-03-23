// Buat generate character random
function randChar(length) {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVXYZ'
    let res = ""

    for(let i = 0; i < length; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return res
}

$(document).ready(async () => {    
    const params = new URLSearchParams(window.location.search)
    const id = randChar(10)
    const nama = params.get('nama')
    const kota = params.get('kota')
    const handphone = params.get('handphone')
    const tamu = params.get('tamu')
    const hubungan = params.get('hubungan')

    const downloadDiv = document.getElementById('download-div')

    document.getElementById('outputID').textContent = id
    document.getElementById('outputnama').textContent = nama
    document.getElementById('outputkota').textContent = kota
    document.getElementById('outputhandphone').textContent = handphone
    document.getElementById('outputtamu').textContent = tamu
    document.getElementById('outputhubungan').textContent = hubungan

    try {
        
        const response = await fetch('http://localhost:3000/generate-pdf', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
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
    
        const download = document.createElement('a')
        download.innerHTML = "Download Undangan"
        download.classList.add('download')
        download.href = url
        download.download = "undangan.pdf"
        downloadDiv.appendChild(download)
    
        download.addEventListener('click', function() {
            setTimeout(() => {
                window.URL.revokeObjectURL(url)
            }, 2000)
        })
    } catch(e) {
        console.error("Error:", e)
    }
})
