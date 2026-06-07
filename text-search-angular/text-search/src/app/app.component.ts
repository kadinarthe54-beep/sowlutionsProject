import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const ARTICLES = [
  { title: 'Understanding CSS Grid', date: 'Oct 09, 2018', content: 'CSS Grid Layout is a powerful tool for creating two-dimensional layouts on the web. It allows you to define rows and columns and place items precisely within a grid container.' },
  { title: 'Getting Started with Flexbox', date: 'Sep 15, 2018', content: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns. It makes it easy to align and distribute space among items in a container.' },
  { title: 'JavaScript Promises Explained', date: 'Aug 20, 2018', content: 'Promises are used to handle asynchronous operations in JavaScript. They represent a value that may be available now, in the future, or never.' },
  { title: 'How the Fetch API Works', date: 'Jul 10, 2018', content: 'The Fetch API provides a modern way to make HTTP requests in JavaScript. It is a cleaner alternative to XMLHttpRequest and returns Promises.' },
  { title: 'A Guide to CSS Variables', date: 'Jun 05, 2018', content: 'CSS custom properties, also known as CSS variables, let you store values in one place and reuse them throughout your stylesheet. They make theming much easier.' },
  { title: 'Responsive Design with Media Queries', date: 'May 22, 2018', content: 'Media queries allow you to apply CSS styles based on screen size or device type. They are the foundation of responsive web design.' },
  { title: 'Understanding the CSS Box Model', date: 'Apr 18, 2018', content: 'Every HTML element is a rectangular box. The CSS box model describes the content, padding, border, and margin that make up that box.' },
  { title: 'Introduction to TypeScript', date: 'Mar 30, 2018', content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and class-based object-oriented programming.' },
  { title: 'Working with Arrays in JavaScript', date: 'Feb 14, 2018', content: 'JavaScript arrays are used to store multiple values in a single variable. They come with many built-in methods like map, filter, and reduce.' },
  { title: 'CSS Animations and Transitions', date: 'Jan 08, 2018', content: 'CSS transitions allow you to change property values smoothly over a given duration. CSS animations let you create keyframe-based animations without JavaScript.' },
  { title: 'Recreating the GitHub Contribution Graph with CSS Grid', date: 'Dec 20, 2017', content: 'The GitHub contribution graph shows a year of contributions in a grid format. In this article we recreate it using CSS Grid Layout and a bit of JavaScript.' },
  { title: 'How JavaScript Closures Work', date: 'Nov 10, 2017', content: 'A closure is a function that has access to its outer function scope even after the outer function has returned. Closures are a fundamental concept in JavaScript.' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  query = '';
  results: any[] = [];
  searched = false;

  constructor(private sanitizer: DomSanitizer) {}

  onSearch() {
    var q = this.query.trim().toLowerCase();

    if (q == '') {
      this.results = [];
      this.searched = false;
      return;
    }

    this.searched = true;
    this.results = ARTICLES.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q)
    );
  }

  highlight(text: string): SafeHtml {
    var q = this.query.trim();
    if (!q) return text;
    var result = text.split(new RegExp(`(${q})`, 'gi'))
      .map(part => part.toLowerCase() === q.toLowerCase() ? `<mark>${part}</mark>` : part)
      .join('');
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

  clear() {
    this.query = '';
    this.results = [];
    this.searched = false;
  }

}
