import { fixture, assert } from '@open-wc/testing';
import './test-element.js';

describe('Array to string', function() {
  async function basicFixture() {
    return (await fixture(`<test-element></test-element>`));
  }
  let element;
  beforeEach(async () => {
    element = await basicFixture();
  });

  it('Create payload string from an array', () => {
    const list = [{
      'name': 'test',
      'value': 'encoded value'
    }, {
      'name': 'encoded name',
      'value': 'encoded value'
    }];
    const compare = 'test=encoded value&encoded name=encoded value';
    const str = element.formArrayToString(list);
    assert.equal(str, compare);
  });

  it('Empty model returns empty string', () => {
    const list = [{
      'name': '',
      'value': ''
    }];
    const str = element.formArrayToString(list);
    assert.equal(str, '');
  });

  it('Should create www-urlencoded string from array', () => {
    const list = [{
      'name': 'test',
      'value': 'encoded value'
    }, {
      'name': 'encoded name',
      'value': 'encoded value'
    }];
    const compare = 'test=encoded+value&encoded+name=encoded+value';
    const str = element.formArrayToString(element.encodeUrlEncoded(list));
    assert.equal(str, compare);
  });

  it('Should create payload string from array with array value', () => {
    const list = [{
      'name': 'test',
      'value': ['encoded value', 'other value']
    }, {
      'name': 'encoded name',
      'value': 'encoded value'
    }];
    const compare = 'test=encoded value&test=other value&encoded name=encoded value';
    const str = element.formArrayToString(list);
    assert.equal(str, compare);
  });
});
