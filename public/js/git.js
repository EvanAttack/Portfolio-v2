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

let repos = [];

function renderRepos(list, limit = 6) {
    const reposGrid = document.getElementById('reposGrid');
    if (!reposGrid) return;

    reposGrid.innerHTML = '';

    if (!list || list.length === 0) {
        reposGrid.innerHTML =
            '<div class="col-12"><p class="text-muted">Aucun dépôt trouvé.</p></div>';
        return;
    }

    const dataToDisplay = list.slice(0, limit);

    dataToDisplay.forEach(r => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
        <div class="repo-card p-3 h-100 d-flex flex-column">
  <div>
    <div class="d-flex justify-content-between align-items-start mb-2">
      <h5 class="h6 mb-0">${escapeHtml(r.name)}</h5>
      <small class="text-muted">${escapeHtml(r.lang || '')}</small>
    </div>

    <p class="small text-muted mb-2">
      ${escapeHtml(r.desc || '')}
    </p>
  </div>

  <!-- FOOTER FIXÉ EN BAS -->
  <div class="repo-footer mt-auto d-flex justify-content-between align-items-end">
    <a class="btn btn-sm btn-outline-primary"
       href="${r.url || '#'}"
       target="_blank" rel="noopener">
       Voir
    </a>

    <div class="repo-stats text-end small text-muted">
      <div><svg class="bi pe-none " width="16" height="16" aria-hidden="true" > <use xlink:href="#star"></use> </svg> ${r.stars || 0}</div>
      <div><svg class="bi pe-none " width="16" height="16" aria-hidden="true" > <use xlink:href="#watching"></use> </svg> ${r.watchers || 0}</div>
      <div><svg class="bi pe-none " width="16" height="16" aria-hidden="true" > <use xlink:href="#forks"></use> </svg> ${r.forks || 0}</div>
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

        const filtered = repos.filter(r =>
            (r.name || '').toLowerCase().includes(q) ||
            (r.desc || '').toLowerCase().includes(q) ||
            (r.lang || '').toLowerCase().includes(q)
        );

        // si on tape quelque chose → pas de limite
        if (q.length > 0) {
            renderRepos(filtered, filtered.length);
        } else {
            renderRepos(repos, 6);
        }
    });
}


/**
 * Exemple d'utilisation de l'API GitHub (décommenter et renseigner USERNAME et éventuellement TOKEN)
 *
 * IMPORTANT : utiliser un token coté serveur ou via un endpoint proxy si tu veux éviter d'exposer un token public.
 */

function fetchGithub() {
    fetch(`https://api.github.com/users/EvanAttack/repos?sort=updated&per_page=20`)
        .then(res => {
            if (!res.ok) throw new Error('GitHub API error');
            return res.json();
        })
        .then(data => {
            repos = data.map(r => ({
                name: r.name,
                desc: r.description || '',
                lang: r.language || '',
                stars: r.stargazers_count || 0,
                watchers: r.watchers_count || 0,
                forks: r.forks_count || 0,
                url: r.html_url
            }));

            renderRepos(repos, 6);
            if (window.initReposAnimation) {
                setTimeout(() => {
                    window.initReposAnimation();
                    ScrollTrigger.refresh();
                }, 50);
            }

        })
        .catch(err => {
            console.error(err);
        });
}



/**
 * Init
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchGithub();
    setupRepoSearch();
});

