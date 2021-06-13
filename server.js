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

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n\n//Load Environment Variables\nvar path = __webpack_require__(/*! path */ \"path\");\n\n__webpack_require__(/*! ../../environments/envLoader.js */ \"../../environments/envLoader.js\");\n\ntry {\n  __webpack_require__(/*! newrelic */ \"newrelic\");\n} catch (e) {} //Load Express\n\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar server = express();\nvar PORT = 3002; //Load React\n\nvar React = __webpack_require__(/*! react */ \"react\");\n\nvar _require = __webpack_require__(/*! react-dom/server */ \"react-dom/server\"),\n    renderToString = _require.renderToString;\n\nvar About = __webpack_require__(/*! ../shared/About.jsx */ \"./src/shared/About.jsx\"); //Load Middleware\n\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\"); //Load Database\n\n\nvar DBManager = __webpack_require__(/*! ../../database/GetDBManager */ \"../../database/GetDBManager\");\n\nvar db = new DBManager(); //Register Middleware\n\nserver.use(cors());\nserver.use(bodyParser.urlencoded({\n  extended: true\n}));\nserver.use(bodyParser.json());\nserver.use(express.static('./public')); //Helper Functions\n\nvar errorResponses = {\n  noCourseObj: function noCourseObj(res) {\n    res.status(400).send('Request body must have key \"courseObj\" with Value Object containing course data.');\n  },\n  noCourseId: function noCourseId(res) {\n    res.status(400).send('property course_id must be defined on an object with name \"courseObj\".');\n  },\n  noIdUpdates: function noIdUpdates(res) {\n    res.status(400).send('Cannot update course_id. You must delete the new id, delete this id, and then post a whole new object.');\n  }\n}; //GetFromDB\n\nvar getFromDB = function getFromDB(id) {\n  if (id > 10000000) {\n    return null;\n  } //This would not be used in a real project. This is simply to cut off any floating records not intended to be seen.\n\n\n  return db.getCourse(id).then(function (data) {\n    if (!data) {\n      return {\n        data: null,\n        code: 404\n      };\n    } else {\n      var dataToReturn = {\n        course_id: data.course_id,\n        recent_views: data.recent_views,\n        description: data.description,\n        what_you_will_learn: data.what_you_will_learn,\n        skills_you_will_gain: data.skills_you_will_gain\n      };\n      dataToReturn.metadata = [{\n        icon: 'sharableCertificateSVG',\n        title: 'Shareable Certificate',\n        subtitle: 'Earn a Certificate upon completion'\n      }, {\n        icon: 'onlineSVG',\n        title: '100% online',\n        subtitle: 'Start instantly and learn at your own schedule'\n      }, {\n        icon: 'deadlinesSVG',\n        title: 'Flexible Deadlines',\n        subtitle: 'Reset deadlines in accordance to your schedule'\n      }, {\n        icon: 'hoursSVG',\n        title: \"Approx. \".concat(data.metadata.hours, \" hours to complete\"),\n        subtitle: ''\n      }, {\n        icon: 'languagesSVG',\n        title: 'English',\n        subtitle: \"Subtitles: \".concat('English, ' + data.metadata.subtitles)\n      }];\n      dataToReturn.learner_career_outcomes = [{\n        icon: 'careerDirectionSVG',\n        pct: data.learner_career_outcomes.direction,\n        outcome: 'started a new career after completing these courses'\n      }, {\n        icon: 'careerBenefitSVG',\n        pct: data.learner_career_outcomes.benefit,\n        outcome: 'got a tangible career benefit from this course'\n      }, {\n        icon: 'careerPromotionSVG',\n        pct: data.learner_career_outcomes.promo,\n        outcome: 'got a pay increase or promotion'\n      }];\n      return {\n        data: dataToReturn,\n        code: 200\n      };\n    }\n  }).catch(function (err) {\n    return {\n      data: err,\n      code: 500\n    };\n  });\n};\n\n{\n  //Routes\n  //Create\n  server.post('/api/about', function (req, res) {\n    if (req.body.courseObj === undefined) {\n      errorResponses.noCourseObj(res);\n      return;\n    }\n\n    if (req.body.courseObj.course_id !== undefined) {\n      db.insertCourse(req.body.courseObj).then(function () {\n        res.sendStatus(201);\n      }).catch(function (err) {\n        res.status(500).send(err);\n      });\n    } else {\n      errorResponses.noCourseId(res);\n    }\n  }); //Read\n\n  server.get('/api/about/:id', function (req, res) {\n    getFromDB(req.params.id).then(function (results) {\n      res.status(results.code).send(results.data);\n    });\n  });\n  server.get('/api/about/:id/concise', function (req, res) {\n    db.getCourse(req.params.id).then(function (data) {\n      if (!data) {\n        res.sendStatus(404);\n      } else {\n        res.status(200).send(data);\n      }\n    }).catch(function () {\n      res.sendStatus(404);\n    });\n  }); //Update\n\n  server.put('/api/about/:id', function (req, res) {\n    if (req.body.courseObj === undefined) {\n      errorResponses.noCourseObj(res);\n      return;\n    } else {\n      if (req.body.courseObj.course_id) {\n        errorResponses.noIdUpdates(res);\n        return;\n      }\n\n      db.updateCourse(req.params.id, req.body.courseObj).then(function (modCount) {\n        modCount ? res.sendStatus(204) : res.sendStatus(404);\n      }).catch(function (err) {\n        res.send(err);\n      });\n    }\n  }); //Delete\n\n  server.delete('/api/about/:id', function (req, res) {\n    db.deleteCourse(req.params.id).then(function () {\n      res.sendStatus(200);\n    }).catch(function (err) {\n      console.log(err);\n    });\n  });\n  server.get('/:id', function (req, res) {\n    if (isNaN(req.params.id)) {\n      res.status(404).send();\n      return;\n    }\n\n    console.log(\"getting /\".concat(req.params.id, \" index.html\"));\n    getFromDB(req.params.id).then(function (results) {\n      if (results.code === 200) {\n        res.status(200).send(\"<!DOCTYPE html>\\n        <html>\\n          <head>\\n            <title>Metadata Service Test Page</title>\\n            <link rel=\\\"stylesheet\\\" href=\\\"index.css\\\">\\n          </head>\\n          <body>\\n            <div id='about'>\".concat(renderToString( /*#__PURE__*/React.createElement(About, null)), \"</div>\\n            <script src='/index.js'></script>\\n          </body>\\n        </html>\"));\n      } else {\n        res.status(results.code).send(results.data);\n      }\n    });\n  });\n  server.get('/:id/container', function (req, res) {\n    getFromDB(req.params.id).then(function (results) {\n      res.send(\"<div id='about'>\".concat(renderToString( /*#__PURE__*/React.createElement(About, null)), \"</div>\"));\n    });\n  });\n} // Allows the server to listen if it's in dev or prod, but not while testing\n\nif (true) {\n  server.listen(PORT, function () {\n    console.log(\"Listening on port \".concat(PORT));\n  });\n}\n\nmodule.exports = server;\n\n//# sourceURL=webpack://about/./src/server/index.js?");

/***/ }),

/***/ "./src/shared/About.jsx":
/*!******************************!*\
  !*** ./src/shared/About.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ \"core-js/modules/es.object.set-prototype-of.js\");\n/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ \"core-js/modules/es.object.get-prototype-of.js\");\n/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.reflect.construct.js */ \"core-js/modules/es.reflect.construct.js\");\n/* harmony import */ var core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_construct_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ \"core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ \"core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ \"core-js/modules/es.symbol.iterator.js\");\n/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ \"core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./style.css */ \"./src/shared/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _components_detail_Detail_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/detail/Detail.jsx */ \"./src/shared/components/detail/Detail.jsx\");\n/* harmony import */ var _components_meta_Meta_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/meta/Meta.jsx */ \"./src/shared/components/meta/Meta.jsx\");\n/* harmony import */ var _components_skills_Skills_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/skills/Skills.jsx */ \"./src/shared/components/skills/Skills.jsx\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\n\n\n\n\n\n\n\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\nvar About = /*#__PURE__*/function (_React$Component) {\n  _inherits(About, _React$Component);\n\n  var _super = _createSuper(About);\n\n  function About(props) {\n    var _this;\n\n    _classCallCheck(this, About);\n\n    _this = _super.call(this, props);\n    _this.state = {\n      courseInfo: _this.props.course,\n      svgs: {},\n      expanded: ''\n    };\n    return _this;\n  }\n\n  _createClass(About, [{\n    key: \"expand\",\n    value: function expand() {\n      this.setState({\n        expanded: 'expanded'\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var _this$state = this.state,\n          courseInfo = _this$state.courseInfo,\n          svgs = _this$state.svgs,\n          expanded = _this$state.expanded;\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(\"div\", {\n        className: \"about\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(\"div\", {\n        className: \"two-three\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(_components_detail_Detail_jsx__WEBPACK_IMPORTED_MODULE_12__.default, {\n        state: courseInfo,\n        expanded: expanded,\n        click: function click() {\n          _this2.expand();\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(_components_skills_Skills_jsx__WEBPACK_IMPORTED_MODULE_13__.default, {\n        state: courseInfo\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(\"div\", {\n        className: \"one-three\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default().createElement(_components_meta_Meta_jsx__WEBPACK_IMPORTED_MODULE_14__.default, {\n        state: courseInfo,\n        svgs: svgs\n      })));\n    }\n  }]);\n\n  return About;\n}((react__WEBPACK_IMPORTED_MODULE_10___default().Component));\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);\n\n//# sourceURL=webpack://about/./src/shared/About.jsx?");

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

/***/ "../../database/GetDBManager":
/*!******************************************!*\
  !*** external "./database/GetDBManager" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("./database/GetDBManager");;

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

/***/ "core-js/modules/es.array.iterator.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.iterator.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.iterator.js");;

/***/ }),

/***/ "core-js/modules/es.array.map.js":
/*!**************************************************!*\
  !*** external "core-js/modules/es.array.map.js" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.map.js");;

/***/ }),

/***/ "core-js/modules/es.object.get-prototype-of.js":
/*!****************************************************************!*\
  !*** external "core-js/modules/es.object.get-prototype-of.js" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.get-prototype-of.js");;

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

/***/ "core-js/modules/es.reflect.construct.js":
/*!**********************************************************!*\
  !*** external "core-js/modules/es.reflect.construct.js" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.reflect.construct.js");;

/***/ }),

/***/ "core-js/modules/es.regexp.exec.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.regexp.exec.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.regexp.exec.js");;

/***/ }),

/***/ "core-js/modules/es.string.iterator.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.string.iterator.js" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.string.iterator.js");;

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