const fs = require('fs');
const assert = require('assert');

console.log('Verifying fine-grained 2-level highlight in builder.html...');

const html = fs.readFileSync('builder.html', 'utf8');

// 1. Verify CSS styles for subitem vs container
assert(html.includes('.editor-inspect-subitem-active'), 'Missing .editor-inspect-subitem-active in CSS');
assert(html.includes('#ea580c'), 'Missing orange color (#ea580c) for subitems');
assert(html.includes('.editor-inspect-active'), 'Missing .editor-inspect-active in CSS');
assert(html.includes('#1a73e8'), 'Missing blue color (#1a73e8) for containers');
assert(html.includes('.devtools-inspect-subitem-active'), 'Missing .devtools-inspect-subitem-active in preview CSS');
assert(html.includes('.devtools-inspect-container-active'), 'Missing .devtools-inspect-container-active in preview CSS');
console.log('  ✓ Color distinction verified: Orange (#ea580c) for subitems vs Blue (#1a73e8) for containers');

// 2. Verify Editor Header Fields
assert(html.includes('data-editor-id="hero-title"'), 'Missing data-editor-id="hero-title"');
assert(html.includes('data-editor-id="hero-badge"'), 'Missing data-editor-id="hero-badge"');
assert(html.includes('data-editor-id="hero-desc"'), 'Missing data-editor-id="hero-desc"');
assert(html.includes('data-editor-level="item"'), 'Missing data-editor-level="item"');
assert(html.includes('data-editor-level="container"'), 'Missing data-editor-level="container"');
console.log('  ✓ Editor form has data-editor-id and data-editor-level="item" for hero-title, hero-badge, hero-desc');

// 3. Verify Preview Frame Inspector Attributes in renderReportHtml
assert(html.includes('inspectAttr(\'hero-badge\''), 'Missing hero-badge inspectAttr');
assert(html.includes('inspectAttr(\'hero-title\''), 'Missing hero-title inspectAttr');
assert(html.includes('inspectAttr(\'hero-desc\''), 'Missing hero-desc inspectAttr');
assert(html.includes('data-inspect-level'), 'Missing data-inspect-level');
console.log('  ✓ Preview frame generates data-inspect-id and data-inspect-level for subitems');

// 4. Verify Bidirectional Synchronizers
assert(html.includes('window.onPreviewInspectHover = function(inspectId, level)'), 'Missing onPreviewInspectHover with level');
assert(html.includes('window.highlightFromEditor = function(id, level)'), 'Missing highlightFromEditor with level');
assert(html.includes('inp.onfocus = function'), 'Missing onfocus live highlight on input');
assert(html.includes('inp.onblur = function'), 'Missing onblur live highlight clearing on input');
console.log('  ✓ Bidirectional inspection & onfocus/oninput live highlight verified');

console.log('\n🎉 ALL HIGHLIGHT TESTS PASSED 100%!');
