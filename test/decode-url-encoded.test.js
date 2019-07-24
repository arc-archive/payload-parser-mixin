import { fixture, assert } from '@open-wc/testing';
import './test-element.js';

describe('URL decoder', function() {
  async function basicFixture() {
    return (await fixture(`<test-element></test-element>`));
  }

  let element;
  beforeEach(async () => {
    element = await basicFixture();
  });

  it('Decode encoded string', () => {
    const compare = 'test=encoded value&encoded name=encoded value';
    const src = 'test=encoded+value&encoded+name=encoded+value';
    const result = element.decodeUrlEncoded(src);
    assert.equal(result, compare);
  });

  it('Decode encoded string with repeatable parameters', () => {
    const compare = 'test=encoded value&test=other value&encoded name=encoded value';
    const src = 'test=encoded+value&encoded+name=encoded+value&test=other+value';
    const result = element.decodeUrlEncoded(src);
    assert.equal(result, compare);
  });

  it('Decodes encoded array', () => {
    const compare = [{
      'name': 'test',
      'value': 'encoded value'
    }, {
      'name': 'encoded name',
      'value': 'encoded value'
    }];
    const input = [{
      'name': 'test',
      'value': 'encoded+value'
    }, {
      'name': 'encoded+name',
      'value': 'encoded+value'
    }];
    const result = element.decodeUrlEncoded(input);
    assert.deepEqual(result, compare);
  });

  it('Decodes encoded array with array value', () => {
    const compare = [{
      'name': 'test',
      'value': 'encoded value'
    }, {
      'name': 'encoded name',
      'value': ['encoded value', 'other value']
    }];
    const src = [{
      'name': 'test',
      'value': 'encoded+value'
    }, {
      'name': 'encoded+name',
      'value': ['encoded+value', 'other+value']
    }];
    const str = element.decodeUrlEncoded(src);
    assert.deepEqual(str, compare);
  });
});
