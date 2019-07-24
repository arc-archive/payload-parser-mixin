import { fixture, assert } from '@open-wc/testing';
import './test-element.js';

describe('payload-parser-mixin', function() {
  async function basicFixture() {
    return (await fixture(`<test-element></test-element>`));
  }

  describe('_modelItemToFormDataString()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns undefined when no schema', () => {
      const result = element._modelItemToFormDataString({});
      assert.isUndefined(result);
    });

    it('Returns undefined when item is not enabled', () => {
      const result = element._modelItemToFormDataString({
        schema: {
          enabled: false
        }
      });
      assert.isUndefined(result);
    });

    it('Returns undefined when no name and value', () => {
      const result = element._modelItemToFormDataString({
        schema: {},
        name: '',
        value: ''
      });
      assert.isUndefined(result);
    });

    it('Returns undefined when no value value and no required', () => {
      const result = element._modelItemToFormDataString({
        schema: {},
        name: 'test',
        value: '',
        required: false
      });
      assert.isUndefined(result);
    });

    it('Returns string', () => {
      const result = element._modelItemToFormDataString({
        schema: {},
        name: 'test',
        value: 'value'
      });
      assert.typeOf(result, 'string');
    });

    it('Value is always a string', () => {
      const result = element._modelItemToFormDataString({
        schema: {},
        name: 'test',
        value: true
      });
      assert.equal(result, 'test=true');
    });

    it('Processes array values', () => {
      const result = element._modelItemToFormDataString({
        schema: {},
        name: 'test',
        value: ['a', 'b']
      });
      assert.equal(result, 'test=a&test=b');
    });
  });

  describe('stringToArray()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Parses www-urlencoded string to encoded array', () => {
      const list = [{
        'name': 'test',
        'value': 'encoded+value'
      }, {
        'name': 'encoded+name',
        'value': 'encoded+value'
      }];
      const str = 'test=encoded+value&encoded+name=encoded+value';
      const compare = element.stringToArray(str);
      assert.deepEqual(list, compare);
    });

    it('Should create array values', () => {
      const list = [{
        'name': 'test',
        'value': ['encoded+value', 'other+value']
      }, {
        'name': 'encoded+name',
        'value': 'encoded+value'
      }];
      const str = 'test=encoded+value&encoded+name=encoded+value&test=other+value';
      const compare = element.stringToArray(str);
      assert.deepEqual(list, compare);
    });

    it('Returns empty array when argument is not a string', () => {
      const arg = new Blob(['test']);
      const result = element.stringToArray(arg);
      assert.typeOf(result, 'array');
      assert.lengthOf(result, 0);
    });

    it('Returns empty array when empty string', () => {
      const result = element.stringToArray('');
      assert.typeOf(result, 'array');
      assert.lengthOf(result, 0);
    });

    it('Returns empty array when whitespace only string', () => {
      const result = element.stringToArray('   ');
      assert.typeOf(result, 'array');
      assert.lengthOf(result, 0);
    });
  });

  describe('_paramLineToFormObject()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns undefined when no input', () => {
      const result = element._paramLineToFormObject();
      assert.isUndefined(result);
    });

    it('Returns undefined when no valid input', () => {
      const result = element._paramLineToFormObject('');
      assert.isUndefined(result);
    });

    it('Sets default empty value', () => {
      const result = element._paramLineToFormObject('test');
      assert.deepEqual(result, {
        name: 'test',
        value: ''
      });
    });

    it('Sets name and value', () => {
      const result = element._paramLineToFormObject('test=test-value');
      assert.deepEqual(result, {
        name: 'test',
        value: 'test-value'
      });
    });
  });
});
