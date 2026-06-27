import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-star-rating')
export class LitStarRating extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            gap: 2px;
            cursor: pointer;
            font-size: 24px;
        }
        :host([readonly]) {
            cursor: default;
        }
        .star {
            transition: transform 0.15s ease, color 0.15s ease;
            user-select: none;
        }
        .star:hover {
            transform: scale(1.2);
        }
        .star.filled {
            color: #f5a623;
        }
    `;

    @property({ type: Number, reflect: true })
    value = 0;
  
    @property({ type: Number })
    max = 5;
  
    @property({ type: Boolean })
    readonly = false;

    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'slider');
        this.setAttribute('tabindex', '0');
        this.setAttribute('aria-valuemin', '0');
        this.setAttribute('aria-valuemax', String(this.max));
        this.setAttribute('aria-valuenow', String(this.value));
        this.addEventListener('keydown', this._handleKeydown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this._handleKeydown);
    }

    updated(changed: Map<string, unknown>) {
        if (changed.has('value')) {
            this.setAttribute('aria-valuenow', String(this.value));
        }

        if (changed.has('max')) {
            this.setAttribute('aria-valuemax', String(this.max));
        }
    }

    render() {
        return html`
            ${Array.from({ length: this.max }, (_, i) => {
                const filled = i < this.value;
                return html`
                    <span
                        class="star ${filled ? 'filled' : ''}"
                        @click=${() => this._select(i + 1)}
                        aria-hidden="true"
                    >${filled ? '★' : '☆'}</span>
                `;
            })}
        `;
    }

    private _select(val: number) {
        if (this.readonly) return;
        this.value = val;
        this.dispatchEvent(new CustomEvent('rating-change', {
            detail: { value: val },
            bubbles: true,
            composed: true,
        }));
    }

    private _handleKeydown(e: KeyboardEvent) {
        if (this.readonly) return;
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                this._select(Math.min(this.value + 1, this.max));
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                this._select(Math.max(this.value - 1, 0));
                break;
        }
    }
}
