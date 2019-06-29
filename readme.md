# SassPlate

SassPlate is a modular [sass](http://sass-lang.com) boilerplate.

It is structured in a way that separates the components at the same time providing them with a global envirement.


## Usage

When starting a new project:
1. Add your generic styles in `base/_style.scss` (you can rename it), layout partials in `layout` folder, edit and add components in `component` folder.
When adding files, make sure to import them in your bootstrap file - `styles.scss` (or whichever name you have). In the same file disable the components you don't use (comment out the import lines);
1. Modify color scheme, metrics, typography and other settings in `core/_variables.css` and files in `core/variables` folder;

You can leave `demo.scss` and `demo.html` files, so that you can see on one page how all the elements and components look as you edit them.


## Folder structure

### Core
Code in this folder defines variables, functions and mixins. It doesn't produce any CSS output.
Functions are defined in `_functions.scss` file, variables in `_variables.scss` and `variables` folder:
- `_colors.scss` defines all the colors used throughout the styles.
- `_metrics.scss` defines various sizes, such as margins, paddings and borders.
- `_typography.scss` defines type faces and font sizes
- `_3d.scss` defines z-indeces and box-shadows

The last file in the "core" is `_helpers.scss`. It defines `@extend`-only selectors (such as `%clearfix`), which you can later extend in your actual classes.


### Base
This folder contains `_normalize.scss` from [normalize.css](https://github.com/necolas/normalize.css/) and generic styles file (if you choose to have your generic styles in a separate file).


### Component
Here go the user interface elements (modules) that will typically be reused in multiple places, e.g. button, link, form, breadcrumb, menu, dropdown, etc.


### Layout
Parts of a page like header and footer can be stored here.

When you create a new stylesheet, e. g. `style.scss`, you have to first bootstrap the core:
```sass
@import "core/core";
```
then the base:
```sass
@import "base/normalize";
@import "base/style";
```
then all the components you will need:
```sass
@import "component/table";
@import "component/form";
...
```
then layout partials:
```sass
@import "layout/header";
@import "layout/footer";
...
@import "layout/print";
```


## Concepts
Besides the modular file structure, SassPlate introduces a few concepts, which you may or may not find useful.


### Color
All the colors are defined in `core/variables/_colors.scss`. Moreover, only a handful of colors is defined manually in the first few lines of the file. All the other colors (except for "Other Common Colors" section) are computed based on this basic color scheme.

Such approach makes changing color scheme extremely easy. You only need to modify one or two colors, and all the other values are calculated and updated automatically using `magicon` function. The function takes in a color and produces a contrast color whose lightness is given percentage from the color's lightness. For dark colors this will be a lighter color, for light colors - dark one. E. g:

| in color | function | out color |
| -------- | -------- | --------- |
| `$clr: hsl(0, 100%, 30%)` | `magicon($clr, 60%)` | `hsl(0, 100%, 90%)` |
| `$clr: hsl(0, 50%, 80%)`  | `magicon($clr, 60%)` | `hsl(0, 50%, 20%)`  |

This is handy in a scenario where you need to create a gradual scale from a base color: you can increment lightness little by little; or when you want a contrasting text color for a background color.


### Screen sizes
To make the use of media query breakpoints easier, `core/mixins/_screen.scss` defines media breakpoints for `(min-width: ...)` and `(max-width: ...)`.

Two mixins are available to use in conjuntion with these breakpoints: `minscreen($size)` and `maxscreen($size)`, where `$size` is either `xs`, `sm`, `md`, `lg` or `xl`. You can define the values in `core/_variables.scss`.

## License
© 2018 Tigran Sargsyan

Licensed under ([the MIT License][license])

[license]: https://github.com/tigrr/sassplate/blob/master/LICENSE
