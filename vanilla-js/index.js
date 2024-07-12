const SLIDES = [
    {
        imageUrl: 'https://picsum.photos/id/501/1920/1080',
        altText: 'Image501',
    },
    {
        imageUrl: 'https://picsum.photos/id/234/1920/1080',
        altText: 'Image234',
    },
    {
        imageUrl: 'https://picsum.photos/id/363/1920/1080',
        altText: 'Image363',
    },
    {
        imageUrl: 'https://picsum.photos/id/123/1920/1080',
        altText: 'Image123',
    },
    {
        imageUrl: 'https://picsum.photos/id/435/1920/1080',
        altText: 'Image435',
    },
];

const SLIDES_LENGTH = SLIDES.length;

const [FILLED_ICON, UNFILLED_ICON] = [
    '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" fill="currentColor"></path></svg>',
    '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 9.125C8.39746 9.125 9.125 8.39746 9.125 7.5C9.125 6.60254 8.39746 5.875 7.5 5.875C6.60254 5.875 5.875 6.60254 5.875 7.5C5.875 8.39746 6.60254 9.125 7.5 9.125ZM7.5 10.125C8.94975 10.125 10.125 8.94975 10.125 7.5C10.125 6.05025 8.94975 4.875 7.5 4.875C6.05025 4.875 4.875 6.05025 4.875 7.5C4.875 8.94975 6.05025 10.125 7.5 10.125Z" fill="currentColor"></path></svg>',
];

const [MAXIMIZE_ICON, MINIMIZE_ICON] = ['<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path></svg>', '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 4H8v4H4v2h6zM8 20h2v-6H4v2h4zm12-6h-6v6h2v-4h4zm0-6h-4V4h-2v6h6z"></path></svg>']

const ELEMENT_IDS = {
    root: 'root',
    autoPlayButton: 'auto-play-button',
    bottomNavigation: 'bottom-navigation',
    carouselContainer: 'carousel-container',
    carouselImage: 'carousel-image',
    fullscreenToggle: 'fullscreen-toggle',
    navigateBackward: 'navigate-backward',
    navigateForward: 'navigate-forward',
    navigationDots: 'navigation-dots',
    modalBackdrop: 'modal-backdrop',
}

const SELECTORS = {
    body: () => document.querySelector('body'),
    root: () => document.getElementById('root'),
    autoPlayButton: () => document.getElementById('auto-play-button'),
    bottomNavigation: () => document.getElementById('bottom-navigation'),
    carouselContainer: () => document.getElementById('carousel-container'),
    carouselImage: () => document.getElementById('carousel-image'),
    fullscreenToggle: () => document.getElementById('fullscreen-toggle'),
    navigateBackward: () => document.getElementById('navigate-backward'),
    navigateForward: () => document.getElementById('navigate-forward'),
    navigationDots: () => document.getElementById('navigation-dots'),
    modalBackdrop: () => document.getElementById('modal-backdrop'),
};

const MODAL_CONTAINER_PROPS = [
    { attributeName: "id", value: "modal-backdrop" },
    { attributeName: "aria-labelledby", value: "modal-backdrop" },
    { attributeName: "aria-modal", value: "true" },
    { attributeName: "role", value: "dialog" },
    { attributeName: "class", value: "fixed inset-0 z-10 w-screen h-screen bg-gray-900 flex items-center px-4" },
];

let currentSlide = 0;
let isFullscreen = false;

const handleNavigate = (direction) => () => {
    const previousSlide = currentSlide;
    if (direction === "backward") {
        currentSlide = currentSlide === 0 ? SLIDES_LENGTH - 1 : currentSlide - 1;
    } else {
        currentSlide = (currentSlide + 1) % SLIDES_LENGTH;
    }
    changeVisibleSlide(currentSlide);
    switchNavigationDot(previousSlide, currentSlide);
}

const changeVisibleSlide = (slideIndex) => {
    const carouselImageSelector = SELECTORS.carouselImage().querySelector('img')

    carouselImageSelector.setAttribute('src', SLIDES[slideIndex].imageUrl);
    carouselImageSelector.setAttribute('alt', SLIDES[slideIndex].altText);
}

const switchNavigationDot = (previousSlide, currentSlide) => {
    const dots = SELECTORS.navigationDots().querySelectorAll('button');
    dots[previousSlide].innerHTML = UNFILLED_ICON;
    dots[currentSlide].innerHTML = FILLED_ICON;
}

const postitionBottomNavigation = () => {
    const bottomNavigationSelector = SELECTORS.bottomNavigation();
    if (isFullscreen) {
        bottomNavigationSelector.classList.remove('absolute')
        bottomNavigationSelector.classList.add('fixed')
    } else {
        bottomNavigationSelector.classList.remove('fixed')
        bottomNavigationSelector.classList.add('absolute')
    }
}

const fullscreenOrchestrator = () => {
    const carouselClone = SELECTORS.carouselContainer().cloneNode(true);
    if (!isFullscreen) {
        const modalWrapper = document.createElement('div');
        for (const prop of MODAL_CONTAINER_PROPS) {
            modalWrapper.setAttribute(prop.attributeName, prop.value)
        }
        modalWrapper.appendChild(carouselClone);

        SELECTORS.carouselContainer().remove();
        SELECTORS.root().appendChild(modalWrapper);
        SELECTORS.fullscreenToggle().innerHTML = MINIMIZE_ICON;
    } else {
        SELECTORS.modalBackdrop().remove();
        SELECTORS.root().appendChild(carouselClone);
        SELECTORS.fullscreenToggle().innerHTML = MAXIMIZE_ICON;
    }
    isFullscreen = !isFullscreen;
    postitionBottomNavigation();
}

const handleNavigationDotsClick = (clickedDot) => {
    let dotIndex = 0;
    let previousSibling = clickedDot.previousElementSibling;
    while (previousSibling) {
        dotIndex += 1;
        previousSibling = previousSibling.previousElementSibling;
    }
    changeVisibleSlide(dotIndex);
    switchNavigationDot(currentSlide, dotIndex);
    currentSlide = dotIndex;
}

(function attachRootEventListener() {
    SELECTORS.root().addEventListener('click', (event) => {
        const closestElementId = event.target.closest('[id]').getAttribute('id');
        switch (closestElementId) {
            case ELEMENT_IDS.navigateBackward:
                handleNavigate('backward')();
                break;
            case ELEMENT_IDS.navigateForward:
                handleNavigate('forward')();
                break;
            case ELEMENT_IDS.modalBackdrop:
            case ELEMENT_IDS.fullscreenToggle:
                fullscreenOrchestrator();
                break;
            case ELEMENT_IDS.navigationDots:
                handleNavigationDotsClick(event.target.closest('button'));
                break;
            default:
                break;
        }
    });
})();