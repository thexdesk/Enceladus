export function is_host() {
  return new URL(window.location.href).searchParams.has('host');
}
