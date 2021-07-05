# Fancy Buttons

A simple web component to help provide pre-styled buttons.

[![CDN - jsDelivr](https://img.shields.io/static/v1?label=CDN&message=jsDelivr&color=%23ff5626&logo=jsDelivr&logoColor=%23ff5626)](https://cdn.jsdelivr.net/gh/aboxofsox/feather-icon-web-component@master/dist/feather-icon-wc.js)
[![Replit - Demo](https://img.shields.io/badge/Replit-Demo-1d2333?logo=replit&logoColor=667881)](https://replit.com/@aboxofsox/feather-icons-web-comonent)

## Usage
- Copy the link to the CND above.
- Slap it into the `src` of your `script` tag.
- Create as many `<fancy-button>` elements as you need.

## Example
```html
<fancy-button
    text="Gradient"
    variant="gradient"
    gradient-1="red"
    gradient-2="orange"
    gradient-direction="to top right"
    color="white"
    disable-elevation
    fancy
></fancy-button>

<fancy-button
    text="Custom"
    variant="custom"
    foreground="white"
    background="dodgerblue"
    fancy
></fancy-button>
```

| Attribute                   | Description                                                                                                 |
|-----------------------------|-------------------------------------------------------------------------------------------------------------|
| `text`                      | Sets the text of the button.                                                                                |
| `variant`                   | Provide which variant of the button you need to use.                                                        |
| `gradient-1` & `gradient-2` | Set the gradient colors when the `gradient` variant is selected.                                            |
| `gradient-direction`        | Set the direction of the gradient. The values are the same as the CSS property value for a linear-gradient. |
| `color`                     | Sets the font color of the `gradient` variant.                                                              |
| `disable-elevation`         | Disable the `box-shadow` & `transform` effects.                                                             |
| `fancy`                     | Applies a "fancy" click animation.                                                                          |
| `foreground`                | Changes the font color of a `custom` variant button.                                                        |
| `background`                | Changes the background color of a `custom` variant button.                                                  |
| `outlined`                  | Provides a button with an outline instead of a filled-styled based on variant.                              |                                            |

