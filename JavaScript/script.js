document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const alertPlaceholder = document.getElementById("alertPlaceholder");

    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
            `   <div>${message}</div>`,
            `   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
            `</div>`
        ].join('');
        
        alertPlaceholder.innerHTML = '';
        alertPlaceholder.append(wrapper);
    };

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("inputName").value.trim();
            const email = document.getElementById("inputEmail").value.trim();
            const message = document.getElementById("inputMessage").value.trim();

            if (name === "" || email === "" || message === "") {
                appendAlert('Semua kolom (Nama, Email, Pesan) wajib diisi!', 'danger');
            } else if (!email.includes("@")) {
                appendAlert('Format email tidak valid!', 'warning');
            } else {
                appendAlert(`Terima kasih ${name}, pesan Anda berhasil dikirim!`, 'success');
                contactForm.reset();
            }
        });
    }
});