import { fixture, assert } from '@open-wc/testing';
import './test-element.js';

describe('URL encoder', function() {
  async function basicFixture() {
    return (await fixture(`<test-element></test-element>`));
  }

  let element;
  beforeEach(async () => {
    element = await basicFixture();
  });

  it('Encodes string', () => {
    const src = 'test=encoded value&encoded name=encoded value';
    const compare = 'test=encoded+value&encoded+name=encoded+value';
    const result = element.encodeUrlEncoded(src);
    assert.equal(result, compare);
  });

  it('Encodes string with repeatable parameters', () => {
    const src = 'test=encoded value&test=other value&encoded name=encoded value';
    const compare = 'test=encoded+value&test=other+value&encoded+name=encoded+value';
    const result = element.encodeUrlEncoded(src);
    assert.equal(result, compare);
  });

  it('Encodes array', () => {
    const src = [{
      'name': 'test',
      'value': 'encoded value'
    }, {
      'name': 'encoded name',
      'value': 'encoded value'
    }];
    const compare = [{
      'name': 'test',
      'value': 'encoded+value'
    }, {
      'name': 'encoded+name',
      'value': 'encoded+value'
    }];
    const str = element.encodeUrlEncoded(src);
    assert.deepEqual(str, compare);
  });

  it('Encodes array with array value', () => {
    const src = [{
      'name': 'test',
      'value': ['encoded value', 'other value']
    }, {
      'name': 'encoded name',
      'value': 'encoded value'
    }];
    const compare = [{
      'name': 'test',
      'value': ['encoded+value', 'other+value']
    }, {
      'name': 'encoded+name',
      'value': 'encoded+value'
    }];
    const result = element.encodeUrlEncoded(src);
    assert.deepEqual(result, compare);
  });

  it('Should encode query string', () => {
    const query = '/test path/?param name=param value';
    const encoded = element.encodeQueryString(query);
    // path will be encoded, this function encodes query params only.
    const compare = '%2Ftest+path%2F%3Fparam+name%3Dparam+value';
    assert.equal(encoded, compare);
  });
});
