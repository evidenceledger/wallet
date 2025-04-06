// front/node_modules/uhtml/esm/utils.js
var { isArray } = Array;
var { getPrototypeOf, getOwnPropertyDescriptor } = Object;
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var empty = [];
var newRange = () => document.createRange();
var set = (map, key, value) => {
  map.set(key, value);
  return value;
};
var gPD = (ref2, prop) => {
  let desc;
  do {
    desc = getOwnPropertyDescriptor(ref2, prop);
  } while (!desc && (ref2 = getPrototypeOf(ref2)));
  return desc;
};
var find = (content, path) => path.reduceRight(childNodesIndex, content);
var childNodesIndex = (node, i) => node.childNodes[i];

// front/node_modules/uhtml/esm/literals.js
var abc = (a, b, c) => ({ a, b, c });
var bc = (b, c) => ({ b, c });
var detail = (u, t, n, c) => ({ v: empty, u, t, n, c });
var cache = () => abc(null, null, empty);

// front/node_modules/uhtml/esm/render/hole.js
var known = /* @__PURE__ */ new WeakMap();
var hole_default = (where, what) => {
  const info = known.get(where) || set(known, where, cache());
  const { b } = info;
  if (b !== (typeof what === "function" ? what() : what).toDOM(info))
    where.replaceChildren(info.b.valueOf());
  return where;
};

// front/node_modules/udomdiff/esm/index.js
var esm_default = (parentNode, a, b, get, before) => {
  const bLength = b.length;
  let aEnd = a.length;
  let bEnd = bLength;
  let aStart = 0;
  let bStart = 0;
  let map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd], 0) : before;
      while (bStart < bEnd)
        parentNode.insertBefore(get(b[bStart++], 1), node);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a[aStart]))
          parentNode.removeChild(get(a[aStart], -1));
        aStart++;
      }
    } else if (a[aStart] === b[bStart]) {
      aStart++;
      bStart++;
    } else if (a[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
      const node = get(a[--aEnd], -0).nextSibling;
      parentNode.insertBefore(
        get(b[bStart++], 1),
        get(a[aStart++], -0).nextSibling
      );
      parentNode.insertBefore(get(b[--bEnd], 1), node);
      a[aEnd] = b[bEnd];
    } else {
      if (!map) {
        map = /* @__PURE__ */ new Map();
        let i = bStart;
        while (i < bEnd)
          map.set(b[i], i++);
      }
      if (map.has(a[aStart])) {
        const index = map.get(a[aStart]);
        if (bStart < index && index < bEnd) {
          let i = aStart;
          let sequence = 1;
          while (++i < aEnd && i < bEnd && map.get(a[i]) === index + sequence)
            sequence++;
          if (sequence > index - bStart) {
            const node = get(a[aStart], 0);
            while (bStart < index)
              parentNode.insertBefore(get(b[bStart++], 1), node);
          } else {
            parentNode.replaceChild(
              get(b[bStart++], 1),
              get(a[aStart++], -1)
            );
          }
        } else
          aStart++;
      } else
        parentNode.removeChild(get(a[aStart++], -1));
    }
  }
  return b;
};

// front/node_modules/domconstants/esm/constants.js
var ELEMENT_NODE = 1;
var COMMENT_NODE = 8;
var DOCUMENT_FRAGMENT_NODE = 11;

// front/node_modules/custom-function/esm/factory.js
var { setPrototypeOf } = Object;
var factory_default = (Class) => {
  function Custom(target) {
    return setPrototypeOf(target, new.target.prototype);
  }
  Custom.prototype = Class.prototype;
  return Custom;
};

// front/node_modules/uhtml/esm/range.js
var range;
var range_default = (firstChild, lastChild, preserve) => {
  if (!range) range = newRange();
  if (preserve)
    range.setStartAfter(firstChild);
  else
    range.setStartBefore(firstChild);
  range.setEndAfter(lastChild);
  range.deleteContents();
  return firstChild;
};

// front/node_modules/uhtml/esm/persistent-fragment.js
var remove = ({ firstChild, lastChild }, preserve) => range_default(firstChild, lastChild, preserve);
var checkType = false;
var diffFragment = (node, operation) => checkType && node.nodeType === DOCUMENT_FRAGMENT_NODE ? 1 / operation < 0 ? operation ? remove(node, true) : node.lastChild : operation ? node.valueOf() : node.firstChild : node;
var comment = (value) => document.createComment(value);
var PersistentFragment = class extends factory_default(DocumentFragment) {
  #firstChild = comment("<>");
  #lastChild = comment("</>");
  #nodes = empty;
  constructor(fragment) {
    super(fragment);
    this.replaceChildren(...[
      this.#firstChild,
      ...fragment.childNodes,
      this.#lastChild
    ]);
    checkType = true;
  }
  get firstChild() {
    return this.#firstChild;
  }
  get lastChild() {
    return this.#lastChild;
  }
  get parentNode() {
    return this.#firstChild.parentNode;
  }
  remove() {
    remove(this, false);
  }
  replaceWith(node) {
    remove(this, true).replaceWith(node);
  }
  valueOf() {
    const { parentNode } = this;
    if (parentNode === this) {
      if (this.#nodes === empty)
        this.#nodes = [...this.childNodes];
    } else {
      if (parentNode) {
        let { firstChild, lastChild } = this;
        this.#nodes = [firstChild];
        while (firstChild !== lastChild)
          this.#nodes.push(firstChild = firstChild.nextSibling);
      }
      this.replaceChildren(...this.#nodes);
    }
    return this;
  }
};

// front/node_modules/uhtml/esm/handler.js
var setAttribute = (element, name, value) => element.setAttribute(name, value);
var removeAttribute = (element, name) => element.removeAttribute(name);
var aria = (element, value) => {
  for (const key in value) {
    const $ = value[key];
    const name = key === "role" ? key : `aria-${key}`;
    if ($ == null) removeAttribute(element, name);
    else setAttribute(element, name, $);
  }
  return value;
};
var listeners;
var at = (element, value, name) => {
  name = name.slice(1);
  if (!listeners) listeners = /* @__PURE__ */ new WeakMap();
  const known2 = listeners.get(element) || set(listeners, element, {});
  let current = known2[name];
  if (current && current[0]) element.removeEventListener(name, ...current);
  current = isArray(value) ? value : [value, false];
  known2[name] = current;
  if (current[0]) element.addEventListener(name, ...current);
  return value;
};
var hole = (detail2, value) => {
  const { t: node, n: hole2 } = detail2;
  let nullish = false;
  switch (typeof value) {
    case "object":
      if (value !== null) {
        (hole2 || node).replaceWith(detail2.n = value.valueOf());
        break;
      }
    case "undefined":
      nullish = true;
    default:
      node.data = nullish ? "" : value;
      if (hole2) {
        detail2.n = null;
        hole2.replaceWith(node);
      }
      break;
  }
  return value;
};
var className = (element, value) => maybeDirect(
  element,
  value,
  value == null ? "class" : "className"
);
var data = (element, value) => {
  const { dataset } = element;
  for (const key in value) {
    if (value[key] == null) delete dataset[key];
    else dataset[key] = value[key];
  }
  return value;
};
var direct = (ref2, value, name) => ref2[name] = value;
var dot = (element, value, name) => direct(element, value, name.slice(1));
var maybeDirect = (element, value, name) => value == null ? (removeAttribute(element, name), value) : direct(element, value, name);
var ref = (element, value) => (typeof value === "function" ? value(element) : value.current = element, value);
var regular = (element, value, name) => (value == null ? removeAttribute(element, name) : setAttribute(element, name, value), value);
var style = (element, value) => value == null ? maybeDirect(element, value, "style") : direct(element.style, value, "cssText");
var toggle = (element, value, name) => (element.toggleAttribute(name.slice(1), value), value);
var array = (node, value, prev) => {
  const { length } = value;
  node.data = `[${length}]`;
  if (length)
    return esm_default(node.parentNode, prev, value, diffFragment, node);
  switch (prev.length) {
    case 1:
      prev[0].remove();
    case 0:
      break;
    default:
      range_default(
        diffFragment(prev[0], 0),
        diffFragment(prev.at(-1), -0),
        false
      );
      break;
  }
  return empty;
};
var attr = /* @__PURE__ */ new Map([
  ["aria", aria],
  ["class", className],
  ["data", data],
  ["ref", ref],
  ["style", style]
]);
var attribute = (element, name, svg3) => {
  switch (name[0]) {
    case ".":
      return dot;
    case "?":
      return toggle;
    case "@":
      return at;
    default:
      return svg3 || "ownerSVGElement" in element ? name === "ref" ? ref : regular : attr.get(name) || (name in element ? name.startsWith("on") ? direct : gPD(element, name)?.set ? maybeDirect : regular : regular);
  }
};
var text = (element, value) => (element.textContent = value == null ? "" : value, value);

// front/node_modules/uhtml/esm/creator.js
var creator_default = (parse) => (
  /**
   * @param {TemplateStringsArray} template
   * @param {any[]} values
   * @returns {import("./literals.js").Cache}
   */
  (template2, values) => {
    const { a: fragment, b: entries, c: direct2 } = parse(template2, values);
    const root = document.importNode(fragment, true);
    let details = empty;
    if (entries !== empty) {
      details = [];
      for (let current, prev, i = 0; i < entries.length; i++) {
        const { a: path, b: update, c: name } = entries[i];
        const node = path === prev ? current : current = find(root, prev = path);
        details[i] = detail(
          update,
          node,
          name,
          update === array ? [] : update === hole ? cache() : null
        );
      }
    }
    return bc(
      direct2 ? root.firstChild : new PersistentFragment(root),
      details
    );
  }
);

// front/node_modules/domconstants/esm/re.js
var TEXT_ELEMENTS = /^(?:plaintext|script|style|textarea|title|xmp)$/i;
var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

// front/node_modules/@webreflection/uparser/esm/index.js
var elements = /<([a-zA-Z0-9]+[a-zA-Z0-9:._-]*)([^>]*?)(\/?)>/g;
var attributes = /([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g;
var holes = /[\x01\x02]/g;
var esm_default2 = (template2, prefix2, xml) => {
  let i = 0;
  return template2.join("").trim().replace(
    elements,
    (_, name, attrs, selfClosing) => `<${name}${attrs.replace(attributes, "=$2$1").trimEnd()}${selfClosing ? xml || VOID_ELEMENTS.test(name) ? " /" : `></${name}` : ""}>`
  ).replace(
    holes,
    (hole2) => hole2 === "" ? `<!--${prefix2 + i++}-->` : prefix2 + i++
  );
};

// front/node_modules/uhtml/esm/create-content.js
var template = document.createElement("template");
var svg;
var range2;
var create_content_default = (text2, xml) => {
  if (xml) {
    if (!svg) {
      svg = document.createElementNS(SVG_NAMESPACE, "svg");
      range2 = newRange();
      range2.selectNodeContents(svg);
    }
    return range2.createContextualFragment(text2);
  }
  template.innerHTML = text2;
  const { content } = template;
  template = template.cloneNode(false);
  return content;
};

// front/node_modules/uhtml/esm/parser.js
var createPath = (node) => {
  const path = [];
  let parentNode;
  while (parentNode = node.parentNode) {
    path.push(path.indexOf.call(parentNode.childNodes, node));
    node = parentNode;
  }
  return path;
};
var textNode = () => document.createTextNode("");
var resolve = (template2, values, xml) => {
  const content = create_content_default(esm_default2(template2, prefix, xml), xml);
  const { length } = template2;
  let entries = empty;
  if (length > 1) {
    const replace = [];
    const tw = document.createTreeWalker(content, 1 | 128);
    let i = 0, search = `${prefix}${i++}`;
    entries = [];
    while (i < length) {
      const node = tw.nextNode();
      if (node.nodeType === COMMENT_NODE) {
        if (node.data === search) {
          const update = isArray(values[i - 1]) ? array : hole;
          if (update === hole) replace.push(node);
          entries.push(abc(createPath(node), update, null));
          search = `${prefix}${i++}`;
        }
      } else {
        let path;
        while (node.hasAttribute(search)) {
          if (!path) path = createPath(node);
          const name = node.getAttribute(search);
          entries.push(abc(path, attribute(node, name, xml), name));
          removeAttribute(node, search);
          search = `${prefix}${i++}`;
        }
        if (!xml && TEXT_ELEMENTS.test(node.localName) && node.textContent.trim() === `<!--${search}-->`) {
          entries.push(abc(path || createPath(node), text, null));
          search = `${prefix}${i++}`;
        }
      }
    }
    for (i = 0; i < replace.length; i++)
      replace[i].replaceWith(textNode());
  }
  const { childNodes } = content;
  let { length: len } = childNodes;
  if (len < 1) {
    len = 1;
    content.appendChild(textNode());
  } else if (len === 1 && // ignore html`static` or svg`static` because
  // these nodes can be passed directly as never mutated
  length !== 1 && childNodes[0].nodeType !== ELEMENT_NODE) {
    len = 0;
  }
  return set(cache2, template2, abc(content, entries, len === 1));
};
var cache2 = /* @__PURE__ */ new WeakMap();
var prefix = "isµ";
var parser_default = (xml) => (template2, values) => cache2.get(template2) || resolve(template2, values, xml);

// front/node_modules/uhtml/esm/rabbit.js
var createHTML = creator_default(parser_default(false));
var createSVG = creator_default(parser_default(true));
var unroll = (info, { s, t, v }) => {
  if (info.a !== t) {
    const { b, c } = (s ? createSVG : createHTML)(t, v);
    info.a = t;
    info.b = b;
    info.c = c;
  }
  for (let { c } = info, i = 0; i < c.length; i++) {
    const value = v[i];
    const detail2 = c[i];
    switch (detail2.u) {
      case array:
        detail2.v = array(
          detail2.t,
          unrollValues(detail2.c, value),
          detail2.v
        );
        break;
      case hole:
        const current = value instanceof Hole ? unroll(detail2.c || (detail2.c = cache()), value) : (detail2.c = null, value);
        if (current !== detail2.v)
          detail2.v = hole(detail2, current);
        break;
      default:
        if (value !== detail2.v)
          detail2.v = detail2.u(detail2.t, value, detail2.n, detail2.v);
        break;
    }
  }
  return info.b;
};
var unrollValues = (stack, values) => {
  let i = 0, { length } = values;
  if (length < stack.length) stack.splice(length);
  for (; i < length; i++) {
    const value = values[i];
    if (value instanceof Hole)
      values[i] = unroll(stack[i] || (stack[i] = cache()), value);
    else stack[i] = null;
  }
  return values;
};
var Hole = class {
  constructor(svg3, template2, values) {
    this.s = svg3;
    this.t = template2;
    this.v = values;
  }
  toDOM(info = cache()) {
    return unroll(info, this);
  }
};

// front/node_modules/uhtml/esm/index.js
var tag = (svg3) => (template2, ...values) => new Hole(svg3, template2, values);
var html = tag(false);
var svg2 = tag(true);

export {
  hole_default,
  html,
  svg2 as svg
};
/*! Bundled license information:

uhtml/esm/index.js:
  (*! (c) Andrea Giammarchi - MIT *)
*/
//# sourceMappingURL=chunk-K7R3KOTQ.js.map
