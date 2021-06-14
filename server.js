/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./database sync recursive ^\\.\\/.*\\.js$":
/*!*************************************!*\
  !*** ./database/ sync ^\.\/.*\.js$ ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./GetDBManager.js\": \"./database/GetDBManager.js\",\n\t\"./cassandra/cassandra.js\": \"./database/cassandra/cassandra.js\",\n\t\"./cassandra/index.js\": \"./database/cassandra/index.js\",\n\t\"./cassandra/retry.js\": \"./database/cassandra/retry.js\",\n\t\"./classes/Course.js\": \"./database/classes/Course.js\",\n\t\"./classes/DBManager.js\": \"./database/classes/DBManager.js\",\n\t\"./json/json.js\": \"./database/json/json.js\",\n\t\"./mongo/index.js\": \"./database/mongo/index.js\",\n\t\"./mongo/models/courseModel.js\": \"./database/mongo/models/courseModel.js\",\n\t\"./mongo/mongo.js\": \"./database/mongo/mongo.js\",\n\t\"./mysql/mysql.js\": \"./database/mysql/mysql.js\",\n\t\"./postgres/index.js\": \"./database/postgres/index.js\",\n\t\"./postgres/postgres.js\": \"./database/postgres/postgres.js\",\n\t\"./seed.js\": \"./database/seed.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./database sync recursive ^\\\\.\\\\/.*\\\\.js$\";\n\n//# sourceURL=webpack://about/./database/_sync_^\\.\\/.*\\.js$?");

/***/ }),

/***/ "./Logger.js":
/*!*******************!*\
  !*** ./Logger.js ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! core-js/modules/es.array.concat.js */ \"core-js/modules/es.array.concat.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.join.js */ \"core-js/modules/es.array.join.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.fill.js */ \"core-js/modules/es.array.fill.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ \"core-js/modules/es.regexp.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ \"core-js/modules/es.number.to-fixed.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar _require = __webpack_require__(/*! perf_hooks */ \"perf_hooks\"),\n    performance = _require.performance;\n\nvar Logger = /*#__PURE__*/function () {\n  \"use strict\";\n\n  function Logger() {\n    var pathToWrite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './';\n    var fileName = arguments.length > 1 ? arguments[1] : undefined;\n    var delFile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'false';\n\n    _classCallCheck(this, Logger);\n\n    if (pathToWrite.charAt(pathToWrite.length - 1) !== '/') {\n      pathToWrite += '/';\n    }\n\n    var constructionDate = new Date(); //File Setup\n\n    this.file = fileName ? fileName : \"\".concat(constructionDate.getFullYear(), \"-\").concat(constructionDate.getMonth(), \"-\").concat(constructionDate.getDate(), \"-\").concat(constructionDate.getHours(), \"-\").concat(constructionDate.getMinutes(), \"-\").concat(constructionDate.getSeconds(), \".log\");\n    this.path = pathToWrite;\n    this.fp = this.path + this.file;\n\n    if (delFile) {\n      try {\n        fs.unlinkSync(this.fp);\n      } catch (error) {\n        'ignore errors';\n      }\n    } //data\n\n\n    this.times = {};\n    this.write = true;\n  }\n\n  _createClass(Logger, [{\n    key: \"toggleWrite\",\n    value: function toggleWrite() {\n      this.write = !this.write;\n      console.log(this.write);\n    }\n  }, {\n    key: \"doWrite\",\n    value: function doWrite(str) {\n      if (this.write) {\n        try {\n          fs.appendFileSync(this.fp, str);\n        } catch (err) {\n          Logger.endLoadingBar();\n          Logger._lockout = true;\n          console.error(err);\n          this.toggleWrite();\n        }\n      }\n    }\n  }, {\n    key: \"log\",\n    value: function log() {\n      var _console;\n\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      (_console = console).log.apply(_console, args);\n\n      var str = args.join(' ') + '\\n';\n      this.doWrite(str);\n    }\n  }, {\n    key: \"warn\",\n    value: function warn() {\n      var _console2;\n\n      Logger.endLoadingBar();\n\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      (_console2 = console).warn.apply(_console2, args);\n\n      var str = '[WARNING] - ' + args.join(' ') + '\\n';\n      this.doWrite(str);\n    }\n  }, {\n    key: \"time\",\n    value: function time(key) {\n      this.times[key] = performance.now();\n    }\n  }, {\n    key: \"timeEnd\",\n    value: function timeEnd(key) {\n      var t = performance.now() - this.times[key];\n      delete this.times[key];\n      this.log(key + ': ' + Logger.msTimeToStr(t));\n      return t;\n    }\n  }]);\n\n  return Logger;\n}();\n\nLogger.printloadingBar = function (percent) {\n  var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  if (percent >= 1) {\n    return;\n  }\n\n  var defaultOptions = {\n    width: 25,\n    precision: 0,\n    fillChar: '▮',\n    curChar: '◧',\n    emptyChar: '▯',\n    leftBorder: '[',\n    rightBorder: ']'\n  };\n\n  for (var k in defaultOptions) {\n    o[k] === undefined ? o[k] = defaultOptions[k] : null;\n  }\n\n  width = o.width;\n\n  if (!Logger._lockout) {\n    Logger._lbWidth = width;\n\n    if (percent === undefined) {\n      throw 'percent must be defined';\n    }\n\n    var filled = new Array(Math.floor(width * percent)).fill(o.fillChar);\n    var whole = filled.concat([o.curChar], new Array(width - 1 - (filled.length - 1)).fill(o.emptyChar));\n    var strPercent = percent.toString().charAt(2) === '0' ? ' 0' + (percent * 100).toFixed(o.precision) + '%' : ' ' + (percent * 100).toFixed(o.precision) + '%';\n\n    for (var i = 0; i < strPercent.length; i++) {\n      whole[Math.floor(width / 2) - Math.floor(strPercent.length / 2) + i] = strPercent.charAt(i);\n    }\n\n    process.stdout.write('\\r' + o.leftBorder + whole.join('') + o.rightBorder + '    ');\n    return;\n  }\n};\n\nLogger.endLoadingBar = function () {\n  if (Logger._lbWidth) {\n    process.stdout.write('\\r' + new Array(Logger._lbWidth + 10).fill('  ').join('') + '\\r');\n    Logger._lbWidth = 0;\n  }\n\n  return;\n};\n\nLogger.msTimeToStr = function () {\n  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n  var p = 4;\n  var suffix = 'ms';\n\n  if (time > 1000) {\n    time /= 1000;\n    suffix = 's';\n  } else {\n    return time.toFixed(p) * 1 + suffix;\n  }\n\n  if (time > 60) {\n    time /= 60;\n    suffix = ' Minutes.';\n  } else {\n    return time.toFixed(p) * 1 + suffix;\n  }\n\n  if (time > 60) {\n    time /= 60;\n    suffix = ' Hours.';\n  } else {\n    return time.toFixed(p) * 1 + suffix;\n  }\n\n  if (time > 96) {\n    time /= 24;\n    suffix = ' Days.';\n  } else {\n    return time.toFixed(p) * 1 + suffix;\n  }\n\n  if (time > 30) {\n    time /= 30;\n    suffix = ' Months.';\n  } else {\n    return time.toFixed(p) * 1 + suffix;\n  }\n\n  if (time > 12) {\n    time /= 12;\n    suffix = ' Years.';\n  }\n\n  return time.toFixed(p) * 1 + suffix;\n};\n\nLogger._lbWidth = 0;\nLogger._lockout = false;\nmodule.exports = Logger;\n\n//# sourceURL=webpack://about/./Logger.js?");

/***/ }),

/***/ "./database/GetDBManager.js":
/*!**********************************!*\
  !*** ./database/GetDBManager.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! core-js/modules/es.string.split.js */ \"core-js/modules/es.string.split.js\");\n\n__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"core-js/modules/es.regexp.exec.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.concat.js */ \"core-js/modules/es.array.concat.js\");\n\nfunction GetDBManager(db) {\n  if (!db) {\n    try {\n      db = process.env.USE_DBS.split(',')[0];\n    } catch (e) {\n      throw 'No DB for DBManager selected or found in environment variable!';\n    }\n  }\n\n  try {\n    return __webpack_require__(\"./database sync recursive ^\\\\.\\\\/.*\\\\.js$\")(\"./\".concat(db, \"/\").concat(db, \".js\"));\n  } catch (e) {\n    console.log(db + 'not supported!');\n    throw e;\n  }\n}\n\n;\nmodule.exports = GetDBManager();\n\n//# sourceURL=webpack://about/./database/GetDBManager.js?");

/***/ }),

/***/ "./database/cassandra/cassandra.js":
/*!*****************************************!*\
  !*** ./database/cassandra/cassandra.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n__webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.map.js */ \"core-js/modules/es.array.map.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.keys.js */ \"core-js/modules/es.object.keys.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ \"core-js/modules/es.object.set-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ \"core-js/modules/es.object.get-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.construct.js */ \"core-js/modules/es.reflect.construct.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.get.js */ \"core-js/modules/es.reflect.get.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ \"core-js/modules/es.object.get-own-property-descriptor.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ \"core-js/modules/es.symbol.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.from.js */ \"core-js/modules/es.array.from.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.slice.js */ \"core-js/modules/es.array.slice.js\");\n\n__webpack_require__(/*! core-js/modules/es.function.name.js */ \"core-js/modules/es.function.name.js\");\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nvar DBManager = __webpack_require__(/*! ../classes/DBManager */ \"./database/classes/DBManager.js\");\n\nvar retryUntilSuccess = __webpack_require__(/*! ./retry */ \"./database/cassandra/retry.js\");\n\nmodule.exports = /*#__PURE__*/function (_DBManager) {\n  \"use strict\";\n\n  _inherits(CassandraManager, _DBManager);\n\n  var _super = _createSuper(CassandraManager);\n\n  function CassandraManager() {\n    var _this;\n\n    _classCallCheck(this, CassandraManager);\n\n    _this = _super.call(this, 'cassandra');\n\n    var temp = __webpack_require__(/*! . */ \"./database/cassandra/index.js\");\n\n    _this.client = temp.client;\n    _this.queries = temp.queries;\n    _this.keyspace = temp.keyspace;\n    temp = undefined;\n    _this.connection = _this.client.connect().catch(function (error) {\n      console.error('Could not connect to cassandra!\\n', error);\n      return null;\n    }).then(_this.client.execute(_this.queries.createTable));\n    return _this;\n  }\n\n  _createClass(CassandraManager, [{\n    key: \"insertCourse\",\n    value: function insertCourse(courseObj) {\n      var _this2 = this;\n\n      return this.connection.then(function () {\n        return retryUntilSuccess(50, _this2.client.execute.bind(_this2.client), ['BusyConnectionError'], _this2.queries.insert, courseObj, {\n          prepare: true\n        });\n      });\n    }\n  }, {\n    key: \"insertManyCourses\",\n    value: function insertManyCourses(courseObjArr) {\n      var _this3 = this;\n\n      var batches = [];\n      var curBatch = [];\n\n      for (var i = 0; i < courseObjArr.length; i++) {\n        curBatch.push({\n          query: this.queries.insert,\n          params: courseObjArr[i]\n        });\n\n        if (curBatch.length === 5 || i === courseObjArr.length - 1) {\n          batches.push(_toConsumableArray(curBatch));\n          curBatch = [];\n        }\n      }\n\n      return this.connection.then(function () {\n        return Promise.all(batches.map(function (batch) {\n          return retryUntilSuccess(300, _this3.client.batch.bind(_this3.client), ['BusyConnectionError'], batch, {\n            prepare: true\n          });\n        }));\n      });\n    }\n  }, {\n    key: \"getCourse\",\n    value: function getCourse(id) {\n      var _this4 = this;\n\n      return this.connection.then(function () {\n        return retryUntilSuccess(0, _this4.client.execute.bind(_this4.client), ['BusyConnectionError'], _this4.queries.getByID, [id + ''], {\n          prepare: true\n        });\n      }).then(function (results) {\n        return results.rows[0];\n      });\n    }\n  }, {\n    key: \"updateCourse\",\n    value: function updateCourse(id, updateObj) {\n      var _this5 = this;\n\n      return Promise.all(Object.keys(updateObj).map(function (key) {\n        return retryUntilSuccess(50, _this5.client.execute.bind(_this5.client), ['BusyConnectionError'], _this5.queries.update[key], [updateObj[key], id], {\n          prepare: true\n        });\n      })).then(function (results) {\n        return results[0].rows[0]['[applied]'];\n      });\n    }\n  }, {\n    key: \"deleteCourse\",\n    value: function deleteCourse(id) {\n      var _this6 = this;\n\n      return this.connection.then(function () {\n        return _this6.client.execute(_this6.queries.deleteByID, [id + ''], {\n          prepare: true\n        }).then(function (results) {\n          console.log(results);\n        });\n      });\n    }\n  }, {\n    key: \"deleteAllCourses\",\n    value: function deleteAllCourses() {\n      var _this7 = this;\n\n      _get(_getPrototypeOf(CassandraManager.prototype), \"deleteAllCourses\", this).call(this);\n\n      return this.connection.then(function () {\n        return _this7.client.execute(_this7.queries.dropTable).catch(function () {\n          console.log('CassandraDB: Error Dropping courses table...');\n          console.log('table may not have existed.');\n        });\n      }).then(function () {\n        return _this7.client.execute(_this7.queries.createTable);\n      });\n    }\n  }, {\n    key: \"closeConnection\",\n    value: function closeConnection() {\n      _get(_getPrototypeOf(CassandraManager.prototype), \"closeConnection\", this).call(this);\n\n      return this.client.shutdown();\n    }\n  }]);\n\n  return CassandraManager;\n}(DBManager);\n\n//# sourceURL=webpack://about/./database/cassandra/cassandra.js?");

/***/ }),

/***/ "./database/cassandra/index.js":
/*!*************************************!*\
  !*** ./database/cassandra/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! core-js/modules/es.string.replace.js */ \"core-js/modules/es.string.replace.js\");\n\n__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"core-js/modules/es.regexp.exec.js\");\n\nvar cassandra = __webpack_require__(/*! cassandra-driver */ \"cassandra-driver\");\n\nvar keyspace = process.env.ABOUT_DATABASE.replace(/-/g, '__');\nvar client = new cassandra.Client({\n  contactPoints: [process.env.CASSANDRA_CONTACTPOINT],\n  localDataCenter: 'datacenter1',\n  keyspace: keyspace\n});\nvar queries = {\n  createTable: \"CREATE TABLE IF NOT EXISTS courses (\\n    course_id bigint,\\n    recent_views int,\\n    description text,\\n    learner_career_outcomes map<text, float>,\\n    metadata map<text, text>,\\n    what_you_will_learn list<text>,\\n    skills_you_will_gain list<text>,\\n    PRIMARY KEY (course_id)\\n    )\",\n  dropTable: \"TRUNCATE Table courses\",\n  insert: \"INSERT INTO courses (\\n    course_id,\\n    recent_views,\\n    description,\\n    learner_career_outcomes,\\n    metadata,\\n    what_you_will_learn,\\n    skills_you_will_gain\\n    ) VALUES (?, ?, ?, ?, ?, ?, ?)\",\n  getByID: \"SELECT * FROM courses WHERE course_id = ?\",\n  update: {\n    recent_views: 'UPDATE courses SET recent_views = ? WHERE course_id = ? IF EXISTS',\n    description: 'UPDATE courses SET description = ? WHERE course_id = ? IF EXISTS',\n    learner_career_outcomes: 'UPDATE courses SET learner_career_outcomes = ? WHERE course_id = ? IF EXISTS',\n    metadata: 'UPDATE courses SET metadata = ? WHERE course_id = ? IF EXISTS',\n    what_you_will_learn: 'UPDATE courses SET what_you_will_learn = ? WHERE course_id = ? IF EXISTS',\n    skills_you_will_gain: 'UPDATE courses SET skills_you_will_gain = ? WHERE course_id = ? IF EXISTS'\n  },\n  deleteByID: 'DELETE FROM courses WHERE course_id = ?'\n};\nmodule.exports = {\n  keyspace: keyspace,\n  client: client,\n  queries: queries\n}; //createKeyspace: `CREATE KEYSPACE ${keyspace} WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1}`,\n\n//# sourceURL=webpack://about/./database/cassandra/index.js?");

/***/ }),

/***/ "./database/cassandra/retry.js":
/*!*************************************!*\
  !*** ./database/cassandra/retry.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! regenerator-runtime/runtime.js */ \"regenerator-runtime/runtime.js\");\n\n__webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.reduce.js */ \"core-js/modules/es.array.reduce.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.index-of.js */ \"core-js/modules/es.array.index-of.js\");\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar _require = __webpack_require__(/*! core-js */ \"core-js\"),\n    String = _require.String;\n\nvar retryUntilSuccess = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(delay, asyncFunction) {\n    var errsToIgnore,\n        _len,\n        args,\n        _key,\n        _args2 = arguments;\n\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            errsToIgnore = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : [];\n\n            for (_len = _args2.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {\n              args[_key - 3] = _args2[_key];\n            }\n\n            if (!(errsToIgnore.length === 0)) {\n              _context2.next = 4;\n              break;\n            }\n\n            throw 'Retry function REQUIRES ignore strings.';\n\n          case 4:\n            return _context2.abrupt(\"return\", new Promise( /*#__PURE__*/function () {\n              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {\n                var x, ignore;\n                return regeneratorRuntime.wrap(function _callee$(_context) {\n                  while (1) {\n                    switch (_context.prev = _context.next) {\n                      case 0:\n                        if (false) {}\n\n                        _context.prev = 1;\n                        _context.next = 4;\n                        return asyncFunction.apply(void 0, args);\n\n                      case 4:\n                        x = _context.sent;\n                        resolve(x);\n                        return _context.abrupt(\"return\", null);\n\n                      case 9:\n                        _context.prev = 9;\n                        _context.t0 = _context[\"catch\"](1);\n                        ignore = errsToIgnore.reduce(function (found, str) {\n                          return JSON.stringify(_context.t0).toLowerCase().indexOf(str.toLowerCase()) !== -1 || found;\n                        }, false);\n\n                        if (!ignore) {\n                          _context.next = 17;\n                          break;\n                        }\n\n                        _context.next = 15;\n                        return new Promise(function (resolve) {\n                          setTimeout(resolve, delay);\n                        });\n\n                      case 15:\n                        _context.next = 18;\n                        break;\n\n                      case 17:\n                        throw _context.t0;\n\n                      case 18:\n                        _context.next = 0;\n                        break;\n\n                      case 20:\n                      case \"end\":\n                        return _context.stop();\n                    }\n                  }\n                }, _callee, null, [[1, 9]]);\n              }));\n\n              return function (_x3) {\n                return _ref2.apply(this, arguments);\n              };\n            }()));\n\n          case 5:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n\n  return function retryUntilSuccess(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = retryUntilSuccess;\n\n//# sourceURL=webpack://about/./database/cassandra/retry.js?");

/***/ }),

/***/ "./database/classes/Course.js":
/*!************************************!*\
  !*** ./database/classes/Course.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n__webpack_require__(/*! core-js/modules/es.array.join.js */ \"core-js/modules/es.array.join.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n\nvar faker = __webpack_require__(/*! faker */ \"faker\");\n\nvar genLangs = function genLangs() {\n  var smallGen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  var languages = ['Arabic', 'French', 'Portuguese (European)', 'Chinese (Simplified)', 'Italian', 'Vietnamese', 'German', 'Russian', 'Hebrew', 'Spanish', 'Hindi', 'Japanese', 'Turkish', 'Gujarati', 'Polish', 'Persian', 'Kannada', 'Romanian'];\n  var usedLangs = [];\n\n  if (smallGen) {\n    usedLangs.push(languages[Math.floor(Math.random() * languages.length)]);\n  } else {\n    languages.forEach(function (lang) {\n      Math.random() < .05 ? usedLangs.push(lang) : null;\n    });\n  }\n\n  return usedLangs;\n};\n\nvar genRecentViews = function genRecentViews() {\n  return Math.floor(Math.random() * 100000000) + 60000;\n};\n\nvar genDescription = function genDescription() {\n  var smallGen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  return smallGen ? faker.lorem.paragraphs(1) : faker.lorem.paragraphs(4);\n};\n\nvar genOutcomes = function genOutcomes() {\n  var smallGen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  return {\n    direction: Math.floor(Math.random() * 100) / 100,\n    benefit: Math.floor(Math.random() * 100) / 100,\n    promo: Math.floor(Math.random() * 100) / 100\n  };\n};\n\nvar genMetadata = function genMetadata() {\n  var smallGen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  return {\n    hours: Math.floor(Math.random() * 180) + 20 + '',\n    subtitles: genLangs(smallGen).join(', ')\n  };\n};\n\nvar genLearning = function genLearning() {\n  var smallGen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  return smallGen ? [faker.lorem.sentences(1)] : [faker.lorem.sentences(2), faker.lorem.sentences(2), faker.lorem.sentences(2), faker.lorem.sentences(2)];\n};\n\nvar genSkills = function genSkills() {\n  var smallGen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  var skills = [];\n  var sCount;\n  smallGen ? sCount = 1 : sCount = Math.floor(Math.random() * 10);\n\n  for (var i = 0; i < sCount; i++) {\n    var skill = faker.lorem.words(Math.floor(Math.random() * 2) + 2);\n    skills.push(skill);\n  }\n\n  return skills;\n};\n\nvar Course = /*#__PURE__*/function () {\n  \"use strict\";\n\n  function Course() {\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _classCallCheck(this, Course);\n\n    options.course_id !== undefined ? this.course_id = options.course_id : this.course_id = 0;\n    options.recent_views !== undefined ? this.recent_views = options.recent_views : this.recent_views = genRecentViews(options.smallGen);\n    options.description !== undefined ? this.description = options.description : this.description = genDescription(options.smallGen);\n    options.learner_career_outcomes !== undefined ? this.learner_career_outcomes = options.learner_career_outcomes : this.learner_career_outcomes = genOutcomes(options.smallGen);\n    options.metadata !== undefined ? this.metadata = options.metadata : this.metadata = genMetadata(options.smallGen);\n    options.what_you_will_learn !== undefined ? this.what_you_will_learn = options.what_you_will_learn : this.what_you_will_learn = genLearning(options.smallGen);\n    options.skills_you_will_gain !== undefined ? this.skills_you_will_gain = options.skills_you_will_gain : this.skills_you_will_gain = genSkills(options.smallGen);\n  }\n\n  return Course;\n}();\n\nmodule.exports = Course;\n\n//# sourceURL=webpack://about/./database/classes/Course.js?");

/***/ }),

/***/ "./database/classes/DBManager.js":
/*!***************************************!*\
  !*** ./database/classes/DBManager.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nmodule.exports = /*#__PURE__*/function () {\n  \"use strict\";\n\n  function DBManager(db) {\n    _classCallCheck(this, DBManager);\n\n    this.database = db;\n    this.connection;\n    console.log(\"Created \".concat(db, \" Manager\"));\n  }\n\n  _createClass(DBManager, [{\n    key: \"handleFailedConnection\",\n    value: function handleFailedConnection(error) {}\n  }, {\n    key: \"deleteAllCourses\",\n    value: function deleteAllCourses() {\n      console.log(\"Deleting all courses in \".concat(this.database, \" database!\"));\n    }\n  }, {\n    key: \"closeConnection\",\n    value: function closeConnection() {\n      var _this = this;\n\n      this.connection = new Promise(function (resolve, reject) {\n        reject(\"\".concat(_this.database, \" Connection Closed\"));\n      }).catch(function (e) {\n        console.log(e);\n      });\n    }\n  }]);\n\n  return DBManager;\n}();\n\n//# sourceURL=webpack://about/./database/classes/DBManager.js?");

/***/ }),

/***/ "./database/json/json.js":
/*!*******************************!*\
  !*** ./database/json/json.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n__webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.slice.js */ \"core-js/modules/es.array.slice.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ \"core-js/modules/es.object.set-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ \"core-js/modules/es.object.get-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.construct.js */ \"core-js/modules/es.reflect.construct.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.get.js */ \"core-js/modules/es.reflect.get.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ \"core-js/modules/es.object.get-own-property-descriptor.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ \"core-js/modules/es.symbol.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nvar DBManager = __webpack_require__(/*! ../classes/DBManager */ \"./database/classes/DBManager.js\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nmodule.exports = /*#__PURE__*/function (_DBManager) {\n  \"use strict\";\n\n  _inherits(JSONManager, _DBManager);\n\n  var _super = _createSuper(JSONManager);\n\n  function JSONManager() {\n    var _this;\n\n    _classCallCheck(this, JSONManager);\n\n    _this = _super.call(this, 'json');\n    _this.filepath = './database/json/db/' + process.env.ABOUT_DATABASE + '.db.json';\n    _this.connection = new Promise(function (resolve) {\n      _this.write = function (string) {\n        return new Promise(function (resolve, reject) {\n          fs.appendFile(path.resolve(_this.filepath), string, function (err) {\n            err ? reject(err) : resolve('wroteString');\n          });\n        });\n      };\n\n      resolve('json');\n    });\n    return _this;\n  }\n\n  _createClass(JSONManager, [{\n    key: \"insertCourse\",\n    value: function insertCourse(courseObj) {\n      var _this2 = this;\n\n      return this.connection.then(function () {\n        return new Promise(function (resolve, reject) {\n          fs.access(_this2.filepath, function (err) {\n            err ? reject(err) : resolve(_this2.filepath);\n          });\n        }).then(function () {\n          return ',' + JSON.stringify(courseObj);\n        }).catch(function () {\n          return '[' + JSON.stringify(courseObj);\n        }).then(function (data) {\n          return _this2.write(data);\n        });\n      });\n    }\n  }, {\n    key: \"insertManyCourses\",\n    value: function insertManyCourses(courseObjArr) {\n      var _this3 = this;\n\n      return this.connection.then(function () {\n        return new Promise(function (resolve, reject) {\n          fs.access(_this3.filepath, function (err) {\n            err ? reject(err) : resolve(_this3.filepath);\n          });\n        }).then(function () {\n          return ',' + JSON.stringify(courseObjArr).slice(1, -1);\n        }).catch(function () {\n          return JSON.stringify(courseObjArr).slice(0, -1);\n        }).then(function (data) {\n          return _this3.write(data);\n        });\n      });\n    }\n  }, {\n    key: \"getCourse\",\n    value: function getCourse(id) {\n      return new Promise(function (resolve, reject) {\n        var err = 'Cannot get records from json.';\n        console.err(err);\n        reject(err);\n      });\n    }\n  }, {\n    key: \"updateCourse\",\n    value: function updateCourse(id, updateObj) {\n      return new Promise(function (resolve, reject) {\n        var err = 'Cannot update records in json.';\n        console.err(err);\n        reject(err);\n      });\n    }\n  }, {\n    key: \"deleteCourse\",\n    value: function deleteCourse(id) {\n      return new Promise(function (resolve, reject) {\n        var err = \"Cannot delete individual records from json.\\n                Delete all Records instead.\";\n        console.warn(err);\n        reject(err);\n      });\n    }\n  }, {\n    key: \"deleteAllCourses\",\n    value: function deleteAllCourses() {\n      var _this4 = this;\n\n      _get(_getPrototypeOf(JSONManager.prototype), \"deleteAllCourses\", this).call(this);\n\n      return new Promise(function (resolve, reject) {\n        fs.unlink(_this4.filepath, function (err) {\n          err ? reject(err) : resolve('All json records deleted.');\n          return;\n        });\n      }).catch(function (err) {\n        console.warn(\"JSON: Error deleting all records. File likely didn't exist to begin with.\");\n      });\n    }\n  }, {\n    key: \"closeConnection\",\n    value: function closeConnection() {\n      _get(_getPrototypeOf(JSONManager.prototype), \"closeConnection\", this).call(this);\n\n      return this.write(']').then(function () {\n        console.log('json write complete');\n      });\n    }\n  }]);\n\n  return JSONManager;\n}(DBManager);\n\n//# sourceURL=webpack://about/./database/json/json.js?");

/***/ }),

/***/ "./database/mongo/index.js":
/*!*********************************!*\
  !*** ./database/mongo/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar mongoURI = process.env.ABOUT_MONGODB_URI + '/' + process.env.ABOUT_DATABASE;\nvar db = mongoose.connect(mongoURI, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n});\nmodule.exports = db;\n\n//# sourceURL=webpack://about/./database/mongo/index.js?");

/***/ }),

/***/ "./database/mongo/models/courseModel.js":
/*!**********************************************!*\
  !*** ./database/mongo/models/courseModel.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! core-js/modules/es.number.constructor.js */ \"core-js/modules/es.number.constructor.js\");\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar courseSchema = new mongoose.Schema({\n  course_id: {\n    type: Number,\n    index: true\n  },\n  recent_views: Number,\n  description: String,\n  learner_career_outcomes: {\n    direction: Number,\n    benefit: Number,\n    promo: Number\n  },\n  metadata: {\n    hours: String,\n    subtitles: String\n  },\n  what_you_will_learn: [{\n    type: String\n  }],\n  skills_you_will_gain: [{\n    type: String\n  }]\n});\nvar CourseModel = mongoose.model('Courses', courseSchema);\nmodule.exports = CourseModel;\n\n//# sourceURL=webpack://about/./database/mongo/models/courseModel.js?");

/***/ }),

/***/ "./database/mongo/mongo.js":
/*!*********************************!*\
  !*** ./database/mongo/mongo.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n__webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ \"core-js/modules/es.object.set-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ \"core-js/modules/es.object.get-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.construct.js */ \"core-js/modules/es.reflect.construct.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.get.js */ \"core-js/modules/es.reflect.get.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ \"core-js/modules/es.object.get-own-property-descriptor.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ \"core-js/modules/es.symbol.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n\nvar DBManager = __webpack_require__(/*! ../classes/DBManager */ \"./database/classes/DBManager.js\");\n\nvar emptypromise = new Promise(function (resolve) {\n  return resolve();\n});\n\nmodule.exports = /*#__PURE__*/function (_DBManager) {\n  \"use strict\";\n\n  _inherits(MongoManager, _DBManager);\n\n  var _super = _createSuper(MongoManager);\n\n  function MongoManager() {\n    var _this;\n\n    _classCallCheck(this, MongoManager);\n\n    _this = _super.call(this, 'mongo');\n    _this.connection = __webpack_require__(/*! . */ \"./database/mongo/index.js\");\n    _this.CourseModel = __webpack_require__(/*! ./models/courseModel.js */ \"./database/mongo/models/courseModel.js\");\n    return _this;\n  }\n\n  _createClass(MongoManager, [{\n    key: \"insertCourse\",\n    value: function insertCourse(courseObj) {\n      var _this2 = this;\n\n      return this.connection.then(function () {\n        return _this2.CourseModel.create(courseObj);\n      }).catch(function (err) {\n        console.log('Error inserting course:', err);\n      });\n    }\n  }, {\n    key: \"insertManyCourses\",\n    value: function insertManyCourses(courseObjArr) {\n      var _this3 = this;\n\n      return this.connection.then(function () {\n        return _this3.CourseModel.insertMany(courseObjArr);\n      }).catch(function (err) {\n        console.log('Error inserting course:', err);\n      });\n    }\n  }, {\n    key: \"getCourse\",\n    value: function getCourse(id) {\n      return this.CourseModel.findOne({\n        course_id: id\n      }).catch(function (err) {\n        console.err('MongoDB: Error getting course' + id + '.');\n        console.err(err);\n      });\n    }\n  }, {\n    key: \"updateCourse\",\n    value: function updateCourse(id, updateObj) {\n      //not implemented\n      return emptypromise;\n    }\n  }, {\n    key: \"deleteCourse\",\n    value: function deleteCourse(id) {\n      //not implemented\n      return emptypromise;\n    }\n  }, {\n    key: \"deleteAllCourses\",\n    value: function deleteAllCourses() {\n      var _this4 = this;\n\n      _get(_getPrototypeOf(MongoManager.prototype), \"deleteAllCourses\", this).call(this);\n\n      return this.connection.then(function () {\n        return _this4.CourseModel.deleteMany({});\n      }).catch(function (err) {\n        console.log('MongoDB: Error deleting all courses:', err);\n      });\n    }\n  }, {\n    key: \"closeConnection\",\n    value: function closeConnection() {\n      _get(_getPrototypeOf(MongoManager.prototype), \"closeConnection\", this).call(this); //not implemented\n\n\n      return emptypromise;\n    }\n  }]);\n\n  return MongoManager;\n}(DBManager);\n\n//# sourceURL=webpack://about/./database/mongo/mongo.js?");

/***/ }),

/***/ "./database/mysql/mysql.js":
/*!*********************************!*\
  !*** ./database/mysql/mysql.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n__webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ \"core-js/modules/es.object.set-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ \"core-js/modules/es.object.get-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.construct.js */ \"core-js/modules/es.reflect.construct.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.get.js */ \"core-js/modules/es.reflect.get.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ \"core-js/modules/es.object.get-own-property-descriptor.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ \"core-js/modules/es.symbol.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n\nvar DBManager = __webpack_require__(/*! ../classes/DBManager */ \"./database/classes/DBManager.js\");\n\nvar emptypromise = new Promise(function (resolve) {\n  return resolve();\n});\n\nmodule.exports = /*#__PURE__*/function (_DBManager) {\n  \"use strict\";\n\n  _inherits(MySQLManager, _DBManager);\n\n  var _super = _createSuper(MySQLManager);\n\n  function MySQLManager() {\n    _classCallCheck(this, MySQLManager);\n\n    return _super.call(this, 'mysql');\n  }\n\n  _createClass(MySQLManager, [{\n    key: \"insertCourse\",\n    value: function insertCourse(courseObj) {\n      //not implemented\n      return emptypromise;\n    }\n  }, {\n    key: \"insertManyCourses\",\n    value: function insertManyCourses(courseObjArr) {\n      //not implemented\n      return emptypromise;\n    }\n  }, {\n    key: \"getCourse\",\n    value: function getCourse(id) {\n      //not implemented\n      return emptypromise;\n    }\n  }, {\n    key: \"updateCourse\",\n    value: function updateCourse(id, updateObj) {\n      //not implemented\n      return emptypromise;\n    }\n  }, {\n    key: \"deleteCourse\",\n    value: function deleteCourse(id) {\n      //not implemented\n      return emptypromise;\n    }\n  }, {\n    key: \"deleteAllCourses\",\n    value: function deleteAllCourses() {\n      _get(_getPrototypeOf(MySQLManager.prototype), \"deleteAllCourses\", this).call(this); //not implemented\n\n\n      return emptypromise;\n    }\n  }, {\n    key: \"closeConnection\",\n    value: function closeConnection() {\n      _get(_getPrototypeOf(MySQLManager.prototype), \"closeConnection\", this).call(this); //not implemented\n\n\n      return emptypromise;\n    }\n  }]);\n\n  return MySQLManager;\n}(DBManager);\n\n//# sourceURL=webpack://about/./database/mysql/mysql.js?");

/***/ }),

/***/ "./database/postgres/index.js":
/*!************************************!*\
  !*** ./database/postgres/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n\nvar _require = __webpack_require__(/*! pg */ \"pg\"),\n    Pool = _require.Pool;\n\nvar pool = new Pool({\n  user: process.env.PG_USER,\n  host: process.env.PG_HOST,\n  database: process.env.ABOUT_DATABASE,\n  password: process.env.PG_PASSWORD,\n  port: process.env.PG_PORT\n});\npool.on('error', function (err, client) {\n  console.error('Unexpected error on idle client', client, err);\n});\nvar queries = {\n  insert: {\n    name: 'insertCourse',\n    text: \"INSERT INTO courses(\\n      course_id,\\n      recent_views,\\n      description,\\n      learner_career_outcomes,\\n      metadata,\\n      what_you_will_learn,\\n      skills_you_will_gain)\\n      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *\",\n    converter: function converter(c) {\n      return [c.course_id, c.recent_views, c.description, JSON.stringify(c.learner_career_outcomes), JSON.stringify(c.metadata), JSON.stringify(c.what_you_will_learn), JSON.stringify(c.skills_you_will_gain)];\n    }\n  },\n  getByID: {\n    name: 'getCourseByID',\n    text: 'SELECT * FROM courses WHERE course_id = $1',\n    converter: function converter(results) {\n      console.log(results);\n      console.log(JSON.parse(results));\n    }\n  },\n  update: {\n    recent_views: 'UPDATE courses SET recent_views = $1 WHERE course_id = $2',\n    description: 'UPDATE courses SET description = $1 WHERE course_id = $2',\n    learner_career_outcomes: 'UPDATE courses SET learner_career_outcomes = $1 WHERE course_id = $2',\n    metadata: 'UPDATE courses SET metadata = $1 WHERE course_id = $2',\n    what_you_will_learn: 'UPDATE courses SET what_you_will_learn = $1 WHERE course_id = $2',\n    skills_you_will_gain: 'UPDATE courses SET skills_you_will_gain = $1 WHERE course_id = $2'\n  },\n  delete: {\n    name: 'deleteByID',\n    text: 'DELETE FROM courses WHERE course_id = $1'\n  },\n  deleteAll: {\n    name: 'deleteAll',\n    text: 'TRUNCATE courses'\n  }\n};\nmodule.exports = {\n  pool: pool,\n  queries: queries\n};\n\n//# sourceURL=webpack://about/./database/postgres/index.js?");

/***/ }),

/***/ "./database/postgres/postgres.js":
/*!***************************************!*\
  !*** ./database/postgres/postgres.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n__webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es.function.name.js */ \"core-js/modules/es.function.name.js\");\n\n__webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.map.js */ \"core-js/modules/es.array.map.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.keys.js */ \"core-js/modules/es.object.keys.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ \"core-js/modules/es.object.set-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ \"core-js/modules/es.object.get-prototype-of.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.construct.js */ \"core-js/modules/es.reflect.construct.js\");\n\n__webpack_require__(/*! core-js/modules/es.reflect.get.js */ \"core-js/modules/es.reflect.get.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ \"core-js/modules/es.object.get-own-property-descriptor.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ \"core-js/modules/es.symbol.iterator.js\");\n\nvar _require = __webpack_require__(/*! ../cassandra */ \"./database/cassandra/index.js\"),\n    client = _require.client;\n\nvar DBManager = __webpack_require__(/*! ../classes/DBManager */ \"./database/classes/DBManager.js\");\n\nvar emptypromise = new Promise(function (resolve) {\n  return resolve();\n});\n\nmodule.exports = /*#__PURE__*/function (_DBManager) {\n  \"use strict\";\n\n  _inherits(PostgresManager, _DBManager);\n\n  var _super = _createSuper(PostgresManager);\n\n  function PostgresManager() {\n    var _this;\n\n    _classCallCheck(this, PostgresManager);\n\n    _this = _super.call(this, 'postgres');\n\n    var temp = __webpack_require__(/*! . */ \"./database/postgres/index.js\");\n\n    _this.pool = temp.pool;\n    _this.queries = temp.queries;\n    temp = undefined;\n    _this.connection = _this.pool.connect();\n    return _this;\n  }\n\n  _createClass(PostgresManager, [{\n    key: \"insertCourse\",\n    value: function insertCourse(courseObj) {\n      var _this2 = this;\n\n      return this.connection.then(function () {\n        return _this2.pool.query({\n          name: _this2.queries.insert.name,\n          text: _this2.queries.insert.text,\n          values: _this2.queries.insert.converter(courseObj)\n        });\n      });\n    }\n  }, {\n    key: \"insertManyCourses\",\n    value: function insertManyCourses(courseObjArr) {\n      var _this3 = this;\n\n      return Promise.all(courseObjArr.map(function (courseObj) {\n        return _this3.insertCourse(courseObj);\n      }));\n    }\n  }, {\n    key: \"getCourse\",\n    value: function getCourse(id) {\n      return this.pool.query({\n        name: this.queries.getByID.name,\n        text: this.queries.getByID.text,\n        values: [id]\n      }).then(function (results) {\n        var obj = results.rows[0];\n        obj.learner_career_outcomes = JSON.parse(obj.learner_career_outcomes);\n        obj.metadata = JSON.parse(obj.metadata);\n        obj.what_you_will_learn = JSON.parse(obj.what_you_will_learn);\n        obj.skills_you_will_gain = JSON.parse(obj.skills_you_will_gain);\n        return obj;\n      });\n    }\n  }, {\n    key: \"updateCourse\",\n    value: function updateCourse(id, updateObj) {\n      var _this4 = this;\n\n      return Promise.all(Object.keys(updateObj).map(function (key) {\n        return _this4.pool.query({\n          name: 'update' + key,\n          text: _this4.queries.update[key],\n          values: [updateObj, id]\n        });\n      }));\n    }\n  }, {\n    key: \"deleteCourse\",\n    value: function deleteCourse(id) {\n      return this.pool.query({\n        name: this.queries.delete.name,\n        text: this.queries.delete.text,\n        values: [id]\n      });\n    }\n  }, {\n    key: \"deleteAllCourses\",\n    value: function deleteAllCourses() {\n      _get(_getPrototypeOf(PostgresManager.prototype), \"deleteAllCourses\", this).call(this);\n\n      return this.pool.query({\n        name: this.queries.deleteAll.name,\n        text: this.queries.deleteAll.text\n      });\n    }\n  }, {\n    key: \"closeConnection\",\n    value: function closeConnection() {\n      var _this5 = this;\n\n      _get(_getPrototypeOf(PostgresManager.prototype), \"closeConnection\", this).call(this);\n\n      return this.pool.query('SELECT NOW()', function (err, res) {\n        console.log(err, res);\n\n        _this5.pool.end();\n      });\n    }\n  }]);\n\n  return PostgresManager;\n}(DBManager);\n\n//# sourceURL=webpack://about/./database/postgres/postgres.js?");

/***/ }),

/***/ "./database/seed.js":
/*!**************************!*\
  !*** ./database/seed.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! regenerator-runtime/runtime.js */ \"regenerator-runtime/runtime.js\");\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n__webpack_require__(/*! core-js/modules/es.array.map.js */ \"core-js/modules/es.array.map.js\");\n\n__webpack_require__(/*! core-js/modules/es.string.split.js */ \"core-js/modules/es.string.split.js\");\n\n__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"core-js/modules/es.regexp.exec.js\");\n\n__webpack_require__(/*! core-js/modules/es.promise.js */ \"core-js/modules/es.promise.js\");\n\n__webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es.parse-int.js */ \"core-js/modules/es.parse-int.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.join.js */ \"core-js/modules/es.array.join.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.concat.js */ \"core-js/modules/es.array.concat.js\");\n\n__webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ \"core-js/modules/es.number.to-fixed.js\");\n\n__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"core-js/modules/web.dom-collections.for-each.js\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\n__webpack_require__(/*! ../environments/envLoader.js */ \"../../environments/envLoader.js\");\n\nvar Course = __webpack_require__(/*! ./classes/Course.js */ \"./database/classes/Course.js\");\n\nvar DBManager = __webpack_require__(/*! ./GetDBManager.js */ \"./database/GetDBManager.js\");\n\nvar Logger = __webpack_require__(/*! ../Logger */ \"./Logger.js\");\n\nvar logger = new Logger('./logs/seeding/', 'latest.log', true);\nvar lbOptions = {\n  width: 60,\n  fillChar: '⋗',\n  curChar: '⨠',\n  emptyChar: '∞',\n  precision: 1\n};\nvar dbs =  true ? process.env.USE_DBS.split(',').map(function (dbString) {\n  return DBManager(dbString);\n}) : 0;\n\nif (!dbs.length) {\n  throw 'No databases to seed. Cancelling seed.';\n}\n\ndbs.length > 1 ? logger.warn('Warning: DB Measurement times may not be completely accurate for more than one database.') : null;\nPromise.all(dbs.map(function (db) {\n  return db.deleteAllCourses();\n})).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n  var start, cChunk, chunks, courses, prom, _loop, i, minutes, estTime, totTime;\n\n  return regeneratorRuntime.wrap(function _callee$(_context2) {\n    while (1) {\n      switch (_context2.prev = _context2.next) {\n        case 0:\n          start = Date.now();\n          cChunk = 0;\n          chunks = Math.ceil(parseInt(process.env.SEEDCOUNT) / parseInt(process.env.CHUNKSIZE));\n          logger.time('Seed Timer');\n          logger.time('Longest Seed Chunk took');\n          courses = [];\n          prom = new Promise(function (res) {\n            res();\n          });\n          logger.log('Seeding databases: ' + dbs.map(function (db) {\n            return db.database;\n          }).join(', ') + '...');\n          _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {\n            var percent;\n            return regeneratorRuntime.wrap(function _loop$(_context) {\n              while (1) {\n                switch (_context.prev = _context.next) {\n                  case 0:\n                    percent = i / parseInt(process.env.SEEDCOUNT);\n                    i <= process.env.CHUNKSIZE ? courses.push(new Course({\n                      course_id: i,\n                      smallGen: false\n                    })) : courses.push(new Course({\n                      course_id: i,\n                      smallGen: true\n                    }));\n\n                    if (!(i % Math.floor(parseInt(process.env.CHUNKSIZE) / 5))) {\n                      Logger.printloadingBar(percent, lbOptions);\n                    }\n\n                    if (!(!(i % parseInt(process.env.CHUNKSIZE)) || i === parseInt(process.env.SEEDCOUNT))) {\n                      _context.next = 12;\n                      break;\n                    }\n\n                    _context.next = 6;\n                    return prom;\n\n                  case 6:\n                    if (cChunk !== 0) {\n                      Logger.endLoadingBar();\n                      logger.log(\"Complete insert for chunk \".concat(cChunk, \" of \").concat(chunks, \". (\").concat((cChunk / chunks * 100).toFixed(2) * 1, \"%)\"));\n                      Logger.printloadingBar(percent, lbOptions);\n\n                      if (!(cChunk % 5)) {\n                        minutes = (Date.now() - start) / 1000 / 60;\n                        estTime = minutes / cChunk * (chunks - cChunk);\n                        totTime = minutes / cChunk * chunks;\n                        Logger.endLoadingBar();\n                        logger.log('');\n                        minutes < 60 ? logger.log(\"\".concat(cChunk, \" Chunk time:          \").concat(minutes.toFixed(3) * 1, \" minutes.\")) : logger.log(\"\".concat(cChunk, \" Chunk time:          \").concat((minutes / 60).toFixed(3) * 1, \" hours.\"));\n                        estTime < 60 ? logger.log(\"Estimated remaining seed time: \".concat(estTime.toFixed(3) * 1, \" minutes.\")) : logger.log(\"Estimated remaining seed time: \".concat((estTime / 60).toFixed(3) * 1, \" hours.\"));\n                        totTime < 90 ? logger.log(\"Estimated TOTAL seed time:     \".concat(totTime.toFixed(3) * 1, \" minutes.\")) : logger.log(\"Estimated TOTAL seed time:     \".concat((totTime / 60).toFixed(3) * 1, \" hours.\"));\n                        Logger.printloadingBar(percent, lbOptions);\n                      }\n\n                      Logger.endLoadingBar();\n                      logger.log('');\n                      logger.timeEnd('Longest Seed Chunk took');\n                      logger.time('Longest Seed Chunk took');\n                      logger.log('------------------------------------------\\n');\n                      Logger.printloadingBar(percent, lbOptions);\n                    }\n\n                    cChunk++;\n                    dbs.forEach(function (db) {\n                      logger.time(db.database + ' Seed Chunk took');\n                    });\n                    process.env.CHUNKSIZE !== '1' ? prom = Promise.all(dbs.map(function (db) {\n                      return db.insertManyCourses(courses).then(function () {\n                        Logger.endLoadingBar();\n                        logger.log('');\n                        logger.log(db.database + ' completed insert.');\n                        logger.timeEnd(db.database + ' Seed Chunk took');\n                        Logger.printloadingBar(percent, lbOptions);\n                      });\n                    })) : prom = Promise.all(dbs.map(function (db) {\n                      return db.insertCourse(courses[0]).then(function () {\n                        Logger.endLoadingBar();\n                        logger.log('');\n                        logger.log(db.database + ' completed insert.');\n                        logger.timeEnd(db.database + ' Seed Chunk took');\n                        Logger.printloadingBar(percent, lbOptions);\n                      });\n                    }));\n                    courses = undefined;\n                    courses = [];\n\n                  case 12:\n                  case \"end\":\n                    return _context.stop();\n                }\n              }\n            }, _loop);\n          });\n          i = 1;\n\n        case 10:\n          if (!(i <= parseInt(process.env.SEEDCOUNT))) {\n            _context2.next = 15;\n            break;\n          }\n\n          return _context2.delegateYield(_loop(), \"t0\", 12);\n\n        case 12:\n          i++;\n          _context2.next = 10;\n          break;\n\n        case 15:\n          Logger.endLoadingBar();\n          return _context2.abrupt(\"return\", prom);\n\n        case 17:\n        case \"end\":\n          return _context2.stop();\n      }\n    }\n  }, _callee);\n}))).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n  return regeneratorRuntime.wrap(function _callee2$(_context3) {\n    while (1) {\n      switch (_context3.prev = _context3.next) {\n        case 0:\n          logger.log('\\n\\n------------------------------------------');\n          logger.log('Seed complete!');\n          logger.log('Inserted', process.env.SEEDCOUNT, 'records');\n          logger.timeEnd('Seed Timer');\n          _context3.next = 6;\n          return logger.log('------------------------------------------\\n\\n');\n\n        case 6:\n          _context3.next = 8;\n          return Promise.all(dbs.map(function (db) {\n            return db.closeConnection();\n          }));\n\n        case 8:\n          process.exit(0);\n\n        case 9:\n        case \"end\":\n          return _context3.stop();\n      }\n    }\n  }, _callee2);\n})));\n\n//# sourceURL=webpack://about/./database/seed.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n\n__webpack_require__(/*! core-js/modules/es.array.concat.js */ \"core-js/modules/es.array.concat.js\");\n\n//Load Environment Variables\nvar path = __webpack_require__(/*! path */ \"path\");\n\n__webpack_require__(/*! ../../environments/envLoader.js */ \"../../environments/envLoader.js\");\n\ntry {\n  __webpack_require__(/*! newrelic */ \"newrelic\");\n} catch (e) {} //Load Express\n\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar server = express();\nvar PORT = 3002; //Load React\n\nvar React = __webpack_require__(/*! react */ \"react\");\n\nvar _require = __webpack_require__(/*! react-dom/server */ \"react-dom/server\"),\n    renderToString = _require.renderToString;\n\nvar About = __webpack_require__(/*! ../shared/About.jsx */ \"./src/shared/About.jsx\").default; //Load Middleware\n\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\"); //Load Database\n\n\nvar DBManager = __webpack_require__(/*! ../../database/GetDBManager */ \"./database/GetDBManager.js\");\n\nvar db = new DBManager(); //Register Middleware\n\nserver.use(cors());\nserver.use(bodyParser.urlencoded({\n  extended: true\n}));\nserver.use(bodyParser.json());\nserver.use(express.static('./public')); //Helper Functions\n\nvar errorResponses = {\n  noCourseObj: function noCourseObj(res) {\n    res.status(400).send('Request body must have key \"courseObj\" with Value Object containing course data.');\n  },\n  noCourseId: function noCourseId(res) {\n    res.status(400).send('property course_id must be defined on an object with name \"courseObj\".');\n  },\n  noIdUpdates: function noIdUpdates(res) {\n    res.status(400).send('Cannot update course_id. You must delete the new id, delete this id, and then post a whole new object.');\n  }\n}; //GetFromDB\n\nvar getFromDB = function getFromDB(id) {\n  if (id > 10000000) {\n    return null;\n  } //This would not be used in a real project. This is simply to cut off any floating records not intended to be seen.\n\n\n  return db.getCourse(id).then(function (data) {\n    if (!data) {\n      return {\n        data: null,\n        code: 404\n      };\n    } else {\n      var dataToReturn = {\n        course_id: data.course_id,\n        recent_views: data.recent_views,\n        description: data.description,\n        what_you_will_learn: data.what_you_will_learn,\n        skills_you_will_gain: data.skills_you_will_gain\n      };\n      dataToReturn.metadata = [{\n        icon: 'sharableCertificateSVG',\n        title: 'Shareable Certificate',\n        subtitle: 'Earn a Certificate upon completion'\n      }, {\n        icon: 'onlineSVG',\n        title: '100% online',\n        subtitle: 'Start instantly and learn at your own schedule'\n      }, {\n        icon: 'deadlinesSVG',\n        title: 'Flexible Deadlines',\n        subtitle: 'Reset deadlines in accordance to your schedule'\n      }, {\n        icon: 'hoursSVG',\n        title: \"Approx. \".concat(data.metadata.hours, \" hours to complete\"),\n        subtitle: ''\n      }, {\n        icon: 'languagesSVG',\n        title: 'English',\n        subtitle: \"Subtitles: \".concat('English, ' + data.metadata.subtitles)\n      }];\n      dataToReturn.learner_career_outcomes = [{\n        icon: 'careerDirectionSVG',\n        pct: data.learner_career_outcomes.direction,\n        outcome: 'started a new career after completing these courses'\n      }, {\n        icon: 'careerBenefitSVG',\n        pct: data.learner_career_outcomes.benefit,\n        outcome: 'got a tangible career benefit from this course'\n      }, {\n        icon: 'careerPromotionSVG',\n        pct: data.learner_career_outcomes.promo,\n        outcome: 'got a pay increase or promotion'\n      }];\n      return {\n        data: dataToReturn,\n        code: 200\n      };\n    }\n  }).catch(function (err) {\n    return {\n      data: err,\n      code: 500\n    };\n  });\n};\n\n{\n  //Routes\n  //Create\n  server.post('/api/about', function (req, res) {\n    if (req.body.courseObj === undefined) {\n      errorResponses.noCourseObj(res);\n      return;\n    }\n\n    if (req.body.courseObj.course_id !== undefined) {\n      db.insertCourse(req.body.courseObj).then(function () {\n        res.sendStatus(201);\n      }).catch(function (err) {\n        res.status(500).send(err);\n      });\n    } else {\n      errorResponses.noCourseId(res);\n    }\n  }); //Read\n\n  server.get('/api/about/:id', function (req, res) {\n    getFromDB(req.params.id).then(function (results) {\n      res.status(results.code).send(results.data);\n    });\n  });\n  server.get('/api/about/:id/concise', function (req, res) {\n    db.getCourse(req.params.id).then(function (data) {\n      if (!data) {\n        res.sendStatus(404);\n      } else {\n        res.status(200).send(data);\n      }\n    }).catch(function () {\n      res.sendStatus(404);\n    });\n  }); //Update\n\n  server.put('/api/about/:id', function (req, res) {\n    if (req.body.courseObj === undefined) {\n      errorResponses.noCourseObj(res);\n      return;\n    } else {\n      if (req.body.courseObj.course_id) {\n        errorResponses.noIdUpdates(res);\n        return;\n      }\n\n      db.updateCourse(req.params.id, req.body.courseObj).then(function (modCount) {\n        modCount ? res.sendStatus(204) : res.sendStatus(404);\n      }).catch(function (err) {\n        res.send(err);\n      });\n    }\n  }); //Delete\n\n  server.delete('/api/about/:id', function (req, res) {\n    db.deleteCourse(req.params.id).then(function () {\n      res.sendStatus(200);\n    }).catch(function (err) {\n      console.log(err);\n    });\n  });\n  server.get('/:id', function (req, res) {\n    if (isNaN(req.params.id)) {\n      res.status(404).send();\n      return;\n    }\n\n    console.log(\"getting /\".concat(req.params.id, \" index.html\"));\n    getFromDB(req.params.id).then(function (results) {\n      var appStr = renderToString( /*#__PURE__*/React.createElement(About, {\n        course: results.data\n      }));\n\n      if (results.code === 200) {\n        res.status(200).send(\"<!DOCTYPE html>\\n        <html>\\n          <head>\\n            <title>Metadata Service Test Page</title>\\n            <link rel=\\\"stylesheet\\\" href=\\\"index.css\\\">\\n          </head>\\n          <body>\\n            <div id='about'>\".concat(appStr, \"</div>\\n            <script>window._initialAboutServiceData = \").concat(JSON.stringify(results.data), \"; console.log('test')</script>\\n            <script src='/index.js'></script>\\n          </body>\\n        </html>\"));\n      } else {\n        res.status(results.code).send(results.data);\n      }\n    });\n  });\n  server.get('/:id/innerHTML', function (req, res) {\n    getFromDB(req.params.id).then(function (results) {\n      res.send(\"\\n        \".concat(renderToString( /*#__PURE__*/React.createElement(About, null)), \"\\n        <script>window._initialAboutServiceData = \").concat(JSON.stringify(results.data), \"; console.log('test')</script>\\n      \"));\n    });\n  });\n} // Allows the server to listen if it's in dev or prod, but not while testing\n\nif (true) {\n  server.listen(PORT, function () {\n    console.log(\"Listening on port \".concat(PORT));\n  });\n}\n\nmodule.exports = server;\n\n//# sourceURL=webpack://about/./src/server/index.js?");

/***/ }),

/***/ "./src/shared/About.jsx":
/*!******************************!*\
  !*** ./src/shared/About.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ \"core-js/modules/es.object.set-prototype-of.js\");\n/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ \"core-js/modules/es.object.get-prototype-of.js\");\n/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ \"core-js/modules/es.reflect.construct.js\");\n/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ \"core-js/modules/es.symbol.iterator.js\");\n/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./style.css */ \"./src/shared/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _components_detail_Detail_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/detail/Detail.jsx */ \"./src/shared/components/detail/Detail.jsx\");\n/* harmony import */ var _components_meta_Meta_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/meta/Meta.jsx */ \"./src/shared/components/meta/Meta.jsx\");\n/* harmony import */ var _components_skills_Skills_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/skills/Skills.jsx */ \"./src/shared/components/skills/Skills.jsx\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\n\n\n\n\n\n\n\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\nvar About = /*#__PURE__*/function (_React$Component) {\n  _inherits(About, _React$Component);\n\n  var _super = _createSuper(About);\n\n  function About(props) {\n    var _this;\n\n    _classCallCheck(this, About);\n\n    _this = _super.call(this, props);\n    var course;\n\n    if (props.course) {\n      course = props.course;\n    } else {\n      course = window._initialAboutServiceData;\n      delete window._initialAboutServiceData;\n    }\n\n    _this.state = {\n      courseInfo: course,\n      svgs: {},\n      expanded: ''\n    };\n    return _this;\n  }\n\n  _createClass(About, [{\n    key: \"expand\",\n    value: function expand() {\n      this.setState({\n        expanded: 'expanded'\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var _this$state = this.state,\n          courseInfo = _this$state.courseInfo,\n          svgs = _this$state.svgs,\n          expanded = _this$state.expanded;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(\"div\", {\n        className: \"about\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(\"div\", {\n        className: \"two-three\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(_components_detail_Detail_jsx__WEBPACK_IMPORTED_MODULE_12__.default, {\n        state: courseInfo,\n        expanded: expanded,\n        click: function click() {\n          _this2.expand();\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(_components_skills_Skills_jsx__WEBPACK_IMPORTED_MODULE_13__.default, {\n        state: courseInfo\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(\"div\", {\n        className: \"one-three\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(_components_meta_Meta_jsx__WEBPACK_IMPORTED_MODULE_14__.default, {\n        state: courseInfo,\n        svgs: svgs\n      })));\n    }\n  }]);\n\n  return About;\n}((react__WEBPACK_IMPORTED_MODULE_10___default().Component));\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);\n\n//# sourceURL=webpack://about/./src/shared/About.jsx?");

/***/ }),

/***/ "./src/shared/components/detail/Detail.jsx":
/*!*************************************************!*\
  !*** ./src/shared/components/detail/Detail.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ \"core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nvar Detail = function Detail(props) {\n  var state = props.state,\n      expanded = props.expanded,\n      click = props.click;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(\"div\", {\n    id: \"detail\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(\"h2\", null, \"About this Course\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(\"h3\", {\n    className: \"recent-views\"\n  }, \"\".concat(state.recent_views.toLocaleString('en'), \" recent views\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(\"div\", {\n    className: 'description expandable ' + expanded,\n    onClick: click\n  }, state.description.split('\\n').map(function (para, index) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(\"p\", {\n      key: index\n    }, para);\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(\"div\", {\n    className: 'show-more-button ' + expanded\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(\"button\", {\n    onClick: click\n  }, \"SHOW ALL\")));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Detail);\n\n//# sourceURL=webpack://about/./src/shared/components/detail/Detail.jsx?");

/***/ }),

/***/ "./src/shared/components/meta/Facts.jsx":
/*!**********************************************!*\
  !*** ./src/shared/components/meta/Facts.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar Facts = function Facts(props) {\n  var state = props.state,\n      svgs = props.svgs;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    id: \"facts\"\n  }, state.metadata.map(function (set) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n      key: set.title,\n      className: \"fact-set\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n      className: \"circle circle-outline\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"svg\", {\n      className: \"fact-icon\",\n      viewBox: \"0 0 48 48\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"path\", {\n      fillRule: set.icon === \"sharableCertificateSVG\" ? \"evenodd\" : \"\",\n      d: svgs[set.icon],\n      role: \"presentation\"\n    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"h2\", {\n      className: \"fact-title\"\n    }, set.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"h3\", {\n      className: \"fact-subtitle\"\n    }, set.subtitle)));\n  }));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Facts);\n\n//# sourceURL=webpack://about/./src/shared/components/meta/Facts.jsx?");

/***/ }),

/***/ "./src/shared/components/meta/Meta.jsx":
/*!*********************************************!*\
  !*** ./src/shared/components/meta/Meta.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Outcomes_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Outcomes.jsx */ \"./src/shared/components/meta/Outcomes.jsx\");\n/* harmony import */ var _Facts_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Facts.jsx */ \"./src/shared/components/meta/Facts.jsx\");\n\n\n\n\nvar Meta = function Meta(props) {\n  var state = props.state,\n      svgs = props.svgs;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    id: \"meta\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Outcomes_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {\n    state: state,\n    svgs: svgs\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Facts_jsx__WEBPACK_IMPORTED_MODULE_2__.default, {\n    state: state,\n    svgs: svgs\n  }));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Meta);\n\n//# sourceURL=webpack://about/./src/shared/components/meta/Meta.jsx?");

/***/ }),

/***/ "./src/shared/components/meta/Outcomes.jsx":
/*!*************************************************!*\
  !*** ./src/shared/components/meta/Outcomes.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar Outcomes = function Outcomes(props) {\n  var _svgs$userSVG, _svgs$userSVG2;\n\n  var state = props.state,\n      svgs = props.svgs;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    id: \"outcomes\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"outcomes-title-set\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"circle-outline\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"outcomes-title-set-icon\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"svg\", {\n    className: \"user-icon\",\n    viewBox: \"0 0 48 48\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"path\", {\n    d: ((_svgs$userSVG = svgs.userSVG) === null || _svgs$userSVG === void 0 ? void 0 : _svgs$userSVG.body) || '',\n    role: \"presentation\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"path\", {\n    d: ((_svgs$userSVG2 = svgs.userSVG) === null || _svgs$userSVG2 === void 0 ? void 0 : _svgs$userSVG2.head) || '',\n    role: \"presentation\"\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"p\", {\n    className: \"outcomes-title-set-title\"\n  }, \"Learner Career Outcomes\")), state.learner_career_outcomes.map(function (outcome) {\n    var _svgs$outcome$icon, _svgs$outcome$icon2;\n\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n      key: outcome.icon,\n      className: \"outcome-set\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n      className: \"icon-background \".concat(outcome.icon)\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n      className: \"icon-container\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"svg\", {\n      className: \"outcome-icon\",\n      viewBox: outcome.icon === 'careerDirectionSVG' ? '0 0 25 25' : '0 0 48 48'\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"path\", {\n      d: outcome.icon === \"careerPromotionSVG\" ? (_svgs$outcome$icon = svgs[outcome.icon]) === null || _svgs$outcome$icon === void 0 ? void 0 : _svgs$outcome$icon.outside : svgs[outcome.icon],\n      role: \"presentation\"\n    }), outcome.icon === \"careerPromotionSVG\" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"path\", {\n      d: (_svgs$outcome$icon2 = svgs[outcome.icon]) === null || _svgs$outcome$icon2 === void 0 ? void 0 : _svgs$outcome$icon2.inside,\n      role: \"presentation\"\n    }) : null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"h2\", {\n      className: \"outcome-pct\"\n    }, \"\".concat(Math.round(outcome.pct * 100), \"%\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"h3\", {\n      className: \"outcome-subtitle\"\n    }, outcome.outcome));\n  }));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Outcomes);\n\n//# sourceURL=webpack://about/./src/shared/components/meta/Outcomes.jsx?");

/***/ }),

/***/ "./src/shared/components/skills/Skills.jsx":
/*!*************************************************!*\
  !*** ./src/shared/components/skills/Skills.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar Skills = function Skills(props) {\n  var state = props.state;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"div\", {\n    className: \"skills\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"h2\", null, \"Skills You Will Gain\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"ul\", {\n    className: \"skills-list\"\n  }, state.skills_you_will_gain.map(function (skill) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(\"li\", {\n      key: skill,\n      className: \"skill-name\"\n    }, skill);\n  })));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Skills);\n\n//# sourceURL=webpack://about/./src/shared/components/skills/Skills.jsx?");

/***/ }),

/***/ "./src/shared/style.css":
/*!******************************!*\
  !*** ./src/shared/style.css ***!
  \******************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://about/./src/shared/style.css?");

/***/ }),

/***/ "../../environments/envLoader.js":
/*!**********************************************!*\
  !*** external "./environments/envLoader.js" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("./environments/envLoader.js");;

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");;

/***/ }),

/***/ "cassandra-driver":
/*!***********************************!*\
  !*** external "cassandra-driver" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cassandra-driver");;

/***/ }),

/***/ "core-js":
/*!**************************!*\
  !*** external "core-js" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js");;

/***/ }),

/***/ "core-js/modules/es.array.concat.js":
/*!*****************************************************!*\
  !*** external "core-js/modules/es.array.concat.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.concat.js");;

/***/ }),

/***/ "core-js/modules/es.array.fill.js":
/*!***************************************************!*\
  !*** external "core-js/modules/es.array.fill.js" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.fill.js");;

/***/ }),

/***/ "core-js/modules/es.array.from.js":
/*!***************************************************!*\
  !*** external "core-js/modules/es.array.from.js" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.from.js");;

/***/ }),

/***/ "core-js/modules/es.array.index-of.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.index-of.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.index-of.js");;

/***/ }),

/***/ "core-js/modules/es.array.iterator.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.iterator.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.iterator.js");;

/***/ }),

/***/ "core-js/modules/es.array.join.js":
/*!***************************************************!*\
  !*** external "core-js/modules/es.array.join.js" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.join.js");;

/***/ }),

/***/ "core-js/modules/es.array.map.js":
/*!**************************************************!*\
  !*** external "core-js/modules/es.array.map.js" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.map.js");;

/***/ }),

/***/ "core-js/modules/es.array.reduce.js":
/*!*****************************************************!*\
  !*** external "core-js/modules/es.array.reduce.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.reduce.js");;

/***/ }),

/***/ "core-js/modules/es.array.slice.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.array.slice.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.slice.js");;

/***/ }),

/***/ "core-js/modules/es.function.name.js":
/*!******************************************************!*\
  !*** external "core-js/modules/es.function.name.js" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.function.name.js");;

/***/ }),

/***/ "core-js/modules/es.number.constructor.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.number.constructor.js" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.number.constructor.js");;

/***/ }),

/***/ "core-js/modules/es.number.to-fixed.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.number.to-fixed.js" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.number.to-fixed.js");;

/***/ }),

/***/ "core-js/modules/es.object.get-own-property-descriptor.js":
/*!***************************************************************************!*\
  !*** external "core-js/modules/es.object.get-own-property-descriptor.js" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.get-own-property-descriptor.js");;

/***/ }),

/***/ "core-js/modules/es.object.get-prototype-of.js":
/*!****************************************************************!*\
  !*** external "core-js/modules/es.object.get-prototype-of.js" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.get-prototype-of.js");;

/***/ }),

/***/ "core-js/modules/es.object.keys.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.object.keys.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.keys.js");;

/***/ }),

/***/ "core-js/modules/es.object.set-prototype-of.js":
/*!****************************************************************!*\
  !*** external "core-js/modules/es.object.set-prototype-of.js" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.set-prototype-of.js");;

/***/ }),

/***/ "core-js/modules/es.object.to-string.js":
/*!*********************************************************!*\
  !*** external "core-js/modules/es.object.to-string.js" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.to-string.js");;

/***/ }),

/***/ "core-js/modules/es.parse-int.js":
/*!**************************************************!*\
  !*** external "core-js/modules/es.parse-int.js" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.parse-int.js");;

/***/ }),

/***/ "core-js/modules/es.promise.js":
/*!************************************************!*\
  !*** external "core-js/modules/es.promise.js" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.promise.js");;

/***/ }),

/***/ "core-js/modules/es.reflect.construct.js":
/*!**********************************************************!*\
  !*** external "core-js/modules/es.reflect.construct.js" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.reflect.construct.js");;

/***/ }),

/***/ "core-js/modules/es.reflect.get.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.reflect.get.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.reflect.get.js");;

/***/ }),

/***/ "core-js/modules/es.regexp.exec.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.regexp.exec.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.regexp.exec.js");;

/***/ }),

/***/ "core-js/modules/es.regexp.to-string.js":
/*!*********************************************************!*\
  !*** external "core-js/modules/es.regexp.to-string.js" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.regexp.to-string.js");;

/***/ }),

/***/ "core-js/modules/es.string.iterator.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.string.iterator.js" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.string.iterator.js");;

/***/ }),

/***/ "core-js/modules/es.string.replace.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.string.replace.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.string.replace.js");;

/***/ }),

/***/ "core-js/modules/es.string.split.js":
/*!*****************************************************!*\
  !*** external "core-js/modules/es.string.split.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.string.split.js");;

/***/ }),

/***/ "core-js/modules/es.symbol.description.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.symbol.description.js" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.symbol.description.js");;

/***/ }),

/***/ "core-js/modules/es.symbol.iterator.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.symbol.iterator.js" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.symbol.iterator.js");;

/***/ }),

/***/ "core-js/modules/es.symbol.js":
/*!***********************************************!*\
  !*** external "core-js/modules/es.symbol.js" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.symbol.js");;

/***/ }),

/***/ "core-js/modules/web.dom-collections.for-each.js":
/*!******************************************************************!*\
  !*** external "core-js/modules/web.dom-collections.for-each.js" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/web.dom-collections.for-each.js");;

/***/ }),

/***/ "core-js/modules/web.dom-collections.iterator.js":
/*!******************************************************************!*\
  !*** external "core-js/modules/web.dom-collections.iterator.js" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/web.dom-collections.iterator.js");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "faker":
/*!************************!*\
  !*** external "faker" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("faker");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");;

/***/ }),

/***/ "newrelic":
/*!***************************!*\
  !*** external "newrelic" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("newrelic");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "perf_hooks":
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("perf_hooks");;

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("pg");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/server");;

/***/ }),

/***/ "regenerator-runtime/runtime.js":
/*!*************************************************!*\
  !*** external "regenerator-runtime/runtime.js" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("regenerator-runtime/runtime.js");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;