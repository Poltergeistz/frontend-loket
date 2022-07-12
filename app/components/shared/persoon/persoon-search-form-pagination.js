/* eslint-disable ember/require-computed-property-dependencies, ember/no-get, ember/require-computed-macros, ember/no-actions-hash */
import Component from '@glimmer/component';
import { computed, action, set } from '@ember/object';

export default class PersoonSearchFormPagination extends Component {
  classNames = ['data-table-pagination'];

  constructor() {
    super(...arguments);
  }

  @computed('page')
  get currentPage() {
    return this.args.page ? parseInt(this.args.page) + 1 : 1;
  }

  set currentPage(value) {
    set(this, 'args.page', value - 1);
    this.value = value;
  }

  @computed('links')
  get firstPage() {
    return this.args.links.first.number || 1;
  }

  @computed('links')
  get lastPage() {
    const max = this.args.links.last.number || -1;
    return max ? max + 1 : max;
  }

  @computed('firstPage', 'currentPage')
  get isFirstPage() {
    return this.firstPage == this.currentPage;
  }

  @computed('lastPage', 'currentPage')
  get isLastPage() {
    return this.lastPage == this.currentPage;
  }

  @computed('lastPage')
  get hasMultiplePages() {
    return this.lastPage > 0;
  }

  @computed('size', 'currentPage')
  get startItem() {
    return this.args.size * (this.currentPage - 1) + 1;
  }

  @computed('startItem', 'nbOfItems')
  get endItem() {
    return this.startItem + this.args.nbOfItems - 1;
  }

  @computed('lastPage', 'firstPage')
  get pageOptions() {
    const nbOfPages = this.lastPage - this.firstPage + 1;
    return Array.from(
      new Array(nbOfPages),
      (_val, index) => this.firstPage + index
    );
  }

  @action
  changePage(link) {
    this.args.onSelectPage(link['number'] || 0);
  }
}
