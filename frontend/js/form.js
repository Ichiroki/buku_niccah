const { z } = window.Zod


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm")

    const FormValidation = z.object({
        nama: z.string({required_error: "Nama harus diisi",})
        .min(8, "Karakter untuk nama minimal 8 huruf")
        .regex(/\w/g, "Nama tidak boleh kosong")
        .trim(),
        kota: z.string({required_error: "Kota asal harus diisi"}),
        handphone: z.string({required_error: "Nomor telepon harus diisi"})
        .min(8, "Nomor telepon tidak boleh dibawah 8 angka")
        .max(15, "Nomor telepon tidak boleh lebih dari 15 angka"),
        tamu: z.number({required_error: "Jumlah tamu harus diisi"})
        .positive("Tamu tidak boleh dibawah angka 1")
        .lte(50, "Jumlah tamu tidak boleh banyak")
        .finite("Jumlah tamu tidak boleh melebihi batas"),
        hubungan: z.string({required_error: "Hubungan dengan mempelai harus diisi"})
    })
    
    const showError = (inputId, message) => {
        const errorElement = document.getElementById(inputId + "-error")
        errorElement.textContent = message
        errorElement.style.color = "red"
    }
    
    const clearError = (inputId) => {
        const errorElement = document.getElementById(inputId + "-error")
        errorElement.textContent = ""
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const nama = document.getElementById("nama").value.trim()
        const kota = document.getElementById("kota").value.trim()
        const handphone = document.getElementById("handphone").value.trim()
        const tamu = parseInt(document.getElementById("tamu").value.trim())
        const hubungan = document.getElementById("hubungan").value.trim()
    
        const validationResult = FormValidation.safeParse({
            nama,
            kota,
            handphone,
            tamu,
            hubungan
        })
    
        if(!validationResult.success) {
            validationResult.error.issues.forEach((issue) => {
                const inputField = issue.path[0]
                showError(inputField, issue.message)
            })
            return;
        } else {
            ["nama", "kota", "handphone", "tamu", "hubungan"].forEach(clearError)
            form.action = "output_form.html"
            form.submit()
        }
    }
    
    form.addEventListener("submit", handleSubmit) 
})

