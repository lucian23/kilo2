/* ============================================
   800m Athletics Blog - Funcționalități Avansate
   JavaScript pentru căutare, filtrare, comentarii
============================================ */

// Date mock pentru demo
const articlesData = [
    {
        id: 1,
        title: "Tehnica Perfectă de Alergare la 800 Metri",
        category: "tehnica",
        date: "2026-02-15",
        excerpt: "Descoperă secretul formei corecte de alergare care maximizează eficiența.",
        readTime: "8 min",
        views: 1200
    },
    {
        id: 2,
        title: "Program de Antrenament Avansat pentru 800m",
        category: "antrenament",
        date: "2026-02-14",
        excerpt: "Planificarea sezonului competițional cu periodizare inteligentă.",
        readTime: "12 min",
        views: 980
    },
    {
        id: 3,
        title: "Nutriție pentru Performanță Maximă la 800m",
        category: "nutritie",
        date: "2026-02-13",
        excerpt: "Combustibilul optim pentru alergători: ce, când și cum să mănânci.",
        readTime: "10 min",
        views: 1500
    },
    {
        id: 4,
        title: "Pregătirea Mentală pentru Competiții",
        category: "mental",
        date: "2026-02-12",
        excerpt: "Tehnici de visualizare și control al anxietății înainte de cursă.",
        readTime: "6 min",
        views: 850
    },
    {
        id: 5,
        title: "Prevenirea Accidentărilor la Alergători",
        category: "preventie",
        date: "2026-02-11",
        excerpt: "Cum să eviți accidentările comune și să te menții sănătos.",
        readTime: "9 min",
        views: 1100
    },
    {
        id: 6,
        title: "Echipamentul Ideal pentru 800m",
        category: "echipament",
        date: "2026-02-10",
        excerpt: "Încălțăminte, îmbrăcăminte și accesorii pentru performanță maximă.",
        readTime: "7 min",
        views: 920
    }
];

const categories = [
    { id: "toate", name: "Toate Articolele", count: 15 },
    { id: "tehnica", name: "Tehnică", count: 8 },
    { id: "antrenament", name: "Antrenament", count: 12 },
    { id: "nutritie", name: "Nutriție", count: 5 },
    { id: "mental", name: "Pregătire Mentală", count: 6 },
    { id: "preventie", name: "Prevenire Accidentări", count: 4 },
    { id: "echipament", name: "Echipament", count: 3 }
];

// Comentarii mock
let comments = [
    {
        id: 1,
        articleId: 1,
        author: "Alex Popescu",
        date: "2026-02-16",
        content: "Excelent articol! Am aplicat sfaturile și mi-am îmbunătățit timpul cu 2 secunde.",
        avatar: "👤"
    },
    {
        id: 2,
        articleId: 1,
        author: "Maria Ionescu",
        date: "2026-02-17",
        content: "Foarte utile explicațiile despre respirație. Mulțumesc!",
        avatar: "👤"
    }
];

// ========== FUNCȚIE DE CĂUTARE ==========
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }
        
        const results = articlesData.filter(article => 
            article.title.toLowerCase().includes(query) || 
            article.excerpt.toLowerCase().includes(query)
        );
        
        displaySearchResults(results);
    });
    
    // Ascunde rezultatele când dai click în altă parte
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item no-results">
                <i class="fas fa-search"></i>
                <span>Nu s-au găsit rezultate</span>
            </div>
        `;
        searchResults.classList.add('active');
        return;
    }
    
    let html = '';
    results.slice(0, 5).forEach(article => {
        html += `
            <a href="#" class="search-result-item" data-article-id="${article.id}">
                <div class="search-result-content">
                    <h4>${article.title}</h4>
                    <p>${article.excerpt}</p>
                    <div class="search-result-meta">
                        <span><i class="far fa-clock"></i> ${article.readTime}</span>
                        <span><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
                    </div>
                </div>
            </a>
        `;
    });
    
    if (results.length > 5) {
        html += `
            <div class="search-result-item view-all">
                <a href="/articole?q=${encodeURIComponent(searchInput.value)}">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Vezi toate ${results.length} rezultate</span>
                </a>
            </div>
        `;
    }
    
    searchResults.innerHTML = html;
    searchResults.classList.add('active');
    
    // Adaugă event listeners pentru rezultate
    document.querySelectorAll('.search-result-item[data-article-id]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article-id');
            alert(`Navighează la articolul ${articleId} (în implementarea reală)`);
            document.getElementById('searchResults').classList.remove('active');
        });
    });
}

// ========== FILTRARE CATEGORII ==========
function initCategoryFilter() {
    const filterButtons = document.querySelectorAll('.category-filter-btn');
    const articlesContainer = document.getElementById('articlesContainer');
    
    if (!filterButtons.length || !articlesContainer) return;
    
    // Afișează toate articolele inițial
    displayArticles(articlesData);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Elimină clasa active de la toate butoanele
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adaugă clasa active la butonul curent
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterArticles(category);
        });
    });
}

function filterArticles(category) {
    let filteredArticles;
    
    if (category === 'toate') {
        filteredArticles = articlesData;
    } else {
        filteredArticles = articlesData.filter(article => article.category === category);
    }
    
    displayArticles(filteredArticles);
    
    // Animație pentru schimbare
    const articlesContainer = document.getElementById('articlesContainer');
    articlesContainer.style.opacity = '0.5';
    setTimeout(() => {
        articlesContainer.style.opacity = '1';
    }, 300);
}

function displayArticles(articles) {
    const articlesContainer = document.getElementById('articlesContainer');
    
    if (!articlesContainer) return;
    
    if (articles.length === 0) {
        articlesContainer.innerHTML = `
            <div class="no-articles">
                <i class="fas fa-search"></i>
                <h3>Nu s-au găsit articole</h3>
                <p>Încearcă o altă categorie sau termen de căutare.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    articles.forEach(article => {
        html += `
            <article class="article-card">
                <div class="article-image">
                    <div class="article-category">${getCategoryName(article.category)}</div>
                    <img src="https://images.unsplash.com/photo-1552674605-db6ffd8facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="${article.title}">
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <span class="article-date">
                            <i class="far fa-calendar"></i>
                            ${formatDate(article.date)}
                        </span>
                        <span class="article-read-time">
                            <i class="far fa-clock"></i>
                            ${article.readTime}
                        </span>
                    </div>
                    <h3 class="article-title">
                        <a href="#">${article.title}</a>
                    </h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-footer">
                        <a href="#" class="read-more" data-article-id="${article.id}">
                            <span>Citește articolul</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                        <div class="article-stats">
                            <span><i class="far fa-eye"></i> ${formatNumber(article.views)}</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    });
    
    articlesContainer.innerHTML = html;
    
    // Adaugă event listeners pentru butoanele "Citește articolul"
    document.querySelectorAll('.read-more[data-article-id]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article-id');
            alert(`Navighează la articolul ${articleId} (în implementarea reală)`);
        });
    });
}

// ========== SISTEM DE COMENTARII ==========
function initComments() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    
    if (!commentForm || !commentsList) return;
    
    // Afișează comentariile existente
    displayComments();
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('commentName');
        const emailInput = document.getElementById('commentEmail');
        const contentInput = document.getElementById('commentContent');
        
        if (!nameInput.value.trim() || !contentInput.value.trim()) {
            alert('Te rugăm să completezi numele și comentariul.');
            return;
        }
        
        const newComment = {
            id: comments.length + 1,
            articleId: 1, // În implementarea reală, ar fi ID-ul articolului curent
            author: nameInput.value.trim(),
            date: new Date().toISOString().split('T')[0],
            content: contentInput.value.trim(),
            avatar: '👤'
        };
        
        comments.push(newComment);
        displayComments();
        
        // Reset form
        nameInput.value = '';
        emailInput.value = '';
        contentInput.value = '';
        
        // Mesaj de succes
        showNotification('Comentariul tău a fost adăugat cu succes!', 'success');
    });
}

function displayComments() {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    if (comments.length === 0) {
        commentsList.innerHTML = `
            <div class="no-comments">
                <i class="far fa-comment"></i>
                <p>Niciun comentariu încă. Fii primul care comentează!</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    comments.forEach(comment => {
        html += `
            <div class="comment">
                <div class="comment-avatar">
                    ${comment.avatar}
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4 class="comment-author">${comment.author}</h4>
                        <span class="comment-date">${formatDate(comment.date)}</span>
                    </div>
                    <p class="comment-text">${comment.content}</p>
                </div>
            </div>
        `;
    });
    
    commentsList.innerHTML = html;
}

// ========== SOCIAL SHARE ==========
function initSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const url = window.location.href;
            const title = document.title;
            
            let shareUrl;
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                    break;
                default:
                    return;
            }
            
            // Deschide fereastra de share
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// ========== FUNCȚII UTILITARE ==========
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function getCategoryName(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'General';
}

function showNotification(message, type = 'info') {
    // Creează elementul de notificare
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Adaugă în document
    document.body.appendChild(notification);
    
    // Animație de intrare
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Elimină după 3 secunde
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ========== INIȚIALIZARE ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('800m Athletics Blog - Funcționalități încărcate');
    
    // Inițializează toate funcționalitățile
    initSearch();
    initCategoryFilter();
    initComments();
    initSocialShare();
    
    // Adaugă stiluri pentru notificări
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification-success {
            border-left: 4px solid #00A896;
        }
        
        .notification-info {
            border-left: 4px solid #004E89;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-success i {
            color: #00A896;
        }
        
        .notification-info i {
            color: #004E89;
        }
        
        .search-results {
            position: absolute;
            top