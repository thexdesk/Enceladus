export default function link_css(component_name) {
  const css = document.createElement('link');
  css.setAttribute('rel', 'stylesheet');
  css.setAttribute('href', `${component_name}.bundle.css`);
  return css;
}
