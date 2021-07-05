class FancyButton extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        this.props = {};
        this.dev = this.hasAttribute('dev');
        this.animationSpeed = this.hasAttribute('animation-speed') ? this.getAttribute('animation-speed') : '0.1'
        this.options = {
            foreground: this.hasAttribute('foreground') ? this.getAttribute('foreground') : '#333333',
            background: this.hasAttribute('background') ? this.getAttribute('background') : 'white',
            outline: this.hasAttribute('outline'),
            disableElevation: this.hasAttribute('disable-elevation'),
            outlined: this.hasAttribute('outlined'),
            variant: this.getAttribute('variant'),
            lowercase: this.hasAttribute('lowercase'),
        }

        console.log(this.options);

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: inline-block;
                border: none;
                border-radius: 0.5em;
                box-shadow: 0 2px 3px rgba(0,0,0,0.7);
                font-weight: normal;
                text-transform: ${this.options.lowercase ? 'none' : 'UpperCase'};
                font-family: sans-serif;
                letter-spacing: 2px;
                background: none;
                cursor: pointer;
                padding: 0.5em;
                min-width: 65px;
                text-align: center;
                user-select: none;
                transition: transform 0.1s ease-in-out, box-shadow 0.2s ease-in-out;
            }

            :host:active {
                transform: translateY(2px);
                transition: transform ${this.animationSpeed}s ease-in-out;
            }

            :host(:active) {
                transform: translateY(2px);
                box-shadow: none;
                transition: transform ${this.animationSpeed}s ease-in-out, box-shadow ${parseInt(this.animationSpeed + 0.1)}s ease-in-out;
            }

            
            span {
                display: inherit;
                padding: 0.5em;
                width: 100%;
                height: 100%;
            }

            :host(.standard) {
                background: #999999;
                color: #333333;
            }

            :host(.primary) {
                background: slateblue;
                color: white;
            }

            :host(.secondary) {
                background: orangered;
                color: white;
            }

            :host(.disabled) {
                background: #555555;
                color: #999999;
                pointer-events: none;
                box-shadow: none;
                transform: none;
            }

            :host(.custom) {
                background: ${this.options.background || 'white'};
                color: ${this.options.foreground|| '#333333'};
            }

            :host(.disable-elevation) {
                box-shadow: none;
                transform: none;
            }

            :host(.standard-outlined) {
                background: none;
                border: 1px solid #999999;
            }

            :host(.primary-outlined) {
                background: none;
                border: 1px solid slateblue;
                color: slateblue;
            }

            :host(.secondary-outlined) {
                background: none;
                border: 1px solid orangered;
                color: orangered;
            }

            :host(.disabled-outlined) {
                background: none;
                border: 1px solid #555555;
                color: #999999;
                pointer-events: none;
                box-shadow: none;
                transform: none;
            }

            :host(.custom-outlined) {
                background: none;
                border: 1px solid ${this.options.background};
                color: ${this.options.background};
            }

            
        `




        // this.wrapper = document.createElement('a');
        // this.wrapper.className = 'fancy-button';
        // this.wrapper.role = 'button';
        // this.wrapper.setAttribute('aria-label', 'Button');


        // this.wrapper.appendChild(this.content);

        this.content = document.createTextNode(this.getAttribute('text'));
        shadow.appendChild(this.content);

            // shadow.appendChild(style);
            [style, this.content].forEach(e => shadow.appendChild(e));

    }

    getProps() {
        for (let i = 0; i < this.attributes.length; i++) {
            if (this.attributes[i].name === 'class') console.warn('Custom classes will likely be overwritten. Consider using JavaScript to alter button style.');
            this.props[this.attributes[i].name] = this.attributes[i].value;
        }
    }

    connectedCallback() {
        this.role = 'button';
        this.setAttribute('aria-label', 'Button');
        this.getProps();
        this.handleVariant(this.options.variant);
        if(this.hasAttribute('outlined')) this.classList.add('outlined');
        if(this.options.disableElevation) this.classList.add('disable-elevation');
        if(this.options.outlined) this.classList.add(`${this.options.variant}-outlined`);

    }

    handleVariant(variant) {
        switch(variant) {
            case 'standard': {
                this.classList.add('standard');
                break;
            }
            case 'primary': {
                this.classList.add('primary');
                break;
            }
            case 'secondary': {
                this.classList.add('secondary');
                break;
            }
            case 'disabled' :{
                this.classList.add('disabled');
                this.setAttribute('disabled', this.props.disabled ? true : false);
                break;
            }
            case 'custom' :{
                this.classList.add('custom');
                break;
            }
            default: {
                this.classList.add('standard');
                break;
            }
        }
    }

    applyStyle(options, force) {
        if (!options) return console.error('Invalid style options.');
        if (force) {
            this.className = '';
            if (this.dev) {
                console.warn('All styles have been removed from Fancy Button.');
            }
        }
        for (const [key, value] in Object.entries(options)) {
            this.style[key] = value;
        }
    }


}

customElements.define('fancy-button', FancyButton);