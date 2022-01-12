

//----------------------------------------------------------------------------//
// Define Template Markup and Styles for Component

// import { render } from "lit-html";

//----------------------------------------------------------------------------//
const contentTemplate = document.createElement('template');
contentTemplate.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
<link rel="stylesheet" href="all.css">

<section class="js-container-wrapper">
    <div class="container">
        <div class="row">
            <div class="col-md-6 mb-3 mb-md-0 js-image">
                <img class="w-100" src="//fpoimg.com/600x400" alt="Placeholder Image">
            </div>
            <div class="col-md-6 js-content">
                <h2>Heading 2</h2>
                <p>
                    Copy Goes Here
                </p>
            </div>
        </div>
    </div>
</section>

`

//----------------------------------------------------------------------------//
//  Define Custom Component and its Functionality
//----------------------------------------------------------------------------//
class Content5050 extends HTMLElement {
    constructor() {
        // Always call super() first
        super();
        // Attach Shadow DOM to component
        this.attachShadow({mode: 'open'})
        
        // Add template markup to Shadow DOM
        this.shadowRoot.appendChild(contentTemplate.content.cloneNode(true));
        
        // Update Heading Text
        const headingText = this.getAttribute('heading');
        this.shadowRoot.querySelector('.js-content h2').innerText = headingText;
        

        // Update Paragraph Copy
        const copy = this.getAttribute('copy');
        this.shadowRoot.querySelector('.js-content p').innerText = copy;
        
        // Update Image
        if (this.hasAttribute('image-url')) {
            const imageUrl = this.getAttribute('image-url');
            const image = this.shadowRoot.querySelector('img');
            image.src = imageUrl;
        }
        // Update Image Alt Text
        if (this.hasAttribute('image-alt')) {
            const imageAlt = this.getAttribute('image-alt');
            const image = this.shadowRoot.querySelector('img');
            image.alt = imageAlt;
        }

        // Add Button if Defined
        if (this.hasAttribute('button-text') && this.hasAttribute('button-link')) {
            const buttonText = this.getAttribute('button-text');
            const buttonLink = this.getAttribute('button-link');
            this.shadowRoot.querySelector('.js-content').innerHTML += `
                <bs-button
                    text="${buttonText}"
                    link="${buttonLink}"    
                >
                </bs-button>
            `;
        } else {
            console.log('need both `button-text` and `button-link` attributes defined to render button');
        }

        // Set background-color of component container if defined
        if (this.hasAttribute('bgcolor')) {
            const bgColor = this.getAttribute('bgcolor');
            this.shadowRoot.querySelector('.js-container-wrapper').classList.add('bg-' + bgColor)
        }



        // Set Vertical Alignment of component if defined.
        // If not, set 'middle' as default
        if (this.hasAttribute('alignment')) {
            const alignment = this.getAttribute('alignment');
            switch (alignment) {
                case 'top':
                    this.shadowRoot.querySelector('.row').classList.add('align-items-start')
                    break;
                case 'middle':
                    this.shadowRoot.querySelector('.row').classList.add('align-items-center')
                    break;
                case 'bottom':
                    this.shadowRoot.querySelector('.row').classList.add('align-items-end')
                    break;
                    
                default:
                    console.log('Invalid alignment type: ' + alignment);
                    break;
            } 
        } else {
            this.shadowRoot.querySelector('.row').classList.add('align-items-center')
        }

        // Set vertical padding of container 
        // generally only used for instances definiing a bgcolor
        // uses Bootstrap 
        if (this.hasAttribute('vert-padding')) {
            const vertPadding = this.getAttribute('vert-padding');
            this.shadowRoot.querySelector('.js-container-wrapper').classList.add('py-' + vertPadding);
        }

        // Set bottom margin of container 
        // uses Bootstrap $sizes keys (eg. 0-5)
        if (this.hasAttribute('space-below')) {
            const spaceBelow = this.getAttribute('space-below');
            this.shadowRoot.querySelector('.js-container-wrapper').classList.add('mb-' + spaceBelow);
        }

        // Reverse Content/Image Layout
        if (this.hasAttribute('reverse-layout')) {
            this.shadowRoot.querySelector('.row').classList.add('flex-row-reverse')
        }
    }

    //------------------------------------------------------------------------//
    // Functionality when component added to DOM
    //------------------------------------------------------------------------//
    connectedCallback() {
        // this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo())
        console.log('connectedCallBack()');
    }
    //------------------------------------------------------------------------//
    // Functionality when component removed from DOM
    //------------------------------------------------------------------------//
    disconnectedCallback() {
        // this.shadowRoot.querySelector('#toggle-info').removeEventListener();
        console.log('disconnectedCallBack()');
    }
    //------------------------------------------------------------------------//
    // Functionality when component attributes are updated
    //------------------------------------------------------------------------//
    attributeChangedCallback() {
        console.log('attributeChangedCallback()');
    }
}

// Define custom element so it is recognized in the DOM
window.customElements.define('content-50-50', Content5050)