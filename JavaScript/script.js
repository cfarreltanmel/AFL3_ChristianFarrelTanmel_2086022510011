document.addEventListener("DOMContentLoaded", function () {
    // 1. Efek Scroll Navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            } else {
                navbar.classList.remove('shadow-sm');
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // 2. Efek Typewriter di Home
    const heroDescription = document.querySelector('#hero .lead');
    if (heroDescription) {
        const text = heroDescription.innerText;
        heroDescription.innerText = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroDescription.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 1000); 
    }

    // 3. Animasi Masuk (Entrance) di Halaman About
    if (document.title.includes("About")) {
        const aboutCard = document.querySelector('.card');
        const aboutImage = document.querySelector('.img-fluid');
        
        if (aboutCard && aboutImage) {
            aboutCard.style.opacity = "0";
            aboutCard.style.transform = "translateX(50px)";
            aboutCard.style.transition = "all 1s ease-out";
            
            aboutImage.style.opacity = "0";
            aboutImage.style.transform = "translateX(-50px)";
            aboutImage.style.transition = "all 1s ease-out";
            
            setTimeout(() => {
                aboutCard.style.opacity = "1";
                aboutCard.style.transform = "translateX(0)";
                aboutImage.style.opacity = "1";
                aboutImage.style.transform = "translateX(0)";
            }, 100);
        }
    }

    // 4. Animasi Progress Bar (Skills)
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length > 0) {
        progressBars.forEach(bar => {
            bar.setAttribute('data-target', bar.style.width);
            bar.style.width = '0%';
            bar.style.transition = 'width 1.5s ease-in-out';
        });

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.getAttribute('data-target');
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    // 5. Fitur Modal untuk Projects
    const projectImages = document.querySelectorAll('.card-img-top');
    if (projectImages.length > 0 && (document.title.includes("Projects") || document.title.includes("Project"))) {
        
        const customDescriptions = {
            "Mockup Design WikiPage": "Project ini merupakan tugas kampus saya untuk mata kuliah Web Programming. Disini, saya di berikan tugas untuk membuat Mockup Design dari Web page yang ingin saya buat. Saya memilih WikiPage disini makanya Mockup design nya berupa WikiPage.",
            "Smart Home Device": "Project ini merupakan tugas kampus saya untuk mata kuliah OOP (Object Oriented Programming). Disini, saya di berikan tugas untuk merancang sebuah Smart Home System yang terdiri dari beberapa Smart Device dengan menggunakan Java.",
            "MLBB Item Tree": "Project ini merupakan tugas kampus saya untuk mata kuliah Data Structure dengan materi Tree Traversal. Disini, saya di berikan tugas untuk merancang sebuah program untuk menghasilkan output sesuai dengan yang di pilih oleh user. Contohnya: Saatnya user menginput (2) maka program akan mencetak semua item yang dibutuhkan dan pathnya masing-masing agar bisa membeli sebuah final item atau dengan kata lain, program akan melakukan metode traversal DFS pre-order/prefix untuk mencetak semua node yang di ada di dalam tree tersebut, mulai dari root hingga ke leaf-leaf yang ada"
        };

        const projectModalHTML = `
        <div class="modal fade" id="projectModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header text-white bg-primary">
                        <h5 class="modal-title fw-bold" id="projectModalTitle"></h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center p-4">
                        <img src="" id="projectModalImage" class="img-fluid rounded mb-4 shadow-sm" alt="Project Image">
                        <p id="projectModalDesc" class="text-muted mb-0" style="font-size: 1.1rem; line-height: 1.6;"></p>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', projectModalHTML);
        
        const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
        const modalTitle = document.getElementById('projectModalTitle');
        const modalImage = document.getElementById('projectModalImage');
        const modalDesc = document.getElementById('projectModalDesc');

        projectImages.forEach(img => {
            img.classList.add('project-img-hover'); // Class dari CSS.css              
            img.addEventListener('click', function() {
                const title = this.closest('.card').querySelector('.card-title').innerText.trim();
                modalTitle.innerText = title;
                modalImage.src = this.src;
                modalDesc.innerText = customDescriptions[title] || "Deskripsi lengkap untuk project ini sedang disiapkan.";
                projectModal.show();
            });
        });
    }

    // 6. Fitur Modal untuk Gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    if (galleryImages.length > 0) {
        const modalHTML = `
        <div class="modal fade" id="galleryModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-transparent border-0">
                    <div class="modal-body text-center position-relative p-0">
                        <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 10;"></button>
                        <img src="" id="modalImage" class="img-fluid rounded shadow-lg" alt="Enlarged Image" style="max-height: 90vh;">
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
        const modalImage = document.getElementById('modalImage');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                modalImage.src = this.src;
                galleryModal.show();
            });
        });
    }

    // 7. Validasi Form Contact
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const alertPlaceholder = document.getElementById("alertPlaceholder");
        
        const appendAlert = (message, type) => {
            alertPlaceholder.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
                    <div>${message}</div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
        };

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("inputName").value.trim();
            const email = document.getElementById("inputEmail").value.trim();
            const message = document.getElementById("inputMessage").value.trim();
            
            if (!name || !email || !message) { // Lebih simpel dari mengecek === ""
                appendAlert('Semua kolom wajib diisi!', 'danger');
            } else if (!email.includes("@") || !email.includes(".")) {
                appendAlert('Format email tidak valid!', 'warning');
            } else {
                appendAlert(`Terima kasih ${name}, pesan Anda berhasil terkirim!`, 'success');
                contactForm.reset();
            }
        });
    }
});