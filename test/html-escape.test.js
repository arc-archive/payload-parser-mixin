import { fixture, assert } from '@open-wc/testing';
import './test-element.js';

describe('HTML Escape', function() {
  async function basicFixture() {
    return (await fixture(`<test-element></test-element>`));
  }

  let element;
  beforeEach(async () => {
    element = await basicFixture();
  });

  it('Should escape HTML tags', () => {
    const html = '<h1>test</h1>';
    const compare = '&lt;h1&gt;test&lt;/h1&gt;';
    const escaped = element.htmlEscape(html);
    assert.equal(escaped, compare);
  });

  it('Should escape the & character', () => {
    const html = 'param=value&other=value';
    const compare = 'param=value&amp;other=value';
    const escaped = element.htmlEscape(html);
    assert.equal(escaped, compare);
  });

  it('Should escape quote character', () => {
    const html = '"this is quoted string"';
    const compare = '&quot;this is quoted string&quot;';
    const escaped = element.htmlEscape(html);
    assert.equal(escaped, compare);
  });

  it('Should escape apostrophe character', () => {
    const html = '\'this is quoted string\'';
    const compare = '&apos;this is quoted string&apos;';
    const escaped = element.htmlEscape(html);
    assert.equal(escaped, compare);
  });
});
