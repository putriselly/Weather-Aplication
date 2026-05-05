let inputkota = document.getElementById('weather');
let infocuaca = document.getElementById('infocuaca');

function caricuaca() {
    let kota = inputkota.value.trim();
    if (!kota) return;

    let apiKey = 'e9422c4002248e6fd43423ca9f19332c';
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + kota + '&appid=' + apiKey + '&units=metric&lang=id';

    infocuaca.innerHTML = '<div class="loading">Mencari cuaca...</div>';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                infocuaca.innerHTML = '<div class="error">Kota tidak ditemukan. Coba lagi.</div>';
                return;
            }

            let iconCode = data.weather[0].icon;
            let iconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
            let suhu = Math.round(data.main.temp);
            let rasanya = Math.round(data.main.feels_like);
            let angin = Math.round(data.wind.speed * 3.6);

            infocuaca.innerHTML =
                '<div class="kartu">' +
                    '<div class="kartu-atas">' +
                        '<div>' +
                            '<div class="kota-nama">' + data.name + ', ' + data.sys.country + '</div>' +
                            '<div class="deskripsi">' + data.weather[0].description + '</div>' +
                        '</div>' +
                        '<img class="cuaca-icon" src="' + iconUrl + '" alt="' + data.weather[0].description + '">' +
                    '</div>' +
                    '<div class="suhu">' + suhu + '<span>°C</span></div>' +
                    '<div class="detail-grid">' +
                        '<div class="detail-item">' +
                            '<div class="detail-emoji">💧</div>' +
                            '<div class="detail-nilai">' + data.main.humidity + '%</div>' +
                            '<div class="detail-label">Kelembaban</div>' +
                        '</div>' +
                        '<div class="detail-item">' +
                            '<div class="detail-emoji">🌡️</div>' +
                            '<div class="detail-nilai">' + rasanya + '°C</div>' +
                            '<div class="detail-label">Terasa seperti</div>' +
                        '</div>' +
                        '<div class="detail-item">' +
                            '<div class="detail-emoji">💨</div>' +
                            '<div class="detail-nilai">' + angin + ' km/j</div>' +
                            '<div class="detail-label">Kec. Angin</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
        })
        .catch(() => {
            infocuaca.innerHTML = '<div class="error">Terjadi kesalahan. Periksa koneksi internet.</div>';
        });
}

inputkota.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') caricuaca();
});