import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {PayloadParserMixin} from '../payload-parser-mixin.js';

class TestElement extends PayloadParserMixin(PolymerElement) {}
window.customElements.define('test-element', TestElement);
