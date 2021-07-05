(() => {
  // src/FancyButton.js
  var FancyButton = class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.props = {};
      this.animationSpeed = this.hasAttribute("animation-speed") ? this.getAttribute("animation-speed") : "0.1";
      this.options = {
        foreground: this.getAttribute("foreground") ?? "#333333",
        background: this.getAttribute("background") ?? "white",
        outline: this.hasAttribute("outline"),
        disableElevation: this.hasAttribute("disable-elevation"),
        outlined: this.hasAttribute("outlined"),
        variant: this.getAttribute("variant"),
        lowercase: this.hasAttribute("lowercase"),
        fancy: this.hasAttribute("fancy"),
        gradient: this.hasAttribute("gradient"),
        gradientDirection: this.getAttribute("gradient-direction"),
        gradientOne: this.getAttribute("gradient-1"),
        gradientTwo: this.getAttribute("gradient-2"),
        icon: this.getAttribute("icon") ?? "",
        circle: this.hasAttribute("cirlce"),
        width: this.getAttribute("width") ?? "auto",
        height: this.getAttribute("height") ?? "auto",
        padding: this.getAttribute("padding") ?? "1em 1em",
        minWidth: this.getAttribute("min-width") ?? "120px",
        iconWidth: this.getAttribute("icon-width") ?? "25px",
        iconHeight: this.getAttribute("icon-height") ?? "25px"
      };
      const style = document.createElement("style");
      style.textContent = `
            :host {
                display: inline-block;
                border: none;
                border-radius: 0.25rem;
                box-shadow: 0 2px 3px rgba(0,0,0,0.7);
                font-weight: normal;
                text-transform: ${this.options.lowercase ? "none" : "UpperCase"};
                font-family: sans-serif;
                letter-spacing: 2px;
                background: none;
                cursor: pointer;
                padding: ${this.options.padding};
                min-width: ${this.options.minWidth};
                text-align: center;
                user-select: none;
                transition: transform 0.1s ease-in-out, box-shadow 0.2s ease-in-out;
                position: relative;
                overflow: hidden;
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

            :host(.fancy) {
                overflow: hidden;
                transition: background 400ms;
                box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);

            }

            :host(.circle) {
                width: ${this.options.width}px;
                height: ${this.options.height}px;
                padding: ${this.options.padding};
                border-radius: 50%;
                display:flex;
                align-items: center;
                justify-content: center;
            }

            .icon {
                width: ${this.options.iconWidth}px !important;
                height: ${this.options.iconHeight}px !important;
            }

            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 600ms linear;
                background: rgba(255,255,255,0.5);
            }

            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            :host(.custom) {
                background: ${this.options.background || "white"};
                color: ${this.options.foreground || "#333333"};
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

            :host(.gradient) {
                background: linear-gradient(${this.options.gradientDirection}, ${this.options.gradientOne}, ${this.options.gradientTwo});
                color: ${this.getAttribute("color")};
            }

            :host(.gradient)

            @media only screen and (max-width: 500px) {
                :host {
                    min-width: auto;
                    font-size: calc(16px + 6 * ((100vw - 320px) / 680));
                    font-size: clamp(1rem, 2.5vw, 1.2rem);
                }
            }

            @media only screen and (min-width: 1000px) {
                :host {
                    font-size: 22px;
                    font-size: clamp(1.0rem, 2.5vw, 1.5rem);

                    
                }
            }
            
        `;
      this.content = document.createTextNode(this.getAttribute("text"));
      this.shadow.appendChild(this.content);
      if (this.options.fancy) {
        this.addEventListener("click", (e) => this.ripple(e));
      }
      [style, this.content].forEach((e) => this.shadow.appendChild(e));
    }
    getProps() {
      for (let i = 0; i < this.attributes.length; i++) {
        this.props[this.attributes[i].name] = this.attributes[i].value;
      }
    }
    connectedCallback() {
      this.role = "button";
      this.setAttribute("aria-label", "Button");
      this.getProps();
      this.handleVariant(this.options.variant);
      if (this.hasAttribute("outlined"))
        this.classList.add("outlined");
      if (this.options.disableElevation)
        this.classList.add("disable-elevation");
      if (this.options.outlined)
        this.classList.add(`${this.options.variant}-outlined`);
      if (this.hasAttribute("fancy"))
        this.classList.add("fancy");
      if (this.hasAttribute("icon"))
        this.handleIcon(this.getAttribute("icon"));
      if (this.hasAttribute("circle"))
        this.classList.add("circle");
      if (this.hasAttribute("href"))
        this.addEventListener("click", () => window.location = this.getAttribute("href"));
    }
    handleVariant(variant) {
      switch (variant.toLowerCase()) {
        case "standard": {
          this.classList.add("standard");
          break;
        }
        case "primary": {
          this.classList.add("primary");
          break;
        }
        case "secondary": {
          this.classList.add("secondary");
          break;
        }
        case "disabled": {
          this.classList.add("disabled");
          this.setAttribute("disabled", this.props.disabled ? true : false);
          break;
        }
        case "custom": {
          this.classList.add("custom");
          break;
        }
        case "fancy": {
          this.classList.add("fancy");
          break;
        }
        case "gradient": {
          this.classList.add("gradient");
        }
        default: {
          this.classList.add("standard");
          break;
        }
      }
    }
    applyStyle(options, force) {
      if (!options)
        return console.error("Invalid style options.");
      if (force) {
        this.className = "";
        if (this.dev) {
          console.warn("All styles have been removed from Fancy Button.");
        }
      }
      for (const [key, value] in Object.entries(options)) {
        this.style[key] = value;
      }
    }
    ripple(e) {
      let target = this;
      let rect = target.getBoundingClientRect();
      let circle = document.createElement("span");
      let diam = Math.max(target.clientWidth, target.clientHeight);
      let radius = diam / 2;
      circle.style.width = circle.style.height = `${diam}px`;
      circle.style.left = `${e.clientX - (rect.left + radius)}px`;
      circle.style.top = `${e.clientY - (rect.top + radius)}px`;
      circle.classList.add("ripple");
      let ripple = this.shadow.querySelector(".ripple");
      if (ripple) {
        ripple.remove();
      }
      this.shadow.appendChild(circle);
    }
    handleHref(href) {
      window.location = `${href}`;
    }
    handleIcon() {
      this.icon = document.createElement("feather-icon");
      this.icon.setAttribute("icon", this.options.icon);
      this.icon.className = "icon";
      this.shadow.appendChild(this.icon);
    }
    handleIconSize() {
      switch (this.options.iconSize) {
        case "sml": {
          this.icon.style.width = "25px";
          this.icon.style.height = "25px";
          break;
        }
        case "med": {
          this.icon.style.width = "75px";
          this.icon.style.height = "75px";
          break;
        }
        case "lrg": {
          this.icon.style.width = "100px";
          this.icon.style.height = "100px";
          break;
        }
        case "xlr": {
          this.icon.style.width = "150px";
          this.icon.style.height = "150px;";
          break;
        }
        default: {
          this.icon.style.width = "25px";
          this.icon.style.height = "25px";
          break;
        }
      }
    }
  };
  customElements.define("fancy-button", FancyButton);
})();
//# sourceMappingURL=fancy-button.js.map
