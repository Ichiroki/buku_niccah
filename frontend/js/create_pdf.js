// Buat generate character random
const lastCharOfName = (name) => {
    let left = 0; right = name.length - 1
    return [name[left], name[right]].join('').toUpperCase()
}

const lastCharOfPhone = (phone) => {
    let right = phone.length - 1
    return [phone[right - 1], phone[right]].join('')
}

$(document).ready(async () => {
    const params = new URLSearchParams(window.location.search)
    const nama = params.get('nama')
    const kota = params.get('kota')
    const handphone = params.get('handphone')
    const tamu = parseInt(params.get('tamu'))
    const hubungan = params.get('hubungan')

    const id = `DDMMYY${lastCharOfName(nama)}` + `${lastCharOfPhone(handphone)}`

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

        const downloadDiv = document.createElement('div')
        const download = document.createElement('a')
        const downloadText = document.createElement('span')

        downloadText.innerHTML = "Download Undangan"
        download.classList.add('download')
        download.href = url
        download.download = "undangan.pdf"
        download.appendChild(downloadText)
        downloadDiv.appendChild(download)
        
        document.querySelector('.container').appendChild(downloadDiv)
    
        download.addEventListener('click', function() {
            setTimeout(() => {
                window.URL.revokeObjectURL(url)
            }, 2000)
        })
    } catch(e) {
        console.error("Error:", e)
    }
})