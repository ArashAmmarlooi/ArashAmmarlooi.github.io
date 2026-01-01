export default function navClassHandle(loc) {
    let nav;
    (loc === '/') ? nav = 'whiteNavMenu' : nav = 'blackNavMenu';
    return nav;
}