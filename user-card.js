const template = document.createElement('template');
template.innerHTML = `
    <style>
        .user-card {
            background: #f4f4f4;
            width: 500px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 10px;
            margin-bottom: 15px;
        }
        .user-card img {
            width: 100%;
        }
        .user-card button {
            cursor: pointer;
            background: #1d1d1d;
            color: #ffffff;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
        }
    </style>

    <div class="user-card">
        <img />  
        <div>  
            <h3></h3>
            <div class="info">
                <p><slot name="email" /></p>
                <p><slot name="phone" /></p>
            </div>
            <button class="btn btn-primary" id="toggle-info">Hide Info</button>
        </div>
    </div>
`


class UserCard extends HTMLElement {
    constructor() {
        super();
        // info is shown by default
        this.showInfo = true;
        
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }
    
    toggleInfo() {
        // make showinfo opposite of what it was before clicking
        this.showInfo = !this.showInfo;
        // Define info and button elements
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');
        // Interaction (hide and show)
        if (this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerText = "Hide Info"
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = "Show Info"
        }
    }
    
    // Add Event Listener when added to DOM
    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo())
    }
    // Remove Event Listener when removed from DOM
    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

window.customElements.define('user-card', UserCard)