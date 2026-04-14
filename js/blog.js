
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card');

    // Función para filtrar y buscar
    function filterArticles() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        articles.forEach(article => {
            // Obtener datos del artículo
            const title = article.querySelector('h3').textContent.toLowerCase();
            const text = article.querySelector('p').textContent.toLowerCase();
            const category = article.getAttribute('data-category');

            // Lógica: Coincide con la búsqueda Y coincide con el filtro
            const matchesSearch = title.includes(searchTerm) || text.includes(searchTerm);
            const matchesFilter = activeFilter === 'todos' || category === activeFilter;

            if (matchesSearch && matchesFilter) {
                article.style.display = 'flex'; // Mostrar
            } else {
                article.style.display = 'none'; // Ocultar
            }
        });
    }

    // Escuchar cuando se escribe en el buscador
    searchInput.addEventListener('keyup', filterArticles);

    // Escuchar cuando se hace clic en los filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Quitar clase active a todos y ponérsela al clicado
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterArticles();
        });
    });
});
