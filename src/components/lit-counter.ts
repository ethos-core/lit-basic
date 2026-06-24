import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-counter')
export class LitCounter extends LitElement {
    static styles = css`
        :host {
        display: block;
        font-family: system-ui;
        padding: 16px;
        }
        .counter {
        display: flex;
        align-items: center;
        gap: 16px;
        }
        button {
        padding: 8px 16px;
        font-size: 18px;
        border: 1px solid #ddd;
        border-radius: 8px;
        cursor: pointer;
        background: white;
        transition: background 0.2s;
        }
        button:hover {
        background: #f0f0f0;
        }
        .count {
        font-size: 32px;
        font-weight: bold;
        min-width: 60px;
        text-align: center;
        }
    `;

    @property({ type: Number })
    count = 0;

    render() {
        return html`
            <div class="counter">
                <button @click=${this._decrement}>−</button>
                <span class="count">${this.count}</span>
                <button @click=${this._increment}>+</button>
            </div>
        `;
    }

    private _increment() {
        this.count++;
        this._emitChange();
    }

    private _decrement() {
        this.count++;
        this._emitChange();
    }

    private _emitChange() {
        this.dispatchEvent(new CustomEvent('count-change', {
            detail: { count: this.count },
            bubbles: true,
            composed: true,
        }))
    }
}