import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-W7NC74ZX.js";

// front/node_modules/lodash.isplainobject/index.js
var require_lodash = __commonJS({
  "front/node_modules/lodash.isplainobject/index.js"(exports, module) {
    var objectTag = "[object Object]";
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    var objectToString = objectProto.toString;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isPlainObject2(value) {
      if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    module.exports = isPlainObject2;
  }
});

// front/node_modules/reflect-metadata/Reflect.js
var require_Reflect = __commonJS({
  "front/node_modules/reflect-metadata/Reflect.js"() {
    var Reflect2;
    (function(Reflect3) {
      (function(factory) {
        var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
        var exporter = makeExporter(Reflect3);
        if (typeof root.Reflect !== "undefined") {
          exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter, root);
        if (typeof root.Reflect === "undefined") {
          root.Reflect = Reflect3;
        }
        function makeExporter(target, previous) {
          return function(key, value) {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
            if (previous)
              previous(key, value);
          };
        }
        function functionThis() {
          try {
            return Function("return this;")();
          } catch (_) {
          }
        }
        function indirectEvalThis() {
          try {
            return (void 0, eval)("(function() { return this; })()");
          } catch (_) {
          }
        }
        function sloppyModeThis() {
          return functionThis() || indirectEvalThis();
        }
      })(function(exporter, root) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function";
        var supportsProto = { __proto__: [] } instanceof Array;
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
          // create an object in dictionary mode (a.k.a. "slow" mode in v8)
          create: supportsCreate ? function() {
            return MakeDictionary(/* @__PURE__ */ Object.create(null));
          } : supportsProto ? function() {
            return MakeDictionary({ __proto__: null });
          } : function() {
            return MakeDictionary({});
          },
          has: downLevel ? function(map, key) {
            return hasOwn.call(map, key);
          } : function(map, key) {
            return key in map;
          },
          get: downLevel ? function(map, key) {
            return hasOwn.call(map, key) ? map[key] : void 0;
          } : function(map, key) {
            return map[key];
          }
        };
        var functionPrototype = Object.getPrototypeOf(Function);
        var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
        var metadataRegistry = GetOrCreateMetadataRegistry();
        var metadataProvider = CreateMetadataProvider(metadataRegistry);
        function decorate(decorators, target, propertyKey, attributes) {
          if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsObject(target))
              throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
              throw new TypeError();
            if (IsNull(attributes))
              attributes = void 0;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
          } else {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsConstructor(target))
              throw new TypeError();
            return DecorateConstructor(decorators, target);
          }
        }
        exporter("decorate", decorate);
        function metadata(metadataKey, metadataValue) {
          function decorator(target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
              throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
          }
          return decorator;
        }
        exporter("metadata", metadata);
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        function hasMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        function hasOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        function getMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        function getOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        function getMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        function getOwnMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        function deleteMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          var provider = GetMetadataProvider(
            target,
            propertyKey,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsConstructor(decorated))
                throw new TypeError();
              target = decorated;
            }
          }
          return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsObject(decorated))
                throw new TypeError();
              descriptor = decorated;
            }
          }
          return descriptor;
        }
        function OrdinaryHasMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return true;
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
          return false;
        }
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
        }
        function OrdinaryGetMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
          return void 0;
        }
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return;
          return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            true
          );
          provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
        }
        function OrdinaryMetadataKeys(O, P) {
          var ownKeys = OrdinaryOwnMetadataKeys(O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (parent === null)
            return ownKeys;
          var parentKeys = OrdinaryMetadataKeys(parent, P);
          if (parentKeys.length <= 0)
            return ownKeys;
          if (ownKeys.length <= 0)
            return parentKeys;
          var set = new _Set();
          var keys = [];
          for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          for (var _a3 = 0, parentKeys_1 = parentKeys; _a3 < parentKeys_1.length; _a3++) {
            var key = parentKeys_1[_a3];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          return keys;
        }
        function OrdinaryOwnMetadataKeys(O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*create*/
            false
          );
          if (!provider) {
            return [];
          }
          return provider.OrdinaryOwnMetadataKeys(O, P);
        }
        function Type(x) {
          if (x === null)
            return 1;
          switch (typeof x) {
            case "undefined":
              return 0;
            case "boolean":
              return 2;
            case "string":
              return 3;
            case "symbol":
              return 4;
            case "number":
              return 5;
            case "object":
              return x === null ? 1 : 6;
            default:
              return 6;
          }
        }
        function IsUndefined(x) {
          return x === void 0;
        }
        function IsNull(x) {
          return x === null;
        }
        function IsSymbol(x) {
          return typeof x === "symbol";
        }
        function IsObject(x) {
          return typeof x === "object" ? x !== null : typeof x === "function";
        }
        function ToPrimitive(input, PreferredType) {
          switch (Type(input)) {
            case 0:
              return input;
            case 1:
              return input;
            case 2:
              return input;
            case 3:
              return input;
            case 4:
              return input;
            case 5:
              return input;
          }
          var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
          var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
          if (exoticToPrim !== void 0) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
              throw new TypeError();
            return result;
          }
          return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        function OrdinaryToPrimitive(O, hint) {
          if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
              var result = toString_1.call(O);
              if (!IsObject(result))
                return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
          } else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
              var result = toString_2.call(O);
              if (!IsObject(result))
                return result;
            }
          }
          throw new TypeError();
        }
        function ToBoolean(argument) {
          return !!argument;
        }
        function ToString(argument) {
          return "" + argument;
        }
        function ToPropertyKey(argument) {
          var key = ToPrimitive(
            argument,
            3
            /* String */
          );
          if (IsSymbol(key))
            return key;
          return ToString(key);
        }
        function IsArray(argument) {
          return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
        }
        function IsCallable(argument) {
          return typeof argument === "function";
        }
        function IsConstructor(argument) {
          return typeof argument === "function";
        }
        function IsPropertyKey(argument) {
          switch (Type(argument)) {
            case 3:
              return true;
            case 4:
              return true;
            default:
              return false;
          }
        }
        function SameValueZero(x, y) {
          return x === y || x !== x && y !== y;
        }
        function GetMethod(V, P) {
          var func = V[P];
          if (func === void 0 || func === null)
            return void 0;
          if (!IsCallable(func))
            throw new TypeError();
          return func;
        }
        function GetIterator(obj) {
          var method = GetMethod(obj, iteratorSymbol);
          if (!IsCallable(method))
            throw new TypeError();
          var iterator = method.call(obj);
          if (!IsObject(iterator))
            throw new TypeError();
          return iterator;
        }
        function IteratorValue(iterResult) {
          return iterResult.value;
        }
        function IteratorStep(iterator) {
          var result = iterator.next();
          return result.done ? false : result;
        }
        function IteratorClose(iterator) {
          var f = iterator["return"];
          if (f)
            f.call(iterator);
        }
        function OrdinaryGetPrototypeOf(O) {
          var proto = Object.getPrototypeOf(O);
          if (typeof O !== "function" || O === functionPrototype)
            return proto;
          if (proto !== functionPrototype)
            return proto;
          var prototype = O.prototype;
          var prototypeProto = prototype && Object.getPrototypeOf(prototype);
          if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
          var constructor = prototypeProto.constructor;
          if (typeof constructor !== "function")
            return proto;
          if (constructor === O)
            return proto;
          return constructor;
        }
        function CreateMetadataRegistry() {
          var fallback;
          if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
            fallback = CreateFallbackProvider(root.Reflect);
          }
          var first;
          var second;
          var rest;
          var targetProviderMap = new _WeakMap();
          var registry = {
            registerProvider,
            getProvider,
            setProvider
          };
          return registry;
          function registerProvider(provider) {
            if (!Object.isExtensible(registry)) {
              throw new Error("Cannot add provider to a frozen registry.");
            }
            switch (true) {
              case fallback === provider:
                break;
              case IsUndefined(first):
                first = provider;
                break;
              case first === provider:
                break;
              case IsUndefined(second):
                second = provider;
                break;
              case second === provider:
                break;
              default:
                if (rest === void 0)
                  rest = new _Set();
                rest.add(provider);
                break;
            }
          }
          function getProviderNoCache(O, P) {
            if (!IsUndefined(first)) {
              if (first.isProviderFor(O, P))
                return first;
              if (!IsUndefined(second)) {
                if (second.isProviderFor(O, P))
                  return first;
                if (!IsUndefined(rest)) {
                  var iterator = GetIterator(rest);
                  while (true) {
                    var next = IteratorStep(iterator);
                    if (!next) {
                      return void 0;
                    }
                    var provider = IteratorValue(next);
                    if (provider.isProviderFor(O, P)) {
                      IteratorClose(iterator);
                      return provider;
                    }
                  }
                }
              }
            }
            if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
              return fallback;
            }
            return void 0;
          }
          function getProvider(O, P) {
            var providerMap = targetProviderMap.get(O);
            var provider;
            if (!IsUndefined(providerMap)) {
              provider = providerMap.get(P);
            }
            if (!IsUndefined(provider)) {
              return provider;
            }
            provider = getProviderNoCache(O, P);
            if (!IsUndefined(provider)) {
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return provider;
          }
          function hasProvider(provider) {
            if (IsUndefined(provider))
              throw new TypeError();
            return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
          }
          function setProvider(O, P, provider) {
            if (!hasProvider(provider)) {
              throw new Error("Metadata provider not registered.");
            }
            var existingProvider = getProvider(O, P);
            if (existingProvider !== provider) {
              if (!IsUndefined(existingProvider)) {
                return false;
              }
              var providerMap = targetProviderMap.get(O);
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return true;
          }
        }
        function GetOrCreateMetadataRegistry() {
          var metadataRegistry2;
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            metadataRegistry2 = root.Reflect[registrySymbol];
          }
          if (IsUndefined(metadataRegistry2)) {
            metadataRegistry2 = CreateMetadataRegistry();
          }
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            Object.defineProperty(root.Reflect, registrySymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: metadataRegistry2
            });
          }
          return metadataRegistry2;
        }
        function CreateMetadataProvider(registry) {
          var metadata2 = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var targetMetadata = metadata2.get(O);
              if (IsUndefined(targetMetadata))
                return false;
              return targetMetadata.has(P);
            },
            OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
            OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
            OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
            OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
            OrdinaryDeleteMetadata
          };
          metadataRegistry.registerProvider(provider);
          return provider;
          function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = metadata2.get(O);
            var createdTargetMetadata = false;
            if (IsUndefined(targetMetadata)) {
              if (!Create)
                return void 0;
              targetMetadata = new _Map();
              metadata2.set(O, targetMetadata);
              createdTargetMetadata = true;
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
              if (!Create)
                return void 0;
              metadataMap = new _Map();
              targetMetadata.set(P, metadataMap);
              if (!registry.setProvider(O, P, provider)) {
                targetMetadata.delete(P);
                if (createdTargetMetadata) {
                  metadata2.delete(O);
                }
                throw new Error("Wrong provider for target.");
              }
            }
            return metadataMap;
          }
          function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            return ToBoolean(metadataMap.has(MetadataKey));
          }
          function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return void 0;
            return metadataMap.get(MetadataKey);
          }
          function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              true
            );
            metadataMap.set(MetadataKey, MetadataValue);
          }
          function OrdinaryOwnMetadataKeys2(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
              var next = IteratorStep(iterator);
              if (!next) {
                keys.length = k;
                return keys;
              }
              var nextValue = IteratorValue(next);
              try {
                keys[k] = nextValue;
              } catch (e) {
                try {
                  IteratorClose(iterator);
                } finally {
                  throw e;
                }
              }
              k++;
            }
          }
          function OrdinaryDeleteMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            if (!metadataMap.delete(MetadataKey))
              return false;
            if (metadataMap.size === 0) {
              var targetMetadata = metadata2.get(O);
              if (!IsUndefined(targetMetadata)) {
                targetMetadata.delete(P);
                if (targetMetadata.size === 0) {
                  metadata2.delete(targetMetadata);
                }
              }
            }
            return true;
          }
        }
        function CreateFallbackProvider(reflect) {
          var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
          var metadataOwner = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var metadataPropertySet = metadataOwner.get(O);
              if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
                return true;
              }
              if (getOwnMetadataKeys2(O, P).length) {
                if (IsUndefined(metadataPropertySet)) {
                  metadataPropertySet = new _Set();
                  metadataOwner.set(O, metadataPropertySet);
                }
                metadataPropertySet.add(P);
                return true;
              }
              return false;
            },
            OrdinaryDefineOwnMetadata: defineMetadata2,
            OrdinaryHasOwnMetadata: hasOwnMetadata2,
            OrdinaryGetOwnMetadata: getOwnMetadata2,
            OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
            OrdinaryDeleteMetadata: deleteMetadata2
          };
          return provider;
        }
        function GetMetadataProvider(O, P, Create) {
          var registeredProvider = metadataRegistry.getProvider(O, P);
          if (!IsUndefined(registeredProvider)) {
            return registeredProvider;
          }
          if (Create) {
            if (metadataRegistry.setProvider(O, P, metadataProvider)) {
              return metadataProvider;
            }
            throw new Error("Illegal state.");
          }
          return void 0;
        }
        function CreateMapPolyfill() {
          var cacheSentinel = {};
          var arraySentinel = [];
          var MapIterator = (
            /** @class */
            function() {
              function MapIterator2(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
              }
              MapIterator2.prototype["@@iterator"] = function() {
                return this;
              };
              MapIterator2.prototype[iteratorSymbol] = function() {
                return this;
              };
              MapIterator2.prototype.next = function() {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                  var result = this._selector(this._keys[index], this._values[index]);
                  if (index + 1 >= this._keys.length) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                  } else {
                    this._index++;
                  }
                  return { value: result, done: false };
                }
                return { value: void 0, done: true };
              };
              MapIterator2.prototype.throw = function(error) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                throw error;
              };
              MapIterator2.prototype.return = function(value) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                return { value, done: true };
              };
              return MapIterator2;
            }()
          );
          var Map2 = (
            /** @class */
            function() {
              function Map3() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              Object.defineProperty(Map3.prototype, "size", {
                get: function() {
                  return this._keys.length;
                },
                enumerable: true,
                configurable: true
              });
              Map3.prototype.has = function(key) {
                return this._find(
                  key,
                  /*insert*/
                  false
                ) >= 0;
              };
              Map3.prototype.get = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                return index >= 0 ? this._values[index] : void 0;
              };
              Map3.prototype.set = function(key, value) {
                var index = this._find(
                  key,
                  /*insert*/
                  true
                );
                this._values[index] = value;
                return this;
              };
              Map3.prototype.delete = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                if (index >= 0) {
                  var size = this._keys.length;
                  for (var i = index + 1; i < size; i++) {
                    this._keys[i - 1] = this._keys[i];
                    this._values[i - 1] = this._values[i];
                  }
                  this._keys.length--;
                  this._values.length--;
                  if (SameValueZero(key, this._cacheKey)) {
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                  }
                  return true;
                }
                return false;
              };
              Map3.prototype.clear = function() {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              };
              Map3.prototype.keys = function() {
                return new MapIterator(this._keys, this._values, getKey);
              };
              Map3.prototype.values = function() {
                return new MapIterator(this._keys, this._values, getValue);
              };
              Map3.prototype.entries = function() {
                return new MapIterator(this._keys, this._values, getEntry);
              };
              Map3.prototype["@@iterator"] = function() {
                return this.entries();
              };
              Map3.prototype[iteratorSymbol] = function() {
                return this.entries();
              };
              Map3.prototype._find = function(key, insert) {
                if (!SameValueZero(this._cacheKey, key)) {
                  this._cacheIndex = -1;
                  for (var i = 0; i < this._keys.length; i++) {
                    if (SameValueZero(this._keys[i], key)) {
                      this._cacheIndex = i;
                      break;
                    }
                  }
                }
                if (this._cacheIndex < 0 && insert) {
                  this._cacheIndex = this._keys.length;
                  this._keys.push(key);
                  this._values.push(void 0);
                }
                return this._cacheIndex;
              };
              return Map3;
            }()
          );
          return Map2;
          function getKey(key, _) {
            return key;
          }
          function getValue(_, value) {
            return value;
          }
          function getEntry(key, value) {
            return [key, value];
          }
        }
        function CreateSetPolyfill() {
          var Set3 = (
            /** @class */
            function() {
              function Set4() {
                this._map = new _Map();
              }
              Object.defineProperty(Set4.prototype, "size", {
                get: function() {
                  return this._map.size;
                },
                enumerable: true,
                configurable: true
              });
              Set4.prototype.has = function(value) {
                return this._map.has(value);
              };
              Set4.prototype.add = function(value) {
                return this._map.set(value, value), this;
              };
              Set4.prototype.delete = function(value) {
                return this._map.delete(value);
              };
              Set4.prototype.clear = function() {
                this._map.clear();
              };
              Set4.prototype.keys = function() {
                return this._map.keys();
              };
              Set4.prototype.values = function() {
                return this._map.keys();
              };
              Set4.prototype.entries = function() {
                return this._map.entries();
              };
              Set4.prototype["@@iterator"] = function() {
                return this.keys();
              };
              Set4.prototype[iteratorSymbol] = function() {
                return this.keys();
              };
              return Set4;
            }()
          );
          return Set3;
        }
        function CreateWeakMapPolyfill() {
          var UUID_SIZE = 16;
          var keys = HashMap.create();
          var rootKey = CreateUniqueKey();
          return (
            /** @class */
            function() {
              function WeakMap2() {
                this._key = CreateUniqueKey();
              }
              WeakMap2.prototype.has = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.has(table, this._key) : false;
              };
              WeakMap2.prototype.get = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.get(table, this._key) : void 0;
              };
              WeakMap2.prototype.set = function(target, value) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  true
                );
                table[this._key] = value;
                return this;
              };
              WeakMap2.prototype.delete = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? delete table[this._key] : false;
              };
              WeakMap2.prototype.clear = function() {
                this._key = CreateUniqueKey();
              };
              return WeakMap2;
            }()
          );
          function CreateUniqueKey() {
            var key;
            do
              key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
          }
          function GetOrCreateWeakMapTable(target, create4) {
            if (!hasOwn.call(target, rootKey)) {
              if (!create4)
                return void 0;
              Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
          }
          function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
              buffer[i] = Math.random() * 255 | 0;
            return buffer;
          }
          function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
              var array = new Uint8Array(size);
              if (typeof crypto !== "undefined") {
                crypto.getRandomValues(array);
              } else if (typeof msCrypto !== "undefined") {
                msCrypto.getRandomValues(array);
              } else {
                FillRandomBytes(array, size);
              }
              return array;
            }
            return FillRandomBytes(new Array(size), size);
          }
          function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            data[6] = data[6] & 79 | 64;
            data[8] = data[8] & 191 | 128;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
              var byte = data[offset];
              if (offset === 4 || offset === 6 || offset === 8)
                result += "-";
              if (byte < 16)
                result += "0";
              result += byte.toString(16).toLowerCase();
            }
            return result;
          }
        }
        function MakeDictionary(obj) {
          obj.__ = void 0;
          delete obj.__;
          return obj;
        }
      });
    })(Reflect2 || (Reflect2 = {}));
  }
});

// front/node_modules/pvtsutils/build/index.js
var require_build = __commonJS({
  "front/node_modules/pvtsutils/build/index.js"(exports) {
    "use strict";
    var ARRAY_BUFFER_NAME = "[object ArrayBuffer]";
    var BufferSourceConverter6 = class _BufferSourceConverter {
      static isArrayBuffer(data) {
        return Object.prototype.toString.call(data) === ARRAY_BUFFER_NAME;
      }
      static toArrayBuffer(data) {
        if (this.isArrayBuffer(data)) {
          return data;
        }
        if (data.byteLength === data.buffer.byteLength) {
          return data.buffer;
        }
        if (data.byteOffset === 0 && data.byteLength === data.buffer.byteLength) {
          return data.buffer;
        }
        return this.toUint8Array(data.buffer).slice(data.byteOffset, data.byteOffset + data.byteLength).buffer;
      }
      static toUint8Array(data) {
        return this.toView(data, Uint8Array);
      }
      static toView(data, type) {
        if (data.constructor === type) {
          return data;
        }
        if (this.isArrayBuffer(data)) {
          return new type(data);
        }
        if (this.isArrayBufferView(data)) {
          return new type(data.buffer, data.byteOffset, data.byteLength);
        }
        throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
      }
      static isBufferSource(data) {
        return this.isArrayBufferView(data) || this.isArrayBuffer(data);
      }
      static isArrayBufferView(data) {
        return ArrayBuffer.isView(data) || data && this.isArrayBuffer(data.buffer);
      }
      static isEqual(a, b) {
        const aView = _BufferSourceConverter.toUint8Array(a);
        const bView = _BufferSourceConverter.toUint8Array(b);
        if (aView.length !== bView.byteLength) {
          return false;
        }
        for (let i = 0; i < aView.length; i++) {
          if (aView[i] !== bView[i]) {
            return false;
          }
        }
        return true;
      }
      static concat(...args) {
        let buffers;
        if (Array.isArray(args[0]) && !(args[1] instanceof Function)) {
          buffers = args[0];
        } else if (Array.isArray(args[0]) && args[1] instanceof Function) {
          buffers = args[0];
        } else {
          if (args[args.length - 1] instanceof Function) {
            buffers = args.slice(0, args.length - 1);
          } else {
            buffers = args;
          }
        }
        let size = 0;
        for (const buffer of buffers) {
          size += buffer.byteLength;
        }
        const res = new Uint8Array(size);
        let offset = 0;
        for (const buffer of buffers) {
          const view = this.toUint8Array(buffer);
          res.set(view, offset);
          offset += view.length;
        }
        if (args[args.length - 1] instanceof Function) {
          return this.toView(res, args[args.length - 1]);
        }
        return res.buffer;
      }
    };
    var STRING_TYPE = "string";
    var HEX_REGEX = /^[0-9a-f\s]+$/i;
    var BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    var BASE64URL_REGEX = /^[a-zA-Z0-9-_]+$/;
    var Utf8Converter = class {
      static fromString(text) {
        const s = unescape(encodeURIComponent(text));
        const uintArray = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) {
          uintArray[i] = s.charCodeAt(i);
        }
        return uintArray.buffer;
      }
      static toString(buffer) {
        const buf = BufferSourceConverter6.toUint8Array(buffer);
        let encodedString = "";
        for (let i = 0; i < buf.length; i++) {
          encodedString += String.fromCharCode(buf[i]);
        }
        const decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
      }
    };
    var Utf16Converter = class {
      static toString(buffer, littleEndian = false) {
        const arrayBuffer = BufferSourceConverter6.toArrayBuffer(buffer);
        const dataView = new DataView(arrayBuffer);
        let res = "";
        for (let i = 0; i < arrayBuffer.byteLength; i += 2) {
          const code3 = dataView.getUint16(i, littleEndian);
          res += String.fromCharCode(code3);
        }
        return res;
      }
      static fromString(text, littleEndian = false) {
        const res = new ArrayBuffer(text.length * 2);
        const dataView = new DataView(res);
        for (let i = 0; i < text.length; i++) {
          dataView.setUint16(i * 2, text.charCodeAt(i), littleEndian);
        }
        return res;
      }
    };
    var Convert5 = class _Convert {
      static isHex(data) {
        return typeof data === STRING_TYPE && HEX_REGEX.test(data);
      }
      static isBase64(data) {
        return typeof data === STRING_TYPE && BASE64_REGEX.test(data);
      }
      static isBase64Url(data) {
        return typeof data === STRING_TYPE && BASE64URL_REGEX.test(data);
      }
      static ToString(buffer, enc = "utf8") {
        const buf = BufferSourceConverter6.toUint8Array(buffer);
        switch (enc.toLowerCase()) {
          case "utf8":
            return this.ToUtf8String(buf);
          case "binary":
            return this.ToBinary(buf);
          case "hex":
            return this.ToHex(buf);
          case "base64":
            return this.ToBase64(buf);
          case "base64url":
            return this.ToBase64Url(buf);
          case "utf16le":
            return Utf16Converter.toString(buf, true);
          case "utf16":
          case "utf16be":
            return Utf16Converter.toString(buf);
          default:
            throw new Error(`Unknown type of encoding '${enc}'`);
        }
      }
      static FromString(str, enc = "utf8") {
        if (!str) {
          return new ArrayBuffer(0);
        }
        switch (enc.toLowerCase()) {
          case "utf8":
            return this.FromUtf8String(str);
          case "binary":
            return this.FromBinary(str);
          case "hex":
            return this.FromHex(str);
          case "base64":
            return this.FromBase64(str);
          case "base64url":
            return this.FromBase64Url(str);
          case "utf16le":
            return Utf16Converter.fromString(str, true);
          case "utf16":
          case "utf16be":
            return Utf16Converter.fromString(str);
          default:
            throw new Error(`Unknown type of encoding '${enc}'`);
        }
      }
      static ToBase64(buffer) {
        const buf = BufferSourceConverter6.toUint8Array(buffer);
        if (typeof btoa !== "undefined") {
          const binary = this.ToString(buf, "binary");
          return btoa(binary);
        } else {
          return Buffer.from(buf).toString("base64");
        }
      }
      static FromBase64(base642) {
        const formatted = this.formatString(base642);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!_Convert.isBase64(formatted)) {
          throw new TypeError("Argument 'base64Text' is not Base64 encoded");
        }
        if (typeof atob !== "undefined") {
          return this.FromBinary(atob(formatted));
        } else {
          return new Uint8Array(Buffer.from(formatted, "base64")).buffer;
        }
      }
      static FromBase64Url(base64url2) {
        const formatted = this.formatString(base64url2);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!_Convert.isBase64Url(formatted)) {
          throw new TypeError("Argument 'base64url' is not Base64Url encoded");
        }
        return this.FromBase64(this.Base64Padding(formatted.replace(/\-/g, "+").replace(/\_/g, "/")));
      }
      static ToBase64Url(data) {
        return this.ToBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
      }
      static FromUtf8String(text, encoding = _Convert.DEFAULT_UTF8_ENCODING) {
        switch (encoding) {
          case "ascii":
            return this.FromBinary(text);
          case "utf8":
            return Utf8Converter.fromString(text);
          case "utf16":
          case "utf16be":
            return Utf16Converter.fromString(text);
          case "utf16le":
          case "usc2":
            return Utf16Converter.fromString(text, true);
          default:
            throw new Error(`Unknown type of encoding '${encoding}'`);
        }
      }
      static ToUtf8String(buffer, encoding = _Convert.DEFAULT_UTF8_ENCODING) {
        switch (encoding) {
          case "ascii":
            return this.ToBinary(buffer);
          case "utf8":
            return Utf8Converter.toString(buffer);
          case "utf16":
          case "utf16be":
            return Utf16Converter.toString(buffer);
          case "utf16le":
          case "usc2":
            return Utf16Converter.toString(buffer, true);
          default:
            throw new Error(`Unknown type of encoding '${encoding}'`);
        }
      }
      static FromBinary(text) {
        const stringLength = text.length;
        const resultView = new Uint8Array(stringLength);
        for (let i = 0; i < stringLength; i++) {
          resultView[i] = text.charCodeAt(i);
        }
        return resultView.buffer;
      }
      static ToBinary(buffer) {
        const buf = BufferSourceConverter6.toUint8Array(buffer);
        let res = "";
        for (let i = 0; i < buf.length; i++) {
          res += String.fromCharCode(buf[i]);
        }
        return res;
      }
      static ToHex(buffer) {
        const buf = BufferSourceConverter6.toUint8Array(buffer);
        let result = "";
        const len = buf.length;
        for (let i = 0; i < len; i++) {
          const byte = buf[i];
          if (byte < 16) {
            result += "0";
          }
          result += byte.toString(16);
        }
        return result;
      }
      static FromHex(hexString) {
        let formatted = this.formatString(hexString);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!_Convert.isHex(formatted)) {
          throw new TypeError("Argument 'hexString' is not HEX encoded");
        }
        if (formatted.length % 2) {
          formatted = `0${formatted}`;
        }
        const res = new Uint8Array(formatted.length / 2);
        for (let i = 0; i < formatted.length; i = i + 2) {
          const c = formatted.slice(i, i + 2);
          res[i / 2] = parseInt(c, 16);
        }
        return res.buffer;
      }
      static ToUtf16String(buffer, littleEndian = false) {
        return Utf16Converter.toString(buffer, littleEndian);
      }
      static FromUtf16String(text, littleEndian = false) {
        return Utf16Converter.fromString(text, littleEndian);
      }
      static Base64Padding(base642) {
        const padCount = 4 - base642.length % 4;
        if (padCount < 4) {
          for (let i = 0; i < padCount; i++) {
            base642 += "=";
          }
        }
        return base642;
      }
      static formatString(data) {
        return (data === null || data === void 0 ? void 0 : data.replace(/[\n\r\t ]/g, "")) || "";
      }
    };
    Convert5.DEFAULT_UTF8_ENCODING = "utf8";
    function assign(target, ...sources) {
      const res = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        const obj = arguments[i];
        for (const prop in obj) {
          res[prop] = obj[prop];
        }
      }
      return res;
    }
    function combine2(...buf) {
      const totalByteLength = buf.map((item) => item.byteLength).reduce((prev, cur) => prev + cur);
      const res = new Uint8Array(totalByteLength);
      let currentPos = 0;
      buf.map((item) => new Uint8Array(item)).forEach((arr) => {
        for (const item2 of arr) {
          res[currentPos++] = item2;
        }
      });
      return res.buffer;
    }
    function isEqual3(bytes1, bytes2) {
      if (!(bytes1 && bytes2)) {
        return false;
      }
      if (bytes1.byteLength !== bytes2.byteLength) {
        return false;
      }
      const b1 = new Uint8Array(bytes1);
      const b2 = new Uint8Array(bytes2);
      for (let i = 0; i < bytes1.byteLength; i++) {
        if (b1[i] !== b2[i]) {
          return false;
        }
      }
      return true;
    }
    exports.BufferSourceConverter = BufferSourceConverter6;
    exports.Convert = Convert5;
    exports.assign = assign;
    exports.combine = combine2;
    exports.isEqual = isEqual3;
  }
});

// front/src/components/jwt.js
var log = window.MHR.log;
var myerror = window.MHR.storage.myerror;
var mylog = window.MHR.storage.mylog;
function decodeUnsafeJWT(jwt) {
  mylog("in decodeJWT");
  mylog(jwt);
  let decoded = {
    error: false,
    header: void 0,
    body: void 0,
    signature: void 0
  };
  let components = "";
  if (typeof jwt === "string" || jwt instanceof String) {
    components = jwt.split(".");
    mylog("components", components);
  } else {
    decoded.error = "Format error. Encoded credential is not a string";
    myerror(decoded.error);
    return decoded;
  }
  if (components.length != 3) {
    decoded.error = "Malformed JWT, not enough components: " + components.length;
    myerror(decoded.error);
    return decoded;
  }
  try {
    decoded.header = JSON.parse(atobUrl(components[0]));
    decoded.body = JSON.parse(atobUrl(components[1]));
    mylog(decoded.body);
    decoded.signature = components[2];
  } catch (error) {
    decoded.error = "Error parsing header or body";
    myerror(decoded.error);
    return decoded;
  }
  if (!decoded.header) {
    decoded.error = "Field does not exist in JWT (header)";
    myerror(decoded.error);
    return decoded;
  }
  return decoded;
}
function atobUrl(input) {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  let bstr = decodeURIComponent(escape(atob(input)));
  return bstr;
}

// front/src/img/photo_man.png
var photo_man_default = "data:image/png;base64,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";

// front/src/img/photo_woman.png
var photo_woman_default = "data:image/png;base64,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";

// front/src/img/logo.png
var logo_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAkaSURBVGhD7ZkJbFTHGYD/996+t/t217u21+tdYxtsk+CAuYK5IRw+CDjmCJdIIYrSRG2a0jaq0kZFiEBS1Ea0pSFt1YSgNoSkECdNsYBACGCaEs4iQjhzYWMM+MDe+3rH9J/nZxfCtWsbyZb8Sb/ezLyZ2fnfzH+MDb300sstSX51UF/6ZLVaDyR90ZRk01e215Q+odPOJyem9EhFXGWlM7k68yn2qrgUZNbK1Vlm9ihFHC8UWl0zS9YzYW4r4UgmsKT1hcQsaC30AAwqDDMQOI1PYlAZwqNgnaRV5foyZjw8l9H7dVscy0cw/NG0HyvpkTVElE16M7Vu4l13qNrIC+UBJnKG05u7JfjFzVLhtTdAYpcp2UEDG+BBzQiBmhMEENUaKAhMD1pC5/Tu3QNCiIDS/sUdvxiVaz7sPCqeSiZU+JCBpPx2CLG9k0d4whzNIu50vatGtzxaBoWZYP/lyH8KB9NbF4urlFadVRmWYYSDzpMNyw4XSQxp1t7pJKwIfjUrwzABvdrlPLF85ZhdRw7uZyKsMTquEdTsIEhDWkDckgNsk+lzz18/eyiWGvPr3dvpNjuSMf6RXHW49wepfc0DPZX87GjRFYjOrVXMf8rnwnOrY8SkVEWLr8yTGbjlR4xbEdwJAz7obnhaW1rbsC7r1Q6DSgzAmFAJhMkHGhpofFAZaHm/KiZuuE9QxjS/EyqtfRqViLSOuJlEAqJyvRI6iv7sMNZdmcn4Off4fn08P/T41yAP8MG17buBGBWwLR0t8BdsG12lhifupESnwR3p1NFE9+rgY+xnlk8ySMrqYST9scnE+dQELdBZ9rnRU3HrsBzXbyScouDis/Ui4A7pOULimM7bs/BRhTKO9QnaDlBpIzrl6luqqPwMdyKu3+hIrnUJlbHp5Q4xdO733Oa3++/B4mAMdiBuztU8U2x8AyjOKO3yLcpPlDiVoCSsCN0FFJ9eTZhs0sfoHX1xC3fJPADjBBjO2aF5SxWIH/bDbeDA95tjdFuexJ24ycXeiVsqwpMO7dRdySP97I3hpgq/6J1k+NYG9udHaeKYWwSGs/bWTiqzDpX4d2slfm5aMBpXEu7nNnyu5rpIITyK7CxSPqAWLu63f39CkWwLg++l40AEFTwbDgBbL0JkVi1Io5u+Qte7XB+WEDd4BMdzozO9vz/6L5xspGl7FljW529SU6NPN/7tP9rB7SjixaTBpmTDp4YV+cnC5w6QUsJo7QpwNRaQBnkhWnxZYYIGv6HWUty88sRxfVhCtGe/ac+MH8ifTd6LWzuIP5lK0wEgSfJQ/oRjrPhQn62hkzUdUsZVXjoQAtzeUEFjmvUPBRAuqQMWbYHBTDY6vQ6Mn7ogPL+GjU1sWBooq9uhD0sY7ejgMRoXWvzNfjU93M/y5gCwvJGP5wEgtOQbUDKDJcQi77Psd7u0EQngml18P94h9uB4F3AqyLl+iE2sB6VvACUIwWfPgZznB7ZZ2BhzRDfow24CjyavF28PKmFCqUEhvJcnGRPLCKYMxP7nB7TAdJ2cRcnVh92V9EeLcjImlVVbd2beMI9z8SRtfsdzY9ravkS5pTtHBQS9GB840TjLvgy/a04xMdaZiVBvIvbX84lrRqkmfADvAi8NJ+5p0666yksK9WG3Bedz8j7+jHv6NOIueZgkrxlMhAaTNhfeMbR7ha5IFGWsPuwmqJPQi3el3diTNueWYoa5VTjiFENPfQlClRvEbdkQ/OF5iBRfAf6LFDB9lAXCgXQv5kKzbucinYsmpxC7tFt1RAulUY1ARAWUPiGQ7/eBcb8b+CNOwCMMsZHXQCpsWoXzrNSHdhhU2NyusX/Rhd3ykJZFaHySaUcW8OfRr9NUihom2gsjMdoC0MNQh78Tv+Sc1pH/B9tM8mDP+4YL1kKabtBUHBUC7kISGD/O1OYSjjkAPxhII5qod1rdOrJzYIAO3bB1kf7+StUqPW7alq0YTqUAxFiwvI6Gj0/jrixg/DwEfn6adhXZa8aKpA/7PaMNRDDmcNxl81tqcqxIcUbAv+KEtnBTZTZYXxsISa8M0YTBNuDVKJ4FGr0lffi9wSAzC/HrxlDajfS7kr5oCjVaNX3e1BdxxxhsW5v2o3GaIVODpn1cZaWEGrt1a1+tnYrprJ2+e1H/qS7jtiky7+cXEqu0iRZp3bq2AIhZ1myGYsDjYv77fdRm0N2ph0hqbCx7VQQmwtE6qFkhCPz0DB6pPiAcTdN2wvPqYVCyg6dxnkLcjU4F2e9yW68gJUnv4WMJLVr+8gBeEGSQBrcA6+PxqAwCNUmCyCO1GBcasE0Yy1VbNSWkoS0QmVmLdmEF4z43qHjMpEEeIHj25Hyviko829VKUO7o3vAHqTKLxYpcWUuo8UtTr0MTPLro2OgmiE69grMQTQFpWDNESy5rClIMX9swO5BARkXkAu1y+TbOmXBC2GW4pk9b4p48Q8qYPIO4Hi26wVYsVW7injqdCB6BoG1pbaZzdkL7GmusxPHCSJK64kHChzkPvsvQp+xy4rpGUnChCzHd2IQjeGoDbdDYYFuGMRJX6f3dEYiNakK3Td01C6nzizD9MGIvAqpNWl7/0e4ucbe3Im5FKEkVOfMwofwHpuB80svDgWswAeMRgKu1gO/l42Dam6Elm22EZ18E8YMcYD3CBTxiBY3rD2DaGz8Y6DBExHedjjsFoPgXVH+ACd5icXOeJBxyohGxGJ2vQWR+tXZNpUZNYw6HtiH3xwRxTCNEymtByQitSlSJREloR9pAm5nD+g2bwwuqjZGyS3orYKYcArEiB0zbs8G3+r9aG3qpk2pmaAQmBp3+09Gd6JAiFEwIZzF+w3uYxlAj0PCuPYweLbn1GqBDbNJjV3d+vFmv3jMSOlrXg4urVO3SbDTucMtG9KgYJ2wrRgDrFcD7yjGtDzqFc9GxDRVa5R7TYUUo9Tt270IbmKW4wtpfVSJ446PJolip/aMVXZq6pmXliXt6pNrolCKUYOnlT7gmUzmmyIHY+HqQB3oxdZfpTbBOzvO9q3frOeCFa4L4RYq3LVCi/Ep/1fPAxReiNKJEUBK+43crbO/mPeh4ftSberVnk/zHgk7bXi+9dAsA/gc6ZvJxYJAvHwAAAABJRU5ErkJggg==";

// front/src/components/renderAnyCredential.js
var gotoPage = window.MHR.gotoPage;
var goHome = window.MHR.goHome;
var html = window.MHR.html;
var storage = window.MHR.storage;
var myerror2 = window.MHR.storage.myerror;
var mylog2 = window.MHR.storage.mylog;
function renderAnyCredentialCard(vc, status = "signed") {
  var credCard;
  console.log("renderAnyCredentialCard", vc);
  if (vc.vc) {
    vc = vc.vc;
  }
  const vctypes = vc.type;
  if (vctypes.includes("LEARCredentialEmployee")) {
    credCard = renderLEARCredentialCard(vc, status);
  } else if (vctypes.includes("YAMKETServiceCertification")) {
    credCard = renderYAMKETCertificationCard(vc, status);
  } else {
    throw new Error(`credential type unknown: ${vctypes}`);
  }
  return credCard;
}
function renderLEARCredentialCard(vc, status) {
  mylog2("renderLEARCredentialCard with:", status, vc);
  const vctypes = vc.type;
  if (vctypes.indexOf("LEARCredentialEmployee") == -1) {
    throw new Error("renderLEARCredentialCard: credential is not of type LEARCredentialEmployee");
  }
  const vcs = vc.credentialSubject;
  if (!vcs) {
    throw new Error("renderLEARCredentialCard: credentialSubject does not exist");
  }
  if (!vcs.mandate) {
    throw new Error("renderLEARCredentialCard: mandate object does not exist");
  }
  if (!vcs.mandate.mandator) {
    throw new Error("renderLEARCredentialCard: mandator data does not exist");
  }
  if (!vcs.mandate.mandatee) {
    throw new Error("renderLEARCredentialCard: mandatee data does not exist");
  }
  if (!vcs.mandate.power) {
    throw new Error("renderLEARCredentialCard: power data does not exist");
  }
  var first_name = vcs.mandate.mandatee.first_name;
  if (!first_name) {
    first_name = vcs.mandate.mandatee.firstName;
  }
  var last_name = vcs.mandate.mandatee.last_name;
  if (!last_name) {
    last_name = vcs.mandate.mandatee.lastName;
  }
  var validFrom = vc.validFrom;
  var validUntil = vc.validUntil;
  if (validFrom) {
    validFrom = validFrom.slice(0, 19);
  }
  if (validUntil) {
    validUntil = validUntil.slice(0, 19);
  }
  var avatar = photo_man_default;
  const gender = vcs.mandate.mandatee.gender;
  if (gender && gender.toUpperCase() == "F") {
    avatar = photo_woman_default;
  }
  const powers = vcs.mandate.power;
  const learCard = html`
      <ion-card-header>
         <ion-card-title>${first_name} ${last_name}</ion-card-title>
         <ion-card-subtitle>${vcs.mandate.mandator.organization}</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content class="ion-padding-bottom">
         <div>
            <ion-list>
               <ion-item>
                  <ion-thumbnail slot="start">
                     <img alt="Avatar" src=${avatar} />
                  </ion-thumbnail>
                  <ion-label>
                     <table>
                        <tr>
                           <td><b>From:</b></td>
                           <td>${validFrom}</td>
                        </tr>
                        <tr>
                           <td><b>To: </b></td>
                           <td>${validUntil}</td>
                        </tr>
                     </table>
                  </ion-label>
                  ${status != "signed" ? html`<ion-label color="danger"><b>Status: signature pending</b></ion-label>` : null}
               </ion-item>

               ${powers.map((pow) => {
    return html` <ion-item>
                     ${pow.tmf_domain ? html`
                             <ion-label>
                                ${typeof pow.tmf_domain == "string" ? pow.tmf_domain : pow.tmf_domain[0]}
                                ${pow.tmf_function} [${pow.tmf_action}]
                             </ion-label>
                          ` : null}
                     ${pow.domain ? html`
                             <ion-label>
                                ${typeof pow.domain == "string" ? pow.domain : pow.domain[0]}
                                ${pow.function} [${pow.action}]
                             </ion-label>
                          ` : null}
                  </ion-item>`;
  })}
            </ion-list>
         </div>
      </ion-card-content>
   `;
  return learCard;
}
function renderYAMKETCertificationCard(vc, status) {
  console.log("renderYAMKETCertificationCard with:", status, vc);
  const serviceName = "TheServiceName";
  const theCard = html`
      <ion-card-header>
         <ion-card-title>${serviceName}</ion-card-title>
         <ion-card-subtitle>Service certification</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content class="ion-padding-bottom">
         <div>
            <ion-list>
               <ion-item>
                  <ion-thumbnail slot="start">
                     <img alt="Avatar" src=${logo_default} />
                  </ion-thumbnail>
                  ${status != "signed" ? html`<ion-label color="danger"><b>Status: signature pending</b></ion-label>` : null}
               </ion-item>
            </ion-list>
         </div>
      </ion-card-content>
   `;
  return theCard;
}

// front/node_modules/@cef-ebsi/key-did-resolver/dist/constants.js
var KEY_DID_METHOD_PREFIX = "did:key:";
var DID_LD_JSON = "application/did+ld+json";

// front/node_modules/@cef-ebsi/key-did-resolver/dist/errors/DidResolutionError.js
var DidResolutionError = class extends Error {
  constructor(code3, message) {
    super(message);
    this.name = "DIDResolutionError";
    this.code = code3;
  }
};

// front/node_modules/@cef-ebsi/key-did-resolver/dist/errors/InvalidDidError.js
var InvalidDidError = class _InvalidDidError extends DidResolutionError {
  constructor(message) {
    super(_InvalidDidError.code, message);
    this.name = "InvalidDidError";
  }
};
InvalidDidError.code = "invalidDid";

// front/node_modules/multiformats/esm/src/varint.js
var varint_exports = {};
__export(varint_exports, {
  decode: () => decode2,
  encodeTo: () => encodeTo,
  encodingLength: () => encodingLength
});

// front/node_modules/multiformats/esm/vendor/varint.js
var encode_1 = encode;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode.bytes = offset - oldOffset + 1;
  return out;
}
var decode = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// front/node_modules/multiformats/esm/src/varint.js
var decode2 = (data, offset = 0) => {
  const code3 = varint_default.decode(data, offset);
  return [
    code3,
    varint_default.decode.bytes
  ];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength = (int) => {
  return varint_default.encodingLength(int);
};

// front/node_modules/multiformats/esm/src/bytes.js
var empty = new Uint8Array(0);
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b) => new TextDecoder().decode(b);

// front/node_modules/multiformats/esm/src/hashes/digest.js
var create = (code3, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code3);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code3, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code3, size, digest2, bytes);
};
var decode3 = (multihash) => {
  const bytes = coerce(multihash);
  const [code3, sizeOffset] = decode2(bytes);
  const [size, digestOffset] = decode2(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code3, size, digest2, bytes);
};
var equals2 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return a.code === b.code && a.size === b.size && equals(a.bytes, b.bytes);
  }
};
var Digest = class {
  constructor(code3, size, digest2, bytes) {
    this.code = code3;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes;
  }
};

// front/node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});

// front/node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name3) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode6(source) {
    if (source instanceof Uint8Array) ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode7(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name3} character`);
  }
  return {
    encode: encode6,
    decodeUnsafe,
    decode: decode7
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// front/node_modules/multiformats/esm/src/bases/base.js
var Encoder = class {
  constructor(name3, prefix, baseEncode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  constructor(name3, prefix, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
};
var ComposedDecoder = class {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
var Codec = class {
  constructor(name3, prefix, baseEncode, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name3, prefix, baseEncode);
    this.decoder = new Decoder(name3, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from = ({ name: name3, prefix, encode: encode6, decode: decode7 }) => new Codec(name3, prefix, encode6, decode7);
var baseX = ({ prefix, name: name3, alphabet: alphabet2 }) => {
  const { encode: encode6, decode: decode7 } = base_x_default(alphabet2, name3);
  return from({
    prefix,
    name: name3,
    encode: encode6,
    decode: (text) => coerce(decode7(text))
  });
};
var decode4 = (string2, alphabet2, bitsPerChar, name3) => {
  const codes = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes[alphabet2[i]] = i;
  }
  let end = string2.length;
  while (string2[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes[string2[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name3} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode2 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name3, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from({
    prefix,
    name: name3,
    encode(input) {
      return encode2(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode4(input, alphabet2, bitsPerChar, name3);
    }
  });
};

// front/node_modules/multiformats/esm/src/bases/base58.js
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// front/node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// front/node_modules/multiformats/esm/src/cid.js
var CID = class _CID {
  constructor(version2, code3, multihash, bytes) {
    this.code = code3;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly,
      version: readonly,
      multihash: readonly,
      bytes: readonly,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code3, multihash } = this;
        if (code3 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code3, digest: digest2 } = this.multihash;
        const multihash = create(code3, digest2);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof _CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code3, multihash, bytes } = value;
      return new _CID(version2, code3, multihash, bytes || encodeCID(version2, code3, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version2, multihash, code: code3 } = value;
      const digest2 = decode3(multihash);
      return _CID.create(version2, code3, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code3, digest2) {
    if (typeof code3 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code3 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version2, code3, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version2, code3, digest2.bytes);
        return new _CID(version2, code3, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return _CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code3, digest2) {
    return _CID.create(1, code3, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode2(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = _CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder = base3 || base32;
      return [
        base32.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version2, code3, multihash) => {
  const codeOffset = encodingLength(version2);
  const hashOffset = codeOffset + encodingLength(code3);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes, 0);
  encodeTo(code3, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");
var readonly = {
  writable: false,
  configurable: false,
  enumerable: true
};
var hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
var version = "0.0.0-dev";
var deprecate = (range, message) => {
  if (range.test(version)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

// front/node_modules/multiformats/esm/src/hashes/hasher.js
var from2 = ({ name: name3, code: code3, encode: encode6 }) => new Hasher(name3, code3, encode6);
var Hasher = class {
  constructor(name3, code3, encode6) {
    this.name = name3;
    this.code = code3;
    this.encode = encode6;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// front/node_modules/@cef-ebsi/key-did-resolver/dist/codecs/jwk_jcs-pub.js
var jwk_jcs_pub_exports = {};
__export(jwk_jcs_pub_exports, {
  code: () => code2,
  decode: () => decode6,
  encode: () => encode5,
  name: () => name2,
  validateJwk: () => validateJwk
});
var import_lodash = __toESM(require_lodash(), 1);

// front/node_modules/uint8arrays/esm/src/util/as-uint8array.js
function asUint8Array(buf) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return buf;
}

// front/node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return asUint8Array(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}

// front/node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});

// front/node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// front/node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// front/node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// front/node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// front/node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// front/node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// front/node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var alphabetBytesToChars = alphabet.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode3(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode5(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "🚀",
  name: "base256emoji",
  encode: encode3,
  decode: decode5
});

// front/node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});
var sha = (name3) => async (data) => new Uint8Array(await crypto.subtle.digest(name3, data));
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// front/node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode4 = coerce;
var digest = (input) => create(code, encode4(input));
var identity2 = {
  code,
  name,
  encode: encode4,
  digest
};

// front/node_modules/multiformats/esm/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// front/node_modules/multiformats/esm/src/basics.js
var bases = {
  ...identity_exports,
  ...base2_exports,
  ...base8_exports,
  ...base10_exports,
  ...base16_exports,
  ...base32_exports,
  ...base36_exports,
  ...base58_exports,
  ...base64_exports,
  ...base256emoji_exports
};
var hashes = {
  ...sha2_browser_exports,
  ...identity_exports2
};

// front/node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name3, prefix, encode6, decode7) {
  return {
    name: name3,
    prefix,
    encoder: {
      name: name3,
      prefix,
      encode: encode6
    },
    decoder: { decode: decode7 }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string2 = "a";
  for (let i = 0; i < buf.length; i++) {
    string2 += String.fromCharCode(buf[i]);
  }
  return string2;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// front/node_modules/uint8arrays/esm/src/from-string.js
function fromString2(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}

// front/node_modules/uint8arrays/esm/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}

// front/node_modules/@cef-ebsi/key-did-resolver/dist/codecs/jwk_jcs-pub.js
var name2 = "jwk_jcs-pub";
var code2 = 60241;
function decode6(bytes) {
  const jwk = JSON.parse(toString2(bytes));
  validateJwk(jwk);
  if (JSON.stringify(jwk) !== JSON.stringify(canonicaliseJwk(jwk))) {
    throw new Error("The JWK embedded in the DID is not correctly formatted");
  }
  return jwk;
}
function encode5(jwk) {
  validateJwk(jwk);
  const components = canonicaliseJwk(jwk);
  return fromString2(JSON.stringify(components), "utf8");
}
function validateJwk(jwk) {
  validatePlainObject(jwk);
  switch (jwk["kty"]) {
    case "EC": {
      check(jwk["crv"], '"crv" (Curve) Parameter');
      check(jwk["x"], '"x" (X Coordinate) Parameter');
      check(jwk["y"], '"y" (Y Coordinate) Parameter');
      break;
    }
    case "OKP": {
      check(jwk["crv"], '"crv" (Subtype of Key Pair) Parameter');
      check(jwk["x"], '"x" (Public Key) Parameter');
      break;
    }
    case "RSA": {
      check(jwk["e"], '"e" (Exponent) Parameter');
      check(jwk["n"], '"n" (Modulus) Parameter');
      break;
    }
    default: {
      throw new Error('"kty" (Key Type) Parameter missing or unsupported');
    }
  }
}
function canonicaliseJwk(jwk) {
  let components;
  switch (jwk.kty) {
    case "EC": {
      components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
      break;
    }
    case "OKP": {
      components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
      break;
    }
    case "RSA": {
      components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
      break;
    }
  }
  return components;
}
function check(value, description) {
  if (typeof value !== "string" || !value) {
    throw new Error(`${description} missing or invalid`);
  }
}
function validatePlainObject(value) {
  if (!(0, import_lodash.default)(value)) {
    throw new Error("JWK must be an object");
  }
}

// front/node_modules/@cef-ebsi/key-did-resolver/dist/drivers/jwk_jcs-pub.js
var jwk_jcs_pub_exports2 = {};
__export(jwk_jcs_pub_exports2, {
  pubKeyBytesToDidDoc: () => pubKeyBytesToDidDoc
});
function pubKeyBytesToDidDoc(pubKeyBytes, identifier, contentType) {
  const did = `${KEY_DID_METHOD_PREFIX}${identifier}`;
  const keyId = `${did}#${identifier}`;
  let publicKeyJwk;
  try {
    publicKeyJwk = decode6(pubKeyBytes);
  } catch (error) {
    throw new InvalidDidError(error instanceof Error ? error.message : "Unknown error");
  }
  return {
    ...contentType === DID_LD_JSON && {
      "@context": [
        "https://www.w3.org/ns/did/v1",
        "https://w3id.org/security/suites/jws-2020/v1"
      ]
    },
    assertionMethod: [keyId],
    authentication: [keyId],
    capabilityDelegation: [keyId],
    capabilityInvocation: [keyId],
    id: did,
    verificationMethod: [
      {
        controller: did,
        id: keyId,
        publicKeyJwk,
        type: "JsonWebKey2020"
      }
    ]
  };
}

// front/node_modules/@cef-ebsi/key-did-resolver/dist/internals.js
var codecToDriver = {
  [code2]: jwk_jcs_pub_exports2
};
var encodePublicKey = (pubKeyBytes, code3) => {
  const size = pubKeyBytes.byteLength;
  const sizeOffset = varint_exports.encodingLength(code3);
  const messageOffset = sizeOffset;
  const bytes = new Uint8Array(messageOffset + size);
  varint_exports.encodeTo(code3, bytes, 0);
  bytes.set(pubKeyBytes, messageOffset);
  return base58btc.encode(bytes);
};
var decodePublicKey = (publicKey) => {
  const multicodecPubKey = base58btc.decode(publicKey);
  const [code3, sizeOffset] = varint_exports.decode(multicodecPubKey);
  const pubKeyBytes = multicodecPubKey.slice(sizeOffset);
  return {
    code: code3,
    pubKeyBytes
  };
};
function resolveDidDoc(did, contentType) {
  let pubKeyBytes;
  let code3;
  if (!did || typeof did !== "string") {
    throw new InvalidDidError("The DID must be a string");
  }
  if (!did.startsWith(KEY_DID_METHOD_PREFIX)) {
    throw new InvalidDidError(`The DID must start with "${KEY_DID_METHOD_PREFIX}"`);
  }
  const methodSpecificIdentifier = did.slice(KEY_DID_METHOD_PREFIX.length);
  if (!methodSpecificIdentifier.startsWith(base58btc.prefix)) {
    throw new InvalidDidError(`The method-specific identifier must start with "${base58btc.prefix}" (multibase base58btc-encoded)`);
  }
  try {
    const decodedResult = decodePublicKey(methodSpecificIdentifier);
    pubKeyBytes = decodedResult.pubKeyBytes;
    code3 = decodedResult.code;
  } catch {
    throw new InvalidDidError("The method-specific identifier is not a valid multibase base58btc-encoded string");
  }
  const driver = codecToDriver[code3];
  if (!driver) {
    throw new InvalidDidError(`Unsupported codec ${code3.toString()}`);
  }
  const didDocument = driver.pubKeyBytesToDidDoc(pubKeyBytes, methodSpecificIdentifier, contentType);
  return didDocument;
}

// front/node_modules/@cef-ebsi/key-did-resolver/dist/util.js
var util_exports = {};
__export(util_exports, {
  createDid: () => createDid,
  validateDid: () => validateDid,
  validateJwk: () => validateJwk2
});
function createDid(publicKey) {
  try {
    return `${KEY_DID_METHOD_PREFIX}${encodePublicKey(encode5(publicKey), code2)}`;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
function validateDid(did) {
  resolveDidDoc(did);
}
var { validateJwk: validateJwk2 } = jwk_jcs_pub_exports;

// front/node_modules/@peculiar/x509/build/x509.es.js
var import_reflect_metadata = __toESM(require_Reflect());

// front/node_modules/asn1js/build/index.es.js
var index_es_exports = {};
__export(index_es_exports, {
  Any: () => Any,
  BaseBlock: () => BaseBlock,
  BaseStringBlock: () => BaseStringBlock,
  BitString: () => BitString,
  BmpString: () => BmpString,
  Boolean: () => Boolean,
  CharacterString: () => CharacterString,
  Choice: () => Choice,
  Constructed: () => Constructed,
  DATE: () => DATE,
  DateTime: () => DateTime,
  Duration: () => Duration,
  EndOfContent: () => EndOfContent,
  Enumerated: () => Enumerated,
  GeneralString: () => GeneralString,
  GeneralizedTime: () => GeneralizedTime,
  GraphicString: () => GraphicString,
  HexBlock: () => HexBlock,
  IA5String: () => IA5String,
  Integer: () => Integer,
  Null: () => Null,
  NumericString: () => NumericString,
  ObjectIdentifier: () => ObjectIdentifier,
  OctetString: () => OctetString,
  Primitive: () => Primitive,
  PrintableString: () => PrintableString,
  RawData: () => RawData,
  RelativeObjectIdentifier: () => RelativeObjectIdentifier,
  Repeated: () => Repeated,
  Sequence: () => Sequence,
  Set: () => Set2,
  TIME: () => TIME,
  TeletexString: () => TeletexString,
  TimeOfDay: () => TimeOfDay,
  UTCTime: () => UTCTime,
  UniversalString: () => UniversalString,
  Utf8String: () => Utf8String,
  ValueBlock: () => ValueBlock,
  VideotexString: () => VideotexString,
  ViewWriter: () => ViewWriter,
  VisibleString: () => VisibleString,
  compareSchema: () => compareSchema,
  fromBER: () => fromBER,
  verifySchema: () => verifySchema
});
var pvtsutils = __toESM(require_build());

// front/node_modules/pvutils/build/utils.es.js
function utilFromBase(inputBuffer, inputBase) {
  let result = 0;
  if (inputBuffer.length === 1) {
    return inputBuffer[0];
  }
  for (let i = inputBuffer.length - 1; i >= 0; i--) {
    result += inputBuffer[inputBuffer.length - 1 - i] * Math.pow(2, inputBase * i);
  }
  return result;
}
function utilToBase(value, base3, reserved = -1) {
  const internalReserved = reserved;
  let internalValue = value;
  let result = 0;
  let biggest = Math.pow(2, base3);
  for (let i = 1; i < 8; i++) {
    if (value < biggest) {
      let retBuf;
      if (internalReserved < 0) {
        retBuf = new ArrayBuffer(i);
        result = i;
      } else {
        if (internalReserved < i) {
          return new ArrayBuffer(0);
        }
        retBuf = new ArrayBuffer(internalReserved);
        result = internalReserved;
      }
      const retView = new Uint8Array(retBuf);
      for (let j = i - 1; j >= 0; j--) {
        const basis = Math.pow(2, j * base3);
        retView[result - j - 1] = Math.floor(internalValue / basis);
        internalValue -= retView[result - j - 1] * basis;
      }
      return retBuf;
    }
    biggest *= Math.pow(2, base3);
  }
  return new ArrayBuffer(0);
}
function utilConcatView(...views) {
  let outputLength = 0;
  let prevLength = 0;
  for (const view of views) {
    outputLength += view.length;
  }
  const retBuf = new ArrayBuffer(outputLength);
  const retView = new Uint8Array(retBuf);
  for (const view of views) {
    retView.set(view, prevLength);
    prevLength += view.length;
  }
  return retView;
}
function utilDecodeTC() {
  const buf = new Uint8Array(this.valueHex);
  if (this.valueHex.byteLength >= 2) {
    const condition1 = buf[0] === 255 && buf[1] & 128;
    const condition2 = buf[0] === 0 && (buf[1] & 128) === 0;
    if (condition1 || condition2) {
      this.warnings.push("Needlessly long format");
    }
  }
  const bigIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
  const bigIntView = new Uint8Array(bigIntBuffer);
  for (let i = 0; i < this.valueHex.byteLength; i++) {
    bigIntView[i] = 0;
  }
  bigIntView[0] = buf[0] & 128;
  const bigInt = utilFromBase(bigIntView, 8);
  const smallIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
  const smallIntView = new Uint8Array(smallIntBuffer);
  for (let j = 0; j < this.valueHex.byteLength; j++) {
    smallIntView[j] = buf[j];
  }
  smallIntView[0] &= 127;
  const smallInt = utilFromBase(smallIntView, 8);
  return smallInt - bigInt;
}
function utilEncodeTC(value) {
  const modValue = value < 0 ? value * -1 : value;
  let bigInt = 128;
  for (let i = 1; i < 8; i++) {
    if (modValue <= bigInt) {
      if (value < 0) {
        const smallInt = bigInt - modValue;
        const retBuf2 = utilToBase(smallInt, 8, i);
        const retView2 = new Uint8Array(retBuf2);
        retView2[0] |= 128;
        return retBuf2;
      }
      let retBuf = utilToBase(modValue, 8, i);
      let retView = new Uint8Array(retBuf);
      if (retView[0] & 128) {
        const tempBuf = retBuf.slice(0);
        const tempView = new Uint8Array(tempBuf);
        retBuf = new ArrayBuffer(retBuf.byteLength + 1);
        retView = new Uint8Array(retBuf);
        for (let k = 0; k < tempBuf.byteLength; k++) {
          retView[k + 1] = tempView[k];
        }
        retView[0] = 0;
      }
      return retBuf;
    }
    bigInt *= Math.pow(2, 8);
  }
  return new ArrayBuffer(0);
}
function isEqualBuffer(inputBuffer1, inputBuffer2) {
  if (inputBuffer1.byteLength !== inputBuffer2.byteLength) {
    return false;
  }
  const view1 = new Uint8Array(inputBuffer1);
  const view2 = new Uint8Array(inputBuffer2);
  for (let i = 0; i < view1.length; i++) {
    if (view1[i] !== view2[i]) {
      return false;
    }
  }
  return true;
}
function padNumber(inputNumber, fullLength) {
  const str = inputNumber.toString(10);
  if (fullLength < str.length) {
    return "";
  }
  const dif = fullLength - str.length;
  const padding = new Array(dif);
  for (let i = 0; i < dif; i++) {
    padding[i] = "0";
  }
  const paddingString = padding.join("");
  return paddingString.concat(str);
}
var log2 = Math.log(2);

// front/node_modules/asn1js/build/index.es.js
function assertBigInt() {
  if (typeof BigInt === "undefined") {
    throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
  }
}
function concat2(buffers) {
  let outputLength = 0;
  let prevLength = 0;
  for (let i = 0; i < buffers.length; i++) {
    const buffer = buffers[i];
    outputLength += buffer.byteLength;
  }
  const retView = new Uint8Array(outputLength);
  for (let i = 0; i < buffers.length; i++) {
    const buffer = buffers[i];
    retView.set(new Uint8Array(buffer), prevLength);
    prevLength += buffer.byteLength;
  }
  return retView.buffer;
}
function checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength) {
  if (!(inputBuffer instanceof Uint8Array)) {
    baseBlock.error = "Wrong parameter: inputBuffer must be 'Uint8Array'";
    return false;
  }
  if (!inputBuffer.byteLength) {
    baseBlock.error = "Wrong parameter: inputBuffer has zero length";
    return false;
  }
  if (inputOffset < 0) {
    baseBlock.error = "Wrong parameter: inputOffset less than zero";
    return false;
  }
  if (inputLength < 0) {
    baseBlock.error = "Wrong parameter: inputLength less than zero";
    return false;
  }
  if (inputBuffer.byteLength - inputOffset - inputLength < 0) {
    baseBlock.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
    return false;
  }
  return true;
}
var ViewWriter = class {
  constructor() {
    this.items = [];
  }
  write(buf) {
    this.items.push(buf);
  }
  final() {
    return concat2(this.items);
  }
};
var powers2 = [new Uint8Array([1])];
var digitsString = "0123456789";
var NAME = "name";
var VALUE_HEX_VIEW = "valueHexView";
var IS_HEX_ONLY = "isHexOnly";
var ID_BLOCK = "idBlock";
var TAG_CLASS = "tagClass";
var TAG_NUMBER = "tagNumber";
var IS_CONSTRUCTED = "isConstructed";
var FROM_BER = "fromBER";
var TO_BER = "toBER";
var LOCAL = "local";
var EMPTY_STRING = "";
var EMPTY_BUFFER = new ArrayBuffer(0);
var EMPTY_VIEW = new Uint8Array(0);
var END_OF_CONTENT_NAME = "EndOfContent";
var OCTET_STRING_NAME = "OCTET STRING";
var BIT_STRING_NAME = "BIT STRING";
function HexBlock(BaseClass) {
  var _a3;
  return _a3 = class Some extends BaseClass {
    get valueHex() {
      return this.valueHexView.slice().buffer;
    }
    set valueHex(value) {
      this.valueHexView = new Uint8Array(value);
    }
    constructor(...args) {
      var _b;
      super(...args);
      const params = args[0] || {};
      this.isHexOnly = (_b = params.isHexOnly) !== null && _b !== void 0 ? _b : false;
      this.valueHexView = params.valueHex ? pvtsutils.BufferSourceConverter.toUint8Array(params.valueHex) : EMPTY_VIEW;
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
      const view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
      if (!checkBufferParams(this, view, inputOffset, inputLength)) {
        return -1;
      }
      const endLength = inputOffset + inputLength;
      this.valueHexView = view.subarray(inputOffset, endLength);
      if (!this.valueHexView.length) {
        this.warnings.push("Zero buffer length");
        return inputOffset;
      }
      this.blockLength = inputLength;
      return endLength;
    }
    toBER(sizeOnly = false) {
      if (!this.isHexOnly) {
        this.error = "Flag 'isHexOnly' is not set, abort";
        return EMPTY_BUFFER;
      }
      if (sizeOnly) {
        return new ArrayBuffer(this.valueHexView.byteLength);
      }
      return this.valueHexView.byteLength === this.valueHexView.buffer.byteLength ? this.valueHexView.buffer : this.valueHexView.slice().buffer;
    }
    toJSON() {
      return {
        ...super.toJSON(),
        isHexOnly: this.isHexOnly,
        valueHex: pvtsutils.Convert.ToHex(this.valueHexView)
      };
    }
  }, _a3.NAME = "hexBlock", _a3;
}
var LocalBaseBlock = class {
  static blockName() {
    return this.NAME;
  }
  get valueBeforeDecode() {
    return this.valueBeforeDecodeView.slice().buffer;
  }
  set valueBeforeDecode(value) {
    this.valueBeforeDecodeView = new Uint8Array(value);
  }
  constructor({ blockLength = 0, error = EMPTY_STRING, warnings = [], valueBeforeDecode = EMPTY_VIEW } = {}) {
    this.blockLength = blockLength;
    this.error = error;
    this.warnings = warnings;
    this.valueBeforeDecodeView = pvtsutils.BufferSourceConverter.toUint8Array(valueBeforeDecode);
  }
  toJSON() {
    return {
      blockName: this.constructor.NAME,
      blockLength: this.blockLength,
      error: this.error,
      warnings: this.warnings,
      valueBeforeDecode: pvtsutils.Convert.ToHex(this.valueBeforeDecodeView)
    };
  }
};
LocalBaseBlock.NAME = "baseBlock";
var ValueBlock = class extends LocalBaseBlock {
  fromBER(_inputBuffer, _inputOffset, _inputLength) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
  toBER(_sizeOnly, _writer) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
};
ValueBlock.NAME = "valueBlock";
var LocalIdentificationBlock = class extends HexBlock(LocalBaseBlock) {
  constructor({ idBlock = {} } = {}) {
    var _a3, _b, _c, _d;
    super();
    if (idBlock) {
      this.isHexOnly = (_a3 = idBlock.isHexOnly) !== null && _a3 !== void 0 ? _a3 : false;
      this.valueHexView = idBlock.valueHex ? pvtsutils.BufferSourceConverter.toUint8Array(idBlock.valueHex) : EMPTY_VIEW;
      this.tagClass = (_b = idBlock.tagClass) !== null && _b !== void 0 ? _b : -1;
      this.tagNumber = (_c = idBlock.tagNumber) !== null && _c !== void 0 ? _c : -1;
      this.isConstructed = (_d = idBlock.isConstructed) !== null && _d !== void 0 ? _d : false;
    } else {
      this.tagClass = -1;
      this.tagNumber = -1;
      this.isConstructed = false;
    }
  }
  toBER(sizeOnly = false) {
    let firstOctet = 0;
    switch (this.tagClass) {
      case 1:
        firstOctet |= 0;
        break;
      case 2:
        firstOctet |= 64;
        break;
      case 3:
        firstOctet |= 128;
        break;
      case 4:
        firstOctet |= 192;
        break;
      default:
        this.error = "Unknown tag class";
        return EMPTY_BUFFER;
    }
    if (this.isConstructed)
      firstOctet |= 32;
    if (this.tagNumber < 31 && !this.isHexOnly) {
      const retView2 = new Uint8Array(1);
      if (!sizeOnly) {
        let number = this.tagNumber;
        number &= 31;
        firstOctet |= number;
        retView2[0] = firstOctet;
      }
      return retView2.buffer;
    }
    if (!this.isHexOnly) {
      const encodedBuf = utilToBase(this.tagNumber, 7);
      const encodedView = new Uint8Array(encodedBuf);
      const size = encodedBuf.byteLength;
      const retView2 = new Uint8Array(size + 1);
      retView2[0] = firstOctet | 31;
      if (!sizeOnly) {
        for (let i = 0; i < size - 1; i++)
          retView2[i + 1] = encodedView[i] | 128;
        retView2[size] = encodedView[size - 1];
      }
      return retView2.buffer;
    }
    const retView = new Uint8Array(this.valueHexView.byteLength + 1);
    retView[0] = firstOctet | 31;
    if (!sizeOnly) {
      const curView = this.valueHexView;
      for (let i = 0; i < curView.length - 1; i++)
        retView[i + 1] = curView[i] | 128;
      retView[this.valueHexView.byteLength] = curView[curView.length - 1];
    }
    return retView.buffer;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    if (intBuffer.length === 0) {
      this.error = "Zero buffer length";
      return -1;
    }
    const tagClassMask = intBuffer[0] & 192;
    switch (tagClassMask) {
      case 0:
        this.tagClass = 1;
        break;
      case 64:
        this.tagClass = 2;
        break;
      case 128:
        this.tagClass = 3;
        break;
      case 192:
        this.tagClass = 4;
        break;
      default:
        this.error = "Unknown tag class";
        return -1;
    }
    this.isConstructed = (intBuffer[0] & 32) === 32;
    this.isHexOnly = false;
    const tagNumberMask = intBuffer[0] & 31;
    if (tagNumberMask !== 31) {
      this.tagNumber = tagNumberMask;
      this.blockLength = 1;
    } else {
      let count = 1;
      let intTagNumberBuffer = this.valueHexView = new Uint8Array(255);
      let tagNumberBufferMaxLength = 255;
      while (intBuffer[count] & 128) {
        intTagNumberBuffer[count - 1] = intBuffer[count] & 127;
        count++;
        if (count >= intBuffer.length) {
          this.error = "End of input reached before message was fully decoded";
          return -1;
        }
        if (count === tagNumberBufferMaxLength) {
          tagNumberBufferMaxLength += 255;
          const tempBufferView2 = new Uint8Array(tagNumberBufferMaxLength);
          for (let i = 0; i < intTagNumberBuffer.length; i++)
            tempBufferView2[i] = intTagNumberBuffer[i];
          intTagNumberBuffer = this.valueHexView = new Uint8Array(tagNumberBufferMaxLength);
        }
      }
      this.blockLength = count + 1;
      intTagNumberBuffer[count - 1] = intBuffer[count] & 127;
      const tempBufferView = new Uint8Array(count);
      for (let i = 0; i < count; i++)
        tempBufferView[i] = intTagNumberBuffer[i];
      intTagNumberBuffer = this.valueHexView = new Uint8Array(count);
      intTagNumberBuffer.set(tempBufferView);
      if (this.blockLength <= 9)
        this.tagNumber = utilFromBase(intTagNumberBuffer, 7);
      else {
        this.isHexOnly = true;
        this.warnings.push("Tag too long, represented as hex-coded");
      }
    }
    if (this.tagClass === 1 && this.isConstructed) {
      switch (this.tagNumber) {
        case 1:
        case 2:
        case 5:
        case 6:
        case 9:
        case 13:
        case 14:
        case 23:
        case 24:
        case 31:
        case 32:
        case 33:
        case 34:
          this.error = "Constructed encoding used for primitive type";
          return -1;
      }
    }
    return inputOffset + this.blockLength;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      tagClass: this.tagClass,
      tagNumber: this.tagNumber,
      isConstructed: this.isConstructed
    };
  }
};
LocalIdentificationBlock.NAME = "identificationBlock";
var LocalLengthBlock = class extends LocalBaseBlock {
  constructor({ lenBlock = {} } = {}) {
    var _a3, _b, _c;
    super();
    this.isIndefiniteForm = (_a3 = lenBlock.isIndefiniteForm) !== null && _a3 !== void 0 ? _a3 : false;
    this.longFormUsed = (_b = lenBlock.longFormUsed) !== null && _b !== void 0 ? _b : false;
    this.length = (_c = lenBlock.length) !== null && _c !== void 0 ? _c : 0;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const view = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, view, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = view.subarray(inputOffset, inputOffset + inputLength);
    if (intBuffer.length === 0) {
      this.error = "Zero buffer length";
      return -1;
    }
    if (intBuffer[0] === 255) {
      this.error = "Length block 0xFF is reserved by standard";
      return -1;
    }
    this.isIndefiniteForm = intBuffer[0] === 128;
    if (this.isIndefiniteForm) {
      this.blockLength = 1;
      return inputOffset + this.blockLength;
    }
    this.longFormUsed = !!(intBuffer[0] & 128);
    if (this.longFormUsed === false) {
      this.length = intBuffer[0];
      this.blockLength = 1;
      return inputOffset + this.blockLength;
    }
    const count = intBuffer[0] & 127;
    if (count > 8) {
      this.error = "Too big integer";
      return -1;
    }
    if (count + 1 > intBuffer.length) {
      this.error = "End of input reached before message was fully decoded";
      return -1;
    }
    const lenOffset = inputOffset + 1;
    const lengthBufferView = view.subarray(lenOffset, lenOffset + count);
    if (lengthBufferView[count - 1] === 0)
      this.warnings.push("Needlessly long encoded length");
    this.length = utilFromBase(lengthBufferView, 8);
    if (this.longFormUsed && this.length <= 127)
      this.warnings.push("Unnecessary usage of long length form");
    this.blockLength = count + 1;
    return inputOffset + this.blockLength;
  }
  toBER(sizeOnly = false) {
    let retBuf;
    let retView;
    if (this.length > 127)
      this.longFormUsed = true;
    if (this.isIndefiniteForm) {
      retBuf = new ArrayBuffer(1);
      if (sizeOnly === false) {
        retView = new Uint8Array(retBuf);
        retView[0] = 128;
      }
      return retBuf;
    }
    if (this.longFormUsed) {
      const encodedBuf = utilToBase(this.length, 8);
      if (encodedBuf.byteLength > 127) {
        this.error = "Too big length";
        return EMPTY_BUFFER;
      }
      retBuf = new ArrayBuffer(encodedBuf.byteLength + 1);
      if (sizeOnly)
        return retBuf;
      const encodedView = new Uint8Array(encodedBuf);
      retView = new Uint8Array(retBuf);
      retView[0] = encodedBuf.byteLength | 128;
      for (let i = 0; i < encodedBuf.byteLength; i++)
        retView[i + 1] = encodedView[i];
      return retBuf;
    }
    retBuf = new ArrayBuffer(1);
    if (sizeOnly === false) {
      retView = new Uint8Array(retBuf);
      retView[0] = this.length;
    }
    return retBuf;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      longFormUsed: this.longFormUsed,
      length: this.length
    };
  }
};
LocalLengthBlock.NAME = "lengthBlock";
var typeStore = {};
var BaseBlock = class extends LocalBaseBlock {
  constructor({ name: name3 = EMPTY_STRING, optional = false, primitiveSchema, ...parameters } = {}, valueBlockType) {
    super(parameters);
    this.name = name3;
    this.optional = optional;
    if (primitiveSchema) {
      this.primitiveSchema = primitiveSchema;
    }
    this.idBlock = new LocalIdentificationBlock(parameters);
    this.lenBlock = new LocalLengthBlock(parameters);
    this.valueBlock = valueBlockType ? new valueBlockType(parameters) : new ValueBlock(parameters);
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
    if (resultOffset === -1) {
      this.error = this.valueBlock.error;
      return resultOffset;
    }
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    if (!this.valueBlock.error.length)
      this.blockLength += this.valueBlock.blockLength;
    return resultOffset;
  }
  toBER(sizeOnly, writer) {
    const _writer = writer || new ViewWriter();
    if (!writer) {
      prepareIndefiniteForm(this);
    }
    const idBlockBuf = this.idBlock.toBER(sizeOnly);
    _writer.write(idBlockBuf);
    if (this.lenBlock.isIndefiniteForm) {
      _writer.write(new Uint8Array([128]).buffer);
      this.valueBlock.toBER(sizeOnly, _writer);
      _writer.write(new ArrayBuffer(2));
    } else {
      const valueBlockBuf = this.valueBlock.toBER(sizeOnly);
      this.lenBlock.length = valueBlockBuf.byteLength;
      const lenBlockBuf = this.lenBlock.toBER(sizeOnly);
      _writer.write(lenBlockBuf);
      _writer.write(valueBlockBuf);
    }
    if (!writer) {
      return _writer.final();
    }
    return EMPTY_BUFFER;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      idBlock: this.idBlock.toJSON(),
      lenBlock: this.lenBlock.toJSON(),
      valueBlock: this.valueBlock.toJSON(),
      name: this.name,
      optional: this.optional
    };
    if (this.primitiveSchema)
      object.primitiveSchema = this.primitiveSchema.toJSON();
    return object;
  }
  toString(encoding = "ascii") {
    if (encoding === "ascii") {
      return this.onAsciiEncoding();
    }
    return pvtsutils.Convert.ToHex(this.toBER());
  }
  onAsciiEncoding() {
    const name3 = this.constructor.NAME;
    const value = pvtsutils.Convert.ToHex(this.valueBlock.valueBeforeDecodeView);
    return `${name3} : ${value}`;
  }
  isEqual(other) {
    if (this === other) {
      return true;
    }
    if (!(other instanceof this.constructor)) {
      return false;
    }
    const thisRaw = this.toBER();
    const otherRaw = other.toBER();
    return isEqualBuffer(thisRaw, otherRaw);
  }
};
BaseBlock.NAME = "BaseBlock";
function prepareIndefiniteForm(baseBlock) {
  var _a3;
  if (baseBlock instanceof typeStore.Constructed) {
    for (const value of baseBlock.valueBlock.value) {
      if (prepareIndefiniteForm(value)) {
        baseBlock.lenBlock.isIndefiniteForm = true;
      }
    }
  }
  return !!((_a3 = baseBlock.lenBlock) === null || _a3 === void 0 ? void 0 : _a3.isIndefiniteForm);
}
var BaseStringBlock = class extends BaseBlock {
  getValue() {
    return this.valueBlock.value;
  }
  setValue(value) {
    this.valueBlock.value = value;
  }
  constructor({ value = EMPTY_STRING, ...parameters } = {}, stringValueBlockType) {
    super(parameters, stringValueBlockType);
    if (value) {
      this.fromString(value);
    }
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
    if (resultOffset === -1) {
      this.error = this.valueBlock.error;
      return resultOffset;
    }
    this.fromBuffer(this.valueBlock.valueHexView);
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    if (!this.valueBlock.error.length)
      this.blockLength += this.valueBlock.blockLength;
    return resultOffset;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
  }
};
BaseStringBlock.NAME = "BaseStringBlock";
var LocalPrimitiveValueBlock = class extends HexBlock(ValueBlock) {
  constructor({ isHexOnly = true, ...parameters } = {}) {
    super(parameters);
    this.isHexOnly = isHexOnly;
  }
};
LocalPrimitiveValueBlock.NAME = "PrimitiveValueBlock";
var _a$w;
var Primitive = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalPrimitiveValueBlock);
    this.idBlock.isConstructed = false;
  }
};
_a$w = Primitive;
(() => {
  typeStore.Primitive = _a$w;
})();
Primitive.NAME = "PRIMITIVE";
function localChangeType(inputObject, newType) {
  if (inputObject instanceof newType) {
    return inputObject;
  }
  const newObject = new newType();
  newObject.idBlock = inputObject.idBlock;
  newObject.lenBlock = inputObject.lenBlock;
  newObject.warnings = inputObject.warnings;
  newObject.valueBeforeDecodeView = inputObject.valueBeforeDecodeView;
  return newObject;
}
function localFromBER(inputBuffer, inputOffset = 0, inputLength = inputBuffer.length) {
  const incomingOffset = inputOffset;
  let returnObject = new BaseBlock({}, ValueBlock);
  const baseBlock = new LocalBaseBlock();
  if (!checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength)) {
    returnObject.error = baseBlock.error;
    return {
      offset: -1,
      result: returnObject
    };
  }
  const intBuffer = inputBuffer.subarray(inputOffset, inputOffset + inputLength);
  if (!intBuffer.length) {
    returnObject.error = "Zero buffer length";
    return {
      offset: -1,
      result: returnObject
    };
  }
  let resultOffset = returnObject.idBlock.fromBER(inputBuffer, inputOffset, inputLength);
  if (returnObject.idBlock.warnings.length) {
    returnObject.warnings.concat(returnObject.idBlock.warnings);
  }
  if (resultOffset === -1) {
    returnObject.error = returnObject.idBlock.error;
    return {
      offset: -1,
      result: returnObject
    };
  }
  inputOffset = resultOffset;
  inputLength -= returnObject.idBlock.blockLength;
  resultOffset = returnObject.lenBlock.fromBER(inputBuffer, inputOffset, inputLength);
  if (returnObject.lenBlock.warnings.length) {
    returnObject.warnings.concat(returnObject.lenBlock.warnings);
  }
  if (resultOffset === -1) {
    returnObject.error = returnObject.lenBlock.error;
    return {
      offset: -1,
      result: returnObject
    };
  }
  inputOffset = resultOffset;
  inputLength -= returnObject.lenBlock.blockLength;
  if (!returnObject.idBlock.isConstructed && returnObject.lenBlock.isIndefiniteForm) {
    returnObject.error = "Indefinite length form used for primitive encoding form";
    return {
      offset: -1,
      result: returnObject
    };
  }
  let newASN1Type = BaseBlock;
  switch (returnObject.idBlock.tagClass) {
    case 1:
      if (returnObject.idBlock.tagNumber >= 37 && returnObject.idBlock.isHexOnly === false) {
        returnObject.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard";
        return {
          offset: -1,
          result: returnObject
        };
      }
      switch (returnObject.idBlock.tagNumber) {
        case 0:
          if (returnObject.idBlock.isConstructed && returnObject.lenBlock.length > 0) {
            returnObject.error = "Type [UNIVERSAL 0] is reserved";
            return {
              offset: -1,
              result: returnObject
            };
          }
          newASN1Type = typeStore.EndOfContent;
          break;
        case 1:
          newASN1Type = typeStore.Boolean;
          break;
        case 2:
          newASN1Type = typeStore.Integer;
          break;
        case 3:
          newASN1Type = typeStore.BitString;
          break;
        case 4:
          newASN1Type = typeStore.OctetString;
          break;
        case 5:
          newASN1Type = typeStore.Null;
          break;
        case 6:
          newASN1Type = typeStore.ObjectIdentifier;
          break;
        case 10:
          newASN1Type = typeStore.Enumerated;
          break;
        case 12:
          newASN1Type = typeStore.Utf8String;
          break;
        case 13:
          newASN1Type = typeStore.RelativeObjectIdentifier;
          break;
        case 14:
          newASN1Type = typeStore.TIME;
          break;
        case 15:
          returnObject.error = "[UNIVERSAL 15] is reserved by ASN.1 standard";
          return {
            offset: -1,
            result: returnObject
          };
        case 16:
          newASN1Type = typeStore.Sequence;
          break;
        case 17:
          newASN1Type = typeStore.Set;
          break;
        case 18:
          newASN1Type = typeStore.NumericString;
          break;
        case 19:
          newASN1Type = typeStore.PrintableString;
          break;
        case 20:
          newASN1Type = typeStore.TeletexString;
          break;
        case 21:
          newASN1Type = typeStore.VideotexString;
          break;
        case 22:
          newASN1Type = typeStore.IA5String;
          break;
        case 23:
          newASN1Type = typeStore.UTCTime;
          break;
        case 24:
          newASN1Type = typeStore.GeneralizedTime;
          break;
        case 25:
          newASN1Type = typeStore.GraphicString;
          break;
        case 26:
          newASN1Type = typeStore.VisibleString;
          break;
        case 27:
          newASN1Type = typeStore.GeneralString;
          break;
        case 28:
          newASN1Type = typeStore.UniversalString;
          break;
        case 29:
          newASN1Type = typeStore.CharacterString;
          break;
        case 30:
          newASN1Type = typeStore.BmpString;
          break;
        case 31:
          newASN1Type = typeStore.DATE;
          break;
        case 32:
          newASN1Type = typeStore.TimeOfDay;
          break;
        case 33:
          newASN1Type = typeStore.DateTime;
          break;
        case 34:
          newASN1Type = typeStore.Duration;
          break;
        default: {
          const newObject = returnObject.idBlock.isConstructed ? new typeStore.Constructed() : new typeStore.Primitive();
          newObject.idBlock = returnObject.idBlock;
          newObject.lenBlock = returnObject.lenBlock;
          newObject.warnings = returnObject.warnings;
          returnObject = newObject;
        }
      }
      break;
    case 2:
    case 3:
    case 4:
    default: {
      newASN1Type = returnObject.idBlock.isConstructed ? typeStore.Constructed : typeStore.Primitive;
    }
  }
  returnObject = localChangeType(returnObject, newASN1Type);
  resultOffset = returnObject.fromBER(inputBuffer, inputOffset, returnObject.lenBlock.isIndefiniteForm ? inputLength : returnObject.lenBlock.length);
  returnObject.valueBeforeDecodeView = inputBuffer.subarray(incomingOffset, incomingOffset + returnObject.blockLength);
  return {
    offset: resultOffset,
    result: returnObject
  };
}
function fromBER(inputBuffer) {
  if (!inputBuffer.byteLength) {
    const result = new BaseBlock({}, ValueBlock);
    result.error = "Input buffer has zero length";
    return {
      offset: -1,
      result
    };
  }
  return localFromBER(pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer).slice(), 0, inputBuffer.byteLength);
}
function checkLen(indefiniteLength, length2) {
  if (indefiniteLength) {
    return 1;
  }
  return length2;
}
var LocalConstructedValueBlock = class extends ValueBlock {
  constructor({ value = [], isIndefiniteForm = false, ...parameters } = {}) {
    super(parameters);
    this.value = value;
    this.isIndefiniteForm = isIndefiniteForm;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const view = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, view, inputOffset, inputLength)) {
      return -1;
    }
    this.valueBeforeDecodeView = view.subarray(inputOffset, inputOffset + inputLength);
    if (this.valueBeforeDecodeView.length === 0) {
      this.warnings.push("Zero buffer length");
      return inputOffset;
    }
    let currentOffset = inputOffset;
    while (checkLen(this.isIndefiniteForm, inputLength) > 0) {
      const returnObject = localFromBER(view, currentOffset, inputLength);
      if (returnObject.offset === -1) {
        this.error = returnObject.result.error;
        this.warnings.concat(returnObject.result.warnings);
        return -1;
      }
      currentOffset = returnObject.offset;
      this.blockLength += returnObject.result.blockLength;
      inputLength -= returnObject.result.blockLength;
      this.value.push(returnObject.result);
      if (this.isIndefiniteForm && returnObject.result.constructor.NAME === END_OF_CONTENT_NAME) {
        break;
      }
    }
    if (this.isIndefiniteForm) {
      if (this.value[this.value.length - 1].constructor.NAME === END_OF_CONTENT_NAME) {
        this.value.pop();
      } else {
        this.warnings.push("No EndOfContent block encoded");
      }
    }
    return currentOffset;
  }
  toBER(sizeOnly, writer) {
    const _writer = writer || new ViewWriter();
    for (let i = 0; i < this.value.length; i++) {
      this.value[i].toBER(sizeOnly, _writer);
    }
    if (!writer) {
      return _writer.final();
    }
    return EMPTY_BUFFER;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      value: []
    };
    for (const value of this.value) {
      object.value.push(value.toJSON());
    }
    return object;
  }
};
LocalConstructedValueBlock.NAME = "ConstructedValueBlock";
var _a$v;
var Constructed = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalConstructedValueBlock);
    this.idBlock.isConstructed = true;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
    if (resultOffset === -1) {
      this.error = this.valueBlock.error;
      return resultOffset;
    }
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    if (!this.valueBlock.error.length)
      this.blockLength += this.valueBlock.blockLength;
    return resultOffset;
  }
  onAsciiEncoding() {
    const values = [];
    for (const value of this.valueBlock.value) {
      values.push(value.toString("ascii").split("\n").map((o) => `  ${o}`).join("\n"));
    }
    const blockName = this.idBlock.tagClass === 3 ? `[${this.idBlock.tagNumber}]` : this.constructor.NAME;
    return values.length ? `${blockName} :
${values.join("\n")}` : `${blockName} :`;
  }
};
_a$v = Constructed;
(() => {
  typeStore.Constructed = _a$v;
})();
Constructed.NAME = "CONSTRUCTED";
var LocalEndOfContentValueBlock = class extends ValueBlock {
  fromBER(inputBuffer, inputOffset, _inputLength) {
    return inputOffset;
  }
  toBER(_sizeOnly) {
    return EMPTY_BUFFER;
  }
};
LocalEndOfContentValueBlock.override = "EndOfContentValueBlock";
var _a$u;
var EndOfContent = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalEndOfContentValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 0;
  }
};
_a$u = EndOfContent;
(() => {
  typeStore.EndOfContent = _a$u;
})();
EndOfContent.NAME = END_OF_CONTENT_NAME;
var _a$t;
var Null = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, ValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 5;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (this.lenBlock.length > 0)
      this.warnings.push("Non-zero length of value block for Null type");
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    this.blockLength += inputLength;
    if (inputOffset + inputLength > inputBuffer.byteLength) {
      this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
      return -1;
    }
    return inputOffset + inputLength;
  }
  toBER(sizeOnly, writer) {
    const retBuf = new ArrayBuffer(2);
    if (!sizeOnly) {
      const retView = new Uint8Array(retBuf);
      retView[0] = 5;
      retView[1] = 0;
    }
    if (writer) {
      writer.write(retBuf);
    }
    return retBuf;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME}`;
  }
};
_a$t = Null;
(() => {
  typeStore.Null = _a$t;
})();
Null.NAME = "NULL";
var LocalBooleanValueBlock = class extends HexBlock(ValueBlock) {
  get value() {
    for (const octet of this.valueHexView) {
      if (octet > 0) {
        return true;
      }
    }
    return false;
  }
  set value(value) {
    this.valueHexView[0] = value ? 255 : 0;
  }
  constructor({ value, ...parameters } = {}) {
    super(parameters);
    if (parameters.valueHex) {
      this.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(parameters.valueHex);
    } else {
      this.valueHexView = new Uint8Array(1);
    }
    if (value) {
      this.value = value;
    }
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    this.valueHexView = inputView.subarray(inputOffset, inputOffset + inputLength);
    if (inputLength > 1)
      this.warnings.push("Boolean value encoded in more then 1 octet");
    this.isHexOnly = true;
    utilDecodeTC.call(this);
    this.blockLength = inputLength;
    return inputOffset + inputLength;
  }
  toBER() {
    return this.valueHexView.slice();
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
};
LocalBooleanValueBlock.NAME = "BooleanValueBlock";
var _a$s;
var Boolean = class extends BaseBlock {
  getValue() {
    return this.valueBlock.value;
  }
  setValue(value) {
    this.valueBlock.value = value;
  }
  constructor(parameters = {}) {
    super(parameters, LocalBooleanValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 1;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.getValue}`;
  }
};
_a$s = Boolean;
(() => {
  typeStore.Boolean = _a$s;
})();
Boolean.NAME = "BOOLEAN";
var LocalOctetStringValueBlock = class extends HexBlock(LocalConstructedValueBlock) {
  constructor({ isConstructed = false, ...parameters } = {}) {
    super(parameters);
    this.isConstructed = isConstructed;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    let resultOffset = 0;
    if (this.isConstructed) {
      this.isHexOnly = false;
      resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
      if (resultOffset === -1)
        return resultOffset;
      for (let i = 0; i < this.value.length; i++) {
        const currentBlockName = this.value[i].constructor.NAME;
        if (currentBlockName === END_OF_CONTENT_NAME) {
          if (this.isIndefiniteForm)
            break;
          else {
            this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only";
            return -1;
          }
        }
        if (currentBlockName !== OCTET_STRING_NAME) {
          this.error = "OCTET STRING may consists of OCTET STRINGs only";
          return -1;
        }
      }
    } else {
      this.isHexOnly = true;
      resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
      this.blockLength = inputLength;
    }
    return resultOffset;
  }
  toBER(sizeOnly, writer) {
    if (this.isConstructed)
      return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
    return sizeOnly ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isConstructed: this.isConstructed
    };
  }
};
LocalOctetStringValueBlock.NAME = "OctetStringValueBlock";
var _a$r;
var OctetString = class extends BaseBlock {
  constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}) {
    var _b, _c;
    (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
    super({
      idBlock: {
        isConstructed: parameters.isConstructed,
        ...idBlock
      },
      lenBlock: {
        ...lenBlock,
        isIndefiniteForm: !!parameters.isIndefiniteForm
      },
      ...parameters
    }, LocalOctetStringValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 4;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    this.valueBlock.isConstructed = this.idBlock.isConstructed;
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    if (inputLength === 0) {
      if (this.idBlock.error.length === 0)
        this.blockLength += this.idBlock.blockLength;
      if (this.lenBlock.error.length === 0)
        this.blockLength += this.lenBlock.blockLength;
      return inputOffset;
    }
    if (!this.valueBlock.isConstructed) {
      const view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
      const buf = view.subarray(inputOffset, inputOffset + inputLength);
      try {
        if (buf.byteLength) {
          const asn = localFromBER(buf, 0, buf.byteLength);
          if (asn.offset !== -1 && asn.offset === inputLength) {
            this.valueBlock.value = [asn.result];
          }
        }
      } catch {
      }
    }
    return super.fromBER(inputBuffer, inputOffset, inputLength);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
      return Constructed.prototype.onAsciiEncoding.call(this);
    }
    const name3 = this.constructor.NAME;
    const value = pvtsutils.Convert.ToHex(this.valueBlock.valueHexView);
    return `${name3} : ${value}`;
  }
  getValue() {
    if (!this.idBlock.isConstructed) {
      return this.valueBlock.valueHexView.slice().buffer;
    }
    const array = [];
    for (const content of this.valueBlock.value) {
      if (content instanceof _a$r) {
        array.push(content.valueBlock.valueHexView);
      }
    }
    return pvtsutils.BufferSourceConverter.concat(array);
  }
};
_a$r = OctetString;
(() => {
  typeStore.OctetString = _a$r;
})();
OctetString.NAME = OCTET_STRING_NAME;
var LocalBitStringValueBlock = class extends HexBlock(LocalConstructedValueBlock) {
  constructor({ unusedBits = 0, isConstructed = false, ...parameters } = {}) {
    super(parameters);
    this.unusedBits = unusedBits;
    this.isConstructed = isConstructed;
    this.blockLength = this.valueHexView.byteLength;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (!inputLength) {
      return inputOffset;
    }
    let resultOffset = -1;
    if (this.isConstructed) {
      resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
      if (resultOffset === -1)
        return resultOffset;
      for (const value of this.value) {
        const currentBlockName = value.constructor.NAME;
        if (currentBlockName === END_OF_CONTENT_NAME) {
          if (this.isIndefiniteForm)
            break;
          else {
            this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only";
            return -1;
          }
        }
        if (currentBlockName !== BIT_STRING_NAME) {
          this.error = "BIT STRING may consists of BIT STRINGs only";
          return -1;
        }
        const valueBlock = value.valueBlock;
        if (this.unusedBits > 0 && valueBlock.unusedBits > 0) {
          this.error = 'Using of "unused bits" inside constructive BIT STRING allowed for least one only';
          return -1;
        }
        this.unusedBits = valueBlock.unusedBits;
      }
      return resultOffset;
    }
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    this.unusedBits = intBuffer[0];
    if (this.unusedBits > 7) {
      this.error = "Unused bits for BitString must be in range 0-7";
      return -1;
    }
    if (!this.unusedBits) {
      const buf = intBuffer.subarray(1);
      try {
        if (buf.byteLength) {
          const asn = localFromBER(buf, 0, buf.byteLength);
          if (asn.offset !== -1 && asn.offset === inputLength - 1) {
            this.value = [asn.result];
          }
        }
      } catch {
      }
    }
    this.valueHexView = intBuffer.subarray(1);
    this.blockLength = intBuffer.length;
    return inputOffset + inputLength;
  }
  toBER(sizeOnly, writer) {
    if (this.isConstructed) {
      return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
    }
    if (sizeOnly) {
      return new ArrayBuffer(this.valueHexView.byteLength + 1);
    }
    if (!this.valueHexView.byteLength) {
      return EMPTY_BUFFER;
    }
    const retView = new Uint8Array(this.valueHexView.length + 1);
    retView[0] = this.unusedBits;
    retView.set(this.valueHexView, 1);
    return retView.buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      unusedBits: this.unusedBits,
      isConstructed: this.isConstructed
    };
  }
};
LocalBitStringValueBlock.NAME = "BitStringValueBlock";
var _a$q;
var BitString = class extends BaseBlock {
  constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}) {
    var _b, _c;
    (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
    super({
      idBlock: {
        isConstructed: parameters.isConstructed,
        ...idBlock
      },
      lenBlock: {
        ...lenBlock,
        isIndefiniteForm: !!parameters.isIndefiniteForm
      },
      ...parameters
    }, LocalBitStringValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 3;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    this.valueBlock.isConstructed = this.idBlock.isConstructed;
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    return super.fromBER(inputBuffer, inputOffset, inputLength);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
      return Constructed.prototype.onAsciiEncoding.call(this);
    } else {
      const bits = [];
      const valueHex = this.valueBlock.valueHexView;
      for (const byte of valueHex) {
        bits.push(byte.toString(2).padStart(8, "0"));
      }
      const bitsStr = bits.join("");
      const name3 = this.constructor.NAME;
      const value = bitsStr.substring(0, bitsStr.length - this.valueBlock.unusedBits);
      return `${name3} : ${value}`;
    }
  }
};
_a$q = BitString;
(() => {
  typeStore.BitString = _a$q;
})();
BitString.NAME = BIT_STRING_NAME;
var _a$p;
function viewAdd(first, second) {
  const c = new Uint8Array([0]);
  const firstView = new Uint8Array(first);
  const secondView = new Uint8Array(second);
  let firstViewCopy = firstView.slice(0);
  const firstViewCopyLength = firstViewCopy.length - 1;
  const secondViewCopy = secondView.slice(0);
  const secondViewCopyLength = secondViewCopy.length - 1;
  let value = 0;
  const max = secondViewCopyLength < firstViewCopyLength ? firstViewCopyLength : secondViewCopyLength;
  let counter = 0;
  for (let i = max; i >= 0; i--, counter++) {
    switch (true) {
      case counter < secondViewCopy.length:
        value = firstViewCopy[firstViewCopyLength - counter] + secondViewCopy[secondViewCopyLength - counter] + c[0];
        break;
      default:
        value = firstViewCopy[firstViewCopyLength - counter] + c[0];
    }
    c[0] = value / 10;
    switch (true) {
      case counter >= firstViewCopy.length:
        firstViewCopy = utilConcatView(new Uint8Array([value % 10]), firstViewCopy);
        break;
      default:
        firstViewCopy[firstViewCopyLength - counter] = value % 10;
    }
  }
  if (c[0] > 0)
    firstViewCopy = utilConcatView(c, firstViewCopy);
  return firstViewCopy;
}
function power2(n) {
  if (n >= powers2.length) {
    for (let p = powers2.length; p <= n; p++) {
      const c = new Uint8Array([0]);
      let digits = powers2[p - 1].slice(0);
      for (let i = digits.length - 1; i >= 0; i--) {
        const newValue = new Uint8Array([(digits[i] << 1) + c[0]]);
        c[0] = newValue[0] / 10;
        digits[i] = newValue[0] % 10;
      }
      if (c[0] > 0)
        digits = utilConcatView(c, digits);
      powers2.push(digits);
    }
  }
  return powers2[n];
}
function viewSub(first, second) {
  let b = 0;
  const firstView = new Uint8Array(first);
  const secondView = new Uint8Array(second);
  const firstViewCopy = firstView.slice(0);
  const firstViewCopyLength = firstViewCopy.length - 1;
  const secondViewCopy = secondView.slice(0);
  const secondViewCopyLength = secondViewCopy.length - 1;
  let value;
  let counter = 0;
  for (let i = secondViewCopyLength; i >= 0; i--, counter++) {
    value = firstViewCopy[firstViewCopyLength - counter] - secondViewCopy[secondViewCopyLength - counter] - b;
    switch (true) {
      case value < 0:
        b = 1;
        firstViewCopy[firstViewCopyLength - counter] = value + 10;
        break;
      default:
        b = 0;
        firstViewCopy[firstViewCopyLength - counter] = value;
    }
  }
  if (b > 0) {
    for (let i = firstViewCopyLength - secondViewCopyLength + 1; i >= 0; i--, counter++) {
      value = firstViewCopy[firstViewCopyLength - counter] - b;
      if (value < 0) {
        b = 1;
        firstViewCopy[firstViewCopyLength - counter] = value + 10;
      } else {
        b = 0;
        firstViewCopy[firstViewCopyLength - counter] = value;
        break;
      }
    }
  }
  return firstViewCopy.slice();
}
var LocalIntegerValueBlock = class extends HexBlock(ValueBlock) {
  setValueHex() {
    if (this.valueHexView.length >= 4) {
      this.warnings.push("Too big Integer for decoding, hex only");
      this.isHexOnly = true;
      this._valueDec = 0;
    } else {
      this.isHexOnly = false;
      if (this.valueHexView.length > 0) {
        this._valueDec = utilDecodeTC.call(this);
      }
    }
  }
  constructor({ value, ...parameters } = {}) {
    super(parameters);
    this._valueDec = 0;
    if (parameters.valueHex) {
      this.setValueHex();
    }
    if (value !== void 0) {
      this.valueDec = value;
    }
  }
  set valueDec(v) {
    this._valueDec = v;
    this.isHexOnly = false;
    this.valueHexView = new Uint8Array(utilEncodeTC(v));
  }
  get valueDec() {
    return this._valueDec;
  }
  fromDER(inputBuffer, inputOffset, inputLength, expectedLength = 0) {
    const offset = this.fromBER(inputBuffer, inputOffset, inputLength);
    if (offset === -1)
      return offset;
    const view = this.valueHexView;
    if (view[0] === 0 && (view[1] & 128) !== 0) {
      this.valueHexView = view.subarray(1);
    } else {
      if (expectedLength !== 0) {
        if (view.length < expectedLength) {
          if (expectedLength - view.length > 1)
            expectedLength = view.length + 1;
          this.valueHexView = view.subarray(expectedLength - view.length);
        }
      }
    }
    return offset;
  }
  toDER(sizeOnly = false) {
    const view = this.valueHexView;
    switch (true) {
      case (view[0] & 128) !== 0:
        {
          const updatedView = new Uint8Array(this.valueHexView.length + 1);
          updatedView[0] = 0;
          updatedView.set(view, 1);
          this.valueHexView = updatedView;
        }
        break;
      case (view[0] === 0 && (view[1] & 128) === 0):
        {
          this.valueHexView = this.valueHexView.subarray(1);
        }
        break;
    }
    return this.toBER(sizeOnly);
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
    if (resultOffset === -1) {
      return resultOffset;
    }
    this.setValueHex();
    return resultOffset;
  }
  toBER(sizeOnly) {
    return sizeOnly ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
  toString() {
    const firstBit = this.valueHexView.length * 8 - 1;
    let digits = new Uint8Array(this.valueHexView.length * 8 / 3);
    let bitNumber = 0;
    let currentByte;
    const asn1View = this.valueHexView;
    let result = "";
    let flag = false;
    for (let byteNumber = asn1View.byteLength - 1; byteNumber >= 0; byteNumber--) {
      currentByte = asn1View[byteNumber];
      for (let i = 0; i < 8; i++) {
        if ((currentByte & 1) === 1) {
          switch (bitNumber) {
            case firstBit:
              digits = viewSub(power2(bitNumber), digits);
              result = "-";
              break;
            default:
              digits = viewAdd(digits, power2(bitNumber));
          }
        }
        bitNumber++;
        currentByte >>= 1;
      }
    }
    for (let i = 0; i < digits.length; i++) {
      if (digits[i])
        flag = true;
      if (flag)
        result += digitsString.charAt(digits[i]);
    }
    if (flag === false)
      result += digitsString.charAt(0);
    return result;
  }
};
_a$p = LocalIntegerValueBlock;
LocalIntegerValueBlock.NAME = "IntegerValueBlock";
(() => {
  Object.defineProperty(_a$p.prototype, "valueHex", {
    set: function(v) {
      this.valueHexView = new Uint8Array(v);
      this.setValueHex();
    },
    get: function() {
      return this.valueHexView.slice().buffer;
    }
  });
})();
var _a$o;
var Integer = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalIntegerValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 2;
  }
  toBigInt() {
    assertBigInt();
    return BigInt(this.valueBlock.toString());
  }
  static fromBigInt(value) {
    assertBigInt();
    const bigIntValue = BigInt(value);
    const writer = new ViewWriter();
    const hex = bigIntValue.toString(16).replace(/^-/, "");
    const view = new Uint8Array(pvtsutils.Convert.FromHex(hex));
    if (bigIntValue < 0) {
      const first = new Uint8Array(view.length + (view[0] & 128 ? 1 : 0));
      first[0] |= 128;
      const firstInt = BigInt(`0x${pvtsutils.Convert.ToHex(first)}`);
      const secondInt = firstInt + bigIntValue;
      const second = pvtsutils.BufferSourceConverter.toUint8Array(pvtsutils.Convert.FromHex(secondInt.toString(16)));
      second[0] |= 128;
      writer.write(second);
    } else {
      if (view[0] & 128) {
        writer.write(new Uint8Array([0]));
      }
      writer.write(view);
    }
    const res = new _a$o({ valueHex: writer.final() });
    return res;
  }
  convertToDER() {
    const integer = new _a$o({ valueHex: this.valueBlock.valueHexView });
    integer.valueBlock.toDER();
    return integer;
  }
  convertFromDER() {
    return new _a$o({
      valueHex: this.valueBlock.valueHexView[0] === 0 ? this.valueBlock.valueHexView.subarray(1) : this.valueBlock.valueHexView
    });
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
  }
};
_a$o = Integer;
(() => {
  typeStore.Integer = _a$o;
})();
Integer.NAME = "INTEGER";
var _a$n;
var Enumerated = class extends Integer {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 10;
  }
};
_a$n = Enumerated;
(() => {
  typeStore.Enumerated = _a$n;
})();
Enumerated.NAME = "ENUMERATED";
var LocalSidValueBlock = class extends HexBlock(ValueBlock) {
  constructor({ valueDec = -1, isFirstSid = false, ...parameters } = {}) {
    super(parameters);
    this.valueDec = valueDec;
    this.isFirstSid = isFirstSid;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (!inputLength) {
      return inputOffset;
    }
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    this.valueHexView = new Uint8Array(inputLength);
    for (let i = 0; i < inputLength; i++) {
      this.valueHexView[i] = intBuffer[i] & 127;
      this.blockLength++;
      if ((intBuffer[i] & 128) === 0)
        break;
    }
    const tempView = new Uint8Array(this.blockLength);
    for (let i = 0; i < this.blockLength; i++) {
      tempView[i] = this.valueHexView[i];
    }
    this.valueHexView = tempView;
    if ((intBuffer[this.blockLength - 1] & 128) !== 0) {
      this.error = "End of input reached before message was fully decoded";
      return -1;
    }
    if (this.valueHexView[0] === 0)
      this.warnings.push("Needlessly long format of SID encoding");
    if (this.blockLength <= 8)
      this.valueDec = utilFromBase(this.valueHexView, 7);
    else {
      this.isHexOnly = true;
      this.warnings.push("Too big SID for decoding, hex only");
    }
    return inputOffset + this.blockLength;
  }
  set valueBigInt(value) {
    assertBigInt();
    let bits = BigInt(value).toString(2);
    while (bits.length % 7) {
      bits = "0" + bits;
    }
    const bytes = new Uint8Array(bits.length / 7);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(bits.slice(i * 7, i * 7 + 7), 2) + (i + 1 < bytes.length ? 128 : 0);
    }
    this.fromBER(bytes.buffer, 0, bytes.length);
  }
  toBER(sizeOnly) {
    if (this.isHexOnly) {
      if (sizeOnly)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const curView = this.valueHexView;
      const retView2 = new Uint8Array(this.blockLength);
      for (let i = 0; i < this.blockLength - 1; i++)
        retView2[i] = curView[i] | 128;
      retView2[this.blockLength - 1] = curView[this.blockLength - 1];
      return retView2.buffer;
    }
    const encodedBuf = utilToBase(this.valueDec, 7);
    if (encodedBuf.byteLength === 0) {
      this.error = "Error during encoding SID value";
      return EMPTY_BUFFER;
    }
    const retView = new Uint8Array(encodedBuf.byteLength);
    if (!sizeOnly) {
      const encodedView = new Uint8Array(encodedBuf);
      const len = encodedBuf.byteLength - 1;
      for (let i = 0; i < len; i++)
        retView[i] = encodedView[i] | 128;
      retView[len] = encodedView[len];
    }
    return retView;
  }
  toString() {
    let result = "";
    if (this.isHexOnly)
      result = pvtsutils.Convert.ToHex(this.valueHexView);
    else {
      if (this.isFirstSid) {
        let sidValue = this.valueDec;
        if (this.valueDec <= 39)
          result = "0.";
        else {
          if (this.valueDec <= 79) {
            result = "1.";
            sidValue -= 40;
          } else {
            result = "2.";
            sidValue -= 80;
          }
        }
        result += sidValue.toString();
      } else
        result = this.valueDec.toString();
    }
    return result;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec,
      isFirstSid: this.isFirstSid
    };
  }
};
LocalSidValueBlock.NAME = "sidBlock";
var LocalObjectIdentifierValueBlock = class extends ValueBlock {
  constructor({ value = EMPTY_STRING, ...parameters } = {}) {
    super(parameters);
    this.value = [];
    if (value) {
      this.fromString(value);
    }
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    let resultOffset = inputOffset;
    while (inputLength > 0) {
      const sidBlock = new LocalSidValueBlock();
      resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
      if (resultOffset === -1) {
        this.blockLength = 0;
        this.error = sidBlock.error;
        return resultOffset;
      }
      if (this.value.length === 0)
        sidBlock.isFirstSid = true;
      this.blockLength += sidBlock.blockLength;
      inputLength -= sidBlock.blockLength;
      this.value.push(sidBlock);
    }
    return resultOffset;
  }
  toBER(sizeOnly) {
    const retBuffers = [];
    for (let i = 0; i < this.value.length; i++) {
      const valueBuf = this.value[i].toBER(sizeOnly);
      if (valueBuf.byteLength === 0) {
        this.error = this.value[i].error;
        return EMPTY_BUFFER;
      }
      retBuffers.push(valueBuf);
    }
    return concat2(retBuffers);
  }
  fromString(string2) {
    this.value = [];
    let pos1 = 0;
    let pos2 = 0;
    let sid = "";
    let flag = false;
    do {
      pos2 = string2.indexOf(".", pos1);
      if (pos2 === -1)
        sid = string2.substring(pos1);
      else
        sid = string2.substring(pos1, pos2);
      pos1 = pos2 + 1;
      if (flag) {
        const sidBlock = this.value[0];
        let plus = 0;
        switch (sidBlock.valueDec) {
          case 0:
            break;
          case 1:
            plus = 40;
            break;
          case 2:
            plus = 80;
            break;
          default:
            this.value = [];
            return;
        }
        const parsedSID = parseInt(sid, 10);
        if (isNaN(parsedSID))
          return;
        sidBlock.valueDec = parsedSID + plus;
        flag = false;
      } else {
        const sidBlock = new LocalSidValueBlock();
        if (sid > Number.MAX_SAFE_INTEGER) {
          assertBigInt();
          const sidValue = BigInt(sid);
          sidBlock.valueBigInt = sidValue;
        } else {
          sidBlock.valueDec = parseInt(sid, 10);
          if (isNaN(sidBlock.valueDec))
            return;
        }
        if (!this.value.length) {
          sidBlock.isFirstSid = true;
          flag = true;
        }
        this.value.push(sidBlock);
      }
    } while (pos2 !== -1);
  }
  toString() {
    let result = "";
    let isHexOnly = false;
    for (let i = 0; i < this.value.length; i++) {
      isHexOnly = this.value[i].isHexOnly;
      let sidStr = this.value[i].toString();
      if (i !== 0)
        result = `${result}.`;
      if (isHexOnly) {
        sidStr = `{${sidStr}}`;
        if (this.value[i].isFirstSid)
          result = `2.{${sidStr} - 80}`;
        else
          result += sidStr;
      } else
        result += sidStr;
    }
    return result;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let i = 0; i < this.value.length; i++) {
      object.sidArray.push(this.value[i].toJSON());
    }
    return object;
  }
};
LocalObjectIdentifierValueBlock.NAME = "ObjectIdentifierValueBlock";
var _a$m;
var ObjectIdentifier = class extends BaseBlock {
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(value) {
    this.valueBlock.fromString(value);
  }
  constructor(parameters = {}) {
    super(parameters, LocalObjectIdentifierValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 6;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
};
_a$m = ObjectIdentifier;
(() => {
  typeStore.ObjectIdentifier = _a$m;
})();
ObjectIdentifier.NAME = "OBJECT IDENTIFIER";
var LocalRelativeSidValueBlock = class extends HexBlock(LocalBaseBlock) {
  constructor({ valueDec = 0, ...parameters } = {}) {
    super(parameters);
    this.valueDec = valueDec;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (inputLength === 0)
      return inputOffset;
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength))
      return -1;
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    this.valueHexView = new Uint8Array(inputLength);
    for (let i = 0; i < inputLength; i++) {
      this.valueHexView[i] = intBuffer[i] & 127;
      this.blockLength++;
      if ((intBuffer[i] & 128) === 0)
        break;
    }
    const tempView = new Uint8Array(this.blockLength);
    for (let i = 0; i < this.blockLength; i++)
      tempView[i] = this.valueHexView[i];
    this.valueHexView = tempView;
    if ((intBuffer[this.blockLength - 1] & 128) !== 0) {
      this.error = "End of input reached before message was fully decoded";
      return -1;
    }
    if (this.valueHexView[0] === 0)
      this.warnings.push("Needlessly long format of SID encoding");
    if (this.blockLength <= 8)
      this.valueDec = utilFromBase(this.valueHexView, 7);
    else {
      this.isHexOnly = true;
      this.warnings.push("Too big SID for decoding, hex only");
    }
    return inputOffset + this.blockLength;
  }
  toBER(sizeOnly) {
    if (this.isHexOnly) {
      if (sizeOnly)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const curView = this.valueHexView;
      const retView2 = new Uint8Array(this.blockLength);
      for (let i = 0; i < this.blockLength - 1; i++)
        retView2[i] = curView[i] | 128;
      retView2[this.blockLength - 1] = curView[this.blockLength - 1];
      return retView2.buffer;
    }
    const encodedBuf = utilToBase(this.valueDec, 7);
    if (encodedBuf.byteLength === 0) {
      this.error = "Error during encoding SID value";
      return EMPTY_BUFFER;
    }
    const retView = new Uint8Array(encodedBuf.byteLength);
    if (!sizeOnly) {
      const encodedView = new Uint8Array(encodedBuf);
      const len = encodedBuf.byteLength - 1;
      for (let i = 0; i < len; i++)
        retView[i] = encodedView[i] | 128;
      retView[len] = encodedView[len];
    }
    return retView.buffer;
  }
  toString() {
    let result = "";
    if (this.isHexOnly)
      result = pvtsutils.Convert.ToHex(this.valueHexView);
    else {
      result = this.valueDec.toString();
    }
    return result;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
};
LocalRelativeSidValueBlock.NAME = "relativeSidBlock";
var LocalRelativeObjectIdentifierValueBlock = class extends ValueBlock {
  constructor({ value = EMPTY_STRING, ...parameters } = {}) {
    super(parameters);
    this.value = [];
    if (value) {
      this.fromString(value);
    }
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    let resultOffset = inputOffset;
    while (inputLength > 0) {
      const sidBlock = new LocalRelativeSidValueBlock();
      resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
      if (resultOffset === -1) {
        this.blockLength = 0;
        this.error = sidBlock.error;
        return resultOffset;
      }
      this.blockLength += sidBlock.blockLength;
      inputLength -= sidBlock.blockLength;
      this.value.push(sidBlock);
    }
    return resultOffset;
  }
  toBER(sizeOnly, _writer) {
    const retBuffers = [];
    for (let i = 0; i < this.value.length; i++) {
      const valueBuf = this.value[i].toBER(sizeOnly);
      if (valueBuf.byteLength === 0) {
        this.error = this.value[i].error;
        return EMPTY_BUFFER;
      }
      retBuffers.push(valueBuf);
    }
    return concat2(retBuffers);
  }
  fromString(string2) {
    this.value = [];
    let pos1 = 0;
    let pos2 = 0;
    let sid = "";
    do {
      pos2 = string2.indexOf(".", pos1);
      if (pos2 === -1)
        sid = string2.substring(pos1);
      else
        sid = string2.substring(pos1, pos2);
      pos1 = pos2 + 1;
      const sidBlock = new LocalRelativeSidValueBlock();
      sidBlock.valueDec = parseInt(sid, 10);
      if (isNaN(sidBlock.valueDec))
        return true;
      this.value.push(sidBlock);
    } while (pos2 !== -1);
    return true;
  }
  toString() {
    let result = "";
    let isHexOnly = false;
    for (let i = 0; i < this.value.length; i++) {
      isHexOnly = this.value[i].isHexOnly;
      let sidStr = this.value[i].toString();
      if (i !== 0)
        result = `${result}.`;
      if (isHexOnly) {
        sidStr = `{${sidStr}}`;
        result += sidStr;
      } else
        result += sidStr;
    }
    return result;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let i = 0; i < this.value.length; i++)
      object.sidArray.push(this.value[i].toJSON());
    return object;
  }
};
LocalRelativeObjectIdentifierValueBlock.NAME = "RelativeObjectIdentifierValueBlock";
var _a$l;
var RelativeObjectIdentifier = class extends BaseBlock {
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(value) {
    this.valueBlock.fromString(value);
  }
  constructor(parameters = {}) {
    super(parameters, LocalRelativeObjectIdentifierValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 13;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
};
_a$l = RelativeObjectIdentifier;
(() => {
  typeStore.RelativeObjectIdentifier = _a$l;
})();
RelativeObjectIdentifier.NAME = "RelativeObjectIdentifier";
var _a$k;
var Sequence = class extends Constructed {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 16;
  }
};
_a$k = Sequence;
(() => {
  typeStore.Sequence = _a$k;
})();
Sequence.NAME = "SEQUENCE";
var _a$j;
var Set2 = class extends Constructed {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 17;
  }
};
_a$j = Set2;
(() => {
  typeStore.Set = _a$j;
})();
Set2.NAME = "SET";
var LocalStringValueBlock = class extends HexBlock(ValueBlock) {
  constructor({ ...parameters } = {}) {
    super(parameters);
    this.isHexOnly = true;
    this.value = EMPTY_STRING;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
};
LocalStringValueBlock.NAME = "StringValueBlock";
var LocalSimpleStringValueBlock = class extends LocalStringValueBlock {
};
LocalSimpleStringValueBlock.NAME = "SimpleStringValueBlock";
var LocalSimpleStringBlock = class extends BaseStringBlock {
  constructor({ ...parameters } = {}) {
    super(parameters, LocalSimpleStringValueBlock);
  }
  fromBuffer(inputBuffer) {
    this.valueBlock.value = String.fromCharCode.apply(null, pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer));
  }
  fromString(inputString) {
    const strLen = inputString.length;
    const view = this.valueBlock.valueHexView = new Uint8Array(strLen);
    for (let i = 0; i < strLen; i++)
      view[i] = inputString.charCodeAt(i);
    this.valueBlock.value = inputString;
  }
};
LocalSimpleStringBlock.NAME = "SIMPLE STRING";
var LocalUtf8StringValueBlock = class extends LocalSimpleStringBlock {
  fromBuffer(inputBuffer) {
    this.valueBlock.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    try {
      this.valueBlock.value = pvtsutils.Convert.ToUtf8String(inputBuffer);
    } catch (ex) {
      this.warnings.push(`Error during "decodeURIComponent": ${ex}, using raw string`);
      this.valueBlock.value = pvtsutils.Convert.ToBinary(inputBuffer);
    }
  }
  fromString(inputString) {
    this.valueBlock.valueHexView = new Uint8Array(pvtsutils.Convert.FromUtf8String(inputString));
    this.valueBlock.value = inputString;
  }
};
LocalUtf8StringValueBlock.NAME = "Utf8StringValueBlock";
var _a$i;
var Utf8String = class extends LocalUtf8StringValueBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 12;
  }
};
_a$i = Utf8String;
(() => {
  typeStore.Utf8String = _a$i;
})();
Utf8String.NAME = "UTF8String";
var LocalBmpStringValueBlock = class extends LocalSimpleStringBlock {
  fromBuffer(inputBuffer) {
    this.valueBlock.value = pvtsutils.Convert.ToUtf16String(inputBuffer);
    this.valueBlock.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
  }
  fromString(inputString) {
    this.valueBlock.value = inputString;
    this.valueBlock.valueHexView = new Uint8Array(pvtsutils.Convert.FromUtf16String(inputString));
  }
};
LocalBmpStringValueBlock.NAME = "BmpStringValueBlock";
var _a$h;
var BmpString = class extends LocalBmpStringValueBlock {
  constructor({ ...parameters } = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 30;
  }
};
_a$h = BmpString;
(() => {
  typeStore.BmpString = _a$h;
})();
BmpString.NAME = "BMPString";
var LocalUniversalStringValueBlock = class extends LocalSimpleStringBlock {
  fromBuffer(inputBuffer) {
    const copyBuffer = ArrayBuffer.isView(inputBuffer) ? inputBuffer.slice().buffer : inputBuffer.slice(0);
    const valueView = new Uint8Array(copyBuffer);
    for (let i = 0; i < valueView.length; i += 4) {
      valueView[i] = valueView[i + 3];
      valueView[i + 1] = valueView[i + 2];
      valueView[i + 2] = 0;
      valueView[i + 3] = 0;
    }
    this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(copyBuffer));
  }
  fromString(inputString) {
    const strLength = inputString.length;
    const valueHexView = this.valueBlock.valueHexView = new Uint8Array(strLength * 4);
    for (let i = 0; i < strLength; i++) {
      const codeBuf = utilToBase(inputString.charCodeAt(i), 8);
      const codeView = new Uint8Array(codeBuf);
      if (codeView.length > 4)
        continue;
      const dif = 4 - codeView.length;
      for (let j = codeView.length - 1; j >= 0; j--)
        valueHexView[i * 4 + j + dif] = codeView[j];
    }
    this.valueBlock.value = inputString;
  }
};
LocalUniversalStringValueBlock.NAME = "UniversalStringValueBlock";
var _a$g;
var UniversalString = class extends LocalUniversalStringValueBlock {
  constructor({ ...parameters } = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 28;
  }
};
_a$g = UniversalString;
(() => {
  typeStore.UniversalString = _a$g;
})();
UniversalString.NAME = "UniversalString";
var _a$f;
var NumericString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 18;
  }
};
_a$f = NumericString;
(() => {
  typeStore.NumericString = _a$f;
})();
NumericString.NAME = "NumericString";
var _a$e;
var PrintableString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 19;
  }
};
_a$e = PrintableString;
(() => {
  typeStore.PrintableString = _a$e;
})();
PrintableString.NAME = "PrintableString";
var _a$d;
var TeletexString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 20;
  }
};
_a$d = TeletexString;
(() => {
  typeStore.TeletexString = _a$d;
})();
TeletexString.NAME = "TeletexString";
var _a$c;
var VideotexString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 21;
  }
};
_a$c = VideotexString;
(() => {
  typeStore.VideotexString = _a$c;
})();
VideotexString.NAME = "VideotexString";
var _a$b;
var IA5String = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 22;
  }
};
_a$b = IA5String;
(() => {
  typeStore.IA5String = _a$b;
})();
IA5String.NAME = "IA5String";
var _a$a;
var GraphicString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 25;
  }
};
_a$a = GraphicString;
(() => {
  typeStore.GraphicString = _a$a;
})();
GraphicString.NAME = "GraphicString";
var _a$9;
var VisibleString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 26;
  }
};
_a$9 = VisibleString;
(() => {
  typeStore.VisibleString = _a$9;
})();
VisibleString.NAME = "VisibleString";
var _a$8;
var GeneralString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 27;
  }
};
_a$8 = GeneralString;
(() => {
  typeStore.GeneralString = _a$8;
})();
GeneralString.NAME = "GeneralString";
var _a$7;
var CharacterString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 29;
  }
};
_a$7 = CharacterString;
(() => {
  typeStore.CharacterString = _a$7;
})();
CharacterString.NAME = "CharacterString";
var _a$6;
var UTCTime = class extends VisibleString {
  constructor({ value, valueDate, ...parameters } = {}) {
    super(parameters);
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    if (value) {
      this.fromString(value);
      this.valueBlock.valueHexView = new Uint8Array(value.length);
      for (let i = 0; i < value.length; i++)
        this.valueBlock.valueHexView[i] = value.charCodeAt(i);
    }
    if (valueDate) {
      this.fromDate(valueDate);
      this.valueBlock.valueHexView = new Uint8Array(this.toBuffer());
    }
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 23;
  }
  fromBuffer(inputBuffer) {
    this.fromString(String.fromCharCode.apply(null, pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer)));
  }
  toBuffer() {
    const str = this.toString();
    const buffer = new ArrayBuffer(str.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < str.length; i++)
      view[i] = str.charCodeAt(i);
    return buffer;
  }
  fromDate(inputDate) {
    this.year = inputDate.getUTCFullYear();
    this.month = inputDate.getUTCMonth() + 1;
    this.day = inputDate.getUTCDate();
    this.hour = inputDate.getUTCHours();
    this.minute = inputDate.getUTCMinutes();
    this.second = inputDate.getUTCSeconds();
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
  }
  fromString(inputString) {
    const parser = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig;
    const parserArray = parser.exec(inputString);
    if (parserArray === null) {
      this.error = "Wrong input string for conversion";
      return;
    }
    const year = parseInt(parserArray[1], 10);
    if (year >= 50)
      this.year = 1900 + year;
    else
      this.year = 2e3 + year;
    this.month = parseInt(parserArray[2], 10);
    this.day = parseInt(parserArray[3], 10);
    this.hour = parseInt(parserArray[4], 10);
    this.minute = parseInt(parserArray[5], 10);
    this.second = parseInt(parserArray[6], 10);
  }
  toString(encoding = "iso") {
    if (encoding === "iso") {
      const outputArray = new Array(7);
      outputArray[0] = padNumber(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2);
      outputArray[1] = padNumber(this.month, 2);
      outputArray[2] = padNumber(this.day, 2);
      outputArray[3] = padNumber(this.hour, 2);
      outputArray[4] = padNumber(this.minute, 2);
      outputArray[5] = padNumber(this.second, 2);
      outputArray[6] = "Z";
      return outputArray.join("");
    }
    return super.toString(encoding);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second
    };
  }
};
_a$6 = UTCTime;
(() => {
  typeStore.UTCTime = _a$6;
})();
UTCTime.NAME = "UTCTime";
var _a$5;
var GeneralizedTime = class extends UTCTime {
  constructor(parameters = {}) {
    var _b;
    super(parameters);
    (_b = this.millisecond) !== null && _b !== void 0 ? _b : this.millisecond = 0;
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 24;
  }
  fromDate(inputDate) {
    super.fromDate(inputDate);
    this.millisecond = inputDate.getUTCMilliseconds();
  }
  toDate() {
    const utcDate = Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond);
    return new Date(utcDate);
  }
  fromString(inputString) {
    let isUTC = false;
    let timeString = "";
    let dateTimeString = "";
    let fractionPart = 0;
    let parser;
    let hourDifference = 0;
    let minuteDifference = 0;
    if (inputString[inputString.length - 1] === "Z") {
      timeString = inputString.substring(0, inputString.length - 1);
      isUTC = true;
    } else {
      const number = new Number(inputString[inputString.length - 1]);
      if (isNaN(number.valueOf()))
        throw new Error("Wrong input string for conversion");
      timeString = inputString;
    }
    if (isUTC) {
      if (timeString.indexOf("+") !== -1)
        throw new Error("Wrong input string for conversion");
      if (timeString.indexOf("-") !== -1)
        throw new Error("Wrong input string for conversion");
    } else {
      let multiplier = 1;
      let differencePosition = timeString.indexOf("+");
      let differenceString = "";
      if (differencePosition === -1) {
        differencePosition = timeString.indexOf("-");
        multiplier = -1;
      }
      if (differencePosition !== -1) {
        differenceString = timeString.substring(differencePosition + 1);
        timeString = timeString.substring(0, differencePosition);
        if (differenceString.length !== 2 && differenceString.length !== 4)
          throw new Error("Wrong input string for conversion");
        let number = parseInt(differenceString.substring(0, 2), 10);
        if (isNaN(number.valueOf()))
          throw new Error("Wrong input string for conversion");
        hourDifference = multiplier * number;
        if (differenceString.length === 4) {
          number = parseInt(differenceString.substring(2, 4), 10);
          if (isNaN(number.valueOf()))
            throw new Error("Wrong input string for conversion");
          minuteDifference = multiplier * number;
        }
      }
    }
    let fractionPointPosition = timeString.indexOf(".");
    if (fractionPointPosition === -1)
      fractionPointPosition = timeString.indexOf(",");
    if (fractionPointPosition !== -1) {
      const fractionPartCheck = new Number(`0${timeString.substring(fractionPointPosition)}`);
      if (isNaN(fractionPartCheck.valueOf()))
        throw new Error("Wrong input string for conversion");
      fractionPart = fractionPartCheck.valueOf();
      dateTimeString = timeString.substring(0, fractionPointPosition);
    } else
      dateTimeString = timeString;
    switch (true) {
      case dateTimeString.length === 8:
        parser = /(\d{4})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1)
          throw new Error("Wrong input string for conversion");
        break;
      case dateTimeString.length === 10:
        parser = /(\d{4})(\d{2})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1) {
          let fractionResult = 60 * fractionPart;
          this.minute = Math.floor(fractionResult);
          fractionResult = 60 * (fractionResult - this.minute);
          this.second = Math.floor(fractionResult);
          fractionResult = 1e3 * (fractionResult - this.second);
          this.millisecond = Math.floor(fractionResult);
        }
        break;
      case dateTimeString.length === 12:
        parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1) {
          let fractionResult = 60 * fractionPart;
          this.second = Math.floor(fractionResult);
          fractionResult = 1e3 * (fractionResult - this.second);
          this.millisecond = Math.floor(fractionResult);
        }
        break;
      case dateTimeString.length === 14:
        parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1) {
          const fractionResult = 1e3 * fractionPart;
          this.millisecond = Math.floor(fractionResult);
        }
        break;
      default:
        throw new Error("Wrong input string for conversion");
    }
    const parserArray = parser.exec(dateTimeString);
    if (parserArray === null)
      throw new Error("Wrong input string for conversion");
    for (let j = 1; j < parserArray.length; j++) {
      switch (j) {
        case 1:
          this.year = parseInt(parserArray[j], 10);
          break;
        case 2:
          this.month = parseInt(parserArray[j], 10);
          break;
        case 3:
          this.day = parseInt(parserArray[j], 10);
          break;
        case 4:
          this.hour = parseInt(parserArray[j], 10) + hourDifference;
          break;
        case 5:
          this.minute = parseInt(parserArray[j], 10) + minuteDifference;
          break;
        case 6:
          this.second = parseInt(parserArray[j], 10);
          break;
        default:
          throw new Error("Wrong input string for conversion");
      }
    }
    if (isUTC === false) {
      const tempDate = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
      this.year = tempDate.getUTCFullYear();
      this.month = tempDate.getUTCMonth();
      this.day = tempDate.getUTCDay();
      this.hour = tempDate.getUTCHours();
      this.minute = tempDate.getUTCMinutes();
      this.second = tempDate.getUTCSeconds();
      this.millisecond = tempDate.getUTCMilliseconds();
    }
  }
  toString(encoding = "iso") {
    if (encoding === "iso") {
      const outputArray = [];
      outputArray.push(padNumber(this.year, 4));
      outputArray.push(padNumber(this.month, 2));
      outputArray.push(padNumber(this.day, 2));
      outputArray.push(padNumber(this.hour, 2));
      outputArray.push(padNumber(this.minute, 2));
      outputArray.push(padNumber(this.second, 2));
      if (this.millisecond !== 0) {
        outputArray.push(".");
        outputArray.push(padNumber(this.millisecond, 3));
      }
      outputArray.push("Z");
      return outputArray.join("");
    }
    return super.toString(encoding);
  }
  toJSON() {
    return {
      ...super.toJSON(),
      millisecond: this.millisecond
    };
  }
};
_a$5 = GeneralizedTime;
(() => {
  typeStore.GeneralizedTime = _a$5;
})();
GeneralizedTime.NAME = "GeneralizedTime";
var _a$4;
var DATE = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 31;
  }
};
_a$4 = DATE;
(() => {
  typeStore.DATE = _a$4;
})();
DATE.NAME = "DATE";
var _a$3;
var TimeOfDay = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 32;
  }
};
_a$3 = TimeOfDay;
(() => {
  typeStore.TimeOfDay = _a$3;
})();
TimeOfDay.NAME = "TimeOfDay";
var _a$2;
var DateTime = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 33;
  }
};
_a$2 = DateTime;
(() => {
  typeStore.DateTime = _a$2;
})();
DateTime.NAME = "DateTime";
var _a$1;
var Duration = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 34;
  }
};
_a$1 = Duration;
(() => {
  typeStore.Duration = _a$1;
})();
Duration.NAME = "Duration";
var _a;
var TIME = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 14;
  }
};
_a = TIME;
(() => {
  typeStore.TIME = _a;
})();
TIME.NAME = "TIME";
var Any = class {
  constructor({ name: name3 = EMPTY_STRING, optional = false } = {}) {
    this.name = name3;
    this.optional = optional;
  }
};
var Choice = class extends Any {
  constructor({ value = [], ...parameters } = {}) {
    super(parameters);
    this.value = value;
  }
};
var Repeated = class extends Any {
  constructor({ value = new Any(), local = false, ...parameters } = {}) {
    super(parameters);
    this.value = value;
    this.local = local;
  }
};
var RawData = class {
  get data() {
    return this.dataView.slice().buffer;
  }
  set data(value) {
    this.dataView = pvtsutils.BufferSourceConverter.toUint8Array(value);
  }
  constructor({ data = EMPTY_VIEW } = {}) {
    this.dataView = pvtsutils.BufferSourceConverter.toUint8Array(data);
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const endLength = inputOffset + inputLength;
    this.dataView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer).subarray(inputOffset, endLength);
    return endLength;
  }
  toBER(_sizeOnly) {
    return this.dataView.slice().buffer;
  }
};
function compareSchema(root, inputData, inputSchema) {
  if (inputSchema instanceof Choice) {
    for (const element of inputSchema.value) {
      const result = compareSchema(root, inputData, element);
      if (result.verified) {
        return {
          verified: true,
          result: root
        };
      }
    }
    {
      const _result = {
        verified: false,
        result: { error: "Wrong values for Choice type" }
      };
      if (inputSchema.hasOwnProperty(NAME))
        _result.name = inputSchema.name;
      return _result;
    }
  }
  if (inputSchema instanceof Any) {
    if (inputSchema.hasOwnProperty(NAME))
      root[inputSchema.name] = inputData;
    return {
      verified: true,
      result: root
    };
  }
  if (root instanceof Object === false) {
    return {
      verified: false,
      result: { error: "Wrong root object" }
    };
  }
  if (inputData instanceof Object === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 data" }
    };
  }
  if (inputSchema instanceof Object === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (ID_BLOCK in inputSchema === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (FROM_BER in inputSchema.idBlock === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (TO_BER in inputSchema.idBlock === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  const encodedId = inputSchema.idBlock.toBER(false);
  if (encodedId.byteLength === 0) {
    return {
      verified: false,
      result: { error: "Error encoding idBlock for ASN.1 schema" }
    };
  }
  const decodedOffset = inputSchema.idBlock.fromBER(encodedId, 0, encodedId.byteLength);
  if (decodedOffset === -1) {
    return {
      verified: false,
      result: { error: "Error decoding idBlock for ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.hasOwnProperty(TAG_CLASS) === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.tagClass !== inputData.idBlock.tagClass) {
    return {
      verified: false,
      result: root
    };
  }
  if (inputSchema.idBlock.hasOwnProperty(TAG_NUMBER) === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.tagNumber !== inputData.idBlock.tagNumber) {
    return {
      verified: false,
      result: root
    };
  }
  if (inputSchema.idBlock.hasOwnProperty(IS_CONSTRUCTED) === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.isConstructed !== inputData.idBlock.isConstructed) {
    return {
      verified: false,
      result: root
    };
  }
  if (!(IS_HEX_ONLY in inputSchema.idBlock)) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.isHexOnly !== inputData.idBlock.isHexOnly) {
    return {
      verified: false,
      result: root
    };
  }
  if (inputSchema.idBlock.isHexOnly) {
    if (VALUE_HEX_VIEW in inputSchema.idBlock === false) {
      return {
        verified: false,
        result: { error: "Wrong ASN.1 schema" }
      };
    }
    const schemaView = inputSchema.idBlock.valueHexView;
    const asn1View = inputData.idBlock.valueHexView;
    if (schemaView.length !== asn1View.length) {
      return {
        verified: false,
        result: root
      };
    }
    for (let i = 0; i < schemaView.length; i++) {
      if (schemaView[i] !== asn1View[1]) {
        return {
          verified: false,
          result: root
        };
      }
    }
  }
  if (inputSchema.name) {
    inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
    if (inputSchema.name)
      root[inputSchema.name] = inputData;
  }
  if (inputSchema instanceof typeStore.Constructed) {
    let admission = 0;
    let result = {
      verified: false,
      result: { error: "Unknown error" }
    };
    let maxLength = inputSchema.valueBlock.value.length;
    if (maxLength > 0) {
      if (inputSchema.valueBlock.value[0] instanceof Repeated) {
        maxLength = inputData.valueBlock.value.length;
      }
    }
    if (maxLength === 0) {
      return {
        verified: true,
        result: root
      };
    }
    if (inputData.valueBlock.value.length === 0 && inputSchema.valueBlock.value.length !== 0) {
      let _optional = true;
      for (let i = 0; i < inputSchema.valueBlock.value.length; i++)
        _optional = _optional && (inputSchema.valueBlock.value[i].optional || false);
      if (_optional) {
        return {
          verified: true,
          result: root
        };
      }
      if (inputSchema.name) {
        inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
        if (inputSchema.name)
          delete root[inputSchema.name];
      }
      root.error = "Inconsistent object length";
      return {
        verified: false,
        result: root
      };
    }
    for (let i = 0; i < maxLength; i++) {
      if (i - admission >= inputData.valueBlock.value.length) {
        if (inputSchema.valueBlock.value[i].optional === false) {
          const _result = {
            verified: false,
            result: root
          };
          root.error = "Inconsistent length between ASN.1 data and schema";
          if (inputSchema.name) {
            inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
            if (inputSchema.name) {
              delete root[inputSchema.name];
              _result.name = inputSchema.name;
            }
          }
          return _result;
        }
      } else {
        if (inputSchema.valueBlock.value[0] instanceof Repeated) {
          result = compareSchema(root, inputData.valueBlock.value[i], inputSchema.valueBlock.value[0].value);
          if (result.verified === false) {
            if (inputSchema.valueBlock.value[0].optional)
              admission++;
            else {
              if (inputSchema.name) {
                inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                if (inputSchema.name)
                  delete root[inputSchema.name];
              }
              return result;
            }
          }
          if (NAME in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].name.length > 0) {
            let arrayRoot = {};
            if (LOCAL in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].local)
              arrayRoot = inputData;
            else
              arrayRoot = root;
            if (typeof arrayRoot[inputSchema.valueBlock.value[0].name] === "undefined")
              arrayRoot[inputSchema.valueBlock.value[0].name] = [];
            arrayRoot[inputSchema.valueBlock.value[0].name].push(inputData.valueBlock.value[i]);
          }
        } else {
          result = compareSchema(root, inputData.valueBlock.value[i - admission], inputSchema.valueBlock.value[i]);
          if (result.verified === false) {
            if (inputSchema.valueBlock.value[i].optional)
              admission++;
            else {
              if (inputSchema.name) {
                inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                if (inputSchema.name)
                  delete root[inputSchema.name];
              }
              return result;
            }
          }
        }
      }
    }
    if (result.verified === false) {
      const _result = {
        verified: false,
        result: root
      };
      if (inputSchema.name) {
        inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
        if (inputSchema.name) {
          delete root[inputSchema.name];
          _result.name = inputSchema.name;
        }
      }
      return _result;
    }
    return {
      verified: true,
      result: root
    };
  }
  if (inputSchema.primitiveSchema && VALUE_HEX_VIEW in inputData.valueBlock) {
    const asn1 = localFromBER(inputData.valueBlock.valueHexView);
    if (asn1.offset === -1) {
      const _result = {
        verified: false,
        result: asn1.result
      };
      if (inputSchema.name) {
        inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
        if (inputSchema.name) {
          delete root[inputSchema.name];
          _result.name = inputSchema.name;
        }
      }
      return _result;
    }
    return compareSchema(root, asn1.result, inputSchema.primitiveSchema);
  }
  return {
    verified: true,
    result: root
  };
}
function verifySchema(inputBuffer, inputSchema) {
  if (inputSchema instanceof Object === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema type" }
    };
  }
  const asn1 = localFromBER(pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer));
  if (asn1.offset === -1) {
    return {
      verified: false,
      result: asn1.result
    };
  }
  return compareSchema(asn1.result, asn1.result, inputSchema);
}

// front/node_modules/@peculiar/asn1-schema/build/es2015/enums.js
var AsnTypeTypes;
(function(AsnTypeTypes2) {
  AsnTypeTypes2[AsnTypeTypes2["Sequence"] = 0] = "Sequence";
  AsnTypeTypes2[AsnTypeTypes2["Set"] = 1] = "Set";
  AsnTypeTypes2[AsnTypeTypes2["Choice"] = 2] = "Choice";
})(AsnTypeTypes || (AsnTypeTypes = {}));
var AsnPropTypes;
(function(AsnPropTypes2) {
  AsnPropTypes2[AsnPropTypes2["Any"] = 1] = "Any";
  AsnPropTypes2[AsnPropTypes2["Boolean"] = 2] = "Boolean";
  AsnPropTypes2[AsnPropTypes2["OctetString"] = 3] = "OctetString";
  AsnPropTypes2[AsnPropTypes2["BitString"] = 4] = "BitString";
  AsnPropTypes2[AsnPropTypes2["Integer"] = 5] = "Integer";
  AsnPropTypes2[AsnPropTypes2["Enumerated"] = 6] = "Enumerated";
  AsnPropTypes2[AsnPropTypes2["ObjectIdentifier"] = 7] = "ObjectIdentifier";
  AsnPropTypes2[AsnPropTypes2["Utf8String"] = 8] = "Utf8String";
  AsnPropTypes2[AsnPropTypes2["BmpString"] = 9] = "BmpString";
  AsnPropTypes2[AsnPropTypes2["UniversalString"] = 10] = "UniversalString";
  AsnPropTypes2[AsnPropTypes2["NumericString"] = 11] = "NumericString";
  AsnPropTypes2[AsnPropTypes2["PrintableString"] = 12] = "PrintableString";
  AsnPropTypes2[AsnPropTypes2["TeletexString"] = 13] = "TeletexString";
  AsnPropTypes2[AsnPropTypes2["VideotexString"] = 14] = "VideotexString";
  AsnPropTypes2[AsnPropTypes2["IA5String"] = 15] = "IA5String";
  AsnPropTypes2[AsnPropTypes2["GraphicString"] = 16] = "GraphicString";
  AsnPropTypes2[AsnPropTypes2["VisibleString"] = 17] = "VisibleString";
  AsnPropTypes2[AsnPropTypes2["GeneralString"] = 18] = "GeneralString";
  AsnPropTypes2[AsnPropTypes2["CharacterString"] = 19] = "CharacterString";
  AsnPropTypes2[AsnPropTypes2["UTCTime"] = 20] = "UTCTime";
  AsnPropTypes2[AsnPropTypes2["GeneralizedTime"] = 21] = "GeneralizedTime";
  AsnPropTypes2[AsnPropTypes2["DATE"] = 22] = "DATE";
  AsnPropTypes2[AsnPropTypes2["TimeOfDay"] = 23] = "TimeOfDay";
  AsnPropTypes2[AsnPropTypes2["DateTime"] = 24] = "DateTime";
  AsnPropTypes2[AsnPropTypes2["Duration"] = 25] = "Duration";
  AsnPropTypes2[AsnPropTypes2["TIME"] = 26] = "TIME";
  AsnPropTypes2[AsnPropTypes2["Null"] = 27] = "Null";
})(AsnPropTypes || (AsnPropTypes = {}));

// front/node_modules/@peculiar/asn1-schema/build/es2015/types/bit_string.js
var import_pvtsutils = __toESM(require_build());
var BitString2 = class {
  constructor(params, unusedBits = 0) {
    this.unusedBits = 0;
    this.value = new ArrayBuffer(0);
    if (params) {
      if (typeof params === "number") {
        this.fromNumber(params);
      } else if (import_pvtsutils.BufferSourceConverter.isBufferSource(params)) {
        this.unusedBits = unusedBits;
        this.value = import_pvtsutils.BufferSourceConverter.toArrayBuffer(params);
      } else {
        throw TypeError("Unsupported type of 'params' argument for BitString");
      }
    }
  }
  fromASN(asn) {
    if (!(asn instanceof BitString)) {
      throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");
    }
    this.unusedBits = asn.valueBlock.unusedBits;
    this.value = asn.valueBlock.valueHex;
    return this;
  }
  toASN() {
    return new BitString({ unusedBits: this.unusedBits, valueHex: this.value });
  }
  toSchema(name3) {
    return new BitString({ name: name3 });
  }
  toNumber() {
    let res = "";
    const uintArray = new Uint8Array(this.value);
    for (const octet of uintArray) {
      res += octet.toString(2).padStart(8, "0");
    }
    res = res.split("").reverse().join("");
    if (this.unusedBits) {
      res = res.slice(this.unusedBits).padStart(this.unusedBits, "0");
    }
    return parseInt(res, 2);
  }
  fromNumber(value) {
    let bits = value.toString(2);
    const octetSize = bits.length + 7 >> 3;
    this.unusedBits = (octetSize << 3) - bits.length;
    const octets = new Uint8Array(octetSize);
    bits = bits.padStart(octetSize << 3, "0").split("").reverse().join("");
    let index = 0;
    while (index < octetSize) {
      octets[index] = parseInt(bits.slice(index << 3, (index << 3) + 8), 2);
      index++;
    }
    this.value = octets.buffer;
  }
};

// front/node_modules/@peculiar/asn1-schema/build/es2015/types/octet_string.js
var import_pvtsutils2 = __toESM(require_build());
var OctetString2 = class {
  get byteLength() {
    return this.buffer.byteLength;
  }
  get byteOffset() {
    return 0;
  }
  constructor(param) {
    if (typeof param === "number") {
      this.buffer = new ArrayBuffer(param);
    } else {
      if (import_pvtsutils2.BufferSourceConverter.isBufferSource(param)) {
        this.buffer = import_pvtsutils2.BufferSourceConverter.toArrayBuffer(param);
      } else if (Array.isArray(param)) {
        this.buffer = new Uint8Array(param);
      } else {
        this.buffer = new ArrayBuffer(0);
      }
    }
  }
  fromASN(asn) {
    if (!(asn instanceof OctetString)) {
      throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");
    }
    this.buffer = asn.valueBlock.valueHex;
    return this;
  }
  toASN() {
    return new OctetString({ valueHex: this.buffer });
  }
  toSchema(name3) {
    return new OctetString({ name: name3 });
  }
};

// front/node_modules/@peculiar/asn1-schema/build/es2015/converters.js
var AsnAnyConverter = {
  fromASN: (value) => value instanceof Null ? null : value.valueBeforeDecodeView,
  toASN: (value) => {
    if (value === null) {
      return new Null();
    }
    const schema = fromBER(value);
    if (schema.result.error) {
      throw new Error(schema.result.error);
    }
    return schema.result;
  }
};
var AsnIntegerConverter = {
  fromASN: (value) => value.valueBlock.valueHexView.byteLength >= 4 ? value.valueBlock.toString() : value.valueBlock.valueDec,
  toASN: (value) => new Integer({ value: +value })
};
var AsnEnumeratedConverter = {
  fromASN: (value) => value.valueBlock.valueDec,
  toASN: (value) => new Enumerated({ value })
};
var AsnIntegerArrayBufferConverter = {
  fromASN: (value) => value.valueBlock.valueHexView,
  toASN: (value) => new Integer({ valueHex: value })
};
var AsnBitStringConverter = {
  fromASN: (value) => value.valueBlock.valueHexView,
  toASN: (value) => new BitString({ valueHex: value })
};
var AsnObjectIdentifierConverter = {
  fromASN: (value) => value.valueBlock.toString(),
  toASN: (value) => new ObjectIdentifier({ value })
};
var AsnBooleanConverter = {
  fromASN: (value) => value.valueBlock.value,
  toASN: (value) => new Boolean({ value })
};
var AsnOctetStringConverter = {
  fromASN: (value) => value.valueBlock.valueHexView,
  toASN: (value) => new OctetString({ valueHex: value })
};
var AsnConstructedOctetStringConverter = {
  fromASN: (value) => new OctetString2(value.getValue()),
  toASN: (value) => value.toASN()
};
function createStringConverter(Asn1Type) {
  return {
    fromASN: (value) => value.valueBlock.value,
    toASN: (value) => new Asn1Type({ value })
  };
}
var AsnUtf8StringConverter = createStringConverter(Utf8String);
var AsnBmpStringConverter = createStringConverter(BmpString);
var AsnUniversalStringConverter = createStringConverter(UniversalString);
var AsnNumericStringConverter = createStringConverter(NumericString);
var AsnPrintableStringConverter = createStringConverter(PrintableString);
var AsnTeletexStringConverter = createStringConverter(TeletexString);
var AsnVideotexStringConverter = createStringConverter(VideotexString);
var AsnIA5StringConverter = createStringConverter(IA5String);
var AsnGraphicStringConverter = createStringConverter(GraphicString);
var AsnVisibleStringConverter = createStringConverter(VisibleString);
var AsnGeneralStringConverter = createStringConverter(GeneralString);
var AsnCharacterStringConverter = createStringConverter(CharacterString);
var AsnUTCTimeConverter = {
  fromASN: (value) => value.toDate(),
  toASN: (value) => new UTCTime({ valueDate: value })
};
var AsnGeneralizedTimeConverter = {
  fromASN: (value) => value.toDate(),
  toASN: (value) => new GeneralizedTime({ valueDate: value })
};
var AsnNullConverter = {
  fromASN: () => null,
  toASN: () => {
    return new Null();
  }
};
function defaultConverter(type) {
  switch (type) {
    case AsnPropTypes.Any:
      return AsnAnyConverter;
    case AsnPropTypes.BitString:
      return AsnBitStringConverter;
    case AsnPropTypes.BmpString:
      return AsnBmpStringConverter;
    case AsnPropTypes.Boolean:
      return AsnBooleanConverter;
    case AsnPropTypes.CharacterString:
      return AsnCharacterStringConverter;
    case AsnPropTypes.Enumerated:
      return AsnEnumeratedConverter;
    case AsnPropTypes.GeneralString:
      return AsnGeneralStringConverter;
    case AsnPropTypes.GeneralizedTime:
      return AsnGeneralizedTimeConverter;
    case AsnPropTypes.GraphicString:
      return AsnGraphicStringConverter;
    case AsnPropTypes.IA5String:
      return AsnIA5StringConverter;
    case AsnPropTypes.Integer:
      return AsnIntegerConverter;
    case AsnPropTypes.Null:
      return AsnNullConverter;
    case AsnPropTypes.NumericString:
      return AsnNumericStringConverter;
    case AsnPropTypes.ObjectIdentifier:
      return AsnObjectIdentifierConverter;
    case AsnPropTypes.OctetString:
      return AsnOctetStringConverter;
    case AsnPropTypes.PrintableString:
      return AsnPrintableStringConverter;
    case AsnPropTypes.TeletexString:
      return AsnTeletexStringConverter;
    case AsnPropTypes.UTCTime:
      return AsnUTCTimeConverter;
    case AsnPropTypes.UniversalString:
      return AsnUniversalStringConverter;
    case AsnPropTypes.Utf8String:
      return AsnUtf8StringConverter;
    case AsnPropTypes.VideotexString:
      return AsnVideotexStringConverter;
    case AsnPropTypes.VisibleString:
      return AsnVisibleStringConverter;
    default:
      return null;
  }
}

// front/node_modules/@peculiar/asn1-schema/build/es2015/helper.js
function isConvertible(target) {
  if (typeof target === "function" && target.prototype) {
    if (target.prototype.toASN && target.prototype.fromASN) {
      return true;
    } else {
      return isConvertible(target.prototype);
    }
  } else {
    return !!(target && typeof target === "object" && "toASN" in target && "fromASN" in target);
  }
}
function isTypeOfArray(target) {
  var _a3;
  if (target) {
    const proto = Object.getPrototypeOf(target);
    if (((_a3 = proto === null || proto === void 0 ? void 0 : proto.prototype) === null || _a3 === void 0 ? void 0 : _a3.constructor) === Array) {
      return true;
    }
    return isTypeOfArray(proto);
  }
  return false;
}
function isArrayEqual(bytes1, bytes2) {
  if (!(bytes1 && bytes2)) {
    return false;
  }
  if (bytes1.byteLength !== bytes2.byteLength) {
    return false;
  }
  const b1 = new Uint8Array(bytes1);
  const b2 = new Uint8Array(bytes2);
  for (let i = 0; i < bytes1.byteLength; i++) {
    if (b1[i] !== b2[i]) {
      return false;
    }
  }
  return true;
}

// front/node_modules/@peculiar/asn1-schema/build/es2015/schema.js
var AsnSchemaStorage = class {
  constructor() {
    this.items = /* @__PURE__ */ new WeakMap();
  }
  has(target) {
    return this.items.has(target);
  }
  get(target, checkSchema = false) {
    const schema = this.items.get(target);
    if (!schema) {
      throw new Error(`Cannot get schema for '${target.prototype.constructor.name}' target`);
    }
    if (checkSchema && !schema.schema) {
      throw new Error(`Schema '${target.prototype.constructor.name}' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'.`);
    }
    return schema;
  }
  cache(target) {
    const schema = this.get(target);
    if (!schema.schema) {
      schema.schema = this.create(target, true);
    }
  }
  createDefault(target) {
    const schema = {
      type: AsnTypeTypes.Sequence,
      items: {}
    };
    const parentSchema = this.findParentSchema(target);
    if (parentSchema) {
      Object.assign(schema, parentSchema);
      schema.items = Object.assign({}, schema.items, parentSchema.items);
    }
    return schema;
  }
  create(target, useNames) {
    const schema = this.items.get(target) || this.createDefault(target);
    const asn1Value = [];
    for (const key in schema.items) {
      const item = schema.items[key];
      const name3 = useNames ? key : "";
      let asn1Item;
      if (typeof item.type === "number") {
        const Asn1TypeName = AsnPropTypes[item.type];
        const Asn1Type = index_es_exports[Asn1TypeName];
        if (!Asn1Type) {
          throw new Error(`Cannot get ASN1 class by name '${Asn1TypeName}'`);
        }
        asn1Item = new Asn1Type({ name: name3 });
      } else if (isConvertible(item.type)) {
        const instance2 = new item.type();
        asn1Item = instance2.toSchema(name3);
      } else if (item.optional) {
        const itemSchema = this.get(item.type);
        if (itemSchema.type === AsnTypeTypes.Choice) {
          asn1Item = new Any({ name: name3 });
        } else {
          asn1Item = this.create(item.type, false);
          asn1Item.name = name3;
        }
      } else {
        asn1Item = new Any({ name: name3 });
      }
      const optional = !!item.optional || item.defaultValue !== void 0;
      if (item.repeated) {
        asn1Item.name = "";
        const Container = item.repeated === "set" ? Set2 : Sequence;
        asn1Item = new Container({
          name: "",
          value: [
            new Repeated({
              name: name3,
              value: asn1Item
            })
          ]
        });
      }
      if (item.context !== null && item.context !== void 0) {
        if (item.implicit) {
          if (typeof item.type === "number" || isConvertible(item.type)) {
            const Container = item.repeated ? Constructed : Primitive;
            asn1Value.push(new Container({
              name: name3,
              optional,
              idBlock: {
                tagClass: 3,
                tagNumber: item.context
              }
            }));
          } else {
            this.cache(item.type);
            const isRepeated = !!item.repeated;
            let value = !isRepeated ? this.get(item.type, true).schema : asn1Item;
            value = "valueBlock" in value ? value.valueBlock.value : value.value;
            asn1Value.push(new Constructed({
              name: !isRepeated ? name3 : "",
              optional,
              idBlock: {
                tagClass: 3,
                tagNumber: item.context
              },
              value
            }));
          }
        } else {
          asn1Value.push(new Constructed({
            optional,
            idBlock: {
              tagClass: 3,
              tagNumber: item.context
            },
            value: [asn1Item]
          }));
        }
      } else {
        asn1Item.optional = optional;
        asn1Value.push(asn1Item);
      }
    }
    switch (schema.type) {
      case AsnTypeTypes.Sequence:
        return new Sequence({ value: asn1Value, name: "" });
      case AsnTypeTypes.Set:
        return new Set2({ value: asn1Value, name: "" });
      case AsnTypeTypes.Choice:
        return new Choice({ value: asn1Value, name: "" });
      default:
        throw new Error(`Unsupported ASN1 type in use`);
    }
  }
  set(target, schema) {
    this.items.set(target, schema);
    return this;
  }
  findParentSchema(target) {
    const parent = Object.getPrototypeOf(target);
    if (parent) {
      const schema = this.items.get(parent);
      return schema || this.findParentSchema(parent);
    }
    return null;
  }
};

// front/node_modules/@peculiar/asn1-schema/build/es2015/storage.js
var schemaStorage = new AsnSchemaStorage();

// front/node_modules/@peculiar/asn1-schema/build/es2015/decorators.js
var AsnType = (options) => (target) => {
  let schema;
  if (!schemaStorage.has(target)) {
    schema = schemaStorage.createDefault(target);
    schemaStorage.set(target, schema);
  } else {
    schema = schemaStorage.get(target);
  }
  Object.assign(schema, options);
};
var AsnProp = (options) => (target, propertyKey) => {
  let schema;
  if (!schemaStorage.has(target.constructor)) {
    schema = schemaStorage.createDefault(target.constructor);
    schemaStorage.set(target.constructor, schema);
  } else {
    schema = schemaStorage.get(target.constructor);
  }
  const copyOptions = Object.assign({}, options);
  if (typeof copyOptions.type === "number" && !copyOptions.converter) {
    const defaultConverter2 = defaultConverter(options.type);
    if (!defaultConverter2) {
      throw new Error(`Cannot get default converter for property '${propertyKey}' of ${target.constructor.name}`);
    }
    copyOptions.converter = defaultConverter2;
  }
  schema.items[propertyKey] = copyOptions;
};

// front/node_modules/@peculiar/asn1-schema/build/es2015/errors/schema_validation.js
var AsnSchemaValidationError = class extends Error {
  constructor() {
    super(...arguments);
    this.schemas = [];
  }
};

// front/node_modules/@peculiar/asn1-schema/build/es2015/parser.js
var AsnParser = class {
  static parse(data, target) {
    const asn1Parsed = fromBER(data);
    if (asn1Parsed.result.error) {
      throw new Error(asn1Parsed.result.error);
    }
    const res = this.fromASN(asn1Parsed.result, target);
    return res;
  }
  static fromASN(asn1Schema, target) {
    var _a3;
    try {
      if (isConvertible(target)) {
        const value = new target();
        return value.fromASN(asn1Schema);
      }
      const schema = schemaStorage.get(target);
      schemaStorage.cache(target);
      let targetSchema = schema.schema;
      if (asn1Schema.constructor === Constructed && schema.type !== AsnTypeTypes.Choice) {
        targetSchema = new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: asn1Schema.idBlock.tagNumber
          },
          value: schema.schema.valueBlock.value
        });
        for (const key in schema.items) {
          delete asn1Schema[key];
        }
      }
      const asn1ComparedSchema = compareSchema({}, asn1Schema, targetSchema);
      if (!asn1ComparedSchema.verified) {
        throw new AsnSchemaValidationError(`Data does not match to ${target.name} ASN1 schema. ${asn1ComparedSchema.result.error}`);
      }
      const res = new target();
      if (isTypeOfArray(target)) {
        if (!("value" in asn1Schema.valueBlock && Array.isArray(asn1Schema.valueBlock.value))) {
          throw new Error(`Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.`);
        }
        const itemType = schema.itemType;
        if (typeof itemType === "number") {
          const converter = defaultConverter(itemType);
          if (!converter) {
            throw new Error(`Cannot get default converter for array item of ${target.name} ASN1 schema`);
          }
          return target.from(asn1Schema.valueBlock.value, (element) => converter.fromASN(element));
        } else {
          return target.from(asn1Schema.valueBlock.value, (element) => this.fromASN(element, itemType));
        }
      }
      for (const key in schema.items) {
        const asn1SchemaValue = asn1ComparedSchema.result[key];
        if (!asn1SchemaValue) {
          continue;
        }
        const schemaItem = schema.items[key];
        const schemaItemType = schemaItem.type;
        if (typeof schemaItemType === "number" || isConvertible(schemaItemType)) {
          const converter = (_a3 = schemaItem.converter) !== null && _a3 !== void 0 ? _a3 : isConvertible(schemaItemType) ? new schemaItemType() : null;
          if (!converter) {
            throw new Error("Converter is empty");
          }
          if (schemaItem.repeated) {
            if (schemaItem.implicit) {
              const Container = schemaItem.repeated === "sequence" ? Sequence : Set2;
              const newItem = new Container();
              newItem.valueBlock = asn1SchemaValue.valueBlock;
              const newItemAsn = fromBER(newItem.toBER(false));
              if (newItemAsn.offset === -1) {
                throw new Error(`Cannot parse the child item. ${newItemAsn.result.error}`);
              }
              if (!("value" in newItemAsn.result.valueBlock && Array.isArray(newItemAsn.result.valueBlock.value))) {
                throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
              }
              const value = newItemAsn.result.valueBlock.value;
              res[key] = Array.from(value, (element) => converter.fromASN(element));
            } else {
              res[key] = Array.from(asn1SchemaValue, (element) => converter.fromASN(element));
            }
          } else {
            let value = asn1SchemaValue;
            if (schemaItem.implicit) {
              let newItem;
              if (isConvertible(schemaItemType)) {
                newItem = new schemaItemType().toSchema("");
              } else {
                const Asn1TypeName = AsnPropTypes[schemaItemType];
                const Asn1Type = index_es_exports[Asn1TypeName];
                if (!Asn1Type) {
                  throw new Error(`Cannot get '${Asn1TypeName}' class from asn1js module`);
                }
                newItem = new Asn1Type();
              }
              newItem.valueBlock = value.valueBlock;
              value = fromBER(newItem.toBER(false)).result;
            }
            res[key] = converter.fromASN(value);
          }
        } else {
          if (schemaItem.repeated) {
            if (!Array.isArray(asn1SchemaValue)) {
              throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");
            }
            res[key] = Array.from(asn1SchemaValue, (element) => this.fromASN(element, schemaItemType));
          } else {
            res[key] = this.fromASN(asn1SchemaValue, schemaItemType);
          }
        }
      }
      return res;
    } catch (error) {
      if (error instanceof AsnSchemaValidationError) {
        error.schemas.push(target.name);
      }
      throw error;
    }
  }
};

// front/node_modules/@peculiar/asn1-schema/build/es2015/serializer.js
var AsnSerializer = class _AsnSerializer {
  static serialize(obj) {
    if (obj instanceof BaseBlock) {
      return obj.toBER(false);
    }
    return this.toASN(obj).toBER(false);
  }
  static toASN(obj) {
    if (obj && typeof obj === "object" && isConvertible(obj)) {
      return obj.toASN();
    }
    if (!(obj && typeof obj === "object")) {
      throw new TypeError("Parameter 1 should be type of Object.");
    }
    const target = obj.constructor;
    const schema = schemaStorage.get(target);
    schemaStorage.cache(target);
    let asn1Value = [];
    if (schema.itemType) {
      if (!Array.isArray(obj)) {
        throw new TypeError("Parameter 1 should be type of Array.");
      }
      if (typeof schema.itemType === "number") {
        const converter = defaultConverter(schema.itemType);
        if (!converter) {
          throw new Error(`Cannot get default converter for array item of ${target.name} ASN1 schema`);
        }
        asn1Value = obj.map((o) => converter.toASN(o));
      } else {
        asn1Value = obj.map((o) => this.toAsnItem({ type: schema.itemType }, "[]", target, o));
      }
    } else {
      for (const key in schema.items) {
        const schemaItem = schema.items[key];
        const objProp = obj[key];
        if (objProp === void 0 || schemaItem.defaultValue === objProp || typeof schemaItem.defaultValue === "object" && typeof objProp === "object" && isArrayEqual(this.serialize(schemaItem.defaultValue), this.serialize(objProp))) {
          continue;
        }
        const asn1Item = _AsnSerializer.toAsnItem(schemaItem, key, target, objProp);
        if (typeof schemaItem.context === "number") {
          if (schemaItem.implicit) {
            if (!schemaItem.repeated && (typeof schemaItem.type === "number" || isConvertible(schemaItem.type))) {
              const value = {};
              value.valueHex = asn1Item instanceof Null ? asn1Item.valueBeforeDecodeView : asn1Item.valueBlock.toBER();
              asn1Value.push(new Primitive({
                optional: schemaItem.optional,
                idBlock: {
                  tagClass: 3,
                  tagNumber: schemaItem.context
                },
                ...value
              }));
            } else {
              asn1Value.push(new Constructed({
                optional: schemaItem.optional,
                idBlock: {
                  tagClass: 3,
                  tagNumber: schemaItem.context
                },
                value: asn1Item.valueBlock.value
              }));
            }
          } else {
            asn1Value.push(new Constructed({
              optional: schemaItem.optional,
              idBlock: {
                tagClass: 3,
                tagNumber: schemaItem.context
              },
              value: [asn1Item]
            }));
          }
        } else if (schemaItem.repeated) {
          asn1Value = asn1Value.concat(asn1Item);
        } else {
          asn1Value.push(asn1Item);
        }
      }
    }
    let asnSchema;
    switch (schema.type) {
      case AsnTypeTypes.Sequence:
        asnSchema = new Sequence({ value: asn1Value });
        break;
      case AsnTypeTypes.Set:
        asnSchema = new Set2({ value: asn1Value });
        break;
      case AsnTypeTypes.Choice:
        if (!asn1Value[0]) {
          throw new Error(`Schema '${target.name}' has wrong data. Choice cannot be empty.`);
        }
        asnSchema = asn1Value[0];
        break;
    }
    return asnSchema;
  }
  static toAsnItem(schemaItem, key, target, objProp) {
    let asn1Item;
    if (typeof schemaItem.type === "number") {
      const converter = schemaItem.converter;
      if (!converter) {
        throw new Error(`Property '${key}' doesn't have converter for type ${AsnPropTypes[schemaItem.type]} in schema '${target.name}'`);
      }
      if (schemaItem.repeated) {
        if (!Array.isArray(objProp)) {
          throw new TypeError("Parameter 'objProp' should be type of Array.");
        }
        const items = Array.from(objProp, (element) => converter.toASN(element));
        const Container = schemaItem.repeated === "sequence" ? Sequence : Set2;
        asn1Item = new Container({
          value: items
        });
      } else {
        asn1Item = converter.toASN(objProp);
      }
    } else {
      if (schemaItem.repeated) {
        if (!Array.isArray(objProp)) {
          throw new TypeError("Parameter 'objProp' should be type of Array.");
        }
        const items = Array.from(objProp, (element) => this.toASN(element));
        const Container = schemaItem.repeated === "sequence" ? Sequence : Set2;
        asn1Item = new Container({
          value: items
        });
      } else {
        asn1Item = this.toASN(objProp);
      }
    }
    return asn1Item;
  }
};

// front/node_modules/@peculiar/asn1-schema/build/es2015/objects.js
var AsnArray = class extends Array {
  constructor(items = []) {
    if (typeof items === "number") {
      super(items);
    } else {
      super();
      for (const item of items) {
        this.push(item);
      }
    }
  }
};

// front/node_modules/@peculiar/asn1-schema/build/es2015/convert.js
var import_pvtsutils3 = __toESM(require_build());
var AsnConvert = class _AsnConvert {
  static serialize(obj) {
    return AsnSerializer.serialize(obj);
  }
  static parse(data, target) {
    return AsnParser.parse(data, target);
  }
  static toString(data) {
    const buf = import_pvtsutils3.BufferSourceConverter.isBufferSource(data) ? import_pvtsutils3.BufferSourceConverter.toArrayBuffer(data) : _AsnConvert.serialize(data);
    const asn = fromBER(buf);
    if (asn.offset === -1) {
      throw new Error(`Cannot decode ASN.1 data. ${asn.result.error}`);
    }
    return asn.result.toString();
  }
};

// front/node_modules/tslib/tslib.es6.mjs
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

// front/node_modules/@peculiar/asn1-x509/build/es2015/ip_converter.js
var import_pvtsutils4 = __toESM(require_build());
var IpConverter = class {
  static isIPv4(ip) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
  }
  static parseIPv4(ip) {
    const parts = ip.split(".");
    if (parts.length !== 4) {
      throw new Error("Invalid IPv4 address");
    }
    return parts.map((part) => {
      const num = parseInt(part, 10);
      if (isNaN(num) || num < 0 || num > 255) {
        throw new Error("Invalid IPv4 address part");
      }
      return num;
    });
  }
  static parseIPv6(ip) {
    const expandedIP = this.expandIPv6(ip);
    const parts = expandedIP.split(":");
    if (parts.length !== 8) {
      throw new Error("Invalid IPv6 address");
    }
    return parts.reduce((bytes, part) => {
      const num = parseInt(part, 16);
      if (isNaN(num) || num < 0 || num > 65535) {
        throw new Error("Invalid IPv6 address part");
      }
      bytes.push(num >> 8 & 255);
      bytes.push(num & 255);
      return bytes;
    }, []);
  }
  static expandIPv6(ip) {
    if (!ip.includes("::")) {
      return ip;
    }
    const parts = ip.split("::");
    if (parts.length > 2) {
      throw new Error("Invalid IPv6 address");
    }
    const left = parts[0] ? parts[0].split(":") : [];
    const right = parts[1] ? parts[1].split(":") : [];
    const missing = 8 - (left.length + right.length);
    if (missing < 0) {
      throw new Error("Invalid IPv6 address");
    }
    return [...left, ...Array(missing).fill("0"), ...right].join(":");
  }
  static formatIPv6(bytes) {
    const parts = [];
    for (let i = 0; i < 16; i += 2) {
      parts.push((bytes[i] << 8 | bytes[i + 1]).toString(16));
    }
    return this.compressIPv6(parts.join(":"));
  }
  static compressIPv6(ip) {
    const parts = ip.split(":");
    let longestZeroStart = -1;
    let longestZeroLength = 0;
    let currentZeroStart = -1;
    let currentZeroLength = 0;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === "0") {
        if (currentZeroStart === -1) {
          currentZeroStart = i;
        }
        currentZeroLength++;
      } else {
        if (currentZeroLength > longestZeroLength) {
          longestZeroStart = currentZeroStart;
          longestZeroLength = currentZeroLength;
        }
        currentZeroStart = -1;
        currentZeroLength = 0;
      }
    }
    if (currentZeroLength > longestZeroLength) {
      longestZeroStart = currentZeroStart;
      longestZeroLength = currentZeroLength;
    }
    if (longestZeroLength > 1) {
      const before = parts.slice(0, longestZeroStart).join(":");
      const after = parts.slice(longestZeroStart + longestZeroLength).join(":");
      return `${before}::${after}`;
    }
    return ip;
  }
  static parseCIDR(text) {
    const [addr, prefixStr] = text.split("/");
    const prefix = parseInt(prefixStr, 10);
    if (this.isIPv4(addr)) {
      if (prefix < 0 || prefix > 32) {
        throw new Error("Invalid IPv4 prefix length");
      }
      return [this.parseIPv4(addr), prefix];
    } else {
      if (prefix < 0 || prefix > 128) {
        throw new Error("Invalid IPv6 prefix length");
      }
      return [this.parseIPv6(addr), prefix];
    }
  }
  static decodeIP(value) {
    if (value.length === 64 && parseInt(value, 16) === 0) {
      return "::/0";
    }
    if (value.length !== 16) {
      return value;
    }
    const mask = parseInt(value.slice(8), 16).toString(2).split("").reduce((a, k) => a + +k, 0);
    let ip = value.slice(0, 8).replace(/(.{2})/g, (match) => `${parseInt(match, 16)}.`);
    ip = ip.slice(0, -1);
    return `${ip}/${mask}`;
  }
  static toString(buf) {
    const uint8 = new Uint8Array(buf);
    if (uint8.length === 4) {
      return Array.from(uint8).join(".");
    }
    if (uint8.length === 16) {
      return this.formatIPv6(uint8);
    }
    if (uint8.length === 8 || uint8.length === 32) {
      const half = uint8.length / 2;
      const addrBytes = uint8.slice(0, half);
      const maskBytes = uint8.slice(half);
      const isAllZeros = uint8.every((byte) => byte === 0);
      if (isAllZeros) {
        return uint8.length === 8 ? "0.0.0.0/0" : "::/0";
      }
      const prefixLen = maskBytes.reduce((a, b) => a + (b.toString(2).match(/1/g) || []).length, 0);
      if (uint8.length === 8) {
        const addrStr = Array.from(addrBytes).join(".");
        return `${addrStr}/${prefixLen}`;
      } else {
        const addrStr = this.formatIPv6(addrBytes);
        return `${addrStr}/${prefixLen}`;
      }
    }
    return this.decodeIP(import_pvtsutils4.Convert.ToHex(buf));
  }
  static fromString(text) {
    if (text.includes("/")) {
      const [addr, prefix] = this.parseCIDR(text);
      const maskBytes = new Uint8Array(addr.length);
      let bitsLeft = prefix;
      for (let i = 0; i < maskBytes.length; i++) {
        if (bitsLeft >= 8) {
          maskBytes[i] = 255;
          bitsLeft -= 8;
        } else if (bitsLeft > 0) {
          maskBytes[i] = 255 << 8 - bitsLeft;
          bitsLeft = 0;
        }
      }
      const out = new Uint8Array(addr.length * 2);
      out.set(addr, 0);
      out.set(maskBytes, addr.length);
      return out.buffer;
    }
    const bytes = this.isIPv4(text) ? this.parseIPv4(text) : this.parseIPv6(text);
    return new Uint8Array(bytes).buffer;
  }
};

// front/node_modules/@peculiar/asn1-x509/build/es2015/name.js
var import_pvtsutils5 = __toESM(require_build());
var RelativeDistinguishedName_1;
var RDNSequence_1;
var Name_1;
var DirectoryString = class DirectoryString2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
  toString() {
    return this.bmpString || this.printableString || this.teletexString || this.universalString || this.utf8String || "";
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.TeletexString })
], DirectoryString.prototype, "teletexString", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.PrintableString })
], DirectoryString.prototype, "printableString", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.UniversalString })
], DirectoryString.prototype, "universalString", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Utf8String })
], DirectoryString.prototype, "utf8String", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BmpString })
], DirectoryString.prototype, "bmpString", void 0);
DirectoryString = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], DirectoryString);
var AttributeValue = class AttributeValue2 extends DirectoryString {
  constructor(params = {}) {
    super(params);
    Object.assign(this, params);
  }
  toString() {
    return this.ia5String || (this.anyValue ? import_pvtsutils5.Convert.ToHex(this.anyValue) : super.toString());
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.IA5String })
], AttributeValue.prototype, "ia5String", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any })
], AttributeValue.prototype, "anyValue", void 0);
AttributeValue = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], AttributeValue);
var AttributeTypeAndValue = class {
  constructor(params = {}) {
    this.type = "";
    this.value = new AttributeValue();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], AttributeTypeAndValue.prototype, "type", void 0);
__decorate([
  AsnProp({ type: AttributeValue })
], AttributeTypeAndValue.prototype, "value", void 0);
var RelativeDistinguishedName = RelativeDistinguishedName_1 = class RelativeDistinguishedName2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, RelativeDistinguishedName_1.prototype);
  }
};
RelativeDistinguishedName = RelativeDistinguishedName_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Set, itemType: AttributeTypeAndValue })
], RelativeDistinguishedName);
var RDNSequence = RDNSequence_1 = class RDNSequence2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, RDNSequence_1.prototype);
  }
};
RDNSequence = RDNSequence_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: RelativeDistinguishedName })
], RDNSequence);
var Name = Name_1 = class Name2 extends RDNSequence {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, Name_1.prototype);
  }
};
Name = Name_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], Name);

// front/node_modules/@peculiar/asn1-x509/build/es2015/general_name.js
var AsnIpConverter = {
  fromASN: (value) => IpConverter.toString(AsnOctetStringConverter.fromASN(value)),
  toASN: (value) => AsnOctetStringConverter.toASN(IpConverter.fromString(value))
};
var OtherName = class {
  constructor(params = {}) {
    this.typeId = "";
    this.value = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], OtherName.prototype, "typeId", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, context: 0 })
], OtherName.prototype, "value", void 0);
var EDIPartyName = class {
  constructor(params = {}) {
    this.partyName = new DirectoryString();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: DirectoryString, optional: true, context: 0, implicit: true })
], EDIPartyName.prototype, "nameAssigner", void 0);
__decorate([
  AsnProp({ type: DirectoryString, context: 1, implicit: true })
], EDIPartyName.prototype, "partyName", void 0);
var GeneralName = class GeneralName2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: OtherName, context: 0, implicit: true })
], GeneralName.prototype, "otherName", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.IA5String, context: 1, implicit: true })
], GeneralName.prototype, "rfc822Name", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.IA5String, context: 2, implicit: true })
], GeneralName.prototype, "dNSName", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, context: 3, implicit: true })
], GeneralName.prototype, "x400Address", void 0);
__decorate([
  AsnProp({ type: Name, context: 4, implicit: false })
], GeneralName.prototype, "directoryName", void 0);
__decorate([
  AsnProp({ type: EDIPartyName, context: 5 })
], GeneralName.prototype, "ediPartyName", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.IA5String, context: 6, implicit: true })
], GeneralName.prototype, "uniformResourceIdentifier", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.OctetString,
    context: 7,
    implicit: true,
    converter: AsnIpConverter
  })
], GeneralName.prototype, "iPAddress", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier, context: 8, implicit: true })
], GeneralName.prototype, "registeredID", void 0);
GeneralName = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], GeneralName);

// front/node_modules/@peculiar/asn1-x509/build/es2015/object_identifiers.js
var id_pkix = "1.3.6.1.5.5.7";
var id_pe = `${id_pkix}.1`;
var id_qt = `${id_pkix}.2`;
var id_kp = `${id_pkix}.3`;
var id_ad = `${id_pkix}.48`;
var id_qt_csp = `${id_qt}.1`;
var id_qt_unotice = `${id_qt}.2`;
var id_ad_ocsp = `${id_ad}.1`;
var id_ad_caIssuers = `${id_ad}.2`;
var id_ad_timeStamping = `${id_ad}.3`;
var id_ad_caRepository = `${id_ad}.5`;
var id_ce = "2.5.29";

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/authority_information_access.js
var AuthorityInfoAccessSyntax_1;
var id_pe_authorityInfoAccess = `${id_pe}.1`;
var AccessDescription = class {
  constructor(params = {}) {
    this.accessMethod = "";
    this.accessLocation = new GeneralName();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], AccessDescription.prototype, "accessMethod", void 0);
__decorate([
  AsnProp({ type: GeneralName })
], AccessDescription.prototype, "accessLocation", void 0);
var AuthorityInfoAccessSyntax = AuthorityInfoAccessSyntax_1 = class AuthorityInfoAccessSyntax2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, AuthorityInfoAccessSyntax_1.prototype);
  }
};
AuthorityInfoAccessSyntax = AuthorityInfoAccessSyntax_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: AccessDescription })
], AuthorityInfoAccessSyntax);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/authority_key_identifier.js
var id_ce_authorityKeyIdentifier = `${id_ce}.35`;
var KeyIdentifier = class extends OctetString2 {
};
var AuthorityKeyIdentifier = class {
  constructor(params = {}) {
    if (params) {
      Object.assign(this, params);
    }
  }
};
__decorate([
  AsnProp({ type: KeyIdentifier, context: 0, optional: true, implicit: true })
], AuthorityKeyIdentifier.prototype, "keyIdentifier", void 0);
__decorate([
  AsnProp({ type: GeneralName, context: 1, optional: true, implicit: true, repeated: "sequence" })
], AuthorityKeyIdentifier.prototype, "authorityCertIssuer", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.Integer,
    context: 2,
    optional: true,
    implicit: true,
    converter: AsnIntegerArrayBufferConverter
  })
], AuthorityKeyIdentifier.prototype, "authorityCertSerialNumber", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/basic_constraints.js
var id_ce_basicConstraints = `${id_ce}.19`;
var BasicConstraints = class {
  constructor(params = {}) {
    this.cA = false;
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Boolean, defaultValue: false })
], BasicConstraints.prototype, "cA", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, optional: true })
], BasicConstraints.prototype, "pathLenConstraint", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/general_names.js
var GeneralNames_1;
var GeneralNames = GeneralNames_1 = class GeneralNames2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, GeneralNames_1.prototype);
  }
};
GeneralNames = GeneralNames_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: GeneralName })
], GeneralNames);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/certificate_issuer.js
var CertificateIssuer_1;
var id_ce_certificateIssuer = `${id_ce}.29`;
var CertificateIssuer = CertificateIssuer_1 = class CertificateIssuer2 extends GeneralNames {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, CertificateIssuer_1.prototype);
  }
};
CertificateIssuer = CertificateIssuer_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], CertificateIssuer);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/certificate_policies.js
var CertificatePolicies_1;
var id_ce_certificatePolicies = `${id_ce}.32`;
var id_ce_certificatePolicies_anyPolicy = `${id_ce_certificatePolicies}.0`;
var DisplayText = class DisplayText2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
  toString() {
    return this.ia5String || this.visibleString || this.bmpString || this.utf8String || "";
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.IA5String })
], DisplayText.prototype, "ia5String", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.VisibleString })
], DisplayText.prototype, "visibleString", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BmpString })
], DisplayText.prototype, "bmpString", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Utf8String })
], DisplayText.prototype, "utf8String", void 0);
DisplayText = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], DisplayText);
var NoticeReference = class {
  constructor(params = {}) {
    this.organization = new DisplayText();
    this.noticeNumbers = [];
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: DisplayText })
], NoticeReference.prototype, "organization", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, repeated: "sequence" })
], NoticeReference.prototype, "noticeNumbers", void 0);
var UserNotice = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: NoticeReference, optional: true })
], UserNotice.prototype, "noticeRef", void 0);
__decorate([
  AsnProp({ type: DisplayText, optional: true })
], UserNotice.prototype, "explicitText", void 0);
var Qualifier = class Qualifier2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.IA5String })
], Qualifier.prototype, "cPSuri", void 0);
__decorate([
  AsnProp({ type: UserNotice })
], Qualifier.prototype, "userNotice", void 0);
Qualifier = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], Qualifier);
var PolicyQualifierInfo = class {
  constructor(params = {}) {
    this.policyQualifierId = "";
    this.qualifier = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], PolicyQualifierInfo.prototype, "policyQualifierId", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any })
], PolicyQualifierInfo.prototype, "qualifier", void 0);
var PolicyInformation = class {
  constructor(params = {}) {
    this.policyIdentifier = "";
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], PolicyInformation.prototype, "policyIdentifier", void 0);
__decorate([
  AsnProp({ type: PolicyQualifierInfo, repeated: "sequence", optional: true })
], PolicyInformation.prototype, "policyQualifiers", void 0);
var CertificatePolicies = CertificatePolicies_1 = class CertificatePolicies2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, CertificatePolicies_1.prototype);
  }
};
CertificatePolicies = CertificatePolicies_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: PolicyInformation })
], CertificatePolicies);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/crl_number.js
var id_ce_cRLNumber = `${id_ce}.20`;
var CRLNumber = class CRLNumber2 {
  constructor(value = 0) {
    this.value = value;
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], CRLNumber.prototype, "value", void 0);
CRLNumber = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], CRLNumber);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/crl_delta_indicator.js
var id_ce_deltaCRLIndicator = `${id_ce}.27`;
var BaseCRLNumber = class BaseCRLNumber2 extends CRLNumber {
};
BaseCRLNumber = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], BaseCRLNumber);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/crl_distribution_points.js
var CRLDistributionPoints_1;
var id_ce_cRLDistributionPoints = `${id_ce}.31`;
var ReasonFlags;
(function(ReasonFlags2) {
  ReasonFlags2[ReasonFlags2["unused"] = 1] = "unused";
  ReasonFlags2[ReasonFlags2["keyCompromise"] = 2] = "keyCompromise";
  ReasonFlags2[ReasonFlags2["cACompromise"] = 4] = "cACompromise";
  ReasonFlags2[ReasonFlags2["affiliationChanged"] = 8] = "affiliationChanged";
  ReasonFlags2[ReasonFlags2["superseded"] = 16] = "superseded";
  ReasonFlags2[ReasonFlags2["cessationOfOperation"] = 32] = "cessationOfOperation";
  ReasonFlags2[ReasonFlags2["certificateHold"] = 64] = "certificateHold";
  ReasonFlags2[ReasonFlags2["privilegeWithdrawn"] = 128] = "privilegeWithdrawn";
  ReasonFlags2[ReasonFlags2["aACompromise"] = 256] = "aACompromise";
})(ReasonFlags || (ReasonFlags = {}));
var Reason = class extends BitString2 {
  toJSON() {
    const res = [];
    const flags = this.toNumber();
    if (flags & ReasonFlags.aACompromise) {
      res.push("aACompromise");
    }
    if (flags & ReasonFlags.affiliationChanged) {
      res.push("affiliationChanged");
    }
    if (flags & ReasonFlags.cACompromise) {
      res.push("cACompromise");
    }
    if (flags & ReasonFlags.certificateHold) {
      res.push("certificateHold");
    }
    if (flags & ReasonFlags.cessationOfOperation) {
      res.push("cessationOfOperation");
    }
    if (flags & ReasonFlags.keyCompromise) {
      res.push("keyCompromise");
    }
    if (flags & ReasonFlags.privilegeWithdrawn) {
      res.push("privilegeWithdrawn");
    }
    if (flags & ReasonFlags.superseded) {
      res.push("superseded");
    }
    if (flags & ReasonFlags.unused) {
      res.push("unused");
    }
    return res;
  }
  toString() {
    return `[${this.toJSON().join(", ")}]`;
  }
};
var DistributionPointName = class DistributionPointName2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralName, context: 0, repeated: "sequence", implicit: true })
], DistributionPointName.prototype, "fullName", void 0);
__decorate([
  AsnProp({ type: RelativeDistinguishedName, context: 1, implicit: true })
], DistributionPointName.prototype, "nameRelativeToCRLIssuer", void 0);
DistributionPointName = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], DistributionPointName);
var DistributionPoint = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: DistributionPointName, context: 0, optional: true })
], DistributionPoint.prototype, "distributionPoint", void 0);
__decorate([
  AsnProp({ type: Reason, context: 1, optional: true, implicit: true })
], DistributionPoint.prototype, "reasons", void 0);
__decorate([
  AsnProp({ type: GeneralName, context: 2, optional: true, repeated: "sequence", implicit: true })
], DistributionPoint.prototype, "cRLIssuer", void 0);
var CRLDistributionPoints = CRLDistributionPoints_1 = class CRLDistributionPoints2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, CRLDistributionPoints_1.prototype);
  }
};
CRLDistributionPoints = CRLDistributionPoints_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: DistributionPoint })
], CRLDistributionPoints);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/crl_freshest.js
var FreshestCRL_1;
var id_ce_freshestCRL = `${id_ce}.46`;
var FreshestCRL = FreshestCRL_1 = class FreshestCRL2 extends CRLDistributionPoints {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, FreshestCRL_1.prototype);
  }
};
FreshestCRL = FreshestCRL_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: DistributionPoint })
], FreshestCRL);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/crl_issuing_distribution_point.js
var id_ce_issuingDistributionPoint = `${id_ce}.28`;
var IssuingDistributionPoint = class _IssuingDistributionPoint {
  constructor(params = {}) {
    this.onlyContainsUserCerts = _IssuingDistributionPoint.ONLY;
    this.onlyContainsCACerts = _IssuingDistributionPoint.ONLY;
    this.indirectCRL = _IssuingDistributionPoint.ONLY;
    this.onlyContainsAttributeCerts = _IssuingDistributionPoint.ONLY;
    Object.assign(this, params);
  }
};
IssuingDistributionPoint.ONLY = false;
__decorate([
  AsnProp({ type: DistributionPointName, context: 0, optional: true })
], IssuingDistributionPoint.prototype, "distributionPoint", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.Boolean,
    context: 1,
    defaultValue: IssuingDistributionPoint.ONLY,
    implicit: true
  })
], IssuingDistributionPoint.prototype, "onlyContainsUserCerts", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.Boolean,
    context: 2,
    defaultValue: IssuingDistributionPoint.ONLY,
    implicit: true
  })
], IssuingDistributionPoint.prototype, "onlyContainsCACerts", void 0);
__decorate([
  AsnProp({ type: Reason, context: 3, optional: true, implicit: true })
], IssuingDistributionPoint.prototype, "onlySomeReasons", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.Boolean,
    context: 4,
    defaultValue: IssuingDistributionPoint.ONLY,
    implicit: true
  })
], IssuingDistributionPoint.prototype, "indirectCRL", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.Boolean,
    context: 5,
    defaultValue: IssuingDistributionPoint.ONLY,
    implicit: true
  })
], IssuingDistributionPoint.prototype, "onlyContainsAttributeCerts", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/crl_reason.js
var id_ce_cRLReasons = `${id_ce}.21`;
var CRLReasons;
(function(CRLReasons2) {
  CRLReasons2[CRLReasons2["unspecified"] = 0] = "unspecified";
  CRLReasons2[CRLReasons2["keyCompromise"] = 1] = "keyCompromise";
  CRLReasons2[CRLReasons2["cACompromise"] = 2] = "cACompromise";
  CRLReasons2[CRLReasons2["affiliationChanged"] = 3] = "affiliationChanged";
  CRLReasons2[CRLReasons2["superseded"] = 4] = "superseded";
  CRLReasons2[CRLReasons2["cessationOfOperation"] = 5] = "cessationOfOperation";
  CRLReasons2[CRLReasons2["certificateHold"] = 6] = "certificateHold";
  CRLReasons2[CRLReasons2["removeFromCRL"] = 8] = "removeFromCRL";
  CRLReasons2[CRLReasons2["privilegeWithdrawn"] = 9] = "privilegeWithdrawn";
  CRLReasons2[CRLReasons2["aACompromise"] = 10] = "aACompromise";
})(CRLReasons || (CRLReasons = {}));
var CRLReason = class CRLReason2 {
  constructor(reason = CRLReasons.unspecified) {
    this.reason = CRLReasons.unspecified;
    this.reason = reason;
  }
  toJSON() {
    return CRLReasons[this.reason];
  }
  toString() {
    return this.toJSON();
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Enumerated })
], CRLReason.prototype, "reason", void 0);
CRLReason = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], CRLReason);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/extended_key_usage.js
var ExtendedKeyUsage_1;
var id_ce_extKeyUsage = `${id_ce}.37`;
var ExtendedKeyUsage = ExtendedKeyUsage_1 = class ExtendedKeyUsage2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, ExtendedKeyUsage_1.prototype);
  }
};
ExtendedKeyUsage = ExtendedKeyUsage_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: AsnPropTypes.ObjectIdentifier })
], ExtendedKeyUsage);
var anyExtendedKeyUsage = `${id_ce_extKeyUsage}.0`;
var id_kp_serverAuth = `${id_kp}.1`;
var id_kp_clientAuth = `${id_kp}.2`;
var id_kp_codeSigning = `${id_kp}.3`;
var id_kp_emailProtection = `${id_kp}.4`;
var id_kp_timeStamping = `${id_kp}.8`;
var id_kp_OCSPSigning = `${id_kp}.9`;

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/inhibit_any_policy.js
var id_ce_inhibitAnyPolicy = `${id_ce}.54`;
var InhibitAnyPolicy = class InhibitAnyPolicy2 {
  constructor(value = new ArrayBuffer(0)) {
    this.value = value;
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], InhibitAnyPolicy.prototype, "value", void 0);
InhibitAnyPolicy = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], InhibitAnyPolicy);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/invalidity_date.js
var id_ce_invalidityDate = `${id_ce}.24`;
var InvalidityDate = class InvalidityDate2 {
  constructor(value) {
    this.value = /* @__PURE__ */ new Date();
    if (value) {
      this.value = value;
    }
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.GeneralizedTime })
], InvalidityDate.prototype, "value", void 0);
InvalidityDate = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], InvalidityDate);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/issuer_alternative_name.js
var IssueAlternativeName_1;
var id_ce_issuerAltName = `${id_ce}.18`;
var IssueAlternativeName = IssueAlternativeName_1 = class IssueAlternativeName2 extends GeneralNames {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, IssueAlternativeName_1.prototype);
  }
};
IssueAlternativeName = IssueAlternativeName_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], IssueAlternativeName);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/key_usage.js
var id_ce_keyUsage = `${id_ce}.15`;
var KeyUsageFlags;
(function(KeyUsageFlags3) {
  KeyUsageFlags3[KeyUsageFlags3["digitalSignature"] = 1] = "digitalSignature";
  KeyUsageFlags3[KeyUsageFlags3["nonRepudiation"] = 2] = "nonRepudiation";
  KeyUsageFlags3[KeyUsageFlags3["keyEncipherment"] = 4] = "keyEncipherment";
  KeyUsageFlags3[KeyUsageFlags3["dataEncipherment"] = 8] = "dataEncipherment";
  KeyUsageFlags3[KeyUsageFlags3["keyAgreement"] = 16] = "keyAgreement";
  KeyUsageFlags3[KeyUsageFlags3["keyCertSign"] = 32] = "keyCertSign";
  KeyUsageFlags3[KeyUsageFlags3["cRLSign"] = 64] = "cRLSign";
  KeyUsageFlags3[KeyUsageFlags3["encipherOnly"] = 128] = "encipherOnly";
  KeyUsageFlags3[KeyUsageFlags3["decipherOnly"] = 256] = "decipherOnly";
})(KeyUsageFlags || (KeyUsageFlags = {}));
var KeyUsage = class extends BitString2 {
  toJSON() {
    const flag = this.toNumber();
    const res = [];
    if (flag & KeyUsageFlags.cRLSign) {
      res.push("crlSign");
    }
    if (flag & KeyUsageFlags.dataEncipherment) {
      res.push("dataEncipherment");
    }
    if (flag & KeyUsageFlags.decipherOnly) {
      res.push("decipherOnly");
    }
    if (flag & KeyUsageFlags.digitalSignature) {
      res.push("digitalSignature");
    }
    if (flag & KeyUsageFlags.encipherOnly) {
      res.push("encipherOnly");
    }
    if (flag & KeyUsageFlags.keyAgreement) {
      res.push("keyAgreement");
    }
    if (flag & KeyUsageFlags.keyCertSign) {
      res.push("keyCertSign");
    }
    if (flag & KeyUsageFlags.keyEncipherment) {
      res.push("keyEncipherment");
    }
    if (flag & KeyUsageFlags.nonRepudiation) {
      res.push("nonRepudiation");
    }
    return res;
  }
  toString() {
    return `[${this.toJSON().join(", ")}]`;
  }
};

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/name_constraints.js
var GeneralSubtrees_1;
var id_ce_nameConstraints = `${id_ce}.30`;
var GeneralSubtree = class {
  constructor(params = {}) {
    this.base = new GeneralName();
    this.minimum = 0;
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralName })
], GeneralSubtree.prototype, "base", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, context: 0, defaultValue: 0, implicit: true })
], GeneralSubtree.prototype, "minimum", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, context: 1, optional: true, implicit: true })
], GeneralSubtree.prototype, "maximum", void 0);
var GeneralSubtrees = GeneralSubtrees_1 = class GeneralSubtrees2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, GeneralSubtrees_1.prototype);
  }
};
GeneralSubtrees = GeneralSubtrees_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: GeneralSubtree })
], GeneralSubtrees);
var NameConstraints = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralSubtrees, context: 0, optional: true, implicit: true })
], NameConstraints.prototype, "permittedSubtrees", void 0);
__decorate([
  AsnProp({ type: GeneralSubtrees, context: 1, optional: true, implicit: true })
], NameConstraints.prototype, "excludedSubtrees", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/policy_constraints.js
var id_ce_policyConstraints = `${id_ce}.36`;
var PolicyConstraints = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({
    type: AsnPropTypes.Integer,
    context: 0,
    implicit: true,
    optional: true,
    converter: AsnIntegerArrayBufferConverter
  })
], PolicyConstraints.prototype, "requireExplicitPolicy", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.Integer,
    context: 1,
    implicit: true,
    optional: true,
    converter: AsnIntegerArrayBufferConverter
  })
], PolicyConstraints.prototype, "inhibitPolicyMapping", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/policy_mappings.js
var PolicyMappings_1;
var id_ce_policyMappings = `${id_ce}.33`;
var PolicyMapping = class {
  constructor(params = {}) {
    this.issuerDomainPolicy = "";
    this.subjectDomainPolicy = "";
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], PolicyMapping.prototype, "issuerDomainPolicy", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], PolicyMapping.prototype, "subjectDomainPolicy", void 0);
var PolicyMappings = PolicyMappings_1 = class PolicyMappings2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, PolicyMappings_1.prototype);
  }
};
PolicyMappings = PolicyMappings_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: PolicyMapping })
], PolicyMappings);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/subject_alternative_name.js
var SubjectAlternativeName_1;
var id_ce_subjectAltName = `${id_ce}.17`;
var SubjectAlternativeName = SubjectAlternativeName_1 = class SubjectAlternativeName2 extends GeneralNames {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, SubjectAlternativeName_1.prototype);
  }
};
SubjectAlternativeName = SubjectAlternativeName_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], SubjectAlternativeName);

// front/node_modules/@peculiar/asn1-x509/build/es2015/attribute.js
var Attribute = class {
  constructor(params = {}) {
    this.type = "";
    this.values = [];
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], Attribute.prototype, "type", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, repeated: "set" })
], Attribute.prototype, "values", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/subject_directory_attributes.js
var SubjectDirectoryAttributes_1;
var id_ce_subjectDirectoryAttributes = `${id_ce}.9`;
var SubjectDirectoryAttributes = SubjectDirectoryAttributes_1 = class SubjectDirectoryAttributes2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, SubjectDirectoryAttributes_1.prototype);
  }
};
SubjectDirectoryAttributes = SubjectDirectoryAttributes_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: Attribute })
], SubjectDirectoryAttributes);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/subject_key_identifier.js
var id_ce_subjectKeyIdentifier = `${id_ce}.14`;
var SubjectKeyIdentifier = class extends KeyIdentifier {
};

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/private_key_usage_period.js
var id_ce_privateKeyUsagePeriod = `${id_ce}.16`;
var PrivateKeyUsagePeriod = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.GeneralizedTime, context: 0, implicit: true, optional: true })
], PrivateKeyUsagePeriod.prototype, "notBefore", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.GeneralizedTime, context: 1, implicit: true, optional: true })
], PrivateKeyUsagePeriod.prototype, "notAfter", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/entrust_version_info.js
var EntrustInfoFlags;
(function(EntrustInfoFlags2) {
  EntrustInfoFlags2[EntrustInfoFlags2["keyUpdateAllowed"] = 1] = "keyUpdateAllowed";
  EntrustInfoFlags2[EntrustInfoFlags2["newExtensions"] = 2] = "newExtensions";
  EntrustInfoFlags2[EntrustInfoFlags2["pKIXCertificate"] = 4] = "pKIXCertificate";
})(EntrustInfoFlags || (EntrustInfoFlags = {}));
var EntrustInfo = class extends BitString2 {
  toJSON() {
    const res = [];
    const flags = this.toNumber();
    if (flags & EntrustInfoFlags.pKIXCertificate) {
      res.push("pKIXCertificate");
    }
    if (flags & EntrustInfoFlags.newExtensions) {
      res.push("newExtensions");
    }
    if (flags & EntrustInfoFlags.keyUpdateAllowed) {
      res.push("keyUpdateAllowed");
    }
    return res;
  }
  toString() {
    return `[${this.toJSON().join(", ")}]`;
  }
};
var EntrustVersionInfo = class {
  constructor(params = {}) {
    this.entrustVers = "";
    this.entrustInfoFlags = new EntrustInfo();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.GeneralString })
], EntrustVersionInfo.prototype, "entrustVers", void 0);
__decorate([
  AsnProp({ type: EntrustInfo })
], EntrustVersionInfo.prototype, "entrustInfoFlags", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extensions/subject_info_access.js
var SubjectInfoAccessSyntax_1;
var id_pe_subjectInfoAccess = `${id_pe}.11`;
var SubjectInfoAccessSyntax = SubjectInfoAccessSyntax_1 = class SubjectInfoAccessSyntax2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, SubjectInfoAccessSyntax_1.prototype);
  }
};
SubjectInfoAccessSyntax = SubjectInfoAccessSyntax_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: AccessDescription })
], SubjectInfoAccessSyntax);

// front/node_modules/@peculiar/asn1-x509/build/es2015/algorithm_identifier.js
var pvtsutils2 = __toESM(require_build());
var AlgorithmIdentifier = class _AlgorithmIdentifier {
  constructor(params = {}) {
    this.algorithm = "";
    Object.assign(this, params);
  }
  isEqual(data) {
    return data instanceof _AlgorithmIdentifier && data.algorithm == this.algorithm && (data.parameters && this.parameters && pvtsutils2.isEqual(data.parameters, this.parameters) || data.parameters === this.parameters);
  }
};
__decorate([
  AsnProp({
    type: AsnPropTypes.ObjectIdentifier
  })
], AlgorithmIdentifier.prototype, "algorithm", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.Any,
    optional: true
  })
], AlgorithmIdentifier.prototype, "parameters", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/subject_public_key_info.js
var SubjectPublicKeyInfo = class {
  constructor(params = {}) {
    this.algorithm = new AlgorithmIdentifier();
    this.subjectPublicKey = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], SubjectPublicKeyInfo.prototype, "algorithm", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString })
], SubjectPublicKeyInfo.prototype, "subjectPublicKey", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/time.js
var Time = class Time2 {
  constructor(time) {
    if (time) {
      if (typeof time === "string" || typeof time === "number" || time instanceof Date) {
        const date = new Date(time);
        if (date.getUTCFullYear() > 2049) {
          this.generalTime = date;
        } else {
          this.utcTime = date;
        }
      } else {
        Object.assign(this, time);
      }
    }
  }
  getTime() {
    const time = this.utcTime || this.generalTime;
    if (!time) {
      throw new Error("Cannot get time from CHOICE object");
    }
    return time;
  }
};
__decorate([
  AsnProp({
    type: AsnPropTypes.UTCTime
  })
], Time.prototype, "utcTime", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.GeneralizedTime
  })
], Time.prototype, "generalTime", void 0);
Time = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], Time);

// front/node_modules/@peculiar/asn1-x509/build/es2015/validity.js
var Validity = class {
  constructor(params) {
    this.notBefore = new Time(/* @__PURE__ */ new Date());
    this.notAfter = new Time(/* @__PURE__ */ new Date());
    if (params) {
      this.notBefore = new Time(params.notBefore);
      this.notAfter = new Time(params.notAfter);
    }
  }
};
__decorate([
  AsnProp({ type: Time })
], Validity.prototype, "notBefore", void 0);
__decorate([
  AsnProp({ type: Time })
], Validity.prototype, "notAfter", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/extension.js
var Extensions_1;
var Extension = class _Extension {
  constructor(params = {}) {
    this.extnID = "";
    this.critical = _Extension.CRITICAL;
    this.extnValue = new OctetString2();
    Object.assign(this, params);
  }
};
Extension.CRITICAL = false;
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], Extension.prototype, "extnID", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.Boolean,
    defaultValue: Extension.CRITICAL
  })
], Extension.prototype, "critical", void 0);
__decorate([
  AsnProp({ type: OctetString2 })
], Extension.prototype, "extnValue", void 0);
var Extensions = Extensions_1 = class Extensions2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, Extensions_1.prototype);
  }
};
Extensions = Extensions_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: Extension })
], Extensions);

// front/node_modules/@peculiar/asn1-x509/build/es2015/types.js
var Version;
(function(Version3) {
  Version3[Version3["v1"] = 0] = "v1";
  Version3[Version3["v2"] = 1] = "v2";
  Version3[Version3["v3"] = 2] = "v3";
})(Version || (Version = {}));

// front/node_modules/@peculiar/asn1-x509/build/es2015/tbs_certificate.js
var TBSCertificate = class {
  constructor(params = {}) {
    this.version = Version.v1;
    this.serialNumber = new ArrayBuffer(0);
    this.signature = new AlgorithmIdentifier();
    this.issuer = new Name();
    this.validity = new Validity();
    this.subject = new Name();
    this.subjectPublicKeyInfo = new SubjectPublicKeyInfo();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({
    type: AsnPropTypes.Integer,
    context: 0,
    defaultValue: Version.v1
  })
], TBSCertificate.prototype, "version", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  })
], TBSCertificate.prototype, "serialNumber", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], TBSCertificate.prototype, "signature", void 0);
__decorate([
  AsnProp({ type: Name })
], TBSCertificate.prototype, "issuer", void 0);
__decorate([
  AsnProp({ type: Validity })
], TBSCertificate.prototype, "validity", void 0);
__decorate([
  AsnProp({ type: Name })
], TBSCertificate.prototype, "subject", void 0);
__decorate([
  AsnProp({ type: SubjectPublicKeyInfo })
], TBSCertificate.prototype, "subjectPublicKeyInfo", void 0);
__decorate([
  AsnProp({
    type: AsnPropTypes.BitString,
    context: 1,
    implicit: true,
    optional: true
  })
], TBSCertificate.prototype, "issuerUniqueID", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString, context: 2, implicit: true, optional: true })
], TBSCertificate.prototype, "subjectUniqueID", void 0);
__decorate([
  AsnProp({ type: Extensions, context: 3, optional: true })
], TBSCertificate.prototype, "extensions", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/certificate.js
var Certificate = class {
  constructor(params = {}) {
    this.tbsCertificate = new TBSCertificate();
    this.signatureAlgorithm = new AlgorithmIdentifier();
    this.signatureValue = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: TBSCertificate })
], Certificate.prototype, "tbsCertificate", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], Certificate.prototype, "signatureAlgorithm", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString })
], Certificate.prototype, "signatureValue", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/tbs_cert_list.js
var RevokedCertificate = class {
  constructor(params = {}) {
    this.userCertificate = new ArrayBuffer(0);
    this.revocationDate = new Time();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RevokedCertificate.prototype, "userCertificate", void 0);
__decorate([
  AsnProp({ type: Time })
], RevokedCertificate.prototype, "revocationDate", void 0);
__decorate([
  AsnProp({ type: Extension, optional: true, repeated: "sequence" })
], RevokedCertificate.prototype, "crlEntryExtensions", void 0);
var TBSCertList = class {
  constructor(params = {}) {
    this.signature = new AlgorithmIdentifier();
    this.issuer = new Name();
    this.thisUpdate = new Time();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, optional: true })
], TBSCertList.prototype, "version", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], TBSCertList.prototype, "signature", void 0);
__decorate([
  AsnProp({ type: Name })
], TBSCertList.prototype, "issuer", void 0);
__decorate([
  AsnProp({ type: Time })
], TBSCertList.prototype, "thisUpdate", void 0);
__decorate([
  AsnProp({ type: Time, optional: true })
], TBSCertList.prototype, "nextUpdate", void 0);
__decorate([
  AsnProp({ type: RevokedCertificate, repeated: "sequence", optional: true })
], TBSCertList.prototype, "revokedCertificates", void 0);
__decorate([
  AsnProp({ type: Extension, optional: true, context: 0, repeated: "sequence" })
], TBSCertList.prototype, "crlExtensions", void 0);

// front/node_modules/@peculiar/asn1-x509/build/es2015/certificate_list.js
var CertificateList = class {
  constructor(params = {}) {
    this.tbsCertList = new TBSCertList();
    this.signatureAlgorithm = new AlgorithmIdentifier();
    this.signature = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: TBSCertList })
], CertificateList.prototype, "tbsCertList", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], CertificateList.prototype, "signatureAlgorithm", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString })
], CertificateList.prototype, "signature", void 0);

// front/node_modules/@peculiar/x509/build/x509.es.js
var import_pvtsutils6 = __toESM(require_build());

// front/node_modules/@peculiar/asn1-cms/build/es2015/issuer_and_serial_number.js
var IssuerAndSerialNumber = class {
  constructor(params = {}) {
    this.issuer = new Name();
    this.serialNumber = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: Name })
], IssuerAndSerialNumber.prototype, "issuer", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], IssuerAndSerialNumber.prototype, "serialNumber", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/signer_identifier.js
var SignerIdentifier = class SignerIdentifier2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: SubjectKeyIdentifier, context: 0, implicit: true })
], SignerIdentifier.prototype, "subjectKeyIdentifier", void 0);
__decorate([
  AsnProp({ type: IssuerAndSerialNumber })
], SignerIdentifier.prototype, "issuerAndSerialNumber", void 0);
SignerIdentifier = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], SignerIdentifier);

// front/node_modules/@peculiar/asn1-cms/build/es2015/types.js
var CMSVersion;
(function(CMSVersion2) {
  CMSVersion2[CMSVersion2["v0"] = 0] = "v0";
  CMSVersion2[CMSVersion2["v1"] = 1] = "v1";
  CMSVersion2[CMSVersion2["v2"] = 2] = "v2";
  CMSVersion2[CMSVersion2["v3"] = 3] = "v3";
  CMSVersion2[CMSVersion2["v4"] = 4] = "v4";
  CMSVersion2[CMSVersion2["v5"] = 5] = "v5";
})(CMSVersion || (CMSVersion = {}));
var DigestAlgorithmIdentifier = class DigestAlgorithmIdentifier2 extends AlgorithmIdentifier {
};
DigestAlgorithmIdentifier = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], DigestAlgorithmIdentifier);
var SignatureAlgorithmIdentifier = class SignatureAlgorithmIdentifier2 extends AlgorithmIdentifier {
};
SignatureAlgorithmIdentifier = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], SignatureAlgorithmIdentifier);
var KeyEncryptionAlgorithmIdentifier = class KeyEncryptionAlgorithmIdentifier2 extends AlgorithmIdentifier {
};
KeyEncryptionAlgorithmIdentifier = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], KeyEncryptionAlgorithmIdentifier);
var ContentEncryptionAlgorithmIdentifier = class ContentEncryptionAlgorithmIdentifier2 extends AlgorithmIdentifier {
};
ContentEncryptionAlgorithmIdentifier = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], ContentEncryptionAlgorithmIdentifier);
var MessageAuthenticationCodeAlgorithm = class MessageAuthenticationCodeAlgorithm2 extends AlgorithmIdentifier {
};
MessageAuthenticationCodeAlgorithm = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], MessageAuthenticationCodeAlgorithm);
var KeyDerivationAlgorithmIdentifier = class KeyDerivationAlgorithmIdentifier2 extends AlgorithmIdentifier {
};
KeyDerivationAlgorithmIdentifier = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], KeyDerivationAlgorithmIdentifier);

// front/node_modules/@peculiar/asn1-cms/build/es2015/attribute.js
var Attribute2 = class {
  constructor(params = {}) {
    this.attrType = "";
    this.attrValues = [];
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], Attribute2.prototype, "attrType", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, repeated: "set" })
], Attribute2.prototype, "attrValues", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/signer_info.js
var SignerInfos_1;
var SignerInfo = class {
  constructor(params = {}) {
    this.version = CMSVersion.v0;
    this.sid = new SignerIdentifier();
    this.digestAlgorithm = new DigestAlgorithmIdentifier();
    this.signatureAlgorithm = new SignatureAlgorithmIdentifier();
    this.signature = new OctetString2();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], SignerInfo.prototype, "version", void 0);
__decorate([
  AsnProp({ type: SignerIdentifier })
], SignerInfo.prototype, "sid", void 0);
__decorate([
  AsnProp({ type: DigestAlgorithmIdentifier })
], SignerInfo.prototype, "digestAlgorithm", void 0);
__decorate([
  AsnProp({ type: Attribute2, repeated: "set", context: 0, implicit: true, optional: true })
], SignerInfo.prototype, "signedAttrs", void 0);
__decorate([
  AsnProp({ type: SignatureAlgorithmIdentifier })
], SignerInfo.prototype, "signatureAlgorithm", void 0);
__decorate([
  AsnProp({ type: OctetString2 })
], SignerInfo.prototype, "signature", void 0);
__decorate([
  AsnProp({ type: Attribute2, repeated: "set", context: 1, implicit: true, optional: true })
], SignerInfo.prototype, "unsignedAttrs", void 0);
var SignerInfos = SignerInfos_1 = class SignerInfos2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, SignerInfos_1.prototype);
  }
};
SignerInfos = SignerInfos_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Set, itemType: SignerInfo })
], SignerInfos);

// front/node_modules/@peculiar/asn1-cms/build/es2015/attributes.js
var SigningTime = class SigningTime2 extends Time {
};
SigningTime = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], SigningTime);
var CounterSignature = class CounterSignature2 extends SignerInfo {
};
CounterSignature = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], CounterSignature);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/aa_clear_attrs.js
var ACClearAttrs = class {
  constructor(params = {}) {
    this.acIssuer = new GeneralName();
    this.acSerial = 0;
    this.attrs = [];
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralName })
], ACClearAttrs.prototype, "acIssuer", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], ACClearAttrs.prototype, "acSerial", void 0);
__decorate([
  AsnProp({ type: Attribute, repeated: "sequence" })
], ACClearAttrs.prototype, "attrs", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_spec.js
var AttrSpec_1;
var AttrSpec = AttrSpec_1 = class AttrSpec2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, AttrSpec_1.prototype);
  }
};
AttrSpec = AttrSpec_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: AsnPropTypes.ObjectIdentifier })
], AttrSpec);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/aa_controls.js
var AAControls = class {
  constructor(params = {}) {
    this.permitUnSpecified = true;
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, optional: true })
], AAControls.prototype, "pathLenConstraint", void 0);
__decorate([
  AsnProp({ type: AttrSpec, implicit: true, context: 0, optional: true })
], AAControls.prototype, "permittedAttrs", void 0);
__decorate([
  AsnProp({ type: AttrSpec, implicit: true, context: 1, optional: true })
], AAControls.prototype, "excludedAttrs", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Boolean, defaultValue: true })
], AAControls.prototype, "permitUnSpecified", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/issuer_serial.js
var IssuerSerial = class {
  constructor(params = {}) {
    this.issuer = new GeneralNames();
    this.serial = new ArrayBuffer(0);
    this.issuerUID = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralNames })
], IssuerSerial.prototype, "issuer", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], IssuerSerial.prototype, "serial", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString, optional: true })
], IssuerSerial.prototype, "issuerUID", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_digest_info.js
var DigestedObjectType;
(function(DigestedObjectType2) {
  DigestedObjectType2[DigestedObjectType2["publicKey"] = 0] = "publicKey";
  DigestedObjectType2[DigestedObjectType2["publicKeyCert"] = 1] = "publicKeyCert";
  DigestedObjectType2[DigestedObjectType2["otherObjectTypes"] = 2] = "otherObjectTypes";
})(DigestedObjectType || (DigestedObjectType = {}));
var ObjectDigestInfo = class {
  constructor(params = {}) {
    this.digestedObjectType = DigestedObjectType.publicKey;
    this.digestAlgorithm = new AlgorithmIdentifier();
    this.objectDigest = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Enumerated })
], ObjectDigestInfo.prototype, "digestedObjectType", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier, optional: true })
], ObjectDigestInfo.prototype, "otherObjectTypeID", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], ObjectDigestInfo.prototype, "digestAlgorithm", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString })
], ObjectDigestInfo.prototype, "objectDigest", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/v2_form.js
var V2Form = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralNames, optional: true })
], V2Form.prototype, "issuerName", void 0);
__decorate([
  AsnProp({ type: IssuerSerial, context: 0, implicit: true, optional: true })
], V2Form.prototype, "baseCertificateID", void 0);
__decorate([
  AsnProp({ type: ObjectDigestInfo, context: 1, implicit: true, optional: true })
], V2Form.prototype, "objectDigestInfo", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_issuer.js
var AttCertIssuer = class AttCertIssuer2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralName, repeated: "sequence" })
], AttCertIssuer.prototype, "v1Form", void 0);
__decorate([
  AsnProp({ type: V2Form, context: 0, implicit: true })
], AttCertIssuer.prototype, "v2Form", void 0);
AttCertIssuer = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], AttCertIssuer);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/attr_cert_validity_period.js
var AttCertValidityPeriod = class {
  constructor(params = {}) {
    this.notBeforeTime = /* @__PURE__ */ new Date();
    this.notAfterTime = /* @__PURE__ */ new Date();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.GeneralizedTime })
], AttCertValidityPeriod.prototype, "notBeforeTime", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.GeneralizedTime })
], AttCertValidityPeriod.prototype, "notAfterTime", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/holder.js
var Holder = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: IssuerSerial, implicit: true, context: 0, optional: true })
], Holder.prototype, "baseCertificateID", void 0);
__decorate([
  AsnProp({ type: GeneralNames, implicit: true, context: 1, optional: true })
], Holder.prototype, "entityName", void 0);
__decorate([
  AsnProp({ type: ObjectDigestInfo, implicit: true, context: 2, optional: true })
], Holder.prototype, "objectDigestInfo", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/attribute_certificate_info.js
var AttCertVersion;
(function(AttCertVersion2) {
  AttCertVersion2[AttCertVersion2["v2"] = 1] = "v2";
})(AttCertVersion || (AttCertVersion = {}));
var AttributeCertificateInfo = class {
  constructor(params = {}) {
    this.version = AttCertVersion.v2;
    this.holder = new Holder();
    this.issuer = new AttCertIssuer();
    this.signature = new AlgorithmIdentifier();
    this.serialNumber = new ArrayBuffer(0);
    this.attrCertValidityPeriod = new AttCertValidityPeriod();
    this.attributes = [];
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], AttributeCertificateInfo.prototype, "version", void 0);
__decorate([
  AsnProp({ type: Holder })
], AttributeCertificateInfo.prototype, "holder", void 0);
__decorate([
  AsnProp({ type: AttCertIssuer })
], AttributeCertificateInfo.prototype, "issuer", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], AttributeCertificateInfo.prototype, "signature", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], AttributeCertificateInfo.prototype, "serialNumber", void 0);
__decorate([
  AsnProp({ type: AttCertValidityPeriod })
], AttributeCertificateInfo.prototype, "attrCertValidityPeriod", void 0);
__decorate([
  AsnProp({ type: Attribute, repeated: "sequence" })
], AttributeCertificateInfo.prototype, "attributes", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString, optional: true })
], AttributeCertificateInfo.prototype, "issuerUniqueID", void 0);
__decorate([
  AsnProp({ type: Extensions, optional: true })
], AttributeCertificateInfo.prototype, "extensions", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/attribute_certificate.js
var AttributeCertificate = class {
  constructor(params = {}) {
    this.acinfo = new AttributeCertificateInfo();
    this.signatureAlgorithm = new AlgorithmIdentifier();
    this.signatureValue = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AttributeCertificateInfo })
], AttributeCertificate.prototype, "acinfo", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], AttributeCertificate.prototype, "signatureAlgorithm", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString })
], AttributeCertificate.prototype, "signatureValue", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/class_list.js
var ClassListFlags;
(function(ClassListFlags2) {
  ClassListFlags2[ClassListFlags2["unmarked"] = 1] = "unmarked";
  ClassListFlags2[ClassListFlags2["unclassified"] = 2] = "unclassified";
  ClassListFlags2[ClassListFlags2["restricted"] = 4] = "restricted";
  ClassListFlags2[ClassListFlags2["confidential"] = 8] = "confidential";
  ClassListFlags2[ClassListFlags2["secret"] = 16] = "secret";
  ClassListFlags2[ClassListFlags2["topSecret"] = 32] = "topSecret";
})(ClassListFlags || (ClassListFlags = {}));
var ClassList = class extends BitString2 {
};

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/security_category.js
var SecurityCategory = class {
  constructor(params = {}) {
    this.type = "";
    this.value = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier, implicit: true, context: 0 })
], SecurityCategory.prototype, "type", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, implicit: true, context: 1 })
], SecurityCategory.prototype, "value", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/clearance.js
var Clearance = class {
  constructor(params = {}) {
    this.policyId = "";
    this.classList = new ClassList(ClassListFlags.unclassified);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], Clearance.prototype, "policyId", void 0);
__decorate([
  AsnProp({ type: ClassList, defaultValue: new ClassList(ClassListFlags.unclassified) })
], Clearance.prototype, "classList", void 0);
__decorate([
  AsnProp({ type: SecurityCategory, repeated: "set" })
], Clearance.prototype, "securityCategories", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/ietf_attr_syntax.js
var IetfAttrSyntaxValueChoices = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: OctetString2 })
], IetfAttrSyntaxValueChoices.prototype, "cotets", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], IetfAttrSyntaxValueChoices.prototype, "oid", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Utf8String })
], IetfAttrSyntaxValueChoices.prototype, "string", void 0);
var IetfAttrSyntax = class {
  constructor(params = {}) {
    this.values = [];
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralNames, implicit: true, context: 0, optional: true })
], IetfAttrSyntax.prototype, "policyAuthority", void 0);
__decorate([
  AsnProp({ type: IetfAttrSyntaxValueChoices, repeated: "sequence" })
], IetfAttrSyntax.prototype, "values", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/object_identifiers.js
var id_pe_ac_auditIdentity = `${id_pe}.4`;
var id_pe_aaControls = `${id_pe}.6`;
var id_pe_ac_proxying = `${id_pe}.10`;
var id_ce_targetInformation = `${id_ce}.55`;
var id_aca = `${id_pkix}.10`;
var id_aca_authenticationInfo = `${id_aca}.1`;
var id_aca_accessIdentity = `${id_aca}.2`;
var id_aca_chargingIdentity = `${id_aca}.3`;
var id_aca_group = `${id_aca}.4`;
var id_aca_encAttrs = `${id_aca}.6`;
var id_at = "2.5.4";
var id_at_role = `${id_at}.72`;

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/target.js
var Targets_1;
var TargetCert = class {
  constructor(params = {}) {
    this.targetCertificate = new IssuerSerial();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: IssuerSerial })
], TargetCert.prototype, "targetCertificate", void 0);
__decorate([
  AsnProp({ type: GeneralName, optional: true })
], TargetCert.prototype, "targetName", void 0);
__decorate([
  AsnProp({ type: ObjectDigestInfo, optional: true })
], TargetCert.prototype, "certDigestInfo", void 0);
var Target = class Target2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralName, context: 0, implicit: true })
], Target.prototype, "targetName", void 0);
__decorate([
  AsnProp({ type: GeneralName, context: 1, implicit: true })
], Target.prototype, "targetGroup", void 0);
__decorate([
  AsnProp({ type: TargetCert, context: 2, implicit: true })
], Target.prototype, "targetCert", void 0);
Target = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], Target);
var Targets = Targets_1 = class Targets2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, Targets_1.prototype);
  }
};
Targets = Targets_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: Target })
], Targets);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/proxy_info.js
var ProxyInfo_1;
var ProxyInfo = ProxyInfo_1 = class ProxyInfo2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, ProxyInfo_1.prototype);
  }
};
ProxyInfo = ProxyInfo_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: Targets })
], ProxyInfo);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/role_syntax.js
var RoleSyntax = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralNames, implicit: true, context: 0, optional: true })
], RoleSyntax.prototype, "roleAuthority", void 0);
__decorate([
  AsnProp({ type: GeneralName, implicit: true, context: 1 })
], RoleSyntax.prototype, "roleName", void 0);

// front/node_modules/@peculiar/asn1-x509-attr/build/es2015/svce_auth_info.js
var SvceAuthInfo = class {
  constructor(params = {}) {
    this.service = new GeneralName();
    this.ident = new GeneralName();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: GeneralName })
], SvceAuthInfo.prototype, "service", void 0);
__decorate([
  AsnProp({ type: GeneralName })
], SvceAuthInfo.prototype, "ident", void 0);
__decorate([
  AsnProp({ type: OctetString2, optional: true })
], SvceAuthInfo.prototype, "authInfo", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/certificate_choices.js
var CertificateSet_1;
var OtherCertificateFormat = class {
  constructor(params = {}) {
    this.otherCertFormat = "";
    this.otherCert = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], OtherCertificateFormat.prototype, "otherCertFormat", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any })
], OtherCertificateFormat.prototype, "otherCert", void 0);
var CertificateChoices = class CertificateChoices2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: Certificate })
], CertificateChoices.prototype, "certificate", void 0);
__decorate([
  AsnProp({ type: AttributeCertificate, context: 2, implicit: true })
], CertificateChoices.prototype, "v2AttrCert", void 0);
__decorate([
  AsnProp({ type: OtherCertificateFormat, context: 3, implicit: true })
], CertificateChoices.prototype, "other", void 0);
CertificateChoices = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], CertificateChoices);
var CertificateSet = CertificateSet_1 = class CertificateSet2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, CertificateSet_1.prototype);
  }
};
CertificateSet = CertificateSet_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Set, itemType: CertificateChoices })
], CertificateSet);

// front/node_modules/@peculiar/asn1-cms/build/es2015/content_info.js
var ContentInfo = class {
  constructor(params = {}) {
    this.contentType = "";
    this.content = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], ContentInfo.prototype, "contentType", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, context: 0 })
], ContentInfo.prototype, "content", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/encapsulated_content_info.js
var EncapsulatedContent = class EncapsulatedContent2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: OctetString2 })
], EncapsulatedContent.prototype, "single", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any })
], EncapsulatedContent.prototype, "any", void 0);
EncapsulatedContent = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], EncapsulatedContent);
var EncapsulatedContentInfo = class {
  constructor(params = {}) {
    this.eContentType = "";
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], EncapsulatedContentInfo.prototype, "eContentType", void 0);
__decorate([
  AsnProp({ type: EncapsulatedContent, context: 0, optional: true })
], EncapsulatedContentInfo.prototype, "eContent", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/encrypted_content_info.js
var EncryptedContent = class EncryptedContent2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: OctetString2, context: 0, implicit: true, optional: true })
], EncryptedContent.prototype, "value", void 0);
__decorate([
  AsnProp({
    type: OctetString2,
    converter: AsnConstructedOctetStringConverter,
    context: 0,
    implicit: true,
    optional: true,
    repeated: "sequence"
  })
], EncryptedContent.prototype, "constructedValue", void 0);
EncryptedContent = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], EncryptedContent);
var EncryptedContentInfo = class {
  constructor(params = {}) {
    this.contentType = "";
    this.contentEncryptionAlgorithm = new ContentEncryptionAlgorithmIdentifier();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], EncryptedContentInfo.prototype, "contentType", void 0);
__decorate([
  AsnProp({ type: ContentEncryptionAlgorithmIdentifier })
], EncryptedContentInfo.prototype, "contentEncryptionAlgorithm", void 0);
__decorate([
  AsnProp({ type: EncryptedContent, optional: true })
], EncryptedContentInfo.prototype, "encryptedContent", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/other_key_attribute.js
var OtherKeyAttribute = class {
  constructor(params = {}) {
    this.keyAttrId = "";
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], OtherKeyAttribute.prototype, "keyAttrId", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, optional: true })
], OtherKeyAttribute.prototype, "keyAttr", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/key_agree_recipient_info.js
var RecipientEncryptedKeys_1;
var RecipientKeyIdentifier = class {
  constructor(params = {}) {
    this.subjectKeyIdentifier = new SubjectKeyIdentifier();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: SubjectKeyIdentifier })
], RecipientKeyIdentifier.prototype, "subjectKeyIdentifier", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.GeneralizedTime, optional: true })
], RecipientKeyIdentifier.prototype, "date", void 0);
__decorate([
  AsnProp({ type: OtherKeyAttribute, optional: true })
], RecipientKeyIdentifier.prototype, "other", void 0);
var KeyAgreeRecipientIdentifier = class KeyAgreeRecipientIdentifier2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: RecipientKeyIdentifier, context: 0, implicit: true, optional: true })
], KeyAgreeRecipientIdentifier.prototype, "rKeyId", void 0);
__decorate([
  AsnProp({ type: IssuerAndSerialNumber, optional: true })
], KeyAgreeRecipientIdentifier.prototype, "issuerAndSerialNumber", void 0);
KeyAgreeRecipientIdentifier = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], KeyAgreeRecipientIdentifier);
var RecipientEncryptedKey = class {
  constructor(params = {}) {
    this.rid = new KeyAgreeRecipientIdentifier();
    this.encryptedKey = new OctetString2();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: KeyAgreeRecipientIdentifier })
], RecipientEncryptedKey.prototype, "rid", void 0);
__decorate([
  AsnProp({ type: OctetString2 })
], RecipientEncryptedKey.prototype, "encryptedKey", void 0);
var RecipientEncryptedKeys = RecipientEncryptedKeys_1 = class RecipientEncryptedKeys2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, RecipientEncryptedKeys_1.prototype);
  }
};
RecipientEncryptedKeys = RecipientEncryptedKeys_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: RecipientEncryptedKey })
], RecipientEncryptedKeys);
var OriginatorPublicKey = class {
  constructor(params = {}) {
    this.algorithm = new AlgorithmIdentifier();
    this.publicKey = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], OriginatorPublicKey.prototype, "algorithm", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString })
], OriginatorPublicKey.prototype, "publicKey", void 0);
var OriginatorIdentifierOrKey = class OriginatorIdentifierOrKey2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: SubjectKeyIdentifier, context: 0, implicit: true, optional: true })
], OriginatorIdentifierOrKey.prototype, "subjectKeyIdentifier", void 0);
__decorate([
  AsnProp({ type: OriginatorPublicKey, context: 1, implicit: true, optional: true })
], OriginatorIdentifierOrKey.prototype, "originatorKey", void 0);
__decorate([
  AsnProp({ type: IssuerAndSerialNumber, optional: true })
], OriginatorIdentifierOrKey.prototype, "issuerAndSerialNumber", void 0);
OriginatorIdentifierOrKey = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], OriginatorIdentifierOrKey);
var KeyAgreeRecipientInfo = class {
  constructor(params = {}) {
    this.version = CMSVersion.v3;
    this.originator = new OriginatorIdentifierOrKey();
    this.keyEncryptionAlgorithm = new KeyEncryptionAlgorithmIdentifier();
    this.recipientEncryptedKeys = new RecipientEncryptedKeys();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], KeyAgreeRecipientInfo.prototype, "version", void 0);
__decorate([
  AsnProp({ type: OriginatorIdentifierOrKey, context: 0 })
], KeyAgreeRecipientInfo.prototype, "originator", void 0);
__decorate([
  AsnProp({ type: OctetString2, context: 1, optional: true })
], KeyAgreeRecipientInfo.prototype, "ukm", void 0);
__decorate([
  AsnProp({ type: KeyEncryptionAlgorithmIdentifier })
], KeyAgreeRecipientInfo.prototype, "keyEncryptionAlgorithm", void 0);
__decorate([
  AsnProp({ type: RecipientEncryptedKeys })
], KeyAgreeRecipientInfo.prototype, "recipientEncryptedKeys", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/key_trans_recipient_info.js
var RecipientIdentifier = class RecipientIdentifier2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: SubjectKeyIdentifier, context: 0, implicit: true })
], RecipientIdentifier.prototype, "subjectKeyIdentifier", void 0);
__decorate([
  AsnProp({ type: IssuerAndSerialNumber })
], RecipientIdentifier.prototype, "issuerAndSerialNumber", void 0);
RecipientIdentifier = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], RecipientIdentifier);
var KeyTransRecipientInfo = class {
  constructor(params = {}) {
    this.version = CMSVersion.v0;
    this.rid = new RecipientIdentifier();
    this.keyEncryptionAlgorithm = new KeyEncryptionAlgorithmIdentifier();
    this.encryptedKey = new OctetString2();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], KeyTransRecipientInfo.prototype, "version", void 0);
__decorate([
  AsnProp({ type: RecipientIdentifier })
], KeyTransRecipientInfo.prototype, "rid", void 0);
__decorate([
  AsnProp({ type: KeyEncryptionAlgorithmIdentifier })
], KeyTransRecipientInfo.prototype, "keyEncryptionAlgorithm", void 0);
__decorate([
  AsnProp({ type: OctetString2 })
], KeyTransRecipientInfo.prototype, "encryptedKey", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/kek_recipient_info.js
var KEKIdentifier = class {
  constructor(params = {}) {
    this.keyIdentifier = new OctetString2();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: OctetString2 })
], KEKIdentifier.prototype, "keyIdentifier", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.GeneralizedTime, optional: true })
], KEKIdentifier.prototype, "date", void 0);
__decorate([
  AsnProp({ type: OtherKeyAttribute, optional: true })
], KEKIdentifier.prototype, "other", void 0);
var KEKRecipientInfo = class {
  constructor(params = {}) {
    this.version = CMSVersion.v4;
    this.kekid = new KEKIdentifier();
    this.keyEncryptionAlgorithm = new KeyEncryptionAlgorithmIdentifier();
    this.encryptedKey = new OctetString2();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], KEKRecipientInfo.prototype, "version", void 0);
__decorate([
  AsnProp({ type: KEKIdentifier })
], KEKRecipientInfo.prototype, "kekid", void 0);
__decorate([
  AsnProp({ type: KeyEncryptionAlgorithmIdentifier })
], KEKRecipientInfo.prototype, "keyEncryptionAlgorithm", void 0);
__decorate([
  AsnProp({ type: OctetString2 })
], KEKRecipientInfo.prototype, "encryptedKey", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/password_recipient_info.js
var PasswordRecipientInfo = class {
  constructor(params = {}) {
    this.version = CMSVersion.v0;
    this.keyEncryptionAlgorithm = new KeyEncryptionAlgorithmIdentifier();
    this.encryptedKey = new OctetString2();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], PasswordRecipientInfo.prototype, "version", void 0);
__decorate([
  AsnProp({ type: KeyDerivationAlgorithmIdentifier, context: 0, optional: true })
], PasswordRecipientInfo.prototype, "keyDerivationAlgorithm", void 0);
__decorate([
  AsnProp({ type: KeyEncryptionAlgorithmIdentifier })
], PasswordRecipientInfo.prototype, "keyEncryptionAlgorithm", void 0);
__decorate([
  AsnProp({ type: OctetString2 })
], PasswordRecipientInfo.prototype, "encryptedKey", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/recipient_info.js
var OtherRecipientInfo = class {
  constructor(params = {}) {
    this.oriType = "";
    this.oriValue = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], OtherRecipientInfo.prototype, "oriType", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any })
], OtherRecipientInfo.prototype, "oriValue", void 0);
var RecipientInfo = class RecipientInfo2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: KeyTransRecipientInfo, optional: true })
], RecipientInfo.prototype, "ktri", void 0);
__decorate([
  AsnProp({ type: KeyAgreeRecipientInfo, context: 1, implicit: true, optional: true })
], RecipientInfo.prototype, "kari", void 0);
__decorate([
  AsnProp({ type: KEKRecipientInfo, context: 2, implicit: true, optional: true })
], RecipientInfo.prototype, "kekri", void 0);
__decorate([
  AsnProp({ type: PasswordRecipientInfo, context: 3, implicit: true, optional: true })
], RecipientInfo.prototype, "pwri", void 0);
__decorate([
  AsnProp({ type: OtherRecipientInfo, context: 4, implicit: true, optional: true })
], RecipientInfo.prototype, "ori", void 0);
RecipientInfo = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], RecipientInfo);

// front/node_modules/@peculiar/asn1-cms/build/es2015/recipient_infos.js
var RecipientInfos_1;
var RecipientInfos = RecipientInfos_1 = class RecipientInfos2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, RecipientInfos_1.prototype);
  }
};
RecipientInfos = RecipientInfos_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Set, itemType: RecipientInfo })
], RecipientInfos);

// front/node_modules/@peculiar/asn1-cms/build/es2015/revocation_info_choice.js
var RevocationInfoChoices_1;
var id_ri = `${id_pkix}.16`;
var id_ri_ocsp_response = `${id_ri}.2`;
var id_ri_scvp = `${id_ri}.4`;
var OtherRevocationInfoFormat = class {
  constructor(params = {}) {
    this.otherRevInfoFormat = "";
    this.otherRevInfo = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], OtherRevocationInfoFormat.prototype, "otherRevInfoFormat", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any })
], OtherRevocationInfoFormat.prototype, "otherRevInfo", void 0);
var RevocationInfoChoice = class RevocationInfoChoice2 {
  constructor(params = {}) {
    this.other = new OtherRevocationInfoFormat();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: OtherRevocationInfoFormat, context: 1, implicit: true })
], RevocationInfoChoice.prototype, "other", void 0);
RevocationInfoChoice = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], RevocationInfoChoice);
var RevocationInfoChoices = RevocationInfoChoices_1 = class RevocationInfoChoices2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, RevocationInfoChoices_1.prototype);
  }
};
RevocationInfoChoices = RevocationInfoChoices_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Set, itemType: RevocationInfoChoice })
], RevocationInfoChoices);

// front/node_modules/@peculiar/asn1-cms/build/es2015/originator_info.js
var OriginatorInfo = class {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: CertificateSet, context: 0, implicit: true, optional: true })
], OriginatorInfo.prototype, "certs", void 0);
__decorate([
  AsnProp({ type: RevocationInfoChoices, context: 1, implicit: true, optional: true })
], OriginatorInfo.prototype, "crls", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/enveloped_data.js
var UnprotectedAttributes_1;
var UnprotectedAttributes = UnprotectedAttributes_1 = class UnprotectedAttributes2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, UnprotectedAttributes_1.prototype);
  }
};
UnprotectedAttributes = UnprotectedAttributes_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Set, itemType: Attribute2 })
], UnprotectedAttributes);
var EnvelopedData = class {
  constructor(params = {}) {
    this.version = CMSVersion.v0;
    this.recipientInfos = new RecipientInfos();
    this.encryptedContentInfo = new EncryptedContentInfo();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], EnvelopedData.prototype, "version", void 0);
__decorate([
  AsnProp({ type: OriginatorInfo, context: 0, implicit: true, optional: true })
], EnvelopedData.prototype, "originatorInfo", void 0);
__decorate([
  AsnProp({ type: RecipientInfos })
], EnvelopedData.prototype, "recipientInfos", void 0);
__decorate([
  AsnProp({ type: EncryptedContentInfo })
], EnvelopedData.prototype, "encryptedContentInfo", void 0);
__decorate([
  AsnProp({ type: UnprotectedAttributes, context: 1, implicit: true, optional: true })
], EnvelopedData.prototype, "unprotectedAttrs", void 0);

// front/node_modules/@peculiar/asn1-cms/build/es2015/object_identifiers.js
var id_signedData = "1.2.840.113549.1.7.2";

// front/node_modules/@peculiar/asn1-cms/build/es2015/signed_data.js
var DigestAlgorithmIdentifiers_1;
var DigestAlgorithmIdentifiers = DigestAlgorithmIdentifiers_1 = class DigestAlgorithmIdentifiers2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, DigestAlgorithmIdentifiers_1.prototype);
  }
};
DigestAlgorithmIdentifiers = DigestAlgorithmIdentifiers_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Set, itemType: DigestAlgorithmIdentifier })
], DigestAlgorithmIdentifiers);
var SignedData = class {
  constructor(params = {}) {
    this.version = CMSVersion.v0;
    this.digestAlgorithms = new DigestAlgorithmIdentifiers();
    this.encapContentInfo = new EncapsulatedContentInfo();
    this.signerInfos = new SignerInfos();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], SignedData.prototype, "version", void 0);
__decorate([
  AsnProp({ type: DigestAlgorithmIdentifiers })
], SignedData.prototype, "digestAlgorithms", void 0);
__decorate([
  AsnProp({ type: EncapsulatedContentInfo })
], SignedData.prototype, "encapContentInfo", void 0);
__decorate([
  AsnProp({ type: CertificateSet, context: 0, implicit: true, optional: true })
], SignedData.prototype, "certificates", void 0);
__decorate([
  AsnProp({ type: RevocationInfoChoices, context: 1, implicit: true, optional: true })
], SignedData.prototype, "crls", void 0);
__decorate([
  AsnProp({ type: SignerInfos })
], SignedData.prototype, "signerInfos", void 0);

// front/node_modules/@peculiar/asn1-ecc/build/es2015/object_identifiers.js
var id_ecPublicKey = "1.2.840.10045.2.1";
var id_ecdsaWithSHA1 = "1.2.840.10045.4.1";
var id_ecdsaWithSHA224 = "1.2.840.10045.4.3.1";
var id_ecdsaWithSHA256 = "1.2.840.10045.4.3.2";
var id_ecdsaWithSHA384 = "1.2.840.10045.4.3.3";
var id_ecdsaWithSHA512 = "1.2.840.10045.4.3.4";
var id_secp256r1 = "1.2.840.10045.3.1.7";
var id_secp384r1 = "1.3.132.0.34";
var id_secp521r1 = "1.3.132.0.35";

// front/node_modules/@peculiar/asn1-ecc/build/es2015/algorithms.js
function create2(algorithm) {
  return new AlgorithmIdentifier({ algorithm });
}
var ecdsaWithSHA1 = create2(id_ecdsaWithSHA1);
var ecdsaWithSHA224 = create2(id_ecdsaWithSHA224);
var ecdsaWithSHA256 = create2(id_ecdsaWithSHA256);
var ecdsaWithSHA384 = create2(id_ecdsaWithSHA384);
var ecdsaWithSHA512 = create2(id_ecdsaWithSHA512);

// front/node_modules/@peculiar/asn1-ecc/build/es2015/rfc3279.js
var FieldID = class FieldID2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], FieldID.prototype, "fieldType", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any })
], FieldID.prototype, "parameters", void 0);
FieldID = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], FieldID);
var ECPoint = class extends OctetString2 {
};
var Curve = class Curve2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.OctetString })
], Curve.prototype, "a", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.OctetString })
], Curve.prototype, "b", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString, optional: true })
], Curve.prototype, "seed", void 0);
Curve = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], Curve);
var ECPVer;
(function(ECPVer2) {
  ECPVer2[ECPVer2["ecpVer1"] = 1] = "ecpVer1";
})(ECPVer || (ECPVer = {}));
var SpecifiedECDomain = class SpecifiedECDomain2 {
  constructor(params = {}) {
    this.version = ECPVer.ecpVer1;
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], SpecifiedECDomain.prototype, "version", void 0);
__decorate([
  AsnProp({ type: FieldID })
], SpecifiedECDomain.prototype, "fieldID", void 0);
__decorate([
  AsnProp({ type: Curve })
], SpecifiedECDomain.prototype, "curve", void 0);
__decorate([
  AsnProp({ type: ECPoint })
], SpecifiedECDomain.prototype, "base", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], SpecifiedECDomain.prototype, "order", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, optional: true })
], SpecifiedECDomain.prototype, "cofactor", void 0);
SpecifiedECDomain = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], SpecifiedECDomain);

// front/node_modules/@peculiar/asn1-ecc/build/es2015/ec_parameters.js
var ECParameters = class ECParameters2 {
  constructor(params = {}) {
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], ECParameters.prototype, "namedCurve", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Null })
], ECParameters.prototype, "implicitCurve", void 0);
__decorate([
  AsnProp({ type: SpecifiedECDomain })
], ECParameters.prototype, "specifiedCurve", void 0);
ECParameters = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], ECParameters);

// front/node_modules/@peculiar/asn1-ecc/build/es2015/ec_private_key.js
var ECPrivateKey = class {
  constructor(params = {}) {
    this.version = 1;
    this.privateKey = new OctetString2();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], ECPrivateKey.prototype, "version", void 0);
__decorate([
  AsnProp({ type: OctetString2 })
], ECPrivateKey.prototype, "privateKey", void 0);
__decorate([
  AsnProp({ type: ECParameters, context: 0, optional: true })
], ECPrivateKey.prototype, "parameters", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString, context: 1, optional: true })
], ECPrivateKey.prototype, "publicKey", void 0);

// front/node_modules/@peculiar/asn1-ecc/build/es2015/ec_signature_value.js
var ECDSASigValue = class {
  constructor(params = {}) {
    this.r = new ArrayBuffer(0);
    this.s = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], ECDSASigValue.prototype, "r", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], ECDSASigValue.prototype, "s", void 0);

// front/node_modules/@peculiar/asn1-rsa/build/es2015/object_identifiers.js
var id_pkcs_1 = "1.2.840.113549.1.1";
var id_rsaEncryption = `${id_pkcs_1}.1`;
var id_RSAES_OAEP = `${id_pkcs_1}.7`;
var id_pSpecified = `${id_pkcs_1}.9`;
var id_RSASSA_PSS = `${id_pkcs_1}.10`;
var id_md2WithRSAEncryption = `${id_pkcs_1}.2`;
var id_md5WithRSAEncryption = `${id_pkcs_1}.4`;
var id_sha1WithRSAEncryption = `${id_pkcs_1}.5`;
var id_sha224WithRSAEncryption = `${id_pkcs_1}.14`;
var id_sha256WithRSAEncryption = `${id_pkcs_1}.11`;
var id_sha384WithRSAEncryption = `${id_pkcs_1}.12`;
var id_sha512WithRSAEncryption = `${id_pkcs_1}.13`;
var id_sha512_224WithRSAEncryption = `${id_pkcs_1}.15`;
var id_sha512_256WithRSAEncryption = `${id_pkcs_1}.16`;
var id_sha1 = "1.3.14.3.2.26";
var id_sha224 = "2.16.840.1.101.3.4.2.4";
var id_sha256 = "2.16.840.1.101.3.4.2.1";
var id_sha384 = "2.16.840.1.101.3.4.2.2";
var id_sha512 = "2.16.840.1.101.3.4.2.3";
var id_sha512_224 = "2.16.840.1.101.3.4.2.5";
var id_sha512_256 = "2.16.840.1.101.3.4.2.6";
var id_md2 = "1.2.840.113549.2.2";
var id_md5 = "1.2.840.113549.2.5";
var id_mgf1 = `${id_pkcs_1}.8`;

// front/node_modules/@peculiar/asn1-rsa/build/es2015/algorithms.js
function create3(algorithm) {
  return new AlgorithmIdentifier({ algorithm, parameters: null });
}
var md2 = create3(id_md2);
var md4 = create3(id_md5);
var sha1 = create3(id_sha1);
var sha224 = create3(id_sha224);
var sha2562 = create3(id_sha256);
var sha384 = create3(id_sha384);
var sha5122 = create3(id_sha512);
var sha512_224 = create3(id_sha512_224);
var sha512_256 = create3(id_sha512_256);
var mgf1SHA1 = new AlgorithmIdentifier({
  algorithm: id_mgf1,
  parameters: AsnConvert.serialize(sha1)
});
var pSpecifiedEmpty = new AlgorithmIdentifier({
  algorithm: id_pSpecified,
  parameters: AsnConvert.serialize(AsnOctetStringConverter.toASN(new Uint8Array([
    218,
    57,
    163,
    238,
    94,
    107,
    75,
    13,
    50,
    85,
    191,
    239,
    149,
    96,
    24,
    144,
    175,
    216,
    7,
    9
  ]).buffer))
});
var rsaEncryption = create3(id_rsaEncryption);
var md2WithRSAEncryption = create3(id_md2WithRSAEncryption);
var md5WithRSAEncryption = create3(id_md5WithRSAEncryption);
var sha1WithRSAEncryption = create3(id_sha1WithRSAEncryption);
var sha224WithRSAEncryption = create3(id_sha512_224WithRSAEncryption);
var sha256WithRSAEncryption = create3(id_sha512_256WithRSAEncryption);
var sha384WithRSAEncryption = create3(id_sha384WithRSAEncryption);
var sha512WithRSAEncryption = create3(id_sha512WithRSAEncryption);
var sha512_224WithRSAEncryption = create3(id_sha512_224WithRSAEncryption);
var sha512_256WithRSAEncryption = create3(id_sha512_256WithRSAEncryption);

// front/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsaes_oaep.js
var RsaEsOaepParams = class {
  constructor(params = {}) {
    this.hashAlgorithm = new AlgorithmIdentifier(sha1);
    this.maskGenAlgorithm = new AlgorithmIdentifier({
      algorithm: id_mgf1,
      parameters: AsnConvert.serialize(sha1)
    });
    this.pSourceAlgorithm = new AlgorithmIdentifier(pSpecifiedEmpty);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AlgorithmIdentifier, context: 0, defaultValue: sha1 })
], RsaEsOaepParams.prototype, "hashAlgorithm", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier, context: 1, defaultValue: mgf1SHA1 })
], RsaEsOaepParams.prototype, "maskGenAlgorithm", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier, context: 2, defaultValue: pSpecifiedEmpty })
], RsaEsOaepParams.prototype, "pSourceAlgorithm", void 0);
var RSAES_OAEP = new AlgorithmIdentifier({
  algorithm: id_RSAES_OAEP,
  parameters: AsnConvert.serialize(new RsaEsOaepParams())
});

// front/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsassa_pss.js
var RsaSaPssParams = class {
  constructor(params = {}) {
    this.hashAlgorithm = new AlgorithmIdentifier(sha1);
    this.maskGenAlgorithm = new AlgorithmIdentifier({
      algorithm: id_mgf1,
      parameters: AsnConvert.serialize(sha1)
    });
    this.saltLength = 20;
    this.trailerField = 1;
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AlgorithmIdentifier, context: 0, defaultValue: sha1 })
], RsaSaPssParams.prototype, "hashAlgorithm", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier, context: 1, defaultValue: mgf1SHA1 })
], RsaSaPssParams.prototype, "maskGenAlgorithm", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, context: 2, defaultValue: 20 })
], RsaSaPssParams.prototype, "saltLength", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, context: 3, defaultValue: 1 })
], RsaSaPssParams.prototype, "trailerField", void 0);
var RSASSA_PSS = new AlgorithmIdentifier({
  algorithm: id_RSASSA_PSS,
  parameters: AsnConvert.serialize(new RsaSaPssParams())
});

// front/node_modules/@peculiar/asn1-rsa/build/es2015/parameters/rsassa_pkcs1_v1_5.js
var DigestInfo = class {
  constructor(params = {}) {
    this.digestAlgorithm = new AlgorithmIdentifier();
    this.digest = new OctetString2();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], DigestInfo.prototype, "digestAlgorithm", void 0);
__decorate([
  AsnProp({ type: OctetString2 })
], DigestInfo.prototype, "digest", void 0);

// front/node_modules/@peculiar/asn1-rsa/build/es2015/other_prime_info.js
var OtherPrimeInfos_1;
var OtherPrimeInfo = class {
  constructor(params = {}) {
    this.prime = new ArrayBuffer(0);
    this.exponent = new ArrayBuffer(0);
    this.coefficient = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], OtherPrimeInfo.prototype, "prime", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], OtherPrimeInfo.prototype, "exponent", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], OtherPrimeInfo.prototype, "coefficient", void 0);
var OtherPrimeInfos = OtherPrimeInfos_1 = class OtherPrimeInfos2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, OtherPrimeInfos_1.prototype);
  }
};
OtherPrimeInfos = OtherPrimeInfos_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: OtherPrimeInfo })
], OtherPrimeInfos);

// front/node_modules/@peculiar/asn1-rsa/build/es2015/rsa_private_key.js
var RSAPrivateKey = class {
  constructor(params = {}) {
    this.version = 0;
    this.modulus = new ArrayBuffer(0);
    this.publicExponent = new ArrayBuffer(0);
    this.privateExponent = new ArrayBuffer(0);
    this.prime1 = new ArrayBuffer(0);
    this.prime2 = new ArrayBuffer(0);
    this.exponent1 = new ArrayBuffer(0);
    this.exponent2 = new ArrayBuffer(0);
    this.coefficient = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], RSAPrivateKey.prototype, "version", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "modulus", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "publicExponent", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "privateExponent", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "prime1", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "prime2", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "exponent1", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "exponent2", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "coefficient", void 0);
__decorate([
  AsnProp({ type: OtherPrimeInfos, optional: true })
], RSAPrivateKey.prototype, "otherPrimeInfos", void 0);

// front/node_modules/@peculiar/asn1-rsa/build/es2015/rsa_public_key.js
var RSAPublicKey = class {
  constructor(params = {}) {
    this.modulus = new ArrayBuffer(0);
    this.publicExponent = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPublicKey.prototype, "modulus", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPublicKey.prototype, "publicExponent", void 0);

// front/node_modules/tsyringe/dist/esm5/types/lifecycle.js
var Lifecycle;
(function(Lifecycle2) {
  Lifecycle2[Lifecycle2["Transient"] = 0] = "Transient";
  Lifecycle2[Lifecycle2["Singleton"] = 1] = "Singleton";
  Lifecycle2[Lifecycle2["ResolutionScoped"] = 2] = "ResolutionScoped";
  Lifecycle2[Lifecycle2["ContainerScoped"] = 3] = "ContainerScoped";
})(Lifecycle || (Lifecycle = {}));
var lifecycle_default = Lifecycle;

// front/node_modules/tsyringe/node_modules/tslib/tslib.es6.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}

// front/node_modules/tsyringe/dist/esm5/reflection-helpers.js
var INJECTION_TOKEN_METADATA_KEY = "injectionTokens";
function getParamInfo(target) {
  var params = Reflect.getMetadata("design:paramtypes", target) || [];
  var injectionTokens = Reflect.getOwnMetadata(INJECTION_TOKEN_METADATA_KEY, target) || {};
  Object.keys(injectionTokens).forEach(function(key) {
    params[+key] = injectionTokens[key];
  });
  return params;
}

// front/node_modules/tsyringe/dist/esm5/providers/class-provider.js
function isClassProvider(provider) {
  return !!provider.useClass;
}

// front/node_modules/tsyringe/dist/esm5/providers/factory-provider.js
function isFactoryProvider(provider) {
  return !!provider.useFactory;
}

// front/node_modules/tsyringe/dist/esm5/lazy-helpers.js
var DelayedConstructor = function() {
  function DelayedConstructor2(wrap) {
    this.wrap = wrap;
    this.reflectMethods = [
      "get",
      "getPrototypeOf",
      "setPrototypeOf",
      "getOwnPropertyDescriptor",
      "defineProperty",
      "has",
      "set",
      "deleteProperty",
      "apply",
      "construct",
      "ownKeys"
    ];
  }
  DelayedConstructor2.prototype.createProxy = function(createObject) {
    var _this = this;
    var target = {};
    var init = false;
    var value;
    var delayedObject = function() {
      if (!init) {
        value = createObject(_this.wrap());
        init = true;
      }
      return value;
    };
    return new Proxy(target, this.createHandler(delayedObject));
  };
  DelayedConstructor2.prototype.createHandler = function(delayedObject) {
    var handler = {};
    var install = function(name3) {
      handler[name3] = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        args[0] = delayedObject();
        var method = Reflect[name3];
        return method.apply(void 0, __spread(args));
      };
    };
    this.reflectMethods.forEach(install);
    return handler;
  };
  return DelayedConstructor2;
}();

// front/node_modules/tsyringe/dist/esm5/providers/injection-token.js
function isNormalToken(token) {
  return typeof token === "string" || typeof token === "symbol";
}
function isTokenDescriptor(descriptor) {
  return typeof descriptor === "object" && "token" in descriptor && "multiple" in descriptor;
}
function isTransformDescriptor(descriptor) {
  return typeof descriptor === "object" && "token" in descriptor && "transform" in descriptor;
}
function isConstructorToken(token) {
  return typeof token === "function" || token instanceof DelayedConstructor;
}

// front/node_modules/tsyringe/dist/esm5/providers/token-provider.js
function isTokenProvider(provider) {
  return !!provider.useToken;
}

// front/node_modules/tsyringe/dist/esm5/providers/value-provider.js
function isValueProvider(provider) {
  return provider.useValue != void 0;
}

// front/node_modules/tsyringe/dist/esm5/providers/provider.js
function isProvider(provider) {
  return isClassProvider(provider) || isValueProvider(provider) || isTokenProvider(provider) || isFactoryProvider(provider);
}

// front/node_modules/tsyringe/dist/esm5/registry-base.js
var RegistryBase = function() {
  function RegistryBase2() {
    this._registryMap = /* @__PURE__ */ new Map();
  }
  RegistryBase2.prototype.entries = function() {
    return this._registryMap.entries();
  };
  RegistryBase2.prototype.getAll = function(key) {
    this.ensure(key);
    return this._registryMap.get(key);
  };
  RegistryBase2.prototype.get = function(key) {
    this.ensure(key);
    var value = this._registryMap.get(key);
    return value[value.length - 1] || null;
  };
  RegistryBase2.prototype.set = function(key, value) {
    this.ensure(key);
    this._registryMap.get(key).push(value);
  };
  RegistryBase2.prototype.setAll = function(key, value) {
    this._registryMap.set(key, value);
  };
  RegistryBase2.prototype.has = function(key) {
    this.ensure(key);
    return this._registryMap.get(key).length > 0;
  };
  RegistryBase2.prototype.clear = function() {
    this._registryMap.clear();
  };
  RegistryBase2.prototype.ensure = function(key) {
    if (!this._registryMap.has(key)) {
      this._registryMap.set(key, []);
    }
  };
  return RegistryBase2;
}();
var registry_base_default = RegistryBase;

// front/node_modules/tsyringe/dist/esm5/registry.js
var Registry = function(_super) {
  __extends(Registry2, _super);
  function Registry2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return Registry2;
}(registry_base_default);
var registry_default = Registry;

// front/node_modules/tsyringe/dist/esm5/resolution-context.js
var ResolutionContext = /* @__PURE__ */ function() {
  function ResolutionContext2() {
    this.scopedResolutions = /* @__PURE__ */ new Map();
  }
  return ResolutionContext2;
}();
var resolution_context_default = ResolutionContext;

// front/node_modules/tsyringe/dist/esm5/error-helpers.js
function formatDependency(params, idx) {
  if (params === null) {
    return "at position #" + idx;
  }
  var argName = params.split(",")[idx].trim();
  return '"' + argName + '" at position #' + idx;
}
function composeErrorMessage(msg, e, indent) {
  if (indent === void 0) {
    indent = "    ";
  }
  return __spread([msg], e.message.split("\n").map(function(l) {
    return indent + l;
  })).join("\n");
}
function formatErrorCtor(ctor, paramIdx, error) {
  var _a3 = __read(ctor.toString().match(/constructor\(([\w, ]+)\)/) || [], 2), _b = _a3[1], params = _b === void 0 ? null : _b;
  var dep = formatDependency(params, paramIdx);
  return composeErrorMessage("Cannot inject the dependency " + dep + ' of "' + ctor.name + '" constructor. Reason:', error);
}

// front/node_modules/tsyringe/dist/esm5/types/disposable.js
function isDisposable(value) {
  if (typeof value.dispose !== "function")
    return false;
  var disposeFun = value.dispose;
  if (disposeFun.length > 0) {
    return false;
  }
  return true;
}

// front/node_modules/tsyringe/dist/esm5/interceptors.js
var PreResolutionInterceptors = function(_super) {
  __extends(PreResolutionInterceptors2, _super);
  function PreResolutionInterceptors2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return PreResolutionInterceptors2;
}(registry_base_default);
var PostResolutionInterceptors = function(_super) {
  __extends(PostResolutionInterceptors2, _super);
  function PostResolutionInterceptors2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return PostResolutionInterceptors2;
}(registry_base_default);
var Interceptors = /* @__PURE__ */ function() {
  function Interceptors2() {
    this.preResolution = new PreResolutionInterceptors();
    this.postResolution = new PostResolutionInterceptors();
  }
  return Interceptors2;
}();
var interceptors_default = Interceptors;

// front/node_modules/tsyringe/dist/esm5/dependency-container.js
var typeInfo = /* @__PURE__ */ new Map();
var InternalDependencyContainer = function() {
  function InternalDependencyContainer2(parent) {
    this.parent = parent;
    this._registry = new registry_default();
    this.interceptors = new interceptors_default();
    this.disposed = false;
    this.disposables = /* @__PURE__ */ new Set();
  }
  InternalDependencyContainer2.prototype.register = function(token, providerOrConstructor, options) {
    if (options === void 0) {
      options = { lifecycle: lifecycle_default.Transient };
    }
    this.ensureNotDisposed();
    var provider;
    if (!isProvider(providerOrConstructor)) {
      provider = { useClass: providerOrConstructor };
    } else {
      provider = providerOrConstructor;
    }
    if (isTokenProvider(provider)) {
      var path = [token];
      var tokenProvider = provider;
      while (tokenProvider != null) {
        var currentToken = tokenProvider.useToken;
        if (path.includes(currentToken)) {
          throw new Error("Token registration cycle detected! " + __spread(path, [currentToken]).join(" -> "));
        }
        path.push(currentToken);
        var registration = this._registry.get(currentToken);
        if (registration && isTokenProvider(registration.provider)) {
          tokenProvider = registration.provider;
        } else {
          tokenProvider = null;
        }
      }
    }
    if (options.lifecycle === lifecycle_default.Singleton || options.lifecycle == lifecycle_default.ContainerScoped || options.lifecycle == lifecycle_default.ResolutionScoped) {
      if (isValueProvider(provider) || isFactoryProvider(provider)) {
        throw new Error('Cannot use lifecycle "' + lifecycle_default[options.lifecycle] + '" with ValueProviders or FactoryProviders');
      }
    }
    this._registry.set(token, { provider, options });
    return this;
  };
  InternalDependencyContainer2.prototype.registerType = function(from3, to) {
    this.ensureNotDisposed();
    if (isNormalToken(to)) {
      return this.register(from3, {
        useToken: to
      });
    }
    return this.register(from3, {
      useClass: to
    });
  };
  InternalDependencyContainer2.prototype.registerInstance = function(token, instance2) {
    this.ensureNotDisposed();
    return this.register(token, {
      useValue: instance2
    });
  };
  InternalDependencyContainer2.prototype.registerSingleton = function(from3, to) {
    this.ensureNotDisposed();
    if (isNormalToken(from3)) {
      if (isNormalToken(to)) {
        return this.register(from3, {
          useToken: to
        }, { lifecycle: lifecycle_default.Singleton });
      } else if (to) {
        return this.register(from3, {
          useClass: to
        }, { lifecycle: lifecycle_default.Singleton });
      }
      throw new Error('Cannot register a type name as a singleton without a "to" token');
    }
    var useClass = from3;
    if (to && !isNormalToken(to)) {
      useClass = to;
    }
    return this.register(from3, {
      useClass
    }, { lifecycle: lifecycle_default.Singleton });
  };
  InternalDependencyContainer2.prototype.resolve = function(token, context, isOptional) {
    if (context === void 0) {
      context = new resolution_context_default();
    }
    if (isOptional === void 0) {
      isOptional = false;
    }
    this.ensureNotDisposed();
    var registration = this.getRegistration(token);
    if (!registration && isNormalToken(token)) {
      if (isOptional) {
        return void 0;
      }
      throw new Error('Attempted to resolve unregistered dependency token: "' + token.toString() + '"');
    }
    this.executePreResolutionInterceptor(token, "Single");
    if (registration) {
      var result = this.resolveRegistration(registration, context);
      this.executePostResolutionInterceptor(token, result, "Single");
      return result;
    }
    if (isConstructorToken(token)) {
      var result = this.construct(token, context);
      this.executePostResolutionInterceptor(token, result, "Single");
      return result;
    }
    throw new Error("Attempted to construct an undefined constructor. Could mean a circular dependency problem. Try using `delay` function.");
  };
  InternalDependencyContainer2.prototype.executePreResolutionInterceptor = function(token, resolutionType) {
    var e_1, _a3;
    if (this.interceptors.preResolution.has(token)) {
      var remainingInterceptors = [];
      try {
        for (var _b = __values(this.interceptors.preResolution.getAll(token)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var interceptor = _c.value;
          if (interceptor.options.frequency != "Once") {
            remainingInterceptors.push(interceptor);
          }
          interceptor.callback(token, resolutionType);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a3 = _b.return)) _a3.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      this.interceptors.preResolution.setAll(token, remainingInterceptors);
    }
  };
  InternalDependencyContainer2.prototype.executePostResolutionInterceptor = function(token, result, resolutionType) {
    var e_2, _a3;
    if (this.interceptors.postResolution.has(token)) {
      var remainingInterceptors = [];
      try {
        for (var _b = __values(this.interceptors.postResolution.getAll(token)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var interceptor = _c.value;
          if (interceptor.options.frequency != "Once") {
            remainingInterceptors.push(interceptor);
          }
          interceptor.callback(token, result, resolutionType);
        }
      } catch (e_2_1) {
        e_2 = { error: e_2_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a3 = _b.return)) _a3.call(_b);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
      this.interceptors.postResolution.setAll(token, remainingInterceptors);
    }
  };
  InternalDependencyContainer2.prototype.resolveRegistration = function(registration, context) {
    this.ensureNotDisposed();
    if (registration.options.lifecycle === lifecycle_default.ResolutionScoped && context.scopedResolutions.has(registration)) {
      return context.scopedResolutions.get(registration);
    }
    var isSingleton = registration.options.lifecycle === lifecycle_default.Singleton;
    var isContainerScoped = registration.options.lifecycle === lifecycle_default.ContainerScoped;
    var returnInstance = isSingleton || isContainerScoped;
    var resolved;
    if (isValueProvider(registration.provider)) {
      resolved = registration.provider.useValue;
    } else if (isTokenProvider(registration.provider)) {
      resolved = returnInstance ? registration.instance || (registration.instance = this.resolve(registration.provider.useToken, context)) : this.resolve(registration.provider.useToken, context);
    } else if (isClassProvider(registration.provider)) {
      resolved = returnInstance ? registration.instance || (registration.instance = this.construct(registration.provider.useClass, context)) : this.construct(registration.provider.useClass, context);
    } else if (isFactoryProvider(registration.provider)) {
      resolved = registration.provider.useFactory(this);
    } else {
      resolved = this.construct(registration.provider, context);
    }
    if (registration.options.lifecycle === lifecycle_default.ResolutionScoped) {
      context.scopedResolutions.set(registration, resolved);
    }
    return resolved;
  };
  InternalDependencyContainer2.prototype.resolveAll = function(token, context, isOptional) {
    var _this = this;
    if (context === void 0) {
      context = new resolution_context_default();
    }
    if (isOptional === void 0) {
      isOptional = false;
    }
    this.ensureNotDisposed();
    var registrations = this.getAllRegistrations(token);
    if (!registrations && isNormalToken(token)) {
      if (isOptional) {
        return [];
      }
      throw new Error('Attempted to resolve unregistered dependency token: "' + token.toString() + '"');
    }
    this.executePreResolutionInterceptor(token, "All");
    if (registrations) {
      var result_1 = registrations.map(function(item) {
        return _this.resolveRegistration(item, context);
      });
      this.executePostResolutionInterceptor(token, result_1, "All");
      return result_1;
    }
    var result = [this.construct(token, context)];
    this.executePostResolutionInterceptor(token, result, "All");
    return result;
  };
  InternalDependencyContainer2.prototype.isRegistered = function(token, recursive) {
    if (recursive === void 0) {
      recursive = false;
    }
    this.ensureNotDisposed();
    return this._registry.has(token) || recursive && (this.parent || false) && this.parent.isRegistered(token, true);
  };
  InternalDependencyContainer2.prototype.reset = function() {
    this.ensureNotDisposed();
    this._registry.clear();
    this.interceptors.preResolution.clear();
    this.interceptors.postResolution.clear();
  };
  InternalDependencyContainer2.prototype.clearInstances = function() {
    var e_3, _a3;
    this.ensureNotDisposed();
    try {
      for (var _b = __values(this._registry.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2), token = _d[0], registrations = _d[1];
        this._registry.setAll(token, registrations.filter(function(registration) {
          return !isValueProvider(registration.provider);
        }).map(function(registration) {
          registration.instance = void 0;
          return registration;
        }));
      }
    } catch (e_3_1) {
      e_3 = { error: e_3_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a3 = _b.return)) _a3.call(_b);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
  };
  InternalDependencyContainer2.prototype.createChildContainer = function() {
    var e_4, _a3;
    this.ensureNotDisposed();
    var childContainer = new InternalDependencyContainer2(this);
    try {
      for (var _b = __values(this._registry.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2), token = _d[0], registrations = _d[1];
        if (registrations.some(function(_a4) {
          var options = _a4.options;
          return options.lifecycle === lifecycle_default.ContainerScoped;
        })) {
          childContainer._registry.setAll(token, registrations.map(function(registration) {
            if (registration.options.lifecycle === lifecycle_default.ContainerScoped) {
              return {
                provider: registration.provider,
                options: registration.options
              };
            }
            return registration;
          }));
        }
      }
    } catch (e_4_1) {
      e_4 = { error: e_4_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a3 = _b.return)) _a3.call(_b);
      } finally {
        if (e_4) throw e_4.error;
      }
    }
    return childContainer;
  };
  InternalDependencyContainer2.prototype.beforeResolution = function(token, callback, options) {
    if (options === void 0) {
      options = { frequency: "Always" };
    }
    this.interceptors.preResolution.set(token, {
      callback,
      options
    });
  };
  InternalDependencyContainer2.prototype.afterResolution = function(token, callback, options) {
    if (options === void 0) {
      options = { frequency: "Always" };
    }
    this.interceptors.postResolution.set(token, {
      callback,
      options
    });
  };
  InternalDependencyContainer2.prototype.dispose = function() {
    return __awaiter(this, void 0, void 0, function() {
      var promises;
      return __generator(this, function(_a3) {
        switch (_a3.label) {
          case 0:
            this.disposed = true;
            promises = [];
            this.disposables.forEach(function(disposable) {
              var maybePromise = disposable.dispose();
              if (maybePromise) {
                promises.push(maybePromise);
              }
            });
            return [4, Promise.all(promises)];
          case 1:
            _a3.sent();
            return [2];
        }
      });
    });
  };
  InternalDependencyContainer2.prototype.getRegistration = function(token) {
    if (this.isRegistered(token)) {
      return this._registry.get(token);
    }
    if (this.parent) {
      return this.parent.getRegistration(token);
    }
    return null;
  };
  InternalDependencyContainer2.prototype.getAllRegistrations = function(token) {
    if (this.isRegistered(token)) {
      return this._registry.getAll(token);
    }
    if (this.parent) {
      return this.parent.getAllRegistrations(token);
    }
    return null;
  };
  InternalDependencyContainer2.prototype.construct = function(ctor, context) {
    var _this = this;
    if (ctor instanceof DelayedConstructor) {
      return ctor.createProxy(function(target) {
        return _this.resolve(target, context);
      });
    }
    var instance2 = function() {
      var paramInfo = typeInfo.get(ctor);
      if (!paramInfo || paramInfo.length === 0) {
        if (ctor.length === 0) {
          return new ctor();
        } else {
          throw new Error('TypeInfo not known for "' + ctor.name + '"');
        }
      }
      var params = paramInfo.map(_this.resolveParams(context, ctor));
      return new (ctor.bind.apply(ctor, __spread([void 0], params)))();
    }();
    if (isDisposable(instance2)) {
      this.disposables.add(instance2);
    }
    return instance2;
  };
  InternalDependencyContainer2.prototype.resolveParams = function(context, ctor) {
    var _this = this;
    return function(param, idx) {
      var _a3, _b, _c;
      try {
        if (isTokenDescriptor(param)) {
          if (isTransformDescriptor(param)) {
            return param.multiple ? (_a3 = _this.resolve(param.transform)).transform.apply(_a3, __spread([_this.resolveAll(param.token, new resolution_context_default(), param.isOptional)], param.transformArgs)) : (_b = _this.resolve(param.transform)).transform.apply(_b, __spread([_this.resolve(param.token, context, param.isOptional)], param.transformArgs));
          } else {
            return param.multiple ? _this.resolveAll(param.token, new resolution_context_default(), param.isOptional) : _this.resolve(param.token, context, param.isOptional);
          }
        } else if (isTransformDescriptor(param)) {
          return (_c = _this.resolve(param.transform, context)).transform.apply(_c, __spread([_this.resolve(param.token, context)], param.transformArgs));
        }
        return _this.resolve(param, context);
      } catch (e) {
        throw new Error(formatErrorCtor(ctor, idx, e));
      }
    };
  };
  InternalDependencyContainer2.prototype.ensureNotDisposed = function() {
    if (this.disposed) {
      throw new Error("This container has been disposed, you cannot interact with a disposed container");
    }
  };
  return InternalDependencyContainer2;
}();
var instance = new InternalDependencyContainer();

// front/node_modules/tsyringe/dist/esm5/decorators/injectable.js
function injectable() {
  return function(target) {
    typeInfo.set(target, getParamInfo(target));
  };
}
var injectable_default = injectable;

// front/node_modules/tsyringe/dist/esm5/index.js
if (typeof Reflect === "undefined" || !Reflect.getMetadata) {
  throw new Error(`tsyringe requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`);
}

// front/node_modules/@peculiar/asn1-pfx/build/es2015/attribute.js
var PKCS12AttrSet_1;
var PKCS12Attribute = class {
  constructor(params = {}) {
    this.attrId = "";
    this.attrValues = [];
    Object.assign(params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], PKCS12Attribute.prototype, "attrId", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, repeated: "set" })
], PKCS12Attribute.prototype, "attrValues", void 0);
var PKCS12AttrSet = PKCS12AttrSet_1 = class PKCS12AttrSet2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, PKCS12AttrSet_1.prototype);
  }
};
PKCS12AttrSet = PKCS12AttrSet_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: PKCS12Attribute })
], PKCS12AttrSet);

// front/node_modules/@peculiar/asn1-pfx/build/es2015/authenticated_safe.js
var AuthenticatedSafe_1;
var AuthenticatedSafe = AuthenticatedSafe_1 = class AuthenticatedSafe2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, AuthenticatedSafe_1.prototype);
  }
};
AuthenticatedSafe = AuthenticatedSafe_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: ContentInfo })
], AuthenticatedSafe);

// front/node_modules/@peculiar/asn1-pfx/build/es2015/object_identifiers.js
var id_rsadsi = "1.2.840.113549";
var id_pkcs = `${id_rsadsi}.1`;
var id_pkcs_12 = `${id_pkcs}.12`;
var id_pkcs_12PbeIds = `${id_pkcs_12}.1`;
var id_pbeWithSHAAnd128BitRC4 = `${id_pkcs_12PbeIds}.1`;
var id_pbeWithSHAAnd40BitRC4 = `${id_pkcs_12PbeIds}.2`;
var id_pbeWithSHAAnd3_KeyTripleDES_CBC = `${id_pkcs_12PbeIds}.3`;
var id_pbeWithSHAAnd2_KeyTripleDES_CBC = `${id_pkcs_12PbeIds}.4`;
var id_pbeWithSHAAnd128BitRC2_CBC = `${id_pkcs_12PbeIds}.5`;
var id_pbewithSHAAnd40BitRC2_CBC = `${id_pkcs_12PbeIds}.6`;
var id_bagtypes = `${id_pkcs_12}.10.1`;

// front/node_modules/@peculiar/asn1-pfx/build/es2015/bags/types.js
var id_keyBag = `${id_bagtypes}.1`;
var id_pkcs8ShroudedKeyBag = `${id_bagtypes}.2`;
var id_certBag = `${id_bagtypes}.3`;
var id_CRLBag = `${id_bagtypes}.4`;
var id_SecretBag = `${id_bagtypes}.5`;
var id_SafeContents = `${id_bagtypes}.6`;
var id_pkcs_9 = "1.2.840.113549.1.9";

// front/node_modules/@peculiar/asn1-pfx/build/es2015/bags/cert_bag.js
var CertBag = class {
  constructor(params = {}) {
    this.certId = "";
    this.certValue = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], CertBag.prototype, "certId", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, context: 0 })
], CertBag.prototype, "certValue", void 0);
var id_certTypes = `${id_pkcs_9}.22`;
var id_x509Certificate = `${id_certTypes}.1`;
var id_sdsiCertificate = `${id_certTypes}.2`;

// front/node_modules/@peculiar/asn1-pfx/build/es2015/bags/crl_bag.js
var CRLBag = class {
  constructor(params = {}) {
    this.crlId = "";
    this.crltValue = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], CRLBag.prototype, "crlId", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, context: 0 })
], CRLBag.prototype, "crltValue", void 0);
var id_crlTypes = `${id_pkcs_9}.23`;
var id_x509CRL = `${id_crlTypes}.1`;

// front/node_modules/@peculiar/asn1-pkcs8/build/es2015/encrypted_private_key_info.js
var EncryptedData = class extends OctetString2 {
};
var EncryptedPrivateKeyInfo = class {
  constructor(params = {}) {
    this.encryptionAlgorithm = new AlgorithmIdentifier();
    this.encryptedData = new EncryptedData();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], EncryptedPrivateKeyInfo.prototype, "encryptionAlgorithm", void 0);
__decorate([
  AsnProp({ type: EncryptedData })
], EncryptedPrivateKeyInfo.prototype, "encryptedData", void 0);

// front/node_modules/@peculiar/asn1-pkcs8/build/es2015/private_key_info.js
var Attributes_1;
var Version2;
(function(Version3) {
  Version3[Version3["v1"] = 0] = "v1";
})(Version2 || (Version2 = {}));
var PrivateKey = class extends OctetString2 {
};
var Attributes = Attributes_1 = class Attributes2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, Attributes_1.prototype);
  }
};
Attributes = Attributes_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: Attribute })
], Attributes);
var PrivateKeyInfo = class {
  constructor(params = {}) {
    this.version = Version2.v1;
    this.privateKeyAlgorithm = new AlgorithmIdentifier();
    this.privateKey = new PrivateKey();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], PrivateKeyInfo.prototype, "version", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], PrivateKeyInfo.prototype, "privateKeyAlgorithm", void 0);
__decorate([
  AsnProp({ type: PrivateKey })
], PrivateKeyInfo.prototype, "privateKey", void 0);
__decorate([
  AsnProp({ type: Attributes, implicit: true, context: 0, optional: true })
], PrivateKeyInfo.prototype, "attributes", void 0);

// front/node_modules/@peculiar/asn1-pfx/build/es2015/bags/key_bag.js
var KeyBag = class KeyBag2 extends PrivateKeyInfo {
};
KeyBag = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], KeyBag);

// front/node_modules/@peculiar/asn1-pfx/build/es2015/bags/pkcs8_shrouded_key_bag.js
var PKCS8ShroudedKeyBag = class PKCS8ShroudedKeyBag2 extends EncryptedPrivateKeyInfo {
};
PKCS8ShroudedKeyBag = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], PKCS8ShroudedKeyBag);

// front/node_modules/@peculiar/asn1-pfx/build/es2015/bags/secret_bag.js
var SecretBag = class {
  constructor(params = {}) {
    this.secretTypeId = "";
    this.secretValue = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], SecretBag.prototype, "secretTypeId", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, context: 0 })
], SecretBag.prototype, "secretValue", void 0);

// front/node_modules/@peculiar/asn1-pfx/build/es2015/mac_data.js
var MacData = class {
  constructor(params = {}) {
    this.mac = new DigestInfo();
    this.macSalt = new OctetString2();
    this.iterations = 1;
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: DigestInfo })
], MacData.prototype, "mac", void 0);
__decorate([
  AsnProp({ type: OctetString2 })
], MacData.prototype, "macSalt", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Integer, defaultValue: 1 })
], MacData.prototype, "iterations", void 0);

// front/node_modules/@peculiar/asn1-pfx/build/es2015/pfx.js
var PFX = class {
  constructor(params = {}) {
    this.version = 3;
    this.authSafe = new ContentInfo();
    this.macData = new MacData();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], PFX.prototype, "version", void 0);
__decorate([
  AsnProp({ type: ContentInfo })
], PFX.prototype, "authSafe", void 0);
__decorate([
  AsnProp({ type: MacData, optional: true })
], PFX.prototype, "macData", void 0);

// front/node_modules/@peculiar/asn1-pfx/build/es2015/safe_bag.js
var SafeContents_1;
var SafeBag = class {
  constructor(params = {}) {
    this.bagId = "";
    this.bagValue = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], SafeBag.prototype, "bagId", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.Any, context: 0 })
], SafeBag.prototype, "bagValue", void 0);
__decorate([
  AsnProp({ type: PKCS12Attribute, repeated: "set", optional: true })
], SafeBag.prototype, "bagAttributes", void 0);
var SafeContents = SafeContents_1 = class SafeContents2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, SafeContents_1.prototype);
  }
};
SafeContents = SafeContents_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: SafeBag })
], SafeContents);

// front/node_modules/@peculiar/asn1-pkcs9/build/es2015/index.js
var ExtensionRequest_1;
var ExtendedCertificateAttributes_1;
var SMIMECapabilities_1;
var id_pkcs9 = "1.2.840.113549.1.9";
var id_pkcs9_mo = `${id_pkcs9}.0`;
var id_pkcs9_oc = `${id_pkcs9}.24`;
var id_pkcs9_at = `${id_pkcs9}.25`;
var id_pkcs9_sx = `${id_pkcs9}.26`;
var id_pkcs9_mr = `${id_pkcs9}.27`;
var id_pkcs9_oc_pkcsEntity = `${id_pkcs9_oc}.1`;
var id_pkcs9_oc_naturalPerson = `${id_pkcs9_oc}.2`;
var id_pkcs9_at_emailAddress = `${id_pkcs9}.1`;
var id_pkcs9_at_unstructuredName = `${id_pkcs9}.2`;
var id_pkcs9_at_contentType = `${id_pkcs9}.3`;
var id_pkcs9_at_messageDigest = `${id_pkcs9}.4`;
var id_pkcs9_at_signingTime = `${id_pkcs9}.5`;
var id_pkcs9_at_counterSignature = `${id_pkcs9}.6`;
var id_pkcs9_at_challengePassword = `${id_pkcs9}.7`;
var id_pkcs9_at_unstructuredAddress = `${id_pkcs9}.8`;
var id_pkcs9_at_extendedCertificateAttributes = `${id_pkcs9}.9`;
var id_pkcs9_at_signingDescription = `${id_pkcs9}.13`;
var id_pkcs9_at_extensionRequest = `${id_pkcs9}.14`;
var id_pkcs9_at_smimeCapabilities = `${id_pkcs9}.15`;
var id_pkcs9_at_friendlyName = `${id_pkcs9}.20`;
var id_pkcs9_at_localKeyId = `${id_pkcs9}.21`;
var id_pkcs9_at_pkcs15Token = `${id_pkcs9_at}.1`;
var id_pkcs9_at_encryptedPrivateKeyInfo = `${id_pkcs9_at}.2`;
var id_pkcs9_at_randomNonce = `${id_pkcs9_at}.3`;
var id_pkcs9_at_sequenceNumber = `${id_pkcs9_at}.4`;
var id_pkcs9_at_pkcs7PDU = `${id_pkcs9_at}.5`;
var id_ietf_at = `1.3.6.1.5.5.7.9`;
var id_pkcs9_at_dateOfBirth = `${id_ietf_at}.1`;
var id_pkcs9_at_placeOfBirth = `${id_ietf_at}.2`;
var id_pkcs9_at_gender = `${id_ietf_at}.3`;
var id_pkcs9_at_countryOfCitizenship = `${id_ietf_at}.4`;
var id_pkcs9_at_countryOfResidence = `${id_ietf_at}.5`;
var id_pkcs9_sx_pkcs9String = `${id_pkcs9_sx}.1`;
var id_pkcs9_sx_signingTime = `${id_pkcs9_sx}.2`;
var id_pkcs9_mr_caseIgnoreMatch = `${id_pkcs9_mr}.1`;
var id_pkcs9_mr_signingTimeMatch = `${id_pkcs9_mr}.2`;
var id_smime = `${id_pkcs9}.16`;
var id_certTypes2 = `${id_pkcs9}.22`;
var crlTypes = `${id_pkcs9}.23`;
var id_at_pseudonym = `${id_at}.65`;
var PKCS9String = class PKCS9String2 extends DirectoryString {
  constructor(params = {}) {
    super(params);
  }
  toString() {
    const o = {};
    o.toString();
    return this.ia5String || super.toString();
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.IA5String })
], PKCS9String.prototype, "ia5String", void 0);
PKCS9String = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], PKCS9String);
var Pkcs7PDU = class Pkcs7PDU2 extends ContentInfo {
};
Pkcs7PDU = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], Pkcs7PDU);
var UserPKCS12 = class UserPKCS122 extends PFX {
};
UserPKCS12 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], UserPKCS12);
var EncryptedPrivateKeyInfo2 = class EncryptedPrivateKeyInfo3 extends EncryptedPrivateKeyInfo {
};
EncryptedPrivateKeyInfo2 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], EncryptedPrivateKeyInfo2);
var EmailAddress = class EmailAddress2 {
  constructor(value = "") {
    this.value = value;
  }
  toString() {
    return this.value;
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.IA5String })
], EmailAddress.prototype, "value", void 0);
EmailAddress = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], EmailAddress);
var UnstructuredName = class UnstructuredName2 extends PKCS9String {
};
UnstructuredName = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], UnstructuredName);
var UnstructuredAddress = class UnstructuredAddress2 extends DirectoryString {
};
UnstructuredAddress = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], UnstructuredAddress);
var DateOfBirth = class DateOfBirth2 {
  constructor(value = /* @__PURE__ */ new Date()) {
    this.value = value;
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.GeneralizedTime })
], DateOfBirth.prototype, "value", void 0);
DateOfBirth = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], DateOfBirth);
var PlaceOfBirth = class PlaceOfBirth2 extends DirectoryString {
};
PlaceOfBirth = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], PlaceOfBirth);
var Gender = class Gender2 {
  constructor(value = "M") {
    this.value = value;
  }
  toString() {
    return this.value;
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.PrintableString })
], Gender.prototype, "value", void 0);
Gender = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], Gender);
var CountryOfCitizenship = class CountryOfCitizenship2 {
  constructor(value = "") {
    this.value = value;
  }
  toString() {
    return this.value;
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.PrintableString })
], CountryOfCitizenship.prototype, "value", void 0);
CountryOfCitizenship = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], CountryOfCitizenship);
var CountryOfResidence = class CountryOfResidence2 extends CountryOfCitizenship {
};
CountryOfResidence = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], CountryOfResidence);
var Pseudonym = class Pseudonym2 extends DirectoryString {
};
Pseudonym = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], Pseudonym);
var ContentType = class ContentType2 {
  constructor(value = "") {
    this.value = value;
  }
  toString() {
    return this.value;
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], ContentType.prototype, "value", void 0);
ContentType = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], ContentType);
var SigningTime3 = class SigningTime4 extends Time {
};
SigningTime3 = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], SigningTime3);
var SequenceNumber = class SequenceNumber2 {
  constructor(value = 0) {
    this.value = value;
  }
  toString() {
    return this.value.toString();
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], SequenceNumber.prototype, "value", void 0);
SequenceNumber = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], SequenceNumber);
var CounterSignature3 = class CounterSignature4 extends SignerInfo {
};
CounterSignature3 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], CounterSignature3);
var ChallengePassword = class ChallengePassword2 extends DirectoryString {
};
ChallengePassword = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], ChallengePassword);
var ExtensionRequest = ExtensionRequest_1 = class ExtensionRequest2 extends Extensions {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, ExtensionRequest_1.prototype);
  }
};
ExtensionRequest = ExtensionRequest_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], ExtensionRequest);
var ExtendedCertificateAttributes = ExtendedCertificateAttributes_1 = class ExtendedCertificateAttributes2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, ExtendedCertificateAttributes_1.prototype);
  }
};
ExtendedCertificateAttributes = ExtendedCertificateAttributes_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Set, itemType: Attribute2 })
], ExtendedCertificateAttributes);
var FriendlyName = class FriendlyName2 {
  constructor(value = "") {
    this.value = value;
  }
  toString() {
    return this.value;
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.BmpString })
], FriendlyName.prototype, "value", void 0);
FriendlyName = __decorate([
  AsnType({ type: AsnTypeTypes.Choice })
], FriendlyName);
var SMIMECapability = class SMIMECapability2 extends AlgorithmIdentifier {
};
SMIMECapability = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence })
], SMIMECapability);
var SMIMECapabilities = SMIMECapabilities_1 = class SMIMECapabilities2 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, SMIMECapabilities_1.prototype);
  }
};
SMIMECapabilities = SMIMECapabilities_1 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: SMIMECapability })
], SMIMECapabilities);

// front/node_modules/@peculiar/asn1-csr/build/es2015/attributes.js
var Attributes_12;
var Attributes3 = Attributes_12 = class Attributes4 extends AsnArray {
  constructor(items) {
    super(items);
    Object.setPrototypeOf(this, Attributes_12.prototype);
  }
};
Attributes3 = Attributes_12 = __decorate([
  AsnType({ type: AsnTypeTypes.Sequence, itemType: Attribute })
], Attributes3);

// front/node_modules/@peculiar/asn1-csr/build/es2015/certification_request_info.js
var CertificationRequestInfo = class {
  constructor(params = {}) {
    this.version = 0;
    this.subject = new Name();
    this.subjectPKInfo = new SubjectPublicKeyInfo();
    this.attributes = new Attributes3();
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: AsnPropTypes.Integer })
], CertificationRequestInfo.prototype, "version", void 0);
__decorate([
  AsnProp({ type: Name })
], CertificationRequestInfo.prototype, "subject", void 0);
__decorate([
  AsnProp({ type: SubjectPublicKeyInfo })
], CertificationRequestInfo.prototype, "subjectPKInfo", void 0);
__decorate([
  AsnProp({ type: Attributes3, implicit: true, context: 0 })
], CertificationRequestInfo.prototype, "attributes", void 0);

// front/node_modules/@peculiar/asn1-csr/build/es2015/certification_request.js
var CertificationRequest = class {
  constructor(params = {}) {
    this.certificationRequestInfo = new CertificationRequestInfo();
    this.signatureAlgorithm = new AlgorithmIdentifier();
    this.signature = new ArrayBuffer(0);
    Object.assign(this, params);
  }
};
__decorate([
  AsnProp({ type: CertificationRequestInfo })
], CertificationRequest.prototype, "certificationRequestInfo", void 0);
__decorate([
  AsnProp({ type: AlgorithmIdentifier })
], CertificationRequest.prototype, "signatureAlgorithm", void 0);
__decorate([
  AsnProp({ type: AsnPropTypes.BitString })
], CertificationRequest.prototype, "signature", void 0);

// front/node_modules/@peculiar/x509/build/x509.es.js
var diAlgorithm = "crypto.algorithm";
var AlgorithmProvider = class {
  getAlgorithms() {
    return instance.resolveAll(diAlgorithm);
  }
  toAsnAlgorithm(alg) {
    ({ ...alg });
    for (const algorithm of this.getAlgorithms()) {
      const res = algorithm.toAsnAlgorithm(alg);
      if (res) {
        return res;
      }
    }
    if (/^[0-9.]+$/.test(alg.name)) {
      const res = new AlgorithmIdentifier({
        algorithm: alg.name
      });
      if ("parameters" in alg) {
        const unknown = alg;
        res.parameters = unknown.parameters;
      }
      return res;
    }
    throw new Error("Cannot convert WebCrypto algorithm to ASN.1 algorithm");
  }
  toWebAlgorithm(alg) {
    for (const algorithm of this.getAlgorithms()) {
      const res = algorithm.toWebAlgorithm(alg);
      if (res) {
        return res;
      }
    }
    const unknown = {
      name: alg.algorithm,
      parameters: alg.parameters
    };
    return unknown;
  }
};
var diAlgorithmProvider = "crypto.algorithmProvider";
instance.registerSingleton(diAlgorithmProvider, AlgorithmProvider);
var EcAlgorithm_1;
var idVersionOne = "1.3.36.3.3.2.8.1.1";
var idBrainpoolP160r1 = `${idVersionOne}.1`;
var idBrainpoolP160t1 = `${idVersionOne}.2`;
var idBrainpoolP192r1 = `${idVersionOne}.3`;
var idBrainpoolP192t1 = `${idVersionOne}.4`;
var idBrainpoolP224r1 = `${idVersionOne}.5`;
var idBrainpoolP224t1 = `${idVersionOne}.6`;
var idBrainpoolP256r1 = `${idVersionOne}.7`;
var idBrainpoolP256t1 = `${idVersionOne}.8`;
var idBrainpoolP320r1 = `${idVersionOne}.9`;
var idBrainpoolP320t1 = `${idVersionOne}.10`;
var idBrainpoolP384r1 = `${idVersionOne}.11`;
var idBrainpoolP384t1 = `${idVersionOne}.12`;
var idBrainpoolP512r1 = `${idVersionOne}.13`;
var idBrainpoolP512t1 = `${idVersionOne}.14`;
var brainpoolP160r1 = "brainpoolP160r1";
var brainpoolP160t1 = "brainpoolP160t1";
var brainpoolP192r1 = "brainpoolP192r1";
var brainpoolP192t1 = "brainpoolP192t1";
var brainpoolP224r1 = "brainpoolP224r1";
var brainpoolP224t1 = "brainpoolP224t1";
var brainpoolP256r1 = "brainpoolP256r1";
var brainpoolP256t1 = "brainpoolP256t1";
var brainpoolP320r1 = "brainpoolP320r1";
var brainpoolP320t1 = "brainpoolP320t1";
var brainpoolP384r1 = "brainpoolP384r1";
var brainpoolP384t1 = "brainpoolP384t1";
var brainpoolP512r1 = "brainpoolP512r1";
var brainpoolP512t1 = "brainpoolP512t1";
var ECDSA = "ECDSA";
var EcAlgorithm = EcAlgorithm_1 = class EcAlgorithm2 {
  toAsnAlgorithm(alg) {
    switch (alg.name.toLowerCase()) {
      case ECDSA.toLowerCase():
        if ("hash" in alg) {
          const hash = typeof alg.hash === "string" ? alg.hash : alg.hash.name;
          switch (hash.toLowerCase()) {
            case "sha-1":
              return ecdsaWithSHA1;
            case "sha-256":
              return ecdsaWithSHA256;
            case "sha-384":
              return ecdsaWithSHA384;
            case "sha-512":
              return ecdsaWithSHA512;
          }
        } else if ("namedCurve" in alg) {
          let parameters = "";
          switch (alg.namedCurve) {
            case "P-256":
              parameters = id_secp256r1;
              break;
            case "K-256":
              parameters = EcAlgorithm_1.SECP256K1;
              break;
            case "P-384":
              parameters = id_secp384r1;
              break;
            case "P-521":
              parameters = id_secp521r1;
              break;
            case brainpoolP160r1:
              parameters = idBrainpoolP160r1;
              break;
            case brainpoolP160t1:
              parameters = idBrainpoolP160t1;
              break;
            case brainpoolP192r1:
              parameters = idBrainpoolP192r1;
              break;
            case brainpoolP192t1:
              parameters = idBrainpoolP192t1;
              break;
            case brainpoolP224r1:
              parameters = idBrainpoolP224r1;
              break;
            case brainpoolP224t1:
              parameters = idBrainpoolP224t1;
              break;
            case brainpoolP256r1:
              parameters = idBrainpoolP256r1;
              break;
            case brainpoolP256t1:
              parameters = idBrainpoolP256t1;
              break;
            case brainpoolP320r1:
              parameters = idBrainpoolP320r1;
              break;
            case brainpoolP320t1:
              parameters = idBrainpoolP320t1;
              break;
            case brainpoolP384r1:
              parameters = idBrainpoolP384r1;
              break;
            case brainpoolP384t1:
              parameters = idBrainpoolP384t1;
              break;
            case brainpoolP512r1:
              parameters = idBrainpoolP512r1;
              break;
            case brainpoolP512t1:
              parameters = idBrainpoolP512t1;
              break;
          }
          if (parameters) {
            return new AlgorithmIdentifier({
              algorithm: id_ecPublicKey,
              parameters: AsnConvert.serialize(new ECParameters({ namedCurve: parameters }))
            });
          }
        }
    }
    return null;
  }
  toWebAlgorithm(alg) {
    switch (alg.algorithm) {
      case id_ecdsaWithSHA1:
        return { name: ECDSA, hash: { name: "SHA-1" } };
      case id_ecdsaWithSHA256:
        return { name: ECDSA, hash: { name: "SHA-256" } };
      case id_ecdsaWithSHA384:
        return { name: ECDSA, hash: { name: "SHA-384" } };
      case id_ecdsaWithSHA512:
        return { name: ECDSA, hash: { name: "SHA-512" } };
      case id_ecPublicKey: {
        if (!alg.parameters) {
          throw new TypeError("Cannot get required parameters from EC algorithm");
        }
        const parameters = AsnConvert.parse(alg.parameters, ECParameters);
        switch (parameters.namedCurve) {
          case id_secp256r1:
            return { name: ECDSA, namedCurve: "P-256" };
          case EcAlgorithm_1.SECP256K1:
            return { name: ECDSA, namedCurve: "K-256" };
          case id_secp384r1:
            return { name: ECDSA, namedCurve: "P-384" };
          case id_secp521r1:
            return { name: ECDSA, namedCurve: "P-521" };
          case idBrainpoolP160r1:
            return { name: ECDSA, namedCurve: brainpoolP160r1 };
          case idBrainpoolP160t1:
            return { name: ECDSA, namedCurve: brainpoolP160t1 };
          case idBrainpoolP192r1:
            return { name: ECDSA, namedCurve: brainpoolP192r1 };
          case idBrainpoolP192t1:
            return { name: ECDSA, namedCurve: brainpoolP192t1 };
          case idBrainpoolP224r1:
            return { name: ECDSA, namedCurve: brainpoolP224r1 };
          case idBrainpoolP224t1:
            return { name: ECDSA, namedCurve: brainpoolP224t1 };
          case idBrainpoolP256r1:
            return { name: ECDSA, namedCurve: brainpoolP256r1 };
          case idBrainpoolP256t1:
            return { name: ECDSA, namedCurve: brainpoolP256t1 };
          case idBrainpoolP320r1:
            return { name: ECDSA, namedCurve: brainpoolP320r1 };
          case idBrainpoolP320t1:
            return { name: ECDSA, namedCurve: brainpoolP320t1 };
          case idBrainpoolP384r1:
            return { name: ECDSA, namedCurve: brainpoolP384r1 };
          case idBrainpoolP384t1:
            return { name: ECDSA, namedCurve: brainpoolP384t1 };
          case idBrainpoolP512r1:
            return { name: ECDSA, namedCurve: brainpoolP512r1 };
          case idBrainpoolP512t1:
            return { name: ECDSA, namedCurve: brainpoolP512t1 };
        }
      }
    }
    return null;
  }
};
EcAlgorithm.SECP256K1 = "1.3.132.0.10";
EcAlgorithm = EcAlgorithm_1 = __decorate([
  injectable_default()
], EcAlgorithm);
instance.registerSingleton(diAlgorithm, EcAlgorithm);
var NAME2 = Symbol("name");
var VALUE = Symbol("value");
var TextObject = class {
  constructor(name3, items = {}, value = "") {
    this[NAME2] = name3;
    this[VALUE] = value;
    for (const key in items) {
      this[key] = items[key];
    }
  }
};
TextObject.NAME = NAME2;
TextObject.VALUE = VALUE;
var DefaultAlgorithmSerializer = class {
  static toTextObject(alg) {
    const obj = new TextObject("Algorithm Identifier", {}, OidSerializer.toString(alg.algorithm));
    if (alg.parameters) {
      switch (alg.algorithm) {
        case id_ecPublicKey: {
          const ecAlg = new EcAlgorithm().toWebAlgorithm(alg);
          if (ecAlg && "namedCurve" in ecAlg) {
            obj["Named Curve"] = ecAlg.namedCurve;
          } else {
            obj["Parameters"] = alg.parameters;
          }
          break;
        }
        default:
          obj["Parameters"] = alg.parameters;
      }
    }
    return obj;
  }
};
var OidSerializer = class {
  static toString(oid) {
    const name3 = this.items[oid];
    if (name3) {
      return name3;
    }
    return oid;
  }
};
OidSerializer.items = {
  [id_sha1]: "sha1",
  [id_sha224]: "sha224",
  [id_sha256]: "sha256",
  [id_sha384]: "sha384",
  [id_sha512]: "sha512",
  [id_rsaEncryption]: "rsaEncryption",
  [id_sha1WithRSAEncryption]: "sha1WithRSAEncryption",
  [id_sha224WithRSAEncryption]: "sha224WithRSAEncryption",
  [id_sha256WithRSAEncryption]: "sha256WithRSAEncryption",
  [id_sha384WithRSAEncryption]: "sha384WithRSAEncryption",
  [id_sha512WithRSAEncryption]: "sha512WithRSAEncryption",
  [id_ecPublicKey]: "ecPublicKey",
  [id_ecdsaWithSHA1]: "ecdsaWithSHA1",
  [id_ecdsaWithSHA224]: "ecdsaWithSHA224",
  [id_ecdsaWithSHA256]: "ecdsaWithSHA256",
  [id_ecdsaWithSHA384]: "ecdsaWithSHA384",
  [id_ecdsaWithSHA512]: "ecdsaWithSHA512",
  [id_kp_serverAuth]: "TLS WWW server authentication",
  [id_kp_clientAuth]: "TLS WWW client authentication",
  [id_kp_codeSigning]: "Code Signing",
  [id_kp_emailProtection]: "E-mail Protection",
  [id_kp_timeStamping]: "Time Stamping",
  [id_kp_OCSPSigning]: "OCSP Signing",
  [id_signedData]: "Signed Data"
};
var TextConverter = class {
  static serialize(obj) {
    return this.serializeObj(obj).join("\n");
  }
  static pad(deep = 0) {
    return "".padStart(2 * deep, " ");
  }
  static serializeObj(obj, deep = 0) {
    const res = [];
    let pad = this.pad(deep++);
    let value = "";
    const objValue = obj[TextObject.VALUE];
    if (objValue) {
      value = ` ${objValue}`;
    }
    res.push(`${pad}${obj[TextObject.NAME]}:${value}`);
    pad = this.pad(deep);
    for (const key in obj) {
      if (typeof key === "symbol") {
        continue;
      }
      const value2 = obj[key];
      const keyValue = key ? `${key}: ` : "";
      if (typeof value2 === "string" || typeof value2 === "number" || typeof value2 === "boolean") {
        res.push(`${pad}${keyValue}${value2}`);
      } else if (value2 instanceof Date) {
        res.push(`${pad}${keyValue}${value2.toUTCString()}`);
      } else if (Array.isArray(value2)) {
        for (const obj2 of value2) {
          obj2[TextObject.NAME] = key;
          res.push(...this.serializeObj(obj2, deep));
        }
      } else if (value2 instanceof TextObject) {
        value2[TextObject.NAME] = key;
        res.push(...this.serializeObj(value2, deep));
      } else if (import_pvtsutils6.BufferSourceConverter.isBufferSource(value2)) {
        if (key) {
          res.push(`${pad}${keyValue}`);
          res.push(...this.serializeBufferSource(value2, deep + 1));
        } else {
          res.push(...this.serializeBufferSource(value2, deep));
        }
      } else if ("toTextObject" in value2) {
        const obj2 = value2.toTextObject();
        obj2[TextObject.NAME] = key;
        res.push(...this.serializeObj(obj2, deep));
      } else {
        throw new TypeError("Cannot serialize data in text format. Unsupported type.");
      }
    }
    return res;
  }
  static serializeBufferSource(buffer, deep = 0) {
    const pad = this.pad(deep);
    const view = import_pvtsutils6.BufferSourceConverter.toUint8Array(buffer);
    const res = [];
    for (let i = 0; i < view.length; ) {
      const row = [];
      for (let j = 0; j < 16 && i < view.length; j++) {
        if (j === 8) {
          row.push("");
        }
        const hex = view[i++].toString(16).padStart(2, "0");
        row.push(hex);
      }
      res.push(`${pad}${row.join(" ")}`);
    }
    return res;
  }
  static serializeAlgorithm(alg) {
    return this.algorithmSerializer.toTextObject(alg);
  }
};
TextConverter.oidSerializer = OidSerializer;
TextConverter.algorithmSerializer = DefaultAlgorithmSerializer;
var AsnData = class _AsnData {
  constructor(...args) {
    if (args.length === 1) {
      const asn = args[0];
      this.rawData = AsnConvert.serialize(asn);
      this.onInit(asn);
    } else {
      const asn = AsnConvert.parse(args[0], args[1]);
      this.rawData = import_pvtsutils6.BufferSourceConverter.toArrayBuffer(args[0]);
      this.onInit(asn);
    }
  }
  equal(data) {
    if (data instanceof _AsnData) {
      return (0, import_pvtsutils6.isEqual)(data.rawData, this.rawData);
    }
    return false;
  }
  toString(format = "text") {
    switch (format) {
      case "asn":
        return AsnConvert.toString(this.rawData);
      case "text":
        return TextConverter.serialize(this.toTextObject());
      case "hex":
        return import_pvtsutils6.Convert.ToHex(this.rawData);
      case "base64":
        return import_pvtsutils6.Convert.ToBase64(this.rawData);
      case "base64url":
        return import_pvtsutils6.Convert.ToBase64Url(this.rawData);
      default:
        throw TypeError("Argument 'format' is unsupported value");
    }
  }
  getTextName() {
    const constructor = this.constructor;
    return constructor.NAME;
  }
  toTextObject() {
    const obj = this.toTextObjectEmpty();
    obj[""] = this.rawData;
    return obj;
  }
  toTextObjectEmpty(value) {
    return new TextObject(this.getTextName(), {}, value);
  }
};
AsnData.NAME = "ASN";
var Extension2 = class _Extension extends AsnData {
  constructor(...args) {
    let raw;
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      raw = import_pvtsutils6.BufferSourceConverter.toArrayBuffer(args[0]);
    } else {
      raw = AsnConvert.serialize(new Extension({
        extnID: args[0],
        critical: args[1],
        extnValue: new OctetString2(import_pvtsutils6.BufferSourceConverter.toArrayBuffer(args[2]))
      }));
    }
    super(raw, Extension);
  }
  onInit(asn) {
    this.type = asn.extnID;
    this.critical = asn.critical;
    this.value = asn.extnValue.buffer;
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    obj[""] = this.value;
    return obj;
  }
  toTextObjectWithoutValue() {
    const obj = this.toTextObjectEmpty(this.critical ? "critical" : void 0);
    if (obj[TextObject.NAME] === _Extension.NAME) {
      obj[TextObject.NAME] = OidSerializer.toString(this.type);
    }
    return obj;
  }
};
var _a2;
var CryptoProvider = class _CryptoProvider {
  static isCryptoKeyPair(data) {
    return data && data.privateKey && data.publicKey;
  }
  static isCryptoKey(data) {
    return data && data.usages && data.type && data.algorithm && data.extractable !== void 0;
  }
  constructor() {
    this.items = /* @__PURE__ */ new Map();
    this[_a2] = "CryptoProvider";
    if (typeof self !== "undefined" && typeof crypto !== "undefined") {
      this.set(_CryptoProvider.DEFAULT, crypto);
    } else if (typeof global !== "undefined" && global.crypto && global.crypto.subtle) {
      this.set(_CryptoProvider.DEFAULT, global.crypto);
    }
  }
  clear() {
    this.items.clear();
  }
  delete(key) {
    return this.items.delete(key);
  }
  forEach(callbackfn, thisArg) {
    return this.items.forEach(callbackfn, thisArg);
  }
  has(key) {
    return this.items.has(key);
  }
  get size() {
    return this.items.size;
  }
  entries() {
    return this.items.entries();
  }
  keys() {
    return this.items.keys();
  }
  values() {
    return this.items.values();
  }
  [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }
  get(key = _CryptoProvider.DEFAULT) {
    const crypto2 = this.items.get(key.toLowerCase());
    if (!crypto2) {
      throw new Error(`Cannot get Crypto by name '${key}'`);
    }
    return crypto2;
  }
  set(key, value) {
    if (typeof key === "string") {
      if (!value) {
        throw new TypeError("Argument 'value' is required");
      }
      this.items.set(key.toLowerCase(), value);
    } else {
      this.items.set(_CryptoProvider.DEFAULT, key);
    }
    return this;
  }
};
_a2 = Symbol.toStringTag;
CryptoProvider.DEFAULT = "default";
var cryptoProvider = new CryptoProvider();
var OID_REGEX = /^[0-2](?:\.[1-9][0-9]*)+$/;
function isOID(id) {
  return new RegExp(OID_REGEX).test(id);
}
var NameIdentifier = class {
  constructor(names2 = {}) {
    this.items = {};
    for (const id in names2) {
      this.register(id, names2[id]);
    }
  }
  get(idOrName) {
    return this.items[idOrName] || null;
  }
  findId(idOrName) {
    if (!isOID(idOrName)) {
      return this.get(idOrName);
    }
    return idOrName;
  }
  register(id, name3) {
    this.items[id] = name3;
    this.items[name3] = id;
  }
};
var names = new NameIdentifier();
names.register("CN", "2.5.4.3");
names.register("L", "2.5.4.7");
names.register("ST", "2.5.4.8");
names.register("O", "2.5.4.10");
names.register("OU", "2.5.4.11");
names.register("C", "2.5.4.6");
names.register("DC", "0.9.2342.19200300.100.1.25");
names.register("E", "1.2.840.113549.1.9.1");
names.register("G", "2.5.4.42");
names.register("I", "2.5.4.43");
names.register("SN", "2.5.4.4");
names.register("T", "2.5.4.12");
function replaceUnknownCharacter(text, char) {
  return `\\${import_pvtsutils6.Convert.ToHex(import_pvtsutils6.Convert.FromUtf8String(char)).toUpperCase()}`;
}
function escape2(data) {
  return data.replace(/([,+"\\<>;])/g, "\\$1").replace(/^([ #])/, "\\$1").replace(/([ ]$)/, "\\$1").replace(/([\r\n\t])/, replaceUnknownCharacter);
}
var Name3 = class _Name {
  static isASCII(text) {
    for (let i = 0; i < text.length; i++) {
      const code3 = text.charCodeAt(i);
      if (code3 > 255) {
        return false;
      }
    }
    return true;
  }
  static isPrintableString(text) {
    return /^[A-Za-z0-9 '()+,-./:=?]*$/g.test(text);
  }
  constructor(data, extraNames = {}) {
    this.extraNames = new NameIdentifier();
    this.asn = new Name();
    for (const key in extraNames) {
      if (Object.prototype.hasOwnProperty.call(extraNames, key)) {
        const value = extraNames[key];
        this.extraNames.register(key, value);
      }
    }
    if (typeof data === "string") {
      this.asn = this.fromString(data);
    } else if (data instanceof Name) {
      this.asn = data;
    } else if (import_pvtsutils6.BufferSourceConverter.isBufferSource(data)) {
      this.asn = AsnConvert.parse(data, Name);
    } else {
      this.asn = this.fromJSON(data);
    }
  }
  getField(idOrName) {
    const id = this.extraNames.findId(idOrName) || names.findId(idOrName);
    const res = [];
    for (const name3 of this.asn) {
      for (const rdn of name3) {
        if (rdn.type === id) {
          res.push(rdn.value.toString());
        }
      }
    }
    return res;
  }
  getName(idOrName) {
    return this.extraNames.get(idOrName) || names.get(idOrName);
  }
  toString() {
    return this.asn.map((rdn) => rdn.map((o) => {
      const type = this.getName(o.type) || o.type;
      const value = o.value.anyValue ? `#${import_pvtsutils6.Convert.ToHex(o.value.anyValue)}` : escape2(o.value.toString());
      return `${type}=${value}`;
    }).join("+")).join(", ");
  }
  toJSON() {
    var _a3;
    const json = [];
    for (const rdn of this.asn) {
      const jsonItem = {};
      for (const attr of rdn) {
        const type = this.getName(attr.type) || attr.type;
        (_a3 = jsonItem[type]) !== null && _a3 !== void 0 ? _a3 : jsonItem[type] = [];
        jsonItem[type].push(attr.value.anyValue ? `#${import_pvtsutils6.Convert.ToHex(attr.value.anyValue)}` : attr.value.toString());
      }
      json.push(jsonItem);
    }
    return json;
  }
  fromString(data) {
    const asn = new Name();
    const regex = /(\d\.[\d.]*\d|[A-Za-z]+)=((?:"")|(?:".*?[^\\]")|(?:[^,+].*?(?:[^\\][,+]))|(?:))([,+])?/g;
    let matches = null;
    let level = ",";
    while (matches = regex.exec(`${data},`)) {
      let [, type, value] = matches;
      const lastChar = value[value.length - 1];
      if (lastChar === "," || lastChar === "+") {
        value = value.slice(0, value.length - 1);
        matches[3] = lastChar;
      }
      const next = matches[3];
      type = this.getTypeOid(type);
      const attr = this.createAttribute(type, value);
      if (level === "+") {
        asn[asn.length - 1].push(attr);
      } else {
        asn.push(new RelativeDistinguishedName([attr]));
      }
      level = next;
    }
    return asn;
  }
  fromJSON(data) {
    const asn = new Name();
    for (const item of data) {
      const asnRdn = new RelativeDistinguishedName();
      for (const type in item) {
        const typeId = this.getTypeOid(type);
        const values = item[type];
        for (const value of values) {
          const asnAttr = this.createAttribute(typeId, value);
          asnRdn.push(asnAttr);
        }
      }
      asn.push(asnRdn);
    }
    return asn;
  }
  getTypeOid(type) {
    if (!/[\d.]+/.test(type)) {
      type = this.getName(type) || "";
    }
    if (!type) {
      throw new Error(`Cannot get OID for name type '${type}'`);
    }
    return type;
  }
  createAttribute(type, value) {
    const attr = new AttributeTypeAndValue({ type });
    if (typeof value === "object") {
      for (const key in value) {
        switch (key) {
          case "ia5String":
            attr.value.ia5String = value[key];
            break;
          case "utf8String":
            attr.value.utf8String = value[key];
            break;
          case "universalString":
            attr.value.universalString = value[key];
            break;
          case "bmpString":
            attr.value.bmpString = value[key];
            break;
          case "printableString":
            attr.value.printableString = value[key];
            break;
        }
      }
    } else if (value[0] === "#") {
      attr.value.anyValue = import_pvtsutils6.Convert.FromHex(value.slice(1));
    } else {
      const processedValue = this.processStringValue(value);
      if (type === this.getName("E") || type === this.getName("DC")) {
        attr.value.ia5String = processedValue;
      } else {
        if (_Name.isPrintableString(processedValue)) {
          attr.value.printableString = processedValue;
        } else {
          attr.value.utf8String = processedValue;
        }
      }
    }
    return attr;
  }
  processStringValue(value) {
    const quotedMatches = /"(.*?[^\\])?"/.exec(value);
    if (quotedMatches) {
      value = quotedMatches[1];
    }
    return value.replace(/\\0a/ig, "\n").replace(/\\0d/ig, "\r").replace(/\\0g/ig, "	").replace(/\\(.)/g, "$1");
  }
  toArrayBuffer() {
    return AsnConvert.serialize(this.asn);
  }
  async getThumbprint(...args) {
    var _a3;
    let crypto2;
    let algorithm = "SHA-1";
    if (args.length >= 1 && !((_a3 = args[0]) === null || _a3 === void 0 ? void 0 : _a3.subtle)) {
      algorithm = args[0] || algorithm;
      crypto2 = args[1] || cryptoProvider.get();
    } else {
      crypto2 = args[0] || cryptoProvider.get();
    }
    return await crypto2.subtle.digest(algorithm, this.toArrayBuffer());
  }
};
var ERR_GN_CONSTRUCTOR = "Cannot initialize GeneralName from ASN.1 data.";
var ERR_GN_STRING_FORMAT = `${ERR_GN_CONSTRUCTOR} Unsupported string format in use.`;
var ERR_GUID = `${ERR_GN_CONSTRUCTOR} Value doesn't match to GUID regular expression.`;
var GUID_REGEX = /^([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})$/i;
var id_GUID = "1.3.6.1.4.1.311.25.1";
var id_UPN = "1.3.6.1.4.1.311.20.2.3";
var DNS = "dns";
var DN = "dn";
var EMAIL = "email";
var IP = "ip";
var URL = "url";
var GUID = "guid";
var UPN = "upn";
var REGISTERED_ID = "id";
var GeneralName3 = class extends AsnData {
  constructor(...args) {
    let name3;
    if (args.length === 2) {
      switch (args[0]) {
        case DN: {
          const derName = new Name3(args[1]).toArrayBuffer();
          const asnName = AsnConvert.parse(derName, Name);
          name3 = new GeneralName({ directoryName: asnName });
          break;
        }
        case DNS:
          name3 = new GeneralName({ dNSName: args[1] });
          break;
        case EMAIL:
          name3 = new GeneralName({ rfc822Name: args[1] });
          break;
        case GUID: {
          const matches = new RegExp(GUID_REGEX, "i").exec(args[1]);
          if (!matches) {
            throw new Error("Cannot parse GUID value. Value doesn't match to regular expression");
          }
          const hex = matches.slice(1).map((o, i) => {
            if (i < 3) {
              return import_pvtsutils6.Convert.ToHex(new Uint8Array(import_pvtsutils6.Convert.FromHex(o)).reverse());
            }
            return o;
          }).join("");
          name3 = new GeneralName({
            otherName: new OtherName({
              typeId: id_GUID,
              value: AsnConvert.serialize(new OctetString2(import_pvtsutils6.Convert.FromHex(hex)))
            })
          });
          break;
        }
        case IP:
          name3 = new GeneralName({ iPAddress: args[1] });
          break;
        case REGISTERED_ID:
          name3 = new GeneralName({ registeredID: args[1] });
          break;
        case UPN: {
          name3 = new GeneralName({
            otherName: new OtherName({
              typeId: id_UPN,
              value: AsnConvert.serialize(AsnUtf8StringConverter.toASN(args[1]))
            })
          });
          break;
        }
        case URL:
          name3 = new GeneralName({ uniformResourceIdentifier: args[1] });
          break;
        default:
          throw new Error("Cannot create GeneralName. Unsupported type of the name");
      }
    } else if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      name3 = AsnConvert.parse(args[0], GeneralName);
    } else {
      name3 = args[0];
    }
    super(name3);
  }
  onInit(asn) {
    if (asn.dNSName != void 0) {
      this.type = DNS;
      this.value = asn.dNSName;
    } else if (asn.rfc822Name != void 0) {
      this.type = EMAIL;
      this.value = asn.rfc822Name;
    } else if (asn.iPAddress != void 0) {
      this.type = IP;
      this.value = asn.iPAddress;
    } else if (asn.uniformResourceIdentifier != void 0) {
      this.type = URL;
      this.value = asn.uniformResourceIdentifier;
    } else if (asn.registeredID != void 0) {
      this.type = REGISTERED_ID;
      this.value = asn.registeredID;
    } else if (asn.directoryName != void 0) {
      this.type = DN;
      this.value = new Name3(asn.directoryName).toString();
    } else if (asn.otherName != void 0) {
      if (asn.otherName.typeId === id_GUID) {
        this.type = GUID;
        const guid = AsnConvert.parse(asn.otherName.value, OctetString2);
        const matches = new RegExp(GUID_REGEX, "i").exec(import_pvtsutils6.Convert.ToHex(guid));
        if (!matches) {
          throw new Error(ERR_GUID);
        }
        this.value = matches.slice(1).map((o, i) => {
          if (i < 3) {
            return import_pvtsutils6.Convert.ToHex(new Uint8Array(import_pvtsutils6.Convert.FromHex(o)).reverse());
          }
          return o;
        }).join("-");
      } else if (asn.otherName.typeId === id_UPN) {
        this.type = UPN;
        this.value = AsnConvert.parse(asn.otherName.value, DirectoryString).toString();
      } else {
        throw new Error(ERR_GN_STRING_FORMAT);
      }
    } else {
      throw new Error(ERR_GN_STRING_FORMAT);
    }
  }
  toJSON() {
    return {
      type: this.type,
      value: this.value
    };
  }
  toTextObject() {
    let type;
    switch (this.type) {
      case DN:
      case DNS:
      case GUID:
      case IP:
      case REGISTERED_ID:
      case UPN:
      case URL:
        type = this.type.toUpperCase();
        break;
      case EMAIL:
        type = "Email";
        break;
      default:
        throw new Error("Unsupported GeneralName type");
    }
    let value = this.value;
    if (this.type === REGISTERED_ID) {
      value = OidSerializer.toString(value);
    }
    return new TextObject(type, void 0, value);
  }
};
var GeneralNames3 = class extends AsnData {
  constructor(params) {
    let names2;
    if (params instanceof GeneralNames) {
      names2 = params;
    } else if (Array.isArray(params)) {
      const items = [];
      for (const name3 of params) {
        if (name3 instanceof GeneralName) {
          items.push(name3);
        } else {
          const asnName = AsnConvert.parse(new GeneralName3(name3.type, name3.value).rawData, GeneralName);
          items.push(asnName);
        }
      }
      names2 = new GeneralNames(items);
    } else if (import_pvtsutils6.BufferSourceConverter.isBufferSource(params)) {
      names2 = AsnConvert.parse(params, GeneralNames);
    } else {
      throw new Error("Cannot initialize GeneralNames. Incorrect incoming arguments");
    }
    super(names2);
  }
  onInit(asn) {
    const items = [];
    for (const asnName of asn) {
      let name3 = null;
      try {
        name3 = new GeneralName3(asnName);
      } catch {
        continue;
      }
      items.push(name3);
    }
    this.items = items;
  }
  toJSON() {
    return this.items.map((o) => o.toJSON());
  }
  toTextObject() {
    const res = super.toTextObjectEmpty();
    for (const name3 of this.items) {
      const nameObj = name3.toTextObject();
      let field = res[nameObj[TextObject.NAME]];
      if (!Array.isArray(field)) {
        field = [];
        res[nameObj[TextObject.NAME]] = field;
      }
      field.push(nameObj);
    }
    return res;
  }
};
GeneralNames3.NAME = "GeneralNames";
var rPaddingTag = "-{5}";
var rEolChars = "\\n";
var rNameTag = `[^${rEolChars}]+`;
var rBeginTag = `${rPaddingTag}BEGIN (${rNameTag}(?=${rPaddingTag}))${rPaddingTag}`;
var rEndTag = `${rPaddingTag}END \\1${rPaddingTag}`;
var rEolGroup = "\\n";
var rHeaderKey = `[^:${rEolChars}]+`;
var rHeaderValue = `(?:[^${rEolChars}]+${rEolGroup}(?: +[^${rEolChars}]+${rEolGroup})*)`;
var rBase64Chars = "[a-zA-Z0-9=+/]+";
var rBase64 = `(?:${rBase64Chars}${rEolGroup})+`;
var rPem = `${rBeginTag}${rEolGroup}(?:((?:${rHeaderKey}: ${rHeaderValue})+))?${rEolGroup}?(${rBase64})${rEndTag}`;
var PemConverter = class {
  static isPem(data) {
    return typeof data === "string" && new RegExp(rPem, "g").test(data);
  }
  static decodeWithHeaders(pem) {
    pem = pem.replace(/\r/g, "");
    const pattern = new RegExp(rPem, "g");
    const res = [];
    let matches = null;
    while (matches = pattern.exec(pem)) {
      const base642 = matches[3].replace(new RegExp(`[${rEolChars}]+`, "g"), "");
      const pemStruct = {
        type: matches[1],
        headers: [],
        rawData: import_pvtsutils6.Convert.FromBase64(base642)
      };
      const headersString = matches[2];
      if (headersString) {
        const headers = headersString.split(new RegExp(rEolGroup, "g"));
        let lastHeader = null;
        for (const header of headers) {
          const [key, value] = header.split(/:(.*)/);
          if (value === void 0) {
            if (!lastHeader) {
              throw new Error("Cannot parse PEM string. Incorrect header value");
            }
            lastHeader.value += key.trim();
          } else {
            if (lastHeader) {
              pemStruct.headers.push(lastHeader);
            }
            lastHeader = { key, value: value.trim() };
          }
        }
        if (lastHeader) {
          pemStruct.headers.push(lastHeader);
        }
      }
      res.push(pemStruct);
    }
    return res;
  }
  static decode(pem) {
    const blocks = this.decodeWithHeaders(pem);
    return blocks.map((o) => o.rawData);
  }
  static decodeFirst(pem) {
    const items = this.decode(pem);
    if (!items.length) {
      throw new RangeError("PEM string doesn't contain any objects");
    }
    return items[0];
  }
  static encode(rawData, tag) {
    if (Array.isArray(rawData)) {
      const raws = new Array();
      if (tag) {
        rawData.forEach((element) => {
          if (!import_pvtsutils6.BufferSourceConverter.isBufferSource(element)) {
            throw new TypeError("Cannot encode array of BufferSource in PEM format. Not all items of the array are BufferSource");
          }
          raws.push(this.encodeStruct({
            type: tag,
            rawData: import_pvtsutils6.BufferSourceConverter.toArrayBuffer(element)
          }));
        });
      } else {
        rawData.forEach((element) => {
          if (!("type" in element)) {
            throw new TypeError("Cannot encode array of PemStruct in PEM format. Not all items of the array are PemStrut");
          }
          raws.push(this.encodeStruct(element));
        });
      }
      return raws.join("\n");
    } else {
      if (!tag) {
        throw new Error("Required argument 'tag' is missed");
      }
      return this.encodeStruct({
        type: tag,
        rawData: import_pvtsutils6.BufferSourceConverter.toArrayBuffer(rawData)
      });
    }
  }
  static encodeStruct(pem) {
    var _a3;
    const upperCaseType = pem.type.toLocaleUpperCase();
    const res = [];
    res.push(`-----BEGIN ${upperCaseType}-----`);
    if ((_a3 = pem.headers) === null || _a3 === void 0 ? void 0 : _a3.length) {
      for (const header of pem.headers) {
        res.push(`${header.key}: ${header.value}`);
      }
      res.push("");
    }
    const base642 = import_pvtsutils6.Convert.ToBase64(pem.rawData);
    let sliced;
    let offset = 0;
    const rows = Array();
    while (offset < base642.length) {
      if (base642.length - offset < 64) {
        sliced = base642.substring(offset);
      } else {
        sliced = base642.substring(offset, offset + 64);
        offset += 64;
      }
      if (sliced.length !== 0) {
        rows.push(sliced);
        if (sliced.length < 64) {
          break;
        }
      } else {
        break;
      }
    }
    res.push(...rows);
    res.push(`-----END ${upperCaseType}-----`);
    return res.join("\n");
  }
};
PemConverter.CertificateTag = "CERTIFICATE";
PemConverter.CrlTag = "CRL";
PemConverter.CertificateRequestTag = "CERTIFICATE REQUEST";
PemConverter.PublicKeyTag = "PUBLIC KEY";
PemConverter.PrivateKeyTag = "PRIVATE KEY";
var PemData = class _PemData extends AsnData {
  static isAsnEncoded(data) {
    return import_pvtsutils6.BufferSourceConverter.isBufferSource(data) || typeof data === "string";
  }
  static toArrayBuffer(raw) {
    if (typeof raw === "string") {
      if (PemConverter.isPem(raw)) {
        return PemConverter.decode(raw)[0];
      } else if (import_pvtsutils6.Convert.isHex(raw)) {
        return import_pvtsutils6.Convert.FromHex(raw);
      } else if (import_pvtsutils6.Convert.isBase64(raw)) {
        return import_pvtsutils6.Convert.FromBase64(raw);
      } else if (import_pvtsutils6.Convert.isBase64Url(raw)) {
        return import_pvtsutils6.Convert.FromBase64Url(raw);
      } else {
        throw new TypeError("Unsupported format of 'raw' argument. Must be one of DER, PEM, HEX, Base64, or Base4Url");
      }
    } else {
      const stringRaw = import_pvtsutils6.Convert.ToBinary(raw);
      if (PemConverter.isPem(stringRaw)) {
        return PemConverter.decode(stringRaw)[0];
      } else if (import_pvtsutils6.Convert.isHex(stringRaw)) {
        return import_pvtsutils6.Convert.FromHex(stringRaw);
      } else if (import_pvtsutils6.Convert.isBase64(stringRaw)) {
        return import_pvtsutils6.Convert.FromBase64(stringRaw);
      } else if (import_pvtsutils6.Convert.isBase64Url(stringRaw)) {
        return import_pvtsutils6.Convert.FromBase64Url(stringRaw);
      }
      return import_pvtsutils6.BufferSourceConverter.toArrayBuffer(raw);
    }
  }
  constructor(...args) {
    if (_PemData.isAsnEncoded(args[0])) {
      super(_PemData.toArrayBuffer(args[0]), args[1]);
    } else {
      super(args[0]);
    }
  }
  toString(format = "pem") {
    switch (format) {
      case "pem":
        return PemConverter.encode(this.rawData, this.tag);
      default:
        return super.toString(format);
    }
  }
};
var PublicKey = class _PublicKey extends PemData {
  static async create(data, crypto2 = cryptoProvider.get()) {
    if (data instanceof _PublicKey) {
      return data;
    } else if (CryptoProvider.isCryptoKey(data)) {
      if (data.type !== "public") {
        throw new TypeError("Public key is required");
      }
      const spki = await crypto2.subtle.exportKey("spki", data);
      return new _PublicKey(spki);
    } else if (data.publicKey) {
      return data.publicKey;
    } else if (import_pvtsutils6.BufferSourceConverter.isBufferSource(data)) {
      return new _PublicKey(data);
    } else {
      throw new TypeError("Unsupported PublicKeyType");
    }
  }
  constructor(param) {
    if (PemData.isAsnEncoded(param)) {
      super(param, SubjectPublicKeyInfo);
    } else {
      super(param);
    }
    this.tag = PemConverter.PublicKeyTag;
  }
  async export(...args) {
    let crypto2;
    let keyUsages = ["verify"];
    let algorithm = { hash: "SHA-256", ...this.algorithm };
    if (args.length > 1) {
      algorithm = args[0] || algorithm;
      keyUsages = args[1] || keyUsages;
      crypto2 = args[2] || cryptoProvider.get();
    } else {
      crypto2 = args[0] || cryptoProvider.get();
    }
    let raw = this.rawData;
    const asnSpki = AsnConvert.parse(this.rawData, SubjectPublicKeyInfo);
    if (asnSpki.algorithm.algorithm === id_RSASSA_PSS) {
      raw = convertSpkiToRsaPkcs1(asnSpki, raw);
    }
    return crypto2.subtle.importKey("spki", raw, algorithm, true, keyUsages);
  }
  onInit(asn) {
    const algProv = instance.resolve(diAlgorithmProvider);
    const algorithm = this.algorithm = algProv.toWebAlgorithm(asn.algorithm);
    switch (asn.algorithm.algorithm) {
      case id_rsaEncryption: {
        const rsaPublicKey = AsnConvert.parse(asn.subjectPublicKey, RSAPublicKey);
        const modulus = import_pvtsutils6.BufferSourceConverter.toUint8Array(rsaPublicKey.modulus);
        algorithm.publicExponent = import_pvtsutils6.BufferSourceConverter.toUint8Array(rsaPublicKey.publicExponent);
        algorithm.modulusLength = (!modulus[0] ? modulus.slice(1) : modulus).byteLength << 3;
        break;
      }
    }
  }
  async getThumbprint(...args) {
    var _a3;
    let crypto2;
    let algorithm = "SHA-1";
    if (args.length >= 1 && !((_a3 = args[0]) === null || _a3 === void 0 ? void 0 : _a3.subtle)) {
      algorithm = args[0] || algorithm;
      crypto2 = args[1] || cryptoProvider.get();
    } else {
      crypto2 = args[0] || cryptoProvider.get();
    }
    return await crypto2.subtle.digest(algorithm, this.rawData);
  }
  async getKeyIdentifier(...args) {
    let crypto2;
    let algorithm = "SHA-1";
    if (args.length === 1) {
      if (typeof args[0] === "string") {
        algorithm = args[0];
        crypto2 = cryptoProvider.get();
      } else {
        crypto2 = args[0];
      }
    } else if (args.length === 2) {
      algorithm = args[0];
      crypto2 = args[1];
    } else {
      crypto2 = cryptoProvider.get();
    }
    const asn = AsnConvert.parse(this.rawData, SubjectPublicKeyInfo);
    return await crypto2.subtle.digest(algorithm, asn.subjectPublicKey);
  }
  toTextObject() {
    const obj = this.toTextObjectEmpty();
    const asn = AsnConvert.parse(this.rawData, SubjectPublicKeyInfo);
    obj["Algorithm"] = TextConverter.serializeAlgorithm(asn.algorithm);
    switch (asn.algorithm.algorithm) {
      case id_ecPublicKey:
        obj["EC Point"] = asn.subjectPublicKey;
        break;
      case id_rsaEncryption:
      default:
        obj["Raw Data"] = asn.subjectPublicKey;
    }
    return obj;
  }
};
function convertSpkiToRsaPkcs1(asnSpki, raw) {
  asnSpki.algorithm = new AlgorithmIdentifier({
    algorithm: id_rsaEncryption,
    parameters: null
  });
  raw = AsnConvert.serialize(asnSpki);
  return raw;
}
var AuthorityKeyIdentifierExtension = class _AuthorityKeyIdentifierExtension extends Extension2 {
  static async create(param, critical = false, crypto2 = cryptoProvider.get()) {
    if ("name" in param && "serialNumber" in param) {
      return new _AuthorityKeyIdentifierExtension(param, critical);
    }
    const key = await PublicKey.create(param, crypto2);
    const id = await key.getKeyIdentifier(crypto2);
    return new _AuthorityKeyIdentifierExtension(import_pvtsutils6.Convert.ToHex(id), critical);
  }
  constructor(...args) {
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
    } else if (typeof args[0] === "string") {
      const value = new AuthorityKeyIdentifier({ keyIdentifier: new KeyIdentifier(import_pvtsutils6.Convert.FromHex(args[0])) });
      super(id_ce_authorityKeyIdentifier, args[1], AsnConvert.serialize(value));
    } else {
      const certId = args[0];
      const certIdName = certId.name instanceof GeneralNames3 ? AsnConvert.parse(certId.name.rawData, GeneralNames) : certId.name;
      const value = new AuthorityKeyIdentifier({
        authorityCertIssuer: certIdName,
        authorityCertSerialNumber: import_pvtsutils6.Convert.FromHex(certId.serialNumber)
      });
      super(id_ce_authorityKeyIdentifier, args[1], AsnConvert.serialize(value));
    }
  }
  onInit(asn) {
    super.onInit(asn);
    const aki = AsnConvert.parse(asn.extnValue, AuthorityKeyIdentifier);
    if (aki.keyIdentifier) {
      this.keyId = import_pvtsutils6.Convert.ToHex(aki.keyIdentifier);
    }
    if (aki.authorityCertIssuer || aki.authorityCertSerialNumber) {
      this.certId = {
        name: aki.authorityCertIssuer || [],
        serialNumber: aki.authorityCertSerialNumber ? import_pvtsutils6.Convert.ToHex(aki.authorityCertSerialNumber) : ""
      };
    }
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    const asn = AsnConvert.parse(this.value, AuthorityKeyIdentifier);
    if (asn.authorityCertIssuer) {
      obj["Authority Issuer"] = new GeneralNames3(asn.authorityCertIssuer).toTextObject();
    }
    if (asn.authorityCertSerialNumber) {
      obj["Authority Serial Number"] = asn.authorityCertSerialNumber;
    }
    if (asn.keyIdentifier) {
      obj[""] = asn.keyIdentifier;
    }
    return obj;
  }
};
AuthorityKeyIdentifierExtension.NAME = "Authority Key Identifier";
var BasicConstraintsExtension = class extends Extension2 {
  constructor(...args) {
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
      const value = AsnConvert.parse(this.value, BasicConstraints);
      this.ca = value.cA;
      this.pathLength = value.pathLenConstraint;
    } else {
      const value = new BasicConstraints({
        cA: args[0],
        pathLenConstraint: args[1]
      });
      super(id_ce_basicConstraints, args[2], AsnConvert.serialize(value));
      this.ca = args[0];
      this.pathLength = args[1];
    }
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    if (this.ca) {
      obj["CA"] = this.ca;
    }
    if (this.pathLength !== void 0) {
      obj["Path Length"] = this.pathLength;
    }
    return obj;
  }
};
BasicConstraintsExtension.NAME = "Basic Constraints";
var ExtendedKeyUsage3;
(function(ExtendedKeyUsage4) {
  ExtendedKeyUsage4["serverAuth"] = "1.3.6.1.5.5.7.3.1";
  ExtendedKeyUsage4["clientAuth"] = "1.3.6.1.5.5.7.3.2";
  ExtendedKeyUsage4["codeSigning"] = "1.3.6.1.5.5.7.3.3";
  ExtendedKeyUsage4["emailProtection"] = "1.3.6.1.5.5.7.3.4";
  ExtendedKeyUsage4["timeStamping"] = "1.3.6.1.5.5.7.3.8";
  ExtendedKeyUsage4["ocspSigning"] = "1.3.6.1.5.5.7.3.9";
})(ExtendedKeyUsage3 || (ExtendedKeyUsage3 = {}));
var ExtendedKeyUsageExtension = class extends Extension2 {
  constructor(...args) {
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
      const value = AsnConvert.parse(this.value, ExtendedKeyUsage);
      this.usages = value.map((o) => o);
    } else {
      const value = new ExtendedKeyUsage(args[0]);
      super(id_ce_extKeyUsage, args[1], AsnConvert.serialize(value));
      this.usages = args[0];
    }
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    obj[""] = this.usages.map((o) => OidSerializer.toString(o)).join(", ");
    return obj;
  }
};
ExtendedKeyUsageExtension.NAME = "Extended Key Usages";
var KeyUsageFlags2;
(function(KeyUsageFlags3) {
  KeyUsageFlags3[KeyUsageFlags3["digitalSignature"] = 1] = "digitalSignature";
  KeyUsageFlags3[KeyUsageFlags3["nonRepudiation"] = 2] = "nonRepudiation";
  KeyUsageFlags3[KeyUsageFlags3["keyEncipherment"] = 4] = "keyEncipherment";
  KeyUsageFlags3[KeyUsageFlags3["dataEncipherment"] = 8] = "dataEncipherment";
  KeyUsageFlags3[KeyUsageFlags3["keyAgreement"] = 16] = "keyAgreement";
  KeyUsageFlags3[KeyUsageFlags3["keyCertSign"] = 32] = "keyCertSign";
  KeyUsageFlags3[KeyUsageFlags3["cRLSign"] = 64] = "cRLSign";
  KeyUsageFlags3[KeyUsageFlags3["encipherOnly"] = 128] = "encipherOnly";
  KeyUsageFlags3[KeyUsageFlags3["decipherOnly"] = 256] = "decipherOnly";
})(KeyUsageFlags2 || (KeyUsageFlags2 = {}));
var KeyUsagesExtension = class extends Extension2 {
  constructor(...args) {
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
      const value = AsnConvert.parse(this.value, KeyUsage);
      this.usages = value.toNumber();
    } else {
      const value = new KeyUsage(args[0]);
      super(id_ce_keyUsage, args[1], AsnConvert.serialize(value));
      this.usages = args[0];
    }
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    const asn = AsnConvert.parse(this.value, KeyUsage);
    obj[""] = asn.toJSON().join(", ");
    return obj;
  }
};
KeyUsagesExtension.NAME = "Key Usages";
var SubjectKeyIdentifierExtension = class _SubjectKeyIdentifierExtension extends Extension2 {
  static async create(publicKey, critical = false, crypto2 = cryptoProvider.get()) {
    const key = await PublicKey.create(publicKey, crypto2);
    const id = await key.getKeyIdentifier(crypto2);
    return new _SubjectKeyIdentifierExtension(import_pvtsutils6.Convert.ToHex(id), critical);
  }
  constructor(...args) {
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
      const value = AsnConvert.parse(this.value, SubjectKeyIdentifier);
      this.keyId = import_pvtsutils6.Convert.ToHex(value);
    } else {
      const identifier = typeof args[0] === "string" ? import_pvtsutils6.Convert.FromHex(args[0]) : args[0];
      const value = new SubjectKeyIdentifier(identifier);
      super(id_ce_subjectKeyIdentifier, args[1], AsnConvert.serialize(value));
      this.keyId = import_pvtsutils6.Convert.ToHex(identifier);
    }
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    const asn = AsnConvert.parse(this.value, SubjectKeyIdentifier);
    obj[""] = asn;
    return obj;
  }
};
SubjectKeyIdentifierExtension.NAME = "Subject Key Identifier";
var SubjectAlternativeNameExtension = class extends Extension2 {
  constructor(...args) {
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
    } else {
      super(id_ce_subjectAltName, args[1], new GeneralNames3(args[0] || []).rawData);
    }
  }
  onInit(asn) {
    super.onInit(asn);
    const value = AsnConvert.parse(asn.extnValue, SubjectAlternativeName);
    this.names = new GeneralNames3(value);
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    const namesObj = this.names.toTextObject();
    for (const key in namesObj) {
      obj[key] = namesObj[key];
    }
    return obj;
  }
};
SubjectAlternativeNameExtension.NAME = "Subject Alternative Name";
var ExtensionFactory = class {
  static register(id, type) {
    this.items.set(id, type);
  }
  static create(data) {
    const extension = new Extension2(data);
    const Type = this.items.get(extension.type);
    if (Type) {
      return new Type(data);
    }
    return extension;
  }
};
ExtensionFactory.items = /* @__PURE__ */ new Map();
var CertificatePolicyExtension = class extends Extension2 {
  constructor(...args) {
    var _a3;
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
      const asnPolicies = AsnConvert.parse(this.value, CertificatePolicies);
      this.policies = asnPolicies.map((o) => o.policyIdentifier);
    } else {
      const policies = args[0];
      const critical = (_a3 = args[1]) !== null && _a3 !== void 0 ? _a3 : false;
      const value = new CertificatePolicies(policies.map((o) => new PolicyInformation({
        policyIdentifier: o
      })));
      super(id_ce_certificatePolicies, critical, AsnConvert.serialize(value));
      this.policies = policies;
    }
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    obj["Policy"] = this.policies.map((o) => new TextObject("", {}, OidSerializer.toString(o)));
    return obj;
  }
};
CertificatePolicyExtension.NAME = "Certificate Policies";
ExtensionFactory.register(id_ce_certificatePolicies, CertificatePolicyExtension);
var CRLDistributionPointsExtension = class extends Extension2 {
  constructor(...args) {
    var _a3;
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
    } else if (Array.isArray(args[0]) && typeof args[0][0] === "string") {
      const urls = args[0];
      const dps = urls.map((url) => {
        return new DistributionPoint({
          distributionPoint: new DistributionPointName({
            fullName: [new GeneralName({ uniformResourceIdentifier: url })]
          })
        });
      });
      const value = new CRLDistributionPoints(dps);
      super(id_ce_cRLDistributionPoints, args[1], AsnConvert.serialize(value));
    } else {
      const value = new CRLDistributionPoints(args[0]);
      super(id_ce_cRLDistributionPoints, args[1], AsnConvert.serialize(value));
    }
    (_a3 = this.distributionPoints) !== null && _a3 !== void 0 ? _a3 : this.distributionPoints = [];
  }
  onInit(asn) {
    super.onInit(asn);
    const crlExt = AsnConvert.parse(asn.extnValue, CRLDistributionPoints);
    this.distributionPoints = crlExt;
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    obj["Distribution Point"] = this.distributionPoints.map((dp) => {
      var _a3;
      const dpObj = {};
      if (dp.distributionPoint) {
        dpObj[""] = (_a3 = dp.distributionPoint.fullName) === null || _a3 === void 0 ? void 0 : _a3.map((name3) => new GeneralName3(name3).toString()).join(", ");
      }
      if (dp.reasons) {
        dpObj["Reasons"] = dp.reasons.toString();
      }
      if (dp.cRLIssuer) {
        dpObj["CRL Issuer"] = dp.cRLIssuer.map((issuer) => issuer.toString()).join(", ");
      }
      return dpObj;
    });
    return obj;
  }
};
CRLDistributionPointsExtension.NAME = "CRL Distribution Points";
var AuthorityInfoAccessExtension = class extends Extension2 {
  constructor(...args) {
    var _a3, _b, _c, _d;
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
    } else if (args[0] instanceof AuthorityInfoAccessSyntax) {
      const value = new AuthorityInfoAccessSyntax(args[0]);
      super(id_pe_authorityInfoAccess, args[1], AsnConvert.serialize(value));
    } else {
      const params = args[0];
      const value = new AuthorityInfoAccessSyntax();
      addAccessDescriptions(value, params, id_ad_ocsp, "ocsp");
      addAccessDescriptions(value, params, id_ad_caIssuers, "caIssuers");
      addAccessDescriptions(value, params, id_ad_timeStamping, "timeStamping");
      addAccessDescriptions(value, params, id_ad_caRepository, "caRepository");
      super(id_pe_authorityInfoAccess, args[1], AsnConvert.serialize(value));
    }
    (_a3 = this.ocsp) !== null && _a3 !== void 0 ? _a3 : this.ocsp = [];
    (_b = this.caIssuers) !== null && _b !== void 0 ? _b : this.caIssuers = [];
    (_c = this.timeStamping) !== null && _c !== void 0 ? _c : this.timeStamping = [];
    (_d = this.caRepository) !== null && _d !== void 0 ? _d : this.caRepository = [];
  }
  onInit(asn) {
    super.onInit(asn);
    this.ocsp = [];
    this.caIssuers = [];
    this.timeStamping = [];
    this.caRepository = [];
    const aia = AsnConvert.parse(asn.extnValue, AuthorityInfoAccessSyntax);
    aia.forEach((accessDescription) => {
      switch (accessDescription.accessMethod) {
        case id_ad_ocsp:
          this.ocsp.push(new GeneralName3(accessDescription.accessLocation));
          break;
        case id_ad_caIssuers:
          this.caIssuers.push(new GeneralName3(accessDescription.accessLocation));
          break;
        case id_ad_timeStamping:
          this.timeStamping.push(new GeneralName3(accessDescription.accessLocation));
          break;
        case id_ad_caRepository:
          this.caRepository.push(new GeneralName3(accessDescription.accessLocation));
          break;
      }
    });
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    if (this.ocsp.length) {
      addUrlsToObject(obj, "OCSP", this.ocsp);
    }
    if (this.caIssuers.length) {
      addUrlsToObject(obj, "CA Issuers", this.caIssuers);
    }
    if (this.timeStamping.length) {
      addUrlsToObject(obj, "Time Stamping", this.timeStamping);
    }
    if (this.caRepository.length) {
      addUrlsToObject(obj, "CA Repository", this.caRepository);
    }
    return obj;
  }
};
AuthorityInfoAccessExtension.NAME = "Authority Info Access";
function addUrlsToObject(obj, key, urls) {
  if (urls.length === 1) {
    obj[key] = urls[0].toTextObject();
  } else {
    const names2 = new TextObject("");
    urls.forEach((name3, index) => {
      const nameObj = name3.toTextObject();
      const indexedKey = `${nameObj[TextObject.NAME]} ${index + 1}`;
      let field = names2[indexedKey];
      if (!Array.isArray(field)) {
        field = [];
        names2[indexedKey] = field;
      }
      field.push(nameObj);
    });
    obj[key] = names2;
  }
}
function addAccessDescriptions(value, params, method, key) {
  const items = params[key];
  if (items) {
    const array = Array.isArray(items) ? items : [items];
    array.forEach((url) => {
      if (typeof url === "string") {
        url = new GeneralName3("url", url);
      }
      value.push(new AccessDescription({
        accessMethod: method,
        accessLocation: AsnConvert.parse(url.rawData, GeneralName)
      }));
    });
  }
}
var Attribute3 = class _Attribute extends AsnData {
  constructor(...args) {
    let raw;
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      raw = import_pvtsutils6.BufferSourceConverter.toArrayBuffer(args[0]);
    } else {
      const type = args[0];
      const values = Array.isArray(args[1]) ? args[1].map((o) => import_pvtsutils6.BufferSourceConverter.toArrayBuffer(o)) : [];
      raw = AsnConvert.serialize(new Attribute({ type, values }));
    }
    super(raw, Attribute);
  }
  onInit(asn) {
    this.type = asn.type;
    this.values = asn.values;
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    obj["Value"] = this.values.map((o) => new TextObject("", { "": o }));
    return obj;
  }
  toTextObjectWithoutValue() {
    const obj = this.toTextObjectEmpty();
    if (obj[TextObject.NAME] === _Attribute.NAME) {
      obj[TextObject.NAME] = OidSerializer.toString(this.type);
    }
    return obj;
  }
};
Attribute3.NAME = "Attribute";
var ChallengePasswordAttribute = class extends Attribute3 {
  constructor(...args) {
    var _a3;
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
    } else {
      const value = new ChallengePassword({
        printableString: args[0]
      });
      super(id_pkcs9_at_challengePassword, [AsnConvert.serialize(value)]);
    }
    (_a3 = this.password) !== null && _a3 !== void 0 ? _a3 : this.password = "";
  }
  onInit(asn) {
    super.onInit(asn);
    if (this.values[0]) {
      const value = AsnConvert.parse(this.values[0], ChallengePassword);
      this.password = value.toString();
    }
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    obj[TextObject.VALUE] = this.password;
    return obj;
  }
};
ChallengePasswordAttribute.NAME = "Challenge Password";
var ExtensionsAttribute = class extends Attribute3 {
  constructor(...args) {
    var _a3;
    if (import_pvtsutils6.BufferSourceConverter.isBufferSource(args[0])) {
      super(args[0]);
    } else {
      const extensions = args[0];
      const value = new Extensions();
      for (const extension of extensions) {
        value.push(AsnConvert.parse(extension.rawData, Extension));
      }
      super(id_pkcs9_at_extensionRequest, [AsnConvert.serialize(value)]);
    }
    (_a3 = this.items) !== null && _a3 !== void 0 ? _a3 : this.items = [];
  }
  onInit(asn) {
    super.onInit(asn);
    if (this.values[0]) {
      const value = AsnConvert.parse(this.values[0], Extensions);
      this.items = value.map((o) => ExtensionFactory.create(AsnConvert.serialize(o)));
    }
  }
  toTextObject() {
    const obj = this.toTextObjectWithoutValue();
    const extensions = this.items.map((o) => o.toTextObject());
    for (const extension of extensions) {
      obj[extension[TextObject.NAME]] = extension;
    }
    return obj;
  }
};
ExtensionsAttribute.NAME = "Extensions";
var AttributeFactory = class {
  static register(id, type) {
    this.items.set(id, type);
  }
  static create(data) {
    const attribute = new Attribute3(data);
    const Type = this.items.get(attribute.type);
    if (Type) {
      return new Type(data);
    }
    return attribute;
  }
};
AttributeFactory.items = /* @__PURE__ */ new Map();
var diAsnSignatureFormatter = "crypto.signatureFormatter";
var AsnDefaultSignatureFormatter = class {
  toAsnSignature(algorithm, signature) {
    return import_pvtsutils6.BufferSourceConverter.toArrayBuffer(signature);
  }
  toWebSignature(algorithm, signature) {
    return import_pvtsutils6.BufferSourceConverter.toArrayBuffer(signature);
  }
};
var RsaAlgorithm_1;
var RsaAlgorithm = RsaAlgorithm_1 = class RsaAlgorithm2 {
  static createPssParams(hash, saltLength) {
    const hashAlgorithm = RsaAlgorithm_1.getHashAlgorithm(hash);
    if (!hashAlgorithm) {
      return null;
    }
    return new RsaSaPssParams({
      hashAlgorithm,
      maskGenAlgorithm: new AlgorithmIdentifier({
        algorithm: id_mgf1,
        parameters: AsnConvert.serialize(hashAlgorithm)
      }),
      saltLength
    });
  }
  static getHashAlgorithm(alg) {
    const algProv = instance.resolve(diAlgorithmProvider);
    if (typeof alg === "string") {
      return algProv.toAsnAlgorithm({ name: alg });
    }
    if (typeof alg === "object" && alg && "name" in alg) {
      return algProv.toAsnAlgorithm(alg);
    }
    return null;
  }
  toAsnAlgorithm(alg) {
    switch (alg.name.toLowerCase()) {
      case "rsassa-pkcs1-v1_5":
        if ("hash" in alg) {
          let hash;
          if (typeof alg.hash === "string") {
            hash = alg.hash;
          } else if (alg.hash && typeof alg.hash === "object" && "name" in alg.hash && typeof alg.hash.name === "string") {
            hash = alg.hash.name.toUpperCase();
          } else {
            throw new Error("Cannot get hash algorithm name");
          }
          switch (hash.toLowerCase()) {
            case "sha-1":
              return new AlgorithmIdentifier({ algorithm: id_sha1WithRSAEncryption, parameters: null });
            case "sha-256":
              return new AlgorithmIdentifier({ algorithm: id_sha256WithRSAEncryption, parameters: null });
            case "sha-384":
              return new AlgorithmIdentifier({ algorithm: id_sha384WithRSAEncryption, parameters: null });
            case "sha-512":
              return new AlgorithmIdentifier({ algorithm: id_sha512WithRSAEncryption, parameters: null });
          }
        } else {
          return new AlgorithmIdentifier({ algorithm: id_rsaEncryption, parameters: null });
        }
        break;
      case "rsa-pss":
        if ("hash" in alg) {
          if (!("saltLength" in alg && typeof alg.saltLength === "number")) {
            throw new Error("Cannot get 'saltLength' from 'alg' argument");
          }
          const pssParams = RsaAlgorithm_1.createPssParams(alg.hash, alg.saltLength);
          if (!pssParams) {
            throw new Error("Cannot create PSS parameters");
          }
          return new AlgorithmIdentifier({ algorithm: id_RSASSA_PSS, parameters: AsnConvert.serialize(pssParams) });
        } else {
          return new AlgorithmIdentifier({ algorithm: id_RSASSA_PSS, parameters: null });
        }
    }
    return null;
  }
  toWebAlgorithm(alg) {
    switch (alg.algorithm) {
      case id_rsaEncryption:
        return { name: "RSASSA-PKCS1-v1_5" };
      case id_sha1WithRSAEncryption:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-1" } };
      case id_sha256WithRSAEncryption:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
      case id_sha384WithRSAEncryption:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } };
      case id_sha512WithRSAEncryption:
        return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-512" } };
      case id_RSASSA_PSS:
        if (alg.parameters) {
          const pssParams = AsnConvert.parse(alg.parameters, RsaSaPssParams);
          const algProv = instance.resolve(diAlgorithmProvider);
          const hashAlg = algProv.toWebAlgorithm(pssParams.hashAlgorithm);
          return {
            name: "RSA-PSS",
            hash: hashAlg,
            saltLength: pssParams.saltLength
          };
        } else {
          return { name: "RSA-PSS" };
        }
    }
    return null;
  }
};
RsaAlgorithm = RsaAlgorithm_1 = __decorate([
  injectable_default()
], RsaAlgorithm);
instance.registerSingleton(diAlgorithm, RsaAlgorithm);
var ShaAlgorithm = class ShaAlgorithm2 {
  toAsnAlgorithm(alg) {
    switch (alg.name.toLowerCase()) {
      case "sha-1":
        return new AlgorithmIdentifier({ algorithm: id_sha1 });
      case "sha-256":
        return new AlgorithmIdentifier({ algorithm: id_sha256 });
      case "sha-384":
        return new AlgorithmIdentifier({ algorithm: id_sha384 });
      case "sha-512":
        return new AlgorithmIdentifier({ algorithm: id_sha512 });
    }
    return null;
  }
  toWebAlgorithm(alg) {
    switch (alg.algorithm) {
      case id_sha1:
        return { name: "SHA-1" };
      case id_sha256:
        return { name: "SHA-256" };
      case id_sha384:
        return { name: "SHA-384" };
      case id_sha512:
        return { name: "SHA-512" };
    }
    return null;
  }
};
ShaAlgorithm = __decorate([
  injectable_default()
], ShaAlgorithm);
instance.registerSingleton(diAlgorithm, ShaAlgorithm);
var AsnEcSignatureFormatter = class _AsnEcSignatureFormatter {
  addPadding(pointSize, data) {
    const bytes = import_pvtsutils6.BufferSourceConverter.toUint8Array(data);
    const res = new Uint8Array(pointSize);
    res.set(bytes, pointSize - bytes.length);
    return res;
  }
  removePadding(data, positive = false) {
    let bytes = import_pvtsutils6.BufferSourceConverter.toUint8Array(data);
    for (let i = 0; i < bytes.length; i++) {
      if (!bytes[i]) {
        continue;
      }
      bytes = bytes.slice(i);
      break;
    }
    if (positive && bytes[0] > 127) {
      const result = new Uint8Array(bytes.length + 1);
      result.set(bytes, 1);
      return result.buffer;
    }
    return bytes.buffer;
  }
  toAsnSignature(algorithm, signature) {
    if (algorithm.name === "ECDSA") {
      const namedCurve = algorithm.namedCurve;
      const pointSize = _AsnEcSignatureFormatter.namedCurveSize.get(namedCurve) || _AsnEcSignatureFormatter.defaultNamedCurveSize;
      const ecSignature = new ECDSASigValue();
      const uint8Signature = import_pvtsutils6.BufferSourceConverter.toUint8Array(signature);
      ecSignature.r = this.removePadding(uint8Signature.slice(0, pointSize), true);
      ecSignature.s = this.removePadding(uint8Signature.slice(pointSize, pointSize + pointSize), true);
      return AsnConvert.serialize(ecSignature);
    }
    return null;
  }
  toWebSignature(algorithm, signature) {
    if (algorithm.name === "ECDSA") {
      const ecSigValue = AsnConvert.parse(signature, ECDSASigValue);
      const namedCurve = algorithm.namedCurve;
      const pointSize = _AsnEcSignatureFormatter.namedCurveSize.get(namedCurve) || _AsnEcSignatureFormatter.defaultNamedCurveSize;
      const r = this.addPadding(pointSize, this.removePadding(ecSigValue.r));
      const s = this.addPadding(pointSize, this.removePadding(ecSigValue.s));
      return (0, import_pvtsutils6.combine)(r, s);
    }
    return null;
  }
};
AsnEcSignatureFormatter.namedCurveSize = /* @__PURE__ */ new Map();
AsnEcSignatureFormatter.defaultNamedCurveSize = 32;
var idX25519 = "1.3.101.110";
var idX448 = "1.3.101.111";
var idEd25519 = "1.3.101.112";
var idEd448 = "1.3.101.113";
var EdAlgorithm = class EdAlgorithm2 {
  toAsnAlgorithm(alg) {
    let algorithm = null;
    switch (alg.name.toLowerCase()) {
      case "ed25519":
        algorithm = idEd25519;
        break;
      case "x25519":
        algorithm = idX25519;
        break;
      case "eddsa":
        switch (alg.namedCurve.toLowerCase()) {
          case "ed25519":
            algorithm = idEd25519;
            break;
          case "ed448":
            algorithm = idEd448;
            break;
        }
        break;
      case "ecdh-es":
        switch (alg.namedCurve.toLowerCase()) {
          case "x25519":
            algorithm = idX25519;
            break;
          case "x448":
            algorithm = idX448;
            break;
        }
    }
    if (algorithm) {
      return new AlgorithmIdentifier({
        algorithm
      });
    }
    return null;
  }
  toWebAlgorithm(alg) {
    switch (alg.algorithm) {
      case idEd25519:
        return { name: "Ed25519" };
      case idEd448:
        return { name: "EdDSA", namedCurve: "Ed448" };
      case idX25519:
        return { name: "X25519" };
      case idX448:
        return { name: "ECDH-ES", namedCurve: "X448" };
    }
    return null;
  }
};
EdAlgorithm = __decorate([
  injectable_default()
], EdAlgorithm);
instance.registerSingleton(diAlgorithm, EdAlgorithm);
var Pkcs10CertificateRequest = class extends PemData {
  constructor(param) {
    if (PemData.isAsnEncoded(param)) {
      super(param, CertificationRequest);
    } else {
      super(param);
    }
    this.tag = PemConverter.CertificateRequestTag;
  }
  onInit(asn) {
    this.tbs = AsnConvert.serialize(asn.certificationRequestInfo);
    this.publicKey = new PublicKey(asn.certificationRequestInfo.subjectPKInfo);
    const algProv = instance.resolve(diAlgorithmProvider);
    this.signatureAlgorithm = algProv.toWebAlgorithm(asn.signatureAlgorithm);
    this.signature = asn.signature;
    this.attributes = asn.certificationRequestInfo.attributes.map((o) => AttributeFactory.create(AsnConvert.serialize(o)));
    const extensions = this.getAttribute(id_pkcs9_at_extensionRequest);
    this.extensions = [];
    if (extensions instanceof ExtensionsAttribute) {
      this.extensions = extensions.items;
    }
    this.subjectName = new Name3(asn.certificationRequestInfo.subject);
    this.subject = this.subjectName.toString();
  }
  getAttribute(type) {
    for (const attr of this.attributes) {
      if (attr.type === type) {
        return attr;
      }
    }
    return null;
  }
  getAttributes(type) {
    return this.attributes.filter((o) => o.type === type);
  }
  getExtension(type) {
    for (const ext of this.extensions) {
      if (ext.type === type) {
        return ext;
      }
    }
    return null;
  }
  getExtensions(type) {
    return this.extensions.filter((o) => o.type === type);
  }
  async verify(crypto2 = cryptoProvider.get()) {
    const algorithm = { ...this.publicKey.algorithm, ...this.signatureAlgorithm };
    const publicKey = await this.publicKey.export(algorithm, ["verify"], crypto2);
    const signatureFormatters = instance.resolveAll(diAsnSignatureFormatter).reverse();
    let signature = null;
    for (const signatureFormatter of signatureFormatters) {
      signature = signatureFormatter.toWebSignature(algorithm, this.signature);
      if (signature) {
        break;
      }
    }
    if (!signature) {
      throw Error("Cannot convert WebCrypto signature value to ASN.1 format");
    }
    const ok = await crypto2.subtle.verify(this.signatureAlgorithm, publicKey, signature, this.tbs);
    return ok;
  }
  toTextObject() {
    const obj = this.toTextObjectEmpty();
    const req = AsnConvert.parse(this.rawData, CertificationRequest);
    const tbs = req.certificationRequestInfo;
    const data = new TextObject("", {
      "Version": `${Version[tbs.version]} (${tbs.version})`,
      "Subject": this.subject,
      "Subject Public Key Info": this.publicKey
    });
    if (this.attributes.length) {
      const attrs = new TextObject("");
      for (const ext of this.attributes) {
        const attrObj = ext.toTextObject();
        attrs[attrObj[TextObject.NAME]] = attrObj;
      }
      data["Attributes"] = attrs;
    }
    obj["Data"] = data;
    obj["Signature"] = new TextObject("", {
      "Algorithm": TextConverter.serializeAlgorithm(req.signatureAlgorithm),
      "": req.signature
    });
    return obj;
  }
};
Pkcs10CertificateRequest.NAME = "PKCS#10 Certificate Request";
var X509Certificate = class extends PemData {
  constructor(param) {
    if (PemData.isAsnEncoded(param)) {
      super(param, Certificate);
    } else {
      super(param);
    }
    this.tag = PemConverter.CertificateTag;
  }
  onInit(asn) {
    const tbs = asn.tbsCertificate;
    this.tbs = AsnConvert.serialize(tbs);
    this.serialNumber = import_pvtsutils6.Convert.ToHex(tbs.serialNumber);
    this.subjectName = new Name3(tbs.subject);
    this.subject = new Name3(tbs.subject).toString();
    this.issuerName = new Name3(tbs.issuer);
    this.issuer = this.issuerName.toString();
    const algProv = instance.resolve(diAlgorithmProvider);
    this.signatureAlgorithm = algProv.toWebAlgorithm(asn.signatureAlgorithm);
    this.signature = asn.signatureValue;
    const notBefore = tbs.validity.notBefore.utcTime || tbs.validity.notBefore.generalTime;
    if (!notBefore) {
      throw new Error("Cannot get 'notBefore' value");
    }
    this.notBefore = notBefore;
    const notAfter = tbs.validity.notAfter.utcTime || tbs.validity.notAfter.generalTime;
    if (!notAfter) {
      throw new Error("Cannot get 'notAfter' value");
    }
    this.notAfter = notAfter;
    this.extensions = [];
    if (tbs.extensions) {
      this.extensions = tbs.extensions.map((o) => ExtensionFactory.create(AsnConvert.serialize(o)));
    }
    this.publicKey = new PublicKey(tbs.subjectPublicKeyInfo);
  }
  getExtension(type) {
    for (const ext of this.extensions) {
      if (typeof type === "string") {
        if (ext.type === type) {
          return ext;
        }
      } else {
        if (ext instanceof type) {
          return ext;
        }
      }
    }
    return null;
  }
  getExtensions(type) {
    return this.extensions.filter((o) => {
      if (typeof type === "string") {
        return o.type === type;
      } else {
        return o instanceof type;
      }
    });
  }
  async verify(params = {}, crypto2 = cryptoProvider.get()) {
    let keyAlgorithm;
    let publicKey;
    const paramsKey = params.publicKey;
    try {
      if (!paramsKey) {
        keyAlgorithm = { ...this.publicKey.algorithm, ...this.signatureAlgorithm };
        publicKey = await this.publicKey.export(keyAlgorithm, ["verify"], crypto2);
      } else if ("publicKey" in paramsKey) {
        keyAlgorithm = { ...paramsKey.publicKey.algorithm, ...this.signatureAlgorithm };
        publicKey = await paramsKey.publicKey.export(keyAlgorithm, ["verify"], crypto2);
      } else if (paramsKey instanceof PublicKey) {
        keyAlgorithm = { ...paramsKey.algorithm, ...this.signatureAlgorithm };
        publicKey = await paramsKey.export(keyAlgorithm, ["verify"], crypto2);
      } else if (import_pvtsutils6.BufferSourceConverter.isBufferSource(paramsKey)) {
        const key = new PublicKey(paramsKey);
        keyAlgorithm = { ...key.algorithm, ...this.signatureAlgorithm };
        publicKey = await key.export(keyAlgorithm, ["verify"], crypto2);
      } else {
        keyAlgorithm = { ...paramsKey.algorithm, ...this.signatureAlgorithm };
        publicKey = paramsKey;
      }
    } catch (e) {
      return false;
    }
    const signatureFormatters = instance.resolveAll(diAsnSignatureFormatter).reverse();
    let signature = null;
    for (const signatureFormatter of signatureFormatters) {
      signature = signatureFormatter.toWebSignature(keyAlgorithm, this.signature);
      if (signature) {
        break;
      }
    }
    if (!signature) {
      throw Error("Cannot convert ASN.1 signature value to WebCrypto format");
    }
    const ok = await crypto2.subtle.verify(this.signatureAlgorithm, publicKey, signature, this.tbs);
    if (params.signatureOnly) {
      return ok;
    } else {
      const date = params.date || /* @__PURE__ */ new Date();
      const time = date.getTime();
      return ok && this.notBefore.getTime() < time && time < this.notAfter.getTime();
    }
  }
  async getThumbprint(...args) {
    let crypto2;
    let algorithm = "SHA-1";
    if (args[0]) {
      if (!args[0].subtle) {
        algorithm = args[0] || algorithm;
        crypto2 = args[1];
      } else {
        crypto2 = args[0];
      }
    }
    crypto2 !== null && crypto2 !== void 0 ? crypto2 : crypto2 = cryptoProvider.get();
    return await crypto2.subtle.digest(algorithm, this.rawData);
  }
  async isSelfSigned(crypto2 = cryptoProvider.get()) {
    return this.subject === this.issuer && await this.verify({ signatureOnly: true }, crypto2);
  }
  toTextObject() {
    const obj = this.toTextObjectEmpty();
    const cert = AsnConvert.parse(this.rawData, Certificate);
    const tbs = cert.tbsCertificate;
    const data = new TextObject("", {
      "Version": `${Version[tbs.version]} (${tbs.version})`,
      "Serial Number": tbs.serialNumber,
      "Signature Algorithm": TextConverter.serializeAlgorithm(tbs.signature),
      "Issuer": this.issuer,
      "Validity": new TextObject("", {
        "Not Before": tbs.validity.notBefore.getTime(),
        "Not After": tbs.validity.notAfter.getTime()
      }),
      "Subject": this.subject,
      "Subject Public Key Info": this.publicKey
    });
    if (tbs.issuerUniqueID) {
      data["Issuer Unique ID"] = tbs.issuerUniqueID;
    }
    if (tbs.subjectUniqueID) {
      data["Subject Unique ID"] = tbs.subjectUniqueID;
    }
    if (this.extensions.length) {
      const extensions = new TextObject("");
      for (const ext of this.extensions) {
        const extObj = ext.toTextObject();
        extensions[extObj[TextObject.NAME]] = extObj;
      }
      data["Extensions"] = extensions;
    }
    obj["Data"] = data;
    obj["Signature"] = new TextObject("", {
      "Algorithm": TextConverter.serializeAlgorithm(cert.signatureAlgorithm),
      "": cert.signatureValue
    });
    return obj;
  }
};
X509Certificate.NAME = "Certificate";
var X509CrlReason;
(function(X509CrlReason2) {
  X509CrlReason2[X509CrlReason2["unspecified"] = 0] = "unspecified";
  X509CrlReason2[X509CrlReason2["keyCompromise"] = 1] = "keyCompromise";
  X509CrlReason2[X509CrlReason2["cACompromise"] = 2] = "cACompromise";
  X509CrlReason2[X509CrlReason2["affiliationChanged"] = 3] = "affiliationChanged";
  X509CrlReason2[X509CrlReason2["superseded"] = 4] = "superseded";
  X509CrlReason2[X509CrlReason2["cessationOfOperation"] = 5] = "cessationOfOperation";
  X509CrlReason2[X509CrlReason2["certificateHold"] = 6] = "certificateHold";
  X509CrlReason2[X509CrlReason2["removeFromCRL"] = 8] = "removeFromCRL";
  X509CrlReason2[X509CrlReason2["privilegeWithdrawn"] = 9] = "privilegeWithdrawn";
  X509CrlReason2[X509CrlReason2["aACompromise"] = 10] = "aACompromise";
})(X509CrlReason || (X509CrlReason = {}));
ExtensionFactory.register(id_ce_basicConstraints, BasicConstraintsExtension);
ExtensionFactory.register(id_ce_extKeyUsage, ExtendedKeyUsageExtension);
ExtensionFactory.register(id_ce_keyUsage, KeyUsagesExtension);
ExtensionFactory.register(id_ce_subjectKeyIdentifier, SubjectKeyIdentifierExtension);
ExtensionFactory.register(id_ce_authorityKeyIdentifier, AuthorityKeyIdentifierExtension);
ExtensionFactory.register(id_ce_subjectAltName, SubjectAlternativeNameExtension);
ExtensionFactory.register(id_ce_cRLDistributionPoints, CRLDistributionPointsExtension);
ExtensionFactory.register(id_pe_authorityInfoAccess, AuthorityInfoAccessExtension);
AttributeFactory.register(id_pkcs9_at_challengePassword, ChallengePasswordAttribute);
AttributeFactory.register(id_pkcs9_at_extensionRequest, ExtensionsAttribute);
instance.registerSingleton(diAsnSignatureFormatter, AsnDefaultSignatureFormatter);
instance.registerSingleton(diAsnSignatureFormatter, AsnEcSignatureFormatter);
AsnEcSignatureFormatter.namedCurveSize.set("P-256", 32);
AsnEcSignatureFormatter.namedCurveSize.set("K-256", 32);
AsnEcSignatureFormatter.namedCurveSize.set("P-384", 48);
AsnEcSignatureFormatter.namedCurveSize.set("P-521", 66);

// front/src/components/crypto.js
async function createDidKey() {
  var keyPair = await generateECDSAKeyPair();
  var publicJWK = await exportToJWK(keyPair.publicKey);
  var privateJWK = await exportToJWK(keyPair.privateKey);
  const did = util_exports.createDid(publicJWK);
  return { did, privateKey: privateJWK };
}
async function getOrCreateDidKey() {
  var myDid = await window.MHR.storage.didFirst();
  if (!myDid) {
    myDid = await createDidKey();
    await window.MHR.storage.didSave(myDid);
  }
  return myDid;
}
async function signWithJWK(signingString, keyJWK) {
  const privateKey = await importFromJWK(keyJWK);
  if (privateKey.type != "private") {
    throw new Error("Not a private key");
  }
  const hashBuffer = new TextEncoder().encode(signingString);
  let signature = await window.crypto.subtle.sign(
    {
      name: "ECDSA",
      hash: { name: "SHA-256" }
    },
    privateKey,
    hashBuffer
  );
  let astr = btoa(String.fromCharCode(...new Uint8Array(signature)));
  astr = astr.replace(/=+$/, "");
  astr = astr.replace(/\+/g, "-").replace(/\//g, "_");
  return astr;
}
async function signJWT(header, payload, keyJWK) {
  const stringifiedHeader = JSON.stringify(header);
  const stringifiedPayload = JSON.stringify(payload);
  const headerBase64 = UTF8StringToBase64Url(stringifiedHeader);
  const payloadBase64 = UTF8StringToBase64Url(stringifiedPayload);
  const headerAndPayload = `${headerBase64}.${payloadBase64}`;
  const signature = await signWithJWK(headerAndPayload, keyJWK);
  return `${headerAndPayload}.${signature}`;
}
async function generateECDSAKeyPair() {
  const extractable = true;
  const algorithm = {
    name: "ECDSA",
    namedCurve: "P-256"
  };
  const keyUsages = ["sign", "verify"];
  let keyPair = await crypto.subtle.generateKey(algorithm, extractable, keyUsages);
  return keyPair;
}
async function exportToJWK(key) {
  let keyJWK = await crypto.subtle.exportKey("jwk", key);
  return keyJWK;
}
async function importFromJWK(jwk) {
  const extractable = true;
  const format = "jwk";
  const keyType = jwk["kty"];
  let algorithm;
  if (keyType == "EC") {
    algorithm = {
      name: "ECDSA",
      namedCurve: "P-256"
    };
  } else if (keyType == "RSA") {
    algorithm = {
      name: "RSA-PSS",
      hash: "SHA-256"
    };
  } else {
    throw new Error(`Invalid key type specified: ${jwk["kty"]}`);
  }
  let keyUsages = jwk["d"] ? ["sign"] : ["verify"];
  let key = await crypto.subtle.importKey(format, jwk, algorithm, extractable, keyUsages);
  return key;
}
var aCode = "a".charCodeAt(0);
var fCode = "f".charCodeAt(0);
var ACode = "A".charCodeAt(0);
var FCode = "F".charCodeAt(0);
var zeroCode = "0".charCodeAt(0);
var nineCode = "9".charCodeAt(0);
function bytesToBase64(bytes) {
  const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
  return btoa(binString);
}
function UTF8StringToBase64Url(string2) {
  var encoded = bytesToBase64(new TextEncoder().encode(string2));
  encoded = encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  return encoded;
}

export {
  decodeUnsafeJWT,
  renderAnyCredentialCard,
  getOrCreateDidKey,
  signJWT
};
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)

pvtsutils/build/index.js:
  (*!
   * MIT License
   * 
   * Copyright (c) 2017-2024 Peculiar Ventures, LLC
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
   *)

pvutils/build/utils.es.js:
  (*!
   Copyright (c) Peculiar Ventures, LLC
  *)

asn1js/build/index.es.js:
  (*!
   * Copyright (c) 2014, GMO GlobalSign
   * Copyright (c) 2015-2022, Peculiar Ventures
   * All rights reserved.
   * 
   * Author 2014-2019, Yury Strozhevsky
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   * * Redistributions of source code must retain the above copyright notice, this
   *   list of conditions and the following disclaimer.
   * 
   * * Redistributions in binary form must reproduce the above copyright notice, this
   *   list of conditions and the following disclaimer in the documentation and/or
   *   other materials provided with the distribution.
   * 
   * * Neither the name of the copyright holder nor the names of its
   *   contributors may be used to endorse or promote products derived from
   *   this software without specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
   * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
   * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
   *)

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@peculiar/x509/build/x509.es.js:
  (*!
   * MIT License
   * 
   * Copyright (c) Peculiar Ventures. All rights reserved.
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
   *)
*/
//# sourceMappingURL=chunk-SQXV5JUG.js.map
