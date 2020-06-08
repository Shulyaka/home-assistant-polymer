import "@thomasloven/round-slider";
import {
  customElement,
  html,
  TemplateResult,
  property,
  LitElement,
  CSSResult,
  css,
} from "lit-element";

@customElement("ha-round-slider")
export class HaRoundSlider extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Number }) min = null;

  @property({ type: Number }) max = null;

  @property({ type: Number }) low = null;

  @property({ type: Number }) high = null;

  @property({ type: Number }) value = null;

  @property({ type: Number }) step = null;

  protected createRenderRoot() {
    return this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  protected render(): TemplateResult {
    return html`
      <round-slider
        .min=${this.min}
        .max=${this.max}
        .low=${this.low}
        .high=${this.high}
        .value=${this.value}
        .step=${this.step}
        ?disabled=${this.disabled}
        @value-changing=${this._propagateValueChanging}
        @value-changed=${this._propagateValueChanged}
      ></round-slider>
    `;
  }

  private _propagateValueChanging(ev) {
    if (!this.disabled) {
      let event = new CustomEvent("value-changing", {
        detail: ev.detail,
        bubbles: true,
      });
      this.dispatchEvent(event);
      //    } else {
      //      ev.stopPropagation();
    }
  }

  private _propagateValueChanged(ev) {
    if (!this.disabled) {
      let event = new CustomEvent("value-changed", {
        detail: ev.detail,
        bubbles: true,
      });
      this.dispatchEvent(event);
      //    } else {
      //      ev.stopPropagation();
    }
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: inline-block;
        outline: none;
      }
      round-slider {
        --round-slider-path-color: var(--disabled-text-color);
        --round-slider-bar-color: var(--mode-color);
        padding-bottom: 10%;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-round-slider": HaRoundSlider;
  }
}
