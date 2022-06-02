import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import browserUpdate from 'browser-update';
import config from './config/environment';
import './config/custom-inflector-rules';
import { registerFormFields } from '@lblod/ember-submission-form-fields';
import RdfaEditorComponent from 'frontend-loket/components/rdf-form-fields/rdfa-editor';
import RichTextComponent from 'frontend-loket/components/rdf-form-fields/rich-text';

registerFormFields([
  {
    displayType: 'http://lblod.data.gift/display-types/richText',
    edit: RichTextComponent,
  },
  {
    displayType: 'http://lblod.data.gift/display-types/rdfaEditor',
    edit: RdfaEditorComponent,
  },
]);

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

browserUpdate({
  vs: { i: 11, f: -3, o: -3, s: -3, c: -3 },
  style: 'corner',
  l: 'nl',
  shift_page_down: false,
});

loadInitializers(App, config.modulePrefix);
