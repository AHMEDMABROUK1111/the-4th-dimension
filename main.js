'use strict';
/* ════════════════════════════════════════════════════════════════
   js/main.js  —  The 4th Dimension  |  Gallery Engine
   Depends on: window.enterAlgo(), window.ALGO_INIT (inline script)
   ════════════════════════════════════════════════════════════════ */

// ════════════════════════════════════════════════════════════════
// FULL CATALOG  (12 visualised + 8 coming-soon)
// ════════════════════════════════════════════════════════════════
const CATALOG = [
  /* ─────────────────── UNSUPERVISED ─────────────────── */
  {
    cat: 'UNSUPERVISED',
    items: [
      {
        id: 'kmeans', name: 'K-MEANS',
        icon: '⬡',
        tagline: 'Centroid Dance in 3D Space',
        difficulty: 'beginner',
        desc: 'Partitions data into K clusters by iteratively reassigning points to the nearest centroid and moving centroids to cluster means.',
        info: 'K centroids iteratively reposition to minimize within-cluster variance. Watch the EM algorithm converge — E-step assigns points to nearest centroid, M-step moves centroids to cluster means.',
        color: '#00f0ff', ready: true,
        legend: [
          {c:'#00f0ff',l:'Class A'},{c:'#ff00cc',l:'Class B'},
          {c:'#00ff9d',l:'Class C'},{c:'#ffcc44',l:'Centroid'},
        ],
        params: [
          {key:'k',      label:'K Clusters',  min:2, max:7, step:1,   def:3},
          {key:'speed',  label:'Step Speed',  min:1, max:5, step:1,   def:3},
        ],
      },
      {
        id: 'dbscan', name: 'DBSCAN',
        icon: '🌀',
        tagline: 'Density-Connected Region Discovery',
        difficulty: 'intermediate',
        desc: 'Finds arbitrarily-shaped clusters as dense connected regions without requiring K. Naturally identifies noise points as outliers.',
        info: 'DBSCAN discovers clusters as dense connected regions without specifying K. Core points have ≥ MinPts neighbors within ε radius. Noise points (in grey) belong to no cluster.',
        color: '#7b2fff', ready: true,
        legend: [
          {c:'#00f0ff',l:'Core Point'},{c:'#ff6b4a',l:'Border Point'},
          {c:'rgba(150,150,150,0.5)',l:'Noise'},
        ],
        params: [
          {key:'epsilon',label:'ε (Epsilon)', min:0.5, max:3.5, step:0.1, def:1.8},
          {key:'minpts', label:'MinPts',      min:2,   max:7,   step:1,   def:3},
        ],
      },
      {
        id: 'gmm', name: 'GAUSSIAN MIXTURE',
        icon: '🫧',
        tagline: 'Probabilistic Soft-Assignment Clusters',
        difficulty: 'intermediate',
        desc: 'Models data as a mix of Gaussian distributions. Unlike K-Means, each point gets a probability of belonging to every cluster.',
        info: 'Gaussian Mixture Models use the Expectation-Maximization algorithm to fit ellipsoidal cluster shapes. Each point carries a soft membership probability, making GMMs more flexible than K-Means.',
        color: '#00ff9d', ready: false,
        legend: [{c:'#00f0ff',l:'Component 1'},{c:'#ff00cc',l:'Component 2'},{c:'#ffcc44',l:'Component 3'}],
        params: [
          {key:'k',label:'Components',min:2,max:6,step:1,def:3},
          {key:'cov',label:'Covariance Type',min:1,max:3,step:1,def:1},
        ],
      },
      {
        id: 'hierarchical', name: 'HIERARCHICAL',
        icon: '🌲',
        tagline: 'Dendrogram-Based Agglomerative Merging',
        difficulty: 'intermediate',
        desc: 'Builds a tree of clusters by successively merging the two closest clusters. No need to pre-specify K — cut the dendrogram anywhere.',
        info: 'Agglomerative clustering starts with every point as its own cluster and merges greedily. The linkage criterion (single, complete, Ward) determines what "closest" means at each merge step.',
        color: '#ff6b4a', ready: false,
        legend: [{c:'#00f0ff',l:'Cluster A'},{c:'#ff00cc',l:'Cluster B'},{c:'#ffcc44',l:'Merge Link'}],
        params: [
          {key:'n',label:'Num Clusters',min:2,max:7,step:1,def:3},
          {key:'linkage',label:'Linkage',min:1,max:3,step:1,def:1},
        ],
      },
    ],
  },

  /* ─────────────────── SUPERVISED ───────────────────── */
  {
    cat: 'SUPERVISED',
    items: [
      {
        id: 'svm', name: 'SVM',
        icon: '⚔️',
        tagline: 'Maximum Margin Hyperplane',
        difficulty: 'intermediate',
        desc: 'Finds the hyperplane with the largest margin between classes. The kernel trick lets it handle non-linear boundaries.',
        info: 'Support Vector Machine finds the hyperplane maximizing the margin between two classes. Support vectors (gold) sit exactly at the margin boundary and determine the decision surface.',
        color: '#ff00cc', ready: true,
        legend: [
          {c:'#00f0ff',l:'Class A'},{c:'#ff00cc',l:'Class B'},
          {c:'#ffcc44',l:'Support Vector'},{c:'rgba(255,255,255,0.3)',l:'Margin Zone'},
        ],
        params: [
          {key:'c',    label:'C (Regularization)', min:0.2, max:8,   step:0.1, def:1},
          {key:'noise',label:'Data Noise',          min:0,   max:2.5, step:0.1, def:0.5},
        ],
      },
      {
        id: 'linreg', name: 'LINEAR REGRESSION',
        icon: '📈',
        tagline: '3D Regression Plane & Residuals',
        difficulty: 'beginner',
        desc: 'Fits a plane through data by minimizing sum-of-squared residuals. The foundation of predictive modelling.',
        info: 'Ordinary least squares fits a plane minimizing the sum of squared residuals — the vertical distances from each data point to the fitted surface. Red lines show residual errors.',
        color: '#ffcc44', ready: true,
        legend: [
          {c:'#00f0ff',l:'Data Point'},{c:'rgba(100,180,255,0.5)',l:'Regression Plane'},
          {c:'#ff6b4a',l:'Residual Line'},
        ],
        params: [
          {key:'noise',label:'Noise Level',  min:0,  max:3,   step:0.1, def:0.8},
          {key:'pts',  label:'Data Points',  min:30, max:180, step:10,  def:100},
        ],
      },
      {
        id: 'dtree', name: 'DECISION TREE',
        icon: '🌿',
        tagline: 'Recursive 3D Space Partitioning',
        difficulty: 'beginner',
        desc: 'Recursively splits the feature space into axis-aligned rectangles. Highly interpretable — every decision can be traced as a rule.',
        info: 'A decision tree recursively splits 3D feature space with axis-aligned hyperplanes. Each split maximises information gain. Watch how the space is carved into purer class regions at each depth level.',
        color: '#ff6b4a', ready: true,
        legend: [
          {c:'#00f0ff',l:'Class A Region'},{c:'#ff00cc',l:'Class B Region'},
          {c:'#00ff9d',l:'Class C Region'},{c:'#ffcc44',l:'Split Plane'},
        ],
        params: [
          {key:'depth',label:'Max Depth',  min:1, max:5, step:1,   def:3},
          {key:'noise',label:'Data Noise', min:0, max:2, step:0.1, def:0.6},
        ],
      },
      {
        id: 'rforest', name: 'RANDOM FOREST',
        icon: '🌳',
        tagline: 'Ensemble of Randomized Trees',
        difficulty: 'intermediate',
        desc: 'Trains many trees on random data subsets and features. The ensemble vote is far more robust than any individual tree.',
        info: 'Random Forest builds many decision trees on bootstrap samples with random feature subsets. Each semi-transparent tree votes on classification — the consensus boundary (solid) is far more robust than any single tree.',
        color: '#00ff9d', ready: true,
        legend: [
          {c:'rgba(0,240,255,0.25)',l:'Individual Tree'},{c:'#00ff9d',l:'Ensemble Boundary'},
          {c:'#00f0ff',l:'Class A'},{c:'#ff00cc',l:'Class B'},
        ],
        params: [
          {key:'ntrees',label:'Num Trees',  min:2, max:8, step:1,   def:5},
          {key:'noise', label:'Data Noise', min:0, max:2, step:0.1, def:0.7},
        ],
      },
      {
        id: 'knn', name: 'K-NEAREST NEIGHBORS',
        icon: '📍',
        tagline: 'Proximity-Based Instance Classifier',
        difficulty: 'beginner',
        desc: 'Classifies a point by majority vote of its K closest training examples. Simple, non-parametric, and surprisingly powerful.',
        info: 'KNN stores all training points and classifies by majority vote of K nearest neighbours. Smaller K = more complex boundary; larger K = smoother. Distance metric choice dramatically affects results.',
        color: '#ff00cc', ready: false,
        legend: [{c:'#00f0ff',l:'Class A'},{c:'#ff00cc',l:'Class B'},{c:'#ffcc44',l:'Query Point'},{c:'rgba(255,255,255,0.3)',l:'K Radius'}],
        params: [
          {key:'k',    label:'K Neighbors',  min:1, max:15, step:1, def:5},
          {key:'noise',label:'Data Noise',   min:0, max:2,  step:0.1, def:0.6},
        ],
      },
      {
        id: 'logreg', name: 'LOGISTIC REGRESSION',
        icon: '🧮',
        tagline: 'Sigmoid Decision Boundary',
        difficulty: 'beginner',
        desc: 'Maps linear combinations of features to probabilities via the sigmoid function. The cornerstone of binary classification.',
        info: 'Logistic regression models the log-odds of the positive class as a linear function of features. The sigmoid output gives calibrated probabilities, and the decision boundary is linear in feature space.',
        color: '#ffcc44', ready: false,
        legend: [{c:'#00f0ff',l:'Class 0'},{c:'#ff00cc',l:'Class 1'},{c:'rgba(255,204,68,0.4)',l:'Decision Boundary'}],
        params: [
          {key:'C',    label:'Regularization C', min:0.1, max:10, step:0.1, def:1},
          {key:'noise',label:'Data Noise',        min:0,   max:2,  step:0.1, def:0.5},
        ],
      },
    ],
  },

  /* ─────────────────── DEEP LEARNING ────────────────── */
  {
    cat: 'DEEP LEARNING',
    items: [
      {
        id: 'neuralnet', name: 'NEURAL NETWORK',
        icon: '🧠',
        tagline: 'Forward Propagation Light Pulses',
        difficulty: 'intermediate',
        desc: 'Multi-layer perceptron with animated signal propagation through weighted connections. See how information transforms layer-by-layer.',
        info: 'A multi-layer perceptron with animated forward propagation. Each pulse of light represents a signal traveling through weighted connections. Blue/red connections represent positive/negative weights.',
        color: '#ff6b4a', ready: true,
        legend: [
          {c:'#00ff9d',l:'Input Layer'},{c:'#00f0ff',l:'Hidden Layer'},
          {c:'#ff6b4a',l:'Output Layer'},{c:'#ffffff',l:'Pulse'},
        ],
        params: [
          {key:'layers',  label:'Hidden Layers',    min:1, max:4, step:1, def:2},
          {key:'neurons', label:'Neurons / Layer',  min:3, max:8, step:1, def:5},
        ],
      },
      {
        id: 'lstm', name: 'LSTM',
        icon: '🔄',
        tagline: 'Gated Memory Cell Dynamics',
        difficulty: 'advanced',
        desc: 'Solves the vanishing gradient problem with three learned gates — forget, input, and output — controlling what the cell remembers.',
        info: 'Long Short-Term Memory cells control information flow through three gates: Forget (what to erase from memory), Input (what new info to write), and Output (what to read out). The cell state flows horizontally as the long-term memory highway.',
        color: '#ff00cc', ready: true,
        legend: [
          {c:'#ff6b4a',l:'Forget Gate'},{c:'#00ff9d',l:'Input Gate'},
          {c:'#00f0ff',l:'Output Gate'},{c:'#ffcc44',l:'Cell State'},
        ],
        params: [
          {key:'seq',  label:'Sequence Length', min:3, max:8, step:1, def:5},
          {key:'speed',label:'Flow Speed',      min:1, max:5, step:1, def:3},
        ],
      },
      {
        id: 'gan', name: 'GANs',
        icon: '🎭',
        tagline: 'Adversarial Generator vs Discriminator',
        difficulty: 'advanced',
        desc: 'Two networks compete: a Generator faking data, a Discriminator detecting fakes. The adversarial game drives both to superhuman quality.',
        info: 'A Generator learns to produce fake samples indistinguishable from real data (cyan), while the Discriminator learns to tell them apart. Watch the generator distribution (magenta cloud) slowly morph to match the real data distribution.',
        color: '#ff6b4a', ready: true,
        legend: [
          {c:'#00f0ff',l:'Real Data'},{c:'#ff00cc',l:'Generated Data'},
          {c:'#ffcc44',l:'Decision Boundary'},{c:'#00ff9d',l:'Converged Zone'},
        ],
        params: [
          {key:'epoch',label:'Training Epoch', min:0, max:100, step:1, def:0},
          {key:'speed',label:'Auto Speed',     min:0, max:5,   step:1, def:2},
        ],
      },
      {
        id: 'transformer', name: 'TRANSFORMER',
        icon: '⚡',
        tagline: 'Self-Attention Connectome',
        difficulty: 'advanced',
        desc: 'Processes all tokens in parallel using self-attention — each token weighs every other token to build rich contextual representations.',
        info: 'Each token (node) computes attention scores with every other token. Brighter beams mean higher attention weight. The model learns which tokens are most relevant to each other, creating rich contextual representations.',
        color: '#00f0ff', ready: true,
        legend: [
          {c:'#00f0ff',l:'Token Node'},{c:'rgba(255,204,68,0.8)',l:'High Attention'},
          {c:'rgba(0,240,255,0.2)',l:'Low Attention'},{c:'#ff00cc',l:'Query Token'},
        ],
        params: [
          {key:'tokens',label:'Sequence Length',  min:4, max:10, step:1, def:6},
          {key:'heads', label:'Attention Heads',  min:1, max:4,  step:1, def:2},
        ],
      },
      {
        id: 'cnn', name: 'CONVOLUTIONAL NET',
        icon: '🖼️',
        tagline: 'Feature Maps & Spatial Hierarchies',
        difficulty: 'intermediate',
        desc: 'Learns spatial feature hierarchies through convolutional filters. Each layer detects increasingly abstract patterns.',
        info: 'CNNs apply learned filters across spatial dimensions, producing feature maps that detect edges, textures, then high-level objects. Parameter sharing makes them vastly more efficient than dense networks for image data.',
        color: '#7b2fff', ready: false,
        legend: [{c:'#00f0ff',l:'Input'},{c:'#7b2fff',l:'Feature Map'},{c:'#ff00cc',l:'Pooled Map'},{c:'#ffcc44',l:'Output'}],
        params: [
          {key:'filters',label:'Filters',    min:4, max:32, step:4, def:8},
          {key:'layers', label:'Conv Layers',min:1, max:5,  step:1, def:3},
        ],
      },
      {
        id: 'autoencoder', name: 'AUTOENCODER',
        icon: '🔃',
        tagline: 'Encoder-Decoder Latent Compression',
        difficulty: 'intermediate',
        desc: 'Learns to compress data to a low-dimensional latent space and reconstruct it. Forces the network to learn the most salient features.',
        info: 'An autoencoder is trained to reconstruct its input through a bottleneck. The compressed latent space captures the essential structure of the data, enabling denoising, anomaly detection, and generative modelling.',
        color: '#00ff9d', ready: false,
        legend: [{c:'#00f0ff',l:'Input'},{c:'#ffcc44',l:'Latent Space'},{c:'#00ff9d',l:'Reconstruction'}],
        params: [
          {key:'latent',label:'Latent Dim', min:2,  max:32, step:2,   def:8},
          {key:'noise', label:'Noise Level',min:0,  max:1,  step:0.05, def:0.2},
        ],
      },
    ],
  },

  /* ─────────────────── DIMENSIONALITY REDUCTION ─────── */
  {
    cat: 'DIMENSIONALITY REDUCTION',
    items: [
      {
        id: 'pca', name: 'PCA',
        icon: '📐',
        tagline: 'Principal Component Axes',
        difficulty: 'intermediate',
        desc: 'Finds orthogonal directions of maximum variance. Projects high-dimensional data onto a lower-dimensional subspace with minimal information loss.',
        info: 'PCA finds orthogonal axes of maximum variance. PC1 (cyan) explains the most variance, PC2 (magenta) the second most, PC3 (green) the least. Data is projected onto these new axes.',
        color: '#00ff9d', ready: true,
        legend: [
          {c:'#00f0ff',l:'PC1 (most variance)'},{c:'#ff00cc',l:'PC2'},{c:'#00ff9d',l:'PC3'},
        ],
        params: [
          {key:'spread',label:'Data Elongation',   min:1, max:6, step:0.5, def:3},
          {key:'comps', label:'Show Components',   min:1, max:3, step:1,   def:3},
        ],
      },
      {
        id: 'tsne', name: 't-SNE',
        icon: '🌌',
        tagline: 'Non-linear 3D Cluster Embedding',
        difficulty: 'advanced',
        desc: 'Preserves local neighbourhood structure when embedding to 2D/3D. Excels at revealing cluster topology invisible to linear methods.',
        info: 't-SNE minimizes KL-divergence between high-dimensional and low-dimensional pairwise similarity distributions. Watch as the initially random scatter organizes into tight clusters through iterative attractive and repulsive forces.',
        color: '#7b2fff', ready: true,
        legend: [
          {c:'#00f0ff',l:'Cluster A'},{c:'#ff00cc',l:'Cluster B'},
          {c:'#00ff9d',l:'Cluster C'},{c:'#ffcc44',l:'Cluster D'},
        ],
        params: [
          {key:'perplexity',label:'Perplexity',          min:5, max:50, step:5, def:20},
          {key:'speed',     label:'Convergence Speed',   min:1, max:5,  step:1, def:3},
        ],
      },
      {
        id: 'umap', name: 'UMAP',
        icon: '🗺️',
        tagline: 'Topology-Preserving Manifold Learning',
        difficulty: 'advanced',
        desc: 'Faster than t-SNE with better global structure preservation. Based on Riemannian geometry and topological data analysis.',
        info: 'UMAP constructs a fuzzy topological representation of the high-dimensional data then optimizes a low-dimensional layout to match it. Preserves both local and global structure better than t-SNE.',
        color: '#ff00cc', ready: false,
        legend: [{c:'#00f0ff',l:'Cluster A'},{c:'#ff00cc',l:'Cluster B'},{c:'#00ff9d',l:'Cluster C'}],
        params: [
          {key:'neighbors',label:'N Neighbors',   min:2,  max:50, step:1, def:15},
          {key:'dist',     label:'Min Distance',  min:0,  max:1,  step:0.05, def:0.1},
        ],
      },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// DIFFICULTY ORDER  (for sorting)
// ════════════════════════════════════════════════════════════════
const DIFF_ORDER = { beginner: 0, intermediate: 1, advanced: 2 };

const DIFF_LABELS = {
  beginner:     { label: 'BEGINNER',     cls: 'diff-beginner' },
  intermediate: { label: 'INTERMEDIATE', cls: 'diff-intermediate' },
  advanced:     { label: 'ADVANCED',     cls: 'diff-advanced' },
};

const CAT_ICONS = {
  'UNSUPERVISED':           '⬡',
  'SUPERVISED':             '⚔',
  'DEEP LEARNING':          '🧠',
  'DIMENSIONALITY REDUCTION': '📐',
};

// ════════════════════════════════════════════════════════════════
// FLAT ITEM LIST  — every algo with its cat injected
// ════════════════════════════════════════════════════════════════
const ALL_ALGOS = CATALOG.flatMap(section =>
  section.items.map(algo => ({ ...algo, cat: section.cat }))
);

// ════════════════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════════════════
const state = {
  search:     '',
  cat:        'all',
  difficulty: 'all',
  sort:       'default',
  view:       'grid',
  page:       1,
  perPage:    12,
};

// ════════════════════════════════════════════════════════════════
// FILTER + SORT
// ════════════════════════════════════════════════════════════════
function getFiltered() {
  let list = [...ALL_ALGOS];

  // search
  if (state.search) {
    const q = state.search.toLowerCase();
    list = list.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.tagline.toLowerCase().includes(q) ||
      (a.desc || '').toLowerCase().includes(q) ||
      a.cat.toLowerCase().includes(q)
    );
  }

  // category
  if (state.cat !== 'all') list = list.filter(a => a.cat === state.cat);

  // difficulty
  if (state.difficulty !== 'all') list = list.filter(a => a.difficulty === state.difficulty);

  // sort
  if (state.sort === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sort === 'difficulty') {
    list.sort((a, b) => (DIFF_ORDER[a.difficulty] || 0) - (DIFF_ORDER[b.difficulty] || 0));
  } else if (state.sort === 'category') {
    list.sort((a, b) => a.cat.localeCompare(b.cat));
  }
  // 'default' = catalog order (already stable)

  return list;
}

// ════════════════════════════════════════════════════════════════
// RENDER HOME
// ════════════════════════════════════════════════════════════════
function buildHome() {
  const filtered = getFiltered();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
  if (state.page > totalPages) state.page = 1;
  const pageItems = filtered.slice((state.page - 1) * state.perPage, state.page * state.perPage);

  const container = document.getElementById('home-content');
  const noResults = document.getElementById('no-results');

  container.innerHTML = '';

  if (!filtered.length) {
    noResults.classList.add('visible');
    document.getElementById('algo-count').textContent = '0 ALGORITHMS';
    renderPagination(0, 0);
    return;
  }
  noResults.classList.remove('visible');

  // Count label
  document.getElementById('algo-count').textContent =
    `${filtered.length} ALGORITHM${filtered.length !== 1 ? 'S' : ''}`;

  if (state.view === 'list') {
    // ── LIST VIEW — flat, no category sections ──
    const grid = document.createElement('div');
    grid.className = 'algo-grid list-view';
    grid.style.cssText = 'max-width:1280px;margin:18px auto 0;padding:0 8px;';
    pageItems.forEach((algo, i) => {
      grid.appendChild(makeCard(algo, i, 'list'));
    });
    container.appendChild(grid);
  } else {
    // ── GRID VIEW — group by category ──
    // group page items by category
    const groups = {};
    pageItems.forEach(algo => {
      if (!groups[algo.cat]) groups[algo.cat] = [];
      groups[algo.cat].push(algo);
    });

    const catOrder = CATALOG.map(s => s.cat);
    catOrder.forEach((cat, si) => {
      if (!groups[cat] || !groups[cat].length) return;
      const sec = document.createElement('div');
      sec.className = 'cat-section';
      sec.style.animationDelay = (0.05 + si * 0.06) + 's';

      const lbl = document.createElement('div');
      lbl.className = 'cat-label';
      lbl.textContent = cat;
      sec.appendChild(lbl);

      const grid = document.createElement('div');
      grid.className = 'algo-grid';
      groups[cat].forEach((algo, i) => {
        grid.appendChild(makeCard(algo, i, 'grid'));
      });
      sec.appendChild(grid);
      container.appendChild(sec);
    });
  }

  renderPagination(filtered.length, totalPages);
  animateCardsIn();
}

// ════════════════════════════════════════════════════════════════
// MAKE CARD
// ════════════════════════════════════════════════════════════════
function makeCard(algo, i, viewMode) {
  const card = document.createElement('div');
  const isReady = algo.ready;
  card.className = 'algo-card' + (isReady ? '' : ' coming-soon');
  card.style.setProperty('--accent', algo.color);
  card.style.animationDelay = (i * 0.045) + 's';

  const diff = DIFF_LABELS[algo.difficulty] || DIFF_LABELS.beginner;

  if (viewMode === 'list') {
    card.innerHTML = `
      <span class="card-icon">${algo.icon || '⬡'}</span>
      <div class="card-cat" style="color:${algo.color}">${algo.cat}</div>
      <div class="card-name">${algo.name}</div>
      <div class="card-tagline">${algo.tagline}</div>
      <div class="card-diff ${diff.cls}">${diff.label}</div>
      ${isReady
        ? `<button class="card-explore-btn">EXPLORE 3D <span class="btn-arrow">→</span></button>`
        : `<div class="card-phase">COMING SOON</div>`
      }`;
  } else {
    card.innerHTML = `
      <span class="card-icon">${algo.icon || '⬡'}</span>
      <div class="card-diff ${diff.cls}">${diff.label}</div>
      <div class="card-cat" style="color:${algo.color}">${algo.cat}</div>
      <div class="card-name">${algo.name}</div>
      <div class="card-tagline">${algo.tagline}</div>
      <div class="card-desc">${algo.desc || ''}</div>
      ${isReady
        ? `<button class="card-explore-btn">EXPLORE 3D <span class="btn-arrow">→</span></button>`
        : `<div class="card-phase">COMING SOON</div>`
      }`;
  }

  if (isReady) {
    const btn = card.querySelector('.card-explore-btn');
    const clickHandler = () => enterAlgo(algo);
    card.addEventListener('click', clickHandler);
    // Prevent double-fire on button
    btn.addEventListener('click', e => e.stopPropagation());
    btn.addEventListener('click', clickHandler);
  }

  return card;
}

// ════════════════════════════════════════════════════════════════
// STAGGER ANIMATION
// ════════════════════════════════════════════════════════════════
function animateCardsIn() {
  document.querySelectorAll('#home-content .algo-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.style.transition = '0.4s cubic-bezier(0.16,1,0.3,1)';
        card.style.opacity = '1';
        card.style.transform = 'none';
      }, i * 55);
    });
  });
}

// ════════════════════════════════════════════════════════════════
// PAGINATION
// ════════════════════════════════════════════════════════════════
function renderPagination(total, totalPages) {
  const pg = document.getElementById('pagination');
  pg.innerHTML = '';
  if (totalPages <= 1) return;

  const makeBtn = (label, page, disabled, active) => {
    const btn = document.createElement('button');
    btn.className = 'pg-btn' + (active ? ' active' : '');
    btn.textContent = label;
    btn.disabled = disabled;
    if (!disabled && !active) {
      btn.addEventListener('click', () => {
        state.page = page;
        buildHome();
        document.getElementById('home').scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    return btn;
  };

  pg.appendChild(makeBtn('←', state.page - 1, state.page === 1, false));

  // Page numbers with ellipsis
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (state.page > 3) pages.push('…');
    for (let i = Math.max(2, state.page - 1); i <= Math.min(totalPages - 1, state.page + 1); i++) pages.push(i);
    if (state.page < totalPages - 2) pages.push('…');
    pages.push(totalPages);
  }

  pages.forEach(p => {
    if (p === '…') {
      const span = document.createElement('span');
      span.className = 'pg-ellipsis';
      span.textContent = '…';
      pg.appendChild(span);
    } else {
      pg.appendChild(makeBtn(p, p, false, p === state.page));
    }
  });

  pg.appendChild(makeBtn('→', state.page + 1, state.page === totalPages, false));
}

// ════════════════════════════════════════════════════════════════
// EVENT WIRING
// ════════════════════════════════════════════════════════════════
function resetPage() { state.page = 1; }

// Search
const searchInput = document.getElementById('algo-search');
const clearBtn    = document.getElementById('search-clear');
let   searchTimer = null;

searchInput.addEventListener('input', e => {
  const q = e.target.value;
  clearBtn.classList.toggle('visible', q.length > 0);
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.search = q.trim();
    resetPage();
    buildHome();
  }, 220);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.remove('visible');
  state.search = '';
  resetPage();
  buildHome();
  searchInput.focus();
});

// Sort
document.getElementById('sort-select').addEventListener('change', e => {
  state.sort = e.target.value;
  resetPage();
  buildHome();
});

// Category chips
document.querySelectorAll('.g-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.g-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.cat = btn.dataset.cat;
    resetPage();
    buildHome();
  });
});

// Difficulty chips
document.querySelectorAll('.d-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.d-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.difficulty = btn.dataset.diff;
    resetPage();
    buildHome();
  });
});

// View toggle (grid / list)
document.querySelectorAll('.gvbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gvbtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.view = btn.dataset.v;
    buildHome();
  });
});

// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════
buildHome();
