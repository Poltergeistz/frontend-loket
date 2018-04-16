import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  uri: attr(),
  label: attr(),
  rdfaBindings: {
    class: "http://www.w3.org/2004/02/skos/core#Concept",
    label: "http://www.w3.org/2004/02/skos/core#prefLabel"
  }
});
