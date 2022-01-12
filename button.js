//----------------------------------------------------------------------------//
// Define Template Markup and Styles for Component
//----------------------------------------------------------------------------//
const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
<link rel="stylesheet" href="all.css">



<a class="btn" href="#" role="button">
    <div class="button-content d-flex align-items-center justify-content-center"></div>
</a>


`

//----------------------------------------------------------------------------//
//  Define Custom Component and its Functionality
//----------------------------------------------------------------------------//
class BootstrapButton extends HTMLElement {
    constructor() {
        // Always call super() first
        super();
        // Attach Shadow DOM to component
        this.attachShadow({mode: 'open'})
        
        // Add template markup to Shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Declare button variable
        const button = this.shadowRoot.querySelector('.btn');
        
        // Set Button Variant if defined, otherwise default to primary
        if (this.hasAttribute('variant')) {
            const buttonVariant = this.getAttribute('variant');
            button.classList.add('btn-' + buttonVariant)
        } else {
            button.classList.add('btn-primary')
        }
        
        // Add link url to href of button
        const buttonLink = this.getAttribute('link');
        button.setAttribute('href', buttonLink);
        
        // Add Text to button
        const buttonContent = this.shadowRoot.querySelector('.button-content')
        const buttonText = this.getAttribute('text');
        buttonContent.innerHTML += buttonText;

        // Add Icon if defined
        if (this.hasAttribute('icon-name')) {
            // Add markup for fontawesome icon to button content 
            buttonContent.innerHTML += `<i class="icon"></i>`
            // Define Icon container
            const buttonIconContainer = this.shadowRoot.querySelector('.icon');
            // If a FontAwesome icon pack is defined, add appropriate class name,
            // to icon markup, otherwise use the `regular` icon pack as the default
            if (this.hasAttribute('icon-pack')) {
                const buttonIconPack = this.getAttribute('icon-pack');
                switch (buttonIconPack) {
                    case 'light':
                        buttonIconContainer.classList.add('fal');
                        break;
                    case 'solid':
                        buttonIconContainer.classList.add('fas');
                        break;
                    case 'regular':
                        buttonIconContainer.classList.add('far');
                        break;
                    case 'brand':
                        buttonIconContainer.classList.add('fab');
                        break;
                    case 'duotone':
                        buttonIconContainer.classList.add('fad');
                        break;
                    default:
                        console.log('Icon pack "' + buttonIconPack +  '" doesn\'t exist');
                }
            } else {
                buttonIconContainer.classList.add('far');
            }
            // Add icon class name to icon markup
            const buttonIcon = this.getAttribute('icon-name');
            buttonIconContainer.classList.add('fa-' + buttonIcon);

            // Set icon location of the icon within the button (start or end)
            if (this.hasAttribute('icon-position-reverse') ) {
                buttonContent.classList.add('flex-row-reverse');
                buttonIconContainer.classList.add('mr-3');
            } else {
                buttonIconContainer.classList.add('ml-3');
            }
            // Add icon size modifier classes if defined
            if (this.hasAttribute('icon-size')) {
                const iconSize = this.getAttribute('icon-size');
                switch (iconSize) {
                    case 'xs':
                        buttonIconContainer.classList.add('fa-xs');
                        break;
                    case 'sm':
                        buttonIconContainer.classList.add('fa-sm');
                        break;
                    case 'lg':
                        buttonIconContainer.classList.add('fa-lg');
                        break;
                    case '2x':
                        buttonIconContainer.classList.add('fa-2x');
                        break;
                    case '3x':
                        buttonIconContainer.classList.add('fa-3x');
                        break;
                    case '4x':
                        buttonIconContainer.classList.add('fa-4x');
                        break;
                    case '5x':
                        buttonIconContainer.classList.add('fa-5x');
                        break;
                    case '6x':
                        buttonIconContainer.classList.add('fa-6x');
                        break;
                    case '10x':
                        buttonIconContainer.classList.add('fa-10x');
                        break;
                    default:
                        console.log('Icon size "' + iconSize + '" doesn\'t exist')
                }
            }
        } 

        // Add buttons size modifier classes if defined
        if (this.hasAttribute('button-size')) {
            const buttonSize = this.getAttribute('button-size');
            switch (buttonSize) {
                case 'small':
                    button.classList.add('btn-sm');
                    break;
                case 'large':
                    button.classList.add('btn-lg')
                    break;
                default:
                    console.log('Button size "' + buttonSize + '" doesn\'t exist')
            }
        }
        
        // Add block modifier class to button if attribute is present
        if (this.hasAttribute('block')) {
            this.shadowRoot.querySelector('.btn').classList.add('btn-block')
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


    static get observicedAttributes() {
        return ["variant","image"]
    }

    //------------------------------------------------------------------------//
    // Functionality when component attributes are updated
    //------------------------------------------------------------------------//
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChangedCallback()');
    }
}

// Define custom element so it is recognized in the DOM
window.customElements.define('bs-button', BootstrapButton)