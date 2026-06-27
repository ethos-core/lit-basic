import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

@customElement('lit-todo-list')
export class LitTodoList extends LitElement {
    static styles = css`
        :host {
        display: block;
        font-family: system-ui;
        max-width: 400px;
        }
        .input-row {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
        }
        input[type="text"] {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        }
        button {
        padding: 8px 16px;
        border: 1px solid #ddd;
        border-radius: 6px;
        cursor: pointer;
        background: #4a90d9;
        color: white;
        font-size: 14px;
        }
        button:hover {
        background: #357abd;
        }
        ul {
        list-style: none;
        padding: 0;
        margin: 0;
        }
        li {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
        }
        .done {
        text-decoration: line-through;
        color: #999;
        }
        .delete-btn {
        margin-left: auto;
        background: #e74c3c;
        padding: 4px 8px;
        font-size: 12px;
        }
        .stats {
        margin-top: 12px;
        font-size: 13px;
        color: #666;
        }
    `;

    @state()
    private _todos: Todo[] = [];
    
    @state()
    private _input = '';

    private _nextId = 1;

    render() {
        const remaining = this._todos.filter(todo => !todo.done).length;

        return html`
            <div class="input-row">
                <input
                type="text"
                placeholder="Add a new task..."
                .value=${this._input}
                @input=${(e: InputEvent) => {
                    this._input = (e.target as HTMLInputElement).value;
                }}
                @keydown=${(e: KeyboardEvent) => {
                    if (e.key === 'Enter') this._addTodo();
                }}
                />
                <button @click=${this._addTodo}>Add</button>
            </div>
            <ul>
                ${repeat(
                this._todos,
                (todo) => todo.id,
                (todo) => html`
                    <li>
                    <input
                        type="checkbox"
                        .checked=${todo.done}
                        @change=${() => this._toggleTodo(todo.id)}
                    />
                    <span class=${todo.done ? 'done' : ''}>${todo.text}</span>
                    <button class="delete-btn" @click=${() => this._deleteTodo(todo.id)}>Delete</button>
                    </li>
                `
                )}
            </ul>
            ${this._todos.length > 0
                ? html`<div class="stats">${remaining} remaining / ${this._todos.length} total</div>`
                : html`<p>No tasks yet</p>`
            }
        `;
    }

    private _addTodo() {
        const text = this._input.trim();
        if (!text) return;
        this._todos = [...this._todos, { id: this._nextId++, text, done: false }];
        this._input = '';
    }

    private _toggleTodo(id: number) {
        this._todos = this._todos.map(t => 
            t.id === id ? { ...t, done: !t.done } : t
        )
    }

    private _deleteTodo(id: number) {
        this._todos = this._todos.filter(t => t.id !== id);
    }
}
