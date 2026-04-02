import { r as registerInstance, h, a as Host } from './index-CSY3GKIt.js';

const trafficLightCss = () => `:host{display:inline-block}.traffic-light{display:grid;gap:14px;padding:10px;border:2px solid #1f1f1f;border-radius:24px;background:linear-gradient(180deg, #1e1e1e 0%, #050505 100%);box-shadow:inset 0 2px 4px rgb(255 255 255 / 0.14),     0 8px 18px rgb(0 0 0 / 0.18);cursor:pointer;user-select:none;outline:none}.traffic-light:focus-visible{box-shadow:inset 0 2px 4px rgb(255 255 255 / 0.14),     0 0 0 3px rgb(59 130 246 / 0.45),     0 8px 18px rgb(0 0 0 / 0.18)}.light{width:72px;height:72px;border-radius:50%;opacity:0.35;box-shadow:inset 0 -6px 10px rgb(0 0 0 / 0.35),     inset 0 6px 10px rgb(255 255 255 / 0.08);transition:opacity 140ms ease, filter 140ms ease, transform 140ms ease}.light.active{opacity:1;filter:saturate(1.15)}.red{background:#ff1200}.yellow{background:#a7a300}.green{background:#3f8f00}`;

const STATES = ['stop', 'yield', 'go'];
const TrafficLight = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.state = 'stop';
        this.handleClick = () => {
            void this.next();
        };
        this.handleKeyDown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                void this.next();
            }
        };
    }
    validateState(nextValue) {
        this.state = this.normalizeState(nextValue);
    }
    componentWillLoad() {
        this.state = this.normalizeState(this.state);
    }
    async next() {
        const currentIndex = STATES.indexOf(this.state);
        const nextIndex = (currentIndex + 1) % STATES.length;
        this.state = STATES[nextIndex];
    }
    normalizeState(value) {
        return STATES.includes(value)
            ? value
            : 'stop';
    }
    render() {
        return (h(Host, { key: '50056232aab4e1faed305c816ecce0f86926cb37' }, h("div", { key: '976495cdb7eb591d2ceaf240ddbb9ea4ad5481b3', class: "traffic-light", onClick: this.handleClick, onKeyDown: this.handleKeyDown, role: "button", tabindex: 0, "aria-label": `Traffic light showing ${this.state}` }, h("div", { key: '6f8b527c018ef906646ea1c885a64bee2cc6e6a9', class: { light: true, red: true, active: this.state === 'stop' } }), h("div", { key: '40ea16dec201ec25e3a6a65362ff8c354ff32ead', class: { light: true, yellow: true, active: this.state === 'yield' } }), h("div", { key: '266b8b51de7f2552690402ef7320e1279753f3b7', class: { light: true, green: true, active: this.state === 'go' } }))));
    }
    static get watchers() { return {
        "state": [{
                "validateState": 0
            }]
    }; }
};
TrafficLight.style = trafficLightCss();

export { TrafficLight as traffic_light };
//# sourceMappingURL=traffic-light.entry.esm.js.map

//# sourceMappingURL=traffic-light.entry.js.map