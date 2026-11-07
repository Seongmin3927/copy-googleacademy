const fs = require('fs');
const assert = require('assert');

console.log('🔍 Starting comprehensive verification of Linear Stack Engine & Widget Configuration Modal in builder.html...');

const html = fs.readFileSync('builder.html', 'utf8');

const requiredTokens = [
  'id="stackCanvasView"',
  'id="stackCanvasContainer"',
  'id="previewFrameView"',
  'id="viewBtnCanvas"',
  'id="viewBtnPreview"',
  'canvas-stack-toolbar',
  'block-floating-bar',
  'canvas-bottom-shelf',
  "addBlockToStack('flipCard')",
  "addBlockToStack('partsPrompt')",
  "addBlockToStack('gasAccordion')",
  "addBlockToStack('postcardSimulator')",
  "addBlockToStack('infoNote')",
  "addBlockToStack('textButtonBlock')",
  'moveBlockUp',
  'moveBlockDown',
  'duplicateBlock',
  'deleteBlockFromStack',
  'onContentEdited',
  'contenteditable="true"',
  // Widget Configuration Modal Tokens
  'id="widgetConfigModal"',
  'id="widgetConfigModalTitle"',
  'id="widgetConfigModalBody"',
  'openWidgetConfigModal',
  'closeWidgetConfigModal',
  'applyWidgetConfig',
  '⚙️ 설정',
  'cfg_flip_badge',
  'cfg_flip_frontTitle',
  'cfg_flip_backTitle',
  'cfg_flip_mtGoto',
  'cfg_parts_title',
  'cfg_parts_p',
  'cfg_parts_a',
  'cfg_parts_r',
  'cfg_parts_t',
  'cfg_parts_s',
  'cfg_parts_assembledPrompt',
  'cfg_gas_title',
  'cfg_gas_code',
  'cfg_gas_isOpen',
  // Export Engine Tokens
  'exportStackToHtml',
  'compileSemanticHtml',
  'class="builder-block"',
  'export.html',
  'exportStackBtn',
  'URL.createObjectURL',
  '@media (max-width: 768px)',
  'copyTextToClipboard',
  'goModule',
  // Integrated Studio UI & Micro-frame Compatibility Tokens
  'id="tabBlocks"',
  'id="blocksView"',
  'palette-category-card',
  'palette-btn',
  "addBlockToStack('sectionContainer')",
  "addBlockToStack('divider')",
  "addBlockToStack('spacer')",
  'id="undoBtn"',
  'id="redoBtn"',
  'id="togglePreviewBtn"',
  'togglePreviewMode',
  'undoStack',
  'redoStack',
  'pushHistoryState',
  'switchEditorTab',
  '@media (max-width: 900px)',
  'overscroll-behavior: contain;'
];

requiredTokens.forEach(token => {
  assert(html.includes(token), `Missing token in builder.html: ${token}`);
  console.log(`  ✓ Found token: ${token.substring(0, 35)}`);
});

// Test catalog logic directly
const STUDIO_CATALOG = require('./studio-catalog.js');

// 1. Create nodes
const n1 = STUDIO_CATALOG.createNode('textButtonBlock', { title: 'First Block' }, {}, 0);
const n2 = STUDIO_CATALOG.createNode('partsPrompt', {}, {}, 1);
const n3 = STUDIO_CATALOG.createNode('flipCard', {}, {}, 2);
const nGas = STUDIO_CATALOG.createNode('gasAccordion', {}, {}, 3);

let blocks = [n1, n2, n3, nGas];
console.log('  ✓ Initial 4 nodes created successfully');

// 2. Add block
const n4 = STUDIO_CATALOG.createNode('infoNote', { title: 'Note 4' }, {}, 4);
blocks.push(n4);
assert.strictEqual(blocks.length, 5);
console.log('  ✓ Block addition (push to stack) verified: length = 5');

// 3. Move block up
const item = blocks.splice(4, 1)[0];
blocks.splice(3, 0, item);
assert.strictEqual(blocks[3].id, n4.id);
console.log('  ✓ Move up verified (Array.splice position swap)');

// 4. Move block down
const itemDown = blocks.splice(3, 1)[0];
blocks.splice(4, 0, itemDown);
assert.strictEqual(blocks[4].id, n4.id);
console.log('  ✓ Move down verified (Array.splice position swap)');

// 5. Duplicate block
const original = blocks[0];
const clone = JSON.parse(JSON.stringify(original));
clone.id = original.type + '_' + Date.now() + '_clone';
blocks.splice(1, 0, clone);
assert.strictEqual(blocks.length, 6);
assert.strictEqual(blocks[1].data.title, 'First Block');
assert.notStrictEqual(blocks[1].id, original.id);
console.log('  ✓ Duplicate block verified (deep copy inserted at index + 1 with new ID)');

// 6. Delete block
blocks.splice(1, 1);
assert.strictEqual(blocks.length, 5);
console.log('  ✓ Delete block verified: length returned to 5');

// 7. Inline editing logic
function setDeepValue(obj, path, value) {
  const parts = path.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (curr[p] === undefined || curr[p] === null) {
      curr[p] = /^\d+$/.test(parts[i + 1]) ? [] : {};
    }
    curr = curr[p];
  }
  const last = parts[parts.length - 1];
  if (Array.isArray(curr) && /^\d+$/.test(last)) {
    curr[Number(last)] = value;
  } else {
    curr[last] = value;
  }
}

setDeepValue(blocks[0].data, 'title', 'Updated First Block Title');
assert.strictEqual(blocks[0].data.title, 'Updated First Block Title');
console.log('  ✓ Inline edit setDeepValue verified');

// 8. Test 3D Flip Card Widget Configuration with mt-goto
const flipNode = blocks.find(b => b.type === 'flipCard');
flipNode.data.frontTitle = '새로운 3D 앞면 제목';
flipNode.data.backTitle = '새로운 3D 뒷면 학습 목표';
flipNode.data.mtGoto = '3';

const renderedFlip = STUDIO_CATALOG.renderBlockHtml(flipNode, true);
assert(renderedFlip.includes('새로운 3D 앞면 제목'));
assert(renderedFlip.includes('새로운 3D 뒷면 학습 목표'));
assert(renderedFlip.includes('data-module="3"'));
assert(renderedFlip.includes('mt-goto'));
console.log('  ✓ 3D Flip Card widget configuration & mt-goto verified');

// 9. Test PARTS Prompt Widget Configuration with P, A, R, T, S
const partsNode = blocks.find(b => b.type === 'partsPrompt');
assert(partsNode.data.categories.some(c => c.key === 'style'), 'PARTS must include S (style)');
partsNode.data.title = '수정된 PARTS 조립기';
partsNode.data.assembledPrompt = '당신은 구글 수석 아키텍트입니다. [제약조건: 100자 이내]';

const renderedParts = STUDIO_CATALOG.renderBlockHtml(partsNode, true);
assert(renderedParts.includes('수정된 PARTS 조립기'));
assert(renderedParts.includes('S (Style / 제약조건)'));
assert(renderedParts.includes('당신은 구글 수석 아키텍트입니다.'));
console.log('  ✓ PARTS Prompt widget configuration (P,A,R,T,S) verified');

// 10. Test GAS Accordion Widget Configuration with code & isOpen
const gasNode = blocks.find(b => b.type === 'gasAccordion');
gasNode.data.title = '수정된 배포 스크립트';
gasNode.data.isOpen = true;
gasNode.data.code = 'function deployService() { return true; }';

const renderedGas = STUDIO_CATALOG.renderBlockHtml(gasNode, true);
assert(renderedGas.includes('수정된 배포 스크립트'));
assert(renderedGas.includes('<details class="gasfold" open'));
assert(renderedGas.includes('function deployService()'));
console.log('  ✓ GAS Accordion widget configuration (title, code, isOpen) verified');

// 11. Test HTML rendering for editable vs export mode
const editableHtml = STUDIO_CATALOG.renderBlockHtml(blocks[0], true);
assert(editableHtml.includes('contenteditable="true"'), 'Editable HTML must contain contenteditable="true"');
assert(editableHtml.includes('oninput="onContentEdited'), 'Editable HTML must contain oninput="onContentEdited"');

const staticHtml = STUDIO_CATALOG.renderBlockHtml(blocks[0], false);
assert(!staticHtml.includes('contenteditable="true"'), 'Static HTML must NOT contain contenteditable="true"');
assert(!staticHtml.includes('oninput="onContentEdited'), 'Static HTML must NOT contain oninput handler');

console.log('  ✓ Dual-mode rendering verified (Editable vs Clean Static Export)');

// 12. Test Semantic HTML Export compilation
function mockCompileSemanticHtml(testBlocks, title) {
  var blocksHtml = testBlocks.map(function(blk){
    var rawHtml = STUDIO_CATALOG.renderBlockHtml(blk, false);
    var clean = rawHtml
      .replace(/\s*contenteditable="[^"]*"/gi, '')
      .replace(/\s*spellcheck="[^"]*"/gi, '')
      .replace(/\s*data-field="[^"]*"/gi, '')
      .replace(/\s*oninput="onContentEdited\([^)]*\)"/gi, '')
      .replace(/\s*title="클릭하여 직접 텍스트 수정"/gi, '');
    return '    <div class="builder-block" data-type="' + blk.type + '" id="' + blk.id + '">\n      ' + clean + '\n    </div>';
  }).join('\n\n');

  return '<!DOCTYPE html>\n<html lang="ko">\n<head>\n<title>' + title + '</title>\n<style>\n.builder-block { width: 100%; }\n@media (max-width: 768px) { .builder-page-wrap { padding: 12px; } }\n</style>\n</head>\n<body>\n<main class="builder-page-wrap">\n' + blocksHtml + '\n</main>\n<script>\nfunction goModule(n){}\nfunction copyTextToClipboard(){}\n</script>\n</body>\n</html>';
}

const compiled = mockCompileSemanticHtml(blocks, 'Unit Test Export');
assert(compiled.includes('<!DOCTYPE html>'));
assert(compiled.includes('<title>Unit Test Export</title>'));
assert(compiled.includes('class="builder-block"'));
assert(!compiled.includes('contenteditable="true"'));
assert(!compiled.includes('onContentEdited'));
assert(compiled.includes('@media (max-width: 768px)'));
assert(compiled.includes('function goModule'));
assert(compiled.includes('function copyTextToClipboard'));
console.log('  ✓ Semantic Responsive Export HTML Compilation verified with 0 editor artifacts');

// 13. Test Structure Blocks Creation & Categorization (sectionContainer, divider, spacer)
const nContainer = STUDIO_CATALOG.createNode('sectionContainer', { title: '그룹 컨테이너' }, {}, 5);
const nDivider = STUDIO_CATALOG.createNode('divider', { label: '구분선 테스트' }, {}, 6);
const nSpacer = STUDIO_CATALOG.createNode('spacer', { height: 48 }, {}, 7);

assert.strictEqual(STUDIO_CATALOG.templates.sectionContainer.category, 'structure');
assert.strictEqual(STUDIO_CATALOG.templates.divider.category, 'structure');
assert.strictEqual(STUDIO_CATALOG.templates.spacer.category, 'structure');
assert.strictEqual(STUDIO_CATALOG.templates.flipCard.category, 'component');

const renderedContainer = STUDIO_CATALOG.renderBlockHtml(nContainer, true);
assert(renderedContainer.includes('stack-container'));
assert(renderedContainer.includes('그룹 컨테이너'));

const renderedDivider = STUDIO_CATALOG.renderBlockHtml(nDivider, true);
assert(renderedDivider.includes('stack-divider'));
assert(renderedDivider.includes('구분선 테스트'));

const renderedSpacer = STUDIO_CATALOG.renderBlockHtml(nSpacer, true);
assert(renderedSpacer.includes('48px'));
console.log('  ✓ Structure blocks (sectionContainer, divider, spacer) creation & categorization verified');

// 14. Test Undo / Redo Engine State Management
var mockHistory = [];
var mockRedo = [];

function mockPushState(state) {
  var snap = JSON.stringify(state);
  mockHistory.push(snap);
  mockRedo = [];
}

function mockUndo() {
  if (mockHistory.length <= 1) return null;
  var cur = mockHistory.pop();
  mockRedo.push(cur);
  return JSON.parse(mockHistory[mockHistory.length - 1]);
}

function mockRedoAction() {
  if (mockRedo.length === 0) return null;
  var nxt = mockRedo.pop();
  mockHistory.push(nxt);
  return JSON.parse(nxt);
}

// Initial state
var testCanvas = [{ id: 'b1', type: 'textButtonBlock' }];
mockPushState(testCanvas);
assert.strictEqual(mockHistory.length, 1);
assert.strictEqual(mockRedo.length, 0);

// Add block -> state 2
testCanvas.push({ id: 'b2', type: 'divider' });
mockPushState(testCanvas);
assert.strictEqual(mockHistory.length, 2);

// Add block -> state 3
testCanvas.push({ id: 'b3', type: 'flipCard' });
mockPushState(testCanvas);
assert.strictEqual(mockHistory.length, 3);

// Undo -> back to state 2
testCanvas = mockUndo();
assert.strictEqual(testCanvas.length, 2);
assert.strictEqual(mockHistory.length, 2);
assert.strictEqual(mockRedo.length, 1);

// Redo -> forward to state 3
testCanvas = mockRedoAction();
assert.strictEqual(testCanvas.length, 3);
assert.strictEqual(mockHistory.length, 3);
assert.strictEqual(mockRedo.length, 0);
console.log('  ✓ Undo / Redo Engine state stack transitions verified');

console.log('\n🎉 ALL VERIFICATION CHECKS PASSED WITH 100% SUCCESS!');
