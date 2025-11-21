/**
 * git.js
 * Gestion de l'affichage des dépôts GitHub (recherche + rendu cartes).
 * - Pose par défaut : données d'exemple (reposSample).
 * - Option : décommenter la section fetchGithub() pour récupérer depuis l'API GitHub.
 *
 * Intégration :
 * <script src="{{ asset('js/git.js') }}"></script>
 */


/**
 * renderRepos(list)
 * Injecte les cartes de repo dans #reposGrid
 */
function renderRepos(list, limit = 6) {
    const reposGrid = document.getElementById('reposGrid');
    if (!reposGrid) return;
    reposGrid.innerHTML = '';

    // limiter l’affichage à 6 si on n’est PAS en recherche
    const urlParams = new URLSearchParams(window.location.search);
    const searchActive = urlParams.get('q');

    const dataToDisplay = searchActive ? list : list.slice(0, limit);

    if (!list || list.length === 0) {
        reposGrid.innerHTML = '<div class="col-12"><p class="text-muted">Aucun dépôt trouvé.</p></div>';
        return;
    }

    dataToDisplay.forEach(r => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
      <div class="repo-card p-3 h-100">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h5 class="h6 mb-0">${escapeHtml(r.name)}</h5>
          <small class="text-muted">${escapeHtml(r.lang || '')}</small>
        </div>
        <p class="small text-muted">${escapeHtml(r.desc || '')}</p>
        <div class="mt-3 d-flex justify-content-between align-items-center">
          <a class="btn btn-sm btn-outline-primary" href="${r.url || '#'}" target="_blank" rel="noopener">Voir</a>
          <div class="flex">
             <div class="text-muted small"><i class="fa fa-star" aria-hidden="true"></i>
                <svg class="bi pe-none me-2" width="16" height="16" aria-hidden="true" >
                    <use xlink:href="#star"></use>
                </svg>
                ${r.stars || 0}
             </div>
              <div class="text-muted small"><i class="fa fa-star" aria-hidden="true"></i>
                <svg class="bi pe-none me-2" width="16" height="16" aria-hidden="true" >
                    <use xlink:href="#watching"></use>
                </svg>
                ${r.watchers || 0}
              </div>
              <div class="text-muted small"><i class="fa fa-star" aria-hidden="true"></i>
                <svg class="bi pe-none me-2" width="16" height="16" aria-hidden="true" >
                    <use xlink:href="#forks"></use>
                </svg>
                ${r.forks || 0}
              </div>
          </div>
        </div>
      </div>
    `;
        reposGrid.appendChild(col);
    });
}

/**
 * escapeHtml(str) - petite fonction d'échappement pour éviter l'injection
 */
function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

/**
 * Hook recherche
 */
function setupRepoSearch() {
    const repoSearch = document.getElementById('repoSearch');
    if (!repoSearch) return;

    repoSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        const filtered = (repos || []).filter(r =>
            (r.name || '').toLowerCase().includes(q) ||
            (r.desc || '').toLowerCase().includes(q) ||
            (r.lang || '').toLowerCase().includes(q)
        );
        renderRepos(filtered);
    });
}

/**
 * Exemple d'utilisation de l'API GitHub (décommenter et renseigner USERNAME et éventuellement TOKEN)
 *
 * IMPORTANT : utiliser un token coté serveur ou via un endpoint proxy si tu veux éviter d'exposer un token public.
 */

function fetchGithub() {
    return fetch(`https://api.github.com/users/EvanAttack/repos?sort=updated&per_page=10`)
        .then(res => {
            if (!res.ok) throw new Error('GitHub API error: ' + res.status);
            return res.json();
        })
        .then(data => {
            // map les propriétés utiles
            let repos = data.map(r => ({
                name: r.name,
                desc: r.description || '',
                lang: r.language || '',
                stars: r.stargazers_count || 0,
                watchers : r.watchers_count || 0,
                forks : r.forks_count || 0,
                url: r.html_url
            }));
            renderRepos(repos);
        })
        .catch(err => {
            console.error(err);
            // fallback : afficher sample
            repos = reposSample;
            renderRepos(repos);
        });
}


/**
 * Init
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchGithub();
    renderRepos(repos);
    setupRepoSearch();
});
