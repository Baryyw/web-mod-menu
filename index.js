function getExtension(url) {
  // Ambil ekstensi dari URL
  return url.split('.').pop().split('?')[0]; // Mengambil bagian setelah terakhir '.'
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
      const extension = getExtension(url.url); // Ambil ekstensi file

      if (extension === "js") {
          const script = document.createElement("script");
          script.src = url.url;
          script.onload = () => {
              console.log(`${url.name} Script loaded!`);
              resolve(); // Sukses
          };
          script.onerror = () => {
              const progressBar = document.getElementById("progressBar");
              progressBar.innerHTML = `ERROR WHILE LOADING RESOURCE: ${url.name}`;
              progressBar.style.backgroundColor = "#ff0000"; // Gagal
              reject(`Error loading ${url.name}`); // Menolak promise
          };
          document.body.appendChild(script);
      } else if (extension === "css") {
          const link = document.createElement("link");
          link.href = url.url;
          link.rel = "stylesheet";
          link.onload = () => {
              console.log(`${url.name} Style loaded!`);
              resolve(); // Sukses
          };
          link.onerror = () => {
              const progressBar = document.getElementById("progressBar");
              progressBar.innerHTML = `ERROR WHILE LOADING RESOURCE: ${url.name}`;
              progressBar.style.backgroundColor = "#ff0000"; // Gagal
              reject(`Error loading ${url.name}`); // Menolak promise
          };
          document.head.appendChild(link);
      }else{
        try {
          const script = document.createElement("script");
          script.src = url.url;
          script.onload = () => {
              console.log(`${url.name} Script loaded!`);
              resolve(); // Sukses
          };
          script.onerror = () => {
              const progressBar = document.getElementById("progressBar");
              progressBar.innerHTML = `ERROR WHILE LOADING RESOURCE: ${url.name}`;
              progressBar.style.backgroundColor = "#ff0000"; // Gagal
              reject(`Error loading ${url.name}`); // Menolak promise
          };
          document.body.appendChild(script);
        } catch (error) {
          const link = document.createElement("link");
          link.href = url.url;
          link.rel = "stylesheet";
          link.onload = () => {
              console.log(`${url.name} Style loaded!`);
              resolve(); // Sukses
          };
          link.onerror = () => {
              const progressBar = document.getElementById("progressBar");
              progressBar.innerHTML = `ERROR WHILE LOADING RESOURCE: ${url.name}`;
              progressBar.style.backgroundColor = "#ff0000"; // Gagal
              reject(`Error loading ${url.name}`); // Menolak promise
          };
          document.head.appendChild(link);
        }
      }
  });
}

let urlLoad = [
  {
      url: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js", // Full version of jQuery
      name: "jQuery",
  },
  {
      url: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js",
      name: "Popper-JS",
  },
  {
      url: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js", // Bootstrap JS after jQuery
      name: "Bootstrap-JS",
  },
  {
      url: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
      name: "Bootstrap-CSS",
  },
  {
      url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
      name: "Fontawesome",
  },
  {
      url: "https://cdn.jsdelivr.net/npm/sweetalert2@11",
      name: "Swal-JS",
  },
  // {
  //     url: "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css",
  //     name: "Swal-CSS",
  // },
  {
      url: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
      name: "Prism-JS",
  },
  {
      url: "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js",
      name: "Select2 - JS",
  },
  {
      url: "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css",
      name: "Select2 - CSS",
  },
  {
      url: "https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css",
      name: "Select2 X Bootstrap - CSS",
  },
]; 

// Load assets function remains the same

// Membuat overlay dan progress bar dengan style di JavaScript
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "white";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "1000";

  const progressBarContainer = document.createElement("div");
  progressBarContainer.id = "progressBarContainer";
  progressBarContainer.style.width = "80%";
  progressBarContainer.style.backgroundColor = "#ddd";
  progressBarContainer.style.borderRadius = "5px";
  progressBarContainer.style.overflow = "hidden";

  const progressBar = document.createElement("div");
  progressBar.id = "progressBar";
  progressBar.style.width = "0";
  progressBar.style.height = "30px";
  progressBar.style.backgroundColor = "#4caf50";
  progressBar.style.textAlign = "center";
  progressBar.style.lineHeight = "30px"; // Vertically center text
  progressBar.style.color = "white";
  progressBar.style.transition = "width 0.4s"; // Animasi transisi
  progressBarContainer.appendChild(progressBar);
  overlay.appendChild(progressBarContainer);
  document.body.appendChild(overlay);
}

// Memuat semua aset dan memperbarui progress bar
let totalAssets = urlLoad.length;
let loadedAssets = 0;
function loadAssets() {
  createOverlay(); // Membuat overlay

  urlLoad.forEach((element) => {
    loadScript(element)
      .then(() => {
        loadedAssets++;
        const progress = (loadedAssets / totalAssets) * 100;
        const progressBar = document.getElementById("progressBar");
        progressBar.style.width = progress + "%";
        progressBar.textContent = `${progress}%`;

        // Jika semua aset telah dimuat, hilangkan overlay
        if (loadedAssets === totalAssets) {
          setTimeout(() => {
            createModal();
            createFloationg();
            document.getElementById("overlay").style.display = "none"; // Menghilangkan overlay
          }, 500); // Delay sebelum menghilangkan overlay
        }
      })
      .catch((error) => {
        console.error(error);
        // Jika ada kesalahan, tetap tampilkan overlay
      });
  });
}

// Memulai pemuatan aset saat halaman dimuat
window.onload = loadAssets;
// Memanggil fungsi untuk memuat script lain
function createFloationg() {
  const floatingIcon = document.createElement("div");
  floatingIcon.style.position = "fixed";
  floatingIcon.style.bottom = "20px";
  floatingIcon.style.right = "20px";
  floatingIcon.style.cursor = "pointer";
  floatingIcon.style.width = "50px";
  floatingIcon.style.height = "50px";
  floatingIcon.style.border = "2px solid #007BFF"; // Warna border
  floatingIcon.style.borderRadius = "50%"; // Membuat ikon bulat
  floatingIcon.style.backgroundColor = "white"; // Latar belakang
  floatingIcon.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Efek bayangan
  floatingIcon.style.transition = "background-color 0.3s"; // Efek transisi

  // Membuat elemen gambar
  const iconImage = document.createElement("img");
  iconImage.src =
    "https://th.bing.com/th/id/OIP.V6vVZL3I_2Bw417EBnQhqwHaHa?rs=1&pid=ImgDetMain"; // Ganti dengan URL gambar yang Anda inginkan
  iconImage.alt = "Floating Icon";
  iconImage.style.width = "100%"; // Mengisi div
  iconImage.style.height = "100%"; // Mengisi div
  iconImage.style.borderRadius = "50%"; // Membuat gambar bulat
  // Menambahkan gambar ke div ikon
  floatingIcon.appendChild(iconImage);

  // Menambahkan ikon ke body
  document.body.appendChild(floatingIcon);

  // Event klik pada ikon untuk toggle menu
  floatingIcon.onclick = function (event) {
    $("#myModal").modal({
      backdrop: "static", // Mencegah menutup saat mengklik di luar modal
      keyboard: false, // Mencegah menutup saat menekan tombol ESC
    });
    return;
    const textarea = document.createElement("textarea");
    textarea.placeholder = "Tulis kode di sini...";
    textarea.style.resize = "none";
    textarea.style.height = "200px";
    textarea.style.width = "100%"; // Menggunakan 100% agar sesuai dengan konten
    textarea.className = "language-javascript form-control"; // Ganti 'javascript' dengan bahasa yang diinginkan
    textarea.style.fontFamily = "monospace"; // Menggunakan font monospace untuk tampilan kode

    // Menampilkan SweetAlert dengan textarea
    swal({
      title: "Input Kode",
      content: textarea,
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((value) => {
      if (value) {
        // Membuat elemen pre dan code untuk menampilkan kode yang di-highlight
        const codeContainer = document.createElement("div");
        codeContainer.className = "code-container";

        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.className = "language-javascript"; // Ganti 'javascript' dengan bahasa yang diinginkan
        code.textContent = textarea.value; // Mengambil nilai dari textarea

        // Menambahkan elemen ke dalam codeContainer
        pre.appendChild(code);
        codeContainer.appendChild(pre);
        document.body.appendChild(codeContainer); // Menambahkan ke body atau tempat yang sesuai

        // Menyoroti kode dengan Prism
        Prism.highlightElement(code);
      }
    });

    // Menambahkan Prism.js setelah swal terbuka
    setTimeout(() => {
      Prism.highlightElement(textarea); // Menyorot textarea
    }, 500);
  };
}
function createModal() {
  console.log("Creating Modal....");
  // Create a temporary container to parse the HTML string
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="modalTitle">Inject Menu</h5>
                  </div>
                  <div class="modal-body">
                      <table class="table">
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Get This Web Source Code</td>
                                  <td>
                                      <button class="btn btn-success" onclick="downloadThis()">
                                          <i class="fas fa-play"></i>
                                      </button>
                                  </td>
                              </tr>
                              <tr>
                                  <td>HTML Input Editor</td>
                                  <td>
                                      <button class="btn btn-success" onclick=' $("#myModal2").modal({
                                        backdrop: "static", // Mencegah menutup saat mengklik di luar modal
                                        keyboard: false, // Mencegah menutup saat menekan tombol ESC
                                      });'>
                                          <i class="fas fa-play"></i>
                                      </button>
                                  </td>
                              </tr>
                              
                          </tbody>
                      </table>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="closeModal('1')">Tutup</button>
                  </div>
              </div>
          </div>
      </div>
  `;
  const modalContainer2 = document.createElement("div");
  modalContainer2.innerHTML = `
      <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="modalTitle">HTML INPUT INSPECTOR</h5>
                  </div>
                  <div class="modal-body">
                  <div id="inputListContainer"></div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal('2')">Back</button>
                  </div>
              </div>
          </div>
      </div>
  `;
  
  // Append the modal to the body
  document.body.appendChild(modalContainer);
  document.body.appendChild(modalContainer2);
  $('#myModal2').on('shown.bs.modal', function () {
    
    populateInputInspector();
});
  // Show the modal
  // $('#myModal').modal('show'); // Pastikan menggunakan jQuery untuk menampilkan modal
}


function populateInputInspector() {
  const inputListContainer = document.getElementById("inputListContainer");

  // Kosongkan kontainer sebelum mempopulasi
  inputListContainer.innerHTML = '';

  const inputs = document.querySelectorAll("input, textarea, select");

  if (inputs.length === 0) {
      inputListContainer.innerHTML = "<p class='text-danger'>No input elements found on this page.</p>";
      return;
  }

  // Daftar saran untuk nama atribut
  const attributeSuggestions = [
      "type",
      "value",
      "name",
      "id",
      "class",
      "placeholder",
      "required",
      "disabled",
      "readonly",
      "checked",
      "selected",
      "style",
      "maxlength",
      "minlength",
      "pattern",
      "title"
  ];

  inputs.forEach((input, index) => {
      const inputHTML = input.outerHTML;

      inputListContainer.innerHTML += `
          <div class="card mb-3">
              <div class="card-header" id="heading${index}">
                  <h5 class="mb-0">
                      <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                          Input ${index + 1}
                      </button>
                  </h5>
              </div>

              <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#inputListContainer">
              <div class="card-body">
                  <h6 class="font-weight-bold">Input HTML:</h6>
                  <pre><code class="language-html">${escapeHtml(inputHTML)}</code></pre>
                  <div class="mt-3 input-group">
                      <div class="col-4 col-md-3 px-0">
                          <select id="attrName${index}" class="form-control select2">
                              <option value="">Select attribute</option>
                              ${attributeSuggestions.map(attr => `<option value="${attr}">${attr}</option>`).join('')}
                          </select>
                      </div>
                      <span class="input-group-text col-1 col-md-auto px-2 text-center">=</span>
                      <input type="text" placeholder="Attribute value" id="attrValue${index}" class="form-control col">
                  </div>
                  <button class="btn btn-primary btn-block mt-3" onclick="updateAttribute(${index})">Update</button>
              </div>
          </div>
          
          </div>
      `;
  });

  // Initialize Select2
  $('.select2').select2({
    theme: "bootstrap-5",
      placeholder: "Select attribute",
      allowClear: true
  });

  // Initialize Prism.js to highlight syntax
  Prism.highlightAll();
}

// Escape HTML for display in code block
function escapeHtml(html) {
  const text = document.createTextNode(html);
  const div = document.createElement('div');
  div.appendChild(text);
  return div.innerHTML;
}

// Function to update the attribute of the input element
function updateAttribute(index) {
  const inputElement = document.querySelectorAll("input, textarea, select")[index];
  const attrName = document.getElementById(`attrName${index}`).value;
  const attrValue = document.getElementById(`attrValue${index}`).value;

  if (attrName) {
      inputElement.setAttribute(attrName, attrValue);
      Swal.fire({
        icon: "success",
        title: "Yeay...",
        text: `Your Input Attribute ( ${attrName} ) has changed with value : ${attrValue}`,
      });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please select a attribute to change",
    });
  }
}

// Fungsi untuk mengambil dan mengunduh kode sumber dari halaman saat ini
async function fetchAndDownloadCurrentPageSource() {
  try {
    // Mengambil URL halaman saat ini
    const currentUrl = window.location.href;

    // Mengambil sumber halaman
    const response = await fetch(currentUrl, { mode: "cors" });

    // Memeriksa apakah permintaan berhasil
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Mendapatkan teks dari respons
    const text = await response.text();

    // Mengunduh file HTML
    downloadFile(getDomainName(currentUrl) + " - SOURCE.html", text);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
function getDomainName(url) {
  const urlObj = new URL(url);
  return urlObj.hostname; // Mengambil hostname (misalnya, "127.0.0.1" dari "http://127.0.0.1:5500")
}

// Fungsi untuk mengunduh file
function downloadFile(filename, text) {
  // Membuat elemen link
  const element = document.createElement("a");

  // Membuat blob dari teks dan mendapatkan URL-nya
  const file = new Blob([text], { type: "text/html" });
  console.log(file);
  const url = URL.createObjectURL(file);

  // Mengatur atribut dan mengklik elemen link untuk mengunduh
  element.setAttribute("href", url);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();

  // Menghapus elemen setelah pengunduhan
  document.body.removeChild(element);
}

// Memanggil fungsi untuk mengambil dan mengunduh sumber halaman saat ini
function downloadThis() {
  fetchAndDownloadCurrentPageSource();
}

// Fungsi untuk menutup modal
function closeModal(e) {
  const inputListContainer = document.getElementById("inputListContainer");

  // Kosongkan kontainer sebelum mempopulasi
  inputListContainer.innerHTML = '';
  $(`#myModal${e}`).modal("hide"); // Pastikan menggunakan jQuery untuk menyembunyikan modal
}
