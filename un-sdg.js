import { LitElement, html, css } from 'lit'; //importing necessary modules from 'lit'

const goalData = [
  { name: 'No Poverty', color: '#e5243b', image: new URL('./lib/svgs/goal-1.svg', import.meta.url).href },
  { name: 'Zero Hunger', color: '#dda63a', image: new URL('./lib/svgs/goal-2.svg', import.meta.url).href },
  { name: 'Good Health and Well-being', color: '#4c9f38', image: new URL('./lib/svgs/goal-3.svg', import.meta.url).href },
  { name: 'Quality Education', color: '#c5192d', image: new URL('./lib/svgs/goal-4.svg', import.meta.url).href },
  { name: 'Gender Equality', color: '#ff3a21', image: new URL('./lib/svgs/goal-5.svg', import.meta.url).href },
  { name: 'Clean Water and Sanitation', color: '#26bde2', image: new URL('./lib/svgs/goal-6.svg', import.meta.url).href },
  { name: 'Affordable and Clean Energy', color: '#fcc30b', image: new URL('./lib/svgs/goal-7.svg', import.meta.url).href },
  { name: 'Decent Work and Economic Growth', color: '#a21942', image: new URL('./lib/svgs/goal-8.svg', import.meta.url).href },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925', image: new URL('./lib/svgs/goal-9.svg', import.meta.url).href },
  { name: 'Reduced Inequalities', color: '#dd1367', image: new URL('./lib/svgs/goal-10.svg', import.meta.url).href },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24', image: new URL('./lib/svgs/goal-11.svg', import.meta.url).href },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e', image: new URL('./lib/svgs/goal-12.svg', import.meta.url).href },
  { name: 'Climate Action', color: '#3f7e44', image: new URL('./lib/svgs/goal-13.svg', import.meta.url).href },
  { name: 'Life Below Water', color: '#0a97d9', image: new URL('./lib/svgs/goal-14.svg', import.meta.url).href },
  { name: 'Life on Land', color: '#56c02b', image: new URL('./lib/svgs/goal-15.svg', import.meta.url).href },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d', image: new URL('./lib/svgs/goal-16.svg', import.meta.url).href },
  { name: 'Partnerships for the Goals', color: '#19486a', image: new URL('./lib/svgs/goal-17.svg', import.meta.url).href },
]; //defining the images for the goals to have them appear

export class UnSdg extends LitElement {
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      label: { type: String },
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true },
      _currentSrc: { type: String },
      alt: { type: String },
    }; //defining the properties and having goal and colorOnly reflected as an attribute
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 254px;
        height: 254px; //setting the width and height for the host element
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain; //the images will take the full width and height of the container and be contained within the container
      }
      .color-only {
        width: 100%;
        height: 100%;
      } //same as img, color-only takes full height and width of container
    `;
  }

  constructor() {
    super();
    this.goal = '1';
    this.label = '';
    this.alt = null;
    this.colorOnly = false;
    this._currentSrc = null; //defining the constructor variables
  }

  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage(); //checking and updating the goal property if it has changed
    }
  }

  updateGoalImage() {
    if (this.goal === 'all' || this.goal === 'circle') {
      this._currentSrc = new URL(`./lib/svgs/goal-${this.goal}.svg`, import.meta.url).href;
      this.alt = this.goal === 'all' ? 'All Sustainable Development Goals' : 'Sustainable Development Goals Circle';
    } else {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        this._currentSrc = goalData[goalNumber - 1].image;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`; 
      }//setting the source url for all or circle, set the alt text, check if goal is between 1 and 17, set the image based on the number, set the alt text based on the goal number
    }
  }

  render() {
    if (this.colorOnly) {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        const color = goalData[goalNumber - 1].color;
        return html`<div class="color-only" style="background-color: ${color};"></div>`;
      } //checking if the goal number is between 1 and 17, get the color for the gaol, and returning a div with the background color
    }

    return html`
      <img
        src="${this._currentSrc}"
        alt="${this.label || this.alt}"
        loading="lazy"
        fetchpriority="low"
      />
    `;//lazy loading the image for better performance and set low fetch priority for the image
  }
}

customElements.define('un-sdg', UnSdg); //define the custom element
