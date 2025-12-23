const services = [
  {
    id: 'landscape-design',
    title: 'Landscape Design',
    description: 'Custom landscape design and planning services for Florida properties, specializing in native plants and climate-appropriate solutions.',
    price: 'Starting at $2,500',
    features: [
      'Site analysis and soil testing',
      'Custom design consultation',
      '3D landscape visualization',
      'Plant selection for Florida climate',
      'Professional installation',
      '1-year plant warranty'
    ],
    image: 'landscape-design.jpg',
    alt: 'Beautifully designed landscape with native plants and stone pathways'
  },
  {
    id: 'lawn-maintenance',
    title: 'Lawn Maintenance',
    description: 'Professional lawn care and maintenance services for Pensacola homes and businesses.',
    price: 'Starting at $150/month',
    features: [
      'Weekly or bi-weekly mowing',
      'Edge trimming and cleanup',
      'Fertilization program',
      'Weed control treatment',
      'Seasonal lawn care',
      'Equipment and supplies included'
    ],
    image: 'lawn-maintenance.jpg',
    alt: 'Well-maintained green lawn with defined edges'
  },
  {
    id: 'tree-care',
    title: 'Tree & Shrub Care',
    description: 'Expert tree trimming, pruning, and shrub care services for Florida landscapes.',
    price: 'Starting at $300',
    features: [
      'Professional pruning and shaping',
      'Tree and shrub planting',
      'Disease and pest treatment',
      'Fertilization and soil care',
      'Removal of dead or damaged trees',
      'Florida native species expertise'
    ],
    image: 'tree-care.jpg',
    alt: 'Professional arborist trimming a tree'
  },
  {
    id: 'irrigation',
    title: 'Irrigation Systems',
    description: 'Professional irrigation system installation, repair, and maintenance.',
    price: 'Starting at $1,800',
    features: [
      'Smart irrigation system design',
      'Professional installation',
      'Zone-based watering control',
      'Water-efficient sprinkler heads',
      'System maintenance and repairs',
      'Water regulation compliance'
    ],
    image: 'irrigation.jpg',
    alt: 'Modern irrigation system in a residential landscape'
  },
  {
    id: 'landscape-cleanup',
    title: 'Landscape Cleanup',
    description: 'Comprehensive landscape cleanup and debris removal services.',
    price: 'Starting at $200',
    features: [
      'Seasonal leaf and debris removal',
      'Storm damage cleanup',
      'Overgrown vegetation clearing',
      'Mulch installation and refresh',
      'Property preparation services',
      'Eco-friendly disposal methods'
    ],
    image: 'landscape-cleanup.jpg',
    alt: 'Clean and well-maintained yard after professional cleanup'
  }
];

// Function to create service cards
function createServiceCards() {
  const container = document.getElementById('service-cards');
  if (!container) return;

  container.innerHTML = services.map(service => `
    <div class="card" id="${service.id}">
      <div class="card-image">
        <img src="./images/services/${service.image}" alt="${service.alt}" loading="lazy">
      </div>
      <div class="card-content">
        <h3 class="card-title">${service.title}</h3>
        <p class="card-price">${service.price}</p>
        <p class="card-description">${service.description}</p>
        <button class="btn btn-outline btn-block" data-service="${service.id}" data-modal-trigger="service-modal">
          View Details
        </button>
      </div>
    </div>
  `).join('');
}

// Initialize service cards when the DOM is loaded
document.addEventListener('DOMContentLoaded', createServiceCards);
